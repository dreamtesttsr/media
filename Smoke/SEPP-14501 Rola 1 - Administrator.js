import { e71 } from '../../../POM/Administracja/E71 Dziennik zdarzen'
import { e72 } from '../../../POM/Administracja/E72 Rodzaj Statusu'
import { e73 } from '../../../POM/Administracja/E73 Slowniki'
import { e75 } from '../../../POM/Administracja/E75 Tworcy'
import { e7601 } from '../../../POM/Administracja/E76.01 Kontrahenci szczegoly'
import { e77 } from '../../../POM/Administracja/E77 VAT w kosztach'
import { e78 } from '../../../POM/Administracja/E78 Uzytkownicy'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e515 } from '../../../POM/Produkcja/Dyzury/E515 Dyzury pracownikow'
import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e518 } from '../../../POM/Produkcja/Raporty/E518 Osoby przebywajace na planie'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e507 } from '../../../POM/Produkcja/Słowniki/E507 Pracownicy'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'
import { e517 } from '../../../POM/Produkcja/Słowniki/E517 Grupy asortymentowe'
import { e519 } from '../../../POM/Produkcja/Słowniki/E519 Stanowiska'
import { e51901 } from '../../../POM/Produkcja/Słowniki/E519.01 Stanowiska - szczegóły'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia Zewnetrzne'
import { e51601 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 - Zamowienia zewnetrzne - szczegoly'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki Wewnetrzne'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'

describe('SEPP-14501 Rola 1', () => {

    it('Rola 1 - Administrator', () => {
        cy.log('Krok 1 - Loguję się jako Administrator')
        cy.visit('')
            .loginAdmin()

        cy.log('Krok 2 - Jestem na ekranie Porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzWidok()
        e20.sprawdzWidok1()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie Kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzWidok1()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 4 - Jestem na ekranie Audycje i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzWidok()
        e200.sprawdzWidok1()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Jestem na ekranie Zamówienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzWidok()
        e30.sprawdzWidok1()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie Delegacje i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzWidok()
        e40.sprawdzFiltryZaawansowane()
        e40.sprawdzWidok1()

        cy.log('Krok 7 - Jestem na ekranie Faktury i sprawdzam poprawność pól')
        cy.goToMenu('Faktury')
        e35.sprawdzWidok()
        e35.sprawdzWidok1()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie Rachunki Wewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.filtrujPoNumerzePierwszegoRachunku()
        e38.sprawdzWidok()
        e38.sprawdzWidok1()
        e38.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie Wnioski o przydzielenie zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzFiltryZaawansowane()
        e501.edytujWniosekPierwszyPrzycisk().click({force:true})
        e502.sprawdzWidok()
        e502.dodajPlikDoRepoPrzycisk().should('be.visible')
        e502.dodajLinkDoZalPrzycisk().should('be.visible')
        e502.sprawdzWidokOsobyNaPlanie()
        e502.zamknijOsobyNaPlanie().click()
        e502.sprawdzWidokHistoriaZmian()
        e502.historiaZamknij().click()
        e502.powrotPrzycisk().click() 

        cy.log('Krok 10 - Jestem na ekranie Zamówienia zewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.sprawdzWidok()
        e516.sprawdzWidok1()
        e516.sprawdzFiltryZaawansowane()
        e516.idZamowieniaKolumna().click({force: true})
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click({force: true})
        e51601.sprawdzWidok()

        cy.log('Krok 11 - Jestem na ekranie Planowanie produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 12 - Jestem na ekranie Zlecenia pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzFiltryZaawansowane()
        e504.zaawansowanePrzycisk().click()
        e504.przegladZleceniaPracyPierwszyPrzycisk().click({force: true})
        e504.zamknijPopUpXPrzycisk().click()

        cy.log('Krok 13 - Jestem na ekranie Grafiki i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zakres godzin')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zlecenia pracy')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('czas łączny (w godz.)')
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Karty pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.rodzajKartyLista().select('Sprzętowa', {force: true})
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.sprawdzWidok()
        e509.sprawdzWidok1()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 15 - Jestem na ekranie Czas pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 16 - Jestem na ekranie Koszt pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()
        
        cy.log('Krok 17 - Jestem na ekranie Osoby przebywające na planie i sprawdzam poprawność pól')
        cy.goToMenu('Osoby przebywające na planie')
        e518.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Dyżury i sprawdzam poprawność pól')
        cy.goToMenu('Dyżury')
        e515.sprawdzWidok()

        cy.log('Krok 19 - Jestem na ekranie Cennik i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 20 - Jestem na ekranie Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 21 - Jestem na ekranie Pracownicy produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Pracownicy produkcji')
        e507.sprawdzWidok()

        cy.log('Krok 22 - Jestem na ekranie Słowniki -> Powody niedostępności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()
        e514.sprawdzWidok1()

        cy.log('Krok 23 - Jestem na ekranie Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 24 - Jestem na ekranie Grupy asortymentowe i sprawdzam poprawność pól')
        cy.goToMenu('Grupy asortymentowe')
        e517.sprawdzWidok()

        cy.log('Krok 25 - Jestem na ekranie Stanowiska i sprawdzam poprawność pól')
        cy.goToMenu('Stanowiska')
        e519.sprawdzWidok()
        e519.sprawdzWidok1()
        e519.nazwaPoleTekstowe().type('kierownik muzyczny')
        e519.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e519.edycjaPierwszyPrzycisk().click()
        e51901.sprawdzWidok()
        e51901.sprawdzWidokEdycja()
        e51901.powrotPrzycisk().click()     
        e519.podgladPierwszyPrzycisk().click()
        e51901.sprawdzWidok()

        cy.log('Krok 26 - Jestem na ekranie Rozliczenie kosztów zasobow i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()

        cy.log('Krok 27 - Jestem na ekranie Administracja -> Twórcy klikam naprzycisk dodaj twórce i sprawdzam poprawność pól')
        cy.goToMenu('Twórcy')
        e75.sprawdzWidok()
        
        cy.log('Krok 28 - Jestem na ekranie Administracja -> Użytkownicy i sprawdzam poprawność pól')
        cy.goToMenu('Użytkownicy')
        e78.sprawdzWidok()
        e78.sprawdzWidok1()

        cy.log('Krok 29 - Jestem na ekranie Administracja -> Dziennik zdarzeń i sprawdzam poprawność pól')
        cy.goToMenu('Dziennik zdarzeń')
        e71.sprawdzWidok()

        cy.log('Krok 30 - Jestem na ekranie Administracja -> Kontrahenci wciskam przycisk dodaj kontrahenta i sprawdzam poprawność pól')
        cy.goToMenu('Kontrahenci')
        e7601.sprawdzWidok()

        cy.log('Krok 31 - Jestem na ekranie Administracja -> VAT w kosztach % i sprawdzam poprawność pól')
        cy.goToMenu('VAT w kosztach %')
        e77.sprawdzWidok()

        cy.log('Krok 32 - Jestem na ekranie Administracja -> Rodzaj statusu i sprawdzam poprawność pól')
        cy.goToMenu('Rodzaj statusu')
        e72.sprawdzWidok()
        e72.agencjaLista().select('AKFiS',{force: true})
        e72.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e72.sprawdzPopup1()

        cy.log('Krok 33 - Jestem na ekranie Administracja -> Słowniki i sprawdzam poprawność pól')
        cy.goToMenu('Słowniki')
        e73.sprawdzWidok()
        e73.sprawdzPopup1()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})


