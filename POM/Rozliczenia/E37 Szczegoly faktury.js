import { DateTime } from 'luxon'

const tDay = DateTime.now().toFormat('dd')
const tMonth = DateTime.now().toFormat('MM')
const tYear = DateTime.now().toFormat('yyyy')
const todayDate = tDay + '.' + tMonth + '.' + tYear

class E37 {
    
    // Selektory
    dodajFakturePrzycisck(){
        return cy.get('button[title="Dodaj fakturę"]')
    }

    agencjaLista(){
        return cy.get('[name="AgencyId"]')
    }

    dataRejestracjiData(){
        return cy.get('#RegistrationDate')
    }

    dataUslugiData(){
        return cy.get('#CompletionDate')
    }

    nrPorozumieniaLista(){
        return cy.get('#select2-IdAgreement-container')
    }

    kosztorysLista(){
        return cy.get('#select2-IdTitle-container')
    }

    producentLista(){
        return cy.get('#select2-IdProducer-container')
    }

    doZaplatyNettoEtykieta(){
        return cy.get('#AmountLeftToPayNet')
    }

    doZaplatyNettoNieaktywneEtykieta(){
        return cy.get('#AmountLeftToPayNet-hidden')
    }

    kwotaNettoPoleTekstowe(){
        return cy.get('#AmountNet')
    }

    vatPoleTekstowe(){
        return cy.get('#VatRate')
    }

    kontrahentLista(){
        return cy.get('#select2-IdContractor-container')
    }

    nrFakturyPoleTekstowe(){
        return cy.get('#Number')
    }

    dataFakturyData(){
        return cy.get('#InvoiceDate')
    }

    deklDataRozlData(){
        return cy.get('#DeclaredSettlementDate')
    }

    dataRozlData(){
        return cy.get('#SettlementDate')
    }

    uwagiDoRozlPoleTekstowe(){
        return cy.get('#SettlementNotes')
    }
    
    uwagiDoDDRPoleTekstowe(){
        return cy.get('#DeclaredSettlementDateNotes')
    }
    
    uwagiDoDRPoleTekstowe(){
        return cy.get('#SettlementDateNotes')
    }

    nrZamowieniaLista(){
        return cy.get('#select2-IdOrder-container')
    }

    naUmowieNettoEtykieta(){
        return cy.get('#DebtValueNet-hidden')
    }

    bruttoPoleTekstowe(){
        return cy.get('input#AmountGross')
    }

    bruttoNieaktywneEtykieta(){
        return cy.get('input#AmountGross-hidden')
    }

    bruttoPrzyciskWyboru(){
        return cy.get('#AmountGross_checkbox')
    }

    zapiszPrzycisk(){
        return cy.get('.text-right > .btn-success').should('contain', 'Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button[class="btn btn-info return-button"]').should('contain', 'Powrót')
    }

    dodajPlikiDoRepoPrzycisk(){
        return cy.get('#btnSelectAttachmentLocal')
    }

    dodajLinkDoZalPrzycisk(){
        return cy.get('#btnSelectAttachmentScanFile')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Invoice/') 
    }

    sprawdzBreadCrumb(){
        cy.get('.active').should('contain', 'Nowa faktura')
    }
    
    sprawdzWidok(){
        this.agencjaLista().should('be.visible')
        this.dataRejestracjiData().should('be.visible')
        this.dataUslugiData().should('be.visible')
        this.nrPorozumieniaLista().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.producentLista().should('be.visible')
        this.doZaplatyNettoEtykieta().should('be.visible')
        this.doZaplatyNettoNieaktywneEtykieta().should('not.be.visible').and('have.attr','type', 'hidden')
        this.kwotaNettoPoleTekstowe().should('be.visible')
        this.vatPoleTekstowe().should('be.visible')
        this.kontrahentLista().should('be.visible')
        this.nrFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyData().should('be.visible')
        this.deklDataRozlData().should('be.visible')
        this.dataRozlData().should('be.visible')
        this.uwagiDoRozlPoleTekstowe().should('be.visible')
        this.uwagiDoDDRPoleTekstowe().should('be.visible')
        this.uwagiDoDRPoleTekstowe().should('be.visible')
        this.nrZamowieniaLista().should('be.visible')
        this.naUmowieNettoEtykieta().should('not.be.visible').and('have.attr','type', 'hidden')
        this.bruttoPoleTekstowe().should('be.visible')
        this.bruttoNieaktywneEtykieta().should('not.be.visible').and('have.attr','type', 'hidden')
        this.bruttoPrzyciskWyboru().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.zapiszPrzycisk().should('be.visible')
        /* sekcja załączniki jest niewidoczna w trybie dodawania
        this.dodajPlikiDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible') */
    }

    sprawdzWidok5(){
        this.zapiszPrzycisk().should('be.visible')
        this.dodajPlikiDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.zapiszPrzycisk().should('be.visible')
    }

    sprawdzSekcjaZalaczniki(){
        cy.get(':nth-child(1) > .fieldsetField').should('contain', 'Załączniki')
        // Weryfikuję czy pojawiły się buttony: "Dodaj Plik Do Repozytorium" i "Dodaj Link Do Załącznika"
        this.dodajPlikiDoRepoPrzycisk().should('have.attr', 'title', 'Dodaj Plik Do Repozytorium').and('be.visible')
        this.dodajLinkDoZalPrzycisk().should('have.attr', 'title', 'Dodaj Link Do Załącznika').and('be.visible')
    }

    sprawdzWartosci(agencja){
        this.agencjaLista().should('contain', agencja)
        this.dataRejestracjiData().should('have.value', todayDate)
    }

    sprawdzWalidacje(){
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kontrahent\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr Faktury\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Data Faktury\'.')
        cy.get('#invoiceForm > div.validation-summary-errors.text-danger > ul > li:nth-child(4)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Producent\'.')
    }

    sprawdzKontrahent(kontrahent){
        this.kontrahentLista().should('contain', kontrahent)
    }

    sprawdzNaUmowieNetto(value){
        this.naUmowieNettoEtykieta().should('have.attr', 'value', value)
    }

    sprawdzDataRejestracji(){
        this.dataRejestracjiData().should('have.value', todayDate)
    }

    wypelnijNrPorozumienia(nrPorozumienia){
        this.nrPorozumieniaLista().scrollIntoView().click()
        cy.get('.select2-search__field').type(nrPorozumienia)
        cy.get('.select2-results__option').should('contain', nrPorozumienia).click()
    }

    wypelnijNrKosztorysu(nazwaKosztorysu, idKosztorysu){
        this.kosztorysLista().click()
        cy.get('.select2-search__field').type(nazwaKosztorysu)
        cy.get('.select2-results__option').should('contain', `${idKosztorysu} - ${nazwaKosztorysu}`).click()
    }

    wypelnijNrZamowienia(nrZamowienia, idZamowienia){
        this.nrZamowieniaLista().click()
        cy.get('.select2-search__field').type(nrZamowienia)
        cy.get('.select2-results__option').should('contain', `${idZamowienia} - ${nrZamowienia}`).click()
    }

    wypelnijNrFaktury(numer){
        this.nrFakturyPoleTekstowe().type(numer)
    }

    wypelnijDataFaktury(dataFaktury){
        this.dataFakturyData().type(dataFaktury)
    }

    wypelnijDataUslugi(dataUslugi){
        this.dataUslugiData().type(dataUslugi)
    }

    wypelnijDeklDataRozl(deklDataRozl){
        this.deklDataRozlData().type(deklDataRozl)
    }
    
    wypelnijDataRozl(dataRozl){
        this.dataRozlData().type(dataRozl)
    }
    
    wypelnijUwagiDoRozl(uwagiDoRozl){
        this.uwagiDoRozlPoleTekstowe().type(uwagiDoRozl)
    }
    
    wypelnijUwagiDoDDR(uwagiDoDDR){
        this.uwagiDoDDRPoleTekstowe().type(uwagiDoDDR)
    }
    
    wypelnijUwagiDoDR(uwagiDoDR){
        this.uwagiDoDRPoleTekstowe().type(uwagiDoDR)
    }

}

export const e37 = new E37()