import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e509 } from '../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50902 } from '../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy'

describe('SEPP-17811 Wygenerowanie karty pracy z użyciem wielu filtrów', () => {
    it('Wygenerowanie karty pracy z użyciem wielu filtrów', () => {
        cy.log('Krok 1 - Loguję się jako Operator kart pracy (pełne uprawnienia)')
        cy.visit('/')
            .loginOperatorKartPracy()

        cy.log('Krok 2 - Jestem na ekranie listy kart pracy i przechodzę na ekran generowania kart pracy')
        cy.goToMenu('Karty pracy')
        e509.dodajKartePracyPrzycisk().click()
        
        cy.log('Krok 3 - Filtruję zasoby przy użyciu wielu filtrów')
        e50902.rodzajKartyPracyLista().select('Zbiorcza', {force: true})
        e50902.wydzialLista().select('Wydział techniki studyjnej', {force: true})
        e50902.dataOdPoleTekstowe().type('30.10.2022')
        e50902.dataDoPoleTekstowe().clear().type('30.10.2022')
        e50902.nazwaAudycjiPoleTekstowe().type('SEPP-17811')
        e50902.pracownikLista().select(['Antolik Arkadiusz (70142544)', 'test_user_15 Imię_15 (111111111111)'], {force: true})
        e50902.sprzetLista().select(['Głośnik 02', 'Monitor Liliput 01'], {force: true})
        e50902.wyszukajPrzycisk().click()

        cy.log('Krok 4 - Weryfikuję znalezione dane i generuję kartę')
        cy.get('#workCardGeneratorList_table > tbody').should('have.prop', 'childElementCount', 1)
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(4)').should('have.text', 'SEPP-17811')
        e50902.generujKartyPracyPrzycisk().click()
        e50902.zamknijPopupPrzycisk().click()

        cy.log('Krok 5 - Anuluje kartę w celu repikowalności testu')
        e509.tytulAudycjiPoleTekstowe().type('SEPP-17811')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.anulujKartePracyPierwszyPrzycisk().click()
        e509.takPopupPrzycisk().click()
        e509.komentarzPopupPoleTekstowe().type('Anuluj kartę')
        e509.anulujKartePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        fWspolne.sprawdzProgressBar()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})