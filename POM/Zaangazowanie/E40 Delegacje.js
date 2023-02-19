class E40{
    dodajDelegacjePrzycisk(){
        return cy.get('button[title="Dodaj Delegację"]')
    }

    krajowaPopupPrzycisk(){
        return cy.get('a[href="/Delegation/AddCountry?orderType=Zam%C3%B3wienie"]').contains('Krajowa')
    }

    zagranicznaPopupPrzycisk(){
        return cy.get('a[href="/Delegation/AddAbroad?orderType=Zam%C3%B3wienie"]').contains('Zagraniczna')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNumber"]')
    }

    numerWewnPoleTekstowe(){
        return cy.get('input[id="InternalNumber"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('input[id="ProgramName"]')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('input[id="ProductionSapNumber"]')
    }

    nrDfPoleTekstowe(){
        return cy.get('input[id="DF_Number"]')
    }

    nrCrdPoleTekstowe(){
        return cy.get('input[id="CrdNumber"]')
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

    agencjaLista(){
        return cy.get('#AgencyId')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#CostEstimate')
    }

    nrOdcOdPoleTekstowe(){
        return cy.get('#EpisoderNumberFrom')
    }

    nrOdcDoPoleTekstowe(){
        return cy.get('#EpisoderNumberTo')
    }

    nrZamowieniaPoleTekstowe(){
        return cy.get('#OrderNumber')
    }

    nazwiskoPoleTekstowe(){
        return cy.get('#DelegateLastName')
    }

    imiePoleTekstowe(){
        return cy.get('#DelegateFirstName')
    }

    stanowiskoLista(){
        return cy.get('#DelegatePosition')
    }

    nrEwidPracPoleTekstowe(){
        return cy.get('#DelegateEvidence')
    }

    krajowaPrzyciskWyboru(){
        return cy.get('#IsCountry')
    }

    zagranicznaPrzyciskWyboru(){
        return cy.get('#IsForeign')
    }

    miejscowoscPoleTekstowe(){
        return cy.get('#City')
    }

    krajLista(){
        return cy.get('#CountryId')
    }

    planOdPoleTekstowe(){
        return cy.get('#PlanTotalCostFrom')
    }

    planDoPoleTekstowe(){
        return cy.get('#PlanTotalCostTo')
    }

    terminWyjazduOdData(){
        return cy.get('#DepartureDateFrom')
    }

    terminWyjazduDoData(){
        return cy.get('#DepartureDateTo')
    }

    terminPowrotuOdData(){
        return cy.get('#ArrivalDateFrom')
    }

    terminPowrotuDoData(){
        return cy.get('#ArrivalDateTo')
    }

    srodekTransportuLista(){
        return cy.get('#MeanOfTransport')
    }

    nrFakturyPoleTekstowe(){
        return cy.get('#InvoiceNumber')
    }

    rozliczenieOdPoleTekstowe(){
        return cy.get('#TotalSettlementFrom')
    }

    rozliczenieDoPoleTekstowe(){
        return cy.get('#TotalSettlementTo')
    }

    dataRozliczeniaDelegacjiOdData(){
        return cy.get('#ReckoningDateFrom')
    }

    dataRozliczeniaDelegacjiDoData(){
        return cy.get('#ReckoningDateTo')
    }

    czyRozlKompletneTakPrzyciskWyboru(){
        return cy.get('#CompleteSettlementYes')
    }

    czyRozlKompletneNiePrzyciskWyboru(){
        return cy.get('#CompleteSettlementNo')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
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

    // Lista delegacji na stronie wyszukiwarki
    delegacjeTabela(){
        return cy.get('table[aria-describedby="delegationList_table_info"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').first().contains('P').scrollIntoView()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').first().contains('E').scrollIntoView()
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Delegation/Index')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Delegacje')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.numerWewnPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.nrDfPoleTekstowe().should('be.visible')
        this.nrCrdPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.nrOdcOdPoleTekstowe().should('be.visible')
        this.nrOdcDoPoleTekstowe().should('be.visible')
        this.nrZamowieniaPoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.nrEwidPracPoleTekstowe().should('be.visible')
        this.krajowaPrzyciskWyboru().should('be.visible')
        this.zagranicznaPrzyciskWyboru().should('be.visible')
        this.miejscowoscPoleTekstowe().should('be.visible')
        this.krajLista().should('be.visible')
        this.planOdPoleTekstowe().should('be.visible')
        this.planDoPoleTekstowe().should('be.visible')
        this.terminWyjazduOdData().should('be.visible')
        this.terminWyjazduDoData().should('be.visible')
        this.terminPowrotuOdData().should('be.visible')
        this.terminPowrotuDoData().should('be.visible')
        this.srodekTransportuLista().should('be.visible')
        this.nrFakturyPoleTekstowe().should('be.visible')
        this.rozliczenieOdPoleTekstowe().should('be.visible')
        this.rozliczenieDoPoleTekstowe().should('be.visible')
        this.dataRozliczeniaDelegacjiOdData().should('be.visible')
        this.dataRozliczeniaDelegacjiDoData().should('be.visible')
        this.czyRozlKompletneTakPrzyciskWyboru().should('be.visible')
        this.czyRozlKompletneNiePrzyciskWyboru().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok1(){
        this.dodajDelegacjePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        this.dodajDelegacjePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajDelegacjePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajDelegacjePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajDelegacjePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    filtrujPoNumerzePierwszegoZamowienia(){
        cy.get('#delegationList_table > tbody > tr:nth-child(1) > td:nth-child(4)').invoke('text')
            .then((text) => {
                const nrZamowienia = text
                this.zaawansowanePrzycisk().click()
                this.nrZamowieniaPoleTekstowe().clear().type(nrZamowienia)
            })
        this.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')
    }

}

export const e40 = new E40()