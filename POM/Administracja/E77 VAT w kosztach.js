class E77 {
    
    // Selektory
    dodajVatWKosztachPrzycisk(){
        return cy.get('button[title="Dodaj VAT w Kosztach"]')
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E')
    }

    vatWKosztachPopupPoleTekstowe(){
        return cy.get('#TaxValue')
    }

    obowiazujeOdPopupData(){
        return cy.get('#DateFrom')
    }

    obowiazujeDoPopupData(){
        return cy.get('#DateTo')
    }

    zamknijPopupPrzycisk(){
        return cy.get('button#addDetails_modal-close')
    }
	
    potwierdzPopupPrzycisk(){
        return cy.get('button#addDetails_modal-yesBtn').contains('Potwierdź')
    }
		
    anulujPopupPrzycisk(){
        return cy.get('button#addDetails_modal-noBtn').contains('Anuluj')
    }
               
    // Metody
    sprawdzWidok(){
        cy.get('.active').should('contain', 'VAT w kosztach %')
    }

    sprawdzPopup(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajVatWKosztachPrzycisk().should('be.visible').click()
        this.vatWKosztachPopupPoleTekstowe().should('be.visible')
        this.obowiazujeOdPopupData().should('be.visible')
        this.obowiazujeDoPopupData().should('be.visible')
        this.potwierdzPopupPrzycisk().should('be.visible')
        this.anulujPopupPrzycisk().should('be.visible')
        this.zamknijPopupPrzycisk().should('be.visible')
    }
}

export const e77 = new E77()