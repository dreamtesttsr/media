import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e51601 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly'
import { e51602 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.02 Wyszukaj zasob'

describe('SEPP-14047, 14048 Zamówienia zewnętrzne - KU i Producent', () => {

    it('SEPP-14047 - Zamówienia zewnętrzne - Koordynator Usług', () => {
        cy.visit('/')
            .loginKoordynatorUslug()
        cy.goToMenu('Zamówienia zewnętrzne')

        cy.log('Krok 1 - Filtruj po statusie')
        e516.filtrujPoStatusie('W trakcie uzupełniania specyfikacji')

        cy.log('Krok 2 - Sprawdzenie widoczności przyciskow')
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr > td:first()').then(($textFirst) => {
            if( $textFirst.text() == 'Brak danych' ){
                cy.log('Tabela zamówień zewnętrznych jest pusta')
            }else{
                e516.edycjaPierwszyPrzycisk().should('be.visible')
                e516.anulacjaZamowieniaPierwszyPrzycisk().should('be.visible')
            }
        })

        cy.log('Krok 3 - Wejdż w edycję zamówienia zewnętrznego i dodaj powiązane rezerwacje')
        e516.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.dodajRezerwacjePrzycisk().click()
        e51602.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51602.zaznaczWszystkiePrzyciskWyboru().check()
        cy.get('td>[type="checkbox"].selectCb').each(($checkbox) => {
            cy.wrap($checkbox).should('be.checked')
        })
        cy.get('button#resourceSearchModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        cy.get('#externalRequestList_table_info').should('contain', 'Pozycje od 1 do 25 z 26 łącznie')

        cy.log('Krok 4 - Usuń wszystkie dodane przed chwilą rezerwacje')
        e51601.zaznaczWszystkiePrzyciskWyboru().check()
        e51601.usunWybranePrzycisk().click()
        e51601.takUsunPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#externalRequestList_table_info').should('contain', 'Pozycje od 1 do 1 z 1 łącznie')
        e51601.powrotPrzycisk().click()

        cy.log('Krok 5 - Wyczyść filtry wyszukiwania')
        e516.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // wylogowanie użytkownika
        cy.logoutUser()
    })

    it('SEPP-14048 - Zamówienia zewnętrzne - Producent', () => {
        cy.visit('/')
            .loginProducent()
        cy.goToMenu('Zamówienia zewnętrzne')

        cy.log('Krok 1 - Filtruj po statusie')
        e516.filtrujPoStatusie('Opracowano specyfikację techniczną')

        cy.log('Krok 2 - Sprawdzenie widoczności przyciskow')
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr > td:first()').then(($textFirst) => {
            if( $textFirst.text() == 'Brak danych' ){
                cy.log('Tabela zamówień zewnętrznych jest pusta')
            }else{
                e516.edycjaPierwszyPrzycisk().should('be.visible')
            }
        })

        cy.log('Krok 3 - Wyczyść filtry wyszukiwania')
        e516.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // wylogowanie użytkownika
        cy.logoutUser()
    })
})
