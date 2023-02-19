class E35 {
    
    // Selektory
    dodajFakturePrzycisk() {
        return cy.get('.dt-buttons > .btn-success').should('have.attr', 'title', 'Dodaj fakturę')
    }
    
    numerFakturyPoleTekstowe(){
        return cy.get('input[id="InvoiceNr"]')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('input[id="SapNumber"]')
    }

    numerZamowieniaPoleTekstowe(){
        return cy.get('input[id="OrderId"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNumber"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('input[id="AuditionName"]')
    }

    producentLista(){
        return cy.get('select[id="ProducerId"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    kontrahentNipLista(){
        return cy.get('#ContractorId')
    }

    wyszukajWgPodanejFrazyPrzyciskWyboru(){
        return cy.get('#IfSearchByTextBox')
    }

    agencjaLista(){
        return cy.get('#IdAgency')
    }

    dataFakturyOdData(){
        return cy.get('#InvoiceDateFrom')
    }

    dataFakturyDoData(){
        return cy.get('#InvoiceDateTo')
    }

    dataUslugiOdData(){
        return cy.get('#ServiceDateFrom')
    }

    dataUslugiDoData(){
        return cy.get('#ServiceDateTo')
    }

    dataRejestracjiOdData(){
        return cy.get('#RegisterDateFrom')
    }

    dataRejestracjiDoData(){
        return cy.get('#RegisterDateTo')
    }

    deklarowanaDataRozliczeniaOdData(){
        return cy.get('#DeclarationDateFrom')
    }

    deklarowanaDataRozliczeniaDoData(){
        return cy.get('#DeclarationDateTo')
    }

    dataRozliczeniaOdData(){
        return cy.get('#ExecutionDateFrom')
    }

    dataRozliczeniaDoData(){
        return cy.get('#ExecutionDateTo')
    }

    nettoNaFakturzeOdPoleTekstowe(){
        return cy.get('#AmountNetFrom')
    }

    nettoNaFakturzeDoPoleTekstowe(){
        return cy.get('#AmountNetTo')
    }

    nrDFUmowyPoleTekstowe(){
        return cy.get('#DfNumber')
    }

    przedmiotZleceniaLista(){
        return cy.get('#ObjectOfOrder')
    }

    niestandardowyPrzedmiotZleceniaPoleTekstowe(){
        return cy.get('#ObjectOfOrderCustom')
    }

    grupaKosztowLista(){
        return cy.get('#FirstLevelCostId')
    }

    podgrupaKosztowLista(){
        return cy.get('#SecondLevelCostId')
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

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }


    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Invoice/Index') 
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Faktury')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.numerZamowieniaPoleTekstowe().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.kontrahentNipLista().should('be.visible')
        this.wyszukajWgPodanejFrazyPrzyciskWyboru().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.dataFakturyOdData().should('be.visible')
        this.dataFakturyDoData().should('be.visible')
        this.dataUslugiOdData().should('be.visible')
        this.dataUslugiDoData().should('be.visible')
        this.dataRejestracjiOdData().should('be.visible')
        this.dataRejestracjiDoData().should('be.visible')
        this.deklarowanaDataRozliczeniaOdData().should('be.visible')
        this.deklarowanaDataRozliczeniaDoData().should('be.visible')
        this.dataRozliczeniaOdData().should('be.visible')
        this.dataRozliczeniaDoData().should('be.visible')
        this.nettoNaFakturzeOdPoleTekstowe().should('be.visible')
        this.nettoNaFakturzeDoPoleTekstowe().should('be.visible')
        this.nrDFUmowyPoleTekstowe().should('be.visible')
        this.przedmiotZleceniaLista().should('be.visible')
        this.niestandardowyPrzedmiotZleceniaPoleTekstowe().should('be.visible')
        this.grupaKosztowLista().should('be.visible')
        this.podgrupaKosztowLista().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok1(){
        this.dodajFakturePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajFakturePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajFakturePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajFakturePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }
    
}

export const e35 = new E35()