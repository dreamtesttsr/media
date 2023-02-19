import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50901 } from '../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy'
import { e50903 } from '../../../POM/Produkcja/Karty Pracy/E509.03 Rabat'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'

describe('SEPP-14512 Rola 35', () => {

    it('Rola 35 - Operator Kart pracy (anulowanie kart)', () => {
        cy.log('Krok 1 - Loguję się jako Operator Kart pracy (anulowanie kart)')
        cy.visit('/')
            .loginOperatorKartPracyAnulowanie()

        cy.log('Krok 2 - Jestem na ekranie Kart Pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzURL()
        e509.sprawdzWidok()
        e509.sprawdzWidok35()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Wyszukuję kartę zbiorczą, przechodzę do ekranu wyceny karty pracy i sprawdzam poprawność pól')
        e509.rodzajKartyLista().select('Zbiorcza', {force: true})
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.przegladajWycenePierwszyPrzycisk().click()
        e50901.sprawdzWidok()

        cy.log('Krok 4 - Przechodzę na popup Rabatu i sprawdzam poprawność pól')
        e50901.rabatPrzycisk().click()
        e50903.sprawdzWidok()
        e50903.powrotPrzycisk().click()
        e50901.powrotPrzycisk().click()

        cy.log('Krok 5 - Sprawdzam możliwość anulowania kart pracy')
        e509.anulujKartePracyPierwszyPrzycisk().click()
        e509.sprawdzPopupPotwierdzenia()
        e509.takPopupPrzycisk().click()
        e509.sprawdzPopupPowodAnulowania()
        e509.powrotPopupPrzycisk().click()
        e509.powrotPopupPrzycisk().click() // wymagane drugie klikniecie aby zamknac popup

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})