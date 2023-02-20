const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')

describe('SEPP-13005 Wydruk porozumienia PZ', function () {
    it('Wydruk porozumienia PZ', function () {
        // url = ''
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // 1. przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // 2. Wyszukanie porozumienia PZ i wyświetlenie jego szczegółów
        e20.nazwaAudycjiTVPoleTekstowe().type('TEST-13005')
        e20.zaawansowanePrzycisk().click()
        e20.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e20.zaawansowaneWyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()

        // 3. Wybranie przycisku 'Drukuj'
        cy.get('#reportDropdownMenuLink').click()

        // 4. Sprawdzenie działania poszczególnych checkboxów na wyświetlonym popupie
        // Agencja wiodąca
        cy.get('#std_all').should('be.visible').click()
        cy.get('#PrintList>li>label>span').as('checkboxes')
        cy.get('@checkboxes').should('have.length', 11)
            .each(checkbox => {
                cy.wrap(checkbox).should('have.prop', 'className', 'far fa-check-square')
                cy.log('Prawidłowo zaznaczony checkbox')
            }) // alternatywnie: cy.get('@checkboxes').each(checkbox => {expect(checkbox[0].checked).to.equal(true)})
        cy.get('#std_all').should('be.visible').click()

        // Agencja współpracująca
        cy.get('#JW_all').should('be.visible').click()
        cy.get('li>ul>li>label>span').as('checkboxesJW')
        cy.get('@checkboxesJW').should('have.length', 7)
            .each(checkbox => {
                cy.wrap(checkbox).should('have.prop', 'className', 'far fa-check-square')
                cy.log('Prawidłowo zaznaczony checkbox')
            })
        cy.get('#JW_all').should('be.visible').click()

        // 5. Wybranie wydruku specyfikacji kosztów transportu, kosztorysu PZ, formatu PDF i rozpoczęcie drukowania
        cy.get('#std_SpecKosztowTran').should('be.visible').click()
        cy.get('#std_KosztorysAudycjiPz').should('be.visible').click()
        cy.get('select#JWIDList').select('CUP', {force: true})
        cy.get('#JW_SpecKosztowTranJW').should('be.visible').click()
        cy.get('#selectPdf > span').click()
        e22.drukujPopupPrzycisk().click()
        // brak możliwości weryfikacji wywołania raportu ze względu na ograniczenia narzędzia

        // 6. Wybranie formatu PDF(1 plik) i drukowanie
        cy.get('#Merge-In-One-File').click()
        cy.get('#printBtn').click()
        // brak możliwości weryfikacji wywołania raportu ze względu na ograniczenia narzędzia
        
        // 7. Wybranie formatu excel i drukowanie
        cy.get('#selectExcel > span').click()
        cy.get('#printBtn').click()
        // brak możliwości weryfikacji wywołania raportu ze względu na ograniczenia narzędzia

        // wylogowanie
        cy.logoutUser()
    })
})