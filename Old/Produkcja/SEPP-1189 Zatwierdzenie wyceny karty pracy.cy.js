const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50902 } = require('../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy')

describe('SEPP-1189 Zatwierdzenie wyceny karty pracy', () => {  // zamiast '() =>' można dawać 'function ()'

    it('Zatwierdzenie wyceny karty pracy', () => {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginOperatorKartPracy()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // Użytkownik tworzy nową kartę
        cy.log('Krok 1 - Użytkownik tworzy nową kartę pracy.')
        cy.get('.dt-buttons > .btn-success').click()
        cy.get('#FilterWorkCardTypeId').select('Skrócona', {force: true})
        cy.get('#FilterDepartmentId').select('Wydział postprodukcji (montaż)', {force: true})
        cy.get('#div_FilterDateFrom').type('2.07.2021')
        cy.get('#FilterAuditionName').type(daneTestowe.nazwaAudycjiWojna)
        cy.get('#div_FilterDateTo', { timeout: 10000 }).clear().type('2.07.2021')
        e50902.wyszukajPrzycisk().click()
        e50902.generujKartyPracyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50902.zamknijPopupPrzycisk().click()
        // Użytownik wyszukuje utworzoną kartę na liście.
        cy.log('Krok 2 - Użytkownik wyszukuje wybraną kartę na liście.')
        e509.statusKartyLista().select('W trakcie wyceny', {force: true})
        e509.zaawansowanePrzycisk().click()
        e509.statusZleceniaPracyLista().select('W trakcie wyceny', {force: true})
        e509.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')
        cy.get('#WorkCardId').as('idKarty')
        // Wybrana karta wyświetla się na liście z przyciskami P, E, K i U. Karta jest w statusie 'W trakcie wyceny'.
        e509.przegladajWycenePierwszyPrzycisk().should('have.attr', 'title', 'Przeglądaj wycenę')
        e509.edytujWycenePierwszyPrzycisk().should('have.attr', 'title', 'Edytuj wycenę').as('edytujKartePracy')
        e509.anulujKartePracyPierwszyPrzycisk().should('have.attr', 'title', 'Anuluj kartę pracy') // wymagane dodanie roli 35 dla Operatora karty pracy
        e509.zatwierdzKartePracyPierwszyPrzycisk().should('have.attr', 'title', 'Zatwierdź kartę pracy').parent().then(tr => {
            cy.get(':nth-child(2)').first()
            // let idWorkCard = ''
            cy.get(tr).parent().within(() => {
                cy.get(':nth-child(2)').first().invoke('text').then((c) => {
                    // cy.get('@czyscFiltry').click()
                    cy.log(c)
                    cy.get('@idKarty').type(c)
                })
            })
        })

        e509.statusKartyLista().select([], {force: true})
        e509.zaawansowanePrzycisk().click()
        e509.statusZleceniaPracyLista().select([], {force: true})
        e509.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')

        // Uzytkownik klika w przycisk 'K' przy wybranej karcie.
        cy.log('Krok 3 - Uzytkownik klika w przycisk "K" przy wybranej karcie.')
        e509.zatwierdzKartePracyPierwszyPrzycisk().click()
        // Karta zmieniła status na 'Wycena wprowadzona'. Przycisk 'K' zniknął.
        fWspolne.komunikat().should('contain','Karta pracy została zatwierdzona.')
        fWspolne.sprawdzProgressBar()
        cy.get('#workCardList_table > tbody > tr > td:nth-child(11)').first().should('contain','Wycena wprowadzona')
        cy.get('a[data-cy="Zatwierdz_karte_pracy"]').should('not.exist')
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
    
    it('Anulowanie zatwierdzonej karty pracy', function () {
        // Następuje przelogowanie na użytkownika Operator kart pracy - anulowanie
        cy.log('Krok 4 - Przelogowanie na użytkownika z uprawnieniem do anulowania kart z wprowadzoną wyceną')
        cy.visit('/')
            .loginOperatorKartPracyAnulowanie()

        cy.goToMenu('Karty pracy')
        e509.tytulAudycjiPoleTekstowe().type(daneTestowe.nazwaAudycjiWojna)
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Użytkownik usuwa utworzoną wcześniej kartę w celu reużywalności testu
        cy.log('Krok 5 - Uzytkownik usuwa kartę pracy')
        e509.anulujKartePracyPierwszyPrzycisk().click()
        cy.get('a#confirmBtn').click()
        cy.get('textarea#modalComment').type('Usuń kartę')
        cy.get('button#rejectModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        fWspolne.sprawdzProgressBar()
        /*
        cy.get('@edytujKartePracy').click()
        const faker = require('faker')
        cy.get('#PersonList_0__Cost').clear().type(faker.finance.amount(1, 150, 2))
        cy.get('#save').click()
        cy.get('#progressBar', { timeout: 10000 }).should('be.visible')
        cy.get('#progressBar', { timeout: 10000 }).should('not.be.visible')
        */
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})