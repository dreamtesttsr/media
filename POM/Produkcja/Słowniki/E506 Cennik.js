class E506{
    nazwaPoleTekstowe(){
        return cy.get('input[id="Name"]')
    }

    zakladLista(){
        return cy.get('select[id="WorkplaceId"]')
    }

    wydzialLista(){
        return cy.get('select[id="DepartmentId"]')
    }

    aktywnyOdData(){
        return cy.get('input[id="PriceListPositionActiveFrom"]')
    }

    aktywnyDoData(){
        return cy.get('input[id="PriceListPositionActiveTo"]')
    }

    rodzajPozycjiLista(){
        return cy.get('select[id="PriceListPositionTypeId"]')
    }

    stanowiskoLista(){
        return cy.get('select[id="PositionId"]')
    }

    kodSapStanowiskaPoleTekstowe(){
        return cy.get('input[id="PositionSapCode"]')
    }

    kodSapSprzetuPoleTekstowe(){
        return cy.get('input[id="PositionSapCode"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }
    
    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    dodajNowaPozycjeDoCennikaPrzycisk(){
        return cy.get('button[title="Dodaj nową pozycję do cennika"]')
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

    // Lista pozycji cennikowych na stronie wyszukiwarki
    cennikTabela(){
        return cy.get('table[aria-describedby="priceListItems_table_info"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/PriceList')
    }

    sprawdzURLWew(){
        cy.url().should('contain', '/smf/PriceList')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Wyszukiwarka pozycji cennika')
        this.nazwaPoleTekstowe().should('be.visible')
        this.zakladLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.aktywnyOdData().should('be.visible')
        this.aktywnyDoData().should('be.visible')
        this.rodzajPozycjiLista().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.kodSapStanowiskaPoleTekstowe().should('be.visible')
        this.kodSapSprzetuPoleTekstowe().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok29(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.dodajNowaPozycjeDoCennikaPrzycisk().should('be.visible')
    }
}

export const e506 = new E506()