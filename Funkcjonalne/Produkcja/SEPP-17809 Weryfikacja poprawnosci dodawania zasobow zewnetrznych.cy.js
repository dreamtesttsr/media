import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50209 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.09 Zatwierdzanie zmian we wniosku'

describe('SEPP-17809 Weryfikacja poprawności dodawania zasobów zewnętrznych', () => {
    let idRezerwacji

    it('Utworzenie rezerwacji wstępnej z zasobem zewnętrznym', () => {
        cy.log('Krok 1 - Loguję się jako Kierownik produkcji')
        cy.visit('/')
            .loginKierownikProdukcji()

        const jutro = DateTime.now().plus({days:1}).toFormat('dd.MM.yyyy')

        cy.log('Krok 2 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji wybranego wniosku')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('SEPP-17809')
        e501.pokazZdjeteZAntenyPrzyciskWyboru().check()
        e501.ukryjZrealizowanePrzyciskWyboru().uncheck()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()

        cy.log('Krok 3 - Dodaję nową rezerwację')
        e502.dodajRezerwacjePrzycisk().click()
        e50201.sekcjaLista().select('Technika studyjna', {force: true})
        e50201.dataRealizacjiOdData().clear().type(jutro)
        e50201.dataRealizacjiDoData().clear().type(jutro)
        e50201.miejsceRealizacjiLista().select('Studio S1', {force: true})
        e50201.zaznaczPierwszyDzienPrzyciskWyboru().check()
        e50201.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50201.audycjePierwszyPrzycisk().click()
        e50201.audycjaPierwszyPrzyciskWyboru().check()
        e50201.potwierdzAudycjePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        e50201.idRezerwacjiPoleTekstowe()
            .invoke('attr', 'value')
            .then((c) => {
                idRezerwacji = c
            })

        cy.log('Krok 4 - Dodaję sprzęty do rezerwacji poprzez pobranie ich z kosztorysu')
        e50201.zasobyPierwszyPrzycisk().then((zasoby) => {
            expect(zasoby).to.be.visible
            cy.wrap(zasoby).click({force: true})
        })
        e50200.pobierzZKosztorysuSprzetPrzycisk().click()
        e50200.takPobierzPopupPrzycisk().click()

        cy.log('Krok 5 - Wypełniam wymagane dane i zapisuję rezerwację')
        e50200.godzinaRozpoczeciaSprzetPierwszaData().type('8')
        e50200.godzinaZakonczeniaSprzetPierwszaData().type('12')
        e50200.uwagiSprzetPierwszePoleTekstowe().type('sprzęt zewnętrzny')
        e50200.kopiujDatyGodzinySprzetPierwszyPrzycisk().click()
        cy.wait(1000)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()    
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#ServiceTable > tbody').should('have.prop', 'childElementCount', 3)
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled').and('not.have.attr', 'checked', 'checked')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled').and('have.attr', 'checked', 'checked')

        cy.log('Krok 6 - Przekazuję rezerwację wstępną do Dyspozytury')
        e50200.wstepnaRezerwacjaPrzycisk().click()
        e50200.takWstepnaPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Akceptacja rezerwacji wstępnej z dodaniem zasobu zewnętrznego', () => {
        cy.log('Krok 7 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 8 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji zasobów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('not.have.prop', 'checked', true).check()
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 9 - Wstępnie akceptuję rezerwację')
        e50200.wstepnieZaakceptujPrzycisk().click()
        e50200.takWstepnieZaakceptujPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('have.prop', 'checked', true)
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')

        cy.log('Krok 10 - Dodaję zasób zewnętrzny do rezerwacji')
        e50200.dodajSprzetPrzycisk().click()
        cy.get('select[id*="ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_3"]').first().select('inny (sprzęt obcy) (50,00 zł. / godzina); teleprompter', {force: true})
        e50200.kopiujDatyGodzinySprzetPierwszyPrzycisk().click()
        cy.wait(1000)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[3].Comments"]').clear().type('zasób zew. dodany przez Dyspozytora')
        e50200.zapiszPrzycisk().click()
        e50200.powodyModyfikacjiWnioskuPopupPoleTekstowe().type('Jako Dyspozytor dodaje zasób zew.')
        e50200.zapiszPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#ServiceTable > tbody').should('have.prop', 'childElementCount', 4)
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('have.prop', 'checked', true)
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Złożenie zamówienia przez Kierownika Produkcji', () => {
        cy.log('Krok 11 - Loguję się jako Kierownik produkcji')
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.log('Krok 12 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji zasobów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 13 - Składam zamówienie')
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')
        e50200.zlozZamowieniePrzycisk().click()
        e50200.takZlozPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Akceptacja zamówienia przez Dyspozytora', () => {
        cy.log('Krok 14 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 15 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji zasobów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 16 - Akceptuję zamówienie')
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('have.prop', 'checked', true)
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')
        e50200.zaakceptujPrzycisk().click()
        e50200.takZaakceptujPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('have.prop', 'checked', true)
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Modyfikacja zamówienia przez Kierownika Produkcji', () => {
        cy.log('Krok 16 - Loguję się jako Kierownik produkcji')
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.log('Krok 17 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji zasobów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 18 - Dodaję zasób zewnętrzny do zamówienia')
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')
        e50200.dodajSprzetPrzycisk().click()
        cy.get('select[id*="ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_4"]').first().select('inny (nieujęty w cenniku CUP) TPTS (50,00 zł. / godzina); teleprompter', {force: true})
        e50200.kopiujDatyGodzinySprzetPierwszyPrzycisk().click()
        cy.wait(1000)
        e50200.kopiujTylkoNiewypelnionePopupPrzycisk().click()
        cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[4].Comments"]').clear().type('zasób zew. dodany przez Kierownik Produkcji')
        e50200.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50200.zamowienieZewPrzyciskWyboru(0).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })

    it('Akceptacja zmian przez Dyspozytora', () => {
        cy.log('Krok 19 - Loguję się jako Pracownik Dyspozytury')
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.log('Krok 20 - Jestem na ekranie listy wniosków o zasoby i przechodzę na ekran edycji zasobów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.idRezerwacjiPoleTekstowe().type(idRezerwacji)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.zmianyNiezatwierdzonePierwszyPrzycisk().click()
        
        cy.log('Krok 21 - Akceptuję zmiany')
        e50209.zatwierdzWszystkiePrzycisk().click()
        e50209.potwierdzZatwierdzWszystkiePopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#ServiceTable > tbody').should('have.prop', 'childElementCount', 5)
        e50200.zamowienieZewPrzyciskWyboru(0).should('not.have.attr', 'disabled', 'disabled').and('have.prop', 'checked', true)
        e50200.zamowienieZewPrzyciskWyboru(1).should('have.attr', 'disabled', 'disabled')
        e50200.zamowienieZewPrzyciskWyboru(3).should('have.attr', 'disabled', 'disabled')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})