class E50801 {
    
    // Selektory
    zapiszPrzycisk(){
        return cy.get('button#submitBtn').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button#EquipmentReturn').contains('Powrót')
    }

    historiaZmianPrzycisk(){
        return cy.get('button.btn-info').contains('Historia zmian')
    }
	
    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }
	
    pozycjaCennikaLista(){
        return cy.get('#EquipmentTypeId')
    }
	
    kodSAPPoletekstowe(){
        return cy.get('input#SapCode')
    }
	
    miejsceRealizacjiLista(){
        return cy.get('#RealizationPlaceId')
    }

    waznyOdPoleTekstowe(){
        return cy.get('input[title="Ważny od"]')
    }

    waznyDoPoleTekstowe(){
        return cy.get('input[title="Ważny do"]')
    }
	
    dodajOkresniedostepnosciPrzycisk(){
        return cy.get('button#addInaccessibilityButton')
    }

    odDniaPoleTekstowe(){
        return cy.get('input[title="Od dnia"]')
    }

    doDniaPoleTekstowe(){
        return cy.get('input[title="Do dnia"]')
    }

    odGodzinyPoleTekstowe(){
        return cy.get('input[title="Od godziny"]')
    }

    doGodzinyPoleTekstowe(){
        return cy.get('input[title="Do godziny"]')
    }

    powodNiedostepnosciLista(){
        return cy.get('select.inaccessibilityReasonName')
    }

    uwagiPoleTekstowe(){
        return cy.get('input.inaccessibilityNotes')
    }

    usunOkresNiedostepnosciPierwszyPrzycisk(){
        return cy.get('button.inaccessiblePeriodRemove').first()
    }

    dodajElementSprzetowyPrzycisk(){
        return cy.get('button[title="Dodaj element sprzętowy"]')
    }
		
    // Metody
    sprawdzWidok(){
        this.powrotPrzycisk().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.kodSAPPoletekstowe().should('be.visible')
        this.waznyOdPoleTekstowe().should('be.visible')
        this.waznyDoPoleTekstowe().should('be.visible')
    }

    sprawdzWidok12(){
        this.historiaZmianPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOkresniedostepnosciPrzycisk().should('be.visible')
        this.odDniaPoleTekstowe().should('be.visible')
        this.doDniaPoleTekstowe().should('be.visible')
        this.odGodzinyPoleTekstowe().should('be.visible')
        this.doGodzinyPoleTekstowe().should('be.visible')
        this.powodNiedostepnosciLista().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        this.usunOkresNiedostepnosciPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok14(){
        this.pozycjaCennikaLista().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOkresniedostepnosciPrzycisk().should('be.visible')
    }

}

export const e50801 = new E50801()