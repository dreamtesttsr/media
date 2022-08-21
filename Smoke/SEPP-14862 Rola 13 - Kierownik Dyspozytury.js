import { e515 } from '../../../POM/Produkcja/Dyzury/E515 Dyzury pracownikow'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e510 } from '../../../POM/Produkcja/Słowniki/E510 Grupy pracownikow'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e513 } from '../../../POM/Produkcja/Słowniki/E513 Grupy zasobow'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia Zewnetrzne'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'

describe('SEPP-14862 Rola 13', () => {

    it('Rola 13 - Kierownik Dyspozytury', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Dyspozytury')
        cy.visit('')
            .loginKierownikDyspozytury()

        cy.log('Krok 2 - Jestem na ekranie listy Wniosków o zasoby i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzWidok13()
        e501.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 3 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie podglądu i sprawdzam poprawność pól')
        e501.przegladajWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.sprawdzWidokPodglad13()
        e502.powrotPrzycisk().click({force:true})

        cy.log('Krok 4 - Wchodzę na ekran szczegółów Wniosku o zasoby w trybie edycji i sprawdzam poprawność pól')
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        fWspolne.sprawdzProgressBar()
        e502.ukryjZrealizowanePrzyciskWyboru().click()
        e502.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e502.anulowanaKolumna().click()
        e502.sprawdzWidok()
        e502.sprawdzWidokEdycja13()
        
        cy.log('Krok 5 - Jestem na ekranie listy Zamówień zewnętrznych i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.filtrujPoNumerzePierwszegoZamowienia()
        e516.sprawdzWidok()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie Planowania produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie listy Zleceń pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.stanZleceniaLista().select('Oczekujące na akceptację', {force: true})
        e504.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e504.sprawdzWidok13()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie Grafiki pracowników i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zakres godzin')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zlecenia pracy')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('czas łączny (w godz.)')
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie Karty pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzWidok()
        e509.sprawdzWidok13()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Jestem na ekranie Czasu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 11 - Jestem na ekranie Kosztu pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 12 - Jestem na ekranie Dyżury i sprawdzam poprawność pól')
        cy.goToMenu('Dyżury')
        e515.sprawdzWidok()

        cy.log('Krok 13 - Jestem na ekranie Cennika usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 14 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 15 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 16 - Jestem na ekranie Grupy pracowników i sprawdzam poprawność pól')
        cy.goToMenu('Grupy pracowników')
        e510.sprawdzWidok()
        e510.grupaPracownikowLista().select('grupa pracowników', {force:true})
        e510.sprawdzWidokPracownicy()

        cy.log('Krok 17 - Jestem na ekranie Grupy zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Grupy zasobów')
        e513.sprawdzWidok()
        e513.grupaZasobowLista().select('gmr', {force:true})
        e513.sprawdzWidokMiejscaRealizacji()
        e513.grupaZasobowLista().select('ges', {force:true})
        e513.sprawdzWidokElementySprzetowe()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})