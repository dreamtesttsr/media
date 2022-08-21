import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'

describe('SEPP-14703 Wyszukiwanie wniosków o zasoby dla Dyrektora Agencji', () => {

    it('Wyszukiwanie wniosków o zasoby dla Dyrektora Agencji', () => {
        cy.log('Krok 1 - Loguję się jako Dyrektor Agencji')
        cy.visit('')
            .loginDyrektorAgencjiAKFiS()

        cy.log('Krok 2 - Jestem na ekranie Wnioski o przydzielenie zasobów')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Sprawdzenie checkbox "Ukryj zrealizowane"')
        e501.ukryjZrealizowanePrzyciskWyboru().should('have.attr', 'checked', 'checked')

        cy.log('Krok 4 - Wyświetlenie pól filtry zaawansowane')
        e501.zaaawansowanePrzycisk().click()

        cy.log('Krok 5 - Wybieram "Inny (nieujęty w cenniku CUP)" dla listy wyboru sprzętu')
        e501.sprzetLista().select('inny (nieujęty w cenniku CUP)', {force: true})

        cy.log('Krok 6 - Klikam przycisk wyszukaj')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.wnioskiTabela().get('tbody > tr').should('have.length.above', 0)

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})