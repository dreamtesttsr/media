class E93{
    // selektory
    typObiektuPoleTekstowe(){
        return cy.get('input[id="ObjectType"]')
    }

    identyfikatorObiektuPoleTekstowe(){
        return cy.get('input[id="ObjectId"]')
    }

    zamknijPrzycisk(){
        return cy.get('button[id="historyModal-close"]')
    }

    // metody
    sprawdzWidok(){
        this.typObiektuPoleTekstowe().should('be.visible')
        this.identyfikatorObiektuPoleTekstowe().should('be.visible')
        this.zamknijPrzycisk().should('be.visible')
    }
}

export const e93 = new E93()