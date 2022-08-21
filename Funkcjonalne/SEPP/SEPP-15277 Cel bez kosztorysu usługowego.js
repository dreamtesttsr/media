import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e25 } from '../../../../POM/Planowanie/E25 Kosztorysy'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'


describe('SEPP-15277 Cel bez kosztorysu usługowego', () => {
    it('Weryfikacja sekcji Kosztorysy', () => {
        // Strona główna i logowanie 
        cy.visit('')
            .loginProducent()        

        cy.log('Krok 1 - Przejście do edycji wybranego kosztorysu')
        // Przejście do zakładki Porozumienia
        cy.goToMenu('Kosztorysy')
        // Wyszukanie i przejście do szczegółów wybranego porozumienia
        cy.get('#TvAudition').type('TEST bez kosztorysu usługowego')
        e20.wyszukajPrzycisk().click()   
        fWspolne.sprawdzProgressBar()    
        e25.edycjaKosztorysuPierwszyPrzycisk().click()

        cy.log('Krok 2 - weryfikacja możliwości wyboru agencji CUP dla poszczególnych kosztów')
        e23.rodzajKosztuPoz1Przycisk('WYNAGRODZENIA').should('contain.text', ' 05 ')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('span[title="Jednostka TVP S.A."]').click()
        cy.get('.select2-search__field').type('CUP')
        cy.get('.select2-results__option').should('contain.text', 'Brak wyników')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPrzycisk('Prace literackie').should('contain.text', ' 010 ').scrollIntoView().click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Konspekt, szkic scenariusza z eksplikacją').click()
        cy.get('span[title="Jednostka TVP S.A."]').click()
        cy.get('.select2-search__field').type('CUP')
        cy.get('.select2-results__option').should('contain.text', 'Brak wyników')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace literackie').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').should('contain.text', ' 50 ').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').should('contain.text', '010 ').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Wóz transmisyjny mały - do 11 torów kamerowych').click()
        cy.get('span[title="Jednostka TVP S.A."]').click()
        cy.get('.select2-search__field').type('CUP')
        cy.get('.select2-results__option').should('contain.text', 'Brak wyników')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
    
        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})