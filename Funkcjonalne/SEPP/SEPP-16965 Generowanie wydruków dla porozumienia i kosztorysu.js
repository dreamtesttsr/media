import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'
import { e25 } from '../../../../POM/Planowanie/E25 Kosztorysy'
import { e99 } from '../../../../POM/Wydruki/E99 Wydruki'

describe('SEPP-16965 Generowanie wydruków dla porozumienia i kosztorysu', () => {

    it('Wygenerowanie wydruku dla kosztorysu', () => {
        cy.log('Krok 1 - Loguję się jako Dyrektor Agencji CUP')
        cy.visit('')
            .loginDyrektorAgencjiCUP()
        
        cy.log('Krok 2 - Jestem na ekranie listy kosztorysów i przechodzę do ekranu kosztów planowanych dla wybranego kosztorysu')
        cy.goToMenu('Kosztorysy')
        e25.nazwaAudycjiPoleTekstowe().type('SEPP-16839')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie kosztów planowanych i generuję wydruk kosztorysu JW')
        e23.drukujPrzycisk().click()
        e99.wydrukEtykieta('Porozumienie').should('not.exist')
        e99.jwLista().select('CUP', {force: true})
        e99.wydrukPrzyciskWyboru('Kosztorys JW').click()
        e99.drukujPrzycisk().click()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Wygenerowanie wydruku dla porozumienia', () => {
        cy.log('Krok 4 - Loguję się jako Kierownik Produkcji')
        cy.visit('')
            .loginKierownikProdukcji()

        cy.log('Krok 5 - Jestem na ekranie listy kosztorysów i przechodzę do ekranu kosztów planowanych dla wybranego kosztorysu bez kosztów CUP')
        cy.goToMenu('Kosztorysy')
        e25.nazwaAudycjiPoleTekstowe().type('SEPP-16835A')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()

        cy.log('Krok 6 - Jestem na ekranie kosztów planowanych i generuję wydruk porozumienia')
        e23.drukujPrzycisk().click()
        e99.jwLista().should('not.exist')
        e99.wydrukPrzyciskWyboru('Porozumienie').click()
        e99.drukujPrzycisk().click()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})