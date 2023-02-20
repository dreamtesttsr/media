const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e23 } = require('../../../../POM/Planowanie/E23 Koszty planowane')

describe('SEPP-13029 Klonowanie porozumienia', function () {
    it('Klonowanie porozumienia', function () {
        // 1. Zalogowanie do systemu w roli Producent
        cy.visit('/')
            .loginProducent()

        // 2. Przejście do ekranu listy porozmień
        cy.goToMenu('Porozumienia')

        // 3. Wyszukanie odpowiedniego porozumienia i przejście do jego szczegółów w trybie edycji
        e20.numerPorozumieniaPoleTekstowe().type('P/1001747/AKFiS/2021')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click({ force: true })
        fWspolne.sprawdzProgressBar()
        cy.contains('Kosztorysy powiązane').should('be.visible')

        // 4. Naciśnięcie przycisku 'Kopiuj' , weryfikacja prawidłowego przebiegu kopiowania
        e22.kopiujPrzycisk().click()
        e22.agencjaPopupLista().select('AKFiS', { force: true })
        // zaznaczenie kosztorysu
        e22.zaznaczPierwszyKosztorysPrzyciskWyboru().check()
        cy.get('#copyAgreementForm > fieldset > div:nth-child(1) > label').should('contain', 'SEPP-13029 KLONOWANIE POROZUMIENIA')

        // 5. Kliknięcie w przycisk 'Potwierdź'
        e22.potwierdzKopiujPopupPrzycisk().click()
        // potwierdzenie operacji
        e22.potwierdzKopiujPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#notificationPopupText').should('be.visible').and('contain', 'Operacja kopiowania porozumienia powiodła się.')
        cy.get('a.btn-sm > i.fas.fa-check').click()

        //  6. Weryfikacja czy pola zawierają odpowiednie dane po kopiowaniu
        e22.dodajKosztorysPowiazanyPrzycisk().should('not.exist')
        cy.get('span[class="badge badge-secondary"]').should('contain', 'niesprzedane')
        cy.get('.fas.fa-sync.w3-text-orange').should('have.attr', 'title', 'Porozumienie jest w wersji roboczej')
        cy.get('#auditionList > tbody > .odd > .dataTables_empty').should('contain', 'Brak danych')
        cy.get('#attachmentsList > tbody > .odd > .dataTables_empty').should('contain', 'Brak danych')
        cy.get('#CurrentTitle_LiczbaOdcinkow').should('have.attr', 'value', '1')
        e22.uprawnieniaPrzycisk().click()
        cy.get('#AgencyRepresentative_0__IsSelected').should('not.have.attr', 'checked')
        cy.get('#producerRepresentativeModal-noBtn').click()
        e22.kosztyPlanowanePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace literackie').click()
        cy.get('#infoDisabled_100__14__OrganizationUnitName').should('have.attr', 'value', 'Jedn.Koszt.TVP')
        e23.rodzajKosztuPrzycisk('Prace literackie').click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Asystent realizatora wizji').click()
        e23.pozycjaWCennikuJULista().find(':selected').contains('Publicystyka i edukacja -> Produkcja własna - nagrania -> Kategoria: I -> Asystent realizatora wizji')
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'godzina')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '88,00 zł')
        e23.rabatPoleTekstowe().should('have.prop', 'value', '0,00 %')
        e23.stawkaZaJednostkeObliczenowaPoRabaciePoleTekstowe().should('have.prop', 'value', '88,00 zł')
        e23.anulujZmianePrzycisk().click()
        e23.powrotPrzycisk().scrollIntoView().click()
        cy.get('#auditionList > tbody > .odd > .dataTables_empty').should('contain', 'Brak danych')
        e22.historiaZmianPrzycisk().click()
        cy.get('#statusTable > tbody > .odd > .dataTables_empty').should('contain', 'Brak danych')
        cy.get('button#agreementHistoryModal-close').should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        cy.get('span#PeopleCount').should('contain', '1')
        // e22.osobyWiodacePrzycisk().click()
        // cy.get('#leadPersonList > tbody').should('have.prop', 'childElementCount', 1)
        // cy.get('#statusTable > tbody > tr > td').should('contain','Brak danych')
        // cy.get('.breadcrumb > :nth-child(2) > a').click()

        //  weryfikacja zerowych wartości na pop-upie 'Wynagrodzenia'
        e22.wynagrodzeniaPrzycisk().click()
        cy.get('#WagesTotal', { timeout: 10000 }).should('have.attr', 'value', '0,00')
        cy.get('#EmployeeWages').should('have.attr', 'value', '0,00')
        cy.get('#AssociateWages').should('have.attr', 'value', '0,00')
        cy.get('#CompanyWages').should('have.attr', 'value', '0,00')
        cy.get('#wagesReturn').click()
        // cy.get('#yesReturnButtonId').click()

        // 7 - Weryfikacja okna walidacji czy lista kosztorysów do skopiowania jest pusta
        e22.kopiujPrzycisk().click()
        cy.get('#agencyForCopyAgreementModal-body').should('be.visible')
        cy.get('input#Titles_0__IsChecked').should('be.visible').and('not.be.checked') 
        cy.get('button#agencyForCopyAgreementModal-noBtn').click()      
        /*
        cy.get('#agencyForCopyAgreementModal-body').should('contain', 'Brak spełnienia minimalnych warunków dotyczących kopiowania porozumienia. Porozumienie powinno zawierać przynajmniej 1 kosztorys o celu spośród poniższych:')
        cy.get('#agencyForCopyAgreementModal-noBtn').click()
        */
        // Wylogowanie
        cy.logoutUser()
    })
})