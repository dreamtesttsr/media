import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki Wewnetrzne'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia Zewnetrzne'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'

describe('SEPP-14510 Rola 18', () => {

    it('Rola 18 - Koordynator usług', () => {
        cy.log('Krok 1 - Loguję się jako Koordynator usług')
        cy.visit('')
            .loginKoordynatorUslug()

        cy.log('Krok 2 - Jestem na erkanie Porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzURL()
        e20.sprawdzWidok()
        e20.sprawdzWidok18()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie Kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzURL()
        e25.sprawdzWidok()
        e25.sprawdzWidok18()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 4 - Jestem na ekranie Audycje i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzURL()
        e200.sprawdzWidok()
        e200.sprawdzWidok18()

        cy.log('Krok 5 - Jestem na ekranie Zamówienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzURL()
        e30.sprawdzWidok()

        cy.log('Krok 6 - Jestem na ekranie Delegacji i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzURL()
        e40.filtrujPoNumerzePierwszegoZamowienia()
        e40.sprawdzWidok()

        cy.log('Krok 7 - Jestem na ekranie Faktury')
        cy.goToMenu('Faktury')
        e35.sprawdzURL()
        e35.sprawdzWidok()
        
        cy.log('Krok 8 - Jestem na ekranie Rachunki Wewnętrzne')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.sprawdzWidok()
        e38.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzWidok18()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.ukryjZrealizowanePrzyciskWyboru().click()
        e502.wyszukajPrzycisk().click()
        e502.sprawdzWidokPodglad18()

        cy.log('Krok 11 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie edycji i sprawdzam poprawność pól')
        e502.powrotPrzycisk().click({force:true})
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        e502.sprawdzWidok()
        e502.sprawdzWidokEdycja18()
     
        cy.log('Krok 12 - Jestem na ekranie listy Zamówień zewnętrznych i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.numerZamowieniaPoleTekstowe().type('ZZ/1234/2022')	
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.sprawdzWidok()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 13 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()
    
        cy.log('Krok 14 - Jestem na ekranie listy Zleceń pracy zasobu i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzWidok18()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 15 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 16 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 17 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Rozliczenie kosztów zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()
             
        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})