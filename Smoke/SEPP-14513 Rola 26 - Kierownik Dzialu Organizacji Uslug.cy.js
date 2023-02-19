import { e76 } from '../../../POM/Administracja/E76 Kontrahenci'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e503 } from '../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji'
import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e506 } from '../../../POM/Produkcja/Słowniki/E506 Cennik'
import { e508 } from '../../../POM/Produkcja/Słowniki/E508 Elementy sprzetowe'
import { e512 } from '../../../POM/Produkcja/Słowniki/E512 Miejsca realizacji'
import { e501 } from '../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e504 } from '../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy'
import { fWspolne } from '../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { daneTestowe } from '../../../fixtures/daneTestowe'
import { e51601 } from '../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

describe('SEPP-14513 Rola 26', () => {

    it('Rola 26 - Kierownik Działu Organizacji Usług', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik Działu Organizacji Usług')
        cy.visit('/')
            .loginKierownikDzialuOrganizacjiUslug()

        cy.log('Krok 2 - Jestem na ekranie Porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')
        e20.sprawdzWidok()
        e20.sprawdzWidok26()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie Kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzWidok26()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 4 - Jestem na ekranie Audycje i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzWidok()
        e200.sprawdzWidok26()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Jestem na ekranie listy Zamówień i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzWidok()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie listy Delegacji i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.filtrujPoNumerzePierwszegoZamowienia()
        e40.sprawdzWidok()
        e40.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie Faktury i sprawdzam poprawność pól')
        cy.goToMenu('Faktury')
        e35.sprawdzWidok()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Jestem na ekranie Rachunki wewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.filtrujPoNumerzePierwszegoRachunku()
        e38.sprawdzWidok()
        e38.sprawdzFiltryZaawansowane()

        cy.log('Krok 9 - Jestem na ekranie Wnioski o przydzielenie zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.sprawdzWidok()
        e501.sprawdzWidok26()
        e501.sprawdzFiltryZaawansowane()

        cy.log('Krok 10 - Jestem na ekranie Zamówienia zewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.numerZamowieniaPoleTekstowe().type(daneTestowe.nrZamZew)
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.sprawdzWidok()
        e516.sprawdzWidok26()
        e516.sprawdzFiltryZaawansowane()

        cy.log('Krok 11 - Jestem na ekranie szczegółów zamówienia zewnętrznego i sprawdzam poprawność pól')
        e516.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.sprawdzWidok()
        e51601.sprawdzWidok26()

        cy.log('Krok 12 - Jestem na ekranie Planowanie produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Planowanie produkcji')
        e503.sprawdzWidok()
        e503.sprawdzFiltryZaawansowane()

        cy.log('Krok 13 - Jestem na ekranie Zlecenia pracy i sprawdzam poprawność pól')
        cy.goToMenu('Zlecenia pracy')
        e504.filtrujPoNumerzePierwszegoZlecenia()
        e504.sprawdzWidok()
        e504.sprawdzWidok26()
        e504.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Słowniki -> Cennik usług i sprzętu i sprawdzam poprawność pól')
        cy.goToMenu('Cennik usług i sprzętu')
        e506.sprawdzWidok()

        cy.log('Krok 15 - Jestem na ekranie Słowniki -> Sprzęt i sprawdzam poprawność pól')
        cy.goToMenu('Sprzęt')
        e508.sprawdzWidok()

        cy.log('Krok 16 - Jestem na ekranie Słowniki -> Miejsca realizacji i sprawdzam poprawność pól')
        cy.goToMenu('Miejsca realizacji')
        e512.sprawdzWidok()

        cy.log('Krok 17 - Jestem na ekranie Raporty -> Rozliczenie kosztów zasobów i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Administracja -> Kontrahenci i sprawdzam poprawność pól')
        cy.goToMenu('Kontrahenci')
        e76.sprawdzWidok()
        e76.sprawdzWidok26()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})