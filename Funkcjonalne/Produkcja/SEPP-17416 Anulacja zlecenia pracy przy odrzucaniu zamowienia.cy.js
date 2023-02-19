import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e50301 } from '../../../../POM/Produkcja/Planowanie produkcji/E503.01 DodawanieModyfikacja czasu pracy zasobu'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e504 } from '../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'

describe('SEPP-17416 Anulacja zlecenia pracy przy odrzucaniu zamówienia', () => {
    it('Odrzucenie zamówienia ze zleceniem pracy', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 2 - Jestem na ekranie listy zleceń pracy i weryfikuję status zlecenia pracy')
        cy.goToMenu('Zlecenia pracy')
        e504.tytulAudycjiPoleTekstowe().type('SEPP-17416')
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[title="Numer zlecenia pracy"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[title="Numer zlecenia pracy"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(10)').should('have.text', 'Oczekujące na akceptację')

        cy.log('Krok 3 - Jestem na ekranie listy wniosków o zasoby i wyszukuję zamówienie')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17416')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Jestem na ekranie szczegółów zamówienia i odrzucam zamówienie')
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        e50200.odrzucPrzycisk().click()
        e50200.takOdrzucPopupPrzycisk().click()
        e50200.powodOdrzuceniaPopupPoleTekstowe().type('Odrzucam zamówienie')
        e50200.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 5 - Jestem na ekranie listy zleceń pracy i ponownie weryfikuję status zlecenia pracy')
        cy.goToMenu('Zlecenia pracy')
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(10)').should('have.text', 'Anulowane')

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Ponowne przekazanie zamówienia do Dyspozytury', () => {
        cy.log('Krok 6 - Loguję się jako Producent')
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 7 - Jestem na ekranie listy wniosków o zasoby i wyszukuję zamówienie')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17416')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 8 - Jestem na ekranie szczegółów zamówienia i ponownie przekazuję zamówienie do Dyspozytury')
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        e50200.zlozZamowieniePrzycisk().click()
        e50200.takZlozPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Akceptacja zamówienia z tym samym zleceniem pracy', () => {
        cy.log('Krok 9 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 10 - Jestem na ekranie listy wniosków o zasoby i wyszukuję zamówienie')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17416')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 11 - Jestem na ekranie szczegółów zamówienia i akceptuję zamówienie')
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        e50200.zaakceptujPrzycisk().click()
        e50200.takZaakceptujPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 12 - Jestem na ekranie Planowania produkcji i wyszukuję zlecenie pracy')
        cy.goToMenu('Planowanie produkcji')
        e503.zwinRozwinFiltryPrzycisk().click()
        e503.tytulAudycjiTVPoleTestowe().type('SEPP-17416')
        cy.get('.select2-results__option').should('contain', 'SEPP-17416')
        e503.tytulAudycjiTVPoleTestowe().type('{enter}')
        e503.ustawPrzedzialCzasuDzien('2024', 'sty', '02.01.2024')

        cy.log('Krok 13 - Jestem na ekranie Przypisywania zasobów i przypisuję pracownika do zlecenia pracy')
        cy.get('[title="KTA - INŻYNIER STUDIA"]').click()
        e503.dodajPracownikaPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('div > [type="checkbox"]').eq(2).check()
        e50301.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()        

        cy.log('Krok 14 - Jestem na ekranie listy zleceń pracy i weryfikuję status zlecenia pracy')
        cy.goToMenu('Zlecenia pracy')
        e504.tytulAudycjiPoleTekstowe().type('SEPP-17416')
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[title="Numer zlecenia pracy"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[title="Numer zlecenia pracy"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(10)').should('have.text', 'Oczekujące na akceptację')
        cy.get('#orderList_table > tbody > tr:nth-child(2) > td:nth-child(10)').should('have.text', 'Anulowane')

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})