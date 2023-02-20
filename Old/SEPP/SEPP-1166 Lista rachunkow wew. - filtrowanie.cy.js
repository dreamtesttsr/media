import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e38 } from '../../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

const dataTest = {
    nazwaAgencji: 'AKFiS',
    numerRachunku: '123456789'
}

describe('SEPP-1166 Rachunków wewnętrznych - filtrowanie', () => {
    it('Lista Rachunków wewnętrznych - filtrowanie', () => {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Rachunki wewnętrzne')

        cy.log('Krok 1 - asercje na filtry podstawowe')
        cy.get('#Number')
            .should('have.attr', 'placeholder', 'Nr rachunku')
            .and('not.have.attr', 'readonly')
        cy.get('#AuditionProductionSap')
            .should('have.attr', 'placeholder', 'SAP / ID audycji')
            .and('not.have.attr', 'readonly')
        cy.get('#OrderNumber')
            .should('have.attr', 'placeholder', 'Nr zamówienia wew.')
            .and('not.have.attr', 'readonly')
        cy.get('#AgreementNumber')
            .should('have.attr', 'placeholder', 'Nr porozumienia')
            .and('not.have.attr', 'readonly')
        cy.get('#AuditionName')
            .should('have.attr', 'placeholder', 'Nazwa audycji TV')
            .and('not.have.attr', 'readonly')
        cy.get('#select2-ProducerId-container')
            .should('have.text', 'Producent')
            .and('not.have.attr', 'readonly')     

        cy.log('Krok 2 - asercje na filtry zaawansowane')
        e38.zaawansowanePrzycisk().click()
        cy.get('#select2-OrganizationUnitId-container')
            .should('have.text', 'Jednostka TVP')
            .and('not.have.attr', 'readonly')
        cy.get('#select2-IdAgency-container')
            .should('have.text', 'Agencja')
            .and('not.have.attr', 'readonly')
        cy.get('#CostNettoPLNFrom')
            .should('have.attr', 'placeholder', 'Kwota rozliczenia od')
            .and('have.attr','value', '-999999999,99')
            .and('not.have.attr', 'readonly')
        cy.get('#CostNettoPLNTo')
            .should('have.attr', 'placeholder', 'Kwota rozliczenia do')
            .and('have.attr','value', '999999999,99')
            .and('not.have.attr', 'readonly')
        cy.get('#div_InvoiceDateFrom')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')
        cy.get('#div_InvoiceDateTo')
            .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
            .and('not.have.attr', 'readonly')
        cy.get('#TitleName')
            .should('have.attr', 'placeholder', 'Nazwa kosztorysu')
            .and('not.have.attr', 'readonly')
        cy.get('#select2-FirstLevelCostId-container')
            .should('have.text', 'Grupa kosztów')
            .and('not.have.attr', 'readonly')
        cy.get('#SecondLevelCostId')
            .should('have.attr', 'data-title', 'Podgrupa kosztów')
            .and('be.disabled')
        cy.get('#select2-FirstLevelCostId-container').click()
        cy.get('#select2-FirstLevelCostId-results > :nth-child(1)').click()
        cy.get('#select2-SecondLevelCostId-container')
            .should('have.text', 'Podgrupa kosztów')
            .and('not.be.disabled')
        e38.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - filtrowanie po agencji')
        e38.zaawansowanePrzycisk().click()
        e38.agencjaLista().select('AKFiS', {force: true})
        e38.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e38.polePrzyciski().should('have.text', dataTest.nazwaAgencji)
        e38.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - filtrowanie po nr rachunku')
        e38.numerRachunkuWewnetrznegoPoleTekstowe().type(dataTest.numerRachunku)
        e38.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e38.sprawdzElementKolumna().first().should('have.text', dataTest.numerRachunku)
        e38.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e38.numerRachunkuWewnetrznegoPoleTekstowe().should('to.be.empty')
   
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})