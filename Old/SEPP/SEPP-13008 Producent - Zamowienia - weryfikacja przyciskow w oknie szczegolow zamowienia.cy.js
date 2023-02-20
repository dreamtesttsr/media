const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e37 } = require('../../../../POM/Rozliczenia/E37 Szczegoly faktury')
const { e30 } = require('../../../../POM/Zaangazowanie/E30 Lista zamowien')
const { e32 } = require('../../../../POM/Zaangazowanie/E32 Zamowienia ZakupUsluga i Hotel - szczegoly')

describe('SEPP-13008 Zamówienie - weryfikacja przycisków', function () {
    it('Zamówienie - weryfikacja przycisków', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // Zamówienia
        cy.goToMenu('Zamówienia')
 
        cy.log('Krok 1 - wejdź w szczegóły pierwszego wybranego zamówienia z listy')
        e30.zaawansowanePrzycisk().click()
        cy.get('#select2-ContractorId-container').type('EAST RIDERS HUBERT KOSTRZEWA')
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.get('#select2-ContractorId-results').wait(2000).type('{enter}')
        e30.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e30.podgladPierwszyPrzycisk().click()

        cy.log('Krok 2 - zweryfikuj działanie przycisków')
        cy.get('#statusHistoryBtn').click()
        cy.get('h4.modal-title').contains('Statusy zamówienia')
        cy.get('#closeBtn').click()
        e32.podgladPorozumieniaPrzycisk().click()
        e32.podgladFakturyPierwszyPrzycisk().click()
        e37.sprawdzURL()
        cy.get('#Number').should('have.attr', 'value', 123456789)
        e37.powrotPrzycisk().click()

        cy.log('Krok 3 - powróć na ekran listy zamówień')
        e32.powrotPrzycisk().click()
        cy.url().should('include', '/Order/Index')
        cy.get('.active').contains('Zamówienia')    

        // Wyloguj uzytkownika
        cy.logoutUser()
    })
})