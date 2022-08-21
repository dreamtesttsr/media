import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e507 } from '../../../POM/Produkcja/Słowniki/E507 Pracownicy'
import { e50701 } from '../../../POM/Produkcja/Słowniki/E507.01 Pracownicy produkcji - szczegoly'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'
import { e519 } from '../../../POM/Produkcja/Słowniki/E519 Stanowiska'
import { e51901 } from '../../../POM/Produkcja/Słowniki/E519.01 Stanowiska - szczegóły'

describe('SEPP-14607 Rola 28', () => {

    it('Rola 28 - Administrator biznesowy CUP (pracownicy produkcji)', () => {
        cy.log('Krok 1 - Loguję się jako Administrator biznesowy CUP (pracownicy produkcji)')
        cy.visit('')
            .loginAdministratorBiznesowyCUPPracownicy()

        cy.log('Krok 2 - Jestem na ekranie Pracownicy produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Pracownicy produkcji')
        e507.sprawdzWidok()
        e507.sprawdzWidok28()
        e507.dodajPracownikaProdukcjiPrzycisk().click()
        e50701.sprawdzWidok()

        cy.log('Krok 3 - Jestem na ekranie Powody niedostepności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()
        e514.sprawdzWidok28()

        cy.log('Krok 4 - Jestem na ekranie Dni świąteczne i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()
        e511.sprawdzWidok28()
        
        cy.log('Krok 5 - Jestem na ekranie wyszukiwania stanowisk i sprawdzam poprawność pól')
        cy.goToMenu('Stanowiska')
        e519.sprawdzWidok()
        e519.sprawdzWidok28()

        cy.log('Krok 6 - Jestem na ekranie wyszukiwania stanowisk wciskam przycisk dodaj i sprawdzam poprawność pól')
        e519.dodajStanowiskoPrzycisk().click()
        e51901.sprawdzWidokDodajStanowisko()
        e51901.powrotPrzycisk().click()
        e519.nazwaPoleTekstowe().type('kierownik muzyczny')
        e519.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e519.edycjaPierwszyPrzycisk().click()
        e51901.sprawdzWidok()
        e51901.sprawdzWidokEdycja()
        e51901.powrotPrzycisk().click()     
        e519.podgladPierwszyPrzycisk().click()
        e51901.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})