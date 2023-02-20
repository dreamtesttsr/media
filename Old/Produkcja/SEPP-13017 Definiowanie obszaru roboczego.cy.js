const { e503 } = require('../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji')
import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'

describe('SEPP-13017 Definiowanie obszaru roboczego', function () {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const jutro = DateTime.now().plus({days:1}).toFormat('d')
    it('Definiowanie obszaru roboczego', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 1 - otwarcie ekranu Planowania Produkcji')
        cy.goToMenu('Planowanie produkcji')
        fWspolne.sprawdzProgressBar()
        e503.sprawdzProgressBar()

        cy.log('Krok 2 - filtrowanie po dacie i zmiana trybu wyświetlania')
        e503.przedzialCzasuPrzycisk().contains(dzisiaj).click()
        // użycie template literals do wyszukania elementów po zmiennej
        cy.get('.datepicker-days>table>tbody>tr').filter(`:contains('${jutro}')`).last().click() 
        e503.wyszukajDatePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.btn.btn-primary.lbl-select-picker.default-popover').click()
        cy.get('#comboIntervalType').select('2')
        e503.wyszukajDatePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('.btn.btn-primary.lbl-select-picker.default-popover').click()
        cy.get('#comboIntervalType').select('3')
        e503.wyszukajDatePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#collapseBtn').click()
        e503.sprawdzProgressBar() // pasek wczytywania na Gancie
        
        cy.log('Krok 3 - legenda')
        e503.objasnienieKolorowPrzycisk().click()
        cy.get('h5.modal-title').should('be.visible').contains('Objaśnienie użytych kolorów:')
        e503.objasnienieKolorowPrzycisk().click()
        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})