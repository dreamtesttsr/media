const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { e501 } = require ('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka')

describe('SEPP-1167 Lista wniosków - filtrowanie', function () {

    it('Lista wniosków - filtrowanie', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // otworzenie widoku wniosków o przydzielenie zasobów
        cy.goToMenu('Wnioski o przydzielenie zasobów')

        // 1. Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id wniosku(Tekst), Nr Porozumienia (Tekst), 
        //   Nazwa Audycji TV (Tekst), Jednostka zamawiająca - możliwość wyboru wiersza z listy rozwijalnej, 
        //   Wydział - możliwość wyboru wiersza z listy rozwijalnej, Id rezerwacji (tekst), 
        //   Pokaż zdjęte z anteny (Checkbox), Ukryj zrealizowane (Checkbox), SAP/ID audycji (tekst)
        //   Odpowiednie filtry są widoczne w domyślnym widoku ekranu listy wniosków. 
        //   Istnieje możliwość wpisania tekstu w pola.
        cy.log('Krok 1 - Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id wniosku(Tekst), Nr Porozumienia (Tekst), Nazwa Audycji TV (Tekst), Jednostka zamawiająca - możliwość wyboru wiersza z listy rozwijalnej, Wydział - możliwość wyboru wiersza z listy rozwijalnej, Id rezerwacji (tekst), Tryb produkcji - możliwość wyboru wiersza z listy rozwijalnej, Pokaż zdjęte z anteny (Checkbox), Ukryj zrealizowane (Checkbox), SAP/ID audycji (tekst)')
        cy.get('#Id').should('have.attr', 'title', 'Id wniosku').and('be.visible')
        cy.get('#AgreementNumber').should('have.attr', 'title', 'Nr porozumienia').and('be.visible')
        cy.get('#AuditionName').should('have.attr', 'title', 'Nazwa audycji TV').and('be.visible')
        cy.get('#OrderSAP').should('have.attr', 'placeholder', 'SAP / ID audycji').and('be.visible')
        cy.get('#select2-OrganizationUnitId-container').should('have.attr', 'data-original-title', 'Jednostka zamawiająca').and('be.visible')
        cy.get('#select2-DepartmentId-container').should('have.attr', 'data-original-title', 'Wydział').and('be.visible')
        cy.get('#SectionId').should('have.attr', 'title', 'Id rezerwacji').and('be.visible')
        cy.get('#ProductionMode').should('have.attr', 'data-title', 'Tryb produkcji').and('be.visible')
        cy.get('#ShowRemoved').should('have.attr', 'type', 'checkbox').should('be.visible')
        cy.get('#HideExecuted').should('have.attr', 'type', 'checkbox').should('be.visible')
        // weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych
        cy.log('Weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych')
        // Id wniosku
        cy.get('#Id').type(daneTestowe.numer12345)
        // Nr porozumienia
        cy.get('#AgreementNumber').type(daneTestowe.numer12345)
        // Nazwa audycji TV
        cy.get('#AuditionName').type(daneTestowe.numer12345)
        // SAP / ID audycji
        cy.get('#OrderSAP').type('01.12.2023')
        // Jednostka zamawiająca
        cy.get('#select2-OrganizationUnitId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Biuro Programowe')
        cy.get('.select2-results__option').should('contain', 'Biuro Programowe').click()
        cy.get('#select2-OrganizationUnitId-container').should('have.text', '×Biuro Programowe').and('be.visible')
        // Wydział
        cy.get('#select2-DepartmentId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wydział postprodukcji (montaż)')
        cy.get('#select2-DepartmentId-results').should('contain', 'Wydział postprodukcji (montaż)').click()
        cy.get('#select2-DepartmentId-container').should('have.text', '×Wydział postprodukcji (montaż)').and('be.visible')
        // Id rezerwacji
        cy.get('#SectionId').type(daneTestowe.numer12345)
        // Tryb produkcji
        cy.get('#ProductionMode').select('Z - Zwykły', {force: true})
        // Pokaż zdjęte z anteny checkbox
        cy.get('#ShowRemoved').click()
        // Ukryj zrealizowane checkbox
        cy.get('#HideExecuted').click()
        cy.log('Klikam button Wyczyść filtry wyszukiwania')
        e501.wyczyscFiltryPrzycisk().first().click()

        // 2. Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: 
        //   Status rezerwacji - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Osoba zamawiająca - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Kierownik projektu - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Miejsce realizacji - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Usługa - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Sprzęt - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Data realizacji od - możliwość wyboru daty, Data realizacji do - możliwość wyboru daty, 
        //   Data zamów.. od - możliwość wyboru daty, Data zamów. do - możliwość wyboru daty, 
        //   Rezerwacja wstępna (checkbox), Zamówienie (checkbox), Typ rezerwacji (lista rozwijana)
        //   Wszystkie wymienione pola są widoczne na zaawansowanym widoku ekranu wniosków oraz są
        //   możliwe do edycji zgodnie z założeniami.
        cy.log('Krok 2 - Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: Status rezerwacji - możliwość wyboru wiersza z listy rozwijalnej (tekst) Osoba zamawiająca - możliwość wyboru wiersza z listy rozwijalnej (tekst), Kierownik projektu - możliwość wyboru wiersza z listy rozwijalnej (tekst), Miejsce realizacji - możliwość wyboru wiersza z listy rozwijalnej (tekst), Usługa - możliwość wyboru wiersza z listy rozwijalnej (tekst), Sprzęt - możliwość wyboru wiersza z listy rozwijalnej (tekst), Data realizacji od - możliwość wyboru daty, Data realizacji do - możliwość wyboru daty, Data zamów.. od - możliwość wyboru daty, Data zamów. do - możliwość wyboru daty, Rodzaj rezerwacji (lista rozwijana)')
        e501.sprawdzFiltryZaawansowane()       

        // 3. Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie wniosku. 
        //   Kliknij button "Wyszukaj".
        //   Rekordy na liście wniosków zostały zawężone zgodnie z podanymi przez użytkownika danymi.
        cy.log('Krok 3 - Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie wniosku. Kliknij button "Wyszukaj".')
        // Id wniosku
        cy.get('#Id').type('2000008') 
        // Nazwa audycji TV
        cy.get('#AuditionName').type('LEŚNICZÓWKA V SERIA ODC. 348 - 429')
        // Jednostka zamawiająca
        cy.get('#select2-OrganizationUnitId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Biuro Programowe')
        cy.get('.select2-results__option').should('contain', 'Biuro Programowe').click()
        cy.get('#select2-OrganizationUnitId-container').should('have.text', '×Biuro Programowe').and('be.visible')
        // Wydział
        cy.get('#select2-DepartmentId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Wydział postprodukcji (montaż)')
        cy.get('.select2-results__option').should('contain', 'Wydział postprodukcji (montaż)').click()
        cy.get('#select2-DepartmentId-container').should('have.text', '×Wydział postprodukcji (montaż)').and('be.visible')
        // Id rezerwacji
        cy.get('#SectionId').type('2000009') 
        // Pokaż zdjęte z anteny checkbox
        cy.get('#ShowRemoved').click()
        // Ukryj zrealizowane checkbox
        cy.get('#HideExecuted').click()
        // Status rezerwacji
        cy.get('#select2-OrderStatusId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Do realizacji')
        cy.get('.select2-results__option').should('contain', 'Do realizacji').click()
        cy.get('#select2-OrderStatusId-container').should('have.text', '×Do realizacji').and('be.visible')
        // Tryb produkcji
        cy.get('#ProductionMode').select('Z - Zwykły', {force: true})
        e501.zaaawansowanePrzycisk().click()
        // Data realizacji od
        cy.get('input#ExecutionDateFrom').type('12.01.2021')
        // Data realizacji do
        cy.get('input#ExecutionDateTo').type('18.04.2021')
        // Rodzaj rezerwacji
        cy.get('.select2-search__field').click()
        cy.get('.select2-results__options').should('contain', 'Zamówienie').click()
        // Data zamów. od
        cy.get('input#OrderDateFrom').clear().type('02.01.2021')
        // Data zamów. do
        cy.get('input#OrderDateTo').type('26.02.2025')
        
        cy.log('Klikam button Wyszukaj')
        e501.wyszukajPrzycisk().first().click()

        cy.log('Weryfikuję czy rekordy na liście wniosków zostały zawężone zgodnie z podanymi przez użytkownika danymi.')
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(1)').should('have.text', '2000008')
        e501.zaaawansowanePrzycisk().click()
        // Nr porozumienia
        cy.get('#AgreementNumber').type('P/1860/AKFiS/2020')
        // SAP / ID audycji
        cy.get('#OrderSAP').type(daneTestowe.numer12345)
        // Osoba zamawiająca 
        cy.get('#select2-OrderUserId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('test_user_12')
        cy.get('.select2-results__option').should('contain', 'test_user_12').click()
        cy.get('#select2-OrderUserId-container').should('have.text', '×test_user_12, Imię_12 (test_user_12)').and('be.visible')
        // Kierownik projektu
        cy.get('#select2-ProjectManagerId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('test_user_11 Imię_11 (test_user_11)')
        cy.get('.select2-results__option').should('contain', 'test_user_11 Imię_11 (test_user_11)').click()
        cy.get('#select2-ProjectManagerId-container').should('have.text', '×test_user_11 Imię_11 (test_user_11)').and('be.visible')
        // Miejsce realizacji
        cy.get('#select2-ExectuionPlaceId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('hala ATM A')
        cy.get('.select2-results__option').should('contain', 'hala ATM A').click()
        cy.get('#select2-ExectuionPlaceId-container').should('have.text', '×hala ATM A').and('be.visible')
        // Usługa
        cy.get('#select2-ServiceId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('asystent operatora dźwięku')
        cy.get('.select2-results__option').should('contain', 'ASYSTENT OPERATORA DŹWIĘKU').first().click()
        cy.get('#select2-ServiceId-container').should('have.text', '×ASYSTENT OPERATORA DŹWIĘKU').and('be.visible')
        // Sprzęt
        cy.get('#select2-EquipmentId-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Generator znaków')
        cy.get('.select2-results__option').should('contain', 'Generator znaków').click()
        cy.get('#select2-EquipmentId-container').should('have.text', '×Generator znaków').and('be.visible')
        // Typ rezerwacji
        cy.get('ul > .select2-selection__clear').click()
        cy.get('.select2-search__field').click()
        cy.get('.select2-results__options').contains('Rezerwacja wstępna').click()
        cy.get('.select2-selection__choice').should('have.attr', 'title', 'Rezerwacja wstępna').and('be.visible')
        cy.log('Weryfikuję czy wyświetla się pusta lista wniosków o przydzielenie zasobów')
        e501.wyszukajPrzycisk().click()
        cy.get('.dataTables_empty').should('have.text', 'Brak danych').and('be.visible')

        // 4. Kliknij na przycisk "Wyczyść filtry wyszukiwania".
        //   Dane wprowadzone do filtrów zostają usunięte. Następuje ponowne wyszukanie listy wniosków, 
        //   owocujące pełną listą wniosków dostępnych do wglądu użytkownika. 
        cy.log('Krok 4 - Kliknij na przycisk "Wyczyść filtry wyszukiwania".')
        e501.wyczyscFiltryPrzycisk().first().click()
        cy.log('Sprawdzam czy wyświetla się pełna lista wniosków')
        cy.get('input#HideExecuted').click()
        e501.wyszukajPrzycisk().first().click() 
        cy.get('#progressBar').should('not.be.visible', {timeout: 20000})
        cy.get('.dataTables_scrollBody').should('be.visible')
        // cy.get('#orderList_table_wrapper > div:nth-child(1) > div > div.DTFC_ScrollWrapper > div.DTFC_LeftWrapper > div.DTFC_LeftBodyWrapper > div > table > tbody > tr:nth-child(2)').should('be.visible')
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e501.zaaawansowanePrzycisk().click()
        cy.get('#Id').should('have.text', '').and('be.visible')
        cy.get('#AgreementNumber').should('have.text', '').and('be.visible')
        cy.get('#AuditionName').should('have.text', '').and('be.visible')
        cy.get('#OrderSAP').should('have.text', '').and('be.visible')
        cy.get('#select2-OrganizationUnitId-container').should('have.text', 'Jednostka zamawiająca').and('be.visible')
        cy.get('#select2-DepartmentId-container').should('have.text', 'Wydział').and('be.visible')
        cy.get('#SectionId').should('have.text', '').and('be.visible')
        cy.get('#select2-OrderStatusId-container').should('have.text', 'Status rezerwacji').and('be.visible')
        cy.get('input#ExecutionDateFrom').should('have.text', '').and('be.visible')
        cy.get('input#ExecutionDateTo').should('have.text', '').and('be.visible')
        cy.get('#select2-OrderUserId-container').should('have.text', 'Osoba zamawiająca').and('be.visible')
        cy.get('#select2-ProjectManagerId-container').should('have.text', 'Kierownik projektu').and('be.visible')
        cy.get('#select2-ExectuionPlaceId-container').should('have.text', 'Miejsce realizacji').and('be.visible')
        cy.get('#select2-ServiceId-container').should('have.text', 'Usługa').and('be.visible')
        cy.get('#select2-EquipmentId-container').should('have.text', 'Sprzęt').and('be.visible')
        cy.get('.select2-search__field').should('have.text', '').and('be.visible')
        cy.get('input#OrderDateFrom').should('have.text', '').and('be.visible')
        cy.get('input#OrderDateTo').should('have.text', '').and('be.visible')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})