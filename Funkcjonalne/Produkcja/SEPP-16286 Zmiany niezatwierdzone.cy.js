import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50209 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.09 Zatwierdzanie zmian we wniosku'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-16286 Zmiany niezatwierdzone', () => {

    it('Zmiany niezatwierdzone - zmiany w rezerwacji', () => {
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('/')
            .loginProducent()
        
        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran szczegółów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16286')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów rezerwacji w stanie "Do realizacji" i edytuje ją')
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.nazwaPoleTekstowe().type('RTF - technik studia')
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().check()
        e50212.zatwierdzPrzycisk().click()
        e50200.kopiujDatyGodzinyStanPierwszyPrzycisk().click()
        cy.wait(500)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        e50200.usunStanowiskoPierwszyPrzycisk().click()
        cy.wait(500)
        e50200.takPopupPrzycisk().click()
        e50200.dodajSprzetPrzycisk().click()
        cy.get('select[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[1].SelectedPositionAndCostIds"]').select('Monitory (200,00 zł. / godzina)', {force: true})
        e50200.kopiujDatyGodzinySprzetPierwszyPrzycisk().click()
        cy.wait(500)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        e50200.zapiszPrzycisk().click()
        e50200.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zmianyNiezatwierdzonePrzycisk().should('be.visible')

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })

    it('Zmiany niezatwierdzone - akceptacja i odrzucenie części zmian', () => {
        cy.log('Krok 4 - Loguję się jako Pracownik Dyspozytury i przechodzę na ekran zmian niezatwierdzonych wybranej rezerwacji')
        cy.visit('/')
            .loginPracownikDyspozytury()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16286')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr > td:nth-child(10)').should('contain', 'Przekazano do dyspozytury (zmodyfikowany)')
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()

        cy.log('Krok 5 - Akceptuję i odrzucam część niezatwierdzonych zmian')
        cy.get('td.chengesField').contains('stanowisko').siblings('td.borderTd').find('input.changeCb').check()
        // cy.get('#Days_0__RequestChanges_1__IsChecked').check()
        e50209.zatwierdzZaznaczonePrzycisk().click()
        e50209.potwierdzZatwierdzZaznaczonePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('td.chengesField').contains('-').siblings('td.borderTd').find('input.changeCb').check()
        // e50209.zaznaczPierwszaZmianePrzyciskWyboru().check()
        e50209.odrzucZaznaczonePrzycisk().click()
        e50209.potwierdzOdrzucZaznaczonePopupPrzycisk().click()
        cy.get('textarea#RejectionReasonTb').type('Odrzucam')
        cy.get('button#rejectionModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        e50209.zatwierdzWszystkiePrzycisk().click()
        e50209.potwierdzZatwierdzWszystkiePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_1__PositionName').should('be.visible').and('have.value', 'RTF - technik studia')
        cy.get('#ServiceTable > tbody').should('be.visible').and('contain', 'Monitory')
        cy.wait(1000)
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('be.visible').and('have.value', 'Zamówienie wstępnie zaakceptowane')

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })

    it('Zmiany niezatwierdzone - ponowna zmiana w rezerwacji', () => {
        cy.log('Krok 6 - Loguję się jako Producent')
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 7 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran szczegółów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16286')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 8 - Jestem na ekranie szczegółów rezerwacji w stanie "Zamówienie wstępnie zaakceptowane" i ponownie ją edytuję')
        e50200.usunStanowiskoPierwszyPrzycisk().click()
        cy.wait(500)
        e50200.takPopupPrzycisk().click()
        e50200.usunSprzetPierwszyPrzycisk().click()
        cy.wait(500)
        e50200.takPopupPrzycisk().click()
        e50200.zapiszPrzycisk().click()
        // e50200.zapiszPopupPrzycisk().click()
        e50200.zmianyNiezatwierdzonePrzycisk().should('be.visible')

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })

    it('Zmiany niezatwierdzone - odrzucenie zmian', () => {
        cy.log('Krok 9 - Loguję się jako Pracownik Dyspozytury i przechodzę na ekran zmian niezatwierdzonych wybranej rezerwacji')
        cy.visit('/')
            .loginPracownikDyspozytury()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16286')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr > td:nth-child(10)').should('contain', 'Przekazano do dyspozytury (zmodyfikowany)')
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()

        cy.log('Krok 10 - Odrzucam wszystkie wprowadzone zmiany')
        e50209.odrzucWszystkiePrzycisk().click()
        e50209.potwierdzOdrzucWszystkiePopupPrzycisk().click()
        cy.get('textarea#RejectionReasonTb').type('Odrzucam')
        cy.get('button#rejectionModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__PositionName').should('have.value', 'RTW - technik multimedia')
        cy.get('#ServiceTable > tbody').should('contain', 'Teleprompter')

        cy.log('Krok 11 - Usuwam dodane wcześniej stanowisko i sprzęt w celu replikowalności testu')
        cy.get('button#delbtnPerson_1').click()
        cy.wait(500)
        e50200.takPopupPrzycisk().should('be.visible').click()
        cy.get('button#delbtnService_1').click()
        cy.wait(500)
        e50200.takPopupPrzycisk().should('be.visible').click()
        cy.wait(1000)
        e50200.zapiszPrzycisk().click()
        // e50200.powodyModyfikacjiWnioskuPopupPoleTekstowe().type('Replikowalność testu')
        e50200.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Do realizacji')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})