class E808 {
    
    // Selektory
    nrPorozumieniaLista(){
        return cy.get('select[id="ReportAgreementId"]')
    }

    nazwaAudycjiLista(){
        return cy.get('select[id="ReportAuditionName"]')
    }

    nazwaKosztorysuLista(){
        return cy.get('select[id="ReportTitleId"]')
    }

    wersjaEtykieta(){
        return cy.get('input#ReportAgreementVersionName')
    }

    idAudycjiSapLista(){
        return cy.get('select[id="ReportAuditionIds"]')
    }

    generujRaportDlaWszystkichAudycjiPrzyciskWyboru(){
        return cy.get('input#GenerateForAllAuditions')
    }

    pokazWykorzystanieZasobowPrzyciskWyboru(){
        return cy.get('input#ReportShowResourcesUsage')
    }

    generujPrzycisk(){
        return cy.get('button.btn-info').contains('Generuj')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/ReckonUpCosts/Index') 
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Rozliczenie kosztów zasobów')
        this.nrPorozumieniaLista().should('be.visible')
        this.nazwaAudycjiLista().should('be.visible')
        this.nazwaKosztorysuLista().should('be.visible')
        this.wersjaEtykieta().should('be.visible')
        this.idAudycjiSapLista().should('be.visible')
        this.generujRaportDlaWszystkichAudycjiPrzyciskWyboru().should('be.visible')
        this.pokazWykorzystanieZasobowPrzyciskWyboru().should('be.visible')
        this.generujPrzycisk().should('be.visible')
    }
}

export const e808 = new E808()