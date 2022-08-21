class E80 {
    
    // Selektory
    adresIpPoleTekstowe(){
        return cy.get('#Ip')
    }

    loginPoleTekstowe(){
        return cy.get('#Login')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    usunPierwszyPrzycisk(){
        return cy.get('a[title="Usuń"]').first()
    }

    // metody 
    sprawdzWidok(){
        this.adresIpPoleTekstowe().should('be.visible')
        this.loginPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
    }
}

export const e80 = new E80()