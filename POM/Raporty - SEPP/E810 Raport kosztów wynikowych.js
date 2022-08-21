class E810 {
    
    // Selektory
    nrPorozumieniaLista(){
        return cy.get('#ReportAgreementId')
    }

    nazwaAudycji(){
        return cy.get('#AuditionTitleId')
    }

    kosztorysLista(){
        return cy.get('#TempTitleId')
    }

    excelPrzycisk(){
        return cy.get('button[type="button"]').should('contain', 'Excel')
    }

    generujRaportPrzycisk(){
        return cy.get('button[type="submit"]').should('contain', 'Generuj raport')
    }

    // Metody
    sprawdzWidok(){
        this.nrPorozumieniaLista().should('be.visible')
        this.nazwaAudycji().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.excelPrzycisk().should('be.visible')
        this.generujRaportPrzycisk().should('be.visible')
    }

}

export const e810 = new E810()