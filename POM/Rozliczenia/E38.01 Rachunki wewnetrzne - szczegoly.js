class E3801{
    // Selektory
    zapiszPrzycisk(){
        return cy.get('button.btn-success').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button.return-button').contains('Powrót')
    }

    agencjaLista(){
        return cy.get('select#AgencyId')
    }

    jednostkaTVPLista(){
        return cy.get('select#IdOrganizationUnit')
    }

    nrRachunkuPoleTekstowe(){
        return cy.get('input#Number')
    }

    dataRozliczeniaData(){
        return cy.get('input#InvoiceDate')
    }

    kosztLaczniePoleTekstowe(){
        return cy.get('input#DebtValueNet')
    }

    doZaplatyPoleTekstowe(){
        return cy.get('input#AmountLeftToPayNet')
    }

    kwotaRozliczeniaPoleTekstowe(){
        return cy.get('input#AmountNet')
    }

    nrZamWewnLista(){
        return cy.get('select#IdOrder')
    }

    kosztorysLista(){
        return cy.get('select#IdTitle')
    }

    nrPorozumieniaLista(){
        return cy.get('select#IdAgreement')
    }

    producentLista(){
        return cy.get('select#IdProducer')
    }

    uwagiPoleTekstowe(){
        return cy.get('textarea#SettlementNotes')
    }

    dodajPlikDoRepozytoriumPrzycisk(){
        return cy.get('button[title="Dodaj Plik Do Repozytorium"]')
    }

    dodajLinkDoZalacznikaPrzycisk(){
        return cy.get('button[title="Dodaj Link Do Załącznika"]')
    }

    // Metody
    sprawdzWidok(){
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.jednostkaTVPLista().should('be.visible')
        this.nrRachunkuPoleTekstowe().should('be.visible')
        this.dataRozliczeniaData().should('be.visible')
        this.kosztLaczniePoleTekstowe().should('be.visible')
        this.doZaplatyPoleTekstowe().should('be.visible')
        this.kwotaRozliczeniaPoleTekstowe().should('be.visible')
        this.nrZamWewnLista().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.nrPorozumieniaLista().should('be.visible')
        this.producentLista().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

}

export const e3801 = new E3801()