import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e30 } from '../../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e32 } from '../../../../POM/Zaangazowanie/E32 Zamowienia ZakupUsluga i Hotel - szczegoly'

describe('SEPP-1127 Dodanie zamówienia - Hotel', function () {
    it('Dodanie zamówienia - Hotel', function () {
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

        // Klikniecie przycisku 'Zakup/usługa'
        cy.log('Krok 2 - klikniecie w przycisk "Zakup/usługa"')
        e30.popupHotelPrzycisk().click()
        e32.sprawdzURL()
        e32.sprawdzWidok()

        // asercje do przycisków
        e32.sprawdzOperacje()

        // asercje do pól (wersja dla użytkownika przypisanego tylko do jednej agencji)
        e32.sprawdzWartosciHotel('AKFiS')

        // Klikniecie przycisku 'Zapisz'
        cy.log('Krok 3 - Klikniecie w przycisk "Zapisz"')
        e32.zapiszPrzycisk().click()

        // asercje na komunikaty
        e32.sprawdzWalidacjeHotel()

        // Wypełnienie pola "Nr"
        cy.log('Krok 4 - Wypełnienie pola "Nr"')
        e32.wypelnijNrPorozumienia('P/1001732/AKFiS/2021', '2000004')

        // asercje na autowypełnienie
        e32.kosztorysLista().should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')
        e32.nrWewnLista().should('contain', '096/AKFIS/2019')
        e32.nrPorozumieniaLista().select([], {force: true})

        // Wypełnienie pola "Kosztorys"
        cy.log('Krok 5 - Wypełnienie pola "Kosztorys"')
        e32.wypelnijNrKosztorysu('POROZUMIENIE DO TESTÓW AUTO - 1126', '2000004')

        // asercje na autowypełnienie
        e32.nrPorozumieniaLista().should('contain', 'P/1001732/AKFiS/2021')
        e32.nrWewnLista().should('contain', '096/AKFIS/2019')
        e32.kosztorysLista().select([], {force: true})

        // Wypełnienie pola "Nr Wewn.
        cy.log('Krok 6 - Wypełnienie pola "Nr Wewn."')
        e32.wypelnijNrWewn('096/AKFIS/2019')

        // asercje na autowypełnienie
        e32.nrPorozumieniaLista().should('contain', 'P/1001732/AKFiS/2021')
        e32.kosztorysLista().should('contain', '2000004 - POROZUMIENIE DO TESTÓW AUTO - 1126')

        // Wypełnienie pozostałych pól.
        cy.log('Krok 7 - Wypełnienie pozostałych pól')

        // sekcja Zamówienie
        e32.wypelnijKontrahenta('ASD', '8261325231')
        e32.nettoPoleTekstowe().clear().type('10')
        e32.vatPoleTekstowe().clear().type('20')
        e32.bruttoEtykieta().click() // kliknięcie w etykietę aby oświeżyć pole 'BRUTTO'
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        e32.nettoPoleTekstowe().click()
        cy.wait(1000)
        e32.bruttoPoleTekstowe().should('have.value', '12,00 zł')
        e32.bruttoNaUmowiePrzyciskWyboru().check()
        // podanie wartości 10 w polu VAT
        e32.vatPoleTekstowe().clear().type('10')
        // sprawdzenie wartosci w polu VAT
        e32.vatPoleTekstowe().should('have.value', '10')
        // podanie wartości 12 w polu VAT
        e32.vatPoleTekstowe().clear().type('12')
        // sprawdzenie wartosci w polu VAT
        e32.vatPoleTekstowe().should('have.value', '12')
        
        // sekcja Szczegóły Noclegu
        // podanie wartości Zakopane w polu miejscowosc
        e32.miejscowoscPoleTekstowe().clear().type('Zakopane')
        // podanie wartości 5 w polu ilość osób
        e32.iloscOsobPoleTekstowe().clear().type('5')
        // podanie wartości 1 w polu koszt
        e32.kosztPoleTekstowe().clear().type('1')
        // podanie wartości 1 w polu Nr DF
        e32.nrDfPoleTekstowe().clear().type('1')
        // podanie wartości 11.11.2023 w polu Rez. od
        e32.rezerwacjaOdData().clear().type('11.11.2023')
        // podanie wartości 1 w polu Kwota
        e32.kwotaNaFakturzePoleTekstowe().clear().type('1')
        // podanie wartości Uwagi test w polu Uwagi
        e32.uwagiHotelPoleTekstowe().clear().type('Uwagi test')
        // podanie wartości 09.02.2023 w polu Zamówienie
        e32.dataZamowieniaData().clear().type('09.02.2023')
        // podanie wartości 09.02.2024 w polu Rez. do
        e32.rezerwacjaDoData().clear().type('09.02.2024')
        // podanie wartości KNF123 w polu Nr faktury
        e32.nrFakturyPoleTekstowe().clear().type('KNF123')
        // Zaznaczenie radio buttona Umowa
        e32.umowaHotelRadio().check()
        // Zaznaczenie checkoxa Czy zagr.
        e32.czyZagrPrzyciskWyboru().check()

        // Kliknięcie w przycisk "Zapisz".
        cy.log('Krok 8 - Kliknięcie w przycisk "Zapisz"')
        e32.zapiszPrzycisk().click()

        // asercja komunikatu
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano zamówienie')

        cy.log('Weryfikuję czy pojawiła się sekcja faktury')
        e32.zalaczFakturePrzycisk().should('be.visible')
        cy.log('Weryfikuję czy pojawiły się buttony: "Status zamówienia", "Kopiuj", "Zamknij zamówienie", "Załącz fakturę", "Nowa Faktura", "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika"')
        e32.statusZamowieniaPrzycisk().should('be.visible')
        e32.kopiujPrzycisk().should('be.visible')
        e32.zamknijZamowieniePrzycisk().should('be.visible')
        e32.zalaczFakturePrzycisk().should('be.visible')
        e32.nowaFakturaPrzycisk().should('be.visible')
        e32.dodajPlikDoRepoPrzycisk().should('be.visible')
        e32.dodajLinkDoZalPrzycisk().should('be.visible')

        cy.log('Weryfikuję wysłane wcześniej dane')
        // weryfikuję wartość pola bruto
        e32.bruttoPoleTekstowe().should('have.value', '12,00 zł')
        // weryfikuję wartość pola miejscowosc
        e32.miejscowoscPoleTekstowe().should('have.value', 'Zakopane')
        // weryfikuję wartość pola ilość osób
        e32.iloscOsobPoleTekstowe().should('have.value', '5')
        // weryfikuję wartość pola koszt
        e32.kosztPoleTekstowe().should('have.value', '1,00 zł')
        // weryfikuję wartość pola Nr DF
        e32.nrDfPoleTekstowe().should('have.value', '1')
        // weryfikuję wartość pola Rez. od
        e32.rezerwacjaOdData().should('have.value', '11.11.2023')
        // weryfikuję wartość pola Kwota
        e32.kwotaNaFakturzePoleTekstowe().should('have.value', '1,00 zł')
        // pweryfikuję wartość pola Uwagi
        e32.uwagiHotelPoleTekstowe().should('have.value', 'Uwagi test')
        // weryfikuję wartość pola Zamówienie
        e32.dataZamowieniaData().should('have.value', '09.02.2023')
        // weryfikuję wartość pola Rez. do
        e32.rezerwacjaDoData().should('have.value', '09.02.2024')
        // weryfikuję wartość pola Nr faktury
        e32.nrFakturyPoleTekstowe().should('have.value', 'KNF123')
        // weryfikuję zaznaczenie radio buttona Umowa
        e32.umowaHotelRadio().should('have.value', 'true')
        // weryfikuję zaznaczenie checkboxa Czy zagr.
        e32.czyZagrPrzyciskWyboru().should('have.attr', 'checked', 'checked')
        // pobranie wartości numeru zamówienia
        let numer
        e32.nrZamowieniaPoleTekstowe().invoke('attr', 'value').then((btnValue) => {
            numer = btnValue
            cy.log(numer)
        })

        // Kliknięcie w przycisk "Powrót".
        cy.log('Krok 9 - Kliknięcie w przycisk "Powrót"')
        e32.powrotPrzycisk().click()
        e30.sprawdzURL()
        cy.log('Weryfikuję czy nowo utworzone zamówienie zgadza się z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej')
        cy.get('#orderTable_table > tbody > tr:nth-child(1) > td.noHide.dtfc-fixed-left').should(($p) => {
            expect($p).to.have.text(numer)
        })
        cy.get('#orderTable_table > tbody > tr:nth-child(1) > td.date.date-set.dtfc-fixed-left').should('have.text', '09.02.2023')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(5)').should('have.text', 'H')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(6)').should('have.text', 'U')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(7)').should('have.text', 'ASD')
        cy.get('tbody > tr:nth-child(1) > td.currency.text-nowrap.initialized').should('have.text', '10,00 zł')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(9)').should('have.text', 'P/1001732/AKFiS/2021')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(10)').should('have.text', 'POROZUMIENIE DO TESTÓW AUTO - 1126')
        cy.get('tbody > tr:nth-child(1) > td:nth-child(11)').should('have.text', '1')

        // wylogowanie
        cy.logoutUser()
    })
})