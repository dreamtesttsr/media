class E44 {
    // Delegacja
    powrotPrzycisk(){
        return cy.get('.return-button').contains('Powrót')
    }

    statusDelegacjiPrzycisk(){
        return cy.get('button#statusHistoryBtn')
    }

    kopiujPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Kopiuj')
    }

    zapiszPrzycisk(){
        return cy.get('button#save_button').contains('Zapisz')
    }

    podgladPorozumieniaPrzycisk(){
        return cy.get('div[title="Podgląd porozumienia"]').contains('P')
    }

    nrPoleTekstowe(){
        return cy.get('input[id="Number"]')
    }

    agencjaLista(){
        return cy.get('[name="AgencyId"]')
    }

    nrDFPoleTekstowe(){
        return cy.get('input[id="DfNumber"]')
    }

    nrCRDPoleTekstowe(){
        return cy.get('input[id="CrdNumber"]')
    }

    // Porozumienie
    nrPorozumieniaLista(){
        return cy.get('select[id="IdAgreement"]')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('input[id="TvAudition"]')
    }

    nrWewnLista(){
        return cy.get('select[id="AgreementInternalNr"]')
    }

    kosztorysLista(){
        return cy.get('select[id="IdTitle"]')
    }

    // Audycje
    audycjeTabela(){
        return cy.get('table[id="auditions_table"]')
    }

    // Delegat
    nazwiskoPoleTekstowe(){
        return cy.get('input[id="DelegateLastName"]')
    }

    imiePoleTekstowe(){
        return cy.get('input[id="DelegateFirstName"]')
    }

    stanowiskoLista(){
        return cy.get('select[id="DelegatePosition"]')
    }

    nrEwidPoleTekstowe(){
        return cy.get('input[id="DelegateEvidence"]')
    }

    czyPracRadio(){
        return cy.get('input[id="IsEmployee"]').parent()
    }    

    // Szczegóły Delegacji
    krajLista(){
        return cy.get('select[id="CountryId"]')
    }

    miejscowoscPoleTekstowe(){
        return cy.get('input[id="City"]')
    }

    srodekTransportuLista(){
        return cy.get('select[id="MeanOfTransport"]')
    }

    terminWyjazduDataPoleTekstowe(){
        return cy.get('input[id="DepartureDate"]')
    }

    terminWyjazduGodzinaPoleTekstowe(){
        return cy.get('input[id="DepartureTime"]')
    }

    terminPowrotuDataPoleTekstowe(){
        return cy.get('input[id="ArrivalDate"]')
    }

    terminPowrotuGodzinaPoleTekstowe(){
        return cy.get('input[id="ArrivalTime"]')
    }

    // Koszty Delegacji
    dataRozliczeniaPoleTekstowe(){
        return cy.get('input[id="ReckoningDate"]')
    }

    kursPoleTekstowe(){
        return cy.get('input[id="Calculation_CurrencyValue"]')
    }

    walutaLista(){
        return cy.get('select[id="currencyType"]')
    }

    zDniaPoleTekstowe(){
        return cy.get('input[id="Calculation_CurrencyDate"]')
    }

    czyKompletnePrzyciskWyboru(){
        return cy.get('input[id="IsReckoningComplete"]')
    }

    zaliczkaRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_AdvanceSettlement"]')
    }

    rozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_AdvanceSettlementCurrency"]')
    }

    dietyPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_DietPlay"]') // Literówka - 'play' zamiast 'plan' w systemie
    }

    dietyRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DietSettlementCurrency"]')
    }

    biletPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_TicketPlan"]')
    }

    biletRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_TicketSettlement"]')
    }

    pobytHotelPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_AccommodationPlan"]')
    }

    hotelRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_AccommodationSettlementCurrency"]')
    }

    akredytacjaPozostalePoleTekstowe(){
        return cy.get('input[id="Calculation_Others"]')
    }

    podrozDojazdPrzejazdyPoleTekstowe(){
        return cy.get('input[id="Calculation_Travel"]')
    }

    uslugiObcePoleTekstowe(){
        return cy.get('input[id="Calculation_OtherServices"]')
    }
    
    kwotaRozliczeniaPoleTekstowe(){
        return cy.get('input[id="Calculation_CostSettlement"]')
    }

    kwotaRozliczeniaWalutaPoleTekstowe(){
        return cy.get('input[id="Calculation_CostSettlementCurrency"]')
    }

    wynajemSamochoduPoleTekstowe(){
        return cy.get('input[id="Calculation_RentCar"]')
    }

    pobytPoleTekstowe(){
        return cy.get('input[id="Calculation_PaymentStay"]')
    }

    nadbagazPoleTekstowe(){
        return cy.get('input[id="Calculation_ExcessBaggage"]')
    }
    
    lacznaWycenaBiuraPoleTekstowe(){
        return cy.get('input[id="Calculation_TotalOfficeValuation"]')
    }

    kosztCalkowityPoleTekstowe(){
        return cy.get('input[id="Calculation_TotalCost"]')
    }

    roznicaPoleTekstowe(){
        return cy.get('input[id="Calculation_Difference"]')
    }

    doZwrotuWyplatyKwotaPoleTekstowe(){
        return cy.get('input[id="Calculation_AmountToPayback"]')
    }

    doZwrotuWyplatyWalutaPoleTekstowe(){
        return cy.get('input[id="Calculation_AmountToPaybackInCurrencyType"]')
    }

    walutaPoleTekstowe(){
        return cy.get('input[id="lblCurrencyInfo"]')
    }

    doZwrotuWyplatyPoleTekstowe(){
        return cy.get('div#ReckoningDiv')
    }

    // Uwagi
    uwagiPoleTekstowe(){
        return cy.get('textarea[id="Comments"]')
    }

    // Faktury
    fakturyTabela(){
        return cy.get('table[id="invoiceList_info"]')
    }
    // Metody
    sprawdzWidok(){
        this.powrotPrzycisk().should('be.visible')
        this.nrPoleTekstowe().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.nrDFPoleTekstowe().should('be.visible')
        this.nrCRDPoleTekstowe().should('be.visible')
        this.nrPorozumieniaLista().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.nrWewnLista().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.nazwiskoPoleTekstowe().should('be.visible')
        this.imiePoleTekstowe().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.nrEwidPoleTekstowe().should('be.visible')
        this.czyPracRadio().should('be.visible')
        this.krajLista().should('be.visible')
        this.miejscowoscPoleTekstowe().should('be.visible')
        this.srodekTransportuLista().should('be.visible')
        this.terminWyjazduDataPoleTekstowe().should('be.visible')
        this.terminWyjazduGodzinaPoleTekstowe().should('be.visible')
        this.terminPowrotuDataPoleTekstowe().should('be.visible')
        this.terminPowrotuGodzinaPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
    }

    sprawdzWidokKosztyDelegacji(){
        this.dataRozliczeniaPoleTekstowe().should('be.visible')
        this.kursPoleTekstowe().should('be.visible')
        this.walutaLista().should('be.visible')
        this.zDniaPoleTekstowe().should('be.visible')
        this.czyKompletnePrzyciskWyboru().should('be.visible')
        this.zaliczkaRozliczeniePoleTekstowe().should('be.visible')
        this.rozliczeniePoleTekstowe().should('be.visible')
        this.dietyPlanPoleTekstowe().should('be.visible')
        this.biletPlanPoleTekstowe().should('be.visible')
        this.biletRozliczeniePoleTekstowe().should('be.visible')
        this.pobytHotelPlanPoleTekstowe().should('be.visible')
        this.hotelRozliczeniePoleTekstowe().should('be.visible')
        this.akredytacjaPozostalePoleTekstowe().should('be.visible')
        this.podrozDojazdPrzejazdyPoleTekstowe().should('be.visible')
        this.uslugiObcePoleTekstowe().should('be.visible')
        this.kwotaRozliczeniaPoleTekstowe().should('be.visible')
        this.kwotaRozliczeniaWalutaPoleTekstowe().should('be.visible')
        this.wynajemSamochoduPoleTekstowe().should('be.visible')
        this.pobytPoleTekstowe().should('be.visible')
        this.nadbagazPoleTekstowe().should('be.visible')
        this.lacznaWycenaBiuraPoleTekstowe().should('be.visible')
        this.kosztCalkowityPoleTekstowe().should('be.visible')
        this.roznicaPoleTekstowe().should('be.visible')
        this.doZwrotuWyplatyPoleTekstowe().should('be.visible')
        this.doZwrotuWyplatyWalutaPoleTekstowe().should('be.visible')
        this.walutaPoleTekstowe().should('be.visible')
        this.doZwrotuWyplatyKwotaPoleTekstowe().should('be.visible')
    }
}

export const e44 = new E44()