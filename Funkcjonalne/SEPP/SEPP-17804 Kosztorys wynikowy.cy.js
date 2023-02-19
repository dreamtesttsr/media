import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'

describe('SEPP-17804 Kosztorys wynikowy', () => {
    it('Kosztorys wynikowy', () => {
        // Strona główna i logowanie 
        cy.visit('/')
            .loginProducent()        

        cy.log('Krok 1 - Przejście do edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-17804')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 2 - Dodanie kosztorysu wynikowego')
        e22.dodajKosztorysPrzycisk().click()
        e22.nazwaKosztorysuPopupPoleTestowe().type('kosztorys wynikowy')
        e22.celKosztorysuPopupLista().select('[WU] Kosztorys wynikowy z kosztorysem usługowym', {force: true})
        e22.potwierdzKosztorysPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Weryfikacja opcji zmiany celu kosztorysu')
        cy.get('#select2-CurrentTitle_TitleTargetId-container').should('be.visible').click().then(() => {
            cy.get('#select2-CurrentTitle_TitleTargetId-results').should('have.prop', 'childElementCount', 2)
            cy.get('#select2-CurrentTitle_TitleTargetId-results').contains('[W] Kosztorys wynikowy bez kosztorysu usługowego')
            cy.get('#select2-CurrentTitle_TitleTargetId-results').contains('[WU] Kosztorys wynikowy z kosztorysem usługowym')
        })

        cy.log('Krok 4 - Weryfikacja ekranu kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.producentKierownikProdukcjiEtykieta().should('be.visible')
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('be.visible')
        e23.akceptantKompletnosciKUEtykieta().should('be.visible')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('be.visible')
        e23.dyrekcjaJUEtykieta().should('be.visible')

        cy.log('Krok 5 - Usunięcie kosztorysu')
        e23.powrotPrzycisk().click()
        e22.usunKosztorysPrzycisk().click()
        e22.potwierdzUsunKosztorysPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})