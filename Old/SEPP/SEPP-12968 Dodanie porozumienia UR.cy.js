import { DateTime } from 'luxon'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { faker } from '../../../../support/e2e'

describe('SEPP-12968 Dodanie porozumienia UR', function () {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const rndStr = faker.lorem.words(3)
    it('Dodanie porozumienia UR', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducentCUP()

        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // Kliknięcie w przycisk 'Dodaj porozumienie'
        cy.log('Krok 1 - otwarcie ekranu do dodawania porozumień')
        cy.get('button[title="Dodaj porozumienie"]').click()   

        // Sprawdzenie czy wszystkie pola się poprawnie wyświetliły a w pole Producent jest automatycznie wypełnione nazwą użytkownika testowego
        cy.log('Krok 2 - sprawdzenie poprawności pól')
        cy.get('#btnSubmitAgreement').should('be.visible').and('contain', 'Zapisz')
        cy.get('#AgreementReturn').should('be.visible').and('contain', 'Powrót')
        cy.get('#AgrementNrTextBox').should('be.visible').and('have.prop', 'readOnly', true )
        cy.get('#InternalNr').should('be.visible')
        cy.get('#CreateDate').should('be.visible')
        cy.get('#TvAudition').should('be.visible')
        cy.get('#select2-OrganizationUnitId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-OrganizationUnitId-container','Wybierz jednostkę zamawiającą')
        cy.get('#select2-AgencyId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-AgencyId-container','Wybierz agencję')
        cy.get('#select2-ProducerId-container').should('be.visible').and('have.attr', 'data-original-title', 'test_user_33, Imię_33' )
        cy.get('#select2-EditorialOfficeId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-EditorialOfficeId-container','Wybierz redakcję zamawiającą')
        cy.get('#CooperatingUnitsId').should('be.visible').and('have.attr','data-placeholder', 'Wybierz...')
        cy.get('#select2-SupervisingUnitId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-SupervisingUnitId-container','Wybierz jednostkę nadzorującą produkcję')
        e22.rodzajPrzychoduLista().should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-IncomeTypeId-container','Wybierz rodzaj przychodu')
        e22.rodzajUslugiLista().should('be.visible')
        cy.get('#select2-PaymentTypeId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-PaymentTypeId-container','Wybierz rodzaj płatności')
        cy.get('#ProductionMode').should('be.visible')
        cy.get('#div_FastTrackConsentDate').should('be.visible')
        cy.get('#IsTripartiteAgreement').should('be.visible').and('have.prop', 'disabled', true )
        cy.get('#ProductionModel').should('be.visible')
        cy.get('#IsCinemaFunds').should('be.visible').and('not.to.be.checked')
        cy.get('#ValueOfCinemaFunds').should('be.visible').and('have.attr', 'value', '0,00' )

        // Wypełnienie pól
        cy.log('Krok 3 - wypełnienie pól')
        e22.rodzajPorozumieniaLista().select('kosztorys usług własnych CUP', {force: true})
        cy.get('#InternalNr').type('007wew')
        cy.get('#CreateDate').type(dzisiaj)
        cy.get('#TvAudition').type('test ur: ' + rndStr)
        cy.get('#select2-OrganizationUnitId-container').click()
        cy.get('#select2-OrganizationUnitId-results').contains('Agencja Kreacji Filmu i Serialu').click()
        cy.get('#select2-SupervisingUnitId-container').click()
        cy.get('#select2-SupervisingUnitId-results').contains('Dział Kreacji i Rozwoju Form Dokumentalnych (AKPDiAS)').click()
        cy.get('#select2-EditorialOfficeId-container').click()
        cy.get('#select2-EditorialOfficeId-results', {timeout:3000}).contains('<N/D>').click()
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        e22.rodzajUslugiLista().select('UR - Usługa realizacyjna', {force: true})
        cy.get('#select2-PaymentTypeId-container').click()
        cy.get('#select2-PaymentTypeId-results').contains('Abonament').click()
        cy.get('#ProductionModel').select('W - Wewnętrzny', {force: true})
        cy.get('#NewTitleTarget').select('[U] Kosztorys usługowy (jednostki usługowej)', {force: true})

        // Zapisanie porozumienia i sprawdzenie poprawności danych
        cy.log('Krok 4 - zapisanie porozumienia')
        cy.get('#btnSubmitAgreement').click()
        cy.get('#select2-ServiceTypeId-container').should('have.attr', 'data-original-title', 'UR - Usługa realizacyjna')
        e22.rodzajUslugiLista().should('not.be.disabled')
        cy.get('.fieldsetField').should('not.contain' , 'Sprzedaż zewnętrzna')
        cy.get('.fieldsetField').should('not.contain' , 'Usługi w audycjach')
        cy.get('#ToPlanedCosts').contains('Koszty planowane').and('have.prop','disabled', false)
        cy.get('.fieldsetField').contains('Audycje')
        // e22.JSULista().should('not.be.visible') // wycofane
        cy.get('#ToSellEvidence').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#cpySapIdAudition').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#cpySapNr').should('be.visible').and('have.prop', 'disabled', false)
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.prop', 'isConnected', true)

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})