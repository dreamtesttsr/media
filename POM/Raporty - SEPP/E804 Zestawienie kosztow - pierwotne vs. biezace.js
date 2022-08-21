class E804 {
    
    // Selektory
    nrPorozumieniaLista(){
        return cy.get('#AgreementId')
    }

    kosztorysLista(){
        return cy.get('#TitleId')
    }

    zaznaczKosztyPowyzejZeraPrzycisk(){
        return cy.get('#checkAllOverZero').should('contain', 'Zaznacz koszty > 0,00 zł')
    }

    zaznaczOdznaczWszystkiePrzycisk(){
        return cy.get('#checkAllCosts').should('contain', 'Zaznacz/odznacz wszystkie')
    }

    generujRaportPrzycisk(){
        return cy.get('button[type="submit"]').should('contain', 'Generuj raport')
    }

    zaznaczPierwszyKosztPrzyciskWyboru(){
        return cy.get('span.icon.check-icon').first()
    }

    // Metody
    sprawdzWidok(){
        this.nrPorozumieniaLista().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.zaznaczKosztyPowyzejZeraPrzycisk().should('be.visible')
        this.zaznaczOdznaczWszystkiePrzycisk().should('be.visible')
        this.generujRaportPrzycisk().should('be.visible')
        this.zaznaczPierwszyKosztPrzyciskWyboru().should('be.visible')
    }
}

export const e804 = new E804()