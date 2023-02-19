import { e509 } from '../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50902 } from '../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy'

describe('SEPP-17614 Karty pracy - filtrowanie zasobów', () => {
    it('Karta zbiorcza - filtrowanie po pracowniku i elemencie sprzętowym', () => {
        cy.log('Krok 1 - Loguję się jako Operator kart pracy (pełne uprawnienia)')
        cy.visit('/')
            .loginOperatorKartPracy()

        cy.log('Krok 2 - Jestem na ekranie listy kart pracy i przechodzę na ekran generowania kart pracy')
        cy.goToMenu('Karty pracy')
        e509.dodajKartePracyPrzycisk().click()
        
        cy.log('Krok 3 - Filtruję zasoby przy generowaniu karty zbiorczej')
        e50902.rodzajKartyPracyLista().select('Zbiorcza', {force: true})
        e50902.wydzialLista().select('Wydział postprodukcji (montaż)', {force: true})
        e50902.dataOdPoleTekstowe().type('13.10.2022')
        e50902.dataDoPoleTekstowe().clear().type('14.10.2022')
        e50902.pracownikLista().select('test_user_15 Imię_15 (111111111111)', {force: true})
        e50902.sprzetLista().select('MC40 (Avid MC40) zestaw montażowy Avid (M01)', {force: true})
        e50902.wyszukajPrzycisk().click()

        cy.log('Krok 4 - Weryfikuję wyfiltrowane zasoby - karta zbiorcza')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(4)').should('have.text', 'SEPP-17614')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(8)').should('contain.text', 'MC91')

        cy.log('Krok 5 - Filtruję zasoby przy generowaniu karty skróconej')
        e50902.rodzajKartyPracyLista().select('Skrócona', {force: true})
        e50902.pracownikLista().select([], {force: true})
        e50902.sprzetLista().select([], {force: true})
        e50902.stanowiskoLista().select('MONTAŻYSTA', {force: true})
        e50902.grupaMiejscRealizacjiLista().select('miejsce', {force: true})
        e50902.wyszukajPrzycisk().click()

        cy.log('Krok 6 - Weryfikuję wyfiltrowane zasoby - karta skrócona')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(4)').should('have.text', 'SEPP-17614')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(8)').should('contain.text', 'MC91')

        cy.log('Krok 7 - Filtruję zasoby przy generowaniu karty honoracyjnej')
        e50902.rodzajKartyPracyLista().select('Honoracyjna', {force: true})
        e50902.wydzialLista().select([], {force: true}).select('Wydział techniki studyjnej', {force: true})
        e50902.dataOdPoleTekstowe().clear().type('18.07.2022')
        e50902.dataDoPoleTekstowe().clear().type('18.07.2022')
        e50902.stanowiskoLista().select([], {force: true})
        e50902.grupaMiejscRealizacjiLista().select([], {force: true})
        e50902.grupaOsobLista().select('pracownik', {force: true})
        e50902.wyszukajPrzycisk().click()

        cy.log('Krok 8 - Weryfikuję wyfiltrowane zasoby - karta honoracyjna')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(4)').should('have.text', 'SEPP-15619')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(8)').should('contain.text', 'Studio S1')

        cy.log('Krok 9 - Filtruję zasoby przy generowaniu karty sprzętowej')
        e50902.rodzajKartyPracyLista().select('Sprzętowa', {force: true})
        e50902.wydzialLista().select([], {force: true}).select('Wydział postprodukcji (technika postprodukcji)', {force: true})
        e50902.dataOdPoleTekstowe().clear().type('17.01.2022')
        e50902.dataDoPoleTekstowe().clear().type('19.01.2022')
        e50902.grupaOsobLista().select([], {force: true})
        e50902.grupaSprzetuLista().select('kabina', {force: true})
        e50902.wyszukajPrzycisk().click()

        cy.log('Krok 10 - Weryfikuję wyfiltrowane zasoby - karta sprzętowa')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(4)').should('have.text', 'ALARM (27.02-05.06.2021)')
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(8)').should('contain.text', 'Kabina lektorska')
        e50902.powrotPrzycisk().click()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})