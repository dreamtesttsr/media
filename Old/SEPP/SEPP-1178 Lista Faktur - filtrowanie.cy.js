const { e35 } = require('../../../../POM/Rozliczenia/E35 Lista faktur')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')

describe('SEPP-1178 Lista faktur - filtrowanie', function () {

    it('Lista faktur - filtrowanie', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Faktury
        cy.goToMenu('Faktury')

        // 1. asercje na filtry podstawowe 
        cy.log('Krok 1 - asercje na filtry podstawowe')

        cy.checkingIfTheLocatorIsATextField('#InvoiceNr', 'Nr Faktury')
        cy.checkingIfTheLocatorIsATextField('#SapNumber', 'SAP / ID audycji')
        cy.checkingIfTheLocatorIsATextField('#OrderId', 'Nr Zamówienia')
        cy.checkingIfTheLocatorIsATextField('#AgreementNumber', 'Nr Porozumienia')
        cy.checkingIfTheLocatorIsATextField('#AuditionName', 'Nazwa Audycji TV')
        cy.checkingIfTheLocatorIsAContainer('#select2-ProducerId-container', 'Producent')

        // 2. kliknięcie zaawansowane
        cy.log('Krok 2 - kliknięcie Zaawansowane')
        e35.zaawansowanePrzycisk().click()

        // 3. asercje na filtry zaawansowane 
        cy.log('Krok 3 - asercje na filtry zaawansowane')
        cy.log('Szczegóły faktury - asercje')

        cy.checkingIfTheLocatorIsAContainer('#select2-ContractorId-container', 'Kontrahent / NIP')
        cy.checkingIfTheLocatorIsAContainer('#select2-IdAgency-container', 'Agencja')
        cy.checkingIfTheLocatorIsACalendar('#div_InvoiceDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_InvoiceDateTo')
        cy.checkingIfTheLocatorIsACalendar('#div_ServiceDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_ServiceDateTo')
        cy.checkingIfTheLocatorIsACalendar('#div_RegisterDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_RegisterDateTo')
        cy.checkingIfTheLocatorIsACalendar('#div_DeclarationDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_DeclarationDateTo')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateTo')
        cy.checkingIfTheLocatorIsATextField('#AmountNetFrom', 'NETTO na fakturze od')
        cy.checkingIfTheLocatorIsATextField('#AmountNetTo', 'NETTO na fakturze do')

        cy.log('Szczegóły zamówienia - asercje')

        cy.checkingIfTheLocatorIsATextField('#DfNumber', 'Nr DF Umowy')
        cy.checkingIfTheLocatorIsAContainer('#select2-ObjectOfOrder-container', 'Przedmiot zlecenia')
        cy.checkingIfTheLocatorIsATextField('#ObjectOfOrderCustom', 'Niestandardowy przedmiot zamówienia')
        cy.checkingIfTheLocatorIsAContainer('#select2-FirstLevelCostId-container', 'Grupa kosztów')

        e35.podgrupaKosztowLista().should('not.have.attr', 'readonly').and('to.be', 'disabled')

        cy.get('#select2-FirstLevelCostId-container').click()
        cy.get('#select2-FirstLevelCostId-results > :nth-child(1)').click()

        cy.get(':nth-child(4) > .select2 > .selection > .select2-selection')
            .should('not.have.attr', 'tabindex', '-1')
        cy.get('#select2-FirstLevelCostId-container > .select2-selection__clear').click()
        cy.get(':nth-child(1) > .col-lg-5').click()// obejscie bledu

        // filtrowanie po agencji
        cy.log('Krok 4 - filtrowanie po agencji')

        cy.get('#select2-IdAgency-container').click()
        cy.get('#select2-IdAgency-results > :nth-child(1)').click()

        e35.wyszukajPrzycisk().click()
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Porozumienia"]').click()
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Porozumienia"]').click()
        cy.get('tbody > :nth-child(1) > :nth-child(6)').should('contain', 'AKFiS')

        // wyczysc filtry
        cy.log('wyczysc filtrowanie')
        e35.wyczyscFiltryPrzycisk().first().click()

        // filtrowanie po nr faktury
        cy.get('#InvoiceNr').type('123456789')
        e35.wyszukajPrzycisk().click()
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Faktury"]').click()
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', '123456789')

        // wyczysc filtry
        e35.wyczyscFiltryPrzycisk().first().click()

        cy.get('#InvoiceNr').should('to.be.empty')

        // Wyloguj użytkownika
        cy.logoutUser()
    })
})