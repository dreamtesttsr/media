import { e10 } from '../POM/Logowanie/E10 Logowanie'

/** 
 * Funkcja pozwalająca na zalogowanie się do portalu na dane logowania podane jako argumenty
*/
Cypress.Commands.add('login', (username, password) => {
    Cypress.log({
        name: 'login',
        message: `${username} | ${password}`,
    })
    cy.url().then(url => {
        if (url == 'https://sppt-dev.tvp.pl:8040/login?ReturnUrl=%2F') {
            cy.get('#select2-FakeUsername-container').click()
            cy.get(`li.select2-results__option:contains(${username})`).then(select => {
                cy.wrap(select).first().click()
            })
            e10.zalogujPrzycisk().first().click()
        }          
        else {
            if (username) {
                e10.loginPoleTekstowe()
                    .type(username)
            }
            if (password) {
                e10.hasloPoleTekstowe()
                    .type(password)
            }
            e10.zalogujPrzycisk().last().click()
        }
    })
    cy.get('li').should('not.contain', 'Niepoprawne login i/lub hasło  dla').and('not.contain', 'Niepoprawne hasło')
    cy.contains('SPPT').should('be.visible')
})

/** 
 * Funkcja weryfikująca poprawne zalogowanie się na dany login
 * Dodatkowa funkcja zamukająca okienko z powiadomieniami
*/
Cypress.Commands.add('loginAssert', (username) => {
    Cypress.log({
        name: 'loginAssert',
        message: `${username}`
    })
    // przeczekaj progress bar
    cy.get('#progressBar').then($progressBar => {
        if($progressBar.is(':visible')) {
            cy.get('#progressBar').should('not.be.visible')
        }
    })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500)
    // zamknij okienko changelog i notyfikacji
    cy.get('body').then(body => {
        if(body.find('#system-message-modal-noBtn').length)
            cy.get('#system-message-modal-noBtn').click()
        if(body.find('#notificationModal-close').length)
            cy.get('#notificationModal-close').click()
    })
    cy.get('.small > a')
        .should('have.attr', 'href', '/logout')
    cy.get('.nav.cursor-pointer')
        .should('contain', username)
    cy.get('.navbar-brand')
        .should('contain', 'SPPT')
})

/** 
 * Funkcja wylogowująca użytkownika z portalu
*/
Cypress.Commands.add('logoutUser', () => {
    Cypress.log({
        name: 'logoutUser',
        message: 'Wylogowanie'
    })
    cy.get('.nav.small')
        .click()
    cy.url()
        .should('contain', '/login')
})

/** 
 * Funkcja logująca użytkownika jako administratora
*/
Cypress.Commands.add('loginAdmin', () => {
    Cypress.log({
        name: 'loginAdmin',
        message: 'zalogowanie jako administrator - rola 1'
    })
    cy.visit('/')
        .login('test_user_1', 'TVPPassw0rd')
        .loginAssert('test_user_1')
})

/** 
 * Funkcja logująca użytkownika jako producenta
*/
Cypress.Commands.add('loginProducent', () => {
    Cypress.log({
        name: 'loginProducent',
        message: 'zalogowanie jako producent - rola 2'
    })
    cy.visit('/')
        .login('test_user_2', 'TVPPassw0rd')
        .loginAssert('test_user_2')
})

/** 
 * Funkcja logująca użytkownika jako producenta CUP
*/
Cypress.Commands.add('loginProducentCUP', () => {
    Cypress.log({
        name: 'loginProducentCUP',
        message: 'zalogowanie jako producent CUP - rola 2'
    })
    cy.visit('/')
        .login('test_user_33', 'TVPPassw0rd')
        .loginAssert('test_user_33')
})

/** 
 * Funkcja logująca użytkownika jako dyrektora agencji AKFiS
*/
Cypress.Commands.add('loginDyrektorAgencjiAKFiS', () => {
    Cypress.log({
        name: 'loginDyrektorAgencjiAKFiS',
        message: 'zalogowanie jako dyrektor agencji AKFiS - rola 3'
    })
    cy.visit('/')
        .login('test_user_3', 'TVPPassw0rd')
        .loginAssert('test_user_3')
})

/** 
 * Funkcja logująca użytkownika jako dyrektora agencji CUP
*/
Cypress.Commands.add('loginDyrektorAgencjiCUP', () => {
    Cypress.log({
        name: 'loginDyrektorAgencjiCUP',
        message: 'zalogowanie jako dyrektor agencji CUP - rola 3'
    })
    cy.visit('/')
        .login('test_user_25', 'TVPPassw0rd')
        .loginAssert('test_user_25')
})

/** 
 * Funkja logująca użytkownika jako dyrektora
*/
Cypress.Commands.add('loginDyrektor', () => {
    Cypress.log({
        name: 'loginDyrektor',
        message: 'zalogowanie jako dyrektor - rola 4'
    })
    cy.visit('/')
        .login('test_user_4', 'TVPPassw0rd')
        .loginAssert('test_user_4')
})

/** 
 * Funkcja logująca użytkownika jako pracownik agencji
*/
Cypress.Commands.add('loginPracownikAgencji', () => {
    Cypress.log({
        name: 'loginPracownikAgencji',
        message: 'zalogowanie jako pracownik agencji - rola 5'
    })
    cy.visit('/')
        .login('test_user_5', 'TVPPassw0rd')
        .loginAssert('test_user_5')
})

/** 
 * Funkcja logująca użytkownika jako pracownik agencji CUP
*/
Cypress.Commands.add('loginPracownikAgencjiCUP', () => {
    Cypress.log({
        name: 'loginPracownikAgencjiCUP',
        message: 'zalogowanie jako pracownik agencji CUP - rola 5'
    })
    cy.visit('/')
        .login('test_user_20', 'TVPPassw0rd')
        .loginAssert('test_user_20')
})

/**
 * Funkcja logująca użytkownika jako Administratora biznesowego
*/
Cypress.Commands.add('loginAdministratorBiznesowy', () => {
    Cypress.log({
        name: 'loginAdministratorBiznesowy',
        message: 'zalogowanie jako Administrator biznesowy  - rola 6'
    })
    cy.visit('/')
        .login('test_user_6', 'TVPPassw0rd')
        .loginAssert('test_user_6')
})

/**
 * Funkcja logująca użytkownika jako Pracownik Kontrollingu
*/
Cypress.Commands.add('loginKontrolling', () => {
    Cypress.log({
        name: 'loginKontrolling',
        message: 'zalogowanie jako pracownik Kontrollingu  - rola 7'
    })
    cy.visit('/')
        .login('test_user_7', 'TVPPassw0rd')
        .loginAssert('test_user_7')
})

/** 
 * Funkcja logująca użytkownika jako pracownik jednostki współpracującej
*/
Cypress.Commands.add('loginPracownikJednostkiWspolpracujacej', () => {
    Cypress.log({
        name: 'loginPracownikJednostkiWspolpracujacej',
        message: 'zalogowanie jako Pracownik jednostki wspolpracujacej - rola 10'
    })
    cy.visit('/')
        .login('test_user_10', 'TVPPassw0rd')
        .loginAssert('test_user_10')
})

/**
 * Funkcja logująca użytkownika jako Kierownik Produkcji 
*/
Cypress.Commands.add('loginKierownikProdukcji', () => {
    Cypress.log({
        name: 'loginKierownikProdukcji',
        message: 'zalogowanie jako Kierownik Produkcji  - rola 11'
    })
    cy.visit('/')
        .login('test_user_11', 'TVPPassw0rd')
        .loginAssert('test_user_11')
})

/** 
 * Funkcja logująca użytkownika jako pracownik dyspozytury
*/
Cypress.Commands.add('loginPracownikDyspozytury', () => {
    Cypress.log({
        name: 'loginPracownikDyspozytury',
        message: 'zalogowanie jako pracownik dyspozytury - rola 12'
    })
    cy.visit('/')
        .login('test_user_12', 'TVPPassw0rd')
        .loginAssert('test_user_12')
})

/** 
 * Funkcja logująca użytkownika jako kierownik dyspozytury
*/
Cypress.Commands.add('loginKierownikDyspozytury', () => {
    Cypress.log({
        name: 'loginKierownikDyspozytury',
        message: 'zalogowanie jako kierownik dyspozytury - rola 13'
    })
    cy.visit('/')
        .login('test_user_13', 'TVPPassw0rd')
        .loginAssert('test_user_13')
})

/** 
 * Funkcja logująca użytkownika jako administrator biznesowy CUP (sprzęt)
*/
Cypress.Commands.add('loginAdministratorBiznesowyCUPSprzet', () => {
    Cypress.log({
        name: 'loginAdministratorBiznesowyCUPSprzet',
        message: 'zalogowanie jako administrator binesowy CUP (sprzęt) - rola 14'
    })
    cy.visit('/')
        .login('test_user_14', 'TVPPassw0rd')
        .loginAssert('test_user_14')
})

/**
 * Funkcja logująca użytkownika jako pracownik produkcji
*/
Cypress.Commands.add('loginPracownikProdukcji', () => {
    Cypress.log({
        name: 'loginPracownikProdukcji',
        message: 'zalogowanie jako pracownik produkcji - rola 15'
    })
    cy.visit('/')
        .login('test_user_15', 'TVPPassw0rd')
        .loginAssert('test_user_15')
})

/**
 * Funkcja logująca użytkownika jako pracownik produkcji
*/
Cypress.Commands.add('loginPracownikProdukcjiWspolpracownik', () => {
    Cypress.log({
        name: 'loginPracownikProdukcjiWspolpracownik',
        message: 'zalogowanie jako pracownik produkcji (współpracownik)- rola 15'
    })
    cy.visit('/')
        .login('test_user_27', 'TVPPassw0rd')
        .loginAssert('test_user_27')
})

/**
 * Funkcja logująca użytkownika jako Inżynier Produkcji 
*/
Cypress.Commands.add('loginInzynierProdukcji', () => {
    Cypress.log({
        name: 'loginInzynierProdukcji',
        message: 'zalogowanie jako Inżynier Produkcji  - rola 16'
    })
    cy.visit('/')
        .login('test_user_16', 'TVPPassw0rd')
        .loginAssert('test_user_16')
})

/** 
 * Funkcja logująca użytkownika jako kierownik dyspozytury
*/
Cypress.Commands.add('loginKierownikZakladuCUP', () => {
    Cypress.log({
        name: 'loginKierownikZakladuCUP',
        message: 'zalogowanie jako Kierownik Zakładu CUP  - rola 17'
    })
    cy.visit('/')
        .login('test_user_17', 'TVPPassw0rd')
        .loginAssert('test_user_17')
})

/** 
 * Funkcja logująca użytkownika jako operator karty pracy (anulowanie kart)
*/
Cypress.Commands.add('loginOperatorKartPracyAnulowanie', () => {
    Cypress.log({
        name: 'loginOperatorKartPracyAnulowanie',
        message: 'zalogowanie jako operator kart pracy (anulowanie kart) - rola 35'
    })
    cy.visit('/')
        .login('test_user_35', 'TVPPassw0rd')
        .loginAssert('test_user_35')
})

/** 
 * Funkcja logująca użytkownika jako operator karty pracy (nadzór)
*/
Cypress.Commands.add('loginOperatorKartPracyNadzor', () => {
    Cypress.log({
        name: 'loginOperatorKartPracyNadzor',
        message: 'zalogowanie jako operator kart pracy (nadzór) - rola 37'
    })
    cy.visit('/')
        .login('test_user_37', 'TVPPassw0rd')
        .loginAssert('test_user_37')
})

/**
 * Funkcja logująca użytkownika jako operator karty pracy
*/
Cypress.Commands.add('loginOperatorKartPracy', () => {
    Cypress.log({
        name: 'loginOperatorKartPracy',
        message: 'zalogowanie jako operator kart pracy - rola 22'
    })
    cy.visit('/')
        .login('test_user_22', 'TVPPassw0rd')
        .loginAssert('test_user_22')
})

/** 
 * Funkcja logująca użytkownika jako pracownik działu zakupu usług CUP
*/
Cypress.Commands.add('loginPracownikDzialuZakupuUslugCUP', () => {
    Cypress.log({
        name: 'loginPracownikDzialuZakupuUslugCUP',
        message: 'zalogowanie jako pracownik działu zakupu usług CUP - rola 24'
    })
    cy.visit('/')
        .login('test_user_24', 'TVPPassw0rd')
        .loginAssert('test_user_24')
})

/** 
 * Funkcja logująca użytkownika jako kierownik dyspozytury
*/
Cypress.Commands.add('loginKierownikDzialuOrganizacjiUslug', () => {
    Cypress.log({
        name: 'loginKierownikDzialuOrganizacjiUslug',
        message: 'zalogowanie jako kierownik działu organizacji usług - rola 26'
    })
    cy.visit('/')
        .login('test_user_26', 'TVPPassw0rd')
        .loginAssert('test_user_26')
})

/** 
 * Funkcja logująca użytkownika jako administrator biznesowy CUP (pracownicy produkcji)
*/
Cypress.Commands.add('loginAdministratorBiznesowyCUPPracownicy', () => {
    Cypress.log({
        name: 'loginAdministratorBiznesowyCUPPracownicy',
        message: 'zalogowanie jako administrator biznesowy CUP (pracownicy produkcji) - rola 28'
    })
    cy.visit('/')
        .login('test_user_28', 'TVPPassw0rd')
        .loginAssert('test_user_28')
})

/** 
 * Funkcja logująca użytkownika jako administrator biznesowy CUP (cennik)
*/
Cypress.Commands.add('loginAdministratorBiznesowyCUPCennik', () => {
    Cypress.log({
        name: 'loginAdministratorBiznesowyCUPCennik',
        message: 'zalogowanie jako administrator biznesowy CUP (cennik) - rola 29'
    })
    cy.visit('/')
        .login('test_user_29', 'TVPPassw0rd')
        .loginAssert('test_user_29')
})

/** 
 * Funkcja logująca użytkownika jako Akceptant kompletnosci KU
*/
Cypress.Commands.add('loginAkceptantKompletnosciKU', () => {
    Cypress.log({
        name: 'loginAkceptantKompletnosciKU',
        message: 'zalogowanie jako Akceptant kompletnosci KU - rola 41'
    })
    cy.visit('/')
        .login('test_user_41', 'TVPPassw0rd')
        .loginAssert('test_user_41')
})

/** 
 * Funkcja logująca użytkownika jako Akceptant KU komórki wyspecjalizowanej
*/
Cypress.Commands.add('loginAkceptantKUKomorkiWyspecjalizowanej', () => {
    Cypress.log({
        name: 'loginAkceptantKUKomorkiWyspecjalizowanej',
        message: 'zalogowanie jako Akceptant KU komórki wyspecjalizowanej - rola 40'
    })
    cy.visit('/')
        .login('test_user_40', 'TVPPassw0rd')
        .loginAssert('test_user_40')
})

/* Funkcja logująca użytkownika jako pracownik dyspozytury
*/
Cypress.Commands.add('loginKoordynatorUslug', () => {
    Cypress.log({
        name: 'loginKoordynatorUslug',
        message: 'zalogowanie jako Koordynator Usług - rola 18'
    })
    cy.visit('/')
        .login('test_user_18', 'TVPPassw0rd')
        .loginAssert('test_user_18')
})

/* Funkcja logująca użytkownika jako pracownik dyspozytury
*/
Cypress.Commands.add('loginKoordynatorUslugZamZew', () => {
    Cypress.log({
        name: 'loginKoordynatorUslugZamZew',
        message: 'zalogowanie jako Koordynator Usług (zamówienia zewnętrzne) - rola 38'
    })
    cy.visit('/')
        .login('test_user_38', 'TVPPassw0rd')
        .loginAssert('test_user_38')
})

/* Funkcja logująca użytkownika jako HelpDesk
*/
Cypress.Commands.add('loginHelpDesk', () => {
    Cypress.log({
        name: 'loginHelpDesk',
        message: 'zalogowanie jako HelpDesk - rola 8'
    })
    cy.visit('/')
        .login('test_user_8', 'TVPPassw0rd')
        .loginAssert('test_user_8')
})

/* Funkcja logująca użytkownika jako Kierownik HelpDesk
*/
Cypress.Commands.add('loginHelpDeskKierownik', () => {
    Cypress.log({
        name: 'loginHelpDesk',
        message: 'zalogowanie jako Kierownik HelpDesk - rola 9'
    })
    cy.visit('/')
        .login('test_user_9', 'TVPPassw0rd')
        .loginAssert('test_user_9')
})