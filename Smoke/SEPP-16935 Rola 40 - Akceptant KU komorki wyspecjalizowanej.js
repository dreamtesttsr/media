import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../POM/Planowanie/E23 Koszty planowane'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'

describe('SEPP-16935 Rola 40', () => {

    it('Rola 40 - Akceptant KU komórki wyspecjalizowanej', () => {
        cy.log('Krok 1 - Loguję się jako Akceptant KU komórki wyspecjalizowanej')
        cy.visit('')
            .loginAkceptantKUKomorkiWyspecjalizowanej()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzWidok()
        e20.sprawdzWidok40()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie szczegółów porozumienia i sprawdzam poprawność pól')
        e20.edycjaPierwszyPrzycisk().click()
        // e22.sprawdzWidok() // pominięte do czasu napisania metod dla ekranu E22.

        cy.log('Krok 4 - Jestem na ekranie kosztów planowanych i sprawdzam poprawność pól')
        e22.kosztyPlanowanePrzycisk().click()
        e23.sprawdzWidok()
        e23.sprawdzWidok40()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        e23.sprawdzWidokKoszt()

        cy.log('Krok 5 - Jestem na ekranie listy kosztorysów i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie listy audycji i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzWidok()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})