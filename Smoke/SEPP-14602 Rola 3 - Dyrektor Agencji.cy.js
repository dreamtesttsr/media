import { e505 } from '../../../POM/Produkcja/Grafiki pracownikow/E505 Grafiki pracownikow'
import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { e509 } from '../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e550 } from '../../../POM/Produkcja/Raporty/E550 Czas pracy srodkow technicznych'
import { e553 } from '../../../POM/Produkcja/Raporty/E553 Koszty pracy srodkow technicznych'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e507 } from '../../../POM/Produkcja/Słowniki/E507 Pracownicy'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e806 } from '../../../POM/Raporty - SEPP/E806 Raport sprzedazy audycji'
import { e809 } from '../../../POM/Raporty - SEPP/E809 Zamowienia i rozliczenia porozumienia'
import { e75 } from '../../../POM/Administracja/E75 Tworcy'
import { e76 } from '../../../POM/Administracja/E76 Kontrahenci'
import { e72 } from '../../../POM/Administracja/E72 Rodzaj Statusu'
import { e73 } from '../../../POM/Administracja/E73 Slowniki'
import { e77 } from '../../../POM/Administracja/E77 VAT w kosztach'
import { e519 } from '../../../POM/Produkcja/Słowniki/E519 Stanowiska'
import { e22 } from '../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../POM/Planowanie/E23 Koszty planowane'
import { e93 } from '../../../POM/Pozostale/E93 Historia zmian'
import { e9301 } from '../../../POM/Pozostale/E93.01 Historia pozycji'
import { daneTestowe } from '../../../fixtures/daneTestowe'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

describe('SEPP-14602 Rola 3', () => {

    it('Rola 3 - Dyrektor Agencji', () => {
        cy.log('Krok 1 - Loguję się jako Dyrektor Agencji')
        cy.visit('/')
            .loginDyrektorAgencjiAKFiS()
                      
        cy.log('Krok 2 - Jestem na ekranie Porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzWidok()
        e20.sprawdzWidok3()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie szczegółów Porozumienia i sprawdzam poprawność pól')
        e20.numerPorozumieniaPoleTekstowe().type(daneTestowe.nrPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        e22.sprawdzWidok3()

        cy.log('Krok 4 - Jestem na ekranie kosztów planowanych i sprawdzam poprawność pól')
        e22.kosztyPlanowanePrzycisk().click()
        e23.sprawdzWidok()
        e23.historiaZmianPrzycisk().click()
        e93.sprawdzWidok()
        e93.zamknijPrzycisk().click()
        e23.historiaPozycjiPrzycisk().click()
        e9301.sprawdzWidok()
        e9301.zamknijPrzycisk().click()

        cy.log('Krok 5 - Jestem na ekranie Kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzWidok3()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie Audycje i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzWidok()
        e200.sprawdzWidok3()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie Zamówienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzWidok()
        e30.sprawdzWidok3()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie Delegacje i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzWidok()
        e40.sprawdzWidok3()
        e40.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie Faktury i sprawdzam poprawność pól')
        cy.goToMenu('Faktury')
        e35.sprawdzWidok()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Jestem na ekranie Rachunki Wewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.sprawdzWidok()
        e38.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 11 - Jestem na ekranie Wnioski o przydzielenie zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 12 - Jestem na ekranie Zamówienia zewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.filtrujPoNumerzePierwszegoZamowienia()
        e516.sprawdzWidok()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 13 - Jestem na ekranie Planowanie zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Zlecenia pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.sprawdzWidok()
        e504.sprawdzWidok3()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 15 - Jestem na ekranie Grafiki i sprawdzam poprawność pól')
        cy.goToMenu('Grafiki')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zakres godzin')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('zlecenia pracy')
        e505.sprawdzWidok()
        e505.wybierzWartoscRadio('czas łączny (w godz.)')
        e505.sprawdzFiltryZaawansowane()

        cy.log('Krok 16 - Jestem na ekranie Karty pracy i sprawdzam poprawność pól')
        cy.goToMenu('Karty pracy')
        e509.sprawdzWidok()
        e509.sprawdzFiltryZaawansowane()

        cy.log('Krok 17 - Jestem na ekranie Raporty -> Czas pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Czas pracy środków technicznych')
        e550.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Raporty -> Koszt pracy środków technicznych i sprawdzam poprawność pól')
        cy.goToMenu('Koszt pracy środków technicznych')
        e553.sprawdzWidok()

        cy.log('Krok 19 - Jestem na ekranie Słowniki -> Cennik usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 20 - Jestem na ekranie Słowniki -> Pracownicy produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Pracownicy produkcji')
        e507.sprawdzWidok()

        cy.log('Krok 21 - Jestem na ekranie Słowniki -> Stanowiska i sprawdzam poprawność pól')
        cy.goToMenu('Stanowiska')
        e519.sprawdzWidok()

        cy.log('Krok 22 - Jestem na ekranie Słowniki -> Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 23 - Jestem na ekranie Słowniki -> Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 24 - Jestem na ekranie Słowniki -> Powody niedostępności zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()

        cy.log('Krok 25 - Jestem na ekranie Słowniki -> Dni świąteczne i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()

        cy.log('Krok 26 - Jestem na ekranie Raport sprzedaży audycji i sprawdzam poprawność pól')
        cy.goToMenu('Raport sprzedaży audycji')
        e806.sprawdzWidok()
        e806.sprawdzFiltryZaawansowane()

        cy.log('Krok 27 - Jestem na ekranie Rozliczenie kosztów zasobow i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()

        cy.log('Krok 28 - Jestem na ekranie Zamówienia i rozliczenia porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia i rozliczenia porozumienia')
        e809.sprawdzWidok()
        e809.sprawdzFiltryZaawansowane()

        cy.log('Krok 29 - Jestem na ekranie Administracja -> Twórcy i sprawdzam poprawność pól')
        cy.goToMenu('Twórcy')
        e75.sprawdzWidok()

        cy.log('Krok 30 - Jestem na ekranie Administracja -> Kontrahenci i sprawdzam poprawność pól')
        cy.goToMenu('Kontrahenci')
        e76.sprawdzWidok()

        cy.log('Krok 31 - Jestem na ekranie Administracja -> Rodzaj statusu i sprawdzam poprawność pól')
        cy.goToMenu('Rodzaj statusu')
        e72.sprawdzWidok()

        cy.log('Krok 32 - Jestem na ekranie Administracja -> Słowniki i sprawdzam poprawność pól')
        cy.goToMenu('Słowniki')
        e73.sprawdzWidok()

        cy.log('Krok 33 - Jestem na ekranie Administracja -> VAT w kosztach % i sprawdzam poprawność pól')
        cy.goToMenu('VAT w kosztach %')
        e77.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})