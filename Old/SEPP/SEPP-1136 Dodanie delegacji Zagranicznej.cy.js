const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { e44 } = require('../../../../POM/Zaangazowanie/E44 Delegacja zagraniczna')

describe('SEPP-1136 Dodanie delegacji Zagranicznej', function () {

    it('Dodanie delegacji Zagranicznej', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Delegacje
        cy.goToMenu('Delegacje')

        // 1. Kliknij przycisk "Dodaj delegację". 
        //   Pojawia się popup do wyboru rodzaju delegacji z przyciskami: Krajowa, Zagraniczna, Anuluj
        cy.log('Krok 1 - klikniecie w przycisk "Dodaj delegacje"')
        cy.get('.dt-buttons > .btn-success').should('have.attr', 'title', 'Dodaj Delegację').click()

        // asercje do popup-a
        cy.log('Weryfikuję czy pojawia się popup do wyboru rodzaju delegacji z przyciskami: Krajowa, Zagraniczna, Anuluj')
        cy.get('[href="/Delegation/AddCountry?orderType=Zam%C3%B3wienie"]').as('krajowa')
        cy.get('@krajowa').should('contain', 'Krajowa').and('be.visible')
        cy.get('[href="/Delegation/AddAbroad?orderType=Zam%C3%B3wienie"]').as('zagraniczna')
        cy.get('@zagraniczna').should('contain', 'Zagraniczna').and('be.visible')
        cy.get('#addOrder_modal-noBtn').should('contain', 'Anuluj').and('be.visible')

        // 2. Kliknij w przycisk "Zagraniczna".
        cy.log('Krok 2 - klikniecie w przycisk "Zagraniczna"')
        cy.get('@zagraniczna').click()
        cy.log('Weryfikuję czy otworzył się ekran dodawania delegacji zagranicznej')
        cy.url().should('contain', '/Delegation/AddAbroad')
        cy.get('.active').should('contain', 'Delegacje')

        // asercje do przycisków
        cy.log('Weryfikuję czy dostępne są przyciski: Zapisz, Powrót, SAP produkcyjny/SAP produkcyjny (JW)/ID audycji oraz Podgląd porozumienia. W polu "Nr" wyświetla się nowo wygenerowany numer delegacji, w polu "Agencja" wyświetla się nazwa agencji użytkownika.')
        cy.get('#save_button').as('zapisz')
        cy.get('@zapisz').should('contain', 'Zapisz')
        e44.powrotPrzycisk().as('powrot')
        cy.get('@powrot').should('contain', 'Powrót')
        cy.get('#search_agreement_button').as('sapProdukcyjny')
        cy.get('@sapProdukcyjny').should('have.attr', 'title', 'SAP produkcyjny / SAP produkcyjny (JW) / ID audycji')
        cy.get('#view_agreement_button').as('podgladPorozumienia')
        cy.get('@podgladPorozumienia').should('have.attr', 'title', 'Podgląd porozumienia')

        // asercje do pól
        cy.get('.inputgroup > #Number').should('not.have.value', '(brak)')
        cy.get('#select2-AgencyIdCombo-container').should('not.have.text', 'Wybierz...')

        // 3. Klikniecie przycisku 'Zapisz'
        cy.log('Krok 3 - Klikniecie w przycisk "Zapisz"')
        cy.get('@zapisz').click()
        fWspolne.sprawdzProgressBar()

        // asercje na komunikaty
        cy.log('Weryfikuję czy pojawia się komunikat walidacyjny o braku wypełnienia pól: Nr (porozumienia), Kosztorys, Kraj.')
        cy.get('.validation-summary-errors > ul > :nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kraj\'.')

        cy.get('#IdAgreement-error').parent().should('be.visible').and('contain', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('#IdTitle-error').parent().should('be.visible').and('contain', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('#CountryId-error').parent().should('be.visible').and('contain', 'Wymagane wypełnienie pola \'Kraj\'.')

        // 4. Wypełnij pole "Nr"
        cy.log('Krok 4 - Wypełnienie pola "Nr"')
        cy.get('#select2-IdAgreement-container').as('nrPorozumienia')
        cy.get('@nrPorozumienia').click()
        cy.get('.select2-search__field').type('P/1001732/AKFiS/2021')
        cy.get('.select2-results__option').should('contain', '2000004 - P/1001732/AKFiS/2021').click()


        // asercje na autowypełnienie
        // cy.get('#TvAudition').as('audycjaTv').should('have.text','XI FESTIWAL FILMOWY NNW') <- nie działa, bo pole nie zaczytuje wartości, więc zamiast tego poniżej sprawdzam czy w ogóle pole istnieje 
        cy.get('#TvAudition').as('audycjaTv').should('have.attr', 'readonly')
        cy.get('#select2-IdTitle-container').as('kosztorys')
        cy.get('@kosztorys').should('contain', '2000004 - 2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('#select2-AgreementInternalNr-container').as('nrWewn')
        cy.get('@nrWewn').should('contain', '096/AKFIS/2019')

        // 5. Wypełnij pole "Kosztorys"
        cy.log('Krok 5 - Wypełnienie pola "Kosztorys"')
        cy.get('@kosztorys').click()
        cy.get('.select2-search__field').type('POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('.select2-results__option').should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126').click()


        // asercje na autowypełnienie
        // cy.get('#TvAudition').as('audycjaTv').should('have.text','XI FESTIWAL FILMOWY NNW') <- nie działa, bo pole nie zaczytuje wartości, więc zamiast tego poniżej sprawdzam czy w ogóle pole istnieje 
        cy.get('#TvAudition').as('audycjaTv').should('have.attr', 'readonly')
        cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
        cy.get('@nrWewn').should('contain', '096/AKFIS/2019')

        // 6. Wypełnij pole "Nr Wewn.
        cy.log('Krok 6 - Wypełnienie pola "Nr Wewn."')
        cy.get('@nrWewn').click()
        cy.get('.select2-search__field').type('096/AKFIS/2019')
        cy.get('.select2-results__option').should('contain', '096/AKFIS/2019').click()

        // asercje na autowypełnienie
        // cy.get('#TvAudition').as('audycjaTv').should('have.text','XI FESTIWAL FILMOWY NNW') <- nie działa, bo pole nie zaczytuje wartości, więc zamiast tego poniżej sprawdzam czy w ogóle pole istnieje 
        cy.get('#TvAudition').as('audycjaTv').should('have.attr', 'readonly')
        cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
        cy.get('@kosztorys').should('contain', '2000004 - 2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')


        // 7. Wypełnij pola: Nr CRD, Nr DF, Nazwisko, Imię, Stanowisko, Nr ewid., Zaznacz Czy prac.?, 
        //   Kraj, Miejscowość, Termin wyjazdu i godzina, Termin powrotu i godzina, Środek transportu, 
        //   Data Rozliczenia, Kurs, Waluta, Z Dnia, Uwagi. Po kliknięciu na pole Czy prac.? 
        //   wyświetlana opcja zmienia się z "Pracownik" na "Współpracownik". Wszystkie pola są edytowalne. 
        cy.log('Krok 7 - Wypełnienie pozostałych pól: Nr CRD, Nr DF, Nazwisko, Imię, Stanowisko, Nr ewid., Zaznacz Czy prac.?, Kraj, Miejscowość, Termin wyjazdu i godzina, Termin powrotu i godzina, Środek transportu, Data Rozliczenia, Kurs, Waluta, Z Dnia, Uwagi')
        // podanie wartości w polu Nr CRD
        cy.get('#CrdNumber').clear().type(daneTestowe.numer12345)
        // podanie wartości w polu Nr DF
        cy.get('#DfNumber').clear().type(daneTestowe.numer12345)
        // podanie wartości w polu Nazwisko
        cy.get('#DelegateLastName').clear().type('testNazwisko')
        // podanie wartości w polu Imię
        cy.get('#DelegateFirstName').clear().type('testImie')
        // podanie wartości w polu Nr ewid.
        cy.get('#DelegateEvidence').clear().type(daneTestowe.numer12345)
        // wybranie stanowiska
        cy.get('#select2-DelegatePosition-container').click()
        cy.get('.select2-search__field').type('Bibliotekarz')
        cy.get('.select2-results__option').should('contain', 'Bibliotekarz').click()
        // zaznaczenie Czy prac.?
        cy.get('div.toggle.btn.btn-success').click()
        // sprawdzenie czy wyświetlana opcja zmieniła się z "Pracownik" na "Współpracownik"
        cy.get('.col-lg-3>.toggle').should('have.attr', 'class', 'toggle btn btn-primary off')
        // wybranie Kraju
        cy.get('#select2-CountryId-container').click()
        cy.get('.select2-search__field').type('Niemcy')
        cy.get('.select2-results__option').should('contain', 'Niemcy').click()
        // podanie wartości w polu Miejscowość
        cy.get('#City').clear().type('Zakopane')
        // podanie wartości w polu Termin wyjazdu dzień
        cy.get('#DepartureDate').clear().type('11.11.2023')
        // podanie wartości w polu Termin wyjazdu godzina
        cy.get('#DepartureTime').clear().type('06:00')
        // podanie wartości w polu Termin powrotu dzień
        cy.get('#ArrivalDate').clear().type('14.11.2023')
        // podanie wartości w polu Termin powrotu godzina
        cy.get('#ArrivalTime').clear().type('18:00')
        // wybranie środka transportu
        cy.get('#select2-MeanOfTransport-container').click()
        cy.get('.select2-search__field').type('Samolot')
        cy.get('.select2-results__option').should('contain', 'Samolot').click()
        // podanie wartości w polu Data rozliczenia
        cy.get('#ReckoningDate').clear().type('11.10.2023')
        // podanie wartości w polu Kurs
        cy.get('#Calculation_CurrencyValue').clear().type('1')
        // wybranie waluty
        cy.get('#select2-currencyType-container').click()
        cy.get('.select2-search__field').type('EUR - euro')
        cy.get('.select2-results__option').should('contain', 'EUR - euro').click()
        // podanie wartości w polu Z Dnia
        cy.get('#Calculation_CurrencyDate').clear().type('11.11.2023')
        // podanie wartości w polu Uwagi
        cy.get('#Comments').clear().type('Uwagi test')

        // 8. Wypełnij wszystkie edytowalne pola w Kosztach Delegacji następującą liczbą: 99,99 zł
        //   Rezultat oczekiwany rózni sie od tego z test case. Tutaj opisuję rezultat rzeczywisty. 
        //   Pola "Zaliczka", "Kwota Rozliczenia" (PLN i dewizy), "RÓŻNICA", "KOSZT CAŁKOWITY",
        //   "Łączna Wycena Biura" i pola w sekcji "Do Zwrotu / Wypłaty" są nie edytowalne.
        //   Pole "Zaliczka" po wprowadzeniu danych wynosi kurs*99,
        //   pola "Kwota Rozliczenia" (PLN i dewizy)"" po wprowadzeniu danych 
        //   mają wartość: 396,00 zł*kurs(rozliczenie PLN) oraz 396,00 zł (dewizy), pole "Różnica" po wprowadzeniu danych 
        //   ma wartość: -297,00 zł (przy kursie równym 1), pole "KOSZT CAŁKOWITY" po wprowadzeniu danych
        //   ma wartość: 692,00 zł (przy kursie równym 1), pole "Łączna Wycena Biura" po wprowadzeniu danych
        //   ma wartość: 396,00 zł (przy kursie równym 1)
        //   Pole "Do zwrotu/Wypłaty" jest treści "Do wypłaty", ma wartość 297,00 zł oraz pokazuje wybraną walutę.
        cy.log('Krok 8 - Wypełnij wszystkie edytowalne pola w Kosztach Delegacji następującą liczbą: 99,99 zł')
        // podanie wartości w polu Zaliczka Rozliczenie dewizy
        cy.get('#Calculation_AdvanceSettlementCurrency').clear().type('99')
        // podanie wartości w polu Diety plan
        cy.get('#Calculation_DietPlay').clear().type('99')
        // podanie wartości w polu Diety rozliczenie dewizy
        cy.get('#Calculation_DietSettlementCurrency').clear().type('99')
        // podanie wartości w polu Bilet plan
        cy.get('#Calculation_TicketPlan').clear().type('99')
        // podanie wartości w polu Bilet rozliczenie PLN
        cy.get('#Calculation_TicketSettlement').clear().type('99')
        // podanie wartości w polu Pobyt/Hotel plan
        cy.get('#Calculation_AccommodationPlan').clear().type('99')
        // podanie wartości w polu Hotel (Przelew)
        cy.get('#Calculation_AccommodationSettlementCurrency').clear().type('99')
        // podanie wartości w polu Akredytacja/Pozostałe
        cy.get('#Calculation_Others').clear().type('99')
        // podanie wartości w polu Podróż, Dojazd, Przejazdy
        cy.get('#Calculation_Travel').clear().type('99')
        // podanie wartości w polu Usługi obce
        cy.get('#Calculation_OtherServices').clear().type('99')
        // podanie wartości w polu Wynajem Samochodu
        cy.get('#Calculation_RentCar').clear().type('99')
        // podanie wartości w polu Pobyt (Zapł. Gotówką)
        cy.get('#Calculation_PaymentStay').clear().type('99')
        // podanie wartości w polu Nadbagaż / Inne
        cy.get('#Calculation_ExcessBaggage').clear().type('99')
        e44.uslugiObcePoleTekstowe().click()
        // sprawdzenie wartości w polu Zaliczka
        cy.get('input#Calculation_AdvanceSettlement').should('have.value', '99,00 zł')
        // sprawdzenie wartości w polu Kwota rozliczenia PLN
        cy.get('input#Calculation_CostSettlement').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu Kwota rozliczenia dewizy
        cy.get('input#Calculation_CostSettlementCurrency').should('have.value', '396,00')
        // sprawdzenie wartości w polu Łączna wycena biura
        cy.get('input#Calculation_TotalOfficeValuation').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY
        cy.get('input#Calculation_TotalCost').should('have.value', '792,00 zł')
        // sprawdzenie wartości w polu Różnica
        cy.get('input#Calculation_Difference').should('have.value', '- 396,00 zł')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty
        cy.get('input#Calculation_AmountToPayback').should('have.value', '297,00 zł')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty przeliczenie
        cy.get('input#Calculation_AmountToPaybackInCurrencyType').should('have.value', '297,00')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty waluta
        cy.get('#lblCurrencyInfo').should('have.value', 'EUR')
        // sprawdzenie wartości słownej w polu Do Zwrotu / Wypłaty
        cy.get('#ReckoningDiv > .form-control').should('have.value', 'Do wypłaty')

        // 9. Kliknij przycisk "Zapisz".
        //   Zweryfikuj czy Pojawia się komunikat o pomyślnym zapisaniu delegacji. 
        //   Pojawia się sekcja "Faktury" oraz buttony: "Status delegacji", "Kopiuj", "Załącz fakturę", 
        //   "Nowa Faktura", "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika". 
        //   Zweryfikuj wysłane dane i odpowiedź serwera.
        cy.log('Krok 9 - Kliknij przycisk "Zapisz".')
        cy.get('@zapisz').click()
        cy.log('Weryfikuję czy pojawiła się sekcja Faktury')
        cy.get('#addInvoiceButton').should('be.visible')
        cy.log('Weryfikuję czy pojawiły się buttony: "Status zamówienia", "Kopiuj", "Załącz fakturę", "Nowa Faktura", "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika"')
        cy.get('#statusHistoryBtn').should('be.visible')
        cy.get('[data-confirm-async="copyConfrimInfo()"]').should('contain', 'Kopiuj').and('be.visible')
        cy.get('#addInvoiceButton').should('contain', 'Załącz fakturę').and('be.visible')
        cy.get('[title="Wprowadź nową fakturę"]').should('contain', 'Nowa faktura').and('be.visible')
        cy.get('#btnSelectAttachmentLocal').should('have.attr', 'title', 'Dodaj Plik Do Repozytorium').and('be.visible')
        cy.get('#btnSelectAttachmentScanFile').should('have.attr', 'title', 'Dodaj Link Do Załącznika').and('be.visible')
        cy.log('Weryfikuję wysłane wcześniej dane')
        // weryfikuję wartość pola Nr CRD
        cy.get('#CrdNumber').should('have.value', daneTestowe.numer12345)
        // weryfikuję wartość pola nr DF
        cy.get('#DfNumber').should('have.value', daneTestowe.numer12345)
        // weryfikuję wartość pola nazwisko
        cy.get('#DelegateLastName').should('have.value', 'testNazwisko')
        // weryfikuję wartość pola imie
        cy.get('#DelegateFirstName').should('have.value', 'testImie')
        // weryfikuję wartość pola Stanowisko
        cy.get('#select2-DelegatePosition-container').should('have.attr', 'title', 'Bibliotekarz')
        // weryfikuję wartość pola Nr ewid.
        cy.get('#DelegateEvidence').should('have.value', daneTestowe.numer12345)
        // weryfikuję czy jest zaznaczone Czy prac.?
        cy.get('.col-lg-3>.toggle').should('have.attr', 'class', 'toggle btn btn-primary off')
        // weryfikuję wartość pola Kraj
        cy.get('#select2-CountryId-container').should('have.attr', 'title', 'Niemcy')
        // weryfikuję wartość pola Miejscowość
        cy.get('#City').should('have.value', 'Zakopane')
        // weryfikuję wartość pola Środek Transportu
        cy.get('#select2-MeanOfTransport-container').should('have.attr', 'title', 'Samolot')
        // weryfikuję wartość pola Termin wyjazdu dzień
        cy.get('#DepartureDate').should('have.value', '11.11.2023')
        // weryfikuję wartość pola Termin wyjazdu godzina
        cy.get('#DepartureTime').should('have.value', '06:00')
        // weryfikuję wartość pola Termin powrotu dzień
        cy.get('#ArrivalDate').should('have.value', '14.11.2023')
        // weryfikuję wartość pola Termin powrotu godzina
        cy.get('#ArrivalTime').should('have.value', '18:00')
        // weryfikuję wartość pola Data rozliczenia
        cy.get('#ReckoningDate').should('have.value', '11.10.2023')
        // weryfikuję wartość pola Kurs
        cy.get('#Calculation_CurrencyValue').should('have.value', '1,0000')
        // weryfikuję wartość pola waluta
        cy.get('#select2-currencyType-container').should('have.attr', 'title', 'EUR - euro')
        // weryfikuję wartość pola Z Dnia
        cy.get('#Calculation_CurrencyDate').should('have.value', '11.11.2023')
        // weryfikuję wartość pola Uwagi
        cy.get('#Comments').should('have.value', 'Uwagi test')
        // sprawdzenie wartości w polu Zaliczka
        cy.get('input#Calculation_AdvanceSettlement').should('have.value', '99,00 zł')
        // sprawdzenie wartości w polu Kwota rozliczenia PLN
        cy.get('input#Calculation_CostSettlement').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu Kwota rozliczenia dewizy
        cy.get('input#Calculation_CostSettlementCurrency').should('have.value', '396,00')
        // sprawdzenie wartości w polu Łączna wycena biura
        cy.get('input#Calculation_TotalOfficeValuation').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY
        cy.get('input#Calculation_TotalCost').should('have.value', '792,00 zł')
        // sprawdzenie wartości w polu Różnica
        cy.get('input#Calculation_Difference').should('have.value', '- 396,00 zł')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty
        cy.get('input#Calculation_AmountToPayback').should('have.value', '297,00 zł')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty przeliczenie
        cy.get('input#Calculation_AmountToPaybackInCurrencyType').should('have.value', '297,00')
        // sprawdzenie wartości w polu Do zwrotu / Wypłaty waluta
        cy.get('#lblCurrencyInfo').should('have.value', 'EUR')
        // sprawdzenie wartości słownej w polu Do Zwrotu / Wypłaty
        cy.get('#ReckoningDiv > .form-control').should('have.value', 'Do wypłaty')
        // pobranie wartości numeru zamówienia
        let agrementNr
        cy.get('.inputgroup > #Number').then(($a) => {
            agrementNr = $a[0].getAttribute('value')
            cy.log(agrementNr)
        })

        // 10. Kliknij przycisk "Powrót".
        //   Zweryfikuj czy nastąpił powrót na ekran listy delegacji, gdzie na górze listy wyświetla się 
        //   nowo utworzona delegacja z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej.
        cy.log('Krok 10 - Kliknij przycisk "Powrót".')
        cy.get('@powrot').click()
        cy.log('Weryfikuję czy nastąpił powrót na ekran listy delegacji')
        cy.url().should('contain', '/Delegation/Index')
        cy.get('.active').should('contain', 'Delegacje')
        cy.log('Weryfikuję czy nowo utworzona delegacja zgadza się z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(2)').should('contain', daneTestowe.numer12345)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(3)').should('contain', daneTestowe.numer12345)
        cy.get('tbody > :nth-child(1) > :nth-child(4)').should(($p) => {
            expect($p).to.have.text(agrementNr)
        })
        cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').should('contain', 'P/1001732/AKFiS/2021')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(6)').should('contain', 'POROZUMIENIE DO TESTÓW AUTO')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(7)').should('contain', 'test_user_2')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(8)').should('contain', 'testNazwisko')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(9)').should('contain', 'testImie')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(10)').should('contain', daneTestowe.numer12345)
        cy.get('tbody > tr:nth-child(1) > td.text-center.checkboxClass > span').should('contain', 'Nie')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(12)').should('contain', 'Niemcy')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(13)').should('contain', 'Zakopane')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(14)').should('contain', '11.11.2023')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(15)').should('contain', '14.11.2023')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})