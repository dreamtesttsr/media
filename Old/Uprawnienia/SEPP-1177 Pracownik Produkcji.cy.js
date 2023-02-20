const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e504 } = require ('../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy')

describe('SEPP-1177 Pracownik produkcji - uprawnienia', function () {

    it('Pracownik produkcji - uprawnienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikProdukcjiWspolpracownik()

        // Użytkownik wchodzi na ekran Planowania Produkcji [E503]==============================================================================================================================================================
        cy.log('Krok 1 -  Użytkownik wchodzi na ekran Planowania Produkcji')
        cy.goToMenu('Planowanie produkcji')
        // Walidacja widoczności głównych elementów strony. 
        cy.get('#productionPlanningFilterForm > :nth-child(1) > :nth-child(1) > .btn').should('be.visible')
        // cy.get('.btn-txt').click() // niejednoznaczny Amber
        cy.get('.btn.btn-primary.lbl-select-picker.default-popover').click() 
        cy.get('.datepicker-days > .table-condensed > thead > tr > th.picker-switch', {timeout: 3000}).click()
        cy.get('.datepicker-months > .table-condensed > thead > tr > th.picker-switch').click()
        cy.get('span.year').contains('2021').click()
        cy.get('span.month').contains('maj').click()
        cy.get('td.day[data-day="27.05.2021"]').click()
        cy.get('.form-horizontal > :nth-child(2) > .btn').click()
        cy.get('.popover-content').should('not.exist')
        cy.get('#progressBar').should('not.be.visible')
        cy.get('[data-index="0"] > .example-event').should('be.visible')

        // Użytkownik wchodzi na ekran zleceń pracy [E504]==============================================================================================================================================================
        cy.log('Krok 2 -  Użytkownik wchodzi na ekran zleceń pracy [E504]')
        cy.goToMenu('Zlecenia pracy')
        // Użytkownik widzi tylko te zlecenia pracy które są do niego przypisane.
        // Użytkownik widzi:
        // - przycisk "Przegląd rezerwacji" (na każdym zleceniu) - P
        e504.przegladRezerwacjiPierwszyPrzycisk().as('przegladRezerwacji')
        cy.get('@przegladRezerwacji').should('be.visible').and('have.attr', 'title', 'Przegląd rezerwacji')
        // - przycisk "Przegląd zlecenia pracy" (na każdym zleceniu) - Z
        e504.przegladZleceniaPracyPierwszyPrzycisk().as('przegladajZlecenie')
        cy.get('@przegladajZlecenie').should('be.visible').and('have.attr', 'title', 'Przegląd zlecenia pracy')
        // - przycisk "Akceptacja zlecenia pracy" - A
        cy.get('[data-cy=Akceptacja_zlecenia_pracy]').should('be.visible').and('have.attr', 'title', 'Akceptacja zlecenia pracy')
        // - przycisk "Anulacja zlecenia pracy" - N (nie dotyczy pracownika etatowego)
        cy.get('[data-cy=Anulacja_zlecenia_pracy]').should('be.visible').and('have.attr', 'title', 'Anulacja zlecenia pracy')

        // Kliknij przycisk "Przegląd rezerwacji" przy pierwszym zleceniu pracy w stanie 'Oczekujące na akceptację'.==============================================================================================================================================================
        cy.log('Krok 3 - Kliknij przycisk "Przegląd rezerwacji" przy pierwszym zleceniu zleceniu pracy.')
        cy.get('#StateOfOrder')
            .select('Oczekujące na akceptację', {force:true})
        e504.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')
        cy.get('@przegladRezerwacji').click()
        // Użytkownik został przeniesiony do ekranu szczegółów rezerwacji [E503.03], w tabeli są dane z numerem i tytułem porozumienia, z którego pochodzi audycja dla której realizowane jest wybrane zlecenie.
        cy.get('.active').should('contain', 'Szczegóły rezerwacji')
        cy.get('div.dataTables_scrollHead > div > table > thead > tr > :nth-child(2)').should('be.visible').and('have.text', 'Numer porozumienia')
        cy.get('div.dataTables_scrollHead > div > table > thead > tr > :nth-child(3)').should('be.visible').and('have.text', 'Tytuł')
        // Dostępne są przycisk:  "Rozwiń rezerwację", "Drukuj", "Powrót" oraz "Rozwiń wszystko".
        // rozwinięcie rezerwacji
        cy.get('.far').should('be.visible').click() 
        cy.get('[title="Drukuj"]').should('be.visible').and('have.text', 'Drukuj')
        cy.get('.return-button').as('powrot')
        cy.get('@powrot').should('be.visible').and('have.text', 'Powrót')
        // rozwinięcie wszystkich przypisanych zleceń i sprzętów w ramach rezerwacji
        cy.get('.all-collapse').should('be.visible').and('have.text', 'Rozwiń wszystko') 

        // Kliknij przycisk "Powrót".==============================================================================================================================================================
        cy.log('Krok 4 -  Kliknij przycisk "Powrót"')
        cy.get('@powrot').click()
        // Użytkownik powraca na ekran listy zleceń pracy [E504].
        cy.get('.active').should('contain', 'Zlecenia Pracy')

        // Kliknij przycisk "Z" przy wybranym zleceniu pracy ze statusem "Wycena zatwierdzona". ==============================================================================================================================================================
        cy.log('Krok 5 -  Kliknij przycisk "Z" przy wybranym zleceniu pracy ze statusem "Wycena zatwierdzona"')
        cy.get('@przegladajZlecenie').click()
        // Pojawia się popup ze szczegółami zlecenia pracy [E504.02]. W polu "Wynagrodzenie" wyświetla się kwota.
        cy.get('#DetailsModal-modalDialog > div.modal-header > h4').should('be.visible').and('have.text', 'Zlecenie pracy')
        cy.get('#WagesWithCurrency').scrollIntoView().should('be.visible')
        cy.get('#closeBtn').click()

        // Użytkownik wchodzi na ekran Grafiku pracowników [E505].==============================================================================================================================================================
        cy.log('Krok 6 -  Użytkownik wchodzi na ekran Grafiku pracowników [E505].')
        cy.goToMenu('Grafiki')
        fWspolne.sprawdzProgressBar()
        // Użytkownik zostaje przekierowany na ekran z grafikiem pracowników z możliwością zmiany sposobu wyświetlania godzin pracy na grafiku za pomocą radiobuttona "Wyświetlaj" wg: czasu łącznego, zakresu godzin czy wszystkich zleceń pracy. 
        cy.get(':nth-child(2) > #EmployeeDayShowingType').should('be.visible').and('not.be.disabled').and('have.attr', 'type', 'radio').parent().should('contain', 'czas łączny (w godz.)')
        cy.get(':nth-child(3) > #EmployeeDayShowingType').should('be.visible').and('not.be.disabled').and('have.attr', 'type', 'radio').parent().should('contain', 'zakres godzin')
        cy.get(':nth-child(4) > #EmployeeDayShowingType').should('be.visible').and('not.be.disabled').and('have.attr', 'type', 'radio').parent().should('contain', 'zlecenia pracy')
        // Zmianiam w filtrze, aby pokazać tylko uzytkowników z rodzajem umowy 'Umowa współpracownika' oraz rodzajem czasu pracy 'Nielimitowany'.
        cy.get('button[data-target="#menuFilter"]').click()
        cy.get('#ContractTypeId').select('Umowa współpracownika', {force:true})
        cy.get('#WorkingTimeTypeId').select('Nielimitowany', {force:true})
        e504.wyszukajPrzycisk().click()
        // Na grafiku wyświetla się tylko jeden pracownik -> aktualnie zalogowany użytkownik.
        cy.get('#scheduleTable > tbody').should('have.prop', 'childElementCount', 1)
        cy.get('.sorting_1').first().contains('test_user_27')
        // wylogowanie
        cy.logoutUser()
    })
})