import { DateTime } from 'luxon'
import { e35 } from '../../../../POM/Rozliczenia/E35 Lista faktur'
import { e37 } from '../../../../POM/Rozliczenia/E37 Szczegoly faktury'

describe('SEPP-1147 Dodanie Faktury', function () {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')

    it('Dodanie Faktury', function () {

        cy.log('Krok 1 - Loguję się jako Pracownik Agencji')
        cy.visit('/')
            .loginPracownikAgencji()

        cy.log('Jestem na ekranie Listy faktur')
        cy.goToMenu('Faktury')

        cy.log('Krok 2 - Klikam w przycisk "Dodaj fakturę"')
        e35.dodajFakturePrzycisk().click()

        cy.log('Otwiera się ekran dodawania faktury')
        e37.sprawdzURL()
        e37.sprawdzWidok()
        // sprawdzenie czy dostępne są przyciski: Zapisz, Powrót.
        e37.zapiszPrzycisk().should('be.visible')
        e37.powrotPrzycisk().should('be.visible')
        // sprawdzenie czy w polu "Agencja" wyświetla się nazwa agencji użytkownika
        // sprawdzenie czy w polu "Data Rejestracji" wyświetla się dzisiejsza data
        e37.agencjaLista().find('option').should('contain', 'AKFiS')
        e37.dataRejestracjiData().should('have.attr', 'value', dzisiaj)

        cy.log('Krok 3 - Klikam w przycisk "Zapisz"')
        e37.zapiszPrzycisk().click()

        cy.log('Pojawiają się komunikaty walidacyjne')
        cy.log('Krok 4 - Weryfikuję czy pojawia się komunikat walidacyjny o braku wypełnienia pól: Kontrahent, Nr faktury, Data faktury, Producent')
        e37.sprawdzWalidacje()

        cy.log('Krok 5 - Wypełniam pole "Nr porozumienia"')
        e37.wypelnijNrPorozumienia('P/1001733/AKFiS/2021')

        cy.log('Pola "Kosztorys" i "Producent" powinny się automatycznie wypełnić')
        e37.nrPorozumieniaLista().should('contain', 'P/1001733/AKFiS/2021')
        e37.kosztorysLista().should('contain', '2000005 - POROZUMIENIE DO TESTÓW AUTO 1147')
        e37.producentLista().should('contain', 'test_user_2')

        cy.log('Krok 6 - Wypełniam pole "Kosztorys"')
        e37.wypelnijNrKosztorysu('POROZUMIENIE DO TESTÓW AUTO 1147', '2000005')

        cy.log('Pola "Nr porozumienia" i "Producent" powinny się automatycznie wypełnić')
        e37.nrPorozumieniaLista().should('contain', 'P/1001733/AKFiS/2021')
        e37.kosztorysLista().should('contain', '2000005 - POROZUMIENIE DO TESTÓW AUTO 1147')
        e37.producentLista().should('contain', 'test_user_2')

        cy.log('Krok 7 - Wypełniam pole "Nr zamówienia"')
        e37.wypelnijNrZamowienia('Z/1012717/AKFiS/2021', '2000002')

        cy.log('Pola "Producent", "Kontrahent", "Kosztorys", "Na Umowie NETTO", "Do Zapłaty NETTO" i "Nr Porozumienia" zostają automatycznie wypełnione danymi z wprowadzonego zamówienia')
        e37.nrPorozumieniaLista().should('contain', '2000005 - P/1001733/AKFiS/2021')
        e37.kosztorysLista().should('contain', '2000005 - POROZUMIENIE DO TESTÓW AUTO 1147')
        e37.producentLista().should('contain', 'test_user_2')
        e37.sprawdzKontrahent('EAST RIDERS HUBERT KOSTRZEWA')
        e37.sprawdzNaUmowieNetto(110)
        e37.doZaplatyNettoEtykieta().should('be.visible')

        cy.log('Krok 8 - Wypełniam resztę wymaganych pól, w tym "Kwota NETTO" oraz "VAT"')
        e37.wypelnijNrFaktury(123456789)
        e37.wypelnijDataFaktury('11.11.2023')
        e37.wypelnijDataUslugi('11.11.2023')
        e37.wypelnijDeklDataRozl('11.11.2023')
        e37.wypelnijDataRozl('11.11.2023')
        e37.wypelnijUwagiDoRozl('Uwagi do rozliczenia test')
        e37.kwotaNettoPoleTekstowe().clear().type('1')
        e37.wypelnijUwagiDoDDR('Uwagi do DDR test')
        e37.wypelnijUwagiDoDR('Uwagi do DR test')        
        let numer
        e37.doZaplatyNettoNieaktywneEtykieta().invoke('attr', 'value').then((btnValue) => {
            numer = btnValue
            e37.kwotaNettoPoleTekstowe().clear().type('2')
            e37.doZaplatyNettoEtykieta().click()
            e37.vatPoleTekstowe().clear().type('10')
        
            cy.log('Krok 9 - Klikam w inne pole')
            e37.uwagiDoDRPoleTekstowe().click()
            cy.wait(1500)
            let result = numer - 1

            cy.log('Pole "BRUTTO" automatycznie aktualizuje pokazywane dane')
            e37.doZaplatyNettoNieaktywneEtykieta().should('have.attr', 'value', result)
            e37.kwotaNettoPoleTekstowe().click()
            cy.wait(2000)
            e37.bruttoNieaktywneEtykieta().should('have.attr', 'value', '2.20')

            cy.log('Krok 10 - Zaznaczam checkbox w polu "BRUTTO" i wprowadzam wartość 99,99')
            e37.bruttoPrzyciskWyboru().click()
            e37.bruttoPoleTekstowe().clear().type('99,99')

            cy.log('Krok 11 - Klikam w inne pole')
            e37.doZaplatyNettoEtykieta().click()

            cy.log('W polu "BRUTTO" wyświetla się poprawna wartość')
            e37.bruttoNieaktywneEtykieta().should('have.attr', 'value', 99.99)

            cy.log('Krok 12 - Klikam w przycisk "Zapisz"')
            e37.zapiszPrzycisk().click()

            cy.log('Pojawiła się sekcja "Załączniki"')
            e37.sprawdzSekcjaZalaczniki()

            cy.log('Reszta pól zawiera poprawne wartości')
            // weryfikuję wartość pola Agencja
            e37.agencjaLista().should('contain', 'AKFiS')
            // weryfikuję wartość pola Kontrahent
            e37.kontrahentLista().should('have.attr', 'title', 'EAST RIDERS HUBERT KOSTRZEWA')
            // weryfikuję wartość pola Nr faktury
            e37.nrFakturyPoleTekstowe().should('have.value', '123456789')
            // weryfikuję wartość pola Data faktury
            e37.dataFakturyData().should('have.value', '11.11.2023')
            // weryfikuję wartość pola Data usługi
            e37.dataUslugiData().should('have.value', '11.11.2023')
            // weryfikuję wartość pola Data rejestracji
            e37.sprawdzDataRejestracji()
            // weryfikuję wartość pola Na umowie NETTO
            e37.naUmowieNettoEtykieta().should('have.value', '110')
            // weryfikuję wartość pola Do zapłaty NETTO
            e37.doZaplatyNettoEtykieta().should('have.value', (result+',00 zł').replace('-', '- ') )
            // weryfikuję wartość pola Kwota NETTO
            e37.kwotaNettoPoleTekstowe().should('have.value', '2,00 zł')
            // weryfikuję wartość pola VAT
            e37.vatPoleTekstowe().should('have.value', '10,00 %')
            // weryfikuję wartość pola BRUTTO
            e37.bruttoPoleTekstowe().should('have.value', '99,99 zł')
            // weryfikuję wartość pola Deklarowana data rozliczenia
            e37.deklDataRozlData().should('have.value', '11.11.2023')
            // weryfikuję wartość pola Data rozliczenia
            e37.dataRozlData().should('have.value', '11.11.2023')
            // weryfikuję wartość pola Uwagi do DDR
            e37.uwagiDoDDRPoleTekstowe().should('have.value', 'Uwagi do DDR test')
            // weryfikuję wartość pola Uwagi do DR
            e37.uwagiDoDRPoleTekstowe().should('have.value', 'Uwagi do DR test')
            // weryfikuję wartość pola Uwagi do rozliczenia
            e37.uwagiDoRozlPoleTekstowe().should('have.value', 'Uwagi do rozliczenia test')
            // weryfikuję wartość pola Nr porozumienia
            e37.nrPorozumieniaLista().should('contain', 'P/1001733/AKFiS/2021')
            // weryfikuję wartość pola Kosztorys
            e37.kosztorysLista().should('contain', '2000005 - POROZUMIENIE DO TESTÓW AUTO 1147')
            // weryfikuję wartość pola Producent
            e37.producentLista().should('contain', 'test_user_2')
            // weryfikuję wartość pola Nr Zamówienia
            e37.nrZamowieniaLista().should('contain', '2000002 - Z/1012717/AKFiS/2021')
        })
    
        cy.log('Krok 13 - Klikam w przycisk "Powrót"')
        e37.powrotPrzycisk().click()

        cy.log('Nastąpił powrót na ekran listy faktur')
        e35.sprawdzURL()
        e35.sprawdzWidok()

        cy.log('Na liście wyświetla się nowo utworzona faktura z wartościami w kolumnach zgodnymi z tymi podanymi wcześniej')
        cy.get('#invoiceTable_table > tbody > tr:nth-child(1) > td:nth-child(2)').should('contain', '123456789')
        cy.get('tbody > :nth-child(1) > .date').should('contain', '11.11.2023')
        cy.get('tbody > :nth-child(1) > .currency').should('contain', '2,00 zł')
        cy.get('tbody > :nth-child(1) > :nth-child(5)').should('contain', 'EAST RIDERS HUBERT KOSTRZEWA')
        cy.get('tbody > :nth-child(1) > :nth-child(6)').should('contain', 'P/1001733/AKFiS/2021')
        cy.get('tbody > :nth-child(1) > :nth-child(7)').should('contain', 'POROZUMIENIE DO TESTÓW AUTO 1147')
        cy.get('tbody > :nth-child(1) > :nth-child(8)').should('contain', 'Z/1012717/AKFiS/2021')
        cy.get('tbody > :nth-child(1) > :nth-child(9)').should('contain', 'test_user_2')

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})