describe('SEPP-1131 Dodanie rachunku wewnętrznego', function () {

    it('Dodanie rachunku wewnętrznego', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Rachunki wewnętrzne')

        // 1. Kliknij przycisk "Dodaj rachunek". 
        //   Otwiera się ekran dodawania rachunku wewnętrznego. Dostępne są przyciski: Zapisz, Powrót. 
        //   W polu "Agencja" wyświetla się nazwa agencji użytkownika.
        cy.log('Krok 1 - Kliknij przycisk "Dodaj rachunek"')
        cy.get('.dt-buttons > .btn-success').should('have.attr', 'title', 'Dodaj rachunek').click()

        // sprawdzenie czy otworzył się dodawania rachunku wewnętrznego
        cy.url().should('contain', '/InternalAccounts/Add')
        cy.get('.active').should('contain', 'Nowy rachunek wewnętrzny')

        // sprawdzenie czy dostępne są przyciski: Zapisz, Powrót.
        cy.get('button.btn-success').contains('Zapisz').as('zapisz')
        cy.get('@zapisz').should('have.text', 'Zapisz').and('be.visible')
        cy.get('button.return-button').as('powrot')
        cy.get('@powrot').should('have.text', 'Powrót').and('be.visible')

        // sprawdzenie czy w polu "Agencja" wyświetla się nazwa agencji użytkownika
        cy.get('#AgencyId > option').should('have.text', 'AKFiS')

        // 2. Kliknij przycisk "Zapisz". 
        //   Pojawia się komunikat walidacyjny o braku wypełnienia pól: Nr Rachunku, Data rozliczenia, 
        //   Jednostka TVP, Producent
        cy.log('Krok 2 - Kliknij przycisk "Zapisz"')
        cy.get('@zapisz').click()

        // asercje na komunikaty
        cy.log('Weryfikuję czy pojawia się komunikat walidacyjny o braku wypełnienia pól: Nr Rachunku, Data rozliczenia, Jednostka TVP, Producent')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr Rachunku\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Data Rozliczenia\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Jednostka TVP\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(4)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Producent\'.')

        // 3. Wypełnij pole "Nr Porozumienia"
        cy.log('Krok 3 - Wypełnienie pola "Nr Porozumienia"')
        cy.get('#select2-IdAgreement-container').as('nrPorozumienia')
        cy.get('@nrPorozumienia').click()
        cy.get('.select2-search__field').type('P/1001732/AKFiS/2021')
        cy.get('.select2-results__option').should('contain', '2000004 - P/1001732/AKFiS/2021').click()

        // asercje na autowypełnienie
        cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
        cy.get('#select2-IdTitle-container').as('kosztorys')
        cy.get('@kosztorys').should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('#select2-IdProducer-container').as('producent')
        cy.get('@producent').should('contain', 'test_user_2')

        // 4. Wypełnij pole "Kosztorys"
        cy.log('Krok 4 - Wypełnienie pola "Kosztorys"')
        cy.get('@kosztorys').click()
        cy.get('.select2-search__field').type('POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('.select2-results__option').should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126').click()

        // asercje na autowypełnienie
        cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
        cy.get('@kosztorys').should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('@producent').should('contain', 'test_user_2')

        // 5. Wypełnij pole "Nr Zam Wewn.""
        //   Pola "Producent". "Jednostka TVP", "Kosztorys", "Koszty łącznie", "Do zapłaty" i "Nr Porozumienia" 
        //   zostają automatycznie wypełnione danymi z wprowadzonego zamówienia wewnętrznego.
        cy.log('Krok 5 - Wypełnienie pola "Nr Zam Wewn."')
        cy.get('#select2-IdOrder-container').click()
        cy.get('.select2-search__field').type('ZW/1000658/AKFiS/2021')
        cy.get('.select2-results__option').should('contain', '2000001 - ZW/1000658/AKFiS/2021').click()

        cy.log('Sprawdzenie czy pola "Producent". "Jednostka TVP", "Kosztorys", "Koszty łącznie", "Do zapłaty" i "Nr Porozumienia" zostają automatycznie wypełnione danymi z wprowadzonego zamówienia wewnętrznego.')
        cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
        cy.get('@kosztorys').should('contain', 'POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('@producent').should('contain', 'test_user_2')
        cy.get('#select2-IdOrganizationUnit-container').should('have.attr', 'title', 'Agencja Kreacji Rozrywki i Oprawy')
        cy.get('#DebtValueNet').should('have.attr', 'value', '0')
        cy.get('#AmountLeftToPayNet').should('have.attr', 'value', '0').as('doZaplaty')

        // 6. Wypełnij wymagane pola Nr Rachunku, Data Rozliczenia, Kwota Rozliczenia, Uwagi
        //   Po wprowadzeniu "Kwoty Rozliczenia" pole "Do zapłaty" aktualizuje pokazywane dane.
        cy.log('Krok 6 - Wypełnij wymagane pola Nr Rachunku, Data Rozliczenia, Kwota Rozliczenia, Uwagi')
        cy.get('#Number').type('123456789')
        cy.get('#InvoiceDate').click().type('11.11.2023')
        let numer
        cy.get('#AmountLeftToPayNet-hidden').invoke('attr', 'value').then((btnValue) => {
            numer = btnValue
            cy.log('Sprawdzenie czy po wprowadzeniu "Kwoty Rozliczenia" pole "Do zapłaty" aktualizuje pokazywane dane')
            cy.get('#AmountNet').clear().type('1')
            cy.get('#SettlementNotes').click().type('Uwagi test')
            cy.get('#AmountLeftToPayNet-hidden').invoke('attr', 'value').then(() => {
                let result = numer - 1
                cy.get('#AmountLeftToPayNet-hidden').should('have.attr', 'value', result)
            })

            // 7. Kliknij przycisk "Zapisz".
            //   Pojawia się komunikat o pomyślnym zapisaniu rachunku, dodany jest w nagłówku numer utworzonego 
            //   rachunku wewnętrznego. Pojawia się sekcja "Załączniki" oraz buttony: "Dodaj Plik Do Repozytorium" i 
            //   "Dodaj Link Do Załącznika". Zweryfikuj wysłane dane i odpowiedź serwera.
            cy.log('Krok 7 - Kliknij przycisk "Zapisz".')
            cy.get('@zapisz').click()
            cy.log('Weryfikuję czy pojawiła się sekcja Załączniki')
            cy.get(':nth-child(1) > .fieldsetField').should('contain', 'Załączniki')
            cy.log('Weryfikuję czy pojawiły się buttony: "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika"')
            cy.get('#btnSelectAttachmentLocal').should('have.attr', 'title', 'Dodaj Plik Do Repozytorium').and('be.visible')
            cy.get('#btnSelectAttachmentScanFile').should('have.attr', 'title', 'Dodaj Link Do Załącznika').and('be.visible')
            cy.log('Weryfikuję wysłane wcześniej dane')
            // weryfikuję wartość pola Agencja
            cy.get('#select2-AgencyId-container').should('have.text', 'AKFiS')
            // weryfikuję wartość pola Jednostka TVP
            cy.get('#select2-IdOrganizationUnit-container').should('have.attr', 'title', 'Agencja Kreacji Rozrywki i Oprawy')
            // weryfikuję wartość pola Nr rachunku
            cy.get('#Number').should('have.value', '123456789')
            // weryfikuję wartość pola Data rozliczenia
            cy.get('#InvoiceDate').should('have.value', '11.11.2023')
            // weryfikuję wartość pola Koszt łącznie
            cy.get('#DebtValueNet').should('have.value', '2,00 zł')
            // weryfikuję wartość pola Kwota rozliczenia
            cy.get('#AmountNet').should('have.value', '1,00 zł')
            // weryfikuję wartość pola Do Zapłaty
            cy.get('#AmountLeftToPayNet').should('have.value', parseFloat(numer - 1).toFixed(2).replace('.',',') + ' zł') // wartość zmienna
            // weryfikuję wartość pola Uwagi
            cy.get('#SettlementNotes').should('have.value', 'Uwagi test')
            // weryfikuję wartość pola Nr porozumienia
            cy.get('@nrPorozumienia').should('contain', '2000004 - P/1001732/AKFiS/2021')
            // weryfikuję wartość pola Kosztorys
            cy.get('#select2-IdTitle-container').should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
            // weryfikuję wartość pola Producent
            cy.get('@producent').should('contain', 'test_user_2')
            // weryfikuję wartość pola Nr Zam. Wewn.
            cy.get('#select2-IdOrder-container').should('contain', '2000001 - ZW/1000658/AKFiS/2021')
        })
        // 8. Kliknij przycisk "Powrót".
        //    Zweryfikuj czy nastąpił powrót na ekran listy rachunków wewnętrznych, gdzie na górze listy 
        //    wyświetla się nowo utworzony rachunek z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej.
        cy.log('Krok 8 - Kliknij przycisk "Powrót".')
        cy.get('@powrot').click()
        cy.log('Weryfikuję czy nastąpił powrót na ekran listy rachunków wewnętrznych')
        cy.url().should('contain', '/InternalAccounts/Index')
        cy.get('.active').should('contain', 'Rachunki Wewnętrzne')
        cy.log('Weryfikuję czy nowo utworzony rachunek wewnętrzny zgadza się z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej')
        cy.get('#invoiceList_table > tbody > tr:nth-child(1) > td:nth-child(2)').should('have.text', '123456789')
        cy.get('tbody > :nth-child(1) > .date').should('have.text', '11.11.2023')
        cy.get('tbody > :nth-child(1) > .currency').should('have.text', '1,00 zł')
        cy.get('tbody > :nth-child(1) > :nth-child(5)').should('have.text', 'Agencja Kreacji Rozrywki i Oprawy')
        cy.get('tbody > :nth-child(1) > :nth-child(6)').should('have.text', 'P/1001732/AKFiS/2021')
        cy.get('tbody > :nth-child(1) > :nth-child(7)').should('have.text', 'POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('have.text', 'ZW/1000658/AKFiS/2021')
        cy.get('tbody > :nth-child(1) > :nth-child(9)').should('have.text', 'test_user_2, Imię_2')
        cy.get('tbody > :nth-child(1) > :nth-child(10)').should('have.text', 'AKFiS')

        // Wyloguj użytkownika
        cy.logoutUser()
    })
})