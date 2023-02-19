class E7501{
    // Selektory
    zapiszPrzycisk(){
        return cy.get('button[type="submit"]:contains("Zapisz")')
    }
    
    powrotPrzycisk(){
        return cy.get('a[href="/Creator/Index/btn_close"]:contains("Powrót")')
    }
    
    imiePoleTekstowe(){
        return cy.get('#Name')
    }
    
    nazwiskoPoleTekstowe(){
        return cy.get('#Surname')
    }
    
    idPoleTekstowe(){
        return cy.get('#Id')
    }
    
    rodzajLista(){
        return cy.get('select#CreatorTypeId')
    }
    
    ulicaPoleTekstowe(){
        return cy.get('#Street')
    }
    
    miejscowoscPoleTekstowe(){
        return cy.get('#City')
    }
    
    kodPoleTekstowe(){
        return cy.get('#Postcode')
    }
    
    wojewodztwoLista(){
        return cy.get('select#IDRegion')
    }
    
    panstwoPoleTekstowe(){
        return cy.get('#Country')
    }
    
    emailPoleTekstowe(){
        return cy.get('#Email')
    }
    
    telSluzbPoleTekstowe(){
        return cy.get('#ServicePhone')
    }
    
    telKomPoleTekstowe(){
        return cy.get('#Phone')
    }
    
    jezykPoleTekstowe(){
        return cy.get('#Language')
    }
    
    uwagiPoleTekstowe(){
        return cy.get('#Comments')
    }

    dodajTworcePrzycisk(){
        return cy.get('button[aria-controls="creatorList_table"]')
    }
    
    // Metody
    sprawdzWidok(){
        this.dodajTworcePrzycisk().should('be.visible').click()
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.idPoleTekstowe().should('be.visible')
        this.rodzajLista().should('be.visible')
        this.ulicaPoleTekstowe().should('be.visible')
        this.miejscowoscPoleTekstowe().should('be.visible')
        this.kodPoleTekstowe().should('be.visible')
        this.wojewodztwoLista().should('be.visible')
        this.panstwoPoleTekstowe().should('be.visible')
        this.emailPoleTekstowe().should('be.visible')
        this.telSluzbPoleTekstowe().should('be.visible')
        this.telKomPoleTekstowe().should('be.visible')
        this.jezykPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
    }
}

export const e7501 = new E7501()
