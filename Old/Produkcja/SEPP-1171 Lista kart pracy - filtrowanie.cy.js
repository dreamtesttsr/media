const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')

describe('SEPP-1171 Lista kart pracy - filtrowanie', function () {
    it('Lista kart pracy - filtrowanie', function () {
    // strona glowna i logowanie
        cy.visit('/').loginProducent()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')
        fWspolne.sprawdzProgressBar()
        // 1. Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id karty (Tekst),
        //   Rodzaj karty - możliwość wyboru wiersza z listy rozwijalnej,
        //   Status karty - możliwość wyboru wiersza z listy rozwijalnej,
        //   SAP produkcyjny / SAP JW/ ID audycji (Tekst), Wydział - możliwość wyboru wiersza z listy rozwijalnej
        //   Odpowiednie filtry są widoczne w domyślnym widoku ekranu listy kart pracy. Istnieje możliwość wpisania tekstu w pola.
        cy.log(
            'Krok 1 - Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id karty (Tekst),Rodzaj karty - możliwość wyboru wiersza z listy rozwijalnej, Status karty - możliwość wyboru wiersza z listy rozwijalnej, SAP produkcyjny / SAP JW/ ID audycji (Tekst), Wydział - możliwość wyboru wiersza z listy rozwijalnej, Ukryj anulowane (Checkbox), Zlecenia pracy od-do (kalendarz), Nr porozumienia (tekst), Tytuł audycji (tekst)'
        )
        cy.get('#WorkCardId')
            .should('have.attr', 'title', 'Id karty')
            .and('be.visible')
        cy.get('#select2-WorkCardTypeId-container')
            .should('have.attr', 'data-original-title', 'Rodzaj karty')
            .and('be.visible')
        cy.get('#select2-WorkCartStatusId-container')
            .should('have.attr', 'data-original-title', 'Status karty')
            .and('be.visible')
        cy.get('#SapNumber')
            .should('have.attr', 'title', 'SAP produkcyjny / SAP JW / ID audycji / MPK')
            .and('be.visible')
        cy.get('#HideCanceled')
            .should('have.attr', 'data-original-title', 'Ukryj anulowane')
            .and('be.visible')
        cy.get('#select2-DepartmentId-container')
            .should('have.attr', 'data-original-title', 'Wydział')
            .and('be.visible')
        cy.get('#Title')
            .should('have.attr', 'title', 'Tytuł audycji')
            .and('be.visible')
        cy.get('#WorkOrdersFrom')
            .should('have.attr', 'data-original-title', 'Zlecenia pracy od')
            .and('be.visible')
        cy.get('#WorkOrdersTo')
            .should('have.attr', 'data-original-title', 'Zlecenia pracy do')
            .and('be.visible')
        cy.get('#AgreementNr')
            .should('have.attr', 'title', 'Nr porozumienia')
            .and('be.visible')
        // 2. weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych
        cy.log(
            'Krok 2 - Weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych lub odznaczenia checkboxa'
        )
        
        // Rodzaj karty
        cy.get('#select2-WorkCardTypeId-container').click()
        cy.get('.select2-search__field').type('Honoracyjna')
        cy.get('.select2-results__option').should('contain', 'Honoracyjna').click()
        cy.get('#select2-WorkCardTypeId-container')
            .should('have.text', '×Honoracyjna')
            .and('be.visible')
        // Status karty
        cy.get('#select2-WorkCartStatusId-container').click()
        cy.get('.select2-search__field').type('Przekazana do SAP')
        cy.get('.select2-results__option')
            .should('contain', 'Przekazana do SAP')
            .click()
        cy.get('#select2-WorkCartStatusId-container')
            .should('have.text', '×Przekazana do SAP')
            .and('be.visible')
        // ID karty
        cy.get('#WorkCardId').type(daneTestowe.numer12345)
        // SAP produkcyjny / SAP JW/ ID audycji (Tekst)
        cy.get('#SapNumber').type(daneTestowe.numer12345)
        // Ukryj anulowane
        cy.get('#HideCanceled').click()
        // Wydział
        cy.get('#select2-DepartmentId-container').click()
        cy.get('.select2-search__field').type(
            'Wydział techniki studyjnej'
        )
        cy.get('.select2-results__option')
            .should(
                'contain',
                'Wydział techniki studyjnej'
            )
            .click()
        cy.get('#select2-DepartmentId-container')
            .should(
                'have.text',
                '×Wydział techniki studyjnej'
            )
            .and('be.visible')
        // Tytuł audycji
        cy.get('#Title').clear().type(daneTestowe.nazwaAudycjiWojna)
        // Nr porozumienia
        cy.get('#AgreementNr').type(daneTestowe.numer12345)
        // Zlecenia pracy od-do
        cy.get('#WorkOrdersFrom').type('12.07.2021')
        cy.get('#WorkOrdersTo').type('12.07.2021')

        cy.log('Klikam button Wyczyść filtry wyszukiwania')
        e509.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // 3. Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.
        //   Sekcja zaawansowanych filtrów zostaje rozwinięta.
        cy.log(
            'Krok 3 - Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.'
        )
        e509.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#menuFilter > div:nth-child(1) > label').should(
            'have.text',
            'Szczegóły karty pracy:'
        )

        // 4. Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów:
        //   Szczegóły kart pracy: Data od - możliwość wyboru daty,
        //   Data do - możliwość wyboru daty, Pracownik - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Sprzęt - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Status zlecenia pracy - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Osoba generująca kartę pracy - (lista rozwijana)
        //   Wszystkie wymienione pola są widoczne na zaawansowanym widoku ekranu kart pracy oraz są
        //   możliwe do edycji zgodnie z założeniami.
        cy.log(
            'Krok 4 - Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: Szczegóły kart pracy: Nr porozumienia (tekst), Tytuł audycji (tekst), Data ok - możliwość wyboru daty, Data do - możliwość wyboru daty, Pracownik - możliwość wyboru wiersza z listy rozwijalnej (tekst), Sprzęt - możliwość wyboru wiersza z listy rozwijalnej (tekst), Status zlecenia pracy - możliwość wyboru wiersza z listy rozwijalnej (tekst), Osoba generująca kartę pracy - (lista rozwijana), Wydrukował - możliwość wyboru wiersza z listy rozwijalnej (tekst), Data wydrukowania od-do - możliwość wyboru daty, Producent, Miejsce realizacji'
        )
        cy.get('#DateFrom')
            .should('have.attr', 'data-original-title', 'Za okres od')
            .and('be.visible')
        cy.get('#DateTo')
            .should('have.attr', 'data-original-title', 'Za okres do')
            .and('be.visible')
        cy.get('#select2-EmployeeId-container')
            .should('have.attr', 'data-original-title', 'Pracownik')
            .and('be.visible')
        cy.get('#select2-EquipmentId-container')
            .should('have.attr', 'data-original-title', 'Sprzęt')
            .and('be.visible')
        cy.get('#select2-WorkOrderStatus-container')
            .should('have.attr', 'data-original-title', 'Status zlecenia pracy')
            .and('be.visible')
        cy.get('#select2-GeneratingEmployeeId-container')
            .should('have.attr', 'data-original-title', 'Wygenerował')
            .and('be.visible')
        cy.get('#PrintingEmployeeId')
            .should('have.attr', 'data-title', 'Wydrukował')
            .and('be.visible')
        cy.get('#PrintDateFrom')
            .should('have.attr', 'data-original-title', 'Data wydrukowania od')
            .and('be.visible')
        cy.get('#PrintDateTo')
            .should('have.attr', 'data-original-title', 'Data wydrukowania do')
            .and('be.visible')
        cy.get('#ProducerId')
            .should('have.attr', 'data-title', 'Producent')
            .and('be.visible')
        cy.get('#ExecutionPlaceId')
            .should('have.attr', 'data-title', 'Miejsce realizacji')
            .and('be.visible')
        // 5. Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie karty pracy. Kliknij button "Wyszukaj".
        //   Rekordy na liście kart pracy zostały zawężone zgodnie z podanymi przez użytkownika danymi.
        cy.log(
            'Krok 5 - Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie karty pracy. Kliknij button "Wyszukaj".'
        )
        cy.get('#DateFrom').clear().type('19.04.2020')
        cy.get('#DateTo').clear().type('01.05.2020')
        cy.get('#select2-EmployeeId-container').click()
        cy.get('.select2-search__field').type(
            'Nowakowski Konrad (70090820 / 166093)'
        )
        cy.get('.select2-results__option')
            .should('contain', 'Nowakowski Konrad (70090820 / 166093)')
            .click()
        cy.get('#select2-WorkOrderStatus-container').click()
        cy.get('.select2-search__field').type('Wycena wprowadzona')
        cy.get('.select2-results__option')
            .should('contain', 'Wycena wprowadzona')
            .click()
        cy.get('#select2-GeneratingEmployeeId-container').click()
        cy.get('.select2-search__field').type('Malinowski, Piotr (p27484)')
        cy.get('.select2-results__option')
            .should('contain', 'Malinowski, Piotr (p27484)')
            .click()
        cy.get('#PrintingEmployeeId').select('Malinowski, Piotr (p27484)', {force: true})
        cy.get('#PrintDateFrom').type('21.07.2021')
        cy.get('#PrintDateTo').type('21.07.2021')
        cy.get('#ProducerId').select('Kosson, Małgorzata', {force: true})
        cy.get('#ExecutionPlaceId').select('Studio S3', {force: true})

        cy.log('Klikam button Wyszukaj')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e509.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#menuFilter > div:nth-child(1) > label').should(
            'have.text',
            'Szczegóły karty pracy:'
        )
        cy.get('#select2-EquipmentId-container').click()
        cy.get('.select2-search__field').type('DEVA Rejestrator wielośladowy 01')
        cy.get('.select2-results__option')
            .should('contain', 'DEVA Rejestrator wielośladowy 01')
            .first()
            .click()
        cy.log('Klikam button Wyszukaj')
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.dataTables_empty')
            .should('have.text', 'Brak danych')
            .and('be.visible')

        // 6. Kliknij na przycisk "Wyczyść filtry wyszukiwania".
        //   Dane wprowadzone do filtrów zostają usunięte. Następuje ponowne wyszukanie listy kart pracy,
        //   owocujące pełną listą kart pracy dostępnych do wglądu użytkownika.
        cy.log('Krok 6 - Kliknij na przycisk "Wyczyść filtry wyszukiwania".')
        e509.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Sprawdzam czy wyświetla się pełna lista kart pracy')
        cy.get('#workCardList_table > tbody > tr:nth-child(1)', {
            timeout: 20000,
        }).should('be.visible')
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e509.zaawansowanePrzycisk().click()
        cy.get('#AgreementNr').should('have.text', '').and('be.visible')
        cy.get('#Title').should('have.text', '').and('be.visible')
        cy.get('#DateFrom').should('have.text', '').and('be.visible')
        cy.get('#DateTo').should('have.text', '').and('be.visible')
        cy.get('#select2-EmployeeId-container')
            .should('have.text', 'Pracownik')
            .and('be.visible')
        cy.get('#select2-EquipmentId-container')
            .should('have.text', 'Sprzęt')
            .and('be.visible')
        cy.get('#select2-WorkOrderStatus-container')
            .should('have.text', 'Status zlecenia pracy')
            .and('be.visible')
        cy.get('#select2-GeneratingEmployeeId-container')
            .should('have.text', 'Wygenerował')
            .and('be.visible')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
