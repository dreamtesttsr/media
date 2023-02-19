class E50701 {

    // Selektory
    zapiszPrzycisk(){
        return cy.get('#save').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button.return-button').contains('Powrót')
    }

    imiePoleTekstowe(){
        return cy.get('#FirstName')
    }

    nrEwidencyjnySAPPoleTekstowe(){
        return cy.get('#WorkerSap')
    }

    loginPoleTekstowe(){
        return cy.get('#Login')
    }

    adresEmailPoleTekstowe(){
        return cy.get('#Email')
    }

    wydzialLista(){
        return cy.get('#DepartmentId')
    }

    nazwiskoPoleTekstowe(){
        return cy.get('#LastName')
    }

    nrSAPKontrahentaPoleTekstowe(){
        return cy.get('#ContractorSap')
    }

    czyAktywnyRadio(){
        return cy.get('[for="IsActive"].btn').parent('.toggle-group')
    }

    nrTelefonuPoleTekstowe(){
        return cy.get('#Phone')
    }

    stanowiskoRadio(){
        return cy.get('a[href="#positionsNavTab"]')
    }

    dodajStanowiskoPrzycisk(){
        return cy.get('button#btnAddPosition')
    }

    umowyRadio(){
        return cy.get('a[href="#contractsNavTab"]')
    }

    dodajUmowePrzycisk(){
        return cy.get('button#btnAddContract')
    }

    okresyNiedostepnosciRadio(){
        return cy.get('a[href="#inaccessibilityPeriodsNavTab"]')
    }

    dodajOkresNiedostepnosciPrzycisk(){
        return cy.get('button#addInaccessibilityButton')
    }

    kategoriaPracownikaLista(){
        return cy.get('select2-PositionList_0__CategoryId-container')
    }

    stanowiskoPracownikaLista(){
        return cy.get('select2-PositionList_0__PositionTypeId-container')
    }

    usuńPierwszyPrzycisk(){
        return cy.get('button[title="Usuń"]').first()
    }

    historiaZmianPrzycisk(){
        return cy.get('button.btn-info').contains('Historia zmian')
    }

    // Metody
    sprawdzWidok(){
        this.imiePoleTekstowe().should('be.visible')
        this.nrEwidencyjnySAPPoleTekstowe().should('be.visible')
        this.loginPoleTekstowe().should('be.visible')
        this.adresEmailPoleTekstowe().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.czyAktywnyRadio().should('be.visible')
        this.nrTelefonuPoleTekstowe().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
        this.stanowiskoRadio().should('be.visible').click()
        this.dodajStanowiskoPrzycisk().should('be.visible')
        this.umowyRadio().should('be.visible').click()
        this.dodajUmowePrzycisk().should('be.visible')
        this.okresyNiedostepnosciRadio().should('be.visible').click()
        this.dodajOkresNiedostepnosciPrzycisk().should('be.visible')
    }
}

export const e50701 = new E50701()