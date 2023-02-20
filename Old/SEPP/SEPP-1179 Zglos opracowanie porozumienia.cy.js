const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')

// const { eq } = require("cypress/types/lodash")
describe('SEPP-1179 Zgłoszenie opracowania porozumienia', function () {

    it('Zgłoszenie opracowania porozumienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // filtrowanie porozumienia z zaakceptowanym kosztorysem
        cy.log('Krok 1 - wyfiltrowanie porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('TEST AUDYCJE') 
        cy.get('button[title="Wyszukaj"]').first().click()
        fWspolne.sprawdzProgressBar()
        
        // kliknięcie przycisku Edycja na wybranym porozumieniu
        cy.log('Krok 2 - Kliknij przycisk "Edycja"')
        e20.edycjaPierwszyPrzycisk().click()
        cy.url().should('contain', '/Agreement/Edit')

        // kliknięcie przycisku Potwierdz na potwierdzeniu operacji
        cy.log('Krok 3 - Kliknij przycisk "Potwierdź"')
        cy.get('[data-confirm="Czy chcesz zgłosić opracowanie?"]').click()
        cy.get('#confirmText').should('have.text', 'Czy chcesz zgłosić opracowanie?')
        cy.get('#confirmBtn').should('have.text', ' Potwierdź').click()
        cy.get('.col-sm-11 > div', { timeout: 5000 }).should('contain', 'Zgłoszono opracowanie')

        // Cofnięcie opracowania w celu reużywalności testu
        cy.get('[data-confirm="Czy chcesz cofnąć opracowanie?"]').click()
        cy.get('#confirmText').should('have.text', 'Czy chcesz cofnąć opracowanie?')
        cy.get('#confirmBtn').should('have.text', ' Potwierdź').click()
        cy.get('.col-sm-11 > div', { timeout: 5000 }).should('contain', 'Cofnięto opracowanie')

        // Wyloguj użytkownika
        cy.logoutUser()
    })
})