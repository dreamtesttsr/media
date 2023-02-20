const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')

describe('SEPP-12997 Weryfikacja sekcji Audycje', function () {
    it('Weryfikacja sekcji Audycje', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        
        cy.log('Krok 1 - otwarcie ekranu szczegółów porozumienia w trybie edycji')
        cy.get('#TvAudition').type('TEST AUDYCJE')
        e20.wyszukajPrzycisk().click()    
        cy.get('#progressBar', { timeout: 10000 }).should('be.visible')
        cy.get('#progressBar', { timeout: 10000 }).should('not.be.visible')    
        e20.edycjaPierwszyPrzycisk().click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('.fieldsetField').contains('Porozumienie (2000019)')
        
        cy.log('Krok 2 - weryfikacja operacji w sekcji Audycje')
        cy.get('#ToSellEvidence').click()
        cy.get('.fieldsetField').contains('Audycja (0)')
        cy.get('#AgreementReturn').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('#ToMassSellEvidence').click()
        cy.get('.less-space > .control-label > .float-left').contains('TYP OPERACJI MASOWEJ')
        cy.get('button.btn.btn-info.return-button').click()
        // wymagany wait
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('#cpySapIdAudition').click()
        cy.get('.col-sm-11', { timeout: 3000 }).should('contain', 'Skopiowano 2 ID audycji SAP do schowka.').click()
        cy.get('#cpySapNr').click()
        cy.get('.col-sm-11', { timeout: 3000 }).should('contain', 'Skopiowano 2 nr SAP prod. do schowka.').click()
        e22.pelnaListaAudycjiPrzycisk().click()
        cy.get('#AgreementNumber').should('have.attr', 'value', 'P/1001739/AKFiS/2021')
        cy.get('#TvAudition').should('have.attr', 'value', 'TEST AUDYCJE')
        cy.go('back')
        cy.get('#auditionList > tbody > tr.odd > td.text-center.checkboxClass > span:nth-child(1) > a').click()
        cy.get('.fieldsetField').contains('Audycja (20000041)')
        cy.get('#AgreementReturn').click()
        cy.get('#auditionList > tbody > tr.odd > td.text-center.checkboxClass > span:nth-child(2) > button').click()
        cy.get('.btn.btn-danger.btn-block.denyBtn').wait(3000).click()

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})