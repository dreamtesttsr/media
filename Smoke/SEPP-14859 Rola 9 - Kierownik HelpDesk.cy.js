import { e78 } from '../../../POM/Administracja/E78 Uzytkownicy'
import { e71 } from '../../../POM/Administracja/E71 Dziennik zdarzen'
import { e80 } from '../../../POM/Administracja/E80 Lista zablokowanych IP'
import { e711 } from '../../../POM/Administracja/E711 Sesje'
// brak ekranu sesji w CF

describe('SEPP-14859 Rola 9', () => {

    it('Rola 9 - Kierownik HelpDesk', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Helpdesk')
        cy.visit('/')
            .loginHelpDeskKierownik()

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
