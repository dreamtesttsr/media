import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

describe('SEPP-14865 Rola 17', () => {

    it('Rola 17 - Kierownik Zakładu CUP', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Zakładu CUP')
        cy.visit('/')
            .loginKierownikZakladuCUP()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzURL()
        e20.sprawdzWidok()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie listy kosztorysów i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 4 - Jestem na ekranie listy audycji i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzURL()
        e200.sprawdzWidok()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Jestem na ekranie listy zamówień i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzURL()
        e30.sprawdzWidok()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie listy delegacji i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzURL()
        e40.sprawdzWidok()
        e40.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie Faktury')
        cy.goToMenu('Faktury')
        e35.sprawdzURL()
        e35.sprawdzWidok()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie podglądu Rachunku Wewnętrznego')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.sprawdzWidok()
        e38.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.sprawdzWidokPodglad17()        
     
        cy.log('Krok 11 - Jestem na ekranie listy Zamówień zewnętrznych i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.ukryjRezerwacjePrzyciskWyboru().check({force: true})
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.sprawdzWidok()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 12 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()
    
        cy.log('Krok 13 - Jestem na ekranie listy Zleceń pracy zasobu i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzWidok17()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Czasu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 15 - Jestem na ekranie Kosztu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 16 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 17 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})