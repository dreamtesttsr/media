import { DateTime } from 'luxon'
import { faker } from '../../../../support/e2e'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'


describe('SEPP-17909 Opracowanie, rejestracja i rozliczenie porozumienia', () => {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const zaMiesiac = DateTime.now().plus({days:30}).toFormat('dd.MM.yyyy')
    it('Utworzenie i opracowanie porozumienia', () => {
        cy.log('Krok 1 - Loguję się jako Producent CUP')
        cy.visit('/')
            .loginProducentCUP()

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i przechodzę na ekran tworzenia nowego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.dodajPorozumieniePrzycisk().click()

        cy.log('Krok 3 - Dodaję nowe porozumienie CUP - Usługa techniczna')
        e22.audycjaTVPoleTekstowe().type('SEPP-17909 ' + faker.random.alphaNumeric(8))
        e22.rodzajPorozumieniaLista().select('kosztorys usług własnych CUP', {force: true})
        e22.jednostkaZamawiajacaLista().select('Centrum Usług Produkcyjnych', {force: true})
        e22.redakcjaZamawiajacaLista().select('<N/D>', {force: true})
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        e22.rodzajUslugiLista().select('UT - Usługa techniczna', {force: true})
        e22.rodzajPlatnosciLista().select('Abonament', {force: true})
        e22.modelProdukcjiLista().select('K - Koprodukcja (wkład TVP)', {force: true})
        e22.celKosztorysuLista().select('[PU] Kosztorys planowany (poza Brief) z kosztorysem usługowym', {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Zgłoszenie opracowania')
        e22.czasPoleTekstowe().type('8')
        e22.formaLista().select('AUDYCJE PORANNE', {force: true})
        e22.terminRozpoczeciaPoleTekstowe().type(dzisiaj)
        e22.terminOdbioruPoleTekstowe().type(zaMiesiac)
        e22.zglosOpracowaniePrzycisk().click()
        e22.potwierdzZglosOprPopupPrzycisk().click()
        fWspolne.komunikat().should('be.visible').and('contain', 'Zgłoszono opracowanie')

        // Wylogowanie
        cy.logoutUser()
    })

    it('Zarejestrowanie i rozliczenie porozumienia', () => {
        cy.log('Krok 5 - Loguję się jako Pracownik Agencji CUP')
        cy.visit('/')
            .loginPracownikAgencjiCUP()

        cy.log('Krok 6 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 7 - Zarejestrowanie porozumienia')
        e22.zarejestrujPrzycisk().click()
        e22.potwierdzZarejestrujPopupPrzycisk().click()
        fWspolne.komunikat().should('be.visible').and('contain', 'Zarejestrowano porozumienie')
        
        cy.log('Krok 8 - Rozliczenie porozumienia')
        e22.rozliczPrzycisk().click()
        e22.komentarzRozliczPopupPoleTekstowe().type('Rozliczam')
        e22.potwierdzRozliczPopupPrzycisk().click()
        fWspolne.komunikat().should('be.visible').and('contain', 'Rozliczono porozumienie')
        
        // Wylogowanie
        cy.logoutUser()
    })
})