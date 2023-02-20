const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')

describe('SEPP-12591 Lista faktur - zapamiętywanie kolumn', function () {
    it('Lista faktur - zapamiętywanie kolumn', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // przejście do ekranu faktur
        cy.goToMenu('Faktury')

        // 1. Ukrycie kolumn z domyślnego widoku
        cy.get('.buttons-collection').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(1)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(2)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(6)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(8)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(9)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(12)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(19)').click()
        // Weryfikacja czy kolumny zostały ukryte
        cy.get('input#AgreementNumber').click({force: true})
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Data Faktury"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="NETTO"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Kontrahent"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Porozumienia"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nazwa audycji TV"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Zamówienia"]').should('not.exist')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Producent"]').should('not.exist')

        // 2. Ukazanie kilku, wcześniej niewidocznych kolumn
        cy.get('.buttons-collection').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(3)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(4)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(5)').click()

        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="VAT"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="VAT w kosztach"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="BRUTTO"]').should('be.visible')

        // 3. Wylogowanie i usunięcie ciasteczek
        cy.get('.dt-button-background').click()
        cy.logoutUser()
        cy.reload()

        // 4. Ponowne zalogowanie do aplikacji
        cy.visit('/')
            .loginProducent()
        // przejście do ekranu faktur
        cy.goToMenu('Faktury')
        fWspolne.sprawdzProgressBar()

        // 5. Weryfikacja widoku kolumn oraz przywrócenie orginalnego ustawienia kolumn
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="VAT"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="VAT w kosztach"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="BRUTTO"]').should('be.visible')

        cy.get('.buttons-collection').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(1)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(2)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(6)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(8)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(9)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(12)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(19)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(3)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(4)').click()
        cy.get('.dt-button-collection > .dropdown-menu> :nth-child(5)').click()

        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Data Faktury"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="NETTO"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Kontrahent"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Porozumienia"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nazwa audycji TV"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr Zamówienia"]').should('be.visible')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Producent"]').should('be.visible')

        cy.get('.dt-button-background').click()
        cy.logoutUser()
    })
})