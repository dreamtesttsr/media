import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'
import { e25 } from '../../../../POM/Planowanie/E25 Kosztorysy'

describe('SEPP-15627 Edytowalność wynagrodzeń w zależności od zakładu', () => {
    it('Edytowalność wynagrodzeń w zależności od zakładu', () => {
        cy.log('Krok 1 - Loguję się jako Kosztorysujący JU, rola 39+3, zakład TPTB, TPTS)')
        cy.visit('/')
            .login('test_user_31', 'TVPPassw0rd')
            .loginAssert('test_user_31')
            
        cy.log('Krok 2 - jestem na oknie wyszukiwania kosztorysów')
        cy.goToMenu('Kosztorysy')
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - wyszukuję kosztorys i przechodzę w tryb edycji')
        e25.nazwaAudycjiPoleTekstowe().type('SEPP-15627 EDYTOWALNOŚĆ WYNAGRODZEŃ W ZALEŻNOŚCI OD ZAKŁADU')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()
                       
        cy.log('Krok 4 - ukrywam niewypelnione pozycje')
        e23.pokazPozycjeRadio().click()
        e23.rodzajKosztuPrzycisk('Prace literackie').should('not.exist')

        cy.log('Krok 5 - rozwijam grupę "030 Prace reżysersko-realizacyjne"')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        
        cy.log('Krok 6 - sprawdzam widoczność przycisku dla pozycji "Charakteryzator" i brak widoczności przycisków dla pozycji "Operator dźwięku", "Reżyser udźwiękowienia"')
        e23.edytujKosztPrzycisk('Charakteryzator').should('be.visible')
        e23.edytujKosztPrzycisk('Operator dźwięku').should('not.exist')
        e23.edytujKosztPrzycisk('Reżyser udźwiękowienia').should('not.exist')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        cy.log('Krok 7 - rozwijam grupę "070 Prace techniczne i pomocnicze"')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        
        cy.log('Krok 8 - sprawdzam widoczność przycisku dla pozycji "RTF - technik nagłośnienia"')
        e23.edytujKosztPrzycisk('RTF - technik nagłośnienia').should('be.visible')

        cy.log('Krok 9- Wylogowanie użytkownika')
        cy.logoutUser()

        cy.log('Krok 10 - Loguję się jako Akceptant KU komórki wyspecjalizowanej, rola 40+3, zakład TPTP)')
        cy.visit('/')
            .login('test_user_32', 'TVPPassw0rd')
            .loginAssert('test_user_32')

        cy.log('Krok 11 - jestem na oknie wyszukiwania porozumień')
        cy.goToMenu('Kosztorysy')
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 12 - wyszukuję kosztorys i przechodzę w tryb edycji')
        e25.nazwaAudycjiPoleTekstowe().type('SEPP-15627 EDYTOWALNOŚĆ WYNAGRODZEŃ W ZALEŻNOŚCI OD ZAKŁADU')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()
       
        cy.log('Krok 13 - ukrywam niewypelnione pozycje')
        e23.pokazPozycjeRadio().click()
        e23.rodzajKosztuPrzycisk('Prace literackie').should('not.exist')

        cy.log('Krok 14 - rozwijam grupę "030 Prace reżysersko-realizacyjne"')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        cy.log('Krok 15 - sprawdzam widoczność przycisku dla pozycji "Reżyser udźwiękowienia" i brak widoczności przycisków dla pozycji "Operator dźwięku", "Charakteryzator"')
        e23.edytujKosztPrzycisk('Reżyser udźwiękowienia').should('be.visible')
        e23.edytujKosztPrzycisk('Operator dźwięku').should('not.exist')
        e23.edytujKosztPrzycisk('Charakteryzator').should('not.exist')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        cy.log('Krok 16 - rozwijam grupę "070 Prace techniczne i pomocnicze"')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')

        cy.log('Krok 17 - sprawdzam widoczność przycisku dla pozycji "RTF - technik nagłośnienia"')
        e23.edytujKosztPrzycisk('RTF - technik nagłośnienia').should('not.exist')

        cy.log('Krok 18 - Wylogowanie użytkownika')
        cy.logoutUser()
             
    })
})  


