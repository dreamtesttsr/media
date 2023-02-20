import { e200 } from '../../../../POM/Audycje/E200 Audycje'

describe('SEPP-1163 Lista audycji - filtrowanie', function () {


    it('Lista audycji - filtrowanie', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()
        // Porozumienia
        cy.goToMenu('Audycje')

        // 1. asercje 
        cy.log('Krok 1 - asercje na filtry')
        e200.numerPorozumieniaPoleTekstowe()
            .should('have.attr', 'placeholder', 'Nr porozumienia')
            .and('not.have.attr', 'readonly')

        e200.nazwaAudycjiTVPoleTekstowe()
            .should('have.attr', 'placeholder', 'Nazwa audycji TV')
            .and('not.have.attr', 'readonly')

        e200.sapIdAudycjiMPKPoleTekstowe()
            .should('have.attr', 'placeholder', 'SAP / ID audycji / MPK')
            .and('not.have.attr', 'readonly')

        e200.odcOdPoleTekstowe()
            .should('have.attr', 'placeholder', 'Odc. od')
            .and('not.have.attr', 'readonly')

        e200.odcDoPoleTekstowe()
            .should('have.attr', 'placeholder', 'Odc. do')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-ProducerId-container')
            .should('have.text', 'Producent')
            .and('not.have.attr', 'readonly')
        //   .and('have.attr','data-toggle','tooltip')

        // 2. kliknięcie w przycisk 'Zaawansowane'
        cy.log('Krok 2 - kliknięcie Zaawansowane')
        e200.zaawansowanePrzycisk().click()

        // 3. asercje 
        cy.log('Krok 3 - asercje na filtry zaawansowane')

        cy.get('#select2-AgencyId-container')
            .should('have.text', 'Agencja')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderingUnitId-container')
            .should('have.text', 'Jedn. zamawiająca')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-IncomeType-container')
            .should('have.text', 'Rodzaj przychodu')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-ServiceType-container')
            .should('have.text', 'Rodzaj usługi')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-PaymentsType-container')
            .should('have.text', 'Rodzaj płatności')
            .and('not.have.attr', 'readonly')

        cy.log('Krok 4 - Szczegóły kosztorysu - asercje')
        cy.get('#CostEstimate')
            .should('have.attr', 'placeholder', 'Nazwa kosztorysu')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AuditionFormId-container')
            .should('have.text', 'Forma audycji')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-DetailedAuditionFormId-container')
            .should('have.text', 'Szcz. forma audycji')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-AerialId-container')
            .should('have.text', 'Antena')
            .and('not.have.attr', 'readonly')

        cy.get('#AerialRegisterNumber')
            .should('have.attr', 'placeholder', 'Nr rej. anteny')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-FinancialSourceId-container')
            .should('have.text', 'Źródło finans.')
            .and('not.have.attr', 'readonly')

        cy.log('Krok 5 - Szczegóły audycji - asercje')
        cy.get('#ContractNumber')
            .should('have.attr', 'placeholder', 'Nr kontraktu')
            .and('not.have.attr', 'readonly')

        cy.get('#div_OrderDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_OrderDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#SellPriceFrom')
            .should('have.attr', 'placeholder', 'Cena sprzedaży odc. od')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#SellPriceTo')
            .should('have.attr', 'placeholder', 'Cena sprzedaży odc. do')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#IsSold')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#IsNotSold')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#InvoiceNumber')
            .should('have.attr', 'placeholder', 'Nr faktury')
            .and('not.have.attr', 'readonly')

        cy.get('#div_InvoiceDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_InvoiceDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#GetProtocolNumber')
            .should('have.attr', 'placeholder', 'Nr prot. odb.')
            .and('not.have.attr', 'readonly')

        cy.get('#div_EmissionDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_EmissionDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#PlanedRealizationdateYear')
            .should('have.attr', 'placeholder', 'Rok - termin realizacji')
            .and('not.have.attr', 'readonly')

        cy.get('#menuFilter > div:nth-child(10) > div:nth-child(2) > div > div.col-lg-10.form-narrow > span > span.selection > span > ul > li > input')
            .should('have.attr', 'placeholder', 'Miesiąc - termin realizacji')
            .and('not.have.attr', 'readonly')

        cy.get('#PlanedRealizationdateDay')
            .should('have.attr', 'placeholder', 'Dzień - termin realizacji')
            .and('not.have.attr', 'readonly')

        cy.get('#select2-OrderingAuditionUnitId-container')
            .should('have.text', 'Jednostka zamawiająca na zleceniu')
            .and('not.have.attr', 'readonly')

        cy.get('#EpisodeDescription')
            .should('have.attr', 'placeholder', 'Opis odcinka')
            .and('not.have.attr', 'readonly')

        cy.log('Krok 6 - Szczegóły audycji (dane Jednostki Współpracującej)')
        cy.get('#CooperationContractNumber')
            .should('have.attr', 'placeholder', 'Nr kontraktu (JW)')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationSellPriceFrom')
            .should('have.attr', 'placeholder', 'Cena sprzedaży od')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationSellPriceTo')
            .should('have.attr', 'placeholder', 'Cena sprzedaży do')
            .and('have.attr', 'data-numeric-type', 'currency')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationIsSold')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationIsNotSold')
            .should('have.attr', 'type', 'checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationInvoiceNumber')
            .should('have.attr', 'placeholder', 'Numer  faktury (JW)') // podwójna spacja
            .and('not.have.attr', 'readonly')

        cy.get('#div_CooperationInvoiceDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#div_CooperationInvoiceDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperationGetProtocolNumber')
            .should('have.attr', 'placeholder', 'Nr prot. odb. (JW)')
            .and('not.have.attr', 'readonly')

        cy.log('Krok 7 - filtrowanie po agencji')
        cy.get('#select2-AgencyId-container').click()
        cy.get('#select2-AgencyId-results > :nth-child(1)').click()

        e200.wyszukajPrzycisk().click() // brak audycji
        cy.get('tbody > :nth-child(1) > :nth-child(12)')
            .should('contain', 'AKFiS')

        // wyczysc filtry
        e200.wyczyscFiltryPrzycisk().first().click()

        // filtruj po nr porozumienia
        e200.numerPorozumieniaPoleTekstowe().type('P/1001733/AKFiS/2021')
        e200.wyszukajPrzycisk().click()
        cy.get('tbody > :nth-child(1) > :nth-child(12)')
            .should('have.text', 'P/1001733/AKFiS/2021')

        // wyczysc filtry
        e200.wyczyscFiltryPrzycisk().first().click()
        e200.numerPorozumieniaPoleTekstowe().should('to.be.empty')

        cy.logoutUser()
    })
})