const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')

describe('SEPP-12662 Lista porozumień - filtrowanie zaawansowane', function () {

    it('Lista porozumień - filtrowanie zaawansowane', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // 1. Przejście do zakładki 'Porozumienia'
        cy.goToMenu('Porozumienia')

        // 2. Kliknięcie na przycisk 'Zaawansowane' 
        cy.log('Rozwinięcie zaawansowanej sekcji filtrów')
        e20.zaawansowanePrzycisk().click()

        // 3. i 4. Weryfikacja istnienia i edytowalności filtrów w sekcji 'Zaawansowane'
        cy.get('#AgencyId')
            .should('have.attr', 'data-placeholder', 'Agencja')
            .and('not.have.attr', 'readonly')

        cy.get('#CooperatingUnitsId')
            .should('have.attr', 'data-placeholder', 'Jednostka usługowa')
            .and('not.have.attr', 'readonly')

        cy.get('#AgrementStateId')
            .should('have.attr', 'data-placeholder', 'Stan porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#OrderStatusId')
            .should('have.attr', 'data-placeholder', 'Status porozumienia')
            .and('not.have.attr', 'readonly')

        cy.get('#OrderUnitId')
            .should('have.attr', 'data-placeholder', 'Jednostka zamawiająca')
            .and('not.have.attr', 'readonly')

        cy.get('#OfficeId')
            .should('have.attr', 'data-placeholder', 'Redakcja zamawiająca')
            .and('not.have.attr', 'readonly')

        e20.rodzajPrzychoduLista()
            .should('have.attr', 'data-placeholder', 'Rodzaj przychodu')
            .and('not.have.attr', 'readonly')

        e20.rodzajUslugiLista()
            .should('have.attr', 'data-placeholder', 'Rodzaj usługi')
            .and('not.have.attr', 'readonly')

        cy.get('#LeadingPersonId')
            .should('have.attr', 'data-title', 'Osoba wiodące')
            .and('not.have.attr', 'readonly')

        cy.get('#EmittingUnitId')
            .should('have.attr', 'data-placeholder', 'Jednostka emitująca')
            .and('not.have.attr', 'readonly') 

        cy.get('#EmittingEditorId')
            .should('have.attr', 'data-placeholder', 'Redakcja emitująca')
            .and('not.have.attr', 'readonly') 

        cy.get('#AgreementDateFrom')
            .should('have.attr', 'placeholder', 'Data porozumienia od')
            .and('not.have.attr', 'readonly') 

        cy.get('#AgreementDateTo')
            .should('have.attr', 'placeholder', 'Data porozumienia do')
            .and('not.have.attr', 'readonly') 

        cy.get('#AgreementCloseDateFrom')
            .should('have.attr', 'placeholder', 'Data zamknięcia od')
            .and('not.have.attr', 'readonly') 
        
        cy.get('#AgreementCloseDateTo')
            .should('have.attr', 'placeholder', 'Data zamknięcia do')
            .and('not.have.attr', 'readonly') 

        cy.get('#CostName')
            .should('have.attr', 'placeholder', 'Nazwa kosztorysu')
            .should('have.attr','type','text')
            .and('not.have.attr', 'readonly') 

        cy.get('#AuditionFormID')
            .should('have.attr', 'data-placeholder', 'Forma audycji')
            .and('not.have.attr', 'readonly')
            
        cy.get('#AuditionFormDetailsId')
            .should('have.attr', 'data-placeholder', 'Forma audycji szczeg.')
            .and('not.have.attr', 'readonly')
            
        cy.get('#AntenaId')
            .should('have.attr', 'data-placeholder', 'Antena')
            .and('not.have.attr', 'readonly')
            
        cy.get('#AntenaNrId')
            .should('have.attr', 'placeholder', 'Nr rejestru anteny')
            .should('have.attr','type','text')
            .and('not.have.attr', 'readonly')

        cy.get('#TripartiteAgreementYES')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#TripartiteAgreementNO')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#IncludesProductPlacementYES')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#IncludesProductPlacementNO')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#ProcesingOutOffSeppYES')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#ProcesingOutOffSeppNO')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#CinemaFoundsYES')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')

        cy.get('#CinemaFoundsNO')
            .should('have.attr', 'value', 'true')
            .should('have.attr','type','checkbox')
            .and('not.have.attr', 'readonly')
        
        // 5. Zawężenie wyników wyszukiwania
        cy.get('#select2-AgencyId-container').click()
        cy.get('#select2-AgencyId-results > :nth-child(1)').click()
        e20.wyszukajPrzycisk().click()

        // Zweryfikowanie czy zawężenie dało poprawny rezultat
        cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', 'AKFiS')

        // 6. Wyczyszczenie filtrów
        e20.wyczyscFiltryPrzycisk().click()

        // 7. Wypełnienie wybranych filtrów wartościami zawężającymi oraz dodanie nieistniejącego numeru porozumienia a następnie wyszukanie
        e20.zaawansowanePrzycisk().click()
        cy.get('#select2-AgencyId-container').click()
        cy.get('#select2-AgencyId-results > :nth-child(1)').click()

        cy.get('#select2-AgrementStateId-container').click()
        cy.get('#select2-AgrementStateId-results > :nth-child(1)').click()
        
        cy.get('#Number').click().type('1111111111')
        e20.wyszukajPrzycisk().click()

        cy.get('#agreementList_table > tbody > .odd > .dataTables_empty').should('be.visible')

        // Wyloguj uzytkownika
        cy.logoutUser()
    })
})