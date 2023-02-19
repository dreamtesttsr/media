class E51604{

    // Selektory
    tytulProdukcjiPoleTekstowe(){
        return cy.get('input#AuditionName')
    }

    wartoscSzacunkowaPoleTekstowe(){
        return cy.get('input#CalSum')
    }

    wartoscOfertyPoleTekstowe(){
        return cy.get('input#OfferSum')
    }

    zapiszPrzycisk(){
        return cy.get('button#EditCostModal-yesBtn').contains('Zapisz')
    }

    anulujPrzycisk(){
        return cy.get('button#EditCostModal-noBtn').contains('Anuluj')
    }
}

export const e51604 = new E51604()