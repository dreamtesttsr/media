import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'

describe('SEPP-14864 Rola 16', () => {

    it('Rola 16 - Inżynier Produkcji', () => {
        cy.log('Krok 1 - Loguję się jako Inżynier Produkcji')
        cy.visit('')
            .loginInzynierProdukcji()

        cy.log('Krok 2 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 3 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.sprawdzWidokPodglad16()

        cy.log('Krok 4 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Jestem na ekranie Czasu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 6 - Jestem na ekranie Kosztu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 7 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 8 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 9 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})