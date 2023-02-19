class E50601{
    rodzajPozycjiCennikowejRadio(){
        return cy.get('#PriceListItemKind')
    }

    nazwaPoleTekstowe(){
        return cy.get('#Name')
    }

    zakladLista(){
        return cy.get('select[id="WorkplaceId"]')
    }

    wydzialLista(){
        return cy.get('select[id="DepartmentsId"]')
    }

    stawkaJednostkowaPoleTekstowe(){
        return cy.get('input#UnitPrice')
    }

    mozliwoscPodniesieniaWynagrodzeniaPrzyciskWyboru(){
        return cy.get('input#IsRiseOfPay')
    }

    stawkaMaksymalnaPoleTekstowe(){
        return cy.get('input#MaxPayAmount')
    }

    jednostkaLista(){
        return cy.get('select#MetricId')
    }

    kodSAPPoleTekstowe(){
        return cy.get('#SapNumber')
    }

    czyPowiazanaZPozycjaKosztowaRadio(){
        return cy.get('#IsBindToCostEstimate')
    }

    rodzajKosztuLista(){
        return cy.get('select#CostTypeId')
    }

    stanowiskoLista(){
        return cy.get('select#JobTitleId')
    }

    aktywneOdData(){
        return cy.get('#ActiveFrom')
    }

    aktywneDoData(){
        return cy.get('#ActiveTo')
    }

    miejscaRealizacjiTab(){
        return cy.get('a[href="#realizationPlace"]').contains('Miejsca realizacji')
    }

    elementySprzetoweTab(){
        return cy.get('a[href="#equipment"]').contains('Elementy sprzętowe')
    }

    standardWozuStudiaTab(){
        return cy.get('a[href="#carStudioStandard"]').contains('Standard wozu/studia')
    }

    okresyNiedostepnosciTab(){
        return cy.get('a[href="#inaccessibilityPeriods"]').contains('Okresy niedostępności')
    }

    zapiszPrzycisk(){
        return cy.get('input.btn.btn-success').first().should('have.attr', 'value', 'Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('.btn-info.btn').contains('Powrót')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/PriceList/AddPricePosition')
    }

    sprawdzWidok(){
        this.rodzajPozycjiCennikowejRadio().should('be.visible')
        this.nazwaPoleTekstowe().should('be.visible')
        this.zakladLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.jednostkaLista().should('be.visible')
        this.kodSAPPoleTekstowe().should('be.visible')
        this.czyPowiazanaZPozycjaKosztowaRadio().should('be.visible')
        this.rodzajKosztuLista().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.aktywneOdData().should('be.visible')
        this.aktywneDoData().should('be.visible')
        this.miejscaRealizacjiTab().should('be.visible')
        this.elementySprzetoweTab().should('be.visible')
        this.standardWozuStudiaTab().should('be.visible')
        this.okresyNiedostepnosciTab().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
    }

    sprawdzWidok29(){
        this.zapiszPrzycisk().should('be.visible')
    }

    sprawdzWidok36(){
        this.zapiszPrzycisk().should('be.visible')
        this.stawkaJednostkowaPoleTekstowe().should('be.visible')
        this.mozliwoscPodniesieniaWynagrodzeniaPrzyciskWyboru().should('be.visible')
        this.stawkaMaksymalnaPoleTekstowe().should('be.visible')
    }
}

export const e50601 = new E50601()