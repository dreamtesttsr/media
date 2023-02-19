import { e75 } from '../../../POM/Administracja/E75 Tworcy'
import { e76 } from '../../../POM/Administracja/E76 Kontrahenci'
import { e72 } from '../../../POM/Administracja/E72 Rodzaj Statusu'
import { e73 } from '../../../POM/Administracja/E73 Slowniki'
import { e77 } from '../../../POM/Administracja/E77 VAT w kosztach'
import { e7501 } from '../../../POM/Administracja/E75.01 Tworcy szczegoly'
import { e7601 } from '../../../POM/Administracja/E76.01 Kontrahenci szczegoly'

describe('SEPP-14857 Rola 6', () => {

    it('Rola 6 - Administrator Biznesowy', () => {
        cy.log('Krok 1 - Loguję się jako Administrator biznesowy')
        cy.visit('/')
            .loginAdministratorBiznesowy()

        cy.log('Krok 2 - Jestem na ekranie Administracja -> Twórcy i sprawdzam poprawność pól')
        cy.goToMenu('Twórcy')
        e75.sprawdzWidok()
        e75.sprawdzWidok6()
        e7501.sprawdzWidok()

        cy.log('Krok 3 - Jestem na ekranie Administracja -> Kontrahenci i sprawdzam poprawność pól')
        cy.goToMenu('Kontrahenci')
        e76.sprawdzWidok()
        e76.sprawdzWidok6()
        e7601.sprawdzWidok()

        cy.log('Krok 4 - Jestem na ekranie Administracja -> Rodzaj statusu i sprawdzam poprawność pól')
        cy.goToMenu('Rodzaj statusu')
        e72.sprawdzWidok()
        e72.sprawdzPopup()

        cy.log('Krok 5 - Jestem na ekranie Administracja -> Słowniki i sprawdzam poprawność pól')
        cy.goToMenu('Słowniki')
        e73.sprawdzWidok()
        e73.sprawdzPopup()

        cy.log('Krok 6 - Jestem na ekranie Administracja -> VAT w kosztach % i sprawdzam poprawność pól')
        cy.goToMenu('VAT w kosztach %')
        e77.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})