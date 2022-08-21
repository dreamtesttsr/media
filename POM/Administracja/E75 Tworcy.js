class E75 {
    
    // Selektory
    imiePoleTekstowe(){
        return cy.get('input[id="Name"]')
    }

    nazwiskoPoleTekstowe(){
        return cy.get('input[id="Surname"]')
    }

    panstwoPoleTekstowe(){
        return cy.get('input[id="Country"]')
    }

    rodzajTworcyLista(){
        return cy.get('select[id="CreatorType"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    dodajTworcePrzycisk(){
        return cy.get('button.btn.btn-secondary.btn-sm.btn-success')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Creator/Index') 
    }
    
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Twórcy')
        this.imiePoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.panstwoPoleTekstowe().should('be.visible')
        this.rodzajTworcyLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok6(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajTworcePrzycisk().should('be.visible')
    }

}

export const e75 = new E75()