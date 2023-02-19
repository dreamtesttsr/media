class E807 {
    
    // Selektory
    nrPorozumieniaPierwszyLista(){
        return cy.get('#FirstAgreementId')
    }

    nrPorozumieniaDrugiLista(){
        return cy.get('#SecondAgreementId')
    }

    kosztorysPierwszyLista(){
        return cy.get('#FirstTitleId')
    }

    kosztorysDrugiLista(){
        return cy.get('#SecondTitleId')
    }

    stanPorozumieniaPierwszyLista(){
        return cy.get('#FirstAgreementState')
    }

    stanPorozumieniaDrugiLista(){
        return cy.get('#SecondAgreementState')
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
        this.nrPorozumieniaPierwszyLista().should('be.visible')
        this.nrPorozumieniaDrugiLista().should('be.visible')
        this.kosztorysPierwszyLista().should('be.visible')
        this.kosztorysDrugiLista().should('be.visible')
        this.stanPorozumieniaPierwszyLista().should('be.visible')
        this.stanPorozumieniaDrugiLista().should('be.visible')
        this.zaznaczKosztyPowyzejZeraPrzycisk().should('be.visible')
        this.zaznaczOdznaczWszystkiePrzycisk().should('be.visible')
        this.generujRaportPrzycisk().should('be.visible')
        this.zaznaczPierwszyKosztPrzyciskWyboru().should('be.visible')
    }
}

export const e807 = new E807()