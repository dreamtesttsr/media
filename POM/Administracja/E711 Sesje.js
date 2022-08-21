class E711 {
    
    // Selektory
    idPoleTekstowe(){
        return cy.get('#Id')
    }

    loginUzytkownikaPoleTekstowe(){
        return cy.get('#Login')
    }

    nazwaUzytkownikaPoleTekstowe(){
        return cy.get('#Name')
    }

    adresPoleTekstowe(){
        return cy.get('#Ip')
    }

    serwerPoleTekstowe(){
        return cy.get('#Server')
    }

    srodowiskoPoleTekstowe(){
        return cy.get('#Environment')
    }

    wyszukajPrzycisk(){
        return cy.get('#sessionFilter > div > div.col-lg-1.float-right > div > button')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    // metody 
    sprawdzWidok(){
        this.idPoleTekstowe().should('be.visible')
        this.loginUzytkownikaPoleTekstowe().should('be.visible')
        this.nazwaUzytkownikaPoleTekstowe().should('be.visible')
        this.adresPoleTekstowe().should('be.visible')
        this.serwerPoleTekstowe().should('be.visible')
        this.srodowiskoPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
    }
}

export const e711 = new E711()