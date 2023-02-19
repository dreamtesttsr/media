import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e50801 } from '../../../POM/Produkcja/Słowniki/E508.01 Sprzet - szczegoly'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'

describe('SEPP-14606 Rola 14', () => {

    it('Rola 14 - Administrator biznesowy CUP (sprzęt)', () => {
        cy.log('Krok 1 - Loguję się jako Administrator biznesowy CUP (sprzęt)')
        cy.visit('/')
            .loginAdministratorBiznesowyCUPSprzet()

        cy.log('Krok 2 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()
        e506.edycjaPierwszyPrzycisk().should('be.visible')

        cy.log('Krok 3 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()
        e508.sprawdzWidok14()

        cy.log('Krok 4 - Przechodzę na ekran edycji elementu sprzętowego i sprawdzam poprawność pól')
        e508.edycjaPierwszyPrzycisk().click()
        e50801.sprawdzWidok()
        e50801.sprawdzWidok14()

        cy.log('Krok 5 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()
        e512.sprawdzWidok14()

        cy.log('Krok 6 - Jestem na ekranie Powody niedostepności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()
        e514.sprawdzWidok14()

        cy.log('Krok 7 - Jestem na ekranie Dni świąteczne i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()
        e511.sprawdzWidok14()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})