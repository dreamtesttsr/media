const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e504 } = require('../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy')

describe('SEPP-1168 Lista zleceń pracy - filtrowanie', function () {
    it('Lista zleceń pracy - filtrowanie', function () {
    // strona glowna i logowanie
        cy.visit('/').loginProducent()

        // otworzenie widoku kart pracy
        cy.goToMenu('Zlecenia pracy')

        // 1. Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Numer zlecenia pracy (Tekst),
        //   Nr porozumienia (Tekst), Tytuł Audycji TV (Tekst), SAP prod. / Id audycji (Tekst),
        //   Pracownik - możliwość wyboru wiersza z listy rozwijalnej,
        //   Stan zlecenia- możliwość wyboru wiersza z listy rozwijalnej, Nr karty pracy (tekst)
        //   Odpowiednie filtry są widoczne w domyślnym widoku ekranu listy zleceń pracy.
        //   Istnieje możliwość wpisania tekstu w pola.
        cy.log(
            'Krok 1 - Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Numer zlecenia pracy (Tekst), Nr porozumienia (Tekst), Tytuł Audycji TV (Tekst), SAP prod. / Id audycji (Tekst), Pracownik - możliwość wyboru wiersza z listy rozwijalnej, Stan zlecenia- możliwość wyboru wiersza z listy rozwijalnej, Nr karty pracy (tekst)'
        )
        fWspolne.sprawdzProgressBar()
        cy.get('#WordkOrderId')
            .should('have.attr', 'title', 'Numer zlecenia pracy')
            .and('be.visible')
        cy.get('#AgreementNr')
            .should('have.attr', 'title', 'Nr porozumienia')
            .and('be.visible')
        cy.get('#AuditionName')
            .should('have.attr', 'title', 'Tytuł audycji')
            .and('be.visible')
        cy.get('#ProductionSapNumber')
            .should('have.attr','title','SAP produkcyjny audycji / SAP produkcyjny audycji Jednostki Współpracującej / Identyfikator audycji')
            .and('be.visible')
        e504.idKosztorysuPoleTekstowe().should('have.attr', 'title', 'Id kosztorysu')
            .and('be.visible')
        cy.get('#select2-UserName-container')
            .should('have.attr', 'data-original-title', 'Pracownik')
            .and('be.visible')
        cy.get('#select2-StateOfOrder-container')
            .should('have.attr', 'data-original-title', 'Stan zlecenia')
            .and('be.visible')
        cy.get('#WorkCardId')
            .should('have.attr', 'title', 'Nr karty pracy')
            .and('be.visible')
        // weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych
        cy.log('Weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych')
        // Numer zlecenia pracy
        cy.get('#WordkOrderId').type(daneTestowe.numer12345)
        // Nr porozumienia
        cy.get('#AgreementNr').type(daneTestowe.numer12345)
        // Tytuł Audycji TV
        cy.get('#AuditionName').type(daneTestowe.numer12345)
        // SAP prod. / Id audycji
        cy.get('#ProductionSapNumber').type(daneTestowe.numer12345)
        // Id kosztorysu
        e504.idKosztorysuPoleTekstowe().type(daneTestowe.numer12345)
        // Pracownik
        cy.get('#select2-UserName-container').click()
        cy.get('.select2-search__field').type('test_user_2')
        cy.get('.select2-results__option')
            .first()
            .should('contain', 'test_user_2')
            .click()
        cy.get('#select2-UserName-container')
            .should('have.text', '×test_user_2, Imię_2 (test_user_2)')
            .and('be.visible')
        // Stan zlecenia
        cy.get('#select2-StateOfOrder-container').click()
        cy.get('.select2-search__field').type('Anulowane')
        cy.get('.select2-results__option').should('contain', 'Anulowane').click()
        cy.get('#select2-StateOfOrder-container')
            .should('have.text', '×Anulowane')
            .and('be.visible')
        // Nr karty pracy
        cy.get('#WorkCardId').type(daneTestowe.numer12345)
        cy.log('Klikam button Wyczyść filtry wyszukiwania')
        e504.wyczyscFiltryPrzycisk().click()
        cy.get('div#progressBar').should('be.visible')
        fWspolne.sprawdzProgressBar()

        // 2. Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.
        //   Sekcja zaawansowanych filtrów zostaje rozwinięta.
        cy.log(
            'Krok 2 - Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.'
        )
        e504.zaawansowanePrzycisk().click()
        
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#menuFilter > div:nth-child(1) > label').should(
            'have.text',
            'Szczegóły:'
        )

        // 3. Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów:
        //   Wydział - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Stanowisko - możliwość wyboru wiersza z listy rozwijalnej (tekst), Nr ewidencyjny SAP (tekst),
        //   Nr SAP kontrahenta (tekst), Data rozpatrzenia od - możliwość wyboru daty,
        //   Data rozpatrzenia do - możliwość wyboru daty, Data realizacji od - możliwość wyboru daty,
        //   Data realizacji do - możliwość wyboru daty, Godzina realizacji od - możliwość wyboru godziny,
        //   Godzina  realizacji do - możliwość wyboru godziny, Id wniosku o przydzielenie zasobów (tekst),
        //   Os. generująca kartę pracy - możliwość wyboru wiersza z listy rozwijalnej (tekst),
        //   Grupa pracowników - możliwość wyboru wiersza z listy rozwijalnej (tekst)
        //   Wszystkie wymienione pola są widoczne na zaawansowanym widoku ekranu zleceń pracy oraz są
        //   możliwe do edycji zgodnie z założeniami.
        cy.log(
            'Krok 3 - Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: Wydział - możliwość wyboru wiersza z listy rozwijalnej (tekst), Stanowisko - możliwość wyboru wiersza z listy rozwijalnej (tekst), Nr ewidencyjny SAP (tekst), Nr SAP kontrahenta (tekst), Data rozpatrzenia od - możliwość wyboru daty, Data rozpatrzenia do - możliwość wyboru daty, Data realizacji od - możliwość wyboru daty, Data realizacji do - możliwość wyboru daty, Godzina realizacji od - możliwość wyboru godziny, Godzina  realizacji do - możliwość wyboru godziny, Id wniosku o przydzielenie zasobów (tekst), Os. generująca kartę pracy - możliwość wyboru wiersza z listy rozwijalnej (tekst), Grupa pracowników - możliwość wyboru wiersza z listy rozwijalnej (tekst)'
        )
        cy.get('#select2-Department-container')
            .should('have.attr', 'data-original-title', 'Wydział')
            .and('be.visible')
        cy.get('#select2-ServiceId-container')
            .should('have.attr', 'data-original-title', 'Stanowisko')
            .and('be.visible')
        cy.get('#RecordSap')
            .should('have.attr', 'title', 'Nr ewidencyjny SAP')
            .and('be.visible')
        cy.get('#ContractorSap')
            .should('have.attr', 'title', 'Nr SAP kontrahenta')
            .and('be.visible')
        cy.get('#DateRealisationFrom')
            .should('have.attr', 'data-original-title', 'Data rozpatrzenia od')
            .and('be.visible')
        cy.get('#DateRealisationTo')
            .should('have.attr', 'data-original-title', 'Data rozpatrzenia do')
            .and('be.visible')
        cy.get('#DateFrom')
            .should('have.attr', 'data-original-title', 'Data realizacji od')
            .and('be.visible')
        cy.get('#TimeFrom')
            .should('have.attr', 'data-original-title', 'Godzina realizacji od')
            .and('be.visible')
        cy.get('#DateTo')
            .should('have.attr', 'data-original-title', 'Data realizacji do')
            .and('be.visible')
        cy.get('#TimeTo')
            .should('have.attr', 'data-original-title', 'Godzina realizacji do')
            .and('be.visible')
        cy.get('#OnlyOvertime')
            .should('have.attr', 'data-val-required', 'The Tylko zlecenia z nadgodzinami field is required.')
            .and('be.visible')
        cy.get('#ResourceOrderId')
            .should('have.attr', 'title', 'Id wniosku o przydzielenie zasobów')
            .and('be.visible')
        cy.get('#select2-GeneratedWorkCardUserId-container')
            .should('have.attr', 'data-original-title', 'Os. generująca kartę pracy')
            .and('be.visible')
        cy.get('#select2-GroupEmployeesId-container')
            .should('have.attr', 'data-original-title', 'Grupa pracowników')
            .and('be.visible')
        cy.get('#GenerationDateFrom')
            .should('have.attr', 'data-original-title', 'Data wygenerowania od')
            .and('be.visible')
        cy.get('#GenerationDateTo')
            .should('have.attr', 'data-original-title', 'Data wygenerowania do')
            .and('be.visible')
        cy.get('#ProducerId')
            .should('have.attr', 'data-title', 'Producent')
            .and('be.visible')


        // 4. Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie zlecenia. Kliknij button "Wyszukaj".
        //   Rekordy na liście wniosków zostały zawężone zgodnie z podanymi przez użytkownika danymi.
        cy.log(
            'Krok 4 - Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie zlecenia. Kliknij button "Wyszukaj".'
        )
        // cy.get('#select2-Department-container').clear().type(daneTestowe.nazwaAudycjiWojna)
        cy.get('#select2-ServiceId-container').click()
        cy.get('.select2-search__field').type('montażysta')
        cy.get('.select2-results__option').should('contain', 'MONTAŻYSTA').first().click()
        // cy.get('#RecordSAP').clear().type('01.05.2020')
        // cy.get('#ContractorSAP').clear().type('01.05.2020')
        // cy.get('#DateRealisationFrom').clear().type('31.12.2019')
        // cy.get('#DateRealisationTo').clear().type('14.08.2021')
        cy.get('#OnlyOvertime').click()
        cy.get('#ProducerId').select('test_user_2, Imię_2', {force: true})
        cy.get('#DateFrom').clear().type('16.04.2021')
        cy.get('#TimeFrom').clear().type('00:00')
        cy.get('#DateTo').clear().type('16.04.2021') 
        cy.get('#TimeTo').clear().type('08:00')
        // cy.get('#ResourceOrderId').clear().type('01.05.2020')
        // cy.get('#select2-GeneratedWorkCardUserId-container').clear().type('01.05.2020')
        // cy.get('#select2-GroupEmployeesId-container').clear().type('01.05.2020')
        // Numer zlecenia pracy
        // cy.get('#WordkOrderId').type('41655') // 2000034	
        // Nr porozumienia
        cy.get('#AgreementNr').type('P/1001744/AKFiS/2021') 
        // Tytuł Audycji TV
        cy.get('#AuditionName').type(daneTestowe.nazwaAudycjiWojna)
        // Id kosztorysu
        e504.idKosztorysuPoleTekstowe().type('2000026')
        // Pracownik
        cy.get('#select2-UserName-container').click()
        cy.get('.select2-search__field').type('Szałańska, Anna (annsza)')
        cy.get('.select2-results__option')
            .should('contain', 'Szałańska, Anna (annsza)')
            .click()
        cy.get('#select2-UserName-container')
            .should('have.text', '×Szałańska, Anna (annsza)')
            .and('be.visible')
        // Stan zlecenia
        cy.get('#select2-StateOfOrder-container').click()
        cy.get('.select2-search__field').type('Oczekujące na akceptację')
        cy.get('.select2-results__option')
            .should('contain', 'Oczekujące na akceptację')
            .click()
        cy.get('#select2-StateOfOrder-container')
            .should('have.text', '×Oczekujące na akceptację')
            .and('be.visible')
        cy.log('Klikam button Wyszukaj')
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody').should('have.prop', 'childElementCount', 1)

        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e504.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#menuFilter > div:nth-child(1) > label').should('have.text','Szczegóły:')
        cy.get('#select2-Department-container').click()
        cy.get('.select2-search__field').type('Wydział techniki studyjnej')
        cy.get('.select2-results__option')
            .should('contain','Wydział techniki studyjnej')
            .click()
        cy.get('#select2-Department-container')
            .should('have.text','×Wydział techniki studyjnej')
            .and('be.visible')
        cy.get('#RecordSap').clear().type(daneTestowe.numer12345)
        cy.get('#ContractorSap').clear().type(daneTestowe.numer12345)
        cy.get('#ResourceOrderId').clear().type(daneTestowe.numer12345)
        cy.get('#select2-GeneratedWorkCardUserId-container').click()
        cy.get('.select2-search__field').type('test_user_2')
        cy.get('.select2-results__option')
            .first()
            .should('contain', 'test_user_2')
            .click()
        cy.get('#select2-GeneratedWorkCardUserId-container')
            .should('have.text', '×test_user_2, Imię_2 (test_user_2)')
            .and('be.visible')
        cy.get('#select2-GroupEmployeesId-container').click()
        cy.get('.select2-search__field').type('avid film')
        cy.get('.select2-results__option').should('contain', 'avid film').first().click()
        cy.get('#select2-GroupEmployeesId-container')
            .should('have.text', '×avid film')
            .and('be.visible')
        // SAP prod. / Id audycji
        cy.get('#ProductionSapNumber').clear().type(daneTestowe.numer12345)
        // Id kosztorysu
        e504.idKosztorysuPoleTekstowe().clear().type(daneTestowe.numer12345)
        // Pracownik
        cy.get('#select2-UserName-container').click()
        cy.get('.select2-search__field').type('test_user_2')
        cy.get('.select2-results__option')
            .first()
            .should('contain', 'test_user_2')
            .click()
        cy.get('#select2-UserName-container')
            .should('have.text', '×test_user_2, Imię_2 (test_user_2)')
            .and('be.visible')
        // Nr karty pracy
        cy.get('#WorkCardId').clear().type(daneTestowe.numer12345)
        cy.log('Klikam button Wyszukaj')
        e504.wyszukajPrzycisk().click()
        cy.get('.dataTables_empty')
            .should('have.text', 'Brak danych')
            .and('be.visible')
       
        // 5. Kliknij na przycisk "Wyczyść filtry wyszukiwania".
        //   Dane wprowadzone do filtrów zostają usunięte. Następuje ponowne wyszukanie listy zleceń pracy,
        //   owocujące pełną listą zleceń dostępnych do wglądu użytkownika.
        cy.log('Krok 5 - Kliknij na przycisk "Wyczyść filtry wyszukiwania".')
        e504.wyczyscFiltryPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Sprawdzam czy wyświetla się pełna lista zleceń pracy')
        cy.get('#orderList_table > tbody > tr:nth-child(1)').should('be.visible')
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e504.zaawansowanePrzycisk().click()
        cy.get('#WordkOrderId').should('have.text', '').and('be.visible')
        cy.get('#AgreementNr').should('have.text', '').and('be.visible')
        cy.get('#AuditionName').should('have.text', '').and('be.visible')
        cy.get('#ProductionSapNumber').should('have.text', '').and('be.visible')
        e504.idKosztorysuPoleTekstowe().should('have.text', '').and('be.visible')
        cy.get('#select2-UserName-container')
            .should('have.text', 'Pracownik')
            .and('be.visible')
        cy.get('#select2-StateOfOrder-container')
            .should('have.text', 'Stan zlecenia')
            .and('be.visible')
        cy.get('#WorkCardId').should('have.text', '').and('be.visible')
        cy.get('#select2-Department-container')
            .should('have.text', 'Wydział')
            .and('be.visible')
        cy.get('#select2-ServiceId-container')
            .should('have.text', 'Stanowisko')
            .and('be.visible')
        cy.get('#RecordSap').should('have.text', '').and('be.visible')
        cy.get('#ContractorSap').should('have.text', '').and('be.visible')
        cy.get('#DateRealisationFrom').should('have.text', '').and('be.visible')
        cy.get('#DateRealisationTo').should('have.text', '').and('be.visible')
        cy.get('#DateFrom').should('have.text', '').and('be.visible')
        cy.get('#TimeFrom').should('have.text', '').and('be.visible')
        cy.get('#DateTo').should('have.text', '').and('be.visible')
        cy.get('#TimeTo').should('have.text', '').and('be.visible')
        cy.get('#ResourceOrderId').should('have.text', '').and('be.visible')
        cy.get('#select2-GeneratedWorkCardUserId-container')
            .should('have.text', 'Os. generująca kartę pracy')
            .and('be.visible')
        cy.get('#select2-GroupEmployeesId-container')
            .should('have.text', 'Grupa pracowników')
            .and('be.visible')

        // Wyszukanie zleceń pracy po id kosztorysu
        e504.idKosztorysuPoleTekstowe().type('2000027') 
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(4)').should('contain.text', 'SPORT WIADOMOŚCI - KWIECIEŃ 2020')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
