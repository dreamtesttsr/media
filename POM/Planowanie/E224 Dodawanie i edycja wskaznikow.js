class E224 {
    // selektory
    jednostkaRozliczeniowaLista(){
        return cy.get('select#IdJednostkiRozliczeniwej')
    }

    jednostkaRozliczeniowaPoleTekstowe(){
        return cy.get('input#IdJednostkiRozliczeniwej')
    }

    narzutKosztowPosrPoleTekstowe(){
        return cy.get('input#NarzutKosztowPosrednich')
    }

    vatPZPoleTekstowe(){
        return cy.get('input#Vat')
    }

    vatWKosztachPoleTekstowe(){
        return cy.get('input#VatWkosztach')
    }

    zusOdWynagrodzenPoleTekstowe(){
        return cy.get('input#ZusodWynagrodzen')
    }

    sredniaOdWynagrodzenPoleTekstowe(){
        return cy.get('input#SredniaOdWynagrodzen')
    }

    vatOdPrawPoleTekstowe(){
        return cy.get('input#VatOdPraw')
    }

    zapiszPrzycisk(){
        return cy.get('button#RatioModal-yesBtn')
    }

    powrotPrzycisk(){
        return cy.get('button#RatioModal-noBtn')
    }
}

export const e224 = new E224()