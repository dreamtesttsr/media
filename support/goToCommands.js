import { ekrany } from '../POM/Ekran Powitalny/Ekrany menu'
import { fWspolne } from '../POM/Funkcje wspolne/Funkcje wspolne'

/**
 * Przejście do podanego przez użytkownika ekranu z menu głównego
*/
Cypress.Commands.add('goToMenu', (menuOpcja) => {
    Cypress.log({
        name: 'goToMenu',
        message: 'Przejście do podstrony menu'
    })
    let menuSciezka = ekrany[menuOpcja]
    let mSciezka = menuSciezka.sciezka, link = menuSciezka.link, tytul = menuSciezka.tytul // , naglowek = menuSciezka.naglowek
    let sciezka = mSciezka.split('>')
    cy.log('menuSciezka - ' + menuSciezka.sciezka + ' ,długość ścieżki opcji menu - ' + sciezka.length)
    if(sciezka.length > 0){
        let mainOption = cy.get('.navbar-nav > li > a:contains("'+sciezka[0]+'")').should('be.visible').first()
        mainOption.click({force: true})
        if(sciezka.length == 2){
            mainOption.parent('li').children('ul').find('a:contains("'+sciezka[1]+'")').should('be.visible').first().click({force: true})
            fWspolne.sprawdzProgressBar()
        }
        if(sciezka.length > 2){
            mainOption.parent('li').children('ul').find('a:contains("'+sciezka[1]+'")').should('be.visible').first().trigger('mouseover', {force: true})
            mainOption.parent('li').children('ul').find('a:contains("'+sciezka[2]+'")').click({force:true})
            fWspolne.sprawdzProgressBar()
        }
        if(sciezka[0] != 'Pomoc'){
            cy.url().should('contain', link)
            if(tytul != '')
                cy.get('.active').should('contain', tytul)
        }
    }
})



/** 
 * Przejście do zakładki Planowanie / Kosztorysy oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToKosztorysy', () => {
    Cypress.log({
        name: 'goToKosztorysy',
        message: 'Kosztorysy'
    })
    cy.get('a.dropdown-toggle').contains('Planowanie')
        .click({force: true})
    cy.get('a[href="/CostPlanning/Index"]')
        .click({force: true})  
    cy.url()
        .should('contain', '/CostPlanning/Index')
    cy.get('.active')
        .should('contain', 'Kosztorysy')
})

/** 
 * Funkcja klikająca na przycisk Nowe porozumienie oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToDodajPorozumienie', () => {
    Cypress.log({
        name: 'goToDodajPorozumienie',
        message: 'Dodaj Porozumienie'
    })

    cy.get('.dt-buttons > .btn-success')
        .click()
    cy.url()
        .should('contain', '/Agreement/Edit')
    cy.get('.active')
        .should('contain', 'Porozumienie')
    cy.get('#btnSubmitAgreement')
        .should('contain', 'Zapisz')
    cy.get('#AgreementReturn')
        .should('contain', 'Powrót')
})


/** 
 * Przejście do zakładki Rozliczenia / Faktury oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToFaktury', () => {
    Cypress.log({
        name: 'goToFaktury',
        message: 'Faktury'
    })
    cy.get('a.dropdown-toggle').contains('Rozliczenia').click({force: true})
    cy.get('a[href="/Invoice/Index"]').click({force: true})  
    cy.get('.active')
        .should('contain', 'Faktury')
})

/** 
 * Przejście do zakładki Produkcja / Karty pracy oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToKartyPracy', () => {
    Cypress.log({
        name: 'goToKartyPracy',
        message: 'Karty Pracy'
    })
    cy.get(':nth-child(5) > .dropdown-toggle')
        .click()
    cy.get('a[href="/smf/WorkCard"]')
        .click()
    cy.url()
        .should('contain', '/smf/WorkCard')
    cy.get('.active')
        .should('contain', 'Karty pracy')
})



/** 
 * Przejście do zakładki Produkcja / Zamówienia zewnętrzne oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToZamowieniaZewnetrzne', () => {
    Cypress.log({
        name: 'goToZamowieniaZewnetrzne',
        message: 'Zamówienia zewnętrzne'
    })
    cy.get('a.dropdown-toggle').contains('Produkcja')
        .first().click()
    cy.get('div[class="navbar-collapse collapse"] > ul > li').find('a:contains("Zamówienia zewnętrzne")')
        .first().click()
    cy.get('body').then($body => {
        if($body.find('#system-message-modal-noBtn').length){
            cy.get('#system-message-modal-noBtn').click({force:true})
        }
    })
    cy.url()
        .should('contain', '/smf/ExternalOrder')
    cy.get('.active')
        .should('contain', 'Zamówienia zewnętrzne')
})


/** 
 * Przejście do zakładki Produkcja / Wnioski o przydzielenie zasobów jako Pracownik Dyspozytury oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToWnioskiOPrzydzielenieZasobowPracownikDyspozytury', () => {
    Cypress.log({
        name: 'goToWnioskiOPrzydzielenieZasobowPracownikDyspozytury',
        message: 'Wnioski o przydzielenie zasobów'
    })
    cy.get('body > header > nav > div > div > div > ul > li:nth-child(1) > a')
        .click()
    cy.get('body > header > nav > div > div > div > ul > li.open > ul > li:nth-child(1) > a')
        .click()
    cy.url()
        .should('contain', '/smf/Order')
    cy.get('.active')
        .should('contain', 'Wnioski o przydzielenie zasobów')
})

/** 
 * Przejście do zakładki Produkcja / Zlecenia Pracy jako Pracownik Dyspozytury oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToZleceniaPracyPracownikDyspozytury', () => {
    Cypress.log({
        name: 'goToZleceniaPracyPracownikDyspozytury',
        message: 'Zlecenia Pracy'
    })
    cy.get('.navbar-nav > :nth-child(1) > :nth-child(1)')
        .click()
    cy.get('.open > .dropdown-menu > :nth-child(4) > a')
        .click()
    cy.url()
        .should('contain', '/smf/WorkOrder')
    cy.get('.active')
        .should('contain', 'Zlecenia Pracy')
})

/** 
 * Przejście do zakładki Produkcja / Planowanie produkcji jako Pracownik Dyspozytury oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToPlanowanieProdukcjiPracownikDyspozytury', () => {
    Cypress.log({
        name: 'goToPlanowanieProdukcjiPracownikDyspozytury',
        message: 'Planowanie produkcji'
    })
    cy.get('.navbar-nav > :nth-child(1) > :nth-child(1)')
        .click()
    cy.get('.open > .dropdown-menu > :nth-child(3) > a')
        .click()
    cy.url()
        .should('contain', '/smf/ProductionPlanning')
    cy.get('.active')
        .should('contain', 'Planowanie Zasobów')
})



/**
 * Przejście do zakładki Produkcja / Słowniki / Grupy asortymentowe na planie oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToGrupyAsortymentowe', () => {
    Cypress.log({
        name: 'goToGrupyAsortymentowe',
        message: 'Osoby przebywające na planie'
    })
    cy.get('.navbar-nav > li > a:contains("Produkcja")')
        .click()
    cy.get('a:contains("Słowniki")').first()
        .trigger('mouseover')
    cy.get('a[href="/smf/AssortmentGroups"]')
        .click({force:true})
    cy.url()
        .should('contain', '/smf/AssortmentGroups')
    cy.get('.active')
        .should('contain', 'Grupy Asortymentowe')
})

/**
 * Przejście do zakładki Produkcja / Grafiki na planie oraz sprawdzenie podstawowej poprawności załadowanej strony
*/
Cypress.Commands.add('goToGrafikiAdmin', () => {
    Cypress.log({
        name: 'goToGrafikiAdmin',
        message: 'Grafiki pracoownikow'
    })
    cy.get('.navbar-nav > li > a:contains("Produkcja")')
        .click()
    cy.get('a:contains("Grafiki")').first()
        .click({force:true})
    cy.url()
        .should('contain', '/smf/Scheduler')
    cy.get('.active')
        .should('contain', 'Grafiki pracowników')
})

