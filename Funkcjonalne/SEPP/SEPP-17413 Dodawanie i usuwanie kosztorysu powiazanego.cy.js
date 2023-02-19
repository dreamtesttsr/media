import { daneTestowe } from '../../../../fixtures/daneTestowe'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'

describe('SEPP-17413 Dodawanie i usuwanie kosztorysu powiązanego', () => {

    it('Dodawanie i usuwanie kosztorysu powiązanego', () => {
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.numerPorozumieniaPoleTekstowe().type('P/1001777/AKFiS/2022')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów porozumienia, sprawdzam edytowalność pola "Rodzaj porozumienia" i klikam "Dodaj kosztorys powiązany"')
        e22.rodzajPorozumieniaLista().should('not.be.disabled')
        e22.dodajKosztorysPowiazanyPrzycisk().click()

        cy.log('Krok 4 - Na liście kosztorysów próbuję wyszukać nieaktywny kosztorys')
        cy.get('select#SelectedTitleId>option').each(($option) => {
            expect($option).to.not.contain.text('SEPP-17413-NIEAKTYWNY')
        })

        cy.log('Krok 5 - Dodaję kosztorys powiązany i sprawdzam poprawność wyświetlania tabeli kosztorysów powiązanych oraz edytowalnośc pola "Rodzaj porozumienia"')
        e22.kosztorysPowiazanyPopupLista().select('P/1001779/AKFiS/2022, SEPP-17413-DEV (PU)', {force: true})
        e22.potwierdzKosztorysPowiazanyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('input[value="produkcyjne"]').should('have.prop', 'readOnly', true)
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(2)').contains('development')
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(4)').contains('SEPP-17413-DEV').should('have.attr', 'href').and('include', '/Agreement/DetailsCosts/2000068/2000077')

        cy.log('Krok 6 - Wyszukuję kosztorys powiązany i sprawdzam poprawność wyświetlania tabeli kosztorysów powiązanych')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.numerPorozumieniaPoleTekstowe().clear()
        e20.zaawansowanePrzycisk().click()
        e20.nrPorozumieniaPowiazanegoPoleTekstowe().type('P/1001779/AKFiS/2022')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        cy.get('input[value="development"]').should('have.prop', 'readOnly', true)
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(2)').contains('produkcyjne')
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(4)').contains('SEPP-17413').should('have.attr', 'href').and('include', '/Agreement/DetailsCosts/2000066/2000075')

        cy.log('Krok 7 - Sprawdzam czy na innym porozumieniu produkcyjnym mogę dodać powiązany kosztorys')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.numerPorozumieniaPoleTekstowe().type(daneTestowe.nrPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        e22.dodajKosztorysPowiazanyPrzycisk().click()
        cy.get('select#SelectedTitleId>option').each(($option) => {
            expect($option).to.not.contain.text('SEPP-17413-DEV')
        })
        e22.anulujKosztorysPowiazanyPopupPrzycisk().click()

        cy.log('Krok 8 - Powracam na kosztorys produkcyjny i usuwam kosztorys powiązany')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.numerPorozumieniaPoleTekstowe().type('P/1001777/AKFiS/2022')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        e22.usunKosztorysPowiazanyPierwszyPrzycisk().click()
        e22.takUsunKosztorysPowiazanyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(2)').should('not.exist')
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(4)').should('not.exist')

        cy.log('Krok 9 - Powracam na ekran listy porozumień i wyszukuję porozumienie z nieaktywnym kosztorysem')
        e22.powrotPrzycisk().click()
        e20.numerPorozumieniaPoleTekstowe().clear().type('P/1001778/AKFiS/2022')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        
        cy.log('Krok 10 - Jestem na ekranie szczegółów porozumienia i próbuję dodać kosztorys powiązany')
        e22.dodajKosztorysPowiazanyPrzycisk().should('not.exist')
        cy.get('#ConnectedTitleList > tbody > tr > td:nth-child(3)').should('not.exist')

        // Wylogowanie
        cy.logoutUser()
    })
})