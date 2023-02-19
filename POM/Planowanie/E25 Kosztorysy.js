class E25{
    sapIdAudycjiMPKPoleTekstowe(){
        return cy.get('input[id="AuditionProductionSap"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('input[id="TvAudition"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="Number"]')
    }

    numerWewnPoleTekstowe(){
        return cy.get('input[id="InternalNr"]')
    }

    producentLista(){
        return cy.get('select[id="ProducerId"]')
    }

    zakladJULista(){
        return cy.get('select[id="ServiceUnit"]')
    }

    zatwierdziłKUTakPrzyciskWyboru(){
        return cy.get('#ApprovalYes')
    }

    zatwierdziłKUNiePrzyciskWyboru(){
        return cy.get('#ApprovalNo')
    }

    stanKosztorysuLista(){
        return cy.get('select[id="CostState"]')
    }

    oczekujaceDyrJuRadio(){
        return cy.get('#IdDirectorSwitchJu').parent()
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

    jednWspolpracujacaLista(){
        return cy.get('#CooperatingUnitsId')
    }

    bezJednostkiWspolpracujacejPrzyciskWyboru(){
        return cy.get('#SearchAgreementWithoutJw')
    }

    stanPorozumieniaLista(){
        return cy.get('#AgreementStateId')
    }

    rodzajUslugiLista(){
        return cy.get('select#ServiceTypeId')
    }

    trybProdukcjiLista(){
        return cy.get('select#ProductionModeId')
    }

    osobaWiodacaLista(){
        return cy.get('select[id="LeadingPersonId"]')
    }

    idKosztorysuPoleTekstowe(){
        return cy.get('#Id')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#CostName')
    }

    celKosztorysuLista(){
        return cy.get('#CostPurposes')
    }

    formaAudycjiLista(){
        return cy.get('#AuditionFormID')
    }

    formaAudycjiSzczegLista(){
        return cy.get('#AuditionFormDetailsId')
    }

    obiegKUTakPrzyciskWyboru(){
        return cy.get('#CircuitKuYes')
    }

    obiegKUNiePrzyciskWyboru(){
        return cy.get('#CircuitKuNo')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    // Lista kosztorysów na stronie wyszukiwarki
    kosztorysyTabela(){
        return cy.get('table[aria-describedby="costPlanningList_table_info"]')
    }

    edycjaKosztorysuPierwszyPrzycisk(){
        return cy.get('a[title="Edycja kosztorysu"]').first().contains('EK')
    }

    podgladPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd porozumienia"]').first().contains('PP')
    }

    edycjaPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja porozumienia"]').first().contains('EP')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/CostPlanning/Index')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Kosztorysy')
        this.sapIdAudycjiMPKPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.numerWewnPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.zakladJULista().should('be.visible')
        this.zatwierdziłKUTakPrzyciskWyboru().should('be.visible')
        this.zatwierdziłKUNiePrzyciskWyboru().should('be.visible')
        this.stanKosztorysuLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.podgladPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.jednWspolpracujacaLista().should('be.visible')
        this.bezJednostkiWspolpracujacejPrzyciskWyboru().should('be.visible')
        this.stanPorozumieniaLista().should('be.visible')
        this.rodzajUslugiLista().should('be.visible')
        this.trybProdukcjiLista().should('be.visible')
        this.osobaWiodacaLista().should('be.visible')
        this.idKosztorysuPoleTekstowe().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.celKosztorysuLista().should('be.visible')
        this.formaAudycjiLista().should('be.visible')
        this.formaAudycjiSzczegLista().should('be.visible')
        this.obiegKUTakPrzyciskWyboru().should('be.visible')
        this.obiegKUNiePrzyciskWyboru().should('be.visible')
    }

    sprawdzWidok1(){
        this.oczekujaceDyrJuRadio().should('be.visible')
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        // this.oczekujaceDyrJuRadio().should('be.visible') // pole dostępne tylko dla roli 3 z agencji CUP
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok18(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok26(){
        this.edycjaKosztorysuPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }
}

export const e25 = new E25()