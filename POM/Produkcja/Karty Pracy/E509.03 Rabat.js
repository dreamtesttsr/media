class E50903{
    rabatModal(){
        return cy.get('div[id="DiscountModal-modal"]')
    }
    rabatTypRadio(){
        return cy.get('input[id="DiscountType"]')
    }
    procentUdzielonegoRabatuPoleTekstowe(){
        return cy.get('input[id="DiscountValue"]')
    }
    
    dodajRabatPrzycisk(){
        return cy.get('button[id="btnAddNewDepartmentDiscount"]')
    }
    zapiszPrzycisk(){
        return cy.get('button[id="DiscountModal-yesBtn"]')
    }
    powrotPrzycisk(){
        return cy.get('button[id="DiscountModal-noBtn"]')
    }

    // Metody
    sprawdzWidok(){
        this.rabatModal().should('be.visible')
        this.rabatTypRadio().should('be.visible')
        this.procentUdzielonegoRabatuPoleTekstowe().should('be.visible')
        this.powrotPrzycisk().should('be.visible')    
    }
    sprawdzWidokEdycja(){
        this.dodajRabatPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')    
    }
}

export const e50903 = new E50903()
