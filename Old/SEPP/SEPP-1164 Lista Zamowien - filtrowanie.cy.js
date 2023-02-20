import { e30 } from '../../../../POM/Zaangazowanie/E30 Lista zamowien'

describe('SEPP-1164 Lista zamówień - filtrowanie', function () {


    it('Lista zamówień - filtrowanie', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Zamówienia')

        // 1. asercje 
        cy.log('Krok 1 - asercje na filtry podstawowe')

        cy.get('#OrderNr')
            .should('have.attr', 'placeholder', 'Nr zamówienia')
            .and('not.have.attr', 'readonly')

        cy.get('#AgreementNr')
            .should('have.attr', 'placeholder', 'Nr porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#InternalNr')
            .should('have.attr', 'placeholder', 'Nr wewn.')
            .and('not.have.attr', 'readonly')

        cy.get('#AuditionName')
            .should('have.attr', 'placeholder', 'Nazwa audycji TV')
            .and('not.have.attr', 'readonly')

        cy.get('#AuditionProductionSap')
            .should('have.attr', 'placeholder', 'SAP / ID audycji')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-ProducerId-container')
            .should('have.text', 'Producent')
            .and('not.have.attr', 'readonly')
        // cy.get('#progressBar').should('not.be.visible')
        // cy.get('[role="row"][data-dt-row="0"] > [data-dt-column="0"]').should('be.visible')
        //   .and('have.attr','data-toggle','tooltip')

        // 2. kliknięcie zaawansowane
        cy.log('Krok 2 - kliknięcie Zaawansowane')
        e30.zaawansowanePrzycisk().click()

        // 3. asercje 
        cy.log('Krok 3 - asercje na filtry zaawansowane')
        cy.log('szczegoly zamówienia - asercje')

        cy.get('#select2-IdAgency-container')
            .should('have.text', 'Agencja')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-ContractorId-container')
            .should('have.text', 'Kontrahent / Jedn. TVP / NIP')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderType-container')
            .should('have.text', 'Typ zamówienia')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderKind-container')
            .should('have.text', 'Rodzaj zamówienia')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderStatus-container')
            .should('have.text', 'Status zamówienia')
            .and('not.have.attr', 'readonly')

        cy.get('#TitleName')
            .should('have.attr', 'placeholder', 'Nazwa kosztorysu')
            .and('not.have.attr', 'readonly')

        cy.get('#div_OrderDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_OrderDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_RealizationnDateFrom') // literówka
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_RealizationDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#Notes')
            .should('have.attr', 'placeholder', 'Uwagi')
            .and('not.have.attr', 'readonly')

        cy.get('#AmountNetOnContractFrom')
            .should('have.attr', 'placeholder', 'NETTO na umowie od')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#AmountNetOnContractTo')
            .should('have.attr', 'placeholder', 'NETTO na umowie do')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#AmountGrossOnContractFrom')
            .should('have.attr', 'placeholder', 'BRUTTO na umowie od')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#AmountGrossOnContractTo')
            .should('have.attr', 'placeholder', 'BRUTTO na umowie do')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#Description')
            .should('have.attr', 'placeholder', 'Opis')
            .and('not.have.attr', 'readonly')

        cy.get('#DfNumber')
            .should('have.attr', 'placeholder', 'Nr Wewnętrzny DF')
            .and('not.have.attr', 'readonly')

        cy.get('#InvoiceNr')
            .should('have.attr', 'placeholder', 'Nr faktury / rachunku')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-IdPlannedLimit-container')
            .should('have.text', 'Limit')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-IdTermsOfPayment-container')
            .should('have.text', 'Warunek płatności')
            .and('not.have.attr', 'readonly')

        cy.get('#Paymentcondition')
            .should('have.attr', 'placeholder', 'Warunek płatności - uwagi')
            .and('not.have.attr', 'readonly')

        //
        cy.log('Szczegóły zamówienia zakupu/usługi - asercje')

        cy.get('#select2-ObjectOfOrderId-container')
            .should('have.text', 'Przedmiot zlecenia')
            .and('not.have.attr', 'readonly')


        cy.get('#ObjectOfOrderRemarks')
            .should('have.attr', 'placeholder', 'Niest. przedm. zlec.')
            .and('not.have.attr', 'readonly')

        cy.get('#div_RagistrationDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_RegistrationDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#IsContract')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#IsOrder')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        //
        cy.log('Szczegóły porozumienia/kosztorysu - asercje')

        cy.get('#select2-IdPaymentType-container')
            .should('have.text', 'Rodzaj płatności')
            .and('not.have.attr', 'readonly')


        // filtruj po agencji
        cy.log('Krok 4 - filtrowanie po agencji')
        cy.get('#select2-IdAgency-container').click()
        cy.get('#select2-IdAgency-results > :nth-child(1)').click()

        e30.wyszukajPrzycisk().click() // brak zamówień
        //   cy.get('tbody > :nth-child(1) > :nth-child(7)')
        //   .should('have.text','AKFiS')

        // wyczysc filtry
        e30.wyczyscFiltryPrzycisk().first().click()

        // filtruj po dacie
        e30.zaawansowanePrzycisk().click()
        cy.get('#OrderDateFrom').type('09.02.2023') // 13.05.2021
        cy.get('#OrderDateTo').type('09.02.2023') // 13.05.2021
        e30.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > .date').should('have.text', '09.02.2023') // 13.05.2021

        // wyczysc filtry
        e30.wyczyscFiltryPrzycisk().first().click()

        cy.get('#OrderDateFrom').should('to.be.empty')
        // Wyloguj uzytkownika
        cy.logoutUser()
    })
})