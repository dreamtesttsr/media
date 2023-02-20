const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50902 } = require('../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy')

describe('SEPP-1158 Usunięcie Karty pracy', function () {

    it('Usunięcie Karty pracy', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // 1. Wyszukaj kartę pracy, która jest przeznaczna do usunięcia
        cy.log('Krok 1 - Wyszukaj kartę do usunięcia.')
        // e509.idKartyPoleTekstowe().type('2000004')
        e509.tytulAudycjiPoleTekstowe().type('TEST KOSZTORYSY')
        e509.rodzajKartyLista().select('Sprzętowa', {force: true})
        cy.get('button[title=Wyszukaj]').first().click()
        fWspolne.sprawdzProgressBar()

        // 2. Z dostępnych operacji dla karty pracy wybierz opcję "Usuń kartę pracy"
        //   Otwiera się popup "Potwierdzenie operacji". Uzytkownik ma do wyboru opcję "Tak" lub "Nie".
        cy.log('Krok 2 - Z dostępnych operacji dla karty pracy wybierz opcję "Usuń kartę pracy"')
        // pobieram id wyszukanej karty pracy 
        if(cy.get('#workCardList_table > tbody').should('have.prop', 'childElementCount', 1)) {
            // cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text').then((btnText) => {
            // klikam w przycisk usuń przy wyszukanej karcie
            e509.anulujKartePracyPierwszyPrzycisk().click()
            cy.log('Weryfikuję czy otwiera się popup "Potwierdzenie operacji" i uzytkownik ma do wyboru opcję "Tak" lub "Nie".')
            e509.takPopupPrzycisk().should('have.text', 'Tak').and('be.visible')
            e509.niePopupPrzycisk().should('have.text', 'Nie').and('be.visible')

            // 3. Wybierz opcję "Tak"
            //   Popoup zostaje zamknięty. Karta pracy zostaje usunięta i nie wyświetla się na liście kart pracy. 
            //   Zweryfikuj wysłane dane i odpowiedź serwera.
            cy.log('Krok 3 - Wybierz opcję "Tak".')
            cy.get('#confirmBtn').click()
            cy.log('Wpisuję komentarz i potwierdzam operację')
            cy.get('#rejectModal-body').should('contain.text', 'Komentarz').and('be.visible')
            cy.get('#rejectModal-yesBtn').should('have.text', 'Anuluj kartę pracy').and('be.visible')
            cy.get('#rejectModal-noBtn').should('have.text', 'Powrót').and('be.visible')
            cy.get('#modalComment').type('Anuluj kartę')
            cy.get('#rejectModal-yesBtn').click()
            fWspolne.sprawdzProgressBar()
            fWspolne.sprawdzProgressBar()
            cy.log('Weryfikuję czy karta pracy została anulowana i nie wyświetla się na liście kart pracy.')
            cy.get('#workCardList_table > tbody').contains('Brak danych')
            cy.log('Nie znaleziono w tabeli żadnej pozycji')
            // cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text').
            // then((btn2Text) => {
            //    expect(btnText).to.not.equal(btn2Text)
            // })
            
            cy.log('Krok 4 - Wygeneruj ponownie anulowaną kartę.')
            cy.get('.dt-buttons > .btn-success').click()
            e50902.rodzajKartyPracyLista().select('Sprzętowa', {force: true})
            e50902.wydzialLista().select('Wydział techniki studyjnej', {force: true})
            cy.get('#div_FilterDateFrom').type('1.07.2021')
            cy.get('#div_FilterDateTo').clear().type('1.07.2021')
            cy.get('#FilterAuditionName').type('TEST KOSZTORYSY')
            cy.get('#generatorSearchBtn').click()
            cy.get('#generate').should('contain', 'Generuj karty pracy').click()
            cy.get('#auditionsModal-modalDialog > .modal-header > .modal-title').should(
                'have.text',
                'Wygenerowane karty pracy dla audycji'
            )
            e50902.zamknijPopupPrzycisk().click()
        } else {
            cy.get('#workCardList_table > tbody').contains('Brak danych')
            cy.log('Nie znaleziono w tabeli pozycji z wierszem do usunięcia')
        }
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
