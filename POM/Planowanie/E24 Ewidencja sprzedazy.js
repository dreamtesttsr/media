class E24{
    zapiszPrzycisk(){
        return cy.get('button#AddButton').contains('Zapisz')
    }

    zapiszIDodajNowaPrzycisk(){
        return cy.get('button#AddWithAnotherButton').contains('Zapisz i dodaj nową')
    }

    powrotPrzycisk(){
        return cy.get('button#AgreementReturn').contains('Powrót')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('span#select2-AgreementId-container')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('input#AuditionName')
    }

    kosztorysPoleTekstowe(){
        return cy.get('span#select2-CurrentTitleId-container')
    }

    odcinekPoleTekstowe(){
        return cy.get('input#Episode')
    }

    mpkLista(){
        return cy.get('select#MPK')
    }

    sapEmisyjnyAktywnyPrzyciskWyboru(){
        return cy.get('input#IsSapNumberActive')
    }

    idAudycjiPoleTekstowe(){
        return cy.get('input#AuditionId')
    }

    sapProdukcyjnyPoleTekstowe(){
        return cy.get('input#ProductionSap')
    }

    sprzedanaPrzyciskWyboru(){
        return cy.get('input#Sold')
    }

    sapEmisyjnyPoleTekstowe(){
        return cy.get('input#SapNumber')
    }

    idPropozycjiAudycjiPoleTekstowe(){
        return cy.get('input#AuditionProposalId')
    }

    sapProdukcyjnyWewnetrznyPoleTekstowe(){
        return cy.get('input#InternalProductionUnitSapNumber')
    }

    opisOdcinkaPoleTekstowe(){
        return cy.get('input#EpisodeDescription')
    }

    sapUslugowyPoleTekstowe(){
        return cy.get('input#JwProductionSap')
    }

    sprzedanaJwPrzyciskWyboru(){
        return cy.get('input#JwSold')
    }

    nazwaJednostkiLista(){
        return cy.get('select#JwAgencId')
    }

    sapUslugowyWewnetrznyPoleTekstowe(){
        return cy.get('input#InternalServiceUnitSapNumber')
    }

    dataZamowieniaAudycjiData(){
        return cy.get('input#OrderMassAuditionDate')
    }

    jednostkaZamawiajacaLista(){
        return cy.get('select#OrderingUnitId')
    }

    cenaSprzedazyOdcinkaPoleTekstowe(){
        return cy.get('input#SellPriceMassEpisode')
    }

    wyliczCeneSprzedazyPrzycisk(){
        return cy.get('button#getSellPriceEpisode')
    }

    numerKontraktuPoleTesktowe(){
        return cy.get('input#MassContractNumber')
    }

    rokPoleTekstowe(){
        return cy.get('input#PlanedRealizationDateYear')
    }

    miesiacPoleTekstowe(){
        return cy.get('input[name="PlanedRealizationDateMonth"]')
    }

    dzienPoleTekstowe(){
        return cy.get('input[name="PlanedRealizationDateDay"]')
    }

    cenaSprzedazyOdcinkaJWPoleTekstowe(){
        return cy.get('input#SellPriceMassEpisode')
    }

    wyliczCeneSprzedazyJWPrzycisk(){
        return cy.get('button#getJwSellPriceEpisode')
    }

    numerKontraktuJWPoleTesktowe(){
        return cy.get('input#MassContractNumber')
    }

    rokJWPoleTekstowe(){
        return cy.get('input#PlanedRealizationDateYear')
    }

    miesiacJWPoleTekstowe(){
        return cy.get('input[name="PlanedRealizationDateMonth"]')
    }

    dzienJWPoleTekstowe(){
        return cy.get('input[name="PlanedRealizationDateDay"]')
    }

    numerFakturyPoleTekstowe(){
        return cy.get('input#MassInvoiceNumber')
    }

    dataFakturyPoleTekstowe(){
        return cy.get('input#MassInvoiceDate')
    }

    linkDoObrazuFakturyPoleTekstowe(){
        return cy.get('input#MassLinkToInvocieImage')
    }

    numerFakturyJWPoleTekstowe(){
        return cy.get('input#JwMassInvoiceNumber')
    }

    dataFakturyJWPoleTekstowe(){
        return cy.get('input#JwMassInvoiceDate')
    }

    numerProtokoluOdbioruPoleTekstowe(){
        return cy.get('input#MassReceiptProtocolNumber')
    }

    dataEmisjiPoleTekstowe(){
        return cy.get('input#MassEmmisionDate')
    }

    linkDoObrazuProtokoluOdbioruPoleTekstowe(){
        return cy.get('input#MassLinkToReciptProtocolImage')
    }

    numerProtokoluOdbioruJWPoleTekstowe(){
        return cy.get('input#JwMassReceiptProtocolNumber')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Agreement/SellEvidenceDetails')
    }

    sprawdzWidokDevelopment(){
        cy.get('.active').should('contain', 'Ewidencja sprzedaży')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.odcinekPoleTekstowe().should('be.visible')
        this.mpkLista().should('not.exist')
        this.idAudycjiPoleTekstowe().should('not.exist')
        this.sapProdukcyjnyPoleTekstowe().should('not.exist')
        this.sprzedanaPrzyciskWyboru().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.sapEmisyjnyAktywnyPrzyciskWyboru().should('be.visible')
        this.idPropozycjiAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.sapUslugowyPoleTekstowe().should('not.exist')
        this.sprzedanaJwPrzyciskWyboru().should('be.visible')
        this.nazwaJednostkiLista().should('be.visible')
        this.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        this.dataZamowieniaAudycjiData().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.cenaSprzedazyOdcinkaPoleTekstowe().should('be.visible')
        this.numerKontraktuPoleTesktowe().should('be.visible')
        this.rokPoleTekstowe().should('be.visible')
        this.miesiacPoleTekstowe().should('be.visible')
        this.dzienPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdcinkaJWPoleTekstowe().should('be.visible')
        this.numerKontraktuJWPoleTesktowe().should('be.visible')
        this.rokJWPoleTekstowe().should('be.visible')
        this.miesiacJWPoleTekstowe().should('be.visible')
        this.dzienJWPoleTekstowe().should('be.visible')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyPoleTekstowe().should('be.visible')
        this.linkDoObrazuFakturyPoleTekstowe().should('be.visible')
        this.numerFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyJWPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.linkDoObrazuProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruJWPoleTekstowe().should('be.visible')
    }

    sprawdzWidokEvent(){
        cy.get('.active').should('contain', 'Ewidencja sprzedaży')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.odcinekPoleTekstowe().should('be.visible')
        this.mpkLista().should('be.visible')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyPoleTekstowe().should('not.exist')
        this.sprzedanaPrzyciskWyboru().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.sapEmisyjnyAktywnyPrzyciskWyboru().should('be.visible')
        this.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        this.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.sapUslugowyPoleTekstowe().should('not.exist')
        this.sprzedanaJwPrzyciskWyboru().should('be.visible')
        this.nazwaJednostkiLista().should('be.visible')
        this.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        this.dataZamowieniaAudycjiData().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.cenaSprzedazyOdcinkaPoleTekstowe().should('be.visible')
        this.numerKontraktuPoleTesktowe().should('be.visible')
        this.rokPoleTekstowe().should('be.visible')
        this.miesiacPoleTekstowe().should('be.visible')
        this.dzienPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdcinkaJWPoleTekstowe().should('be.visible')
        this.numerKontraktuJWPoleTesktowe().should('be.visible')
        this.rokJWPoleTekstowe().should('be.visible')
        this.miesiacJWPoleTekstowe().should('be.visible')
        this.dzienJWPoleTekstowe().should('be.visible')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyPoleTekstowe().should('be.visible')
        this.linkDoObrazuFakturyPoleTekstowe().should('be.visible')
        this.numerFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyJWPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.linkDoObrazuProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruJWPoleTekstowe().should('be.visible')
    }

    sprawdzWidokProdukcyjne(){
        cy.get('.active').should('contain', 'Ewidencja sprzedaży')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.odcinekPoleTekstowe().should('be.visible')
        this.mpkLista().should('not.exist')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyPoleTekstowe().should('be.visible')
        this.sprzedanaPrzyciskWyboru().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.sapEmisyjnyAktywnyPrzyciskWyboru().should('be.visible')
        this.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        this.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.sapUslugowyPoleTekstowe().should('be.visible')
        this.sprzedanaJwPrzyciskWyboru().should('be.visible')
        this.nazwaJednostkiLista().should('be.visible')
        this.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        this.dataZamowieniaAudycjiData().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.cenaSprzedazyOdcinkaPoleTekstowe().should('be.visible')
        this.numerKontraktuPoleTesktowe().should('be.visible')
        this.rokPoleTekstowe().should('be.visible')
        this.miesiacPoleTekstowe().should('be.visible')
        this.dzienPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdcinkaJWPoleTekstowe().should('be.visible')
        this.numerKontraktuJWPoleTesktowe().should('be.visible')
        this.rokJWPoleTekstowe().should('be.visible')
        this.miesiacJWPoleTekstowe().should('be.visible')
        this.dzienJWPoleTekstowe().should('be.visible')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyPoleTekstowe().should('be.visible')
        this.linkDoObrazuFakturyPoleTekstowe().should('be.visible')
        this.numerFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyJWPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.linkDoObrazuProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruJWPoleTekstowe().should('be.visible')
    }

}

export const e24 = new E24()