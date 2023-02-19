import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e50301 } from '../../../../POM/Produkcja/Planowanie produkcji/E503.01 DodawanieModyfikacja czasu pracy zasobu'


describe('SEPP-18053 Automatyczne oznaczanie nadgodzin', () => {
    it('Automatyczne oznaczanie nadgodzin - usługa > 12h', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 2 - Jestem na ekranie Planowania produkcji i wyszukuję zlecenie na usługę >12h')
        cy.goToMenu('Planowanie produkcji')
        e503.zwinRozwinFiltryPrzycisk().click()
        e503.tytulAudycjiTVPoleTestowe().type('SEPP-18053')
        cy.get('.select2-results__option').should('contain', 'SEPP-18053')
        e503.tytulAudycjiTVPoleTestowe().type('{enter}')
        e503.ustawPrzedzialCzasuDzien(2023, 'sty', '10.01.2023')

        cy.log('Krok 3 - Przypisuję pracownika (rodzaj umowy: pracownik) do wybranej usługi')
        e503.wybierzZasobPrzycisk('KTA - INŻYNIER STUDIA - S7').click()
        e503.dodajPracownikaPrzycisk().click()
        cy.get('[title="Solecki Jacek (29111)"').siblings('input[type="checkbox"]').check()
        e50301.zapiszPrzycisk().click()
        e50301.bledyWalidacjiPopupEtykieta().contains('Przekroczony dobowy limit pracy w dniu 10.01.2023.')
        e50301.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('div.event_class_overtime').should('be.visible')

        cy.log('Krok 4 - Powracam na ekran Planowania produkcji i anuluję zlecenie pracy')
        e50301.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('Solecki, Jacek (29111)').click()
        e503.odrzucZleceniePracyPrzycisk().click()
        e503.komentarzPopupPoleTekstowe().type('Odrzucam testowe zlecenie')
        e503.odrzucZleceniePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 5 - Przypisuję pracownika (rodzaj umowy: firma) do wybranej usługi')
        e503.wybierzZasobPrzycisk('KTA - INŻYNIER STUDIA - S7').click()
        e503.dodajPracownikaPrzycisk().click()
        cy.get('[title="Belka Tomasz (70088965 / 175868)"').siblings('input[type="checkbox"]').check()
        e50301.zapiszPrzycisk().click()
        e50301.bledyWalidacjiPopupEtykieta().invoke('text').then((tekst) => {
            expect(tekst).to.not.contain('Przekroczony dobowy limit pracy w dniu 10.01.2023.')
        })
        e50301.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('div.event_class_overtime').should('not.exist')

        cy.log('Krok 6 - Powracam na ekran Planowania produkcji i anuluję zlecenie pracy')
        e50301.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('Belka, Tomasz (70088965)').click()
        e503.odrzucZleceniePracyPrzycisk().click()
        e503.komentarzPopupPoleTekstowe().type('Odrzucam testowe zlecenie')
        e503.odrzucZleceniePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Automatyczne oznaczanie nadgodzin - < 11h pomiędzy 2 zleceniami', () => {
        cy.log('Krok 7 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 8 - Jestem na ekranie Planowania produkcji i wyszukuję zlecenia z odstępem poniżej 11h')
        cy.goToMenu('Planowanie produkcji')
        e503.zwinRozwinFiltryPrzycisk().click()
        e503.tytulAudycjiTVPoleTestowe().type('SEPP-18053')
        cy.get('.select2-results__option').should('contain', 'SEPP-18053')
        e503.tytulAudycjiTVPoleTestowe().type('{enter}')
        e503.ustawPrzedzialCzasuDzien(2023, 'sty', '12.01.2023')

        cy.log('Krok 9 - Przypisuję pracownika (rodzaj umowy: pracownik) do wybranej usługi')
        e503.wybierzZasobPrzycisk('KTA - INŻYNIER STUDIA - S7').click()
        e503.dodajPracownikaPrzycisk().click()
        cy.get('[title="Solecki Jacek (29111)"').siblings('input[type="checkbox"]').check()
        e50301.zapiszPrzycisk().click()
        e50301.bledyWalidacjiPopupEtykieta().contains('Przekroczony dobowy limit pracy w dniu 11.01.2023.')
        e50301.bledyWalidacjiPopupEtykieta().contains('Zbyt krótka przerwa dobowa dla pracownika zatrudnionego w systemie czasu równoważnego w dniu 11.01.2023.')
        e50301.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('div.event_class_overtime').should('be.visible')

        cy.log('Krok 10 - Powracam na ekran Planowania produkcji i anuluję zlecenie pracy')
        e50301.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('Solecki, Jacek (29111)').click()
        e503.odrzucZleceniePracyPrzycisk().click()
        e503.komentarzPopupPoleTekstowe().type('Odrzucam testowe zlecenie')
        e503.odrzucZleceniePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 11 - Przypisuję pracownika (rodzaj umowy: firma) do wybranej usługi')
        e503.wybierzZasobPrzycisk('KTA - INŻYNIER STUDIA - S7').click()
        e503.dodajPracownikaPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('[title="test_user_27 Imię_27 (1234567890 / 9876543210)"').siblings('input[type="checkbox"]').check()
        e50301.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50301.bledyWalidacjiPopupEtykieta().should('not.exist')
        cy.get('div.event_class_overtime').should('not.exist')

        cy.log('Krok 12 - Powracam na ekran Planowania produkcji i anuluję zlecenie pracy')
        e50301.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('test_user_27, Imię_27 (1234567890)').click()
        e503.odrzucZleceniePracyPrzycisk().click()
        e503.komentarzPopupPoleTekstowe().type('Odrzucam testowe zlecenie')
        e503.odrzucZleceniePracyPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})