import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e51601 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly'
import { e51602 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.02 Wyszukaj zasob'

describe('SEPP-18066 Zamówienie zewnętrzne z zasobami z różnych produkcji', () => {
    it('SEPP-18066 Zamówienie zewnętrzne z zasobami z różnych produkcji', () => {
        cy.log('Krok 1 - Loguję się jako Koordynator Usług')
        cy.visit('/')
            .loginKoordynatorUslug()

        cy.log('Krok 2 - Jestem na ekranie listy zamówień zewnętrznych i klikam Edycja na wybranej rezerwacji')
        cy.goToMenu('Zamówienia zewnętrzne')
        e516.nazwaAudycjiPoleTekstowe().type('SEPP-18066A')
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie tworzenia zamówienia zewnętrznego, wypełniam wymagane dane i klikam Zapisz')
        e51601.grupaAsortymentowaLista().select('sprzęt oświetleniowy efektowy/sceniczny', {force: true})
        e51601.opisZamowieniaPoleTekstowe().type('test opis')
        e51601.miejsceRealizacjiPoleTekstowe().type('test miejsce')
        e51601.stronaPokrywajacaKosztyZakwaterowaniaLista().select('TVP', {force: true})
        e51601.uslugaUwzgledniaMontazDemontazLista().select('nie', {force: true})
        e51601.sposobKalkulacjiOfertyLista().select('całość', {force: true})
        e51601.uslugaUwzgledniaTransportSprzetuLista().select('nie dotyczy', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Sprawdzam poprawność utworzonego zamówienia, w tym wartość kosztorysową')
        e51601.grupaAsortymentowaLista().children('option[selected]').should('contain', 'sprzęt oświetleniowy efektowy/sceniczny')
        e51601.opisZamowieniaPoleTekstowe().should('contain', 'test opis')
        e51601.miejsceRealizacjiPoleTekstowe().should('have.value', 'test miejsce')
        e51601.stronaPokrywajacaKosztyZakwaterowaniaLista().children('option[selected]').should('contain', 'TVP')
        e51601.uslugaUwzgledniaMontazDemontazLista().children('option[selected]').should('contain', 'nie')
        e51601.sposobKalkulacjiOfertyLista().children('option[selected]').should('contain', 'całość')
        e51601.uslugaUwzgledniaTransportSprzetuLista().children('option[selected]').should('contain', 'nie dotyczy')
        e51601.wartoscKosztorysowaPoleTekstowe(0).should('contain', '600,00')

        cy.log('Krok 5 - Dodaję do zamówienia drugi zasób zewnętrzny z wybranego porozumienia i sprawdzam poprawność wartości kosztorysowej')
        e51601.dodajRezerwacjePrzycisk().click()
        e51602.tytulAudycjiPoleTekstowe().type('SEPP-18066A')
        e51602.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51602.zaznaczPierwszyPrzyciskWyboru().check()
        e51602.zatwierdzPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('table#externalRequestList_table > tbody').should('have.prop', 'childElementCount', 2)
        e51601.wartoscKosztorysowaPoleTekstowe(0).should('contain', '600,00')

        cy.log('Krok 6 - Dodaję do zamówienia zasoby z innego porozumienia i sprawdzam poprawność wartości kosztorysowej')
        e51601.dodajRezerwacjePrzycisk().click()
        e51602.tytulAudycjiPoleTekstowe().clear().type('SEPP-18066B')
        e51602.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51602.zaznaczWszystkiePrzyciskWyboru().check()
        e51602.zatwierdzPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('table#externalRequestList_table > tbody').should('have.prop', 'childElementCount', 4)
        e51601.wartoscKosztorysowaPoleTekstowe(0).should('contain', '600,00')
        e51601.wartoscKosztorysowaPoleTekstowe(1).should('contain', '1400,00')

        cy.log('Krok 7 - Powracam na ekran listy zamówień zewnętrznych i anuluję utworzone zamówienie')
        e51601.powrotPrzycisk().click()
        e516.ukryjRezerwacjePrzyciskWyboru().check()
        e516.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e516.anulacjaZamowieniaPierwszyPrzycisk().click()
        e516.powodAnulowaniaZamowieniaPopupPoleTekstowe().type('Anuluję zamówienie')
        e516.potwierdzAnulowaniePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})