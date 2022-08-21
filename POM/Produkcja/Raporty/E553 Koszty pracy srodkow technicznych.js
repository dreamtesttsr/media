class E553 {
    
    // Selektory
    dataOdData(){
        return cy.get('input[id="DateFrom"]')
    }

    godzinaOdCzas(){
        return cy.get('input[id="TimeFrom"]')
    }

    dataDoData(){
        return cy.get('input[id="DateTo"]')
    }

    godzinaDoCzas(){
        return cy.get('input[id="TimeTo"]')
    }

    elementSprzetowyLista(){
        return cy.get('select[id="Hardware"]')
    }

    pozycjeCennikaLista(){
        return cy.get('select[id="PriceListItem"]')
    }

    wydzialCennikaLista(){
        return cy.get('select[id="DepartmentId"]')
    }

    miejsceRealizacjiLista(){
        return cy.get('select[id="ExecutionVenue"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNumber"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('input[id="TvProgrammeName"]')
    }

    kodSapSprzetuLista(){
        return cy.get('select[id="SapEquipmentCode"]')
    }

    kodSapUslugowyLista(){
        return cy.get('select[id="SapServiceCode"]')
    }

    sortowaniePoKolumnieLista(){
        return cy.get('select[id="SortOrder"]')
    }
    
    pdfPrzycisk(){
        return cy.get('button[id="printPdf"]')
    }
    
    excelPrzycisk(){
        return cy.get('button[id="printExcel"]')
    }

    // Metody
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Elementy sprzętowe')
        this.dataOdData().should('be.visible')
        this.godzinaOdCzas().should('be.visible')
        this.dataDoData().should('be.visible')
        this.godzinaDoCzas().should('be.visible')
        this.elementSprzetowyLista().should('be.visible')
        this.pozycjeCennikaLista().should('be.visible')
        this.wydzialCennikaLista().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.kodSapSprzetuLista().should('be.visible')
        this.kodSapUslugowyLista().should('be.visible')
        this.sortowaniePoKolumnieLista().should('be.visible')
        this.pdfPrzycisk().should('be.visible')
        this.excelPrzycisk().should('be.visible')
    }
}

export const e553 = new E553()