import { e808 } from '../../../POM/Raporty - SEPP/E808 Rozliczenie kosztow zasobow'
import { e38 } from '../../../POM/Rozliczenia/E38 Rachunki Wewnetrzne'
import { e200 } from '../../../POM/Audycje/E200 Audycje'
import { e20 } from '../../../POM/Planowanie/E20 Porozumienia'
import { e25 } from '../../../POM/Planowanie/E25 Kosztorysy'
import { e30 } from '../../../POM/Zaangazowanie/E30 Lista zamowien'
import { e40 } from '../../../POM/Zaangazowanie/E40 Delegacje'
import { e35 } from '../../../POM/Rozliczenia/E35 Lista faktur'
import { e806 } from '../../../POM/Raporty - SEPP/E806 Raport sprzedazy audycji'
import { e809 } from '../../../POM/Raporty - SEPP/E809 Zamowienia i rozliczenia porozumienia'
import { e75 } from '../../../POM/Administracja/E75 Tworcy'
import { e76 } from '../../../POM/Administracja/E76 Kontrahenci'
import { e72 } from '../../../POM/Administracja/E72 Rodzaj Statusu'
import { e73 } from '../../../POM/Administracja/E73 Slowniki'
import { e77 } from '../../../POM/Administracja/E77 VAT w kosztach'
import { e37 } from '../../../POM/Rozliczenia/E37 Szczegoly faktury'
import { e22 } from '../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e26 } from '../../../POM/Planowanie/E26 Masowa ewidencja sprzedazy'
import { e42 } from '../../../POM/Zaangazowanie/E42 Delegacja krajowa'
import { e44 } from '../../../POM/Zaangazowanie/E44 Delegacja zagraniczna'

describe('SEPP-14604 Rola 5', () => {

    it('Rola 5 - Pracownik Agencji', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik Agencji')
        cy.visit('')
            .loginPracownikAgencji()
                      
        cy.log('Krok 2 - Jestem na ekranie Porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Porozumienia')            
        e20.sprawdzWidok()
        e20.sprawdzWidok5()
        e20.sprawdzFiltryZaawansowane()

        cy.log('Krok 3 - Jestem na ekranie szczegółów Porozumienia i sprawdzam poprawność pól na ekranie masowej ewidencji sprzedaży')
        e20.edycjaPierwszyPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.sprawdzURL()
        e26.dodanieNowychOdcinkowRadio().click()
        e26.sprawdzWidokDodanieNowychOdcinkow()
        e26.edycjaIstniejacychOdcinkowRadio().click()
        e26.sprawdzWidokEdycjaIstniejacychOdcinkow()

        cy.log('Krok 4 - Jestem na ekranie Kosztorysy i sprawdzam poprawność pól')
        cy.goToMenu('Kosztorysy')
        e25.sprawdzWidok()
        e25.sprawdzWidok5()
        e25.sprawdzFiltryZaawansowane()

        cy.log('Krok 5 - Jestem na ekranie Audycje i sprawdzam poprawność pól')
        cy.goToMenu('Audycje')
        e200.sprawdzWidok()
        e200.sprawdzWidok5()
        e200.sprawdzFiltryZaawansowane()

        cy.log('Krok 6 - Jestem na ekranie Zamówienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia')
        e30.sprawdzWidok()
        e30.sprawdzWidok5()
        e30.sprawdzFiltryZaawansowane()

        cy.log('Krok 7 - Jestem na ekranie Delegacje i sprawdzam poprawność pól')
        cy.goToMenu('Delegacje')
        e40.sprawdzWidok()
        e40.sprawdzWidok5()
        e40.sprawdzFiltryZaawansowane()

        cy.log('Krok 8 - Przechodzę na ekran Delegacja krajowa i sprawdzam poprawność pól')
        e40.dodajDelegacjePrzycisk().click()
        e40.krajowaPopupPrzycisk().click()
        e42.sprawdzWidok()
        e42.agencjaLista().should('have.prop', 'innerText', 'AKFiS')
        e42.sprawdzWidokKosztyDelegacji()
        e42.powrotPrzycisk().click()

        cy.log('Krok 9 - Przechodzę na ekran Delegacja zagraniczna i sprawdzam poprawność pól')
        e40.dodajDelegacjePrzycisk().click()
        e40.zagranicznaPopupPrzycisk().click()
        e44.sprawdzWidok()
        e44.agencjaLista().should('have.prop', 'innerText', 'AKFiS')
        e44.sprawdzWidokKosztyDelegacji()

        cy.log('Krok 10 - Jestem na ekranie Faktury i sprawdzam poprawność pól')
        cy.goToMenu('Faktury')
        e35.sprawdzWidok()
        e35.sprawdzWidok5()
        e35.sprawdzFiltryZaawansowane()

        cy.log('Krok 11 - Jestem na ekranie szczegółów Faktury i sprawdzam poprawność pól')
        e35.edycjaPierwszyPrzycisk().click()
        e37.sprawdzWidok()
        e37.sprawdzWidok5()

        cy.log('Krok 12 - Jestem na ekranie Rachunki Wewnętrzne i sprawdzam poprawność pól')
        cy.goToMenu('Rachunki wewnętrzne')
        e38.sprawdzWidok()
        e38.sprawdzWidok5()
        e38.sprawdzFiltryZaawansowane()
        
        cy.log('Krok 13 - Jestem na ekranie Raport sprzedaży audycji i sprawdzam poprawność pól')
        cy.goToMenu('Raport sprzedaży audycji')
        e806.sprawdzWidok()
        e806.sprawdzWidok5()
        e806.sprawdzFiltryZaawansowane()

        cy.log('Krok 14 - Jestem na ekranie Rozliczenie kosztów zasobow i sprawdzam poprawność pól')
        cy.goToMenu('Rozliczenie kosztów zasobów')
        e808.sprawdzWidok()

        cy.log('Krok 15 - Jestem na ekranie Zamówienia i rozliczenia porozumienia i sprawdzam poprawność pól')
        cy.goToMenu('Zamówienia i rozliczenia porozumienia')
        e809.sprawdzWidok()
        e809.sprawdzFiltryZaawansowane()

        cy.log('Krok 16 - Jestem na ekranie Administracja -> Twórcy i sprawdzam poprawność pól')
        cy.goToMenu('Twórcy')
        e75.sprawdzWidok()

        cy.log('Krok 17 - Jestem na ekranie Administracja -> Kontrahenci i sprawdzam poprawność pól')
        cy.goToMenu('Kontrahenci')
        e76.sprawdzWidok()

        cy.log('Krok 18 - Jestem na ekranie Administracja -> Rodzaj statusu i sprawdzam poprawność pól')
        cy.goToMenu('Rodzaj statusu')
        e72.sprawdzWidok()

        cy.log('Krok 19 - Jestem na ekranie Administracja -> Słowniki i sprawdzam poprawność pól')
        cy.goToMenu('Słowniki')
        e73.sprawdzWidok()

        cy.log('Krok 20 - Jestem na ekranie Administracja -> VAT w kosztach % i sprawdzam poprawność pól')
        cy.goToMenu('VAT w kosztach %')
        e77.sprawdzWidok()

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })
})