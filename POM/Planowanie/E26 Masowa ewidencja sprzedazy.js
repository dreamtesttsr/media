class E26{
    zapiszPrzycisk(){
        return cy.get('button#BeforeSaveButton').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button.return-button').contains('Powrót')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('input#AgreementText')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('input#AuditionName')
    }

    kosztorysPoleTekstowe(){
        return cy.get('input#CurrentTitle')
    }

    dodanieNowychOdcinkowRadio(){
        return cy.get('input#AddNew')
    }

    edycjaIstniejacychOdcinkowRadio(){
        return cy.get('input#Edit')
    }

    agencjaEtykieta(){
        return cy.get('h4>strong').eq(0)
    }

    jednostkaUslugowaEtykieta(){
        return cy.get('h4>strong').eq(1)
    }

    nrOdcinkaPoleTekstowe(){
        return cy.get('input#StartingEpisodeNumber')
    }

    iloscPoleTekstowe(){
        return cy.get('input#EpisodeCount')
    }

    sapEmisyjnyAktywnyTakRadio(){
        return cy.get('input#IsSapNumberActive').eq(0)
    }

    sapEmisyjnyAktywnyNieRadio(){
        return cy.get('input#IsSapNumberActive').eq(1)
    }

    sapEmisyjnyAktywnyNieWybranoRadio(){
        return cy.get('input#IsSapNumberActive').eq(2)
    }

    idAudycjiPoleTekstowe(){
        return cy.get('input#StartingAuditionId')
    }

    sapProdukcyjnyPoleTekstowe(){
        return cy.get('input#StartingProductionSap')
    }

    sapEmisyjnyPoleTekstowe(){
        return cy.get('input#StartingSapNumber')
    }

    idPropozycjiAudycjiPoleTekstowe(){
        return cy.get('input#StartingAuditionProposalID')
    }

    sapPropozycjiWewnetrznyPoleTekstowe(){
        return cy.get('input#StartingInternalProductionUnitSapNumber')
    }

    zakresOdcPoleTekstowe(){
        return cy.get('input#EpisodesRange')
    }

    opisOdcinkaPoleTekstowe(){
        return cy.get('input#EpisodeDescription')
    }

    sapUslugowyPoleTekstowe(){
        return cy.get('input#JwStartingProductionSap')
    }

    nazwaJednostkiLista(){
        return cy.get('select#JwAgencId')
    }

    sapUslugowyWewnetrznyPoleTekstowe(){
        return cy.get('input#StartingInternalServiceUnitSapNumber')
    }

    dataZamowieniaAudycjiData(){
        return cy.get('input#OrderMassAuditionDate')
    }

    jednostkaZamawiajacaLista(){
        return cy.get('select#OrderingUnitId')
    }

    cenaSprzedazyOdcinkaPrzyciskWyboru(){
        return cy.get('input#SellPriceMassEpisode_checkbox')
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

    cenaSprzedazyOdcinkaJWPrzyciskWyboru(){
        return cy.get('input#JwSellPriceEpisode_checkbox')
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

    audycjaSprzedanaTakRadio(){
        return cy.get('input#Sold')
    }

    audycjaSprzedanaNieRadio(){
        return cy.get('input#NotSold')
    }

    audycjaSprzedanaNieWybranoRadio(){
        return cy.get('input#Default')
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

    audycjaSprzedanaTakJWRadio(){
        return cy.get('input#SoldJW')
    }

    audycjaSprzedanaNieJWRadio(){
        return cy.get('input#NotSoldJW')
    }

    audycjaSprzedanaNieWybranoJWRadio(){
        return cy.get('input#DefaultJW')
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
        cy.url().should('contain', '/Agreement/MassSellEvidence')
    }

    sprawdzWidokDodanieNowychOdcinkow(){
        cy.get('.active').should('contain', 'Masowa ewidencja sprzedaży')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.dodanieNowychOdcinkowRadio().should('be.visible')
        this.edycjaIstniejacychOdcinkowRadio().should('be.visible')
        this.nrOdcinkaPoleTekstowe().should('be.visible')
        this.iloscPoleTekstowe().should('be.visible')
        this.sapEmisyjnyAktywnyTakRadio().should('be.visible')
        this.sapEmisyjnyAktywnyNieRadio().should('be.visible')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyPoleTekstowe().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.idPropozycjiAudycjiPoleTekstowe().should('be.visible')
        this.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible')
        this.zakresOdcPoleTekstowe().should('be.visible')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.sapUslugowyPoleTekstowe().should('be.visible')
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
        this.audycjaSprzedanaTakRadio().should('be.visible')
        this.audycjaSprzedanaNieRadio().should('be.visible')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyPoleTekstowe().should('be.visible')
        this.linkDoObrazuFakturyPoleTekstowe().should('be.visible')
        this.audycjaSprzedanaTakJWRadio().should('be.visible')
        this.audycjaSprzedanaNieJWRadio().should('be.visible')
        this.numerFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyJWPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.linkDoObrazuProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruJWPoleTekstowe().should('be.visible')
    }

    sprawdzWidokEdycjaIstniejacychOdcinkow(){
        cy.get('.active').should('contain', 'Masowa ewidencja sprzedaży')
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.dodanieNowychOdcinkowRadio().should('be.visible')
        this.edycjaIstniejacychOdcinkowRadio().should('be.visible')
        this.nrOdcinkaPoleTekstowe().should('be.visible')
        this.iloscPoleTekstowe().should('be.visible')
        this.sapEmisyjnyAktywnyTakRadio().should('be.visible')
        this.sapEmisyjnyAktywnyNieRadio().should('be.visible')
        this.sapEmisyjnyAktywnyNieWybranoRadio().should('be.visible')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyPoleTekstowe().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.idPropozycjiAudycjiPoleTekstowe().should('be.visible')
        this.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible')
        this.zakresOdcPoleTekstowe().should('be.visible')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.sapUslugowyPoleTekstowe().should('be.visible')
        this.nazwaJednostkiLista().should('be.visible')
        this.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        this.dataZamowieniaAudycjiData().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.cenaSprzedazyOdcinkaPrzyciskWyboru().should('be.visible')
        this.cenaSprzedazyOdcinkaPoleTekstowe().should('be.disabled')
        this.numerKontraktuPoleTesktowe().should('be.visible')
        this.rokPoleTekstowe().should('be.visible')
        this.miesiacPoleTekstowe().should('be.visible')
        this.dzienPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdcinkaJWPrzyciskWyboru().should('be.visible')
        this.cenaSprzedazyOdcinkaJWPoleTekstowe().should('be.disabled')
        this.numerKontraktuJWPoleTesktowe().should('be.visible')
        this.rokJWPoleTekstowe().should('be.visible')
        this.miesiacJWPoleTekstowe().should('be.visible')
        this.dzienJWPoleTekstowe().should('be.visible')
        this.audycjaSprzedanaTakRadio().should('be.visible')
        this.audycjaSprzedanaNieRadio().should('be.visible')
        this.audycjaSprzedanaNieWybranoRadio().should('be.visible')
        this.numerFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyPoleTekstowe().should('be.visible')
        this.linkDoObrazuFakturyPoleTekstowe().should('be.visible')
        this.audycjaSprzedanaTakJWRadio().should('be.visible')
        this.audycjaSprzedanaNieJWRadio().should('be.visible')
        this.audycjaSprzedanaNieWybranoJWRadio().should('be.visible')
        this.numerFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyJWPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.linkDoObrazuProtokoluOdbioruPoleTekstowe().should('be.visible')
        this.numerProtokoluOdbioruJWPoleTekstowe().should('be.visible')
    }

}

export const e26 = new E26()