import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e51601 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly'

describe('SEPP-14046 Zamówienia zewnętrzne - podgląd', () => {

    before('Logowanie do środowiska', () => {
        cy.visit('/')
            .loginPracownikDyspozytury()
        cy.goToMenu('Zamówienia zewnętrzne')
    })

    it('Zamówienia zewnętrzne - podgląd', () => {
        cy.log('Krok 1 - Filtruj po statusie zamowienia')
        e516.statusLista().select('W trakcie postępowania', {force: true})
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 2 - Sprawdzenie widoczności przycisków')
        e516.zamowieniaZewnetrzneTabela().find('a[title="Podgląd"]:contains("P")').first().scrollIntoView().should('be.visible')
        cy.get('a[title="Przegląd wniosku o zasoby"]').should('not.exist')
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr').should('have.length.gte', 1)
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr > td:nth-child(11)').each((el) => {
            expect(el).to.have.text('W trakcie postępowania')
        })

        cy.log('Krok 3 - Kliknij przycisk "P"')
        e516.zamowieniaZewnetrzneTabela().find('a[title="Podgląd"]:contains("P")').first().click({force: true})
        fWspolne.sprawdzProgressBar()
        cy.contains('Dane zamówienia zewnętrznego').should('be.visible')

        cy.log('Krok 4 - Powrót do Zamówienia zewnętrzne')
        e51601.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 5 - Kliknij na ikonę "Wyczyść filtry wyszukiwania"')
        e516.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr').should('have.length.gte', 1)
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr > td:nth-child(11)').should('not.have.text', 'W trakcie postępowania')

        cy.log('Krok 6 - Kliknij przycisk "Z" na wybranej rezerwacji')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-16832')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr').should('have.length', 1)
        e516.zamowieniaZewnetrzneTabela().find('a[title="Przegląd wniosku o zasoby"]:contains("Z")').click({force: true})
        fWspolne.sprawdzProgressBar()
        cy.contains('Dzień zdjęciowy').should('be.visible')

        cy.log('Krok 7 - Powrót do listy zamówień zewnętrznych')
        e50200.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.zamowieniaZewnetrzneTabela().find('tbody > tr').should('have.length', 1)

        // Wyloguj użytkownika
        cy.logoutUser()
    })
})