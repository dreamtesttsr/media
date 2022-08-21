import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'

describe('SEPP-16850 Zmiany stanu rezerwacji po jej edycji przez Dyspozytora', () => {

    it('Zmiany stanu rezerwacji po jej edycji przez Dyspozytora', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('')
            .loginPracownikDyspozytury()

        cy.log('Krok 2 - Przechodzę na ekran Wniosków o zasoby i wyszukuję wybrany wniosek')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16850')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Przechodzę na ekran szczegółów rezerwacji i edytuję ją dodając nowy zasób sprzętowy')
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.dodajSprzetPrzycisk().click()
        cy.get('[name*="RequestForServiceAndEquipmentList[1].SelectedPositionAndCostIds"]').select('Nagłośnienie', {force: true})
        cy.get('input.serviceStartDatePicker').eq(1).type('10')
        cy.get('[name*=".EndTime"]').eq(2).type('12')
        e50200.zapiszPrzycisk().click()
        e50200.powodyModyfikacjiWnioskuPopupPoleTekstowe().type('Test powód 1')
        e50200.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Sprawdzam czy zmienił się status rezerwacji')
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Zamówienie wstępnie zaakceptowane')

        cy.log('Krok 5 - Powracam do edycji zasobów i kasują dodany poprzednio zasób sprzętowy')
        e50201.zasobyPierwszyPrzycisk().click()
        cy.get('#delbtnService_1').should('be.visible').click()
        cy.wait(1000)
        e50200.takPopupPrzycisk().should('be.visible').click()
        cy.get('#delbtnService_1').should('not.exist')
        e50200.zapiszPrzycisk().click()
        e50200.powodyModyfikacjiWnioskuPopupPoleTekstowe().type('Test powód 2')
        e50200.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 6 - Sprawdzam czy status rezerwacji wrócił do poprzedniego stanu')
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Do realizacji')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})