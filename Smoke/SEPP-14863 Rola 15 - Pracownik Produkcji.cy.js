import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e503 }  from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'

describe('SEPP-14863 Rola 15', () => {

    it('Rola 15 - Pracownik Produkcji', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Produkcji')
        cy.visit('/')
            .loginPracownikProdukcji()

        cy.log('Krok 2 - Jestem na ekranie Zlecenia pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzFiltryZaawansowane()
        e504.zaawansowanePrzycisk().click()
        e504.przegladZleceniaPracyPierwszyPrzycisk().click({force: true})
        e504.zamknijPopUpXPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie Grafiki i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zakres godzin')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zlecenia pracy')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('czas łączny (w godz.)')
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 4 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})