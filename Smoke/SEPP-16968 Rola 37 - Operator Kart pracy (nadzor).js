import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50901 } from '../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { faker } from '../../../support'

describe('SEPP-16968 Rola 37', () => {

    it('Rola 37 - Operator Kart pracy (nadzór)', () => {
        cy.log('Krok 1 - Loguję się jako Operator Kart pracy (nadzór)')
        cy.visit('')
            .loginOperatorKartPracyNadzor()

        cy.log('Krok 2 - Jestem na ekranie listy Zleceń pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzWidok37()
        cy.get('[title="Kwota honorarium"]').should('exist')
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie Grafiki pracowników i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok37()
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 4 - Jestem na ekranie Karty pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzWidok()
        e509.sprawdzWidok37()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Przechodzę na ekran edycji wyceny Karty pracy, sprawdzam poprawność pól, a następnie edytuję wynagrodzenie pracownika')
        e509.tytulAudycjiPoleTekstowe().type('SEPP-16311-SP')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.edytujWycenePierwszyPrzycisk().click()
        e50901.sprawdzWidok()
        cy.get('#PersonList_0__Cost').clear().type((faker.finance.amount(1, 150, 2)).replace('.', ','))
        e50901.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 6 - Zatwierdzam kartę w celu replikowalności testu')
        cy.get('tr:nth-child(1) > td:nth-child(11)').should('contain.text', 'W trakcie wyceny')
        e509.zatwierdzKartePracyPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})