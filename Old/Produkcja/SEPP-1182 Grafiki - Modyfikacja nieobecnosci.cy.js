const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e505 } = require('../../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow')

describe('SEPP-1182 Grafiki - Modyfikacja nieobecności', function () {

    // PUNKTY 3 ORAZ 6 NIE DZIAŁAJĄ ZGODNIE Z TC!!! - zaimplementowałem rozwiązanie instniejące

    it('Grafiki - Modyfikacja nieobecności', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // otworzenie widoku grafików pracowników
        cy.goToMenu('Grafiki')

        // 1. Użytkownik klika na ekranie Grafików pracowników w wybrany dzień (nieparzysty) 
        //   dla danego pracownika, w którym jest już zdefiniowana nieobecność (z rodzajem wpisu "Nieobecność).
        //   Na środku ekranu wyświetliło się okienko z tytułem "Nieobecność".
        cy.log('Krok 1 - Użytkownik klika na ekranie Grafików pracowników w wybrany dzień (nieparzysty) dla danego pracownika, w którym jest już zdefiniowana nieobecność (z rodzajem wpisu "Nieobecność).')
        // wybieram przedział czasu i filtruję listę grafików
        // Od dnia
        cy.get('#DateFrom').clear().type('01.02.2021')
        // Do dnia
        cy.get('#DateTo').clear().type('28.02.2021')
        e505.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#select2-ContractTypeId-container').should('be.visible')
        cy.log('Weryfikuję czy pole Rodzaj czasu pracy jest możliwe do edycji') 
        cy.get('#select2-WorkingTimeTypeId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Równoważny')
        cy.get('.select2-results__option').should('contain', 'Równoważny').click()
        cy.log('Klikam button Wyszukaj')
        e505.wyszukajPrzycisk().click()
        
        // klikam w pierwszy dzień miesiąca dla pierwszego pracownika na liście
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(2) > span.basic-display').click()
        cy.log('Weryfikuję czy na środku ekranu wyświetliło się okienko z tytułem "Nieobecność"')
        cy.get('#addModal-modalDialog > div.modal-header > h4').should('have.text', 'Nieobecność')
        
        // 2. W testcase przyciski nazywają się "Zapisz" i "Powrót"!!! 
        //   Użytkownik sprawdza widoczność, typ i walidacje pól na okienku do dodawania nieobecności: 
        //   Rodzaj wpisu (radiobutton z jedną wartością "Nieobecność"), Rodzaj nieobecności (lista), 
        //   Od dnia (pole z datą w formacie DD.MM.RRRR), Do dnia (pole z datą w formacie DD.MM.RRRR), 
        //   Typ udzielenia nieobecności (radiobutton z wartościami "8h dziennie", "godzinowy" i 
        //   "tylko gdy w grafiku") - typ godzinowy wyświetli się tylko jeśli ustawiony jest: urlop wypoczynkowy, 
        //   urlop na żądanie, opieka nad dzieckiem lub szkolenie BHP, Potwierdź (przycisk), Anuluj (przycisk), 
        //   Usuń (przycisk). Zweryfikuj czy pola typu lista są filtrami z listą wyboru i polem tekstowym 
        //   którym można wyszukać określone wartości z listy. 
        //   W polach data można wpisać konkretne wartości DD.MM.RRRR.
        //   Poprawne wartości zostały wyszukane i wyświetlone. 
        //   Domyślnie wyświetlają się te same dane, które zostały podane podczas dodawania nieobecności.
        cy.log('Krok 2 - Użytkownik sprawdza widoczność, typ i walidacje pól na okienku do dodawania nieobecności: Rodzaj wpisu (radiobutton z jedną wartością "Nieobecność"), Rodzaj nieobecności (lista), Od dnia (pole z datą w formacie DD.MM.RRRR), Do dnia (pole z datą w formacie DD.MM.RRRR), Typ udzielenia nieobecności (radiobutton z wartościami "8h dziennie", "godzinowy" i "tylko gdy w grafiku") - typ godzinowy wyświetli się tylko jeśli ustawiony jest: urlop wypoczynkowy, urlop na żądanie, opieka nad dzieckiem lub szkolenie BHP, Zapisz (przycisk), Powrót (przycisk), Usuń (przycisk). Zweryfikuj czy pola typu lista są filtrami z listą wyboru i polem tekstowym którym można wyszukać określone wartości z listy. W polach data można wpisać konkretne wartości DD.MM.RRRR.')
        cy.get('#radio-absence').should('have.attr', 'type', 'radio').and('be.visible') 
        cy.get('#radio-absence').click()
        cy.get('#select2-IdAbsenceType-container').should('be.visible') 
        cy.get('#DateFrom').should('have.attr', 'type', 'text').and('have.value', '01.02.2021').and('be.visible') 
        cy.get('#DateTo').should('have.attr', 'type', 'text').and('have.value', '28.02.2021').and('be.visible') 
        cy.get('input#radio-AbsenceMode').eq(0).should('have.attr', 'type', 'radio').and('be.visible') 
        cy.get('input#radio-AbsenceMode').eq(2).should('have.attr', 'type', 'radio').and('be.visible') 
        // cy.get('#AbsenceFrom').should('have.attr', 'type', 'text').and('be.visible') 
        // cy.get('#AbsenceTo').should('have.attr', 'type', 'text').and('be.visible') 
        cy.get('#addModal-yesBtn').should('have.text', 'Potwierdź').and('have.attr', 'role', 'button').and('be.visible') 
        cy.get('#addModal-noBtn').should('contain.text', 'Powrót').and('have.attr', 'role', 'button').and('be.visible') 
        // cy.get('#absenceForm > div.form-group > button:nth-child(1)').should('have.text', 'Usuń').and('have.attr', 'type', 'button').and('be.visible') 
        // weryfikuję że typ godzinowy wyświetli się tylko jeśli ustawiony jest: urlop wypoczynkowy, 
        // urlop na żądanie, opieka nad dzieckiem lub szkolenie BHP 
        cy.log('weryfikuję że typ godzinowy wyświetli się tylko jeśli ustawiony jest: urlop wypoczynkowy, urlop na żądanie, opieka nad dzieckiem lub szkolenie BHP')
        // wybieram badania okresowe
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Badanie okresowe')
        cy.get('.select2-results__option').should('contain', 'Badanie okresowe').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Badanie okresowe').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible') 
        // wybieram Bezpłatny - 0h
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Bezpłatny - 0h')
        cy.get('.select2-results__option').should('contain', 'Bezpłatny - 0h').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Bezpłatny - 0h').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')         
        // wybieram Inna nieobecność prawna
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Inna nieobecność prawna')
        cy.get('.select2-results__option').should('contain', 'Inna nieobecność prawna').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Inna nieobecność prawna').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible') 
        // wybieram Inna nieobecność usprawiedliwiona niepłatna - 0h
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Inna nieobecność usprawiedliwiona niepłatna - 0h')
        cy.get('.select2-results__option').should('contain', 'Inna nieobecność usprawiedliwiona niepłatna - 0h').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Inna nieobecność usprawiedliwiona niepłatna - 0h').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')         
        // wybieram Na żądanie
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Na żądanie')
        cy.get('.select2-results__option').should('contain', 'Na żądanie').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Na żądanie').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('be.visible') 
        // wybieram Okolicznościowy
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Okolicznościowy')
        cy.get('.select2-results__option').should('contain', 'Okolicznościowy').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Okolicznościowy').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')         
        // wybieram Opieka nad dzieckiem
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Opieka nad dzieckiem')
        cy.get('.select2-results__option').should('contain', 'Opieka nad dzieckiem').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Opieka nad dzieckiem').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('be.visible') 
        // wybieram Poszukiwanie pracy
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Poszukiwanie pracy')
        cy.get('.select2-results__option').should('contain', 'Poszukiwanie pracy').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Poszukiwanie pracy').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')
        // wybieram Szkolenie BHP
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Szkolenie BHP')
        cy.get('.select2-results__option').should('contain', 'Szkolenie BHP').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Szkolenie BHP').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('be.visible') 
        // wybieram Szkolny
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Szkolny')
        cy.get('.select2-results__option').should('contain', 'Szkolny').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Szkolny').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')         
        // wybieram Wychowawczy/macierzyński
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wychowawczy/macierzyński')
        cy.get('.select2-results__option').should('contain', 'Wychowawczy/macierzyński').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Wychowawczy/macierzyński').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible') 
        // wybieram Wypoczynkowy
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wypoczynkowy')
        cy.get('.select2-results__option').should('contain', 'Wypoczynkowy').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Wypoczynkowy').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('be.visible')    
        // wybieram Zwolnienie
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Zwolnienie')
        cy.get('.select2-results__option').should('contain', 'Zwolnienie').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Zwolnienie').and('be.visible')  
        cy.get('input#radio-AbsenceMode').eq(1).should('have.attr', 'type', 'radio').and('not.be.visible')    

        cy.log('Krok 3 - Użytkownik zmienia dane w polach "Od dnia" i "Do dnia" aby zawierały w sobie okres udzielenia nieobecności w którym przynajmniej jeden dzień jest już zajęty i klika w przycisk "Zapisz".')
        cy.log('Klikam button anuluj aby zamknąć popup')
        cy.get('#addModal-noBtn').click()
        cy.get('#addModal-confirm-return-yesBtn').click()
        cy.log('Klikam 12 lutego dla pierwszego pracownika na liście - dzień dla którego nie ma zdefiniowanej nieobecności')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(12) > span.basic-display').click()
        cy.log('Weryfikuję czy na środku ekranu wyświetliło się okienko z tytułem "Nieobecność"')
        cy.get('#addModal-modalDialog > div.modal-header > h4', {timeout: 10000}).should('have.text', 'Nieobecność') 
        cy.get('#radio-absence').click()
        cy.log('Wybieram urlop wypoczynkowy')
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wypoczynkowy')
        cy.get('.select2-results__option').should('contain', 'Wypoczynkowy').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Wypoczynkowy').and('be.visible')  
        
        cy.log('Wybieram przedział czasu pokrywający dni już wcześniej zajęte')
        cy.get('input#AbsenceDateFrom').clear().type('18.04.2021')
        cy.get('input#AbsenceDateTo').type('19.04.2021')
        cy.get('input#radio-AbsenceMode').eq(2).click() 

        cy.log('Klikam potwierdź')
        cy.get('#addModal-yesBtn').click()
        cy.wait(1000)
        
        cy.log('Weryfikuję czy pojawia się komunikat walidacyjny "Uwaga! Istnieje już nieobecność w zadanym przedziale czasowym dla wskazanego pracownika."')
        fWspolne.komunikat().should('have.text', 'Uwaga! Istnieje już nieobecność w zadanym przedziale czasowym dla wskazanego pracownika.') 

        // 4. Użytkownik zmienia okres udzielenia nieobecności na okres, w którym data "Do dnia" jest wcześniejsza niż data "Od dnia" i klika w przycisk "Zapisz".
        //   Pojawia się walidacja w polu z datą informująca, że "Data od" nie może być późniejsza niż 
        //   "Data do". Zmiana nie została zapisana.
        cy.log('Krok 4 - Użytkownik zmienia okres udzielenia nieobecności na okres, w którym data "Do dnia" jest wcześniejsza niż data "Od dnia" i klika w przycisk "Zapisz".')
        cy.get('input#AbsenceDateFrom').clear().type('18.04.2021')
        cy.get('input#AbsenceDateTo').clear().type('17.04.2021')
        cy.get('#addModal-yesBtn').click()
        cy.get('#absence-container > div:nth-child(2) > div > div').should('have.attr', 'data-original-title','Wartość pola \'Od dnia\' nie może być późniejsza, niż wartość pola \'Do dnia\'.' )

        // 5. Użytkownik podaje poprawny nowy rodzaj, okres i typ udzielenia nieobecności (na "8h dziennie") i klika w przycisk "Zapisz".
        //   Okienko sie zamyka, a nieobecność zapisała się w poprawnym miejscu na grafiku 
        //   (dla wybranego pracownika i okresu). Dla dni z wybranego okresu wyświetla się wartość "08:00", a kolor pól jest zgodny z legendą.
        cy.log('Krok 5 - Użytkownik podaje poprawny nowy rodzaj, okres i typ udzielenia nieobecności (na "8h dziennie") i klika w przycisk "Zapisz".')
        cy.log('Klikam button anuluj aby zamknąć popup')
        cy.get('#addModal-noBtn').click()
        cy.get('#addModal-confirm-return-yesBtn').click()
        cy.log('klikam w pierwszy dzień miesiąca dla pierwszego pracownika na liście')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(2) > span.basic-display').click()
        cy.log('Weryfikuję czy na środku ekranu wyświetliło się okienko z tytułem "Nieobecność"')
        cy.get('#addModal-modalDialog > div.modal-header > h4').should('have.text', 'Nieobecność')
        cy.get('#radio-absence').click()
        cy.log('wybieram Na żądanie')
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Na żądanie')
        cy.get('.select2-results__option').should('contain', 'Na żądanie').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Na żądanie').and('be.visible') 
        cy.get('input#AbsenceDateFrom').clear().type('01.02.2021')
        cy.get('input#AbsenceDateTo').clear().type('02.02.2021')
        cy.get('input#radio-AbsenceMode').eq(0).click() 
        // klikam Potwierdź
        cy.get('#addModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.get('#addModal-modalDialog > div.modal-header > h4').should('not.exist')
        // Dla dni z wybranego okresu wyświetla się wartość "08:00", a kolor pól jest zgodny z legendą.
        cy.get(':nth-child(1) > :nth-child(2) > .extension-display').should('have.text', '08:00').and('have.attr', 'data-day-off-name', 'Na żądanie')
        cy.get(':nth-child(1) > :nth-child(3) > .extension-display').should('have.text', '08:00').and('have.attr', 'data-day-off-name', 'Na żądanie')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(2)').should('have.attr', 'style', 'background: #ffa500')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(3)').should('have.attr', 'style', 'background: #ffa500')

        cy.log('klikam w pierwszy dzień miesiąca dla pierwszego pracownika na liście')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(2) > span.basic-display', {timeout: 10000}).click()

        cy.log('Weryfikuję czy na środku ekranu wyświetliło się okienko z tytułem "Nieobecność"')
        cy.get('#addModal-modalDialog > div.modal-header > h4').should('have.text', 'Nieobecność') 
        cy.log('wybieram Wypoczynkowy')
        cy.get('#select2-IdAbsenceType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wypoczynkowy')
        cy.get('.select2-results__option').should('contain', 'Wypoczynkowy').click()
        cy.get('#select2-IdAbsenceType-container').should('have.text', '×Wypoczynkowy').and('be.visible')
        cy.get('input#AbsenceDateFrom').clear().type('01.02.2021')
        cy.get('input#AbsenceDateTo').clear().type('02.02.2021')
        cy.get('input#radio-AbsenceMode').eq(0).click() 
        // klikam Potwierdź
        cy.get('#addModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        cy.get(':nth-child(1) > :nth-child(2) > .extension-display').should('have.text', '08:00').and('have.attr', 'data-day-off-name', 'Wypoczynkowy')
        cy.get(':nth-child(1) > :nth-child(3) > .extension-display').should('have.text', '08:00').and('have.attr', 'data-day-off-name', 'Wypoczynkowy')
       
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(2)').should('have.attr', 'style', 'background: #32cd32')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(3)').should('have.attr', 'style', 'background: #32cd32')

        // 6. Użytkownik klika w wybrany dzień dla danego pracownika, 
        //   w którym jest już zdefiniowana nieobecność (z rodzajem wpisu "Kod dnia wolnego")
        //   W okienku wyświetlają się nastepujące pola: Rodzaj wpisu (radiobutton z jedną wartością "Kod dnia wolnego"),
        //   Kod dnia wolnego (lista)
        cy.log('Krok 6 - Użytkownik klika w wybrany dzień dla danego pracownika, w którym jest już zdefiniowana nieobecność (z rodzajem wpisu "Kod dnia wolnego")')
        cy.log('Klikam 12 lutego dla pierwszego pracownika na liście - dzień dla którego nie ma zdefiniowanej nieobecności')
        cy.get('#scheduleTable > tbody > tr:nth-child(1) > td:nth-child(14) > span.basic-display').click()
        cy.log('Weryfikuję czy na środku ekranu wyświetliło się okienko z tytułem "Nieobecność"')
        cy.get('#addModal-modalDialog > div.modal-header > h4').should('have.text', 'Nieobecność') 
        cy.log('Weryfikuję czy wyświetlają się nastepujące pola: Rodzaj wpisu (radiobutton z jedną wartością "Kod dnia wolnego"), Kod dnia wolnego (lista)')
        cy.get('#radio-dayOff').should('have.attr', 'type', 'radio').and('be.visible') 
        cy.get('#select2-IdDayOffType-container').should('be.visible') 

        // 7. Użytkownik zmienia wartość w polu "Kod dnia wolnego" i klika przycisk "Zapisz".
        //   Okienko się zamyka a na grafiku w wybranym dniu wyświetla się poprawny kod 
        //   dnia wolnego (zgodnie z wyborem użytkownika).
        cy.log('Krok 7 - Użytkownik zmienia wartość w polu "Kod dnia wolnego" i klika przycisk "Zapisz".')
        cy.log('Klikam radio button "Kod dnia wolnego"')
        cy.get('#radio-dayOff').click()
        cy.log('wybieram Niedziela jako kod dnia wolnego')
        cy.get('#select2-IdDayOffType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Niedziela')
        cy.get('.select2-results__option').should('contain', 'Niedziela').click()
        cy.get('#select2-IdDayOffType-container').should('have.text', '×Niedziela').and('be.visible')
        cy.log('Klikam Potwierdź')
        cy.get('#addModal-yesBtn').click()
        cy.log('Sprawdzam na grafiku czy w wybranym dniu wyświetla się poprawny kod dnia wolnego')
        fWspolne.sprawdzProgressBar()
        cy.get(':nth-child(1) > :nth-child(14) > .extension-display').should('have.text', 'NIED')
        cy.log('Klikam 12 lutego dla pierwszego pracownika na liście - dzień dla którego nie ma zdefiniowanej nieobecności')
        cy.get(':nth-child(1) > :nth-child(14) > .basic-display').click()
        cy.log('Klikam radio button "Kod dnia wolnego"')
        cy.get('#radio-dayOff').click()
        cy.log('Wybieram Wolne grafikowe jako kod dnia wolnego')
        cy.get('#select2-IdDayOffType-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wolne grafikowe')
        cy.get('.select2-results__option').should('contain', 'Wolne grafikowe').click()
        cy.get('#select2-IdDayOffType-container').should('have.text', '×Wolne grafikowe').and('be.visible')
        cy.log('Klikam Potwierdź')
        cy.get('#addModal-yesBtn').click()
        cy.log('Sprawdzam na grafiku czy w wybranym dniu wyświetla się poprawny kod dnia wolnego')
        fWspolne.sprawdzProgressBar()
        cy.get(':nth-child(1) > :nth-child(14) > .extension-display').should('have.text', 'WG')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})