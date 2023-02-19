import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e50307 } from '../../../../POM/Produkcja/Planowanie produkcji/E503.07 Szczegoly pozycji cennikowej'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-15613 Wybór pozycji cennikowej - filtrowanie', () => {

    it('Wybór pozycji cennikowej - filtrowanie', () => {
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 2 - Jestem na ekranie listy Wniosków o zasoby i przechodzę do ekranu szczegółów wybranej rezerwacji')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        e501.nazwaAudycjiTVPoleTekstowe().type('TEST-15613')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów rezerwacji i przechodzę na ekran wyboru stanowiska')
        e50200.dodajStanowiskoPrzycisk().click()
        
        cy.log('Krok 4 - Jestem na ekranie wyboru stanowiska i filtruję listę pozycji')
        e50212.pokazXPozycjiLista().select('10', {force: true})
        e50212.kategoriaLista().select('I', {force: true})
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('tbody > tr > td:nth-child(6)').each((el) => {
            expect(el).to.have.text('I')
        })
        e50212.nazwaPoleTekstowe().type('Asystent operatora kamery')
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('tbody > tr > td.sorting_1').each((el) => {
            expect(el).to.have.text('Asystent operatora kamery')
        })
        cy.get('tbody > tr > td:nth-child(6)').each((el) => {
            expect(el).to.have.text('I')
        })
        e50212.gatunekFormaLista().select('Publicystyka i edukacja', {force: true})
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('tbody > tr > td.sorting_1').each((el) => {
            expect(el).to.have.text('Asystent operatora kamery')
        })
        cy.get('tbody > tr > td:nth-child(4)').each((el) => {
            expect(el).to.have.text('Publicystyka i edukacja')
        })
        cy.get('tbody > tr > td:nth-child(6)').each((el) => {
            expect(el).to.have.text('I')
        })
        e50212.podgatunekLista().select('ABC - technika studyjna', {force: true})
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('tbody > tr > td.sorting_1').should('have.length', 1)
        cy.get('tbody > tr > td.sorting_1').each((el) => {
            expect(el).to.have.text('Asystent operatora kamery')
        })
        cy.get('tbody > tr > td:nth-child(4)').each((el) => {
            expect(el).to.have.text('Publicystyka i edukacja')
        })
        cy.get('tbody > tr > td:nth-child(5)').each((el) => {
            expect(el).to.have.text('ABC - technika studyjna')
        })
        cy.get('tbody > tr > td:nth-child(6)').each((el) => {
            expect(el).to.have.text('I')
        })

        cy.log('Krok 5 - Czyszczę filtry, a następnie znów wypełniam i dodaję stanowisko do rezerwacji')
        e50212.wyczyscFiltryPrzycisk().click()
        cy.get('tbody > tr > td.sorting_1').should('have.length.at.least', 10)
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().check({force: true})
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().should('be.checked')
        e50212.zaznaczWszystkiePrzyciskWyboru().dblclick({force: true})
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().should('not.be.checked')
        e50212.nazwaPoleTekstowe().type('Asystent operatora kamery')
        e50212.gatunekFormaLista().select('Publicystyka i edukacja', {force: true})
        e50212.podgatunekLista().select('ABC - technika studyjna', {force: true})
        e50212.kategoriaLista().select('I', {force: true})
        e50212.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().check({force: true})
        e50212.zatwierdzPrzycisk().click()

        cy.log('Krok 6 - Sprawdzam czy dodano poprawne stanowisko')
        e50200.szczegolyPozycjiCennikowejPrzycisk().click()
        e50307.szczegolyPozycjiCennikowejTooltip().should('contain.text', 'Asystent operatora kamery')
            .and('contain.text', 'Publicystyka i edukacja')
            .and('contain.text', 'ABC - technika studyjna')
            .and('contain.text', 'I')

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})