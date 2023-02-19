import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50901 } from '../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy'
import { e50902 } from '../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy'
import { e50903 } from '../../../POM/Produkcja/Karty Pracy/E509.03 Rabat'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'

describe('SEPP-14511 Rola 22', () => {

    it('Rola 22 - Operator Kart pracy', () => {
        cy.log('Krok 1 - Loguję się jako Operator Kart pracy')
        cy.visit('/')
            .loginOperatorKartPracy()

        cy.log('Krok 2 - Jestem na ekranie Kart Pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzURL()
        e509.sprawdzWidok()
        e509.sprawdzWidok22()
        e509.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 3 - Otwieram okno modalne generowania kart pracy i sprawdzam poprawność pól')
        e509.dodajKartePracyPrzycisk().click()
        e50902.sprawdzWidok()
        e50902.powrotPrzycisk().click()

        cy.log('Krok 3 - Wyszukuję kartę sprzętową i przechodzę do ekranu wyceny karty pracy i sprawdzam poprawność pól')
        e509.rodzajKartyLista().select('Sprzętowa', {force: true})
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.edytujWycenePierwszyPrzycisk().click()
        e50901.sprawdzWidok()

        cy.log('Krok 4 - Przechodzę do ekranu wyceny karty pracy i sprawdzam poprawność pól')
        e50901.rabatPrzycisk().click()
        e50903.sprawdzWidok()
        e50903.sprawdzWidokEdycja()
        e50903.powrotPrzycisk().click()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})