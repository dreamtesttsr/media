import { e78 } from '../../../POM/Administracja/E78 Uzytkownicy'
import { e71 } from '../../../POM/Administracja/E71 Dziennik zdarzen'
import { e80 } from '../../../POM/Administracja/E80 Lista zablokowanych IP'
import { e711 } from '../../../POM/Administracja/E711 Sesje'
// brak ekranu sesji w CF

describe('SEPP-14432 Rola 8', () => {

    it('Rola 8 - HelpDesk', () => {
        cy.log('Krok 1 - Loguję się jako Helpdesk')
        cy.visit('')
            .loginHelpDesk()

        cy.log('Krok 2 - Sprawdzam ekran Użytkowników')
        cy.goToMenu('Użytkownicy')
        e78.sprawdzWidok()

        cy.log('Krok 3 - Sprawdzam ekran Dziennik zdarzeń')
        cy.goToMenu('Dziennik zdarzeń')
        e71.sprawdzWidok()

        cy.log('Krok 4 - Sprawdzam ekran Lista zablokowanych IP')
        cy.goToMenu('Zablokowane Ip')
        e80.sprawdzWidok()

        cy.log('Krok 5 - Sprawdzam ekran Sesje')
        cy.goToMenu('Sesje')
        e711.sprawdzWidok()
        
        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})
