class E99{
    // Selektory
    drukujPrzycisk(){
        return cy.get('button#printBtn')
    }

    jwLista(){
        return cy.get('select#JWIDList')
    }

    wydrukPrzyciskWyboru(wydruk){
        return cy.get('label.dropdown-menu-item').contains(wydruk).children('span.far.fa-square')
    }

    wydrukEtykieta(wydruk){
        return cy.get('label.dropdown-menu-item').contains(wydruk)
    }

    zaznaczOdznaczWszystkiePrzyciskWyboru(){
        return cy.get('span#std_all')
    }

    zaznaczOdznaczWszystkieJWPrzyciskWyboru(){
        return cy.get('span#JW_all')
    }

    pdf1PlikPrzyciskWyboru(){
        return cy.get('#Merge-In-One-File')
    }

    pdfPrzyciskWyboru(){
        return cy.get('[data-format="Pdf"]')
    }

    excelPrzyciskWyboru(){
        return cy.get('[data-format="Excel"]')
    }

    // Metody
    sprawdzWidok(){
        this.drukujPrzycisk().should('be.visible')
        this.jwLista().should('be.visible')
        this.zaznaczOdznaczWszystkiePrzyciskWyboru().should('be.visible')
        this.zaznaczOdznaczWszystkieJWPrzyciskWyboru().should('be.visible')
        this.pdf1PlikPrzyciskWyboru().should('be.visible')
        this.pdfPrzyciskWyboru().should('be.visible')
        this.excelPrzyciskWyboru().should('be.visible')
    }
    

}

export const e99 = new E99()