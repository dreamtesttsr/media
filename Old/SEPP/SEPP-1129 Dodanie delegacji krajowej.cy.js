const { daneTestowe } = require('../../../../fixtures/daneTestowe')
const { e42 } = require('../../../../POM/Zaangazowanie/E42 Delegacja krajowa')

describe('SEPP-1129 Dodanie delegacji krajowej', function () {

    it('Dodanie delegacji krajowej', function () {
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

        // 2. Kliknij w przycisk "Krajowa".
        cy.log('Krok 2 - klikniecie w przycisk "Krajowa"')
        cy.get('@krajowa').click()
        cy.log('Weryfikuję czy otworzył się ekran dodawania delegacji krajowej i pokazał się sugerowany Nr delegacji')
        cy.url().should('contain', '/Delegation/AddCountry')
        cy.get('.active').should('contain', 'Delegacje')
        cy.get('#get').should('not.be.empty')

        // asercje do przycisków
        cy.log('Weryfikuję czy dostępne są przyciski: Zapisz, Powrót, SAP produkcyjny/SAP produkcyjny (JW)/ID audycji oraz Podgląd porozumienia. W polu "Nr" wyświetla się nowo wygenerowany numer delegacji, w polu "Agencja" wyświetla się nazwa agencji użytkownika.')
        cy.get('#save_button').as('zapisz')
        cy.get('@zapisz').should('contain', 'Zapisz')
        e42.powrotPrzycisk().as('powrot')
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

        // asercje na komunikaty
        cy.log('Weryfikuję czy pojawia się komunikat walidacyjny o braku wypełnienia pól: Nr (porozumienia), Kosztorys.')
        cy.get('.validation-summary-errors > ul').should('be.visible').and('contain.text', 'Wymagane wypełnienie pola \'Nr\'.').and('contain.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('#IdAgreement-error').parent().should('be.visible').and('contain','Wymagane wypełnienie pola \'Nr\'.')
        cy.get('#IdTitle-error').parent().should('be.visible').and('contain', 'Wymagane wypełnienie pola \'Kosztorys\'.')

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
        //   Miejscowość, Termin wyjazdu i godzina, Termin powrotu i godzina, Środek transportu, 
        //   Data Rozliczenia, Uwagi. Po kliknięciu na pole Czy prac.? wyświetlana opcja zmienia się z 
        //   "Pracownik" na "Współpracownik". Wszystkie pola są edytowalne. 
        cy.log('Krok 7 - Wypełnienie pozostałych pól: Nr CRD, Nr DF, Nazwisko, Imię, Stanowisko, Nr ewid., Zaznacz Czy prac.?, Miejscowość, Termin wyjazdu i godzina, Termin powrotu i godzina, Środek transportu, Data Rozliczenia, Uwagi')
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
        // podanie wartości w polu Uwagi
        cy.get('#Comments').clear().type('Uwagi test')

        // 8. Wypełnij wszystkie edytowalne pola w Kosztach Delegacji następującą liczbą: 99,99 zł
        //   Rezultat oczekiwany rózni sie od tego z test case. Pola "RAZEM Przejazdy i Dojazdy",  
        //   "KOSZT CAŁKOWITY" oraz wszystkie w kolumnie 
        //   "PLAN - ROZLICZENIE" i "Do Zwrotu / Wypłaty" są nie edytowalne. Wszystkie pola "PLAN - ROZLICZENIE" 
        //   po wprowadzeniu danych wynoszą 0 zł, pola "RAZEM Przejazdy i Dojazdy" po wprowadzeniu danych 
        //   mają wartość: 198,00 zł, pola "KOSZT CAŁKOWITY" po wprowadzeniu danych 
        //   mają wartość: 396,00 zł, 495,00 zł oraz -99.00 zł.
        //   Pole "Do zwrotu/Wypłaty" jest treści "Do wypłaty" i ma wartość 396,00 zł.
        cy.log('Krok 8 - Wypełnij wszystkie edytowalne pola w Kosztach Delegacji następującą liczbą: 99,99 zł')
        // podanie wartości w polu Koszt przejazdu plan
        cy.get('#Calculation_PlannedRideCost').clear().type('99')
        // podanie wartości w polu Koszt przejazdu rozliczenie
        cy.get('#Calculation_ReckoningRideCost').clear().type('99')
        // podanie wartości w polu Ryczałt na dojazdy plan
        cy.get('#Calculation_PlannedRideLumpSum').clear().type('99')
        // podanie wartości w polu Ryczałt na dojazdy rozliczenie
        cy.get('#Calculation_ReckoningRideLumpSum').clear().type('99')
        // podanie wartości w polu Noclegi ryczałt plan
        cy.get('#Calculation_PlannedOvernightLumpSum').clear().type('99')
        // podanie wartości w polu Noclegi ryczałt rozliczenie
        cy.get('#Calculation_ReckoningOvernightLumpSum').clear().type('99')
        // podanie wartości w polu inne wydatki plan
        cy.get('#Calculation_PlannedOtherCosts').clear().type('99')
        // podanie wartości w polu inne wydatki rozliczenie
        cy.get('#Calculation_ReckoningOtherCosts').clear().type('99')
        // podanie wartości w polu Dieta
        cy.get('#Calculation_Diet').clear().type('99')
        // podanie wartości w polu Kwota zaliczki
        cy.get('#Calculation_AdvancePayment').clear().type('99')
        cy.get('#Calculation_Diet').click()
        // sprawdzenie wartości w polu Koszt przejazdu plan-rozliczenie
        cy.get('#Calculation_DifferenceRideCost').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Ryczałt na dojazdy plan-rozliczenie
        cy.get('#Calculation_DifferenceRideLumpSum').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Noclegi ryczałt plan-rozliczenie
        cy.get('#Calculation_DifferenceOvernightLumpSum').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Inne wydatki plan-rozliczenie
        cy.get('#Calculation_DifferenceOtherCosts').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu RAZEM Przejazdy i Dojazdy plan
        cy.get('#Calculation_PlannedAllRides').should('have.value', '198,00 zł')
        // sprawdzenie wartości w polu RAZEM Przejazdy i Dojazdy rozliczenie
        cy.get('#Calculation_ReckoningAllRides').should('have.value', '198,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY plan
        cy.get('#Calculation_PlannedAllCosts').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY rozliczenie
        cy.get('#Calculation_ReckoningAllCosts').should('have.value', '495,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY plan-rozliczenie
        cy.get('#Calculation_DifferenceAllCosts').should('have.value', '-99,00 zł')
        // sprawdzenie wartości kwoty w polu Do Zwrotu / Wypłaty
        cy.get('#Calculation_DelegationCost').should('have.value', '396,00 zł')
        // sprawdzenie wartości słownej w polu Do Zwrotu / Wypłaty
        cy.get('#ReckoningDiv > input').should('have.value', 'Do wypłaty')

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
        // weryfikuję wartość pola Miejscowość
        cy.get('#City').should('have.value', 'Zakopane')
        // weryfikuję wartość pola Środek Transportu
        cy.get('#select2-MeanOfTransport-container').should('have.attr', 'title', 'Samolot')
        // weryfikuję wartość pola Termin wyjazdu dzien
        cy.get('#DepartureDate').should('have.value', '11.11.2023')
        // weryfikuję wartość pola Termin wyjazdu godzina
        cy.get('#DepartureTime').should('have.value', '06:00')
        // weryfikuję wartość pola Termin powrotu dzien
        cy.get('#ArrivalDate').should('have.value', '14.11.2023')
        // weryfikuję wartość pola Termin powrotu godzina
        cy.get('#ArrivalTime').should('have.value', '18:00')
        // weryfikuję wartość pola Data rozliczenia
        cy.get('#ReckoningDate').should('have.value', '11.10.2023')
        // weryfikuję wartość pola Uwagi
        cy.get('#Comments').should('have.value', 'Uwagi test')
        // sprawdzenie wartości w polu Koszt przejazdu plan-rozliczenie
        cy.get('#Calculation_DifferenceRideCost').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Ryczałt na dojazdy plan-rozliczenie
        cy.get('#Calculation_DifferenceRideLumpSum').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Noclegi ryczałt plan-rozliczenie
        cy.get('#Calculation_DifferenceOvernightLumpSum').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu Inne wydatki plan-rozliczenie
        cy.get('#Calculation_DifferenceOtherCosts').should('have.value', '0,00 zł')
        // sprawdzenie wartości w polu RAZEM Przejazdy i Dojazdy plan
        cy.get('#Calculation_PlannedAllRides').should('have.value', '198,00 zł')
        // sprawdzenie wartości w polu RAZEM Przejazdy i Dojazdy rozliczenie
        cy.get('#Calculation_ReckoningAllRides').should('have.value', '198,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY plan
        cy.get('#Calculation_PlannedAllCosts').should('have.value', '396,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY rozliczenie
        cy.get('#Calculation_ReckoningAllCosts').should('have.value', '495,00 zł')
        // sprawdzenie wartości w polu KOSZT CAŁKOWITY plan-rozliczenie
        cy.get('#Calculation_DifferenceAllCosts').should('have.value', '-99,00 zł')
        // sprawdzenie wartości kwoty w polu Do Zwrotu / Wypłaty
        cy.get('#Calculation_DelegationCost').should('have.value', '396,00 zł')
        // sprawdzenie wartości słownej w polu Do Zwrotu / Wypłaty
        cy.get('#ReckoningDiv > input').should('have.value', 'Do wypłaty')
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
        cy.get('tbody > tr:nth-child(1) > td.text-center.checkboxClass > [checked=""]').should('be.visible')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(12)').should('contain', 'Polska')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(13)').should('contain', 'Zakopane')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(14)').should('contain', '11.11.2023')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(15)').should('contain', '14.11.2023')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})