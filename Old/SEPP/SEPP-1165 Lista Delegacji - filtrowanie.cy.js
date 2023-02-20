const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { e40 } = require('../../../../POM/Zaangazowanie/E40 Delegacje')

describe('SEPP-1165 Lista delegacji - filtrowanie', function () {

    it('Lista delegacji - filtrowanie', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Delegacje')
  
        // 1. asercje 
        cy.log('Krok 1 - asercje na filtry podstawowe') 


        cy.get('#AgreementNumber')
            .should('have.attr', 'placeholder','Nr porozumienia')
            .and('not.have.attr', 'readonly')
  
        cy.get('#InternalNumber')
            .should('have.attr', 'placeholder','Nr wewn.')
            .and('not.have.attr', 'readonly')
  
        cy.get('#ProgramName')
            .should('have.attr', 'placeholder','Nazwa audycji TV')
            .and('not.have.attr', 'readonly')
  
        cy.get('#ProductionSapNumber')
            .should('have.attr', 'placeholder','SAP / ID audycji')
            .and('not.have.attr', 'readonly')
  
        cy.get('#DF_Number')
            .should('have.attr', 'placeholder','Nr DF')
            .and('not.have.attr', 'readonly')
  
        cy.get('#CrdNumber')
            .should('have.attr', 'placeholder','Nr CRD')
            .and('not.have.attr', 'readonly')
  
        cy.get('#select2-ProducerId-container')
            .should('have.text','Producent')
            .and('not.have.attr', 'readonly')

        // 2. kliknięcie zaawansowane
        cy.log('Krok 2 - kliknięcie Zaawansowane') 
        e40.zaawansowanePrzycisk().click()
  
        // 3. asercje 
        cy.log('Krok 3 - asercje na filtry zaawansowane') 
        cy.log('Szczegóły porozumienia/zamówienia - asercje') 

        cy.get('#select2-AgencyId-container')
            .should('have.text','Agencja')
            .and('not.have.attr', 'readonly')

        cy.get('#CostEstimate')
            .should('have.attr', 'placeholder','Nazwa kosztorysu')
            .and('not.have.attr', 'readonly')

        cy.get('#EpisoderNumberFrom')
            .should('have.attr', 'placeholder','Nr odc. od')
            .and('have.attr', 'type','number')
            .and('not.have.attr', 'readonly')
      
        cy.get('#EpisoderNumberTo')
            .should('have.attr', 'placeholder','Nr odc. do')
            .and('have.attr', 'type','number')
            .and('not.have.attr', 'readonly')

        cy.get('#OrderNumber')
            .should('have.attr', 'placeholder','Nr zamówienia')
            .and('not.have.attr', 'readonly')

        cy.log('Szczegóły delegacji - asercje') 

        cy.get('#DelegateLastName')
            .should('have.attr', 'placeholder','Nazwisko')
            .and('not.have.attr', 'readonly')

        cy.get('#DelegateFirstName')
            .should('have.attr', 'placeholder','Imię')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-DelegatePosition-container')
            .should('have.text','Stanowisko')
            .and('not.have.attr', 'readonly')

        cy.get('#DelegateEvidence')
            .should('have.attr', 'placeholder','Nr ewid. prac.')
            .and('not.have.attr', 'readonly') 

        cy.get('#IsCountry')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#IsForeign')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#City')
            .should('have.attr', 'placeholder','Miejscowość')
            .and('not.have.attr', 'readonly')

        cy.get('#div_DepartureDateFrom')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_DepartureDateTo')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_ArrivalDateFrom')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly') 

        cy.get('#div_ArrivalDateTo')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly') 

        cy.get('.select2-search__field')
            .should('have.attr', 'placeholder','Kraj')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-MeanOfTransport-container')
            .should('have.text','Środek transportu')
            .and('not.have.attr', 'readonly')

        cy.get('#InvoiceNumber')
            .should('have.attr', 'placeholder','Nr faktury')
            .and('not.have.attr', 'readonly')

        cy.get('#div_ReckoningDateFrom')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly') 

        cy.get('#div_ReckoningDateTo')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly') 

        cy.get('#PlanTotalCostFrom')
            .should('have.attr', 'placeholder','Plan od')
            .and('have.attr', 'data-numeric-type','currency')
            .and('not.have.attr', 'readonly')

        cy.get('#PlanTotalCostTo')
            .should('have.attr', 'placeholder','Plan do')
            .and('have.attr', 'data-numeric-type','currency')
            .and('not.have.attr', 'readonly')

        cy.get('#TotalSettlementFrom')
            .should('have.attr', 'placeholder','Rozliczenie od')
            .and('have.attr', 'data-numeric-type','currency')
            .and('not.have.attr', 'readonly')

        cy.get('#TotalSettlementTo')
            .should('have.attr', 'placeholder','Rozliczenie do')
            .and('have.attr', 'data-numeric-type','currency')
            .and('not.have.attr', 'readonly')
  
        // filtruj po agencji
        cy.log('Krok 4 - filtrowanie po agencji') 
        cy.get('#select2-AgencyId-container').click()
        cy.get('#select2-AgencyId-results > :nth-child(1)').click()
  
        e40.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > :nth-child(4)')
            .should('contain','AKFiS')
  
        // wyczysc filtry
        e40.wyczyscFiltryPrzycisk().click()
  
        // filtruj po dacie
        cy.get('#DF_Number').type(daneTestowe.numer12345)
        e40.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > :nth-child(2)')
            .should('have.text', daneTestowe.numer12345)
  
        // wyczysc filtry
        e40.wyczyscFiltryPrzycisk().click()
  
        cy.get('#DF_Number').should('to.be.empty')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})