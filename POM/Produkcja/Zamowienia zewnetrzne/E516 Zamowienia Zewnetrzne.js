import { fWspolne } from '../../Funkcje wspolne/Funkcje wspolne'

class E516{

    // Selektory
    idZamowieniaPoleTekstowe(){
        return cy.get('[name="OrderId"]')
    }

    numerZamowieniaPoleTekstowe(){
        return cy.get('[name="OrderNumber"]')
    }

    idWnioskuOZasobyPoleTekstowe(){
        return cy.get('[name="ResourcesRequestId"]')
    }

    realizacjaOdData(){
        return cy.get('[name="RealizationStart"]')
    }

    realizacjaDoData(){
        return cy.get('[name="RealizationEnd"]')
    }

    statusLista(){
        return cy.get('[data-cy="combo_order_status"]')
    }

    numerZamowieniaPZPoleTekstowe(){
        return cy.get('[name="OrderNumberPZ"]')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('[name="SapNumber"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('[name="AuditionName"]')
    }

    zakladCUPLista(){
        return cy.get('[name="CupDepartment"]')
    }

    grupaAsortymentowaLista(){
        return cy.get('[name="AssortmentGroup"]')
    }

    ukryjRezerwacjePrzyciskWyboru(){
        return cy.get('input#HideRezerwations')
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyszukajPrzycisk(){
        return cy.get('[title="Wyszukaj"]').first()
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('[href="/smf/ExternalOrder/ClearFilter"]').first()
    }

    zamawiającyLista(){
        return cy.get('select#Orderer')
    }

    koordynatorLista(){
        return cy.get('select#CoordinatorId')
    }

    pracownikDzialuZakupowLista(){
        return cy.get('select#PurchasingDepartmentEmployeeId')
    }

    oferentLista(){
        return cy.get('select#BidderId')
    }

    zamowieniaZewnetrzneTabela(){
        return cy.get('table#externalOrderList_table')
    }

    podgladPierwszyPrzycisk()
    {
        return cy.get('a[title="Podgląd"]').first().scrollIntoView().contains('P')
    }

    przegladWnioskuoZasobyPierwszyPrzycisk()
    {
        return cy.get('a[title="Przegląd wniosku o zasoby"]').contains('Z').scrollIntoView().first()
    }

    edycjaPierwszyPrzycisk()
    {
        return cy.get('a[title="Edycja"]').contains('E').scrollIntoView().first()
    }

    anulacjaZamowieniaPierwszyPrzycisk()
    {
        return cy.get('a[title="Anulacja zamówienia"]').contains('A').scrollIntoView().first()
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

    idZamowieniaKolumna(){
        return cy.get('th[title="Id. zamówienia"]').first()
    }

    // Metody
    sprawdzFiltryPodstawowe(listaPol){
        if(listaPol.includes('Id zamówienia')) this.idZamowieniaPoleTekstowe().should('have.attr', 'placeholder', 'Id zamówienia').should('not.have.attr', 'readonly')
        if(listaPol.includes('Nr Zamówienia')) this.numerZamowieniaPoleTekstowe().should('have.attr', 'placeholder', 'Nr zamówienia').should('not.have.attr', 'readonly')
        if(listaPol.includes('Id wniosku o zasoby')) this.idWnioskuOZasobyPoleTekstowe().should('have.attr', 'placeholder', 'Id. wniosku o zasoby').should('not.have.attr', 'readonly')
        if(listaPol.includes('Realizacja od')) this.realizacjaOdData().should('have.attr', 'placeholder', 'Realizacja od').should('not.have.attr', 'readonly')
        if(listaPol.includes('Realizacja do')) this.realizacjaDoData().should('have.attr', 'placeholder', 'Realizacja do').should('not.have.attr', 'readonly')
        if(listaPol.includes('Status')) this.statusLista().should('have.attr', 'data-placeholder', 'Status').should('not.have.attr', 'readonly')
        if(listaPol.includes('Nr zamówienia PZ')) this.numerZamowieniaPZPoleTekstowe().should('have.attr', 'placeholder', 'Nr zamówienia PZ').should('not.have.attr', 'readonly')
        if(listaPol.includes('SAP / Id audycji')) this.sapIdAudycjiPoleTekstowe().should('have.attr', 'placeholder', 'SAP / Id.audycji').should('not.have.attr', 'readonly')
        if(listaPol.includes('Nazwa audycji')) this.nazwaAudycjiPoleTekstowe().should('have.attr', 'placeholder', 'Nazwa audycji').should('not.have.attr', 'readonly')
        if(listaPol.includes('Zakład CUP')) this.zakladCUPLista().should('have.attr', 'data-placeholder', 'Zakład CUP').should('not.have.attr', 'readonly')
        if(listaPol.includes('Grupa asortymentowa')) this.grupaAsortymentowaLista().should('have.attr', 'data-placeholder', 'Grupa asortymentowa').should('not.have.attr', 'readonly')
        if(listaPol.includes('Ukryj rezerwacje')) this.ukryjRezerwacjePrzyciskWyboru().should('have.attr', 'data-original-title', 'Ukryj rezerwacje').should('have.attr', 'type', 'checkbox')
    }

    asercjeFiltryZaawansowane(listaPol){
        this.zaawansowanePrzycisk().should('have.attr', 'title', 'Zaawansowane').click()
        if(listaPol.includes('Zamawiający')) this.zamawiającyLista().should('have.attr', 'data-placeholder', 'Zamawiający').should('not.have.attr', 'readonly')
        if(listaPol.includes('Koordynator')) this.koordynatorLista().should('have.attr', 'data-placeholder', 'Koordynator').should('not.have.attr', 'readonly')
        if(listaPol.includes('Pracownik Działu Zakupów')) this.pracownikDzialuZakupowLista().should('have.attr', 'data-placeholder', 'Pracownik Działu Zakupów').should('not.have.attr', 'readonly')
        if(listaPol.includes('Oferent')) this.oferentLista().should('have.attr', 'data-title', 'Oferent').should('not.have.attr', 'readonly')
        this.zaawansowanePrzycisk().should('have.attr', 'title', 'Zaawansowane').click()
    }

    filtrujPoStatusie(opcja){
        this.statusLista().should('have.attr', 'data-placeholder', 'Status').should('not.have.attr', 'readonly')
        this.statusLista().select(opcja, {force: true})
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.zamowieniaZewnetrzneTabela().get('tbody > tr > td:first()').then(($textFirst) => {
            if( $textFirst.text() == 'Brak danych' ){
                cy.log('Tabela zamówień zewnętrznyh jest pusta')
            }else{
                this.zamowieniaZewnetrzneTabela().get('tbody > tr > td:nth-child(11)').each(($el) => {
                    expect($el).to.contain(opcja)
                })
            }
        })
    }


    sprawdzWidok(){
        this.idZamowieniaPoleTekstowe().should('be.visible')
        this.numerZamowieniaPoleTekstowe().should('be.visible')
        this.idWnioskuOZasobyPoleTekstowe().should('be.visible')
        this.realizacjaOdData().should('be.visible')
        this.realizacjaDoData().should('be.visible')
        this.statusLista().should('be.visible')
        this.numerZamowieniaPZPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.zakladCUPLista().should('be.visible')
        this.grupaAsortymentowaLista().should('be.visible')
        this.ukryjRezerwacjePrzyciskWyboru().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible').contains('P')
        this.przegladWnioskuoZasobyPierwszyPrzycisk().should('be.visible').contains('Z')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.zamawiającyLista().should('be.visible')
        this.koordynatorLista().should('be.visible')
        this.pracownikDzialuZakupowLista().should('be.visible')
        this.oferentLista().should('be.visible', {setTimeout: 20000})
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok1(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.anulacjaZamowieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok26(){
        this.edycjaPierwszyPrzycisk().should('be.visible')
        this.anulacjaZamowieniaPierwszyPrzycisk().should('be.visible')
    }

    filtrujPoNumerzePierwszegoZamowienia(){
        this.ukryjRezerwacjePrzyciskWyboru().check({force: true})
        this.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('be.visible')
        cy.get('#progressBar').should('not.be.visible')
        cy.get('#externalOrderList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text')
            .then((text) => {
                const nrZamZew = text
                this.numerZamowieniaPoleTekstowe().clear().type(nrZamZew)
            })
        this.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('be.visible')
        cy.get('#progressBar').should('not.be.visible')
    }
}

export const e516 = new E516()

