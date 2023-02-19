class E550 {
    
    // Selektory
    odDniaData(){
        return cy.get('#DateFrom')
    }

    odDniaGodzinaCzas(){
        return cy.get('#TimeFrom')
    }

    doDniaData(){
        return cy.get('#DateTo')
    }

    doDniaGodzinaCzas(){
        return cy.get('#TimeTo')
    }

    elementSprzetowyLista(){
        return cy.get('#Hardware')
    }

    pozycjaCennikaLista(){
        return cy.get('#PriceListItem')
    }

    wydzialLista(){
        return cy.get('#DepartmentId')
    }

    miejsceRealizacjiCennikaLista(){
        return cy.get('#ExecutionVenue')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('#AgreementNumber')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('#TvProgrammeName')
    }

    kodSapSprzetuLista(){
        return cy.get('#SapEquipmentCode')
    }

    kodSapUslugowyLista(){
        return cy.get('#SapServiceCode')
    }

    sortowaniePoKolumnieLista(){
        return cy.get('#SortOrder')
    }

    pdfPrzycisk(){
        return cy.get('#printPdf')
    }

    excelPrzycisk(){
        return cy.get('#printExcel')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Elementy sprzętowe')
        this.odDniaData().should('be.visible')
        this.odDniaGodzinaCzas().should('be.visible')
        this.doDniaData().should('be.visible')
        this.doDniaGodzinaCzas().should('be.visible')
        this.elementSprzetowyLista().should('be.visible')
        this.pozycjaCennikaLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.miejsceRealizacjiCennikaLista().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.kodSapSprzetuLista().should('be.visible')
        this.kodSapUslugowyLista().should('be.visible')
        this.sortowaniePoKolumnieLista().should('be.visible')
        this.pdfPrzycisk().should('be.visible')
        this.excelPrzycisk().should('be.visible')
    }
    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/Equipment/DocumentStats')
    }

}

export const e550 = new E550()