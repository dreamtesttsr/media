import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e30 } from '../../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e32 } from '../../../../POM/Zaangazowanie/E32 Zamowienia ZakupUsluga i Hotel - szczegoly'

describe('SEPP-1126 Dodanie zamówienia - Zakup/usługa', function () {
    it('Dodanie zamówienia - Zakup/usługa', function () {
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
        e30.popupZakupUslugaPrzycisk().click()
        e32.sprawdzURL()
        e32.sprawdzWidok()

        // asercje do przycisków
        e32.sprawdzOperacje()

        // asercje do pól (wersja dla użytkownika przypisanego tylko do jednej agencji)
        e32.sprawdzWartosciZakupUsluga('AKFiS')

        let OrderNr
        e32.nrZamowieniaPoleTekstowe().then(($a) => {
            OrderNr = $a[0].getAttribute('value')
        })

        // Klikniecie przycisku 'Zapisz'
        cy.log('Krok 3 - Klikniecie w przycisk "Zapisz"')
        e32.zapiszPrzycisk().click()
        e32.popupTakPrzycisk().click()

        // asercje na komunikaty
        e32.sprawdzWalidacjeZakupUsluga()

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
        e32.nettoPoleTekstowe().click()
        e32.vatPoleTekstowe().click()
        cy.wait(2000)
        e32.bruttoPoleTekstowe().should('have.value', '12,00 zł')

        // obliczanie różnicy w datach
        var date1 = DateTime.now()
        var date2 = DateTime.now().plus({year: 2})
        const todayDate = date1.toFormat('dd.MM.yyyy') 
        const futureDate = date2.toFormat('dd.MM.yyyy')
        var days = Math.floor((date2 - date1) / 1000 / 60 / 60 / 24 + 1)

        // sekcja Szczegóły Zamówienia
        e32.rodzajLista().select('Zakupowe', {force: true})
        e32.dfPoleTekstowe().type(Math.floor(Math.random() * 1000000000))
        e32.rejestracjaData().type(todayDate)
        e32.dataZawarciaData().type(todayDate)
        e32.terminRealizacjiData().type(futureDate)
        e32.umowaZakupUslugaRadio().check()
        e32.rezerwacjaMMPrzyciskWyboru().check()
        e32.dniUmowyPoleTekstowe().should('have.value', days)

        // sekcja Wartość
        e32.dniPlatnosciPoleTekstowe().type('14')
        e32.warunekLista().select('Gotówka', {force: true})
        e32.uwagiPlatnosciPoleTekstowe().type('pole Uwagi - test')

        // Sekcja Przedmiot
        e32.przedmiotZleceniaLista().select('adaptacja obiektów', {force: true})
        e32.niestPrzedZamPoleTekstowe().type('pole Niest. przed. zam. - test')

        // sekcja Koszty
        e32.limitLista().select('PODRÓŻE SŁUŻBOWE - Podróże służbowe krajowe', {force:true})
        e32.powodPoleTekstowe().type('pole Powód - test')
        e32.nieplanowanePrzyciskWyboru().check()

        // pole Uwagi
        e32.uwagiZakupUslugaPoleTekstowe().type('pole Uwagi - test')
        // pole Opis
        e32.opisPoleTekstowe().type('pole Opis - test')

        // Zaznaczenie checkboxów w polach "BRUTTO" oraz " NETTO + VAT w kosztach" i wprowadzenie w nie danych liczbowe.
        cy.log('Krok 8 - Zaznaczenie checkboxów w polach')
        e32.nettoVatWKosztachPoleTekstowe().should('have.attr', 'readonly')
        e32.nettoVatWKosztachPrzyciskWyboru().check()
        e32.nettoVatWKosztachPoleTekstowe().should('not.have.attr', 'readonly')

        cy.scrollTo('top')
        e32.bruttoPoleTekstowe().should('have.attr', 'readonly')
        e32.bruttoNaUmowiePrzyciskWyboru().check()
        e32.bruttoPoleTekstowe().should('not.have.attr', 'readonly')

        // Kliknięcie w przycisk "Zapisz".
        cy.log('Krok 8 - Kliknięcie w przycisk "Zapisz"')
        e32.zapiszPrzycisk().click()

        // asercja komunikatu
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano zamówienie')

        // asercje dla przycisków
        e32.statusZamowieniaPrzycisk().should('be.visible')
        e32.kopiujPrzycisk().should('be.visible')
        e32.zamknijZamowieniePrzycisk().should('be.visible')
        e32.zalaczFakturePrzycisk().should('be.visible')
        e32.nowaFakturaPrzycisk().should('be.visible')
        // cy.get('div:nth-child(16)').find('fieldsetField').should('have.text','Faktury')   //TODO nie może znaleźć
        e32.dodajPlikDoRepoPrzycisk().should('be.visible')
        e32.dodajLinkDoZalPrzycisk().should('be.visible')
        // cy.get(':nth-child(13) > :nth-child(1) > .fieldsetField')

        // Kliknięcie w przycisk "Powrót".
        cy.log('Krok 9 - Kliknięcie w przycisk "Powrót"')
        e32.powrotPrzycisk().click()
        e30.sprawdzURL()
        cy.get('tbody > :nth-child(1) > .noHide').should(($p) => {
            expect($p).to.contain(OrderNr)
        })
        cy.get('tbody > :nth-child(1) > .date').should('contain', todayDate)

        // wylogowanie
        cy.logoutUser()
    })
})