class E30 {
    
    // Selektory
    nrZamowieniaPoleTekstowe(){
        return cy.get('#OrderNr')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('#AgreementNr')
    }

    nrWewnPoleTekstowe(){
        return cy.get('#InternalNr')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('#AuditionName')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('#AuditionProductionSap')
    }

    producentLista(){
        return cy.get('#ProducerId')
    }

    doRozliczeniaPrzyciskWyboru(){
        return cy.get('#ToCount')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    agencjaLista(){
        return cy.get('#IdAgency')
    }

    kontrahentJednTVPLista(){
        return cy.get('select#ContractorId')
    }

    wyszukajWgPodanejFrazyPrzyciskWyboru(){
        return cy.get('#IsContractorTerm')
    }

    typZamowieniaLista(){
        return cy.get('#OrderType')
    }

    rodzajZamowieniaLista(){
        return cy.get('#OrderKind')
    }

    statusZamowieniaLista(){
        return cy.get('#OrderStatus')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#TitleName')
    }

    dataZamowieniaOdData(){
        return cy.get('#OrderDateFrom')
    }

    dataZamowieniaDoData(){
        return cy.get('#OrderDateTo')
    }

    terminRealizacjiOdData(){
        return cy.get('#RealizationnDateFrom')
    }

    terminRealizacjiDoData(){
        return cy.get('#RealizationDateTo')
    }

    uwagiPoleTekstowe(){
        return cy.get('#Notes')
    }

    nettoNaUmowieOdPoleTekstowe(){
        return cy.get('#AmountNetOnContractFrom')
    }

    nettoNaUmowieDoPoleTekstowe(){
        return cy.get('#AmountNetOnContractTo')
    }

    bruttoNaUmowieOdPoleTekstowe(){
        return cy.get('#AmountGrossOnContractFrom')
    }

    bruttoNaUmowieDoPoleTekstowe(){
        return cy.get('#AmountGrossOnContractTo')
    }

    opisPoleTekstowe(){
        return cy.get('#Description')
    }

    nrWewnetrznyDFPoleTekstowe(){
        return cy.get('#DfNumber')
    }

    nrFakturyRachunkuPoleTekstowe(){
        return cy.get('#InvoiceNr')
    }

    limitLista(){
        return cy.get('#IdPlannedLimit')
    }

    warunekPlatnosciLista(){
        return cy.get('#IdTermsOfPayment')
    }

    warunekPlatnosciUwagiPoleTekstowe(){
        return cy.get('#Paymentcondition')
    }

    przedmiotZleceniaLista(){
        return cy.get('#ObjectOfOrderId')
    }

    niestPrzedmZlecPoleTekstowe()
    {
        return cy.get('#ObjectOfOrderRemarks')
    }

    dataRejestracjiOdData(){
        return cy.get('#RagistrationDateFrom')
    }

    dataRejestracjiDoData(){
        return cy.get('#RegistrationDateTo')
    }

    umowaPrzyciskWyboru(){
        return cy.get('#IsContract')
    }

    zamowieniePrzyciskWyboru(){
        return cy.get('#IsOrder')
    }

    rodzajPlatnosciLista(){
        return cy.get('#IdPaymentType')
    }

    eksportujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel widoczne kolumny"]')
    }

    eksportujWszystkieKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel wszystkie kolumny"]')
    }

    wybierzWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Wybierz widoczne kolumny"]')
    }

    dodajZamowieniePrzycisk(){
        return cy.get('.dt-buttons > .btn-success').should('have.attr', 'title', 'Dodaj Zamówienie')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    popupZakupUslugaPrzycisk(){
        return cy.get('[href="/Order/Details?orderType=1"]').should('contain.text', 'Zakup/usługa')
    }
    
    popupHotelPrzycisk(){
        return cy.get('[href="/Order/Details?orderType=3"]').should('contain.text', 'Hotel')
    }
    
    popupWewnetrznePrzycisk(){
        return cy.get('[href="/Order/DetailsInternalOrder"]').should('contain.text', 'Wewnętrzne')
    }

    popupAnulujPrzycisk(){
        return cy.get('#orderTypeModal-noBtn').should('contain.text', 'Anuluj')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Order/Index')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Zamówienia')
        this.nrZamowieniaPoleTekstowe().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.nrWewnPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.doRozliczeniaPrzyciskWyboru().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.kontrahentJednTVPLista().should('be.visible')
        this.typZamowieniaLista().should('be.visible')
        this.rodzajZamowieniaLista().should('be.visible')
        this.statusZamowieniaLista().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.dataZamowieniaOdData().should('be.visible')
        this.dataZamowieniaDoData().should('be.visible')
        this.terminRealizacjiOdData().should('be.visible')
        this.terminRealizacjiDoData().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        this.nettoNaUmowieOdPoleTekstowe().should('be.visible')
        this.nettoNaUmowieDoPoleTekstowe().should('be.visible')
        this.bruttoNaUmowieOdPoleTekstowe().should('be.visible')
        this.bruttoNaUmowieDoPoleTekstowe().should('be.visible')
        this.opisPoleTekstowe().should('be.visible')
        this.nrWewnPoleTekstowe().should('be.visible')
        this.nrFakturyRachunkuPoleTekstowe().should('be.visible')
        this.limitLista().should('be.visible')
        this.warunekPlatnosciLista().should('be.visible')
        this.warunekPlatnosciUwagiPoleTekstowe().should('be.visible')
        this.przedmiotZleceniaLista().should('be.visible')
        this.niestPrzedmZlecPoleTekstowe().should('be.visible')
        this.dataRejestracjiOdData().should('be.visible')
        this.dataRejestracjiDoData().should('be.visible')
        this.umowaPrzyciskWyboru().should('be.visible')
        this.zamowieniePrzyciskWyboru().should('be.visible')
        this.rodzajPlatnosciLista().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok1(){
        this.dodajZamowieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        this.dodajZamowieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajZamowieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajZamowieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajZamowieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }
}

export const e30 = new E30()