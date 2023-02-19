class E809 {
    
    // Selektory
    nrPorozumieniaPoleTekstowe(){
        return cy.get('#AgreementNumber')
    }

    nrWewPorozumieniaPoleTekstowe(){
        return cy.get('#InternalAgreementNumber')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('#AuditionTvName')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('#AuditionName')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#TitleName')
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

    agencjaLista(){
        return cy.get('#AgencyId')
    }

    typZamowieniaLista(){
        return cy.get('#OrderType')
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

    // Metody
    sprawdzWidok(){
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.nrWewPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.typZamowieniaLista().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

}

export const e809 = new E809()