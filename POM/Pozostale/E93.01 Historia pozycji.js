class E9301{
    // selektory
    dataOdPoleTekstowe(){
        return cy.get('input#DateFrom')
    }

    dataDoPoleTekstowe(){
        return cy.get('input#DateTo')
    }

    obiegKosztorysuOdLista(){
        return cy.get('select#CircuitIdFrom')
    }

    obiegKosztorysuDoLista(){
        return cy.get('select#CircuitIdTo')
    }

    zakladJULista(){
        return cy.get('select#ServiceUnitId')
    }

    grupaKosztowLista(){
        return cy.get('select#CostGroupId')
    }

    podgrupaKosztowLista(){
        return cy.get('select#CostSubGroupId')
    }

    uslugaProduktLista(){
        return cy.get('select#CostTypeId')
    }

    rodzajOperacjiLista(){
        return cy.get('select#OperationTypeId')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    rozwinPierwszaPozycjePrzycisk(){
        return cy.get('#icon_item0')
    }

    przejdzDoPodgrupyPozycjiPrzycisk(){
        return cy.get('a[title="Przejdź do podgrupy pozycji"]')
    }

    zamknijPrzycisk(){
        return cy.get('button[id="historyCostModal-close"]')
    }

    // metody
    sprawdzWidok(){
        this.dataOdPoleTekstowe().should('be.visible')
        this.dataDoPoleTekstowe().should('be.visible')
        this.obiegKosztorysuOdLista().should('exist')
        this.obiegKosztorysuDoLista().should('exist')
        this.zakladJULista().should('exist')
        this.grupaKosztowLista().should('exist')
        this.podgrupaKosztowLista().should('exist')
        this.uslugaProduktLista().should('exist')
        this.rodzajOperacjiLista().should('exist')
        this.wyszukajPrzycisk().should('be.visible')
        // this.rozwinPierwszaPozycjePrzycisk().should('be.visible') // wymagane dokonanie zmian
        // this.przejdzDoPodgrupyPozycjiPrzycisk().should('be.visible')
        this.zamknijPrzycisk().should('be.visible')
    }
}

export const e9301 = new E9301()