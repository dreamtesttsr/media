import { e78 } from '../../../POM/Administracja/E78 Uzytkownicy'
import { e801 } from '../../../POM/Raporty - SEPP/E801 Porownanie transz'
import { e802 } from '../../../POM/Raporty - SEPP/E802 Zestawienie kosztow - wybrane kosztorysy'
import { e804 } from '../../../POM/Raporty - SEPP/E804 Zestawienie kosztow - pierwotne vs. biezace'
import { e806 } from '../../../POM/Raporty - SEPP/E806 Raport sprzedazy audycji'
import { e807 } from '../../../POM/Raporty - SEPP/E807 Poprzednie zaangazowanie vs. plan kolejny'
import { e809 } from '../../../POM/Raporty - SEPP/E809 Zamowienia i rozliczenia porozumienia'
import { e810 } from '../../../POM/Raporty - SEPP/E810 Raport kosztów wynikowych'
import { e507 } from '../../../POM/Produkcja/Słowniki/E507 Pracownicy'
import { e511 } from '../../../POM/Produkcja/Słowniki/E511 Dni swiateczne'
import { e514 } from '../../../POM/Produkcja/Słowniki/E514 Powody niedostepnosci zasobu'
import { e519 } from '../../../POM/Produkcja/Słowniki/E519 Stanowiska'

describe('SEPP-14432 Rola 7', () => {

    it('Rola 7 - Kontrolling', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Kontrollingu')
        cy.visit('/')
            .loginKontrolling()

        cy.log('Krok 2 - Jestem na ekranie Listy Użytkowników i sprawdzam poprawność pól')
        cy.goToMenu('Użytkownicy')
        e78.sprawdzWidok()

        cy.log('Krok 3 - Jestem na ekranie Listy Pracowników produkcji i sprawdzam poprawność pól')
        cy.goToMenu('Pracownicy produkcji')
        e507.sprawdzWidok()

        cy.log('Krok 4 - Jestem na ekranie Dni świątecznych i sprawdzam poprawność pól')
        cy.goToMenu('Dni świąteczne')
        e511.sprawdzWidok()

        cy.log('Krok 5 - Jestem na ekranie Powodów niedostępności zasobu i sprawdzam poprawność pól')
        cy.goToMenu('Powody niedostępności zasobów')
        e514.sprawdzWidok()

        cy.log('Krok 6 - Jestem na ekranie Porównania transz i sprawdzam poprawność pól')
        cy.goToMenu('Porównanie transz')
        e801.sprawdzWidok()

        cy.log('Krok 7 - Jestem na ekranie Zestawienie kosztów - wybrane kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Zestawienie kosztów - wybrane kosztorysy')
        e802.sprawdzWidok()

        cy.log('Krok 8 - Jestem na ekranie Zestawienie kosztów - pierwotne vs. bieżące i sprawdzam poprawność pól')
        cy.goToMenu('Zestawienie kosztów - pierwotne vs. bieżące')
        e804.sprawdzWidok()

        cy.log('Krok 9 - Jestem na ekranie Raport sprzedaży audycji i sprawdzam poprawność pól')
        cy.goToMenu('Raport sprzedaży audycji')
        e806.sprawdzWidok()

        cy.log('Krok 10 - Otwieram filtry zaawansowane i sprawdzam poprawność pól')
        e806.sprawdzFiltryZaawansowane()

        cy.log('Krok 11 - Jestem na ekranie Poprzednie zaangażowanie vs. plan kolejny i sprawdzam poprawność pól')
        cy.goToMenu('Poprzednie zaangażowanie vs. plan kolejny')
        e807.sprawdzWidok()

        cy.log('Krok 12 - Jestem na ekranie Zamówienia i rozliczenia porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia i rozliczenia porozumienia')
        e809.sprawdzWidok()

        cy.log('Krok 13 - Otwieram filtry zaawansowane i sprawdzam poprawność pól')
        e809.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Raport kosztów wynikowych i sprawdzam poprawność pól')
        cy.goToMenu('Raport kosztów wynikowych')
        e810.sprawdzWidok()

        cy.log('Krok 15 - Jestem na ekranie Stanowiska i sprawdzam poprawność pól')
        cy.goToMenu('Stanowiska')
        e519.sprawdzWidok()
        
        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser() 
    })
})