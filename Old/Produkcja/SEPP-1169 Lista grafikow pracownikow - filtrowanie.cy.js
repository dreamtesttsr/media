const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e505 } = require('../../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow')

describe('SEPP-1169 Lista grafików pracowników - filtrowanie', function () {

    it('Lista grafików pracowników - filtrowanie', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // otworzenie widoku grafików pracowników
        cy.goToMenu('Grafiki')

        // 1. Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Tytuł Audycji (Tekst), 
        //   Identyfikator audycji (Tekst), Numer SAP audycji (tekst), 
        //   Wydział - możliwość wyboru wiersza z listy rozwijalnej, 
        //   Pracownik - możliwość wyboru wiersza z listy rozwijalnej, 
        //   Stanowisko - możliwość wyboru wiersza z listy rozwijalnej, Od dnia - możliwość wyboru daty, 
        //   Do dnia - możliwość wyboru daty, czas łączny (w godz.) (pole wyboru), zakres godzin (pole wyboru), 
        //   zlecenia pracy (pole wyboru)
        //   Odpowiednie filtry są widoczne w domyślnym widoku ekranu grafików. 
        //   Istnieje możliwość wpisania tekstu w pola.
        cy.log('Krok 1 - Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Tytuł Audycji (Tekst), Identyfikator audycji (Tekst), Numer SAP audycji (tekst), Wydział - możliwość wyboru wiersza z listy rozwijalnej, Pracownik - możliwość wyboru wiersza z listy rozwijalnej, Stanowisko - możliwość wyboru wiersza z listy rozwijalnej, Od dnia - możliwość wyboru daty, Do dnia - możliwość wyboru daty, czas łączny (w godz.) (pole wyboru), zakres godzin (pole wyboru), zlecenia pracy (pole wyboru)')
        cy.get('#AuditionName').should('have.attr', 'type', 'text').and('be.visible')
        cy.get('#AuditionSapId').should('have.attr', 'type', 'text').and('be.visible')
        cy.get('#AuditionSapNr').should('have.attr', 'type', 'text').and('be.visible')
        cy.get('#select2-DepartmentId-container').should('be.visible')
        cy.get('#DateFrom').should('have.attr', 'type', 'text').and('be.visible')
        cy.get('#DateTo').should('have.attr', 'type', 'text').and('be.visible')
        cy.get('.select2-search__field').should('have.attr', 'type', 'search').and('be.visible')
        cy.get('#select2-PositionId-container').should('be.visible')
        cy.get(':nth-child(2) > #EmployeeDayShowingType').should('have.attr', 'type', 'radio').and('have.attr', 'value', 'TotalTimeInHours').and('be.visible')
        cy.get(':nth-child(3) > #EmployeeDayShowingType').should('have.attr', 'type', 'radio').and('have.attr', 'value', 'Range').and('be.visible')
        cy.get(':nth-child(4) > #EmployeeDayShowingType').should('have.attr', 'type', 'radio').and('have.attr', 'value', 'WorkOrder').and('be.visible')

        // weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych
        cy.log('Weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych')
        // Tytuł Audycji
        cy.get('#AuditionName').clear().type(daneTestowe.numer12345)
        // Identyfikator audycji
        cy.get('#AuditionSapId').clear().type(daneTestowe.numer12345)
        // Numer SAP audycji
        cy.get('#AuditionSapNr').clear().type(daneTestowe.numer12345)
        // Wydział
        cy.get('#select2-DepartmentId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('Wydział techniki studyjnej')
        cy.get('.select2-results__option').should('contain', 'Wydział techniki studyjnej').click()
        cy.get('#select2-DepartmentId-container').should('have.text', '×Wydział techniki studyjnej').and('be.visible')  
        // Od dnia
        cy.get('#DateFrom').clear().type('01.12.2023')
        // Do dnia
        cy.get('#DateTo').clear().type('31.12.2023')
        // Pracownik
        cy.get('.select2-search__field').clear().type('Antosik Marcin')
        cy.get('#select2-UserList-results').click()
        cy.get('#scheduleFilter > div:nth-child(2) > div:nth-child(6) > span > span.selection > span > ul > li.select2-selection__choice').should('have.attr', 'title', 'Antosik Marcin (29857)')
        // Stanowisko
        cy.get('#select2-PositionId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('asystent montażysty')
        cy.get('.select2-results__option').should('contain', 'ASYSTENT MONTAŻYSTY').click()
        cy.get('#select2-PositionId-container').should('have.text', '×ASYSTENT MONTAŻYSTY').and('be.visible')  
        // czas łączny (w godz.) radio button
        cy.get(':nth-child(2) > #EmployeeDayShowingType').should('be.visible').and('be.checked')
        // zakres godzin radio button
        e505.wybierzWartoscRadio('zakres godzin')
        // Zlecenia pracy radio button
        e505.wybierzWartoscRadio('zlecenia pracy')
        cy.log('Klikam button Wyczyść filtry wyszukiwania')
        e505.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // 2. Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.
        //   Sekcja zaawansowanych filtrów zostaje rozwinięta.
        cy.log('Krok 2 - Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.')
        e505.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#select2-ContractTypeId-container').should('be.visible')

        // 3. Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: 
        //   Umowa pracownika etatowego - możliwość wyboru wiersza z listy rozwijalnej (tekst)
        //   Wszystkie wymienione pola są widoczne na zaawansowanym widoku ekranu grafików oraz są
        //   możliwe do edycji zgodnie z założeniami. Do tego pole "Rodzaj czasu pracy" 
        //   jest zablokowane i o treści "Równoważny".
        cy.log('Krok 3 - Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: Umowa pracownika etatowego - możliwość wyboru wiersza z listy rozwijalnej (tekst)')
        cy.log('Weryfikuję czy pole Rodzaj umowy jest możliwe do edycji')  
        // cy.get('#select2-ContractTypeId-container').should('have.attr', 'data-toggle', 'Wybierz...').and('be.visible')
        cy.get('#select2-ContractTypeId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('Umowa firmy')
        cy.get('.select2-results__option').should('contain', 'Umowa firmy').click()
        cy.get('#select2-ContractTypeId-container').should('have.text', '×Umowa firmy').and('be.visible')  
        cy.get('#select2-ContractTypeId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('Umowa pracownika etatowego')
        cy.get('.select2-results__option').should('contain', 'Umowa pracownika etatowego').click()
        cy.get('#select2-ContractTypeId-container').should('have.text', '×Umowa pracownika etatowego').and('be.visible')  
        // cy.log('Weryfikuję czy pole "Rodzaj czasu pracy" jest zablokowane i o treści "Równoważny"')  
        // cy.get('#menuFilter > div > div:nth-child(4) > input:nth-child(1)').should('have.attr', 'value', 'Równoważny').and('have.attr', 'readonly', 'readonly')
       
        // 4. Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie pracownika. 
        //   Kliknij button "Wyszukaj".
        //   Rekordy na liście grafików zostały zawężone zgodnie z podanymi przez użytkownika danymi.
        cy.log('Krok 4 - Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie pracownika. Kliknij button "Wyszukaj".')
        // Od dnia
        cy.get('#DateFrom').clear().type('01.02.2021')
        // Do dnia
        cy.get('#DateTo').clear().type('28.02.2021')
        // Pracownik
        cy.get('.select2-search__field').clear().type('Adamczyk Krzysztof')
        cy.get('#select2-UserList-results').click()
        cy.get('#scheduleFilter > div:nth-child(2) > div:nth-child(6) > span > span.selection > span > ul > li.select2-selection__choice').should('have.attr', 'title', 'Adamczyk Krzysztof (27200)')
        cy.log('Klikam button Wyszukaj')
        e505.wyszukajPrzycisk().click()
        cy.log('Weryfikuję czy rekordy na liście grafików zostały zawężone zgodnie z podanymi przez użytkownika danymi.')
        cy.get('#scheduleTable > tbody > tr > td.sorting_1.dtfc-fixed-left').should('have.text', 'Adamczyk, Krzysztof (27200)')
        // Tytuł Audycji
        cy.get('#AuditionName').clear().type(daneTestowe.numer12345)
        // Identyfikator audycji
        cy.get('#AuditionSapId').clear().type(daneTestowe.numer12345)
        // Numer SAP audycji
        cy.get('#AuditionSapNr').clear().type(daneTestowe.numer12345)
        // Wydział
        cy.get('#select2-DepartmentId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('Wydział techniki studyjnej')
        cy.get('.select2-results__option').should('contain', 'Wydział techniki studyjnej').click()
        cy.get('#select2-DepartmentId-container').should('have.text', '×Wydział techniki studyjnej').and('be.visible')  
        // Stanowisko
        cy.get('#select2-PositionId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('asystent montażysty')
        cy.get('.select2-results__option').should('contain', 'ASYSTENT MONTAŻYSTY').click()
        cy.get('#select2-PositionId-container').should('have.text', '×ASYSTENT MONTAŻYSTY').and('be.visible')  
        cy.log('Klikam button Wyszukaj')
        e505.wyszukajPrzycisk().click()
        cy.get('.dataTables_empty').should('have.text', 'Brak danych').and('be.visible')
        
        // 5. Kliknij na przycisk "Wyczyść filtry wyszukiwania".
        //   Dane wprowadzone do filtrów zostają usunięte. Następuje ponowne wyszukanie listy grafików, 
        //   owocujące pełną listą pracowników dostępnych do wglądu użytkownika. 
        cy.log('Krok 5 - Kliknij na przycisk "Wyczyść filtry wyszukiwania".')
        e505.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Sprawdzam czy wyświetla się pełna lista grafików')
        cy.get(':nth-child(2) > .sorting_1').should('be.visible')
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e505.zaawansowanePrzycisk().click()
        cy.get('#select2-ContractTypeId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').clear().type('Umowa pracownika etatowego')
        cy.get('.select2-results__option').should('contain', 'Umowa pracownika etatowego').click()
        cy.get('#select2-ContractTypeId-container').should('have.text', '×Umowa pracownika etatowego').and('be.visible')  
        // cy.log('Weryfikuję czy pole "Rodzaj czasu pracy" jest zablokowane i o treści "Równoważny"')  
        // cy.get('#menuFilter > div > div:nth-child(4) > input:nth-child(1)').should('have.attr', 'value', 'Równoważny')

        cy.log('Krok 6 - Weryfikacja sekcji podsumowań w zależności od trybu wyświetlania')
        // tryb: czas łączny ( w godz.)
        e505.odDniaData().clear().type('1.04.2022')
        e505.doDniaData().clear().type('30.04.2022')
        e505.pracownikLista().select('test_user_15 Imię_15 (111111111111)', {force: true})
        e505.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('[title="Suma godzin w okresie"]').first().should('contain', 'Σ')
        cy.get('[title="Liczba dni pracy w okresie"]').first().should('contain', 'Σ D')
        cy.get('[title="Suma nadgodzin w okresie"]').first().should('contain', 'Σ NG')
        cy.get('.basic-display[data-day="01.04.2022"]').contains('10:00').should('be.visible')
        cy.get('.basic-display[data-day="15.04.2022"]').contains('08:00').should('be.visible')
        cy.get('.basic-display[data-day="15.04.2022"]>text').contains('(02:00)').should('be.visible').and('have.attr', 'style', 'color: red')
        cy.get('td.no-sort.dtfc-fixed-right').eq(0).should('contain', '48,00')
        cy.get('td.no-sort.dtfc-fixed-right').eq(1).should('contain', '5')
        cy.get('td.no-sort.dtfc-fixed-right').eq(2).should('contain', '2,00')

        // tryb: zakres godzin
        e505.wybierzWartoscRadio('zakres godzin')
        cy.get('[title="Suma godzin w okresie"]').first().should('contain', 'Σ')
        cy.get('[title="Liczba dni pracy w okresie"]').first().should('contain', 'Σ D')
        cy.get('[title="Suma nadgodzin w okresie"]').first().should('contain', 'Σ NG')
        cy.get('.range-display[data-day="01.04.2022"]').contains('10:00-20:00').should('be.visible')
        cy.get('.range-display[data-day="15.04.2022"]').contains('10:00-18:00').should('be.visible')
        cy.get('.range-display[data-day="15.04.2022"]>text').contains('(18:00-20:00)').should('be.visible').and('have.attr', 'style', 'color: red')
        cy.get('td.no-sort.dtfc-fixed-right').eq(0).should('contain', '48,00')
        cy.get('td.no-sort.dtfc-fixed-right').eq(1).should('contain', '5')
        cy.get('td.no-sort.dtfc-fixed-right').eq(2).should('contain', '2,00')

        // tryb: zlecenia pracy
        e505.wybierzWartoscRadio('zlecenia pracy')
        cy.get('[title="Suma godzin w okresie"]').first().should('contain', 'Σ')
        cy.get('[title="Liczba dni pracy w okresie"]').first().should('contain', 'Σ D')
        cy.get('[title="Suma nadgodzin w okresie"]').first().should('contain', 'Σ NG')
        cy.get('.extension-display[data-day="01.04.2022"]').contains('10:00-20:00').should('be.visible')
        cy.get('.extension-display[data-day="15.04.2022"]').contains('10:00-20:00').should('be.visible')
        cy.get('.extension-display[data-day="15.04.2022"]>text').should('not.exist')
        cy.get('td.no-sort.dtfc-fixed-right').eq(0).should('contain', '48,00')
        cy.get('td.no-sort.dtfc-fixed-right').eq(1).should('contain', '5')
        cy.get('td.no-sort.dtfc-fixed-right').eq(2).should('contain', '2,00')
           
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})