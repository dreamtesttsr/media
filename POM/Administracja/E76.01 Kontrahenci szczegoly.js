class E7601{
    // Selektory
    dodajKontrahentaPrzycisk(){
        return cy.get('button[title="Dodaj kontrahenta"]')
    }

    zapiszPrzycisk(){
        return cy.get('button[type="submit"]:contains("Zapisz")')
    }
        
    powrotPrzycisk(){
        return cy.get('a[href="/Contractor/Index/btn_close"]:contains("Powrót")')
    }
            
    idPoleTekstowe(){
        return cy.get('#Id')
    }
         
    nazwaPoleTekstowe(){
        return cy.get('#ContractorNickname')
    }
        
    formaPrawnaLista(){
        return cy.get('#IdLegalForm')
    }

    rodzjPodmiotuLista(){
        return cy.get('#IdEntityType')
    }
        
    nipPoleTekstowe(){
        return cy.get('#Nip')
    }
        
    regonPoleTekstowe(){
        return cy.get('#Regon')
    }
        
    peselPoletekstowe(){
        return cy.get('#Pesel')
    }
        
    imiePoleTekstowe(){
        return cy.get('#ContractorName')
    }
        
    nazwiskoPoleTekstowe(){
        return cy.get('#ContractorSurname')
    }
        
    tytulzawodowyPoleTekstowe(){
        return cy.get('#ProffessionTitle')
    }
        
    ulicaPoleTekstowe(){
        return cy.get('#StreetName')
    }
        
    miejscowoscPoleTekstowe(){
        return cy.get('#City')
    }
        
    kodPoleTekstowe(){
        return cy.get('#PostalCode')
    }
        
    wojewodztwoLista(){
        return cy.get('#IdVoivodeship')
    }
        
    krajRegionPoleTekstowe(){
        return cy.get('#CountryRegion')
    }
        
    telSluzbPoleTekstowe(){
        return cy.get('#BusinessPhoneNumber')
    }
        
    emailPoleTekstowe(){
        return cy.get('#Email')
    }
        
    wwwPoleTekstowe(){
        return cy.get('#WwwSite')
    }
        
    telKomPoleTekstowe(){
        return cy.get('#CellPhoneNumber')
    }
        
    telDomPoleTekstowe(){
        return cy.get('#HousePhoneNumber')
    }
        
    faksPoleTekstowe(){
        return cy.get('#Fax')
    }
        
    uwagiPoleTekstowe(){
        return cy.get('#Remarks')
    }
        
    // Metody
    sprawdzWidok(){
        this.dodajKontrahentaPrzycisk().should('be.visible').click()
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.idPoleTekstowe().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.formaPrawnaLista().should('be.visible')
        this.rodzjPodmiotuLista().should('be.visible')
        this.nipPoleTekstowe().should('be.visible')
        this.regonPoleTekstowe().should('be.visible')
        this.peselPoletekstowe().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.tytulzawodowyPoleTekstowe().should('be.visible')
        this.ulicaPoleTekstowe().should('be.visible')
        this.miejscowoscPoleTekstowe().should('be.visible')
        this.kodPoleTekstowe().should('be.visible')
        this.wojewodztwoLista().should('be.visible')
        this.krajRegionPoleTekstowe().should('be.visible')
        this.telSluzbPoleTekstowe().should('be.visible')
        this.emailPoleTekstowe().should('be.visible')
        this.wwwPoleTekstowe().should('be.visible')
        this.telKomPoleTekstowe().should('be.visible')
        this.telDomPoleTekstowe().should('be.visible')
        this.faksPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
    }
}

export const e7601 = new E7601()