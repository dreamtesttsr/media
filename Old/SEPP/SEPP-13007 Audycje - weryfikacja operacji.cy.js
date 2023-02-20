const { e200 } = require('../../../../POM/Audycje/E200 Audycje')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')

describe('SEPP-13007 Audycje - weryfikacja operacji', function () {
    it('Audycje - weryfikacja operacji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // przejście do ekranu listy Audycji
        cy.log('Krok 1 - otwarcie ekranu Audycje')
        cy.goToMenu('Audycje')
        e200.nazwaAudycjiTVPoleTekstowe().type('TEST AUDYCJE')
        e200.sapIdAudycjiMPKPoleTekstowe().type('11111111111')
        e200.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 2 - weryfikacja operacji na ekranie Audycje')
        e200.edycjaAudycjiPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.fieldsetField').contains('Audycja (20000041)')
        e22.powrotPrzycisk().click()
        e200.podgladPorozumieniaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.fieldsetField').contains('Porozumienie (2000019)')
        cy.get('#TvAudition').should('have.prop','disabled', true)
        e22.powrotPrzycisk().click()
        e200.edycjaPorozumieniaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.fieldsetField').contains('Porozumienie (2000019)')
        cy.get('#TvAudition').should('have.prop','disabled', false)
        e22.powrotPrzycisk().click()
        e200.usuniecieAudycjiPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#confirmModal').find('h4').contains('Potwierdzenie operacji')
        cy.get('.btn.btn-danger.btn-block.denyBtn').should('be.visible').click()
        cy.get('#confirmModal').find('h4').should('not.be.visible')

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
