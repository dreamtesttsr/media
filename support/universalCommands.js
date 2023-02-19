import { fWspolne } from '../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../POM/Planowanie/E20 Porozumienia'

/** 
 * Sprawdzenie czy pole o lokalizatorze CSSselector jest aktywnym polem tekstowym z widoczną etykietą
*/
Cypress.Commands.add('checkingIfTheLocatorIsATextField', (locatorToElement, title) => {
    Cypress.log({
        name: 'checkingIfTheLocatorIsATextField',
        message: `sprawdź czy ${locatorToElement} jest polem tekstowym o tytule ${title}`
    })

    cy.get(locatorToElement)
        .should('have.attr', 'placeholder', title)
        .and('not.have.attr', 'readonly')
})

/** 
 * Sprawdzenie czy pole o lokalizatorze CSSselector jest aktywnym przyciskiem pokazującym kalendarz
*/
Cypress.Commands.add('checkingIfTheLocatorIsACalendar', (locatorToElement) => {
    Cypress.log({
        name: 'checkingIfTheLocatorIsACalendar',
        message: `sprawdzamy czy ${locatorToElement} jest kalendarzem`
    })

    cy.get(locatorToElement)
        .should('have.attr', 'data-custom-format', 'dd.MM.yyyy')
        .and('not.have.attr', 'readonly')
})

/** 
 * Sprawdzenie czy pole o lokalizatorze CSSselector jest aktywnym panelem z lista rozwijaną i z widoczną etykietą
*/
Cypress.Commands.add('checkingIfTheLocatorIsAContainer', (locatorToElement, title) => {
    Cypress.log({
        name: 'checkingIfTheLocatorIsAContainer',
        message: `sprawdź czy ${locatorToElement} jest rozwijaną lista wyboru o etykiecie ${title}`
    })

    cy.get(locatorToElement)
        .should('have.text', title)
        .and('not.have.attr', 'readonly')
})

/** 
 * Wygenerowanie randomowego stringa o długości n znaków (nie działa jako cc)
*/
Cypress.Commands.add('generateRandomString', (n) => {
    Cypress.log({
        name: 'generateRandomString',
        message: `Generowanie random string o długości ${n} znaków`
    })
    let text
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
})

/** 
 * Filtrowanie porozumien wg statusu
*/
Cypress.Commands.add('filterAgreementByFilter', (elem) => {
    Cypress.log({
        name: 'filterAgreementByFilter',
        message: `Filtrowanie porozumien wg statusu ${elem} `

    })

    e20.zaawansowanePrzycisk().click()
    cy.get('#select2-AgrementStateId-container').click()
    cy.log(elem)
    if (elem === 'Otwarte') {
        cy.get('#select2-AgrementStateId-results > :nth-child(1)').should('contain', 'Otwarte').click()
    }
    else if (elem === 'Robocze') {
        cy.get('#select2-AgrementStateId-results > :nth-child(2)').should('contain', 'Robocze').click()
    }
    else if (elem === 'W opracowaniu') {
        cy.get('#select2-AgrementStateId-results > :nth-child(3)').should('contain', 'W opracowaniu').click()
    }
    else if (elem === 'Zarejestrowane') {
        cy.get('#select2-AgrementStateId-results > :nth-child(4)').should('contain', 'Zarejestrowane').click()
    }
    else if (elem === 'Aneks') {
        cy.get('#select2-AgrementStateId-results > :nth-child(5)').should('contain', 'Aneks').click()
    }
    else if (elem === 'Rozliczone') {
        cy.get('#select2-AgrementStateId-results > :nth-child(6)').should('contain', 'Rozliczone').click()
    }
    else {
        cy.log('niepoprawna wartosc filtra',{ force: false })
        cy.get('niepoprawna wartosc')
    }
    e20.zaawansowanePrzycisk().click()
    e20.wyszukajPrzycisk().click()
    fWspolne.sprawdzProgressBar()
})


