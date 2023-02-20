const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e504 } = require('../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy')

describe('SEPP-1148 Anulacja zlecenia pracy', function () {
    it('Anulacja zlecenia pracy', function () {
    // strona glowna i logowanie
        cy.visit('/').loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Zlecenia pracy')

        // 1. Na liście zleceń pracy wybrane jest zlecenie w statusie "Oczekujące na akceptację" i należy użyć przycisku "N" przy tym zleceniu.
        cy.log('Krok 1 - Na liście zleceń pracy wybrane jest zlecenie w statusie "Oczekujące na akceptację" i należy użyć przycisku "N" przy tym zleceniu.')
        e504.stanZleceniaLista().select('Oczekujące na akceptację', {force:true})
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[data-title="Nr zlecenia"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[data-title="Nr zlecenia"]').first().click()
        fWspolne.sprawdzProgressBar()

        // Widoczna jest lista zleceń użytkownika. Zlecenia w statusie "Oczekujące na akceptację" mają dostępne operacje "P", "Z", "N" i "A".
        cy.get('#orderList_table > tbody > tr', { timeout: 5000 }).each(() => {
            cy.get('.text-center > .btn-info')
                .should('be.visible')
                .and('have.attr', 'title', 'Przegląd rezerwacji')
            cy.get('.text-center > .btn-purple')
                .should('be.visible')
                .and('have.attr', 'title', 'Przegląd zlecenia pracy')
            cy.get('.text-center > .btn-warning')
                .should('be.visible')
                .and('have.attr', 'title', 'Anulacja zlecenia pracy')
            cy.get('.text-center > .btn-yellow')
                .should('be.visible')
                .and('have.attr', 'title', 'Akceptacja zlecenia pracy')
        })

        // wybranie ostatniego zlecenia z listy
        let orderNr
        cy.get('#orderList_table > tbody > tr > :nth-child(2)')
            .last()
            .invoke('text')
            .then((c) => {
                orderNr = c
                cy.log(orderNr)
            })

        // wyfiltrowanie tego zlecenia
        e504.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#WordkOrderId')
            .should('be.visible')
            .then((a) => {
                cy.get(a).type(orderNr)
                e504.wyszukajPrzycisk().click()
                fWspolne.sprawdzProgressBar()
            })

        // W momencie wybrania operacji "N", otwiera się popup "Anulacja zlecenia pracy" z edytowalnym polem tekstowym "Komentarz" oraz przyciskami "Anuluj zlecenie pracy" oraz "Powrót"
        cy.get('.text-center > .btn-warning').last().click()
        cy.get('#rejectWorkOrderModal-modalDialog > .modal-header > .modal-title')
            .should('be.visible')
            .and('have.text', 'Anulacja zlecenia pracy')
        cy.get('#CommentReject')
            .should('be.visible')
            .and('not.have.attr', 'readonly')
        cy.get('#rejectWorkOrderModal-yesBtn')
            .should('be.visible')
            .and('have.text', 'Anuluj zlecenie pracy')
        cy.get('#rejectWorkOrderModal-noBtn')
            .should('be.visible')
            .and('have.text', 'Powrót')

        // Kliknij "Anuluj zlecenie pracy"
        cy.log('Krok 2 - Kliknij "Anuluj zlecenie pracy"')
        cy.get('#rejectWorkOrderModal-yesBtn').click()

        // Z prawej górnej strony ekranu pojawia się informacja o wymaganiu uzupełnienia pola komentarz. Pole Komentarz zostaje oznaczone na czerwono.
        fWspolne.komunikat()
            .should('be.visible')
            .and('contain', 'Problem! Wymagane jest wypełnienie pola \'Komentarz\'.')
        cy.get('#CommentReject').should(
            'have.attr',
            'class',
            'form-control input-validation-error textbox-danger red-tooltip'
        )

        // Wpisz komentarz "Anuluj zlecenie" i kliknij "Anuluj zlecenie pracy".
        cy.log('Krok 3 - Wpisz komentarz "Anuluj zlecenie" i kliknij przycisk "Anuluj zlecenie pracy". ')
        cy.get('#CommentReject').type('Anuluj zlecenie')
        cy.get('#rejectWorkOrderModal-yesBtn').click()

        // Popup zostaje zamknięty, status zlecenia zmienia się na "Anulowane", dla danego zlecenia znika operacja "A" i "N". Zweryfikuj wysłane dane i odpowiedź serwera.
        cy.get('#rejectWorkOrderModal-modalDialog > .modal-header > .modal-title')
            .should('not.exist')
        cy.get('.odd > :nth-child(10)').should('have.text','Anulowane')
        cy.get('.DTFC_RightBodyLiner > .table > tbody > .odd > .text-center > .btn-warning')
            .should('not.exist')
        cy.get('.DTFC_RightBodyLiner > .table > tbody > .odd > .text-center > .btn-yellow')
            .should('not.exist')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
