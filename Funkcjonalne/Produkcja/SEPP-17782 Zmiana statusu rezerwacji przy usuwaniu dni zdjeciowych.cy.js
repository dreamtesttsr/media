import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50209 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.09 Zatwierdzanie zmian we wniosku'

describe('SEPP-17782 Zmiana statusu rezerwacji przy usuwaniu dni zdjęciowych', () => {
    it('Usunięcie dnia zdjęciowego przez Kierownika Produkcji', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik produkcji')
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran szczegółów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17782')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Przechodzę na listę dni zdjęciowych i usuwam pierwszy dzień rezerwacji')
        e50200.modyfikujRezerwacjePrzycisk().click()
        cy.get('tbody > tr').should('have.length', 2)   
        e50201.zaznaczPierwszyDzienPrzyciskWyboru().uncheck()
        e50201.takUsunDzienPopupPrzycisk().click()
        e50201.zapiszPrzycisk().click()
        e50201.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Przekazano do dyspozytury (zmodyfikowany)')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Odrzucenie zmiany przez Dyspozytora', () => {
        cy.log('Krok 4 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 5 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran zmian niezatwierdzonych dla wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17782')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()

        cy.log('Krok 6 - Odrzucam wprowadzoną zmianę i weryfikuje poprawność rezerwacji')
        e50209.zaznaczPierwszaZmianePrzyciskWyboru().check()
        e50209.odrzucZaznaczonePrzycisk().click()
        e50209.potwierdzOdrzucZaznaczonePopupPrzycisk().click()
        e50209.powodOdrzuceniaModyfikacjiPoleTestowe().type('Odrzucam zmianę')
        e50209.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        fWspolne.komunikat().should('be.visible').and('contain', 'Rozpatrzono wszystkie zmiany')
        cy.wait(500)
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Zamówienie wstępnie zaakceptowane')
        cy.get('tbody > tr').should('have.length', 2)

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})