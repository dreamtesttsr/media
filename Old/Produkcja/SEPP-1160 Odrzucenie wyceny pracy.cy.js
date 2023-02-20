const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e504 } = require('../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy')
const { faker } = require('../../../../support/e2e')

describe('SEPP-1160 Odrzucenie wyceny pracy', function () {
    it('Odrzucenie wyceny pracy', function () {
    // strona glowna i logowanie
        cy.visit('/').loginKierownikProdukcji()

        // otworzenie widoku zleceń pracy pracowników
        cy.goToMenu('Zlecenia pracy')
        fWspolne.sprawdzProgressBar()
        // Istnieją w systemie zlecenia pracy, które są w stanie 'Wycena wprowadzona' i znajdują się na karcie pracy w stanie 'Wycena wprowadzona'. Ekran Zleceń pracy [E504].
        e504.stanZleceniaLista().select('Wycena wprowadzona', {force: true})
        cy.get('#IsRequiredApproval').click()
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Konieczność użycia scrolla aby zobaczyć dany lokator na ekranie')
        cy.get('.dataTables_scrollBody').scrollTo(500, 0)
        cy.contains('td', 'Wycena wprowadzona').should('be.visible')

        // Użyj buttonu "H" dla zlecenia pracy w stanie "Wycena wprowadzona".
        cy.log(
            'Krok 1 -  Użyj buttonu "H" dla zlecenia pracy w stanie "Wycena wprowadzona"'
        )
        e504.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk()
            .click()
        // Otwiera się popup "Zlecenie pracy".
        cy.get('#DetailsModal-modalDialog > .modal-header')
            .should('be.visible')
            .and('contain', 'Zlecenie pracy')
        // /Wszystkie pola z wyjątkiem "Uwagi do wyceny" są zablokowane. Dostępne buttony "Potwierdź wycenę" i "Odrzuć wycenę".
        cy.get('#OrderFor').should('be.visible').and('have.attr', 'readonly')
        cy.get('#Position').should('be.visible').and('have.attr', 'readonly')
        cy.get('#RealisationPlaceFormatted')
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#AuditionTv').should('be.visible').and('have.attr', 'readonly')
        cy.get('#ProductionManager')
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#CommentsToReservation')
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#RealisationFrom').should('be.visible').and('have.attr', 'readonly')
        cy.get('#RealisationTo').should('be.visible').and('have.attr', 'readonly')
        cy.get('#OvertimeFrom').should('be.visible').and('have.attr', 'readonly')
        cy.get('#CommentsForWorker')
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#OrderStateName').should('be.visible').and('have.attr', 'readonly')
        cy.get('#AcceptTime').should('be.visible').and('have.attr', 'readonly')
        cy.get('#ReadFrom').should('be.visible').and('have.attr', 'readonly')
        cy.get('#OrderCreator').should('be.visible').and('have.attr', 'readonly')
        cy.get('#OrderCreateDate').should('be.visible').and('have.attr', 'readonly')
        cy.get('#WorkersComment').should('be.visible').and('have.attr', 'readonly')
        cy.get('#WagesWithCurrency')
            .scrollIntoView()
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#CommentsToEvaluation')
            .should('be.visible')
            .and('not.have.attr', 'readonly')
        cy.get('#EvaluationAcceptedBy')
            .should('be.visible')
            .and('have.attr', 'readonly')
        cy.get('#EvaluationDate').should('be.visible').and('have.attr', 'readonly')
        cy.get('#acceptEvalBtn')
            .should('be.visible')
            .and('contain', 'Potwierdź wycenę')
        cy.get('#rejectEvalBtn')
            .should('be.visible')
            .and('contain', 'Odrzuć wycenę')
            .as('odrzucWycene')

        // Wybierz button "Odrzuć wycenę"
        cy.log('Krok 2 -  Wybierz button "Odrzuć wycenę"')
        cy.get('#CommentsToEvaluation').clear()
        cy.get('@odrzucWycene').click()
        // Pojawia się wiadomość "Problem! Wymagane jest wypełnienie pola 'Uwagi do wyceny'". Pole "Uwagi do wyceny" jest oznaczone kolorem czerwonym.
        cy.get('#CommentsToEvaluation').type('Odrzucam wycenę')
        cy.get('@odrzucWycene').click()
        fWspolne.sprawdzProgressBar()
        // Popup zostaje zamknięty. Status zlecenia pracy zmienia się na "Wycena zatwierdzona". Zweryfikuj wysłane dane i odpowiedź serwera.
        cy.get('#DetailsModal-modalDialog > .modal-header')
            .should('not.exist')
        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
        // Powrót na ekran listy kart pracy
        cy.visit('/').loginOperatorKartPracyNadzor()
        cy.goToMenu('Karty pracy')
        // Wejście w wycenę zatwierdzonej karty pracy i zmiana wyceny zlecenia
        cy.get('#SapNumber').type('105121001221')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.edytujWycenePierwszyPrzycisk().click()
        cy.get('#PersonList_0__Cost').clear().type(faker.finance.amount(1, 150, 2))
        cy.get('#save').click()
        fWspolne.sprawdzProgressBar()
        cy.get('.btn.btn-xs.btn-purple').first().click()
        fWspolne.sprawdzProgressBar()
        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()



    })
})
