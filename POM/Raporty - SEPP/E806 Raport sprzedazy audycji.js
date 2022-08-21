class E806 {
    
    // Selektory
    agencjaJednWspLista(){
        return cy.get('#AgencyId')
    }

    sapIDAudycjiPoleTekstowe(){
        return cy.get('#AuditionProductionSap')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('#AgreementNumber')
    }

    dataPorozumieniaOdData(){
        return cy.get('#AgreementDateFrom')
    }

    dataPorozumieniaDoData(){
        return cy.get('#AgreementDateTo')
    }

    rozniceCenPrzyciskWyboru(){
        return cy.get('#IsDifferencePrice')
    }

    rozniceCenJWPrzyciskWyboru(){
        return cy.get('#IsDifferencePriceJW')
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('#AuditionName')
    }

    stanPorozumieniaLista(){
        return cy.get('#AgreementStateId')
    }

    planCenaAudycjiOdPoleTekstowe(){
        return cy.get('#PlanAuditionCostFrom')
    }

    planCenaAudycjiDoPoleTekstowe(){
        return cy.get('#PlanAuditionCostTo')
    }

    planCenaSprzedazyOdPoleTekstowe(){
        return cy.get('#SalesPriceFrom')
    }

    planCenaSprzedazyDoPoleTekstowe(){
        return cy.get('#SalesPriceTo')
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

    podgladPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd porozumienia"]').contains('P').first().scrollIntoView()
    }

    edycjaPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja porozumienia"]').contains('E').first()
    }

    audycjePowZPorozumieniemPierwszyPrzycisk(){
        return cy.get('a[title="Audycje powiązane z porozumieniem"]').first()
    }

    // Metody
    sprawdzWidok(){
        this.agencjaJednWspLista().should('be.visible')
        this.sapIDAudycjiPoleTekstowe().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.dataPorozumieniaOdData().should('be.visible')
        this.dataPorozumieniaDoData().should('be.visible')
        this.rozniceCenPrzyciskWyboru().should('be.visible')
        this.rozniceCenJWPrzyciskWyboru().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPorozumieniaPierwszyPrzycisk().should('be.visible')
        this.audycjePowZPorozumieniemPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.stanPorozumieniaLista().should('be.visible')
        this.planCenaAudycjiOdPoleTekstowe().should('be.visible')
        this.planCenaAudycjiDoPoleTekstowe().should('be.visible')
        this.planCenaSprzedazyOdPoleTekstowe().should('be.visible')
        this.planCenaSprzedazyDoPoleTekstowe().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok5(){
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

}

export const e806 = new E806()