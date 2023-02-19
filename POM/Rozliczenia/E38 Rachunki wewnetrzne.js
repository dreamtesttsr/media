import { fWspolne } from '../Funkcje wspolne/Funkcje wspolne'

class E38{
    // Selektory
    numerRachunkuWewnetrznegoPoleTekstowe(){
        return cy.get('input[name="Number"]')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('input[name="AuditionProductionSap"]')
    }

    numerZamowieniaWewnetrznegoPoleTekstowe(){
        return cy.get('input[name="OrderNumber"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[name="AgreementNumber"]')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('input[name="AuditionName"]')
    }

    producentLista(){
        return cy.get('#select2-ProducerId-container')
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    jednostkaTVPLista(){
        return cy.get('select#OrganizationUnitId')
    }

    agencjaLista(){
        return cy.get('select#IdAgency')
    }

    kwotaRozliczeniaOdPoleTekstowe(){
        return cy.get('#CostNettoPLNFrom')
    }

    kwotaRozliczeniaDoPoleTekstowe(){
        return cy.get('#CostNettoPLNTo')
    }

    dataRozliczeniaOdData(){
        return cy.get('#div_InvoiceDateFrom')
    }

    dataRozliczeniaDoData(){
        return cy.get('#div_InvoiceDateTo')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#TitleName')
    }

    grupaKosztowLista(){
        return cy.get('select#FirstLevelCostId')
    }

    podgrupaKosztowLista(){
        return cy.get('#SecondLevelCostId')
    }

    grupaKosztowWyczyscPrzycisk(){
        return cy.get('.select2-selection__clear')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    polePrzyciski(){
        return cy.get('tbody > :nth-child(1) > :nth-child(10)')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
    }

    dodajRachunekWewnetrznyPrzycisk(){
        return cy.get('button[title="Dodaj rachunek"]')
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

    podgladPierwszyPrzycisk()
    {
        return cy.get('a[title="Podgląd"]').contains('P').first().scrollIntoView()
    }

    edycjaPierwszyPrzycisk()
    {
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    sprawdzElementKolumna(){
        return cy.get('#invoiceList_table > tbody > tr:nth-child(1) > td:nth-child(2)')
    }

    // Metody
    sprawdzWidok(){
        cy.get('.active').should('contain', 'Rachunki Wewnętrzne')
        this.numerRachunkuWewnetrznegoPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.numerZamowieniaWewnetrznegoPoleTekstowe().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.dodajRachunekWewnetrznyPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajRachunekWewnetrznyPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajRachunekWewnetrznyPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajRachunekWewnetrznyPrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.jednostkaTVPLista().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.kwotaRozliczeniaOdPoleTekstowe().should('be.visible')
        this.kwotaRozliczeniaDoPoleTekstowe().should('be.visible')
        this.dataRozliczeniaOdData().should('be.visible')
        this.dataRozliczeniaDoData().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.grupaKosztowLista().should('be.visible')
        this.podgrupaKosztowLista().should('be.visible')
    }

    filtrujPoNumerzePierwszegoRachunku(){
        cy.get('#invoiceList_table > tbody > tr:nth-child(1) > td:nth-child(2)')/* ('div.DTFC_LeftBodyWrapper > div > table > tbody > tr:nth-child(1) > td:nth-child(2)')*/.invoke('text')
            .then((text) => {
                const nrRachunkuWew = text
                this.numerRachunkuWewnetrznegoPoleTekstowe().clear().type(nrRachunkuWew)
            })
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()    
    } 
}

export const e38 = new E38()