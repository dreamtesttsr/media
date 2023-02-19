import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e24 } from '../../../../POM/Planowanie/E24 Ewidencja sprzedazy'
import { daneTestowe } from '../../../../fixtures/daneTestowe'

describe('SEPP-18075 Wyliczenie ceny sprzedaży JW', () => {
    it('Wyliczenie ceny sprzedaży JW', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik jednostki współpracującej')
        cy.visit('/')
            .loginPracownikJednostkiWspolpracujacej()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.numerPorozumieniaPoleTekstowe().type(daneTestowe.nrPorozumienia)
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 3 - Jestem na szczegółach porozumienia i wchodzę w edycję audycji')
        e22.edytujAudycjePierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Jestem na ekranie Ewidencji sprzedaży wybranej audycji i wyliczam cenę sprzedaży JW')
        // let spy = cy.spy(window, 'alert')
        const stub = cy.stub()
        cy.on('window:alert', stub)
        e24.cenaSprzedazyJWPoleTekstowe().clear().type('0')
        e24.zapiszEdycjaPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e24.cenaSprzedazyJWPoleTekstowe().should('have.attr', 'value', '0,00')
        e24.wyliczCeneSprzedazyJWPrzycisk().click().wait(2000).then(() => {
            expect(stub).to.haveOwnProperty('callCount')
            expect(stub).to.not.be.called
            // expect(stub.getCall(0)).not.to.be.calledWithMatch('Podczas przetwarzania wystąpiła sytuacja wyjątkowa')      
        })
        e24.zapiszEdycjaPrzycisk().click()

        cy.log('Krok 5 - Weryfikuje poprawność wyliczeń')
        e22.edytujAudycjePierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e24.cenaSprzedazyJWPoleTekstowe().should('have.attr', 'value', '1992,26')        

        // Wylogowanie
        cy.logoutUser()
    })
})