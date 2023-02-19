import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../POM/Planowanie/E23 Koszty planowane'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e42 } from '../../../POM/Zaangazowanie/E42 Delegacja krajowa'
import { e44 } from '../../../POM/Zaangazowanie/E44 Delegacja zagraniczna'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e37 } from '../../../POM/Rozliczenia/E37 Szczegoly faktury'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e32 } from '../../../POM/Zaangazowanie/E32 Zamowienia ZakupUsluga i Hotel - szczegoly'
import { e34 } from '../../../POM/Zaangazowanie/E34 Zamowienia Wewnetrzne - szczegoly'
import { e9301 } from '../../../POM/Pozostale/E93.01 Historia pozycji'
import { e93 } from '../../../POM/Pozostale/E93 Historia zmian'
import { daneTestowe } from '../../../fixtures/daneTestowe'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'


describe('SEPP-14605 Rola 11', () => {

    it('Rola 11 - Kierownik Produkcji', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Produkcji')
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzURL()
        e20.sprawdzWidok()
        e20.sprawdzWidok11()        
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie nowego porozumienia i sprawdzam poprawność pól')
        e20.dodajPorozumieniePrzycisk().click()
        e22.sprawdzWidokDodajPorozumienie()
        e22.powrotPrzycisk().click()
        e20.sprawdzURL()

        cy.log('Krok 4 - Jestem na ekranie szczegółów porozumienia i sprawdzam poprawność pól')
        e20.numerPorozumieniaPoleTekstowe().type(daneTestowe.nrPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        e22.sprawdzURL()
        e22.sprawdzWidok()
        e22.sprawdzWidok11()

        cy.log('Krok 5 - Jestem na ekranie kosztów planowanych i sprawdzam poprawność pól')
        e22.kosztyPlanowanePrzycisk().click()
        e23.sprawdzURL()
        e23.sprawdzWidok()
        e23.historiaZmianPrzycisk().click()
        e93.sprawdzWidok()
        e93.zamknijPrzycisk().click()
        e23.historiaPozycjiPrzycisk().click()
        e9301.sprawdzWidok()
        e9301.zamknijPrzycisk().click()

        cy.log('Krok 6 - Jestem na ekranie listy kosztorysów i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzWidok11()
        e25.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 7 - Jestem na ekranie listy audycji i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzURL()
        e200.sprawdzWidok()
        e200.sprawdzWidok11()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie listy zamówień i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzURL()
        e30.sprawdzWidok()
        e30.sprawdzWidok11()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie Zamówienia na usługę i sprawdzam poprawność pól')
        e30.zaawansowanePrzycisk().click()
        e30.typZamowieniaLista().select('Zamówienie', {force: true}) 
        e30.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e30.podgladPierwszyPrzycisk().click()
        e32.sprawdzWidok()
        e32.powrotPrzycisk().click()

        cy.log('Krok 10 - Jestem na ekranie Zamówienia wewnętrznego i sprawdzam poprawność pól')
        e30.zaawansowanePrzycisk().click()
        e30.typZamowieniaLista().select('Zamówienie wewnętrzne', {force: true})
        e30.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e30.podgladPierwszyPrzycisk().click()
        e34.sprawdzWidok()

        cy.log('Krok 11 - Jestem na ekranie listy delegacji i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzURL()
        e40.sprawdzWidok()
        e40.sprawdzWidok11()
        e40.sprawdzFiltryZaawansowane()

        cy.log('Krok 12 - Jestem na ekranie Delegacji krajowej i sprawdzam poprawność pól')
        e40.dodajDelegacjePrzycisk().click()
        e40.krajowaPopupPrzycisk().click()
        e42.sprawdzWidok()
        e42.sprawdzWidokKosztyDelegacji()
        e42.powrotPrzycisk().click()
        
        cy.log('Krok 13 - Jestem na ekranie Delegacji zagranicznej i sprawdzam poprawność pól')
        e40.dodajDelegacjePrzycisk().click()
        e40.zagranicznaPopupPrzycisk().click()
        e44.sprawdzWidok()
        e44.sprawdzWidokKosztyDelegacji()

        cy.log('Krok 14 - Jestem na ekranie Faktury')
        cy.goToMenu('Faktury')
        e35.sprawdzURL()
        e35.sprawdzWidok()
        e35.sprawdzWidok11()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 15 - Jestem na ekranie dodawania Faktury')
        e35.dodajFakturePrzycisk().click()
        e37.sprawdzURL()
        e37.sprawdzBreadCrumb()
        e37.sprawdzWidok() 
        e37.sprawdzWidok11()

        cy.log('Krok 16 - Jestem na ekranie listy Rachunków Wewnętrznych')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.sprawdzWidok()
        e38.sprawdzWidok11()
        e38.sprawdzFiltryZaawansowane()

        // cy.log('Krok 16 - Jestem na ekranie podglądu Rachunku wew.')
        // E38.podgladPierwszyPrzycisk().click() // do zrobienia w E38
        // e3801.sprawdzURL()
        // e3801.sprawdzWidok()

        cy.log('Krok 17 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzWidok11()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 18 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.zaaawansowanePrzycisk().click()
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.ukryjZrealizowanePrzyciskWyboru().click()
        e502.wyszukajPrzycisk().click()
        e502.sprawdzWidok()
        e502.sprawdzWidokPodglad11()

        cy.log('Krok 19 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie edycji i sprawdzam poprawność pól')
        e502.powrotPrzycisk().click()
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        e502.sprawdzWidok()
        e502.sprawdzWidokEdycja11()        
     
        cy.log('Krok 20 - Jestem na ekranie listy Zamówień zewnętrznych i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.sprawdzWidok()
        e516.sprawdzWidok11()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 21 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()
    
        cy.log('Krok 22 - Jestem na ekranie listy Zleceń pracy zasobu i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzWidok11()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 23 - Jestem na ekranie Karty pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzWidok()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 24 - Jestem na ekranie Czasu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 25 - Jestem na ekranie Kosztu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 26 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 27 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 28 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 29 - Jestem na ekranie Raporty -> Rozliczenie kosztów zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})