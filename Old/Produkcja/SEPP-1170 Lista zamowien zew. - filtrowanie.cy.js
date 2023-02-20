const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e516 } = require('../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne')

describe('SEPP-1170 Lista zamówień zew. - filtrowanie', function () {

    it('Lista zamówień zew. - filtrowanie', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKoordynatorUslugZamZew()

        // otworzenie widoku zamowień zewnętrznych
        cy.goToMenu('Zamówienia zewnętrzne')

        // zapamiętaj długość listy zamówień zewnętrznych
        cy.get('#externalOrderList_table_info').invoke('text').then((pozycje => {
            let re = /Pozycje od \d+ do \d+ z (\d+) łącznie/
            let liczbaPozycji = re.exec(pozycje)[1]
            cy.log(`Liczba pozycji: ${liczbaPozycji}`)

            cy.wrap(liczbaPozycji).as('liczbaZamowien')
        }))
        // 1. Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id wniosku o zasoby (Tekst), 
        //   Nr zamówienia (Tekst), Grupa asortymentowa - możliwość wyboru wiersza z listy rozwijalnej, 
        //   Realizacja od - możliwość wyboru daty, Realizacja do - możliwość wyboru daty, 
        //   Status - możliwość wyboru wiersza z listy rozwijalnej, Nr zamówienia PZ (Tekst), 
        //   SAP / Id.audycji (Tekst), Nazwa Audycji (Tekst), 
        //   Zakład CUP - możliwość wyboru wiersza z listy rozwijalnej, Ukryj rezerwacje (checkbox)
        //   Odpowiednie filtry są widoczne w domyślnym widoku ekranu listy kart pracy. 
        //   Istnieje możliwość wpisania tekstu w pola.
        cy.log('Krok 1 - Zweryfikuj, czy widoczne są następujące filtry na górze ekranu: Id wniosku o zasoby (Tekst), Nr zamówienia (Tekst), Grupa asortymentowa - możliwość wyboru wiersza z listy rozwijalnej, Realizacja od - możliwość wyboru daty, Realizacja do - możliwość wyboru daty, Status - możliwość wyboru wiersza z listy rozwijalnej, Nr zamówienia PZ (Tekst), SAP / Id.audycji (Tekst), Nazwa Audycji (Tekst), Zakład CUP - możliwość wyboru wiersza z listy rozwijalnej, Ukryj rezerwacje (checkbox)')
        cy.get('#OrderNumber').should('have.attr', 'title', 'Nr zamówienia').and('be.visible')
        cy.get('#ResourcesRequestId').should('have.attr', 'title', 'Id. wniosku o zasoby').and('be.visible')
        cy.get('#select2-AssortmentGroup-container').should('have.attr', 'data-original-title', 'Grupa asortymentowa').and('be.visible')
        cy.get('#RealizationStart').should('have.attr', 'data-original-title', 'Realizacja od').and('be.visible')
        cy.get('#RealizationEnd').should('have.attr', 'data-original-title', 'Realizacja do').and('be.visible')
        cy.get('#select2-OrderStatus-container').should('have.attr', 'data-original-title', 'Status').and('be.visible')
        cy.get('#OrderNumberPZ').should('have.attr', 'title', 'Nr zamówienia PZ').and('be.visible')
        cy.get('#SapNumber').should('have.attr', 'title', 'ID audycji / SAP produkcyjny / SAP usługowy / SAP emisyjny /  ID propozycji audycji / SAP produkcyjny wewnętrzny jednostki / SAP usługowy wewnętrzny jednostki').and('be.visible')
        cy.get('#AuditionName').should('have.attr', 'title', 'Nazwa audycji').and('be.visible')
        cy.get('#select2-CupDepartment-container').should('have.attr', 'data-original-title', 'Zakład CUP').and('be.visible')
        cy.get('#HideRezerwations').should('have.attr', 'data-original-title', 'Ukryj rezerwacje').and('be.visible')

        // weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych
        cy.log('Weryfikuję czy istnieje możliwość wpisania tekstu w pola oraz wyboru wiersza z list rozwijanych')
        // Nr zamówienia
        cy.get('#OrderNumber').type(daneTestowe.numer12345)
        // Id wniosku o zasoby
        cy.get('#ResourcesRequestId').type(daneTestowe.numer12345)
        // Grupa asortymentowa
        cy.get('#select2-AssortmentGroup-container').click()
        cy.get('.select2-search__field').type('sprzęt wizyjny')
        cy.get('.select2-results__option').should('contain', 'sprzęt wizyjny').click()
        cy.get('#select2-AssortmentGroup-container').should('have.text', '×sprzęt wizyjny').and('be.visible')
        // Realizacja od
        cy.get('#RealizationStart').type('11.11.2023')
        // Realizacja do
        cy.get('#RealizationEnd').type('11.12.2023')
        // Status
        cy.get('#select2-OrderStatus-container').click()
        cy.get('.select2-search__field').type('Anulowane')
        cy.get('.select2-results__option').should('contain', 'Anulowane').click()
        cy.get('#select2-OrderStatus-container').should('have.text', '×Anulowane').and('be.visible')
        // Nr zamówienia PZ
        cy.get('#OrderNumberPZ').type(daneTestowe.numer12345)
        // Sap / Id.audycji
        cy.get('#SapNumber').type(daneTestowe.numer12345)
        // Nazwa audycji
        cy.get('#AuditionName').type(daneTestowe.numer12345)  
        // Zakład CUP
        cy.get('#CupDepartment').select('Technika studyjna', {force: true})
        cy.get('#select2-CupDepartment-container').should('contain.text', 'Technika studyjna').and('be.visible')                      
        // Ukryj rezerwacje checkbox
        cy.get('#HideRezerwations').click()
        cy.log('Klikam button Wyczyść filtry wyszukiwania')
        e516.wyczyscFiltryPrzycisk().first().click()

        // 2. Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.
        //   Sekcja zaawansowanych filtrów zostaje rozwinięta.
        cy.log('Krok 2 - Kliknij na przycisk "Zaawansowane" w prawym, górnym rogu ekranu.')
        e516.zaawansowanePrzycisk().click()
        cy.log('Weryfikuję czy sekcja zaawansowanych filtrów została rozwinięta')
        cy.get('#menuFilter > div:nth-child(1) > label').should('have.text', 'Szczegóły zamówienia:')

        // 3. Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: 
        //   Szczegóły zamówienia: Oferent - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Koordynator - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Pracownik Działu Zakupów - możliwość wyboru wiersza z listy rozwijalnej (tekst), 
        //   Zamawiający- możliwość wyboru wiersza z listy rozwijalnej (tekst)
        //   Wszystkie wymienione pola są widoczne na zaawansowanym widoku ekranu zamówień  oraz są
        //   możliwe do edycji zgodnie z założeniami.
        cy.log('Krok 3 - Zweryfikuj czy następujące filtry są widoczne w rozwiniętej sekcji zaawansowanych filtrów: Oferent - możliwość wyboru wiersza z listy rozwijalnej (tekst), Koordynator - możliwość wyboru wiersza z listy rozwijalnej (tekst), Pracownik Działu Zakupów - możliwość wyboru wiersza z listy rozwijalnej (tekst), Zamawiający- możliwość wyboru wiersza z listy rozwijalnej (tekst)')
        cy.get('#select2-Orderer-container').should('have.attr', 'data-original-title', 'Zamawiający').and('be.visible')
        cy.get('#select2-CoordinatorId-container').should('have.attr', 'data-original-title', 'Koordynator').and('be.visible')
        cy.get('#select2-PurchasingDepartmentEmployeeId-container').should('have.attr', 'data-original-title', 'Pracownik Działu Zakupów').and('be.visible')
        cy.get('#select2-BidderId-container').should('have.attr', 'data-original-title', 'Oferent').and('be.visible')
       
        // 4. Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie zamówienia zewnętrznego. 
        //   Kliknij button "Wyszukaj".
        //   Rekordy na liście zamówień zew. zostały zawężone zgodnie z podanymi przez użytkownika danymi.
        cy.log('Krok 4 - Wypełnij wszystkie pola wartościami pozwalającymi na wyszukanie zamówienia zewnętrznego. Kliknij button "Wyszukaj".')
        // Nr zamówienia
        cy.get('#OrderNumber').type(daneTestowe.numer12345)
        // Id wniosku o zasoby
        cy.get('#ResourcesRequestId').type(daneTestowe.numer12345)
        // Grupa asortymentowa
        cy.get('#select2-AssortmentGroup-container').click()
        cy.get('.select2-search__field').type('sprzęt wizyjny')
        cy.get('.select2-results__option').should('contain', 'sprzęt wizyjny').click()
        cy.get('#select2-AssortmentGroup-container').should('have.text', '×sprzęt wizyjny').and('be.visible')
        // Realizacja od
        cy.get('#RealizationStart').type('11.11.2023')
        // Realizacja do
        cy.get('#RealizationEnd').type('11.12.2023')
        // Status
        cy.get('#select2-OrderStatus-container').click()
        cy.get('.select2-search__field').type('Anulowane')
        cy.get('.select2-results__option').should('contain', 'Anulowane').click()
        cy.get('#select2-OrderStatus-container').should('have.text', '×Anulowane').and('be.visible')
        // Nr zamówienia PZ
        cy.get('#OrderNumberPZ').type(daneTestowe.numer12345)
        // Sap / Id.audycji
        cy.get('#SapNumber').type(daneTestowe.numer12345)
        // Nazwa audycji
        cy.get('#AuditionName').type(daneTestowe.numer12345)  
        // Zakład CUP
        cy.get('#CupDepartment').select('Technika studyjna', {force: true})
        cy.get('#select2-CupDepartment-container').should('contain.text', 'Technika studyjna').and('be.visible')                      
        // Ukryj rezerwacje checkbox
        cy.get('#HideRezerwations').click() 
        // Zamawiający
        cy.get('#select2-Orderer-container').click()
        cy.get('.select2-search__field').type(' AKFiS (nieokreślony)')
        cy.get('.select2-results__option').should('contain', ' AKFiS (nieokreślony)').click() //  BZKL (nieokreślony)
        cy.get('#select2-Orderer-container').should('have.text', '×AKFiS (nieokreślony) AKFiS (nieokreślony)').and('be.visible') // x BZKL (nieokreślony)            
        // Koordynator
        cy.get('#select2-CoordinatorId-container').click()
        cy.get('.select2-search__field').type('Barbara Ponikowska')
        cy.get('.select2-results__option').should('contain', 'Barbara Ponikowska').click()
        cy.get('#select2-CoordinatorId-container').should('have.text', '×Barbara Ponikowska').and('be.visible')
        // Pracownik Działu Zakupów
        cy.get('#select2-PurchasingDepartmentEmployeeId-container').click()
        cy.get('.select2-search__field').type('Iwona Bielska')
        cy.get('.select2-results__option').should('contain', 'Iwona Bielska').click()
        cy.get('#select2-PurchasingDepartmentEmployeeId-container').should('be.visible').and('include.text', 'Iwona Bielska')
        // Oferent
        cy.get('#select2-BidderId-container').click()
        cy.get('.select2-search__field').type('A&M DRUK  SP.J.')
        cy.get('.select2-results__option').should('contain', 'A&M DRUK  SP.J.').click()
        cy.get('#select2-BidderId-container').should('have.text', '×A&M DRUK  SP.J.').and('be.visible')
        cy.log('Klikam button Wyszukaj')
        e516.wyszukajPrzycisk().click()
        cy.get('#externalOrderList_table > tbody > tr > td').should('have.text', 'Brak danych').and('be.visible')

        // 5. Kliknij na przycisk "Wyczyść filtry wyszukiwania".
        //   Dane wprowadzone do filtrów zostają usunięte. Następuje ponowne wyszukanie listy zamówień zew., 
        //   owocujące pełną listą zamówień zew. dostępnych do wglądu użytkownika. 
        cy.log('Krok 5 - Kliknij na przycisk "Wyczyść filtry wyszukiwania".')
        e516.wyczyscFiltryPrzycisk().first().click()
        cy.log('Sprawdzam czy wyświetla się pełna lista zamówień zewnętrznych')
        cy.get('#externalOrderList_table > tbody > tr:nth-child(1)').should('be.visible')
        cy.log('Rozwijam sekcję zaawansowanych filtrów')
        e516.zaawansowanePrzycisk().click()
        cy.get('#select2-Orderer-container').should('have.text', 'Zamawiający').and('be.visible')
        cy.get('#select2-CoordinatorId-container').should('have.text', 'Koordynator').and('be.visible')
        cy.get('#select2-PurchasingDepartmentEmployeeId-container').should('have.text', 'Pracownik Działu Zakupów').and('be.visible')
        cy.get('#select2-BidderId-container').should('have.text', 'Oferent').and('be.visible')
        cy.get('#externalOrderList_table_info').invoke('text').then((pozycje => {
            let re = /Pozycje od \d+ do \d+ z (\d+) łącznie/
            let liczbaPozycji = re.exec(pozycje)[1]
            cy.log(`Liczba pozycji: ${liczbaPozycji}`)
            expect(liczbaPozycji).to.be.equal(this.liczbaZamowien)
        }))

        // 6. Wypełniam pole "Koordynator" i wyszukuje kilikam na "Wyszukaj"
        // Klikam na "Podgląd" przy wyszukanym wierszu
        // W oknie szczegółów weryfikuję czy na liście koordynatorów znajduje się koordynator, dla którego zostało wykonane zapytanie
        // W sekcji "Powiązane rezerwacje" weryfikuje wartość w kolumnie "Status rezerwacji"
        e516.koordynatorLista().select('Imię_18 test_user_18', {force: true})
        cy.get('#select2-CoordinatorId-container').should('have.attr','title','Imię_18 test_user_18')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.podgladPierwszyPrzycisk().click()
        cy.get('#AgreementTableId > tbody > tr > td:nth-child(3)').should('be.visible').and('contain.text', 'Imię_18 test_user_18')
        cy.get('#externalRequestList_table > tbody > tr > td.breakWord.text-center').should('be.visible').and('contain', 'Do realizacji')
                
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})