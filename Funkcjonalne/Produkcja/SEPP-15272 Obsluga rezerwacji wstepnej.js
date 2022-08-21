import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-15272 Obsługa rezerwacji wstępnej', () => {

    const jutro = DateTime.now().plus({days:1}).toFormat('dd.MM.yyyy')
    const pojutrze = DateTime.now().plus({days:2}).toFormat('dd.MM.yyyy')
    let idRezerwacji

    it('Obsługa rezerwacji wstępnej', () => {
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()
        
        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę do ekranu szczegółów wniosku')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-15272')
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów wniosku o zasoby i dodaję nową rezerwację')
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Technika studyjna', {force: true})
        e50201.miejsceRealizacjiLista().select('hala ATM A', {force: true})
        e50201.dataRealizacjiOdData().type(jutro)
        e50201.dataRealizacjiDoData().type(pojutrze)
        e50201.uwagiDoRezerwacjiPoleTekstowe().click()
        e50201.zaznaczWszystkieDniPrzyciskWyboru().should('be.enabled').check()
        e50201.zapiszPrzycisk().click()
        e50201.wypelnijIdAudycjiPrzycisk().click()
        e50201.rozpocznijOdAudycjiLista().select('Odc. 1, ID audycji 45634654357', {force: true})
        cy.get('#select2-AuditionFromId-container').should('have.attr', 'title', 'Odc. 1, ID audycji 45634654357')
        e50201.potwierdzWypelnieniePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Weryfikacja wyświetlania numerów SAP
        cy.get('tr.odd > td:nth-child(3) > span').should('be.visible').and('have.text', '45634654357').and('have.css', 'color', 'rgb(244, 67, 54)')
        cy.get('tr.odd > td:nth-child(4) > span').should('be.visible').and('have.text', '65634654357').and('have.css', 'color', 'rgb(244, 67, 54)')
        cy.get('tr.odd > td:nth-child(5) > span').should('be.visible').and('have.text', '75634654357').and('have.css', 'color', 'rgb(244, 67, 54)')

        cy.log('Krok 4 - Jestem na ekranie zasobów rezerwacji i ją wypełniam')
        e50201.zasobyPierwszyPrzycisk().click()

        // Weryfikacja wyświetlania numerów SAP
        cy.get('td:nth-child(10)').should('be.visible').and('have.text', '45634654357').and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('td:nth-child(11)').should('be.visible').and('have.text', '65634654357').and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('td:nth-child(12)').should('be.visible').and('have.text', '75634654357').and('have.css', 'color', 'rgb(255, 0, 0)')

        e50200.pobierzZKosztorysuSprzetPrzycisk().click()
        e50200.takPobierzPopupPrzycisk().click()
        cy.get('#ServiceTable>tbody').should('have.prop', 'childElementCount', 5)
        cy.get('.externalSelectorInput[data-index="3"]').should('have.attr', 'checked', 'checked')
        cy.get('.serviceComments[data-index="3"]').should('have.prop', 'value', 'teleprompter')
        e50200.godzinaRozpoczeciaSprzetPierwszaData().type('10')
        e50200.godzinaZakonczeniaSprzetPierwszaData().type('20')
        e50200.kopiujDatyGodzinySprzetPierwszyPrzycisk().click()
        cy.wait(1000)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczWszystkiePrzyciskWyboru().check()
        e50212.zatwierdzPrzycisk().click()
        e50200.godzinaRozpoczeciaStanPierwszaData().type('10')
        e50200.godzinaZakonczeniaStanPierwszaData().type('20')
        e50200.kopiujDatyGodzinyStanPierwszyPrzycisk().click()
        cy.wait(1000)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Kopiuje dane do drugiego dnia rezerwacji
        e50200.kopiujDaneDoPozostalychDniPrzycisk().click()
        e50200.zatwierdzKopiowaniePopupPrzycisk().should('be.visible').click()
        e50200.komunikatEtykieta().should('contain', 'Dane zostały skopiowane')

        cy.log('Krok 5 - Przekazuję rezerwację wstępną do Dyspozytury')
        e50200.wstepnaRezerwacjaPrzycisk().click()
        cy.get('#ConfirmResourceRegistrationModal-body').should('have.prop', 'innerText', 'Składasz rezerwację wstępną. Rezerwacji wstępnej nie podlega czas pracy osób (realizatorów, obsługi technicznej, obsługi planu itd.). Aby zarezerwować osoby, złóż zamówienie.\n\n\nUwaga! Złożenie rezerwacji wstępnej nie jest równoznaczne z jej realizacją. Wniosek podlega weryfikacji przez Dział Dyspozytury. Proszę oczekiwać na decyzję Działu Dyspozytury.\n\nUwaga! Przyjmujący wniosek nie ponosi żadnej odpowiedzialności za dane wprowadzone do wniosku przez Producenta/Kierownika produkcji.\n\nCzy potwierdzasz złożenie wniosku do Działu Dyspozytury?')
        e50200.takWstepnaPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.modyfikujRezerwacjePrzycisk().click()
        e50201.statusRezerwacjiEtykieta().should('have.value', 'Przekazano do dyspozytury (rezerwacja wstępna)')
        e50201.idRezerwacjiPoleTekstowe().invoke('attr', 'value').then((c) => {
            idRezerwacji = c
        })

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })

    // funkcjonalność dostępna od momentu wdrożenia nowego toku produkcji

    it('Sprawdzenie widoczności zasobów rezerwacji wstępnej', () => {
        cy.log('Krok 6 - Loguję się jako Kierownik dyspozytury')
        cy.visit('')
            .loginKierownikDyspozytury()

        cy.log('Krok 7 - Loguję się jako Kierownik dyspozytury')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        fWspolne.sprawdzProgressBar()
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        e50200.wstepnieZaakceptujPrzycisk().click()
        e50200.takWstepnieZaakceptujPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('button.currentSection').should('have.attr', 'style', 'background: #ffffcc')

        cy.log('Krok 8 - Jestem na ekranie Planowania produkcji i wyszukuję utworzoną rezerwację')
        cy.goToMenu('Planowanie produkcji')
        fWspolne.sprawdzProgressBar()
        e503.nastepnyDzienPrzycisk().click()       
        fWspolne.sprawdzProgressBar()
        e503.zwinRozwinFiltryPrzycisk().click()
        e503.tytulAudycjiTVPoleTestowe().type('SEPP-15272')
        cy.get('.select2-results__option').should('contain', 'SEPP-15272')
        e503.tytulAudycjiTVPoleTestowe().type('{enter}')
        e503.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.Gantt-event').contains('SEPP-15272')
        cy.get('#treeList > ul > li > ul > li').should('contain.text', 'RTF - TECHNIK STUDIA').and('contain.text', 'RTW - TECHNIK APARATURY').and('contain.text', 'Kran kamerowy').and('contain.text', 'Nagłośnienie').and('contain.text', 'Teleprompter')
        e503.nastepnyDzienPrzycisk().click()       
        fWspolne.sprawdzProgressBar()
        cy.get('.Gantt-event').contains('SEPP-15272')
        cy.get('#treeList > ul > li > ul > li').should('contain.text', 'RTF - TECHNIK STUDIA').and('contain.text', 'RTW - TECHNIK APARATURY').and('contain.text', 'Kran kamerowy').and('contain.text', 'Nagłośnienie').and('contain.text', 'Teleprompter')
        
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })   
})
