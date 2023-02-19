class E511 {
    
    // Selektory
    dataKolumna(){
        return cy.get('th[title="Data"]')
    }

    dzienTygodniaKolumna(){
        return cy.get('th[title="Dzień tygodnia"]')
    }

    dodajNowyDzienSwiatecznyPrzycisk(){
        return cy.get('button[title="Dodaj nowy dzień świąteczny"]')
    }

    zapiszPrzycisk(){
        return cy.get('button[title="Zapisz"]').contains('Zapisz')
    }

    usunPierwszyPrzycisk(){
        return cy.get('button[title="Usuń"]').first()
    }

    // Metody
    sprawdzWidok(){
        this.dataKolumna().should('be.visible')
        this.dzienTygodniaKolumna().should('be.visible')
    }

    sprawdzWidok14(){
        this.dodajNowyDzienSwiatecznyPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok28(){
        this.dodajNowyDzienSwiatecznyPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok29(){
        this.dodajNowyDzienSwiatecznyPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
    }

}

export const e511 = new E511()