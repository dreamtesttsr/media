const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50901 } = require('../../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy')
const { e50902 } = require('../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy')

describe('SEPP-15619 Weryfikacja naliczania wynagrodzeń', () => {

    it('Weryfikacja naliczania wynagrodzeń', () => {
        cy.log('Krok 1 - Loguję się jako Operator kart pracy - pełne uprawnienia')
        cy.visit('/')
            .loginOperatorKartPracy()

        cy.log('Krok 2 - Jestem na ekranie listy kart pracy i generuję nową kartę')
        cy.goToMenu('Karty pracy')
        e509.dodajKartePracyPrzycisk().click()
        e50902.rodzajKartyPracyLista().select('Honoracyjna', {force: true})
        e50902.wydzialLista().select(['Wydział techniki studyjnej', 'Wydział realizacji', 'Wydział wozów transmisyjnych'], {force: true})
        e50902.dataOdPoleTekstowe().type('18.07.2022')
        e50902.dataDoPoleTekstowe().clear().type('19.07.2022')
        e50902.nazwaAudycjiPoleTekstowe().type('SEPP-15619')
        e50902.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50902.generujKartyPracyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50902.zamknijPopupPrzycisk().click()

        cy.log('Krok 3 - Wyszukuję nowowygenerowaną kartę pracy i przechodzę na ekran jej edycji')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.edytujWycenePierwszyPrzycisk().click()

        cy.log('Krok 4 - Weryfikuję poprawność wynagrodzeń na wycenie karty pracy')
        // stawka godzinowa
        cy.get('#PersonList_2__Cost').should('have.attr', 'value', '365,75') // 522,5 * 0.7 = 365,75 zł
        cy.get('#PersonList_0__Cost').should('have.attr', 'value', '285,00')
        cy.get('#PersonList_3__Cost').should('have.attr', 'value', '855,00')
        cy.get('#PersonList_4__Cost').should('have.attr', 'value', '1187,50')
        
        // stawka za dzień zdjęciowy
        cy.get('#PersonList_1__Cost').should('have.attr', 'value', '348,00')
        cy.get('#PersonList_5__Cost').should('have.attr', 'value', '696,00')
        cy.get('#PersonList_7__Cost').should('have.attr', 'value', '1044,00')
        cy.get('#PersonList_8__Cost').should('have.attr', 'value', '1392,00')
        cy.get('#PersonList_9__Cost').should('have.attr', 'value', '1629,80') // (116*9,5h)+[(116*0.7=81,2)*6,5h] =1102+527,8=1629,80 zł

        // plener (cała stawka pomimo pracy <12h)
        cy.get('#PersonList_6__Cost').should('have.attr', 'value', '530,00')

        cy.log('Krok 5 - Usunięcie karty pracy w celu replikowalności testu')
        e50901.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.anulujKartePracyPierwszyPrzycisk().click()
        e509.takPopupPrzycisk().click()
        e509.komentarzPopupPoleTekstowe().type('anuluj kartę')
        e509.anulujKartePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})