const { e200 } = require('../../../../POM/Audycje/E200 Audycje')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e26 } = require('../../../../POM/Planowanie/E26 Masowa ewidencja sprzedazy')

describe('SEPP-1180 Walidacja masowej ewidencji sprzedaży', function () {

    it('Walidacja masowej ewidencji sprzedaży', function () {
        // Strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // Przejście na ekran listy Audycji
        cy.goToMenu('Audycje')

        // Wyfiltrowanie audycji po numerze odcinka i zaznaczenie dwóch pierwszych pozycji na liście
        cy.log('Krok 1 - zaznaczenie dwoch rozych audycji')
        cy.get('#EpisoderNumberFrom').type('5')
        cy.get('#EpisoderNumberTo').type('5')
        e200.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('input.massEvidenceCheckbox').eq(0).check().should('be.checked')
        cy.get('input.massEvidenceCheckbox').eq(1).check().should('be.checked')

        // Klikniecie przycisk do masowej ewidencji i weryfikacja tekstu komunikatu walidacyjnego
        cy.log('Krok 2 - klikniecie przycisk Masowa ewidencja sprzedaży')
        e200.masowaEwidencjaSprzedazyPrzycisk().click()
        fWspolne.komunikat().should('have.text', 'Uwaga! Brak możliwości edycji audycji z więcej, niż jednego kosztorysu. Wybierz audycje w ramach jednego kosztorysu i spróbuj ponownie.')
        fWspolne.komunikat().should('not.exist')

        // Weryfikacja działania checkboxa 'Zaznacz wszystkie audycje'
        e200.zaznaczWszystkieAudycjePrzyciskWyboru().check()
        cy.get('input.massEvidenceCheckbox').each(($checkbox) => {
            expect($checkbox).to.be.checked
        })
        e200.zaznaczWszystkieAudycjePrzyciskWyboru().uncheck()
        cy.get('input.massEvidenceCheckbox').each(($checkbox) => {
            expect($checkbox).to.not.be.checked
        })

        // Przejście na ekran masowej ewidencji sprzedaży
        cy.get('input.massEvidenceCheckbox').eq(0).check()
        e200.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.sprawdzURL()
        e26.audycjaTVPoleTekstowe().should('have.value', 'SPORT WIADOMOŚCI - KWIECIEŃ 2020')
        e26.zakresOdcPoleTekstowe().should('have.value', 5)

        // Wyloguj użytkownika
        cy.logoutUser()
    })
})
