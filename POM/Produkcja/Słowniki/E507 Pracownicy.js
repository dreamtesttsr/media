class E507 {
    
    // Selektory
    nrSAPEwidPoleTekstowe(){
        return cy.get('#WorkerSap')
    }

    nrSAPKontrahentaPoleTekstowe(){
        return cy.get('#ContractorSap')
    }

    imiePoleTekstowe(){
        return cy.get('#Name')
    }

    nazwiskoPoleTekstowe(){
        return cy.get('#Surname')
    }

    umowaOdData(){
        return cy.get('#ContractFrom')
    }

    umowaDoData(){
        return cy.get('#ContractTo')
    }

    stanowiskoLista(){
        return cy.get('#PositionId')
    }

    wydzialLista(){
        return cy.get('#DepartmentId')
    }

    rodzajCzasuPracyLista(){
        return cy.get('#WorkingTimeTypeId')
    }

    rodzajUmowyLista(){
        return cy.get('#ContractTypeId')
    }

    aktualnaUmowaoDzieloPrzyciskWyboru(){
        return cy.get('#IsActiveContractWork')
    }

    czyAktywnyLista(){
        return cy.get('#IsActive')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
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

    dodajPracownikaProdukcjiPrzycisk(){
        return cy.get('button[title="Dodaj pracownika produkcji"]')
    }

    // Metody
    sprawdzWidok(){
        this.nrSAPEwidPoleTekstowe().should('be.visible')
        this.nrSAPKontrahentaPoleTekstowe().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.umowaOdData().should('be.visible')
        this.umowaDoData().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.rodzajCzasuPracyLista().should('be.visible')
        this.rodzajUmowyLista().should('be.visible')
        this.aktualnaUmowaoDzieloPrzyciskWyboru().should('be.visible')
        this.czyAktywnyLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok28(){
        this.dodajPracownikaProdukcjiPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

}

export const e507 = new E507()