import { e515 } from '../../../POM/Produkcja/Dyzury/E515 Dyzury pracownikow'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e510 } from '../../../POM/Produkcja/Słowniki/E510 Grupy pracownikow'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e513 } from '../../../POM/Produkcja/Słowniki/E513 Grupy zasobow'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e50801 } from '../../../POM/Produkcja/Słowniki/E508.01 Sprzet - szczegoly'
import { e50301 } from '../../../POM/Produkcja/Planowanie produkcji/E503.01 DodawanieModyfikacja czasu pracy zasobu'
import { e50209 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.09 Zatwierdzanie zmian we wniosku'
import { e519 } from '../../../POM/Produkcja/Słowniki/E519 Stanowiska'
import { e51901 } from '../../../POM/Produkcja/Słowniki/E519.01 Stanowiska - szczegóły'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'

describe('SEPP-14503 Rola 12', () => {

    it('Rola 12 - Pracownik Dyspozytury', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 2 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzWidok12()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie Zmian niezatwierdzonych i sprawdzam poprawność pól')
        e501.statusRezerwacjiLista().select('Przekazano do dyspozytury (zmodyfikowany)', {force: true})
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()
        e50209.sprawdzWidok()
        e50209.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 4 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.statusRezerwacjiLista().select('Przekazano do dyspozytury (zamówienie)', {force: true})
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.sprawdzWidokPodglad12()
        e502.powrotPrzycisk().click({force:true})

        cy.log('Krok 5 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie edycji i sprawdzam poprawność pól')
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        e502.ukryjZrealizowanePrzyciskWyboru().click()
        e502.wyszukajPrzycisk().click()
        e502.anulowanaKolumna().click()
        e502.sprawdzWidok()
        e502.sprawdzWidokEdycja12()
        
        cy.log('Krok 6 - Jestem na ekranie listy Zamówień zewnętrznych i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.filtrujPoNumerzePierwszegoZamowienia()
        e516.sprawdzWidok()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Przechodzę na ekran Dodawania/Modyfikacji czasu pracy zasobu i sprawdzam poprawność pól')
        cy.get('div.Gantt-event[data-is-people="true"][data-object-type-id="3"][style*="rgb(249, 30, 26) "]').first().click()
        e503.dodajPracownikaPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50301.sprawdzWidokUsluga()
        e50301.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e503.sprawdzProgressBar()
        cy.get('[data-cant-be-disable="false"][data-is-person="false"][data-lvl="3"][data-color="rgb(249, 30, 26) "][data-is-externalorder="false"]').first().click({force: true})
        e503.dodajElementSprzetowyPrzycisk().click({force: true})
        fWspolne.sprawdzProgressBar()
        e50301.sprawdzWidokSprzet()

        cy.log('Krok 9 - Jestem na ekranie listy Zleceń pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.stanZleceniaLista().select('Oczekujące na akceptację', {force: true})
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e504.sprawdzWidok12()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Jestem na ekranie Grafiki pracowników i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zakres godzin')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zlecenia pracy')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('czas łączny (w godz.)')
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 11 - Jestem na ekranie Czasu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 12 - Jestem na ekranie Kosztu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 13 - Jestem na ekranie Dyżury i sprawdzam poprawność pól')
        cy.goToMenu('Dyżury')
        e515.sprawdzWidok()

        cy.log('Krok 14 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()
        e506.edycjaPierwszyPrzycisk().should('be.visible')

        cy.log('Krok 15 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()
        e508.sprawdzWidok12()

        cy.log('Krok 16 - Przechodzę na ekran edycji elementu sprzętowego i sprawdzam poprawność pól')
        e508.kodSapPoleTekstowe().type('X01')
        e508.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e508.edycjaPierwszyPrzycisk().click()
        e50801.sprawdzWidok()
        e50801.sprawdzWidok12()

        cy.log('Krok 17 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()
        e512.edycjaPierwszyPrzycisk().should('be.visible')

        cy.log('Krok 18 - Jestem na ekranie Powody niedostepności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()

        cy.log('Krok 19 - Jestem na ekranie Grupy pracowników i sprawdzam poprawność pól')
        cy.goToMenu('Grupy pracowników')
        e510.sprawdzWidok()
        e510.grupaPracownikowLista().select('avid film', {force:true})
        e510.sprawdzWidokPracownicy()

        cy.log('Krok 20 - Jestem na ekranie Grupy zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Grupy zasobów')
        e513.sprawdzWidok()
        e513.grupaZasobowLista().select('grupa miejsc realizacji', {force:true})
        e513.sprawdzWidokMiejscaRealizacji()
        e513.grupaZasobowLista().select('grupa elementów sprzętowych', {force:true})
        e513.sprawdzWidokElementySprzetowe()

        cy.log('Krok 21 - Jestem na ekranie Dni świąteczne i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()

        cy.log('Krok 22 - Jestem na ekranie Stanowiska i sprawdzam poprawność pól')
        cy.goToMenu('Stanowiska')
        e519.sprawdzWidok()
        e519.nazwaPoleTekstowe().type('kierownik muzyczny')
        e519.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e519.podgladPierwszyPrzycisk().click()
        e51901.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})