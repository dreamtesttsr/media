import { DateTime } from 'luxon'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-16940 Obsługa rezerwacji - tryb ZESP', () => {

    const jutro = DateTime.now().plus({days:1}).toFormat('dd.MM.yyyy')
    afterEach('Wylogowanie', () => {
        cy.logoutUser()
    })
    
    it('Dodanie rezerwacji dla audycji z porozumienia w trybie ZESP', () => {   
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()

        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji wybranego wniosku')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16940')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()
    
        cy.log('Krok 3 - Jestem na ekranie edycji wniosku o zasoby i dodaję nową rezerwację')
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Technika studyjna', {force: true})
        e50201.dataRealizacjiOdData().type(jutro)
        e50201.dataRealizacjiDoData().type(jutro)
        e50201.miejsceRealizacjiLista().select('Studio S3', {force: true})
        e50201.zaznaczPierwszyDzienPrzyciskWyboru().check()
        e50201.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.audycjePierwszyPrzycisk().click()
        e50201.audycjaPierwszyPrzyciskWyboru().check()
        e50201.potwierdzAudycjePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.w3-text-blue').should('be.visible')

        cy.log('Krok 4 - Jestem na ekranie szczegółów dnia zdjęciowego, wypełniam zasoby i przekazuję rezerwację do Dyspozytury')
        e50201.zasobyPierwszyPrzycisk().click()
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().check()
        e50212.zatwierdzPrzycisk().click()
        e50200.godzinaRozpoczeciaStanPierwszaData().type('10')
        e50200.godzinaZakonczeniaStanPierwszaData().type('20')
        e50200.dodajSprzetPrzycisk().click()
        e50200.sprzetPierwszaLista().select('Monitory (5,00 zł. / godzina)', {force: true})
        e50200.godzinaRozpoczeciaSprzetPierwszaData().type('10')
        e50200.godzinaZakonczeniaSprzetPierwszaData().type('20')
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zlozZamowieniePrzycisk().click()
        e50200.takZlozPopupPrzycisk().click()
        e50200.sprawdzPrzekroczenieCzasuZasobow()
    })

    it('Akceptacja rezerwacji przez Dyspozyturę', () => {   
        cy.log('Krok 5 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('')
            .loginPracownikDyspozytury()
            
        cy.log('Krok 6 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran szczegółów rezerwacji przekazanej do dyspozytury dla audycji z porozumienia w trybie ZESP')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16940')
        e501.statusRezerwacjiLista().select('Przekazano do dyspozytury (zamówienie)', {force: true})
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 7 - Jestem na ekranie szczegółów rezerwacji i ją akceptuję')
        e50200.zaakceptujPrzycisk().click()
        e50200.takZaakceptujPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Zamówienie wstępnie zaakceptowane')
    })
})