import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia Zewnetrzne'

describe('SEPP-14047, 14048 Podglad KU i Podgląd Prod', () => {
    // SEPP-14047 - Podglad KU
    // SEPP-14048 - Podglad Prod

    it('SEPP-14047 - Podglad KU', () => {
        cy.visit('')
            .loginAdmin()
        cy.goToMenu('Zamówienia zewnętrzne')

        cy.log('Krok 1 - Filtruj po statusie')
        e516.filtrujPoStatusie('W trakcie uzupełniania specyfikacji')

        cy.log('Krok 2 - Sprawdzenie widoczności przyciskow')
        e516.zamowieniaZewnetrzneTabela().get('tbody > tr > td:first()').then(($textFirst) => {
            if( $textFirst.text() == 'Brak danych' ){
                cy.log('Tabela zamówień zewnętrznyh jest pusta')
            }else{
                e516.zamowieniaZewnetrzneTabela().find('a:contains("E")').first().scrollIntoView().should('be.visible')
                e516.zamowieniaZewnetrzneTabela().find('a:contains("A")').first().scrollIntoView().should('be.visible')
            }
        })

        cy.log('Krok 3 - Wyczyść filtry wyszukiwania')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // wylogowanie użytkownika
        cy.logoutUser()
    })

    it('SEPP-14048 - Podglad Prod', () => {
        cy.visit('')
            .loginProducent()
        cy.goToMenu('Zamówienia zewnętrzne')

        cy.log('Krok 1 - Filtruj po statusie')
        e516.filtrujPoStatusie('Opracowano specyfikację techniczną')

        cy.log('Krok 2 - Sprawdzenie widoczności przyciskow')
        e516.zamowieniaZewnetrzneTabela().get('tbody > tr > td:first()').then(($textFirst) => {
            if( $textFirst.text() == 'Brak danych' ){
                cy.log('Tabela zamówień zewnętrznyh jest pusta')
            }else{
                e516.zamowieniaZewnetrzneTabela().find('a:contains("E")').first().scrollIntoView().should('be.visible')
            }
        })

        cy.log('Krok 3 - Wyczyść filtry wyszukiwania')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // wylogowanie użytkownika
        cy.logoutUser()
    })
})
