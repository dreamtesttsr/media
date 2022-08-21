import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e50601 } from '../../../POM/Produkcja/Słowniki/E506.01 Cennik - szczegoly'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'

describe('SEPP-14608 Rola 29', () => {

    it('Rola 29 - Administrator biznesowy CUP (cennik)', () => {
        cy.log('Krok 1 - Loguję się jako Administrator biznesowy CUP (cennik)')
        cy.visit('')
            .loginAdministratorBiznesowyCUPCennik()

        cy.log('Krok 2 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()
        e506.sprawdzWidok29()

        cy.log('Krok 3 - Jestem na ekranie dodawania pozycji cennika i sprawdzam poprawność pól')
        e506.dodajNowaPozycjeDoCennikaPrzycisk().click()
        e50601.sprawdzURL()
        e50601.sprawdzWidok()
        e50601.sprawdzWidok29()

        cy.log('Krok 4 - Jestem na ekranie Powody niedostepności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()
        e514.sprawdzWidok29()

        cy.log('Krok 5 - Jestem na ekranie Dni świąteczne i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()
        e511.sprawdzWidok29()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})