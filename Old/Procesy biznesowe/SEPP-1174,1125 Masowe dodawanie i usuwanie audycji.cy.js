import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e26 } from '../../../../POM/Planowanie/E26 Masowa ewidencja sprzedazy'

describe('SEPP-1174,1125 - Masowe dodawanie i usuwanie audycji', function () {
    // SEPP-1174 - Masowe dodanie audycji
    // SEPP-1125 - Usunięcie audycji

    const nazwaPorozumienia = 'TESTY AUTOMATYCZNE 1174, 1125'

    it('SEPP-1174 - Masowe dodawanie audycji', function () {
        // Strona główna i logowanie 
        cy.visit('/')
            .loginProducent()

        // Porozumienia
        cy.goToMenu('Porozumienia')

        // Wyfiltrowanie porozumienia i przejscie do widoku edycji
        e20.nazwaAudycjiTVPoleTekstowe().type(nazwaPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#agreementList_table > tbody > tr.odd > td:nth-child(7)').should('contain', nazwaPorozumienia)
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        fWspolne.sprawdzProgressBar()

        // Pobranie wartości "Nr. Poroz.", "Audycja TV" i "Kosztorys", "Cena sprzedaży" do pozniejszego porównania
        let agrementNr
        cy.get('#AgrementNrTextBox').then(($a) => {
            agrementNr = $a[0].getAttribute('value')
        })
        let tvAudition
        cy.get('#TvAudition').then(($b) => {
            tvAudition = $b[0].getAttribute('value')
        })
        let costEstimate
        cy.get('#CurrentTitleId > option').invoke('text').then((c) => {
            costEstimate = c
        })
        let sellPrice = ''
        cy.get('#CurrentTitle_CenaSprzedazy').then(($d) => {
            sellPrice = $d[0].getAttribute('value')
        })

        // Sprawdzenie czy nie ma starych audycji
        cy.get('#auditionList > tbody > tr').should('contain', 'Brak danych')

        // Klikniecie na przycisk "Masowa ewidencja sprzedaży"==============================================================================================================================================================
        cy.log('Krok 1 - klikniecie na przycisk "Masowa ewidencja sprzedaży"')
        cy.get('#ToMassSellEvidence').should('have.attr', 'title', 'Masowa ewidencji sprzedaży').click()
        // Otwiera się ekran Masowej ewidencji sprzedaży [E26]. W pierwszej kolejności pokazuje się sekcja "TYP OPERACJI MASOWEJ", po wybraniu opcji dodania nowych odcinków, udostępniana jest dalsza część ekranu.
        cy.get('span.float-left').contains('TYP OPERACJI MASOWEJ')
        cy.get('#AddNew').parent().should('have.text', ' Dodanie nowych odcinków').click()

        // W sekcji Porozumienie wartości "Nr. Poroz.", "Audycja TV" i "Kosztorys", "Cena sprzedaży" są zgodne z tymi z porozumienia, z którego weszliśmy do tego ekranu.
        cy.get('#AgreementText').should(($p) => {
            expect($p).to.contain.value(agrementNr)
        })
        cy.get('#AuditionName').should(($p) => {
            expect($p).to.have.value(tvAudition)
        })
        cy.get('#CurrentTitle').should(($p) => {
            expect($p).to.have.value(costEstimate)
        })

        // Wyliczenie ceny sprzedaży
        cy.get('#getSellPriceEpisode').click()
        cy.get('#SellPriceMassEpisode').should('have.attr', 'value', sellPrice)
        
        /* zostawiam jakby ktoś kiedyś potrzebował
        cy.get('#SellPriceMassEpisode-hidden').then(($p) => {
            let price = $p[0].getAttribute('value')
            let priceWithoutSpace = price.replace(/ /g, '')
            let priceCorrect = priceWithoutSpace.replace(/\./g, ',')
            expect(priceCorrect).to.contain(sellPrice)
        })
        */

        // Asercja na istniejące odcinki
        cy.get('.removeBtnAud').should('not.exist')

        // W polach "Nr Odcinka" i "Ilość" wartość jest domyślnie pusta. Pole "SAP emisyjny aktywny?" jest zaznaczone.
        cy.get('#StartingEpisodeNumber').should('be.empty')
        cy.get('#EpisodeCount').should('be.empty')
        cy.get(':nth-child(2) > #IsSapNumberActive').should('be.checked')

        // U góry ekranu dostępne są przyciski:
        // Zapisz
        // Powrót
        cy.get('#BeforeSaveButton').should('be.visible')
        cy.get('button.btn.btn-info.return-button').should('be.visible')

        // W innych sekcjach dostępne przyciski to:
        // Wylicz cenę sprzedaży n/p kosztorysu
        // 2 razy Wybierz plik.
        cy.get('#getSellPriceEpisode').parent().should('have.attr', 'data-original-title', 'Wylicz Cenę Sprzedaży n/p Kosztorysu')
        cy.get('#btnSelectInvoiceScanFile').should('have.attr', 'title', 'Wybierz plik')
        cy.get('#btnSelectProtocolScanFile').should('have.attr', 'title', 'Wybierz plik')

        // Pola "zakres odc." oraz sekcja "Jednostka usługowa" są zablokowane.
        cy.get('#EpisodesRange').should('be.disabled')
        cy.get('#JwStartingProductionSap').should('have.attr', 'readonly')
        cy.get('.inputgroup > .select2 > .selection > .select2-selection').should('have.attr', 'tabindex', '-1')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        // Kliknij przycisk "Zapisz"==============================================================================================================================================================
        cy.log('Krok 2 - Kliknij przycisk "Zapisz"')
        cy.get('#BeforeSaveButton').click()

        // Pojawi się informacja o braku spełnienia 2 walidacji:
        // Wymagane wypełnienie pola 'Początkowy numer odcinka'.
        // Wymagane wypełnienie pola 'Ilość odcinków'.
        cy.get('form > div > .text-danger.validation-summary-errors > ul > li').eq(0).contains('Wymagane wypełnienie pola \'Nr odcinka\'.')
        cy.get('form > div > .text-danger.validation-summary-errors > ul > li').eq(1).contains('Wymagane wypełnienie pola \'Ilość\'.')

        // Uzupełnij pola
        cy.log('Krok 3 - uzupełnij pola i kliknij Zapisz i "Potwierdź" w popupie.')
        cy.get('#StartingEpisodeNumber').type('1')
        cy.get('#EpisodeCount').type('2')
        const IDAudycji = DateTime.now().toFormat('yyyyMMddHHmm')
        e26.idAudycjiPoleTekstowe().should('not.exist')
        cy.get('#StartingProductionSap').type(IDAudycji)
        cy.get('#StartingSapNumber').type(IDAudycji)
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')

        // Kliknij Zapisz i "Potwierdź" w popupie.
        cy.get('#BeforeSaveButton').click()

        // Otwiera się popup potwierdzenia operacji. Dane podane w popupie będą odpowiadały tym podanym w kroku.
        cy.get('#SellEvidenceConfirmModal-modalDialog > .modal-body > #SellEvidenceConfirmModal-body', {timeout: 10000}).find('p').then(($el) => {
            cy.log('zawartość okna modalnego ' + $el.text())
            if($el.find('b').length){
                const tekst = $el.find('b')
                expect(Cypress.$(tekst[0]).text()).to.include('1')
                expect(Cypress.$(tekst[1]).text()).to.include('2')
                expect(Cypress.$(tekst[2]).text()).to.include('Brak')
                expect(Cypress.$(tekst[3]).text()).to.include('Brak')
                expect(Cypress.$(tekst[4]).text()).to.include('Brak')
                expect(Cypress.$(tekst[5]).text()).to.include(IDAudycji)
                expect(Cypress.$(tekst[6]).text()).to.include(IDAudycji)
                expect(Cypress.$(tekst[7]).text()).to.include('Brak')
                expect(Cypress.$(tekst[8]).text()).to.include('Brak')
            }
        })
        // wymagany wait
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.get('#SellEvidenceConfirmModal-yesBtn', { timeout: 6000 }).should('be.visible').click()
        // Użytkownik zostanie przeniesiony do ekranu szczegółów porozumienia, na liście audycji wyświetlają się stworzone audycje oraz ich dane. 
        fWspolne.komunikat().should('have.text', 'Pomyślnie dodano masowo audycje')
        cy.get('#auditionList > tbody > tr.odd > .sorting_1').should('contain', '1')
        cy.get('#auditionList > tbody > tr.odd > td:nth-child(4)').children().should('be.checked')
        cy.get('#auditionList > tbody > tr.odd > .idauditionsap').should('have.text', '')
        cy.get('#auditionList > tbody > tr.odd > td:nth-child(3)').should('contain', IDAudycji)
        cy.get('#auditionList > tbody > tr.odd > .prodsap').should('contain', IDAudycji)
        cy.get('#auditionList > tbody > tr.odd > td:nth-child(7)').children().should('not.be.checked')

        // Wylogowanie
        cy.logoutUser()
    })

    it('SEPP-1125 - Usuwanie audycji', function () {
        // Strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        
        // Przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // Wyfiltrowanie porozumienia i przejscie do widoku edycji
        e20.nazwaAudycjiTVPoleTekstowe().type(nazwaPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#agreementList_table > tbody > tr.odd > td:nth-child(7)').should('contain', nazwaPorozumienia)
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.scrollTo('center')

        // W sekcji "Audycje" kliknij przycisk "Usuń" przy wybranej audycji na liście.==============================================================================================================================================================
        cy.log('Krok 1 - W sekcji "Audycje" kliknij przycisk "Usuń" przy wybranej audycji na liście.')
        e22.usunAudycjePierwszyPrzycisk().click()

        // Pojawiło się popup potwierdzający operację z przyciskami "Potwierdź" i "Anuluj".
        cy.get('#confirmText').should('be.visible').and('have.text', 'Czy chcesz usunąć Audycję?')
        cy.get('a#confirmBtn').should('be.visible').and('have.text', ' Potwierdź')
        cy.get('.col-lg-4 > .denyBtn').should('be.visible').and('have.text', ' Anuluj')

        // Kliknij "Potwierdź".==============================================================================================================================================================
        cy.log('Krok 2 - Kliknij "Potwierdź".')
        e22.potwierdzUsunAudycjePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Popup znika wraz z wybraną z listy audycją.
        cy.get('div#confirmModal').should('not.be.visible')
        fWspolne.komunikat().first().click()
        cy.get('.sorting_1').should('not.contain', '1')

        // Ponów to samo dla drugiej audycji i sprawdź czy lista audycji jest pusta
        e22.usunAudycjePierwszyPrzycisk().click()
        cy.get('#confirmText').should('be.visible').and('have.text', 'Czy chcesz usunąć Audycję?')
        cy.get('a#confirmBtn').should('be.visible').and('have.text', ' Potwierdź')
        cy.get('.col-lg-4 > .denyBtn').should('be.visible').and('have.text', ' Anuluj')
        e22.potwierdzUsunAudycjePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('div#confirmModal').should('not.be.visible')
        cy.get('#auditionList > tbody > .odd > .dataTables_empty').should('have.text', 'Brak danych')

        // Wylogowanie
        cy.logoutUser()
    })
})