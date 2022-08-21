import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia Zewnetrzne'
import { e51601 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 - Zamowienia zewnetrzne - szczegoly'

describe('SEPP-16839 Weryfikacja zmiany stanu zamówienia zewnętrznego w zależności od stanu rezerwacji', () => {

    afterEach('Wylogowanie', () => {
        cy.logoutUser()
    })

    it('Weryfikacja możliwości zmiany statusu zamówienia zewnętrznego', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Działu Zakupu Usług CUP')
        cy.visit('')
            .loginPracownikDzialuZakupuUslugCUP()

        cy.log('Krok 2 - Przechodzę na ekran listy Zamówień zewnętrznych i wyszukuję wybrane zamówienie')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-16839')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów zamówienia zewnętrznego i zmieniam jego status na "Postępowanie rozstrzygnięte"')
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
        e51601.statusZamowieniaLista().select('Postępowanie rozstrzygnięte', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.statusZamowieniaLista().children('option').contains('Postępowanie rozstrzygnięte').should('have.attr', 'selected')

        cy.log('Krok 4 - Przywracam poprzedni status zamówienia"')
        e51601.statusZamowieniaLista().select('W trakcie postępowania', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
    })

    it('Odrzucenie zamówienia', () => {
        cy.log('Krok 5 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('')
            .loginPracownikDyspozytury()

        cy.log('Krok 6 - Przechodzę na ekran listy Wniosków o zasoby i wyszukuję wybrany wniosek')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16839')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 7 - Jestem na ekranie szczegółów wybranego wniosku o zasoby i przechodzę na szczegóły wybranego zamówienia')
        e502.edycjaRezerwacjiPierwszyPrzycisk().click()

        cy.log('Krok 8 - Odrzucam zamówienie')
        e50201.odrzucPrzycisk().click()
        e50201.takOdrzucPopupPrzycisk().click()
        e50201.powodOdrzuceniaPopupPoleTekstowe().type('Odrzucam')
        e50201.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Odrzucony (zamówienie)')
    })

    it('Weryfikacja możliwości zmiany statusu zamówienia zewnętrznego 2', () => {
        cy.log('Krok 9 - Loguję się jako Pracownik Działu Zakupu Usług CUP')
        cy.visit('')
            .loginPracownikDzialuZakupuUslugCUP()

        cy.log('Krok 10 - Przechodzę na ekran listy Zamówień zewnętrznych i wyszukuję wybrane zamówienie')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-16839')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 11 - Jestem na ekranie szczegółów zamówienia zewnętrznego i próbuję zmienić jego status na "Postępowanie rozstrzygnięte"')
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
        e51601.statusZamowieniaLista().select('Postępowanie rozstrzygnięte', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('h4.modal-title').contains('Nieprawidłowa zmiana stanu').should('be.visible')
        cy.get('button#InvalidStatusModal-noBtn').click()
    })

    it('Złożenie zamówienia', () => {
        cy.log('Krok 12 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()

        cy.log('Krok 13 - Przechodzę na ekran listy Wniosków o zasoby i wyszukuję wybrany wniosek')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16839')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 14 - Jestem na ekranie szczegółów wybranego wniosku o zasoby i przechodzę na szczegóły wybranego zamówienia')
        e502.edycjaRezerwacjiPierwszyPrzycisk().click()

        cy.log('Krok 15 - Składam zamówienie')
        e50201.zlozZamowieniePrzycisk().click()
        e50201.takZlozPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Przekazano do dyspozytury (zamówienie)')
    })

    it('Weryfikacja możliwości zmiany statusu zamówienia zewnętrznego 3', () => {
        cy.log('Krok 16 - Loguję się jako Pracownik Działu Zakupu Usług CUP')
        cy.visit('')
            .loginPracownikDzialuZakupuUslugCUP()

        cy.log('Krok 17 - Przechodzę na ekran listy Zamówień zewnętrznych i wyszukuję wybrane zamówienie')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-16839')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 18 - Jestem na ekranie szczegółów zamówienia zewnętrznego i próbuję zmienić jego status na "Postępowanie rozstrzygnięte"')
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
        e51601.statusZamowieniaLista().select('Postępowanie rozstrzygnięte', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('h4.modal-title').contains('Nieprawidłowa zmiana stanu').should('be.visible')
        cy.get('button#InvalidStatusModal-noBtn').click()
    })

    it('Akceptacja zamówienia', () => {
        cy.log('Krok 19 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('')
            .loginPracownikDyspozytury()

        cy.log('Krok 20 - Przechodzę na ekran listy Wniosków o zasoby i wyszukuję wybrany wniosek')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16839')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 21 - Jestem na ekranie szczegółów wybranego wniosku o zasoby i przechodzę na szczegóły wybranego zamówienia')
        e502.edycjaRezerwacjiPierwszyPrzycisk().click()

        cy.log('Krok 22 - Akceptuję zamówienie')
        e50201.zaakceptujPrzycisk().click()
        e50201.takZaakceptujPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Zamówienie wstępnie zaakceptowane')
    })

    it('Weryfikacja możliwości zmiany statusu zamówienia zewnętrznego 4', () => {
        cy.log('Krok 23 - Loguję się jako Pracownik Działu Zakupu Usług CUP')
        cy.visit('')
            .loginPracownikDzialuZakupuUslugCUP()

        cy.log('Krok 24 - Przechodzę na ekran listy Zamówień zewnętrznych i wyszukuję wybrane zamówienie')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-16839')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 25 - Jestem na ekranie szczegółów zamówienia zewnętrznego i zmieniam jego status na "Postępowanie rozstrzygnięte"')
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
        e51601.statusZamowieniaLista().select('Postępowanie rozstrzygnięte', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.statusZamowieniaLista().children('option').contains('Postępowanie rozstrzygnięte').should('have.attr', 'selected')

        cy.log('Krok 26 - Przywracam poprzedni status zamówienia"')
        e51601.statusZamowieniaLista().select('W trakcie postępowania', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.statusZamowieniaLista().children('option').contains('W trakcie postępowania').should('have.attr', 'selected')
    })
})