import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e30 } from '../../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e34 } from '../../../../POM/Zaangazowanie/E34 Zamowienia Wewnetrzne - szczegoly'

describe('SEPP-1128 Dodanie zamówienia - Wewnętrzne', function () {

    it('Dodanie zamówienia - Wewnętrzne', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Zamówienia')

        // Klikniecie przycisku 'Dodaj Zamówienie'
        cy.log('Krok 1 - klikniecie w przycisk "Dodaj Zamówienie"')
        e30.dodajZamowieniePrzycisk().click()

        // asercje do popup-a
        e30.popupZakupUslugaPrzycisk().should('be.visible')
        e30.popupHotelPrzycisk().should('be.visible')
        e30.popupWewnetrznePrzycisk().should('be.visible')
        e30.popupAnulujPrzycisk().should('be.visible')

        // 2. Kliknij w przycisk "Wewnętrzne".
        cy.log('Krok 2 - klikniecie w przycisk "Wewnętrzne"')
        e30.popupWewnetrznePrzycisk().click()
        e34.sprawdzURL()
        e34.sprawdzWidok()

        // asercje do przycisków
        e34.sprawdzOperacje()

        // asercje do pól (wersja dla użytkownika przypisanego tylko do jednej agencji)
        e34.sprawdzWartosciWewnetrzne('AKFiS')

        // Klikniecie przycisku 'Zapisz'
        cy.log('Krok 3 - Klikniecie w przycisk "Zapisz"')
        e34.zapiszPrzycisk().click()

        // asercje na komunikaty
        cy.log('Weryfikuję czy pojawia się komunikat walidacyjny o braku wypełnienia pól: Wymagane wypełnienie pola \'Jednostka TVP\'., Wymagane wypełnienie pola \'Nr\'., Wymagane wypełnienie pola \'Kosztorys\'., Wymagane wypełnienie pola \'Rodzaj\'. Na formularzu przy polach wymagających wypełnienia pojawią się specjalne oznaczenia.')
        e34.sprawdzWalidacje()

        // Wypełnienie pola "Nr"
        cy.log('Krok 4 - Wypełnienie pola "Nr"')
        e34.wypelnijNrPorozumienia('P/1001732/AKFiS/2021')

        // asercje na autowypełnienie                       
        e34.kosztorys().should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
        e34.nrWewn().should('contain', '096/AKFIS/2019')

        // Wypełnienie pola "Kosztorys"
        cy.log('Krok 5 - Wypełnienie pola "Kosztorys"')
        e34.wypelnijNrKosztorysu('POROZUMIENIE DO TESTÓW AUTO - 1126', '2000004')

        // asercje na autowypełnienie
        e34.nrPorozumienia().should('contain', 'P/1001732/AKFiS/2021')
        e34.nrWewn().should('contain', '096/AKFIS/2019')

        // Wypełnienie pola "Nr Wewn.
        cy.log('Krok 6 - Wypełnienie pola "Nr Wewn."')
        e34.wypelnijNrWewn('096/AKFIS/2019')

        // asercje na autowypełnienie
        e34.nrPorozumienia().should('contain', 'P/1001732/AKFiS/2021')
        e34.kosztorys().should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')

        // Wypełnienie pozostałych wymaganych pól.
        cy.log('Krok 7 - Wypełnienie pozostałych wymaganych pól: Koszt łącznie, Jednostka TVP, Koszt wewnętrzny, Koszt zewnętrzny, w tym wynagr., Rodzaj (Usługowe), Zaw, Termin real., Limit, Zaznacz checkbox "Nieplanowane", Powód, Uwagi, Opis')

        // obliczanie różnicy w datach
        var date1 = DateTime.now()
        var date2 = DateTime.now().plus({year: 2})
        const todayDate = date1.toFormat('dd.MM.yyyy') 
        const futureDate = date2.toFormat('dd.MM.yyyy')
        var days = Math.floor((date2 - date1) / 1000 / 60 / 60 / 24 + 1)

        // podanie wartości 3 w polu Koszt łącznie
        e34.kosztLacznie().clear().type('2')
        // podanie wartości Agencja Kreacji Rozrywki i Oprawy w polu Jednostka TVP
        e34.wypelnijJednTVP('Agencja Kreacji Rozrywki i Oprawy')
        // podanie wartości 1 w polu Koszt wewnętrzny
        e34.kosztWew().clear().type('1')
        // podanie wartości 1 w polu Koszt zewnętrzny
        e34.kosztZew().clear().type('1')
        // podanie wartości 1 w polu w tym wynagr.
        e34.wynagrodzenie().clear().type('1')
        // wybranie wartości Usługowe z listy Rodzaj
        e34.rodzaj().select('Usługowe', {force: true})
        // podanie wartości 11.11.2023 w polu Zaw.
        e34.dataZawarcia().clear().type(todayDate)
        // podanie wartości 11.11.2023 w polu Termin real.
        e34.terminRealizacji().clear().type(futureDate)
        // wybranie wartości PODRÓŻE SŁUŻBOWE - Podróże służbowe krajowe z listy Limit
        e34.limit().select('PODRÓŻE SŁUŻBOWE - Podróże służbowe krajowe', {force: true})
        // Zaznaczenie checkoxa Nieplanowane
        e34.nieplanowane().click()
        // podanie wartości Uwagi test w polu Uwagi
        e34.uwagi().clear().type('Uwagi test')
        // podanie wartości Powód test w polu Powód
        e34.powod().clear().type('Powód test')
        // podanie wartości Opis test w polu Opis
        e34.opis().clear().type('Opis test')

        // 8. Kliknij przycisk "Zapisz".
        cy.log('Krok 8 - Kliknij przycisk "Zapisz".')
        e34.zapiszPrzycisk().click()
        // asercja komunikatu
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano zamówienie')
        cy.log('Weryfikuję czy pojawiła się sekcja Lista rachunków')
        cy.get('legend.fieldsetField').contains('Lista rachunków')
        
        cy.log('Weryfikuję czy pojawiły się buttony: "Status zamówienia", "Kopiuj", "Zamknij zamówienie", "Załącz fakturę", "Nowa Faktura", "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika"')
        e34.statusZamowieniaPrzycisk().should('be.visible')
        e34.kopiujPrzycisk().should('be.visible')
        e34.zamknijZamowieniePrzycisk().should('be.visible')
        e34.zalaczRachunekPrzycisk().should('be.visible')
        e34.nowyRachunekPrzycisk().should('be.visible')
        e34.dodajPlikDoRepoPrzycisk().should('be.visible')
        e34.dodajLinkDoZalPrzycisk().should('be.visible')

        cy.log('Weryfikuję wysłane wcześniej dane')
        // weryfikuję wartość pola Jednostka TVP
        e34.jednostkaTVP().should('have.attr', 'title', 'Agencja Kreacji Rozrywki i Oprawy')
        // weryfikuję wartość pola Koszt łącznie
        e34.kosztLacznie().should('have.value', '2,00 zł')
        // weryfikuję wartość pola Koszt wewnetrzny
        e34.kosztWew().should('have.value', '1,00 zł')
        // weryfikuję wartość pola koszt zewnętrzny
        e34.kosztZew().should('have.value', '1,00 zł')
        // weryfikuję wartość pola w tym wynagr.
        e34.wynagrodzenie().should('have.value', '1,00 zł')
        // weryfikuję wartość pola Rodzaj
        e34.rodzajWartosc().should('have.attr', 'title', 'Usługowe')
        // weryfikuję wartość pola Zaw.
        e34.dataZawarcia().should('have.value', todayDate)
        // pweryfikuję wartość pola Termin real.
        e34.terminRealizacji().should('have.value', futureDate)
        // weryfikuję wartość pola Limit
        e34.limitWartosc().should('have.attr', 'title', 'PODRÓŻE SŁUŻBOWE - Podróże służbowe krajowe')
        // weryfikuję zaznaczenie checkboxa Nieplanowane
        e34.nieplanowane().should('have.attr', 'checked', 'checked')
        // weryfikuję wartość pola Powód
        e34.powod().should('have.value', 'Powód test')
        // weryfikuję wartość pola Uwagi
        e34.uwagi().should('have.value', 'Uwagi test')
        // weryfikuję wartość pola Opis
        e34.opis().should('have.value', 'Opis test')
        // pobranie wartości numeru zamówienia
        var numer
        e34.nrZamowienia().invoke('attr', 'value').then((btnValue) => {
            numer = btnValue
            cy.log(numer)
        })
        // weryfikuję wartość w polu Dni
        e34.dniUmowy().should('have.value', days)

        // 9. Kliknij przycisk "Powrót".
        //   Zweryfikuj czy nastąpił powrót na ekran listy zamówień, gdzie na górze listy wyświetla się nowo utworzone 
        //   zamówienie z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej.
        cy.log('Krok 9 - Kliknij przycisk "Powrót".')
        e34.powrotPrzycisk().click()
        cy.log('Weryfikuję czy nastąpił powrót na ekran listy zamówień')
        e30.sprawdzURL()
        e30.sprawdzWidok()
        cy.log('Weryfikuję czy nowo utworzone zamówienie zgadza się z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej')
        cy.get('#orderTable_table > tbody > tr:nth-child(1) > td:nth-child(2)').should(($p) => {
            expect($p).to.have.text(numer)
        })
        cy.get('#orderTable_table > tbody > tr:nth-child(1) > td:nth-child(3)').should('have.text', todayDate)
        cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').should('have.text', 'W')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(6)').should('have.text', 'Z')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(7)').should('have.text', 'Agencja Kreacji Rozrywki i Oprawy')
        cy.get('tbody > tr:nth-child(1) > td.currency.text-nowrap.initialized').should('have.text', '2,00 zł')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(9)').should('have.text', 'P/1001732/AKFiS/2021')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(10)').should('have.text', 'POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(11)').should('have.text', '')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})