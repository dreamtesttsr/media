class E51602{
// Selektory
    tytulAudycjiPoleTekstowe(){
        return cy.get('input#AuditionTitleFilter')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('input#Sap')
    }

    rodzajZasobuPoleTekstowe(){
        return cy.get('input#PricePositionType')
    }

    dataRealizacjiOdData(){
        return cy.get('input#DateFrom')
    }

    dataRealizacjiDoData(){
        return cy.get('input#DateTo')
    }

    idWnioskuOZasobyPoleTekstowe(){
        return cy.get('input#RequestId')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryWyszukiwaniaPrzycisk(){
        return cy.get('button#filterClearButton')
    }

    zaznaczWszystkiePrzyciskWyboru(){
        return cy.get('input#selectAllCheckboxes').first()
    }

    zaznaczPierwszyPrzyciskWyboru(){
        return cy.get('input[type="checkbox"].selectCb').first()
    }

    zatwierdzPrzycisk(){
        return cy.get('button#resourceSearchModal-yesBtn').contains('Zatwierdź')
    }

    powrotPrzycisk(){
        return cy.get('button#resourceSearchModal-noBtn').contains('Powrót')
    }

    // Metody
    sprawdzWidok(){
        this.tytulAudycjiPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.rodzajZasobuPoleTekstowe().should('be.visible')
        this.dataRealizacjiOdData().should('be.visible')
        this.dataRealizacjiDoData().should('be.visible')
        this.idWnioskuOZasobyPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryWyszukiwaniaPrzycisk().should('be.visible')
        this.zaznaczWszystkiePrzyciskWyboru().should('be.visible')
        this.zatwierdzPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
    }


}

export const e51602 = new E51602()