import { e51901 } from '../../../../POM/Produkcja/Słowniki/E519.01 Stanowiska - szczegóły'
import { e519 } from '../../../../POM/Produkcja/Słowniki/E519 Stanowiska'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { faker } from '../../../../support/e2e'

describe('SEPP-15244 Dodanie, modyfikacja usunięcie pozycji słownika Stanowisko', () => {
    const rndStr = faker.lorem.words(3)

    it('Dodanie, modyfikacja, usunięcie pozycji słownika Stanowisko', () => {
        cy.log('Krok 1 - Loguję się jako Koordynator Usług (producent)')
        cy.visit('/')
            .loginAdministratorBiznesowyCUPPracownicy()

        cy.log('Krok 2 - jestem na oknie wyszukiwania stanowisk')
        cy.goToMenu('Stanowiska')

        cy.log('Krok 3 - dodaję pozycje słownika i wypełniam dane')
        e519.dodajStanowiskoPrzycisk().click()
        let nazwaStanowiska
        e51901.nazwaPoleTekstowe().type('Testowe Stanowisko ' + rndStr)
        e51901.kodSapPoleTekstowe().type('TST')
        e51901.dopuszczalneKategoriePracownikaLista().select('I', {force: true})
        e51901.lpPoleTekstowe().type('999999')
        e51901.nazwaPoleTekstowe().invoke('prop', 'value').then((value1)=>{
            nazwaStanowiska = value1
        
            e51901.zapiszPrzycisk().click()
            fWspolne.sprawdzProgressBar()
         
            cy.log('Krok 4 - Wyszukuję dodany rekord i przechodzę do edycji')
            e519.nazwaPoleTekstowe().type(nazwaStanowiska)
            e519.wyszukajPrzycisk().click()
            fWspolne.sprawdzProgressBar()
            e519.edycjaPierwszyPrzycisk().click()

            cy.log('Krok 5 - Weryfikuje dane w polach')
            e51901.nazwaPoleTekstowe().should('have.attr','value',nazwaStanowiska)
            e51901.kodSapPoleTekstowe().should('have.attr','value','TST')
            e51901.dopuszczalneKategoriePracownikaLista().contains('I')
            e51901.lpPoleTekstowe().should('have.attr','value', '999999')

            cy.log('Krok 6 - Edytuję kategorię pracownika i zapisuję zmianę')
            e51901.dopuszczalneKategoriePracownikaLista().select('II', {force: true})
            e51901.zapiszPrzycisk().click()
            fWspolne.sprawdzProgressBar()

            cy.log('Krok 7 - Wyszukuję dodany rekord i sprawdzam poprawność prezentacji danych')
            e519.podgladPierwszyPrzycisk().click()
            e51901.nazwaPoleTekstowe().should('have.attr','value',nazwaStanowiska)
            e51901.kodSapPoleTekstowe().should('have.attr','value','TST')
            e51901.dopuszczalneKategoriePracownikaLista().should('have.attr','value','II')
            e51901.lpPoleTekstowe().should('have.attr','value', '999999')
            e51901.powrotPrzycisk().click()
        })
        
        cy.log('Krok 8 - Wyszukuje i usuwam wcześniej dodany rekord')   
        e519.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e519.usunPierwszyPrzycisk().click()
        cy.get('a[id="confirmBtn"]').click()
        fWspolne.sprawdzProgressBar()
        cy.get('#positionsList_table_info').contains('Pozycji 0 z 0 dostępnych')

        cy.log('Krok 9 - Weryfikacja pozycji cennikowych')
        e519.nazwaPoleTekstowe().clear().type('obsługa agregatu')
        e519.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e519.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51901.pozycjeCennikaTabela().should('be.visible')
        cy.get('#positionList_table > tbody > tr > td:nth-child(1)').each((el) => {
            expect(el).to.contain.text('agregatu')
        })

        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})