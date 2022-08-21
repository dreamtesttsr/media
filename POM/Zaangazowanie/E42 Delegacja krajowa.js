class E42 {
    // Delegacja
    powrotPrzycisk(){
        return cy.get('.return-button').contains('Powrót')
    }

    statusDelegacjiPrzycisk(){
        return cy.get('button#statusHistoryBtn')
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
    kosztPrzejazduPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedRideCost"]')
    }

    kosztPrzejazduRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningRideCost"]')
    }
    
    kosztPrzejazduPlanRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DifferenceRideCost"]')
    }

    ryczaltNaDojazdyPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedRideLumpSum"]')
    }

    ryczaltNaDojazdyRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningRideLumpSum"]')
    }
    
    ryczaltNaDojazdyPlanRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DifferenceRideLumpSum"]')
    }

    razemPrzejazdyDojazdyPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedAllRides"]')
    }

    razemPrzejazdyDojazdyRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningAllRides"]')
    }

    noclegiRyczaltPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedOvernightLumpSum"]')
    }

    noclegiRyczaltRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningOvernightLumpSum"]')
    }
    
    noclegiRyczaltPlanRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DifferenceOvernightLumpSum"]')
    }

    inneWydatkiPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedOtherCosts"]')
    }

    inneWydatkiRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningOtherCosts"]')
    }
    
    inneWydatkiPlanRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DifferenceOtherCosts"]')
    }

    dietaRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_Diet"]')
    }

    kosztCalkowityPlanPoleTekstowe(){
        return cy.get('input[id="Calculation_PlannedAllCosts"]')
    }

    kosztCalkowityRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_ReckoningAllCosts"]')
    }
    
    kosztCalkowityPlanRozliczeniePoleTekstowe(){
        return cy.get('input[id="Calculation_DifferenceAllCosts"]')
    }

    kwotaZaliczkiPoleTekstowe(){
        return cy.get('input[id="Calculation_AdvancePayment"]')
    }

    dataRozliczeniaPoleTekstowe(){
        return cy.get('input[id="ReckoningDate"]')
    }

    czyKompletnePrzyciskWyboru(){
        return cy.get('input[id="IsReckoningComplete"]')
    }

    doZwrotuWyplatyKwotaPoleTekstowe(){
        return cy.get('input[id="Calculation_DelegationCost"]')
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
        this.miejscowoscPoleTekstowe().should('be.visible')
        this.srodekTransportuLista().should('be.visible')
        this.terminWyjazduDataPoleTekstowe().should('be.visible')
        this.terminWyjazduGodzinaPoleTekstowe().should('be.visible')
        this.terminPowrotuDataPoleTekstowe().should('be.visible')
        this.terminPowrotuGodzinaPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        this.podgladPorozumieniaPrzycisk().should('be.visible')
    }

    sprawdzWidokKosztyDelegacji(){
        this.kosztPrzejazduPlanPoleTekstowe().should('be.visible')
        this.kosztPrzejazduRozliczeniePoleTekstowe().should('be.visible')
        this.kosztPrzejazduPlanRozliczeniePoleTekstowe().should('be.visible')
        this.ryczaltNaDojazdyPlanPoleTekstowe().should('be.visible')
        this.ryczaltNaDojazdyRozliczeniePoleTekstowe().should('be.visible')
        this.ryczaltNaDojazdyPlanRozliczeniePoleTekstowe().should('be.visible')
        this.razemPrzejazdyDojazdyPlanPoleTekstowe().should('be.visible')
        this.razemPrzejazdyDojazdyRozliczeniePoleTekstowe().should('be.visible')
        this.noclegiRyczaltPlanPoleTekstowe().should('be.visible')
        this.noclegiRyczaltRozliczeniePoleTekstowe().should('be.visible')
        this.noclegiRyczaltPlanRozliczeniePoleTekstowe().should('be.visible')
        this.inneWydatkiPlanPoleTekstowe().should('be.visible')
        this.inneWydatkiRozliczeniePoleTekstowe().should('be.visible')
        this.inneWydatkiPlanRozliczeniePoleTekstowe().should('be.visible')
        this.dietaRozliczeniePoleTekstowe().should('be.visible')
        this.kosztCalkowityPlanPoleTekstowe().should('be.visible')
        this.kosztCalkowityRozliczeniePoleTekstowe().should('be.visible')
        this.kosztCalkowityPlanRozliczeniePoleTekstowe().should('be.visible')
        this.kwotaZaliczkiPoleTekstowe().should('be.visible')
        this.dataRozliczeniaPoleTekstowe().should('be.visible')
        this.czyKompletnePrzyciskWyboru().should('be.visible')
        this.doZwrotuWyplatyKwotaPoleTekstowe().should('be.visible')
        this.doZwrotuWyplatyPoleTekstowe().should('be.visible')
    }

}

export const e42 = new E42()