import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50209 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.09 Zatwierdzanie zmian we wniosku'

describe('SEPP-16832 Możliwość edycji rezerwacji w stanie T przez Producenta', () => {

    it('Edycja rezerwacji przez Producenta', () => {
        let godzinaRozpoczecia = Math.floor(Math.random() * 12)
        let godzinaZakonczenia = Math.floor(Math.random() * 10) + 13
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()
        
        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran szczegółów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16832')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        
        cy.log('Krok 3 - Jestem na ekranie szczegółów rezerwacji i edytuję ją')
        e50200.godzinaRozpoczeciaSprzetPierwszaData().clear().type(godzinaRozpoczecia)
        e50200.godzinaZakonczeniaSprzetPierwszaData().clear().type(godzinaZakonczenia)
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Zmiany niezatwierdzone - zaakceptowanie zmian', () => {
        cy.log('Krok 4 - Loguję się jako Pracownik Dyspozytury i przechodzę na ekran zmian niezatwierdzonych wybranej rezerwacji')
        cy.visit('')
            .loginPracownikDyspozytury()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16832')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()
        e50209.zatwierdzWszystkiePrzycisk().click()
        e50209.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#ServiceTable > tbody').should('be.visible').and('contain', 'inny (nieujęty w cenniku CUP)')
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Zamówienie wstępnie zaakceptowane')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})