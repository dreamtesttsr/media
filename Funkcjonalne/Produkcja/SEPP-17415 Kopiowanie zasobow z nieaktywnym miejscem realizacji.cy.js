import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e50304 } from '../../../../POM/Produkcja/Planowanie produkcji/E503.04 Zmien miejsce realizacji'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'

describe('SEPP-17415 Kopiowanie zasobów z nieaktywnym miejscem realizacji', () => {

    it('Kopiowanie zasobów z nieaktywnym miejscem realizacji', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Dyspozytury')
        cy.visit('/')
            .loginKierownikDyspozytury()

        cy.log('Krok 2 - Jestem na ekranie Planowania produkcji i wyszukuję wybrane zamówienie')
        cy.goToMenu('Planowanie produkcji')
        e503.zwinRozwinFiltryPrzycisk().click()
        e503.tytulAudycjiTVPoleTestowe().type('SEPP-17415')
        cy.get('.select2-results__option').should('contain', 'SEPP-17415')
        e503.tytulAudycjiTVPoleTestowe().type('{enter}')
        e503.ustawPrzedzialCzasuDzien('2025', 'wrz', '05.09.2025')

        cy.log('Krok 3 - Przypisuję miejsce realizacji do wybranego zasobu')
        e503.wybierzZasobPrzycisk('Montaż Avid').click()
        e503.zmienMiejsceRealizacjiPrzycisk().click()
        e50304.miejsceRealizacjiLista().select('MC53 (Avid MC53) zestaw montażowy Avid', {force: true})
        e50304.zmienDlaRadio(0).check()
        e50304.potwierdzPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('MC53 (Avid MC53) zestaw montażowy Avid (M02)').should('exist')
        e503.nastepnyDzienPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('MC53 (Avid MC53) zestaw montażowy Avid (M02)').should('not.exist')

        cy.log('Krok 4 - Kopiuję miejsce realizacji do wszystkich zasobów z zamówienia')
        e503.poprzedniDzienPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('Montaż Avid').click()
        e503.zmienMiejsceRealizacjiPrzycisk().click()
        e50304.zmienTylkoDlaDanegoMiejscaRealizacjiPrzyciskWyboru().uncheck()
        e50304.zmienDlaRadio(2).check()
        e50304.potwierdzPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.nastepnyDzienPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.sprawdzProgressBar()
        e503.wybierzZasobPrzycisk('MC53 (Avid MC53) zestaw montażowy Avid (M02)').should('exist')
        cy.log('Wylogowuję się')
        cy.logoutUser()

        cy.log('Krok 5 - Kopiuję zamówienie w celu replikowalności testu')
        cy.visit('/')
            .loginProducent()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17415')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Montaż', {force: true})
        e50201.dataRealizacjiOdData().clear().type('05.09.2025')
        e50201.dataRealizacjiDoData().clear().type('06.09.2025')
        e50201.miejsceRealizacjiLista().select('Montaż Avid MC', {force: true})
        e50201.zaznaczWszystkieDniPrzyciskWyboru().check()
        e50201.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.powrotPrzycisk().click()
        e502.statusLista().select('Do realizacji', {force: true})
        e502.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e502.kopiujZapotrzebowaniePierwszyPrzycisk().click()
        cy.get('#Reservations_0__IsSelected').check()
        cy.get('button#copyFormModal-yesBtn').click()
        cy.get('button#ConfirmModalCopyReservation2-yesBtn').click()
        e502.usunRezerwacjePierwszyPrzycisk().click()
        e502.powodAnulacjiPopupPoleTekstowe().type('Anuluję')
        e502.usunAnulujPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e502.statusLista().select('Roboczy', {force: true})
        e502.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e502.zasobyPierwszyPrzycisk().click()
        e50200.zlozZamowieniePrzycisk().click()
        e50200.takZlozPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Wylogowuję się')
        cy.logoutUser()

        cy.visit('/')
            .loginKierownikDyspozytury()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17415')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        e50200.zaakceptujPrzycisk().click()
        e50200.takZaakceptujPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})