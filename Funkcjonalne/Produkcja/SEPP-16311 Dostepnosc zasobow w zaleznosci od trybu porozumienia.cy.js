import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-16311 Dostępność zasobów w zależnosci od trybu porozumienia', () => {

    beforeEach('Logowanie do środowiska', () => {
        cy.log('Loguję się jako Kierownik Produkcji i przechodze na ekran Wniosków o zasoby')
        cy.visit('/')
            .loginKierownikProdukcji()
        cy.goToMenu('Wnioski o przydzielenie zasobów')
    })

    afterEach('Wylogowanie', () => {
        cy.logoutUser()
    })

    it('Dostępność zasobów w zależnosci od trybu porozumienia - szybki przebieg (SP)', () => {
        
        cy.log('Krok 1 - Wyszukuję wybrany wniosek o zasoby i wchodzę w jego szczegóły')  
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16311-SP')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 2 - Dodaję nową rezerwację')
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Technika studyjna', {force: true})
        e50201.dataRealizacjiOdData().type('29.04.2023')
        e50201.dataRealizacjiDoData().type('29.04.2023')
        e50201.miejsceRealizacjiLista().select('hala ATM A', {force: true})
        e50201.zaznaczPierwszyDzienPrzyciskWyboru().check()
        e50201.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Przechodzę na ekran szczegółów rezerwacji i sprawdzam dostępność zasobów')
        e50201.zasobyPierwszyPrzycisk().click()
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.nazwaPoleTekstowe().type('technik aparatury')
        e50212.wyszukajPrzycisk().click()
        cy.get('#pricePositionTable_table > tbody').should('have.prop', 'childElementCount', 1)
        e50212.anulujPrzycisk().click()
        cy.get('#pricePositionModal-confirm-return-yesBtn').click()
        e50200.dodajSprzetPrzycisk().click()
        cy.get('[role="textbox"][id*=select2-ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0]').click()
        cy.get('input.select2-search__field').type('rzutniki video')
        cy.get('.select2-results__options').should('have.prop', 'childElementCount', 1)
        e50200.sprzetPierwszaLista().select('Rzutniki video', {force:true})

        cy.log('Usuwam rezerwację')
        cy.get('#containerBody > ol > li:nth-child(3)').click()
        fWspolne.sprawdzProgressBar()
        e502.usunRezerwacjePierwszyPrzycisk().click()
        e502.usunAnulujPopupPrzycisk().click()
    })

    it('Dostępność zasobów w zależnosci od trybu porozumienia - tryb szybkiego przebiegu (TSP)', () => {
        
        cy.log('Krok 4 - Wyszukuję wybrany wniosek o zasoby i wchodzę w jego szczegóły')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-16311-TSP')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 5 - Dodaję nową rezerwację')
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Technika studyjna', {force: true})
        e50201.dataRealizacjiOdData().type('29.04.2023')
        e50201.dataRealizacjiDoData().type('29.04.2023')
        e50201.miejsceRealizacjiLista().select('hala ATM A', {force: true})
        e50201.zaznaczPierwszyDzienPrzyciskWyboru().check()
        e50201.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 6 - Przechodzę na ekran szczegółów rezerwacji i sprawdzam dostępność zasobów')
        e50201.zasobyPierwszyPrzycisk().click()
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.nazwaPoleTekstowe().type('technik aparatury')
        e50212.wyszukajPrzycisk().click()
        cy.get('#pricePositionTable_table > tbody').should('have.prop', 'childElementCount', 2)
        e50212.anulujPrzycisk().click()
        cy.get('#pricePositionModal-confirm-return-yesBtn').click()
        e50200.dodajSprzetPrzycisk().click()
        cy.get('[role="textbox"][id*=select2-ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0]').first().click()
        cy.get('input.select2-search__field').type('rzutniki video')
        cy.get('.select2-results__options').should('have.prop', 'childElementCount', 2)
        e50200.sprzetPierwszaLista().select('Rzutniki video', {force:true})

        cy.log('Usuwam rezerwację')
        cy.get('#containerBody > ol > li:nth-child(3)').click()
        fWspolne.sprawdzProgressBar()
        e502.usunRezerwacjePierwszyPrzycisk().click()
        e502.usunAnulujPopupPrzycisk().click()
    })
})