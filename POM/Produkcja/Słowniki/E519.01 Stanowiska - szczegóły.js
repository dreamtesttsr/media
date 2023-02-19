class E51901{

    // Selektory
    nazwaPoleTekstowe(){
        return cy.get('input[id="Name"]')
    }
	
    kodSapPoleTekstowe(){
        return cy.get('input[id="SapCode"]')
    }
	
    dopuszczalneKategoriePracownikaLista(){
        return cy.get('[name="WorkerCategories"]')
    }
	
    lpPoleTekstowe(){
        return cy.get('input[id="Lp"]')
    }
	
    zapiszPrzycisk(){
        return cy.get('button[title="Zapisz"')
    }
	
    powrotPrzycisk(){
        return cy.get('button[id="PositionsListReturn"]')
    }
	
    dodajPozycjeCennikaPrzycisk(){
        return	cy.get('[data-cy="Dodaj_pozycje_cennika"]')
    }
    
    pozycjeCennikaTabela(){
        return cy.get('table[id="positionList_table"]')
    }

    pokazPozycjeCennikaPierwszyPrzycisk(){
        return cy.get('[data-cy="Pokaz_pozycje_cennika"]').contains('P').first()
    }

    edytujPozycjeCennikaPierwszyPrzycisk(){
        return cy.get('[data-cy="Edytuj_pozycje_cennika"]').contains('E').first()
    }
	
    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/Positions/')
    }

    sprawdzWidokDodajStanowisko(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.kodSapPoleTekstowe().should('be.visible')
        this.dopuszczalneKategoriePracownikaLista().should('be.visible')
        this.lpPoleTekstowe().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.pozycjeCennikaTabela().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
        // this.dodajPozycjeCennikaPrzycisk().should('be.visible') // tylko dla roli 28+29
    }

    sprawdzWidok(){
        this.nazwaPoleTekstowe().should('be.visible')
        this.kodSapPoleTekstowe().should('be.visible')
        this.dopuszczalneKategoriePracownikaLista().should('be.visible')
        this.lpPoleTekstowe().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.pozycjeCennikaTabela().should('be.visible')
        // this.pokazPozycjeCennikaPierwszyPrzycisk().should('be.visible') // tylko dla roli 28+29
    }

    sprawdzWidokEdycja(){
        this.zapiszPrzycisk().should('be.visible')
        // this.dodajPozycjeCennikaPrzycisk().should('be.visible') // tylko dla roli 28+29
        // this.edytujPozycjeCennikaPierwszyPrzycisk().should('be.visible') // tylko dla roli 28+29
    }
}

export const e51901 = new E51901()