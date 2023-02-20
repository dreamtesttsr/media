import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'

describe('SEPP-1162 Lista porozumień - filtrowanie', function () {

    it('Lista porozumień - filtrowanie', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()
        // Porozumienia
        cy.goToMenu('Porozumienia')

        // 2. asercje 
        cy.get('#AuditionProductionSap')
            .should('have.attr', 'placeholder','SAP / ID audycji / MPK')
            .and('have.attr', 'title', 'ID audycji / nr zlecenia SAP / MPK')
            .and('not.have.attr', 'readonly')
        // .and('be.empty')
        // .and('have.lenght',0)

        cy.get('#TvAudition')
            .should('have.attr', 'placeholder','Nazwa audycji TV')
            .and('not.have.attr', 'readonly')

        cy.get('#Number')
            .should('have.attr', 'placeholder','Nr porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#InternalNr')
            .should('have.attr', 'placeholder','Nr wewn.')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-ProducerId-container')
            .should('have.text','Producent')
            .and('not.have.attr', 'readonly')

        e20.zaawansowanePrzycisk().click()

        cy.get('#select2-AgencyId-container')
            .should('have.text','Agencja')
            .and('not.have.attr', 'readonly')

        cy.get('.select2-search__field')
            .should('have.attr', 'placeholder','Jednostka usługowa')
            .and('have.attr','role','searchbox')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AgrementStateId-container')
            .should('have.text','Stan porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderStatusId-container')
            .should('have.text','Status porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#ProcesingOutOffSeppYES')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#ProcesingOutOffSeppNO')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderUnitId-container')
            .should('have.text','Jednostka zamawiająca')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OfficeId-container')
            .should('have.text','Redakcja zamawiająca')
            .and('not.have.attr', 'readonly')

        e20.rodzajPrzychoduLista()
            .should('have.attr', 'data-placeholder', 'Rodzaj przychodu')
            .and('not.have.attr', 'readonly')

        e20.rodzajUslugiLista()
            .should('have.attr', 'data-placeholder', 'Rodzaj usługi')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-LeadingPersonId-container')
            .should('have.text','Osoba wiodąca')
            .and('not.have.attr', 'readonly')

        cy.get('#div_AgreementDateFrom')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_AgreementDateTo')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_AgreementCloseDateFrom')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_AgreementCloseDateTo')
            .should('have.attr','data-custom-format','dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#CostName')
            .should('have.attr', 'placeholder','Nazwa kosztorysu')
            .and('have.attr','type','text')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AuditionFormID-container')
            .should('have.text','Forma audycji')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AuditionFormDetailsId-container')
            .should('have.text','Forma audycji szczeg.')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AntenaId-container')
            .should('have.text','Antena')
            .and('not.have.attr', 'readonly')

        cy.get('#AntenaNrId')
            .should('have.attr', 'placeholder','Nr rejestru anteny')
            .and('have.attr','type','text')
            .and('not.have.attr', 'readonly')

        // filtruj po agencji
        e20.agencjaLista().select('AKFiS', {force: true})
        e20.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > :nth-child(9)')
            .should('have.text','AKFiS')

        // wyczysc filtry
        cy.get('#progressBar').should('not.be.visible')
        e20.wyczyscFiltryPrzycisk().click()

        // filtruj po dacie
        e20.zaawansowanePrzycisk().click()
        cy.get('#div_AgreementDateFrom').type('23.04.2021')
        cy.get('#div_AgreementDateTo').type('23.04.2021')
        e20.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > .date')
            .should('have.text','23.04.2021')

        // wyczysc filtry
        e20.wyczyscFiltryPrzycisk().click()

        // cy.get('#div_AgreementDateFrom').should('to.be.empty')
        cy.logoutUser()
    })
})