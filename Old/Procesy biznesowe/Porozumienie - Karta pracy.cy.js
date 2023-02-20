import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'
import { e24 } from '../../../../POM/Planowanie/E24 Ewidencja sprzedazy'
import { e509 } from '../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50902 } from '../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy'
import { e503 } from '../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'
import { e504 } from '../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { faker } from '../../../../support/e2e'

describe('Porozumienie - Karta pracy', function () {
    // SEPP-1123 - Dodanie porozumienia 
    // SEPP-1124 - Dodanie audycji  
    // SEPP-1187 - Dodanie numerów SAP  
    // SEPP-1152 - Stworzenie wniosku o zasoby  
    // SEPP-1135 - Dodanie rezerwacji 
    // SEPP-1132 - Przekazanie rezerwacji do Dyspozytury
    // Akceptacja rezerwacji
    // SEPP-1150 - Dodanie pracownika do zlecenia pracy na wykresie Ganta 
    // SEPP-1151 - Dodanie sprzętu do zlecenia na wykresie Gantta
    // SEPP-1154 - Stworzenie karty pracy zbiorczej
    // SEPP-1158 - Usunięcie karty pracy
    // SEPP-1149 - Akceptacja zlecenia pracy

    // afterEach(function () {
    //    if (this.currentTest.state === 'failed') {
    //        Cypress.runner.stop() 
    //    }
    // })

    // nr porozumienia
    let agrementNr
    let stanowisko

    // funkcja generująca randomowy ciąg znaków o długości n
    function randString(n) {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        for (let i = 0; i < n; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    // nazwa audycji
    const rndAudycja = 'AUDYCJA TEST ' + randString(10)
    // wczorajsza data
    const prevDay = DateTime.now().plus({ days: -1 }).toFormat('dd.MM.yyyy')
    // jutrzejsza data
    const nextDay = DateTime.now().plus({ days: 1 }).toFormat('dd.MM.yyyy')
    // za miesiąc
    const nextMonth = DateTime.now().plus({ days: 30 }).toFormat('dd.MM.yyyy')

    it('Usuń stare zlecenia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // wejdź na zlecenia produkcji
        cy.goToMenu('Zlecenia pracy')

        // wyszukaj wszystkie zlecenia dla audycji testowych
        cy.get('#AuditionName').type('AUDYCJA TEST ')
        e504.wyszukajPrzycisk().click()
        // przeczekaj progress bar
        fWspolne.sprawdzProgressBar()
        /* cy.get('#progressBar').then($progressBar => {
            if ($progressBar.is(':visible')) {
                cy.get('#progressBar').should('not.be.visible')
            }
        }) */

        // anuluj zlecenia
        cy.get('body').then($body => {
            let $btnAnulacja = $body.find('a[data-cy="Anulacja_zlecenia_pracy"]')
            if ($btnAnulacja.length == 1) {
                cy.wrap($btnAnulacja).click()
                cy.get('#CommentReject').type(faker.lorem.sentence(6))
                cy.get('#rejectWorkOrderModal-yesBtn').click()
                fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zmieniono status')
                cy.wrap($btnAnulacja).should('not.exist')
            } else if ($btnAnulacja.length > 1) {
                $btnAnulacja.each(() => {
                    Cypress.log({
                        name: 'Usuń stare zlecenia',
                        message: 'Anuluj zlecenie'
                    })
                    e504.anulacjaZleceniaPracyPierwszyPrzycisk().click()
                    cy.get('#CommentReject').type(faker.lorem.sentence(6))
                    cy.get('#rejectWorkOrderModal-yesBtn').click()
                    fWspolne.sprawdzProgressBar()
                    fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zmieniono status')
                })
                cy.wrap($btnAnulacja).should('not.exist')
            } else {
                cy.log('brak starych zleceń - wylogowanie')
            }
        })
        cy.logoutUser()
    })

    it('1123 - Dodawanie porozumienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // Porozumienia
        cy.goToMenu('Porozumienia')

        // 1. Kliknij przycisk 'Dodaj'==============================================================================================================================================================
        cy.log('Krok 1 - Kliknij przycisk Dodaj')
        e20.dodajPorozumieniePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e22.rodzajPorozumieniaLista().select('produkcyjne', { force: true })
        cy.get('#select2-ProductionMode-container').should('contain', 'Z')
        cy.get('input#AgrementNrTextBox').then(($a) => {
            agrementNr = $a[0].getAttribute('value')
        })

        // 2. zmień tryb =============================================================================================================================================================
        cy.log('Krok 2 - zmiana trybu')
        cy.get('#select2-ProductionMode-container').click()
        cy.get('#ProductionMode').select('SP - Szybki przebieg', { force: true })
        cy.get('#quickProgressModal-yesBtn').click()
        cy.get('#ProductionMode').should('contain', 'SP')
        cy.get('#select2-ProductionMode-container').click()
        cy.get('#ProductionMode').select('Z - Zwykły', { force: true })
        cy.get('#ProductionMode').should('contain', 'Z')

        // 3. kliknij Zapisz =============================================================================================================================================================
        cy.log('Krok 3 - klikniecie w przycisk Zapisz')
        cy.get('#btnSubmitAgreement').click()
        cy.get('.validation-summary-errors > ul > :nth-child(1)').should('contain', 'Wymagane wypełnienie pola \'Audycja TV\'.').and('be.visible')
        cy.get('.validation-summary-errors > ul > :nth-child(2)').should('contain', 'Wymagane wypełnienie pola \'Rodz. przychodu\'.').and('be.visible')
        cy.get('.validation-summary-errors > ul > :nth-child(3)').should('contain', 'Wymagane wypełnienie pola \'Model produkcji\'.').and('be.visible')
        cy.get('span[data-valmsg-for="TvAudition"]').should('be.visible')
        cy.get('span[data-valmsg-for="IncomeTypeId"]').should('be.visible')
        cy.get('span[data-valmsg-for="ProductionModel"]').should('be.visible')
        // brak walidacji dla pola Producent / O.U. - podstawia się automatycznie zalogowany user
        cy.get('#select2-ProducerId-container').should('have.attr', 'data-original-title', 'test_user_2')
        cy.get('#select2-AgencyId-container').should('have.attr', 'data-original-title', 'AKFiS')

        // 4. Wypełnij pola i zapisz =============================================================================================================================================================
        cy.log('Krok 4 - Wypełnij pola i zapisz')
        // sprawdzenie czy pole Agencja nie jest puste
        cy.get('#select2-AgencyId-container').should('have.attr', 'title')

        // wybranie Jedn. zam.
        cy.get('#select2-OrganizationUnitId-container').click()
        cy.get('#select2-OrganizationUnitId-results > :nth-child(1)').click()
        cy.get('#select2-OrganizationUnitId-container').should('contain', 'Agencja Kreacji Filmu i Serialu')

        // wybranie Redakcji
        cy.get('#select2-EditorialOfficeId-container').click()
        cy.get('#EditorialOfficeId').select('<N/D>', { force: true })
        cy.get('#select2-EditorialOfficeId-container').should('contain', '<N/D>')

        // wpisanie Nr wewn. (intID)
        const intID = '' + faker.datatype.uuid()
        cy.get('#InternalNr').type(intID)

        // wybranie Jedn. Wsp. 
        cy.get('.select2-search__field:first()').click()
        cy.get('#select2-CooperatingUnitsId-results').first().click()

        // wybranie Rodz. platn.
        cy.get('#select2-PaymentTypeId-container').first().click()
        cy.get('#select2-PaymentTypeId-results > :nth-child(1)').click()

        // wpisanie Data zaw.
        const date = DateTime.now().toFormat('dd.MM.yyyy')
        cy.get('#CreateDate').type(date)

        // wpisanie Nadzór Prod.
        cy.get('#select2-SupervisingUnitId-container').click()
        cy.get('#select2-SupervisingUnitId-results > :nth-child(1)').should('be.visible').click()
        cy.get('#select2-SupervisingUnitId-container').should('contain', 'Dział Kreacji i Rozwoju Form Dokumentalnych (AKPDiAS)')

        // wpisanie Audycja TV
        cy.get('#TvAudition').type(rndAudycja)

        // wpisanie Rodz. przychodu
        cy.get('#select2-IncomeTypeId-container').click()
        cy.get('#select2-IncomeTypeId-results > :nth-child(1)').should('be.visible').click()

        // wybranie model produkcji
        cy.get('#ProductionModel').select('W - Wewnętrzny', { force: true })
        cy.get('#ProductionModel').should('contain', 'W')

        // wybranie rodzaju porozumienia
        e22.rodzajPorozumieniaLista().select('produkcyjne', {force: true})

        // wybranie Cel kosztorysu
        cy.get('#NewTitleTarget').select('[U] Kosztorys usługowy (jednostki usługowej)', { force: true })
        cy.get('#NewTitleTarget').should('contain', 'U')

        // kliknięcie Zapisz
        cy.get('#btnSubmitAgreement').click()

        // asercja na komunikat o dodaniu porozumienia
        cy.get('.alert-success > div > [style=""] > [data-notify="message"]').should('contain', 'Pomyślnie dodano porozumienie')

        // asercje na podstawowe pola
        cy.get('#select2-OrganizationUnitId-container').should('contain', 'Agencja Kreacji Filmu i Serialu').and('not.have.attr', 'readonly')
        cy.get('#select2-EditorialOfficeId-container').should('contain', '<N/D>').and('not.have.attr', 'readonly')
        cy.get('#select2-SupervisingUnitId-container').should('contain', 'Dział Kreacji i Rozwoju Form Dokumentalnych (AKPDiAS)').and('not.have.attr', 'readonly')
        cy.get('#TvAudition').should('have.attr', 'value', rndAudycja).and('not.have.attr', 'readonly')

        // asercje na przyciski na górnej belce
        cy.get('#statusText').should('contain', 'Brak')
        cy.get('#addProducerRepresentativeBtn').should('contain', 'Uprawnienia')
        cy.get('#showCopyButton').should('contain', 'Kopiuj')
        // cy.get(':nth-child(6) > .btn').should('contain', 'Zablokuj') // jest problme z tym przyciskiem, nie ma stałego idx  
        // cy.get('[data-confirm="Czy chcesz zgłosić opracowanie?"]').should('contain', 'Zgłoś opr.')
        cy.get('#btnSubmitAgreement').should('contain', 'Zapisz')
        cy.get('#AgreementReturn').should('contain', 'Powrót')
        cy.get('#reportDropdownMenuLink').should('contain', 'Drukuj')
        cy.get('a.btn.btn-info').contains('Zamówienia')
        cy.get('span > .dropdown > .btn').should('contain', 'Produkcja')
        cy.get('button.btn.btn-info').contains('Wynagrodzenia')
        cy.get('a.btn.btn-info').contains('Rozliczenie kosztów')
        cy.get('[onclick="showHistory()"]').should('contain', 'Historia zmian')

        // Osoby wiodace
        cy.get('#addPeopleToProject').should('have.attr', 'title', 'Dodaj Osobę')

        // Kosztorysy
        cy.get('#addTitleButton').should('have.attr', 'title', 'Dodaj kosztorys')
        cy.get('#editTitleButton').should('have.attr', 'title', 'Edytuj kosztorys')
        cy.get('#copyTitleButton').should('have.attr', 'title', 'Kopiuj kosztorys w porozumieniu')
        cy.get('#ToPlanedCosts').should('have.attr', 'title', 'Edycja kosztów planowanych')

        // Wskazniki
        cy.get('#AddRatioBtn').should('have.attr', 'title', 'Dodaj wskaźniki')
        cy.get('.text-center > span > .btn').should('have.attr', 'title', 'Edytuj') // w TC jest Edytuj wskaźniki

        // Audycje
        cy.get('#ToSellEvidence').should('have.attr', 'title', 'Dodaj audycję')
        cy.get('#ToMassSellEvidence').should('have.attr', 'title', 'Masowa ewidencji sprzedaży') // w TC jest Masowa ewidencja sprzedaży
        cy.get('#cpySapIdAudition').should('have.attr', 'title', 'Kopiuj ID audycji SAP')
        cy.get('#cpySapNr').should('have.attr', 'title', 'Kopiuj nr SAP prod.')
        cy.get('a[title="Pełna lista audycji"]').should('have.attr', 'title', 'Pełna lista audycji')

        // Zalaczniki
        cy.get('#btnSelectAttachmentLocal').should('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        cy.get('#btnSelectAttachmentScanFile').should('have.attr', 'title', 'Dodaj Link Do Załącznika')// w TC jest Dodaj link do załącznika

        // 5. wypelnij pola =============================================================================================================================================================
        cy.log('Krok 5 - wypełnij pola')
        // Forma
        cy.get('#CurrentTitle_AuditionTypeId').select('1', { force: true })

        // F. opis
        cy.get('#CurrentTitle_AuditionTypeDescription').type('Opis testowy')

        // Czas
        cy.get('#CurrentTitle_DurationTime').type('00:20:00')

        // Odc.
        cy.get('#CurrentTitle_LiczbaOdcinkow').clear().type('10')

        // F. szczeg.
        cy.get('#select2-CurrentTitle_AuditionTypeDetailId-container').click()
        cy.get('#select2-CurrentTitle_AuditionTypeDetailId-results > :nth-child(1)').click()

        // Antena
        cy.get('#select2-CurrentTitle_AntenaInt-container').click()
        cy.get('#select2-CurrentTitle_AntenaInt-results > :nth-child(1)').click()

        // NRA
        cy.get('#CurrentTitle_Nra').type('Opis testowy NRA')

        // Finansowanie
        cy.get('#CurrentTitle_FundingTypeId').select('1', { force: true })

        // Lokowanie (zaznacz checkbox) - nie da sie go zaznaczyć
        cy.get('#CurrentTitle_HasProductPlacement').check({ force: true })
        cy.get('#CurrentTitle_HasProductPlacement').uncheck({ force: true })
        // Lokowanie w por. - pusta lista
        // cy.get('#select2-CurrentTitle_ProductPlacementAgreementId-container').click()
        // .type('TBD')
        // cy.get('#select2-CurrentTitle_ProductPlacementAgreementId-results > :nth-child(1)').click()

        // Inne ustalenia
        cy.get('#CurrentTitle_Other').type('testowe ustalenia')
        // Uwagi
        cy.get('#CurrentTitle_Comments').type('testowe uwagi')
        // Data
        cy.get('#CurrentTitle_EmissionDatePlan').type('pole typu Text, testowa data 22.11.2020')
        // Godz.
        cy.get('#CurrentTitle_EmissionTimePlan').clear().type('19:00')
        // Termin rozpoczęcia
        e22.terminRozpoczeciaPoleTekstowe().type('11.2020')
        // Termin odbioru
        e22.terminOdbioruPoleTekstowe().type('jak najszybciej')

        // 6. Kwoty cyklu =============================================================================================================================================================
        cy.log('Krok 6 - Kwoty cyklu')
        e22.wartoscPrawNabytychPoleTekstowe().clear().type('101,11')
        e22.wartoscMaterialowArchiwalnychPoleTekstowe().clear().type('102,22')
        e22.wartFinansZInJednPoleTekstowe().clear().type('103,33')

        // asercje na pola read-only w zestawieniu zbiorczym
        cy.get('#CurrentTitle_PochodneOdWynagrodzen').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_KosztyZewnetrzne').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_KosztyBezposrednie').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_KosztyPosrednie').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_KosztyRazem').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_KosztCalkowityNetto').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_VatMoney').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_VatOdPraw').should('have.attr', 'readonly')
        cy.get('#CurrentTitle_CenaSprzedazy').should('have.attr', 'readonly')

        // 7. Kliknij edytuj wskaźniki =============================================================================================================================================================
        cy.log('Krok 7 - Kliknij edytuj wskaźniki')
        cy.get('.text-center > span > .btn').click()
        cy.get('#NarzutKosztowPosrednich').clear().type('5,55')
        cy.get('#Vat').should('be.disabled')
        cy.get('#VatWkosztach').clear().type('15,49')
        cy.get('#ZusodWynagrodzen').clear().type('20,51')
        cy.get('#SredniaOdWynagrodzen').should('have.attr', 'readonly')
        cy.get('#VatOdPraw').clear().type('25,99')
        cy.get('#RatioModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        // fWspolne.komunikat().should('contain', 'Pomyślnie uaktualniono wskażniki') - obecnie brak komunikatu

        // pobranie wartości z pól i porównanie wartości
        cy.get('.text-center > span > .btn').click()
        cy.get('#NarzutKosztowPosrednich').should('have.value', '5,55 %')
        cy.get('#Vat').should('have.value', '0,00 %')
        cy.get('#VatWkosztach').should('have.value', '15,49 %')
        cy.get('#ZusodWynagrodzen').should('have.value', '20,51 %')
        cy.get('#SredniaOdWynagrodzen').should('have.value', '0,00 %')
        cy.get('#VatOdPraw').should('have.value', '25,99 %')
        cy.get('#RatioModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()

        // 8. zmien tryb przebiegu==============================================================================================================================================================
        cy.log('Krok 8 - zmien tryb przebiegu')
        cy.get('#ProductionMode').select('SP - Szybki przebieg', { force: true })
        cy.get('#quickProgressModal-yesBtn').click()

        // 9. kliknij Zapisz =============================================================================================================================================================
        cy.log('Krok 9 - Kliknij Zapisz')
        cy.get('#CurrentTitle_AuditionTypeId').select('INNE', { force: true })
        cy.get('input#CurrentTitle_DurationTime').type('08:00:00')
        e22.terminRozpoczeciaPoleTekstowe().type(nextDay)
        e22.terminOdbioruPoleTekstowe().type(nextMonth)
        e22.zapiszPrzycisk().click()
        // cy.get('#changeNumberOfEpisodesConfirmModal-yesBtn').click() - zakomentowane bo w teście nie zmieniamy liczby odcinków 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano porozumienie')
        fWspolne.sprawdzProgressBar()
        // cy.get('[style="padding: 10px; cursor: pointer; width: 340px; display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 9999; top: 199px; right: 5px; animation-iteration-count: 1;"] > div > [style=""] > [data-notify="message"]')
        // .should('contain', ' Liczba odcinków planowana jest różna od ilości audycji')

        e22.kosztyPlanowanePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.rodzajZatrudnieniaLista().select('pracownik', {force: true})
        e23.pozycjaWCennikuJULista().select('Wszystkie gatunki ->  Wszystkie podgatunki  ->  Kategoria: I ->  KTA - inżynier studia - S7', {force: true})
        e23.jednostkaObliczeniowaLista().should('be.disabled')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // 10. Wyjdź do głównego ekranu porozumień i wejdź w stworzone porozumienie==============================================================================================================================================================
        cy.log('Krok 10 - Wyjdź do głównego ekranu porozumień i wejdź w stworzone porozumienie')
        e22.powrotPrzycisk().click()
        cy.url().should('contain', '/Agreement/Index')
        cy.get('#Number').then(($s) => {
            cy.get($s).type(agrementNr)
            e20.wyszukajPrzycisk().click()
        })
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        cy.get('#InternalNr').should('have.value', intID)
        cy.get('#TvAudition').should('have.value', rndAudycja)
        cy.get('#AgrementNrTextBox').should(($p) => {
            expect($p).to.have.value(agrementNr)
        })

        // dodawanie uprawnienia dla test_user_11 na potrzeby przyszłych testów
        cy.get('#addProducerRepresentativeBtn').click()
        fWspolne.komunikat().first().click()
        cy.get('#mainTable > tbody > tr > td').contains('test_user_11').siblings().find('input.checkbox').click({ force: true }).should('be.checked')
        cy.get('#producerRepresentativeModal-yesBtn').click()

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })

    it('1124 - Dodanie audycji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // Porozumienia
        cy.goToMenu('Porozumienia')

        // wyfiltrowanie porozumienia i przejscie do widoku edycji
        cy.get('#Number').then(($s) => {
            cy.get($s).type(agrementNr)
            e20.wyszukajPrzycisk().click()
        })
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e22.numerPorozumieniaPoleTekstowe().should(($p) => {
            expect($p).to.have.value(agrementNr)
        })

        // pobranie wartości "Nr. Poroz.", "Audycja TV" i "Kosztorys", "Cena sprzedaży" do pozniejszego porownania
        // var agrementNr = ''
        // cy.get('#AgrementNrTextBox').then((a) => {
        //     agrementNr = a[0].getAttribute('value')
        // })
        // var tvAudition = ''
        // cy.get('#TvAudition').then((b) => {
        //     tvAudition = b[0].getAttribute('value')
        // })
        let costEstimate
        cy.get('#CurrentTitleId > option').invoke('text').then((c) => {
            costEstimate = c
        })
        let sellPrice  // zmienna dodana tylko w celu przedstawienia sposobu porównywania wartosci pól
        e22.cenaSprzedazyPoleTekstowe().then(($d) => {
            sellPrice = $d[0].getAttribute('value')
        })

        // Kliknij przycisk "Dodaj audycję".==============================================================================================================================================================
        cy.log('Krok 11 - Kliknij przycisk "Dodaj audycję".')
        e22.dodajAudycjePrzycisk().should('have.attr', 'title', 'Dodaj audycję').click()
        cy.get('#select2-AgreementId-container').should(($p) => {
            expect($p).to.have.attr('title', agrementNr)
        })
        cy.get('#AuditionName').should(($p) => {
            expect($p).to.have.value(rndAudycja)
        })
        cy.get('#select2-CurrentTitleId-container').should(($p) => {
            expect($p).to.contain.text(costEstimate)
        })
        e24.wyliczCeneSprzedazyPrzycisk().click()
        e24.cenaSprzedazyPoleTekstowe({ timeout: 10000 }).should('have.attr', 'style')
        cy.wait(1000)
        cy.get('[name="SellPriceEpisode"]').invoke('attr', 'value').then((c) => {
            let cenaSprzedazy = c.replace('.', ',')
            expect(cenaSprzedazy).to.be.equal(sellPrice)
        })
        
        // asercja na pole Odcinek
        e24.odcinekPoleTekstowe().should('have.attr', 'value', '1').and('not.have.attr', 'readonly')
        // asercja na pola: "Aktywny" - zaznaczone,  "Sprzedana" odznaczone
        cy.get('#IsSapNumberActive').should('be.checked')
        cy.get('#Sold').should('not.be.checked')
        // asercja na przyciski Zapisz i dodaj nową, Zapisz, Powrót
        cy.get('#AddWithAnotherButton').should('have.text', 'Zapisz i dodaj nową')
        cy.get('#AddButton').should('have.text', 'Zapisz')
        cy.get('#AgreementReturn').should('have.text', 'Powrót')
        // Pola w sekcji "Jednostka usługowa" są odblokowane.
        cy.get('input#JwProductionSap').should('have.prop', 'readOnly', true)
        cy.get('#JwSold').should('have.prop', 'readOnly', true)
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        cy.get('#JwAgencId').should('have.prop', 'readOnly', true)
        // dostępne przyciski Wylicz cenę sprzedaży i Wybierz plik
        cy.get('#getSellPriceEpisode').parent().should('have.attr', 'data-original-title', 'Wylicz Cenę Sprzedaży n/p Kosztorysu')
        cy.get('#getJwSellPriceEpisode').parent().should('have.attr', 'data-original-title', 'Wylicz Cenę Sprzedaży JW n/p Kosztorysu')
        cy.get('#btnSelectInvoiceScanFile').should('have.attr', 'title', 'Wybierz plik')
        cy.get('#btnSelectProtocolScanFile').should('have.attr', 'title', 'Wybierz plik')

        // //Kliknij przycisk "Zapisz".==============================================================================================================================================================
        cy.log('Krok 12 - Kliknij przycisk "Zapisz".')
        cy.scrollTo('top')
        cy.get('#AddButton').click()
        // Następuje powrót na ekran szczegółów porozumienia. Na liście audycji wyświetla się nowa audycja z numerem odcinka równym 1 i zaznaczonym checkboxem w kolumnie "A". 
        fWspolne.komunikat().should('not.contain', 'Uwaga! Błąd podczas zapisywania audycji. Istnieje już taka Audycja')
        cy.get('.odd > .sorting_1').should('contain', '1')
        cy.get('#auditionList > tbody > .odd > :nth-child(4)').children().should('be.checked')

        // Kliknij przycisk "Dodaj audycję".==============================================================================================================================================================
        cy.log('Krok 13 - Kliknij przycisk "Dodaj audycję".')
        cy.get('#ToSellEvidence').should('have.attr', 'title', 'Dodaj audycję').click()
        cy.get('#select2-AgreementId-container').should(($p) => {
            expect($p).to.have.attr('title', agrementNr)
        })
        cy.get('#AuditionName').should(($p) => {
            expect($p).to.have.value(rndAudycja)
        })
        cy.get('#select2-CurrentTitleId-container').should(($p) => {
            expect($p).to.contain.text(costEstimate)
        })

        // wypełnienie pól i kliknięcie na przycisk "Zapisz i dodaj nową".==============================================================================================================================================================
        cy.log('Krok 14 - Wypełnij pola.')
        const idAudycji = DateTime.now().toFormat('yyyyMMddHHmm')
        cy.get('#AuditionId').type('IDA' + idAudycji)
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapEmisyjnyPoleTekstowe().type(idAudycji)
        cy.get('#ProductionSap').type(idAudycji)
        cy.get('#Sold').check()
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        cy.get('#EpisodeDescription').type('Testowy opis odcinka 1234')
        cy.get('#OrderAuditionDate').type(prevDay)
        // cy.get('#select2-OrderingUnitId-container').click()
        cy.get('.col-lg-7 > .select2 > .selection > .select2-selection').click()
        cy.get('#select2-OrderingUnitId-results > :nth-child(1)').should('contain', 'Agencja Kreacji Filmu i Serialu').click()
        cy.get('#SellPriceEpisode').clear().type('123,56')
        cy.get('#ContractNumber').type(idAudycji)
        cy.get('#PlanedRealizationDateYear').type('2022')
        cy.get('#PlanedRealizationDateMonth').type('12')
        cy.get('#PlanedRealizationDateDay').type('31')
        cy.get('#InvoiceNumber').type(idAudycji)
        cy.get('#InvoiceDate').type(prevDay)
        cy.get('#ReceiptProtocolNumber').type(idAudycji)
        cy.get('#EmmisionDate').type('12.12.2021')

        // klikniecie na przycisk
        cy.get('#AddWithAnotherButton').click()
        // walidacja po kliknieciu
        cy.get('.col-sm-11 > div').should('contain', 'Uwaga! Błąd podczas zapisywania audycji. Istnieje już taka Audycja')

        // Zmień wartość w polu "Odcinek" na "2" i pliknij ponownie na przycisk "Zapisz i dodaj nową".=========================================================================================================
        cy.log('Krok 15 - Zmień wartość w polu "Odcinek" na "2"')
        let nrNastepnegoOdcinkaString
        cy.get('#Episode').then(($span) => {
            let nrodcinka = parseInt($span[0].getAttribute('value'))
            ++nrodcinka
            cy.get('#Episode').clear().type(nrodcinka.toString())
            let nrNastepnegoOdcinka = nrodcinka + 1
            nrNastepnegoOdcinkaString = nrNastepnegoOdcinka.toString()
            cy.log(nrNastepnegoOdcinkaString)
        })
        cy.get('#AddWithAnotherButton').click()
        // walidacja po kliknieciu
        fWspolne.komunikat().should('not.contain', 'Uwaga! Błąd podczas zapisywania audycji. Istnieje już taka Audycja')
        cy.get('#Episode').should(($p) => {
            expect($p).to.have.value(nrNastepnegoOdcinkaString)
        })

        // Kliknij przycisk "Powrót".==============================================================================================================================================================
        cy.log('Krok 16 - Kliknij przycisk "Powrót"')
        cy.get('#AgreementReturn').click()
        cy.get('.even > .sorting_1').should('contain', '2')
        cy.get('.even > :nth-child(4)').children().should('be.checked')
        cy.get('.even > .idauditionsap').should('contain', 'IDA' + idAudycji)
        cy.get('.even > :nth-child(3)').should('contain', idAudycji)
        cy.get('.even > .prodsap').should('contain', idAudycji)
        cy.get('.even > :nth-child(7)').children().should('be.checked')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })

    it('1187 - Dodanie numerów SAP', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginDyrektorAgencjiCUP()
        // Porozumienia
        cy.goToMenu('Porozumienia')

        // wyfiltrowanie porozumienia i przejscie do widoku edycji
        cy.get('#Number').then(($s) => {
            cy.get($s).type(agrementNr)
            e20.wyszukajPrzycisk().click()
        })
        cy.get('#progressBar').should('not.be.visible')
        e20.edycjaPierwszyPrzycisk().click()
        cy.get('#AgrementNrTextBox').should(($p) => {
            expect($p).to.have.value(agrementNr)
        })

        // pobranie wartości "Audycja TV" i "Kosztorys", "Cena sprzedaży" do pozniejszego porownania

        // var tvAudition = ''
        // cy.get('#TvAudition').then((b) => {
        //     tvAudition = b[0].getAttribute('value')
        // })
        let costEstimate
        cy.get('#CurrentTitleId > option').invoke('text').then((c) => {
            costEstimate = c
        })

        // Kliknij przycisk "Edytuj" przy wybranej audycji.==============================================================================================================================================================
        cy.log('Krok 17 - Kliknij przycisk "Edytuj" przy wybranej audycji')
        cy.get('.even > .checkboxClass > span > .btn').click()
        // Otwiera się ekran Ewidencji sprzedaży [E24].
        // W sekcji Audycja wartości "Nr. Poroz.", "Audycja TV" i "Kosztorys", "Cena sprzedaży" są zgodne z tymi z porozumienia, do którego należą.
        cy.get('#select2-AgreementId-container').should(($p) => {
            expect($p).to.have.attr('title', agrementNr)
        })
        cy.get('#AuditionName').should(($p) => {
            expect($p).to.have.value(rndAudycja)
        })
        cy.get('#select2-CurrentTitleId-container').should(($p) => {
            expect($p).to.contain.text(costEstimate)
        })
        // W polu "Odcinek" jest domyślnie wpisana wartość "1". Pole "Aktywny" jest zaznaczone, a "Sprzedana" odznaczone. - klikamy na odcinek nr 2 wiec i taki nr będzie widoczny
        cy.get('#Episode').should('have.attr', 'value', '2').and('have.attr', 'readonly')
        // cy.get(':nth-child(3) > .col-lg-1').should('be.checked')
        // cy.get(':nth-child(1) > :nth-child(1) > .well > :nth-child(1) > .col-lg-2').should('not.be.checked')
        // cy.get('#IsSapNumberActive').should('be.checked')
        // cy.get('#Sold').should('not.be.checked')

        // Edytuj pola i wprowadź ciąg znaków "SAP usługowy" ==============================================================================================================================================================
        cy.log('Krok 18 - Edytuj pola i wprowadź ciąg znaków "SAP usługowy"')

        // Pola zostały uzupełnione.
        const sapId = DateTime.now().toFormat('yyMMddHHmm')
        cy.get('#JwProductionSap').type(sapId + '01')

        // Kliknij przycisk "Zapisz".==============================================================================================================================================================
        cy.log('Krok 19 - Kliknij przycisk "Zapisz"')
        cy.get('#UpdateButton').click()
        // Następuje powrót na ekran Audycji. Na liście audycji wyświetlają się wprowadzone wcześniej numery SAP. U góry po lewej przez kilka sekund widoczny jest komunikat, że zapis został wykonany poprawnie.
        cy.get('.breadcrumb > .active').should('contain', 'Porozumienie')
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano audycję')
    })

    it('1152 - Stworzenie wniosku o zasoby', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.goToMenu('Wnioski o przydzielenie zasobów')

        // Użyj buttonu "Dodaj nowy wniosek"==============================================================================================================================================================
        cy.log('Krok 20 -  Użyj buttonu "Dodaj nowy wniosek"')
        cy.get('.dt-buttons > .btn-success').should('be.visible').and('have.attr', 'title', 'Dodaj nowy wniosek').click()

        // Otwarty zostaje ekran szczegółów wniosku o zasoby. ID wniosku wynosi 0. Dostępne buttony to "Zapisz" i "Powrót". Pola "Nr Porozumienia" i "Zamawiający/zlecający" są zablokowane. 
        cy.get('.fieldsetField').should('be.visible').and('contain', '0')
        cy.get('#SaveOrderBtn').as('zapiszWniosek')
        cy.get('@zapiszWniosek').should('be.visible').and('contain', 'Zapisz')
        cy.get('#autoReturnClick').as('powrot')
        cy.get('@powrot').should('be.visible').and('contain', 'Powrót')
        cy.get('#AgreementNumber').should('be.visible').and('have.attr', 'readonly')
        cy.get('#OrderingUnitName').should('be.visible').and('have.attr', 'readonly')

        // Kliknij "Zapisz"==============================================================================================================================================================
        cy.log('Krok 21 -  Kliknij "Zapisz"')
        cy.get('@zapiszWniosek').click()
        // Otwiera się pole z tekstem "Problem! Wymagane jest wskazanie porozumienia."
        fWspolne.komunikat().should('be.visible').and('contain', 'Problem! Wymagane jest wskazanie porozumienia.')

        // W polu "Nazwa audycji TV" wpisz nazwę porozumienia.==============================================================================================================================================================
        cy.log('Krok 22 -  W polu "Nazwa audycji TV" wpisz nazwę porozumienia.')
        cy.get('#select2-AgreementId-container').click()
        cy.get('.select2-search__field').type(rndAudycja)
        // /Otwiera się lista z wybranym porozumieniem, po wybraniu go, jego nazwa zostaje zapisana na ekranie.
        cy.get('#select2-AgreementId-results > :nth-child(1)').should('be.visible').and('contain', rndAudycja).click()

        // Kliknij "Zapisz" =============================================================================================================================================================
        cy.log('Krok 23 -  Kliknij "Zapisz"')
        cy.get('@zapiszWniosek').click({ force: true })
        // Zostaje nadany ID porozumienia. Pole "Nr Porozumienia" zostaje uzupełnione o numer porozumienia.
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano wniosek o zasoby.')
        cy.get('#AgreementNumber').should('not.have.value', '')
        // Pojawiają się sekcje "Osoby wiodące", "Rezerwacje" i "Załączniki" oraz buttony "Osoby na planie", "Rozliczenie kosztów". "Zapisz", "Historia zmian" i "Powrót".  Zweryfikuj wysłane dane i odpowiedź serwera.
        cy.get('[style="margin-bottom: 7px"] > .fieldsetField').should('be.visible').and('contain', 'Osoby wiodące')
        cy.get(':nth-child(6) > .fieldsetField').should('be.visible').and('contain', 'Rezerwacje')
        cy.get(':nth-child(8) > .fieldsetField').should('be.visible').and('contain', 'Załączniki')
        cy.get('#PeopleOnPlanBtn').should('be.visible').and('contain', 'Osoby na planie')
        cy.get('#CalculatedCostReportBtn').should('be.visible').and('contain', 'Rozliczenie zasobów')
        cy.get('#SaveOrderBtn').should('be.visible').and('contain', 'Zapisz')
        e502.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        cy.get('#autoReturnClick').should('be.visible').and('contain', 'Powrót')
    })

    it('1135 - Dodanie rezerwacji', function () {
        // //strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.goToMenu('Wnioski o przydzielenie zasobów')
        // var todayDate = '03.03.2021'
        cy.get('#AuditionName').type(rndAudycja)
        e501.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')
        // cy.get('.DTFC_RightBodyLiner > .table > tbody > .odd > .text-center > .btn-success').should('have.attr', 'title', 'Edytuj wniosek').click()
        e501.edytujWniosekPierwszyPrzycisk().should('have.attr', 'title', 'Edytuj wniosek').click()
        cy.get('.active').should('contain', 'Wniosek o przydzielenie zasobów')

        // Kliknij w przycisk "Dodaj rezerwację".==============================================================================================================================================================
        cy.log('Krok 24 - Kliknij w przycisk "Dodaj rezerwację".')
        e502.dodajRezerwacjePrzycisk().should('have.attr', 'title', 'Dodaj rezerwację').click()
        // Otwiera się ekran szczegółów rezerwacji z możliwością wybrania sekcji, dni zdjęciowych i miejsca realizacji. Dostępne są przyciski "Zapisz" i "Powrót" oraz 'Wstępna rezerwacja'.

        cy.checkingIfTheLocatorIsAContainer('#select2-SectionDefinitionId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsACalendar('#div_DateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_DateTo')
        cy.checkingIfTheLocatorIsAContainer('#select2-RealizationPlaceId-container', 'Wybierz...')

        cy.get('#saveForm').as('zapiszWniosekOPrzydzielenieZasobow')
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').should('be.visible').and('contain', 'Zapisz')
        e50201.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')

        // Kliknij w przycisk "Zapisz".==============================================================================================================================================================
        cy.log('Krok 25 - Kliknij w przycisk "Zapisz".')
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()
        // W polach:
        //     Sekcja
        //     Data realizacji od
        //     Data realizacji do
        //     Miejsce realizacji
        // pojawia się komunikat (ikona) walidacyjny o braku wypełnienia.
        cy.get('#SectionDefinitionId-error').should('contain', 'Wymagane wypełnienie pola \'Sekcja\'.')
        cy.get('#DateFrom-error').should('contain', 'Wymagane wypełnienie pola \'Data realizacji od\'.')
        cy.get('#dateDiv > :nth-child(4) > .inputgroup > .textbox-danger > .text-danger').should('contain', 'Wymagane wypełnienie pola \'Data realizacji do\'.')
        cy.get('#RealizationPlaceId-error').should('contain', 'Należy wskazać miejsce realizacji')

        // Wypełnij wymagane pola.==============================================================================================================================================================
        cy.log('Krok 26 - Wypełnij wymagane pola.')
        // Po wypełnieniu dat realizacji w sekcji "Dni zdjęciowe" pojawia sie lista dni objętych rezerwacją. Następnie wypełnia się pola "Sekcja" oraz "Miejsce realizacji".
        cy.get('#DateFrom').type(prevDay)
        cy.get('#DateTo').type(prevDay)
        cy.get('#OtherRealizationPlace').click()
        cy.get('.dataTables_empty').should('not.exist')
        cy.get('#SectionDefinitionId').select('1', { force: true })
        cy.get('#RealizationPlaceId').select('Studio S2', { force: true })

        // Kliknij w przycisk "Zapisz".==============================================================================================================================================================
        cy.log('Krok 27 - Kliknij w przycisk "Zapisz".')
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()

        // Pojawia się komunikat walidacyjny o konieczności zaznaczenia przynajmniej 1 dnia zdjęciowego. Pole "Sekcja" zostaje zablokowane.
        fWspolne.komunikat().should('be.visible').and('contain', 'Uwaga! W danej rezerwacji musi być zaznaczony przynajmniej jeden dzień zdjęciowy.').click()

        // Zaznacz jeden dzień zdjęciowy z listy i kliknij "Zapisz"..==============================================================================================================================================================
        cy.log('Krok 28 - Zaznacz jeden dzień zdjęciowy z listy i kliknij "Zapisz".')
        cy.get('#DayList_0__IsSelected').check()
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()
        
        // Pojawia się komunikat o pomyślnym zapisaniu rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano szczegóły rezerwacji.').click()
        // Na górze ekranu pojawił się przycisk "Złóż zamówienie", a pole "Id. rezerwacji" wypełniło się nowo wygenerowanym numerem.
        cy.get('#SendToAcceptanceSection').should('be.visible').and('contain', 'Złóż zamówienie')
        cy.get('div.col-lg-2 > #Id').should('not.have.value', '')
        let reservationId
        cy.get('div.col-lg-2 > #Id').then(($a) => {
            reservationId = $a[0].getAttribute('value')
        })
        // Przy wybranym dniu zdjęciowym pojawiają się przyciski:
        //     Zasoby (E)
        //     Kopiuj dane do pozostałych dni zdjęciowych (K)       brak tego przycisku
        //     Audycje (A)
        cy.get('.noWrap > .btn-success').as('E')
        cy.get('@E').should('be.visible').and('have.attr', 'title', 'Zasoby')
        cy.get('.noWrap > .btn-yellow').as('A')
        cy.get('@A').should('be.visible').and('have.attr', 'title', 'Audycje')

        // Kliknij w przycisk "A".==============================================================================================================================================================
        cy.log('Krok 29 - Kliknij w przycisk "A".')
        cy.get('@A').click()
        // Pojawia się popup z listą audycji (checkboxy) z kolumnami:
        //     Nr odcinka
        //     ID Audycji
        //     SAP_P
        //     SAP_U
        cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Audycje w rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Nr odcinka"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="ID Audycji"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="SAP_P"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="SAP_U"]').should('be.visible')
        // oraz przyciskami "Potwierdź" i "Anuluj".
        cy.get('#AuditionReservationModal-yesBtn').should('be.visible').and('contain', 'Potwierdź')
        cy.get('#AuditionReservationModal-noBtn').should('be.visible').and('contain', 'Anuluj')

        // Zaznacz jedną z audycji i kliknij "Potwierdź".==============================================================================================================================================================
        cy.log('Krok 30 - Zaznacz jedną z audycji i kliknij "Potwierdź".')
        cy.get('#AuditionList_1__IsChecked').click().should('be.checked')
        cy.get('#AuditionReservationModal-yesBtn').click()
        // Okienko popup się zamyka. Przy wybranym dniu zdjęciowym pojawiają się odpowiednie wartości zgodne z wybraną audycją.
        cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        cy.get('tbody > tr > :nth-child(3)').should('contain', 'IDA')

        // Kliknij w przycisk "E" =============================================================================================================================================================
        cy.log('Krok 31 - Kliknij w przycisk "E"')
        cy.get('@E').click()
        // Otwiera się ekran przypisania zasobów do dnia zdjęciowego dla wybranej sekcji [E502.00].
        cy.get('.active').should('contain', 'Dzień zdjęciowy')

        // Jeśli wybrano np. Technikę studyjną to pojawią się następujące sekcje:
        // lista utworzonych rezerwacji
        // cy.get(':nth-child(16) > .fieldsetField').should('contain','Rezerwacje we wniosku')
        // Audycje
        cy.get('#ProgramName').should('have.attr', 'value', rndAudycja)
        // Harmonogram prac
        cy.get('.fieldsetField').contains('Harmonogram prac')
        // Zapotrzebowanie na osoby
        cy.get('.fieldsetField').contains('Zapotrzebowanie na osoby')
        // Zapotrzebowanie na sprzęt
        cy.get('.fieldsetField').contains('Zapotrzebowanie na sprzęt')


        // Klikam w przycisk "+" w sekcji "Zapotrzebowanie na osoby" oraz w przycisk "+" w sekcji "Zapotrzebowanie na sprzęt". ==============================================================================================================================================================
        cy.log('Krok 32 - Klikam w przycisk "+" w sekcji "Zapotrzebowanie na osoby" oraz w przycisk "+" w sekcji "Zapotrzebowanie na sprzęt". ')
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().check()
        cy.get('#pricePositionTable_table > tbody > tr:nth-child(1) > td.sorting_1').invoke('text').then((c) => {
            stanowisko = c
        })
        e50212.zatwierdzPrzycisk().click()
        // W sekcji "Zapotrzebowanie na osoby" pojawia się nowy wiersz w tej sekcji z polami:
        // Stanowisko
        cy.get('input#PersonRequestListTableInfo_RequestForPersonList_0__PositionName').should('be.visible')
        // Liczba
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Count').should('be.visible')
        // Data rozpoczęcia
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartDate').should('be.visible')
        // Godzina rozpoczęcia
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartTime').should('be.visible')
        // Data zakończenia
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndDate').should('be.visible')
        // Godzina zakończenia
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndTime').should('be.visible')
        // Uwagi
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Comments').should('be.visible')

        cy.get('#btnServiceAdd').click()
        // W sekcji "Zapotrzebowanie na sprzęt" pojawia się nowy wiersz w tej sekcji z polami:
        // Sprzęt
        cy.get('span[aria-labelledby=select2-ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__PositionId-container]').should('be.visible')
        // Ilość
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Count').should('be.visible')
        // Data rozpoczęcia
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartDate').should('be.visible')
        // Godzina rozpoczęcia
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartTime').should('be.visible')
        // Data zakończenia
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndDate').should('be.visible')
        // Godzina zakończenia
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndTime').should('be.visible')
        // Uwagi
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Comments').should('be.visible')

        // Wypełniam wszystkie pola w obu sekcjach i klikam w przycisk "Zapisz". ==============================================================================================================================================================
        cy.log('Krok 33 - Wypełniam wszystkie pola w obu sekcjach i klikam w przycisk "Zapisz".')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Count').should('have.attr', 'value', '1')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartDate').should('have.attr', 'value', prevDay)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartTime').type('18:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndDate').should('have.attr', 'value', prevDay)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndTime').type('22:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Comments').type('test uwagi')

        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__PositionId').select('420', { force: true })
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Count').should('have.attr', 'value', '1')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartDate').should('have.attr', 'value', prevDay)
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartTime').type('18:00')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndDate').should('have.attr', 'value', prevDay)
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndTime').type('22:00')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Comments').type('test uwagi')

        cy.get('#saveForm').click()
        // Pojawia się komunikat o pomyślnym zapisaniu szczegółów rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano szczegóły rezerwacji.')

        // Kliknij przycisk "Powrót".==============================================================================================================================================================
        cy.log('Krok 34 - Kliknij przycisk "Powrót".')
        e50200.powrotPrzycisk().should('contain', 'Powrót').click()
        // Następuje powrót na ekran szczegółów rezerwacji z listą dni zdjęciowych [E502.01].
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')

        // Kliknij przycisk "Powrót".==============================================================================================================================================================
        cy.log('Krok 35 - Kliknij przycisk "Powrót".')
        e50201.powrotPrzycisk().should('contain', 'Powrót').click()
        // Następuje powrót na ekran szczegółów wniosku z listą rezerwacji [E502]. Na liście rezerwacji jest jedna odpowiadająca wcześniej wprowadzonym danym. 
        cy.get('.active').should('contain', 'Wniosek o przydzielenie zasobów')
        cy.get('#HideExecuted').uncheck()
        e502.wyszukajPrzycisk().click()
        cy.get('#sectionTable_table > tbody > .odd > :nth-child(2)').should(($p) => {
            expect($p).to.have.text(reservationId)
        })
    })

    it('1132 - Przekazanie rezerwacji do Dyspozytury', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // Użytkownik jest na ekranie listy wniosków [E501].
        // Istnieje rezerwacja w statusie "Roboczy" dla określonej audycji
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e20.zaawansowanePrzycisk().click()
        cy.get('#AuditionName').type(rndAudycja)
        cy.get('#select2-OrderStatusId-container').click()
        cy.get('#select2-OrderStatusId-results').contains('Roboczy').click()
        e20.zaawansowanePrzycisk().click()
        cy.get('#HideExecuted').uncheck()
        e20.wyszukajPrzycisk().first().click()
        cy.get('#progressBar').should('not.be.visible')

        // Kliknij w przycisk "Edytuj wniosek" (E)  przy wniosku w statusie "Roboczy".============================================================================================================================================
        cy.log('Krok 36 -  Kliknij w przycisk "Edytuj wniosek" (E)  przy wniosku w statusie "Roboczy".')
        e501.edytujWniosekPierwszyPrzycisk().click()

        // Nastąpiło przejście na ekran z listą rezerwacji [E502] zawierającą kolumnę "Status"
        cy.url().should('contain', '/OrderDetails/Edit')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible')

        // Kliknij w przycisk "Edytuj rezerwację" (E)  przy rezerwacji w statusie "Roboczy".=====================================================================================================================================
        cy.log('Krok 37 -  Kliknij w przycisk "Edytuj rezerwację" (E)  przy rezerwacji w statusie "Roboczy".')
        cy.get('#HideExecuted').uncheck()
        e502.wyszukajPrzycisk().click()
        cy.get('.auditionCheckBtn').click()
        // Nastąpiło przejście na ekran z szczegółów rezerwacji [E502.01] zawierającą kolumnę "Status rezerwacji"
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')
        cy.get('#StatusName').parentsUntil('#ReservationForm').should('contain', 'Status rezerwacji').and('be.visible')
        // Na ekranie widać przycisk "Złóż zamówienie".
        cy.get('#SendToAcceptanceSection').should('contain', 'Złóż zamówienie').and('be.visible')

        // Kliknij na "Złóż zamówienie".==============================================================================================================================================================
        cy.log('Krok 38 -  Kliknij na "Złóż zamówienie".')
        cy.get('#SendToAcceptanceSection').click()
        // Pojawia się popup proszący o potwierdzenie operacji z przyciskami "Tak" i "Nie".
        cy.get('#ConfirmSendToAcceptanceModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Uwaga!')
        cy.get('#ConfirmSendToAcceptanceModal-yesBtn').should('be.visible').and('contain', 'Tak')
        cy.get('#ConfirmSendToAcceptanceModal-noBtn').should('be.visible').and('contain', 'Nie')

        // Kliknij przycisk "Tak".==============================================================================================================================================================
        cy.log('Krok 39 -  Kliknij przycisk "Tak".')
        cy.get('#ConfirmSendToAcceptanceModal-yesBtn').click()
        // Okienko popup zniknęło i pojawił się komunikat o pomyślnym przekazaniu rezerwacji do Dyspozytury.
        cy.get('#ConfirmSendToAcceptanceModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        fWspolne.komunikat().should('contain', 'Pomyślnie przekazano wniosek do realizacji.')
        // Na liście rezerwacji wybrana rezerwacja zmieniała status na "Przekazany do Dyspozytury".
        cy.get('#StatusName').should('have.attr', 'value', 'Przekazano do dyspozytury (zamówienie)')
    })

    it('Akceptacja rezerwacji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // otwarcie widoku wniosków o przydzielenie zasobów
        cy.goToMenu('Wnioski o przydzielenie zasobów')

        // znajdż wniosek dla audycji
        cy.get('#AuditionName').type(rndAudycja)
        cy.get('#HideExecuted').uncheck()
        e501.wyszukajPrzycisk().click()

        // poczekaj aż sie załaduje
        fWspolne.sprawdzProgressBar()

        // wejdź w edycję audycji
        e501.edytujWniosekPierwszyPrzycisk().click()

        // poczekaj aż sie załaduje
        fWspolne.sprawdzProgressBar()

        // wejdź w edycję rezerwacji
        cy.get('#HideExecuted').uncheck()
        e502.wyszukajPrzycisk().first().click()
        cy.get('.auditionCheckBtn').click()
        // zaakceptuj rezerwację
        cy.get('#AcceptedBtn').click()
        // potwierdź akceptację w modalu
        cy.get('#AcceptedModal-yesBtn').click()
        // zapisz zmiany
        cy.get('#saveForm').click()
        // podaj powód
        e50201.powodyModyfikacjiWnioskuPopupPoleTekstowe().type(faker.lorem.sentence(10))
        e50201.zapiszPopupPrzycisk().click()
        // wyjdż z edycji
        e50201.powrotPrzycisk().click()
    })

    it('1150 - Dodanie pracownika do zlecenia pracy na wykresie Gantta', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // wejście na stronę planowania produkcji
        cy.goToMenu('Planowanie produkcji')

        // zmień datę na poprzedni dzień
        cy.get('.fas.fa-chevron-circle-left').click()

        // pokaż filtr
        cy.get('#btnCollapsedFilter').click()

        // wpisz nazwę audycji
        e503.tytulAudycjiTVPoleTestowe().as('edtAuditionName')
        cy.get('@edtAuditionName').type(rndAudycja)
        cy.get('.select2-results__option').should('contain', rndAudycja)
        cy.get('@edtAuditionName').type('{enter}')

        // wyszukaj
        cy.get('#productionPlanningFilterSubmit').click()

        // kliknij na '0/1'
        cy.get('[data-index="2"] > .example-event').click()
        fWspolne.sprawdzProgressBar()

        // otwiera się pop-up z nazwą audycji i nazwą stanowiska
        // cy.get('.col-lg-12 > :nth-child(1) > .modal-title').should('contain', rndAudycja)
        cy.get('div[class="popover fade bs-popover-left show"] > h3').should('contain', rndAudycja)
        cy.get('.popover-buttons > div > .row').should('contain', stanowisko)

        // oraz operacjami do wyboru
        // // Szczegóły rezerwacji
        cy.get('[title="Podgląd"]').should('be.visible').and('contain', 'Szczegóły rezerwacji')

        // // Dodaj pracownika
        cy.get('[title="Dodaj"]').should('be.visible').and('contain', 'Dodaj pracownika')

        // // Modyfikuj wniosek
        cy.get('[title="Modyfikuj wniosek"]').should('be.visible').and('contain', 'Modyfikuj wniosek')

        // kliknij "Dodaj pracownika"
        cy.get('[title="Dodaj"]').click()

        // Czy daty i godziny są zablokowane
        cy.get('#StartWorkingDate').should('have.prop', 'readOnly', true)
        cy.get('#StartWorkingTime').should('have.prop', 'readOnly', true)
        cy.get('#StopWorkingDate').should('have.prop', 'readOnly', true)
        cy.get('#StopWorkingTime').should('have.prop', 'readOnly', true)
        cy.get('#OvertimeDate').should('have.prop', 'readOnly', true)
        cy.get('#OvertimeTime').should('have.prop', 'readOnly', true)

        // wybierz pracownika
        cy.get('.smf-mass-group-edited-checkbox').first().click()

        // Czy daty i godziny są odblokowane
        cy.get('#StartWorkingDate').should('be.enabled')
        cy.get('#StartWorkingTime').should('be.enabled')
        cy.get('#StopWorkingDate').should('be.enabled')
        cy.get('#StopWorkingTime').should('be.enabled')
        cy.get('#OvertimeDate').should('be.enabled')
        cy.get('#OvertimeTime').should('be.enabled')

        // zapisz wybór
        cy.get('#saveBtn').click()

        // potwierdzenie
        // cy.get('#modalConfirmationNewWorkOrder-yesBtn').click()
        // Pojawia się informacja o poprawnym zapisie
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano czas pracy zasobu.')
        // cy.get('#saveWorkOrderBTN').click()

        // zamknij wybór zasobu
        cy.get('span > .btn').click()

        // Belka na wysokości stanowiska będzie zawierała treść 1/1
        cy.get('[data-index="2"] > .example-event').should('contain', '1/1')
    })

    it('1151 - Dodanie sprzętu do zlecenia na wykresie Gantta', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()
        // wejście na stronę planowania produkcji
        cy.goToMenu('Planowanie produkcji')
        // 1.Na wykresie Gantta należy zlokalizować rezerwację i puste zlecenie na zasób "Dodatkowy tor kamerowy". 
        // Należy wybrać belkę z oznaczeniem 0/1.
        // zmień datę na poprzedni dzień
        cy.get('.fas.fa-chevron-circle-left').click()

        // pokaż filtr
        cy.get('#btnCollapsedFilter').click()

        // wpisz nazwę audycji
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        e503.tytulAudycjiTVPoleTestowe().as('edtAuditionName')
        cy.get('@edtAuditionName').type(rndAudycja)
        // cy.get(':nth-child(2) > :nth-child(1) > .col-lg-11 > .select2 > .selection > .select2-selection > .select2-selection__rendered > .select2-search > .select2-search__field')
        // .type(rndAudycja)

        cy.get('.select2-results__option').should('contain', rndAudycja)
        cy.get('@edtAuditionName').type('{enter}')

        // wyszukaj
        cy.get('#productionPlanningFilterSubmit').click()

        // kliknij na '0/1'
        cy.get('[data-index="4"] > .example-event').click()

        // otwiera się pop-up z nazwą audycji i nazwą sprzętu
        cy.get('div[class="popover fade bs-popover-left show"] > h3').should('contain', rndAudycja)
        cy.get('.popover-buttons > div > .row').should('contain', 'Dodatkowy tor kamerowy')

        // oraz operacjami do wyboru
        // // Szczegóły rezerwacji
        cy.get('[title="Podgląd"]').should('be.visible').should('contain', 'Szczegóły rezerwacji')
        // // Dodaj sprzęt
        cy.get('[title="Dodaj"]').should('be.visible') // [TODO].should('contain', 'Dodaj pracownika')
        // // Modyfikuj wniosek
        cy.get('[title="Modyfikuj wniosek"]').should('be.visible').and('contain', 'Modyfikuj wniosek')

        // 2. Użyj opcji "Dodaj element sprzętowy"
        cy.get('[title="Dodaj"]').click()
        // Otwiera się ekran planowania czasu pracy zasobu. Wyświetla się lista dostępnych sprzętów.

        // Dostępne buttony "Zapisz", "Powrót" i "Objaśnienie użytych kolorów". 
        cy.get('#saveBtn').should('be.visible')  // Zapisz
        cy.get('span > .btn').should('be.visible') // Powrót
        cy.get('button.color-legend').should('be.visible')  // Objasnienie użytych kolorów
        cy.get('button.resource-info-legend') // informacja o pozycji cennika

        // 3. 	Kliknij przycisk "Zapisz"
        cy.get('#saveBtn').click()
        fWspolne.sprawdzProgressBar()
        // Pojawia się komunikat walidacyjny: "Wymagane jest zaznaczenie co najmniej jednego zasobu w drzewie harmonogramu."
        cy.get('#validationSummary')
            .contains('Wymagane jest zaznaczenie co najmniej jednego zasobu w drzewie harmonogramu.')
        // Czy daty i godziny są zablokowane
        cy.get('#StartWorkingDate').should('have.prop', 'readOnly', true)
        cy.get('#StartWorkingTime').should('have.prop', 'readOnly', true)
        cy.get('#StopWorkingDate').should('have.prop', 'readOnly', true)
        cy.get('#StopWorkingTime').should('have.prop', 'readOnly', true)
        cy.get('#Count').should('have.prop', 'readOnly', true)
        // 4. Zaznacz pusty checkbox przy jednym ze sprzętów.
        // // zaznaczaj po kolei checkboxy, aż nie wykryjesz konfliktu
        cy.get('.smf-mass-group-edited-checkbox:not(:checked)').each(function ($checkbox) {
            // kliknij checkbox
            cy.wrap($checkbox).click()
            cy.get('body').then(function ($body) {
                if ($body.find('.event_class_overlap').length) {
                    cy.log('Znaleziono konflikt zasobów')
                    cy.wrap($checkbox).click()   // odkliknij 
                } else {
                    if ($body.find('.smf-mass-group-edited-checkbox:checked').length > 1) {
                        cy.log('Już jest kliknięty, odkliknij')
                        cy.wrap($checkbox).click()   // odkliknij 
                    }
                }
            })
        })
        // cy.get('.smf-mass-group-edited-checkbox:checked').siblings('a[title="Dodatkowy tor kamerowy"]').click()

        // Wpisz dowolny tekst w polu "Uwagi dla pracownika".
        cy.get('#Comments').type(faker.lorem.sentence(4))

        // Sprawdz czy daty i godziny są odblokowane
        cy.get('#StartWorkingDate').should('be.enabled')
        cy.get('#StartWorkingTime').should('be.enabled')
        cy.get('#StopWorkingDate').should('be.enabled')
        cy.get('#StopWorkingTime').should('be.enabled')
        cy.get('#Count').should('be.enabled')

        // zapisz wybór
        cy.get('#saveBtn').click()

        // Pojawia się informacja o poprawnym zapisie 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano czas pracy zasobu.')

        // zamknij okno wyboru zasobu
        cy.get('span > .btn').click()

        // sprawdz poprawnosc wyswietlania zasobu na diagramie
        cy.get('[data-index="4"] > .example-event').should('contain', '1/1')
    })

    it('1154 - Stworzenie karty pracy zbiorczej', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // 1. Użyj buttonu "Dodaj kartę pracy"
        cy.get('.dt-buttons > .btn-success').click()
        cy.contains('Generowanie kart pracy').should('be.visible')

        // 2. Użyj buttonu "Wyszukaj"
        cy.get('#generatorSearchBtn').click()
        
        // Pola oznaczone ikoną wymagające uzupełnienia
        cy.get('div[data-original-title="Wymagane wypełnienie pola \'Rodzaj karty pracy\'."]')
            .should('be.visible')
        cy.get('div[data-original-title="Wymagane wypełnienie pola \'Wydział\'."]')
            .should('be.visible')
        cy.get('div[data-original-title="Wymagane wypełnienie pola \'Data od\'."]')
            .should('be.visible')

        // 3. Uzupełnij pola i kliknij "Wyszukaj"
        // // Rodzaj karty pracy - Zbiorcza
        cy.get('#FilterWorkCardTypeId').select('Zbiorcza', { force: true })
        // // Wydział
        cy.get('[placeholder="Wydział"]').click().type('Wydział techniki studyjnej{enter}')
        // // Data od
        cy.get('#FilterDateFrom').type(prevDay)
        cy.get('#FilterDateTo').clear().type(prevDay)
        // // nazwa audycji
        cy.get('#FilterAuditionName').type(rndAudycja)
        // // kliknij 'Wyszukaj'
        e50902.wyszukajPrzycisk().click()

        // 4. Użyj "Generuj karty pracy"
        e50902.generujKartyPracyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#auditionsModal-noBtn').click()
    })

    it('1158 - Usunięcie Karty pracy', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // 40. Z dostępnych operacji dla karty pracy wybierz opcję "Usuń kartę pracy"
        //   Otwiera się popup "Potwierdzenie operacji". Uzytkownik ma do wyboru opcję "Tak" lub "Nie".
        cy.log('Krok 40 - Z dostępnych operacji dla karty pracy wybierz opcję "Usuń kartę pracy"')
        // pobieram id pierwszej karty pracy na liście
        let id1
        let id2
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(6)').should(($nazwa) => {
            expect($nazwa).to.contain.text('AUDYCJA TEST ')
        })
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text').then(($btn) => {
            id1 = $btn

            // klikam w przycisk usuń przy pierwszej karcie na liście
            e509.anulujKartePracyPierwszyPrzycisk().click()
            cy.log('Weryfikuję czy otwiera się popup "Potwierdzenie operacji" i uzytkownik ma do wyboru opcję "Tak" lub "Nie".')
            e509.takPopupPrzycisk().should('have.text', 'Tak').and('be.visible')
            e509.niePopupPrzycisk().should('have.text', 'Nie').and('be.visible')

            // 41. Wybierz opcję "Tak"
            //   Popup zostaje zamknięty. Karta pracy zostaje usunięta i nie wyświetla się na liście kart pracy. 
            //   Zweryfikuj wysłane dane i odpowiedź serwera.
            cy.log('Krok 41 - Wybierz opcję "Tak".')
            e509.takPopupPrzycisk().click()
            cy.get('#modalComment').type('anuluj kartę')
            cy.get('#rejectModal-yesBtn').click()
            fWspolne.sprawdzProgressBar()
            cy.log('Weryfikuję czy karta pracy została usunięta i nie wyświetla się na liście kart pracy.')
            cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text').then(($btn2) => {
                id2 = $btn2
                expect(id1).to.not.equal(id2)
            })
        })

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })

    it('1149 - Akceptacja zlecenia pracy', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikDyspozytury()

        // otworzenie widoku listy zleceń pracy
        cy.goToMenu('Zlecenia pracy')

        // 42. Na liście zleceń pracy wybrane jest zlecenie w statusie "Oczekujące na akceptację" i należy użyć przycisku "A" przy tym zleceniu.=================================================================================
        cy.log('Krok 42 - Na liście zleceń pracy wybrane jest zlecenie w statusie "Oczekujące na akceptację" i należy użyć przycisku "A" przy tym zleceniu.')
        // Widoczna jest lista zleceń użytkownika. Zlecenia w statusie "Oczekujące na akceptację" mają dostępne operacje "P", "Z" i "A". ("N" tez jest widoczne)
        e504.tytulAudycjiPoleTekstowe().type(rndAudycja)
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr').should('contain', 'Oczekujące na akceptację')
        e504.przegladRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Przegląd rezerwacji')
        e504.przegladZleceniaPracyPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Przegląd zlecenia pracy')
        e504.edycjaPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja')
        e504.anulacjaZleceniaPracyPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Anulacja zlecenia pracy')
        e504.akceptacjaZleceniaPracyPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Akceptacja zlecenia pracy')

        // W momencie wybrania operacji "A", otwiera się popup "Akceptacja zlecenia pracy" z edytowalnym polem tekstowym "Komentarz" oraz przyciskami "Akceptuj zlecenie pracy" oraz "Powrót".
        cy.get('.text-center > .btn-yellow').last().click()
        cy.get('#acceptWorkOrderModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('have.text', 'Akceptacja zlecenia pracy')
        cy.get('textarea#CommentAccept').should('be.visible').and('not.have.attr', 'readonly')
        cy.get('#acceptWorkOrderModal-yesBtn').should('be.visible').and('have.text', 'Akceptuj zlecenie pracy')
        cy.get('#acceptWorkOrderModal-noBtn').should('be.visible').and('have.text', 'Powrót')

        // Wpisz komentarz "Ok" i kliknij "Akceptuj zlecenie pracy".  ==============================================================================================================================================================
        cy.log('Krok 43 - Wpisz komentarz "Ok" i kliknij "Akceptuj zlecenie pracy".')
        cy.get('textarea#CommentAccept').type('Ok')
        cy.get('#acceptWorkOrderModal-yesBtn').click()

        // Popup zostaje zamknięty, status zlecenia zmienia się na "Zaakceptowane", dla danego zlecenia znika operacja "A". 
        cy.get('#acceptWorkOrderModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        cy.get('#orderList_table > tbody > tr').should('contain', 'Zaakceptowane')
        cy.get('.DTFC_RightBodyLiner > .table > tbody > .odd > .text-center > .btn-yellow').should('not.exist')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})