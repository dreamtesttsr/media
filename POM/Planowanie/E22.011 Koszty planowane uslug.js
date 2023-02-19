class E22011 {
    // Selektory
    powrotPrzycisk(){
        return cy.get('button').contains('Powrót')
    }
    
    nrPorozumieniaPoleTekstowe(){
        return cy.get('input#AgreementName')
    }

    odcinekPoleTekstowe(){
        return cy.get('input#NumberEpisode')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('input#AuditionTvName')
    }

    idAudycjiPoleTekstowe(){
        return cy.get('input#AuditionSystemId')
    }

    sapProdukcyjnyPoleTekstowe(){
        return cy.get('input#ProductionSap')
    }

    kosztorysPoleTekstowe(){
        return cy.get('input#TitleName')
    }

    sumaKosztowPlanowanychPoleTekstowe(){
        return cy.get('input#SummaryPlannedCost')
    }

    sredniaOdWynagrodzePracowniczychPoleTekstowe(){
        return cy.get('input#AveragePayroll')
    }

    sredniaOdWynagrodzePracowniczychProcentPoleTekstowe(){
        return cy.get('input#PercentageAveragePayroll')
    }

    zusOdWynagrodzenPracowniczychPoleTekstowe(){
        return cy.get('input#ZusPayroll')
    }

    zusOdWynagrodzenPracowniczychProcentPoleTekstowe(){
        return cy.get('input#PercentageZusPayroll')
    }

    kosztyBezposredniePoleTekstowe(){
        return cy.get('input#DirectCost')
    }

    inneKosztyPoleTekstowe(){
        return cy.get('input#OtherCost')
    }

    inneKosztyProcentPoleTekstowe(){
        return cy.get('input#PercentagePayroll')
    }

    cenaSprzedazyPoleTekstowe(){
        return cy.get('input#SellCost')
    }

    uslugaProduktLista(){
        return cy.get('select#costAudition_ThreeLevelCostId')
    }

    podgrupaLista(){
        return cy.get('select#costAudition_SecondLevelCostId')
    }

    grupaLista(){
        return cy.get('select#costAudition_FirstLevelCostId')
    }

    liczbaJednObliczPoleTekstowe(){
        return cy.get('input#costAudition_CalcTypeCount')
    }

    liczbaOsSztPoleTekstowe(){
        return cy.get('input#costAudition_CalcCount')
    }

    opisPoleTekstowe(){
        return cy.get('input#costAudition_Description')
    }

    jednostkaObliczeniowaLista(){
        return cy.get('select#costAudition_CalcTypeId')
    }

    jednostkaTVPSALista(){
        return cy.get('select#costAudition_OrganizationId')
    }

    rodzajZatrudnieniaLista(){
        return cy.get('select#costAudition_EmploymentTypeId')
    }

    stawkaZaJednObliczPoleTekstowe(){
        return cy.get('input#costAudition_CalcCost')
    }

    suma1OdcPoleTekstowe(){
        return cy.get('input#costAudition_CalcCostSum')
    }

    vatLista(){
        return cy.get('select#costAudition_VatIdTemp')
    }

    uwagiPoleTekstowe(){
        return cy.get('input#costAudition_Comments')
    }

    dodajPrzycisk(){
        return cy.get('input#btnSave')
    }

    edytujPierwszyPrzycisk(){
        return cy.get('button[title="Edytuj"]').first()
    }

    usunPierwszyPrzycisk(){
        return cy.get('button[title="Usuń"]').first()
    }

    potwierdzPopupPrzycisk(){
        return cy.get('a#confirmBtn')
    }

    // Metody
    sprawdzWidok(){
        this.powrotPrzycisk().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.odcinekPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.sapProdukcyjnyPoleTekstowe().should('be.visible')
        this.kosztorysPoleTekstowe().should('be.visible')
        this.sumaKosztowPlanowanychPoleTekstowe().should('be.visible')
        this.sredniaOdWynagrodzePracowniczychPoleTekstowe().should('be.visible')
        this.sredniaOdWynagrodzePracowniczychProcentPoleTekstowe().should('be.visible')
        this.zusOdWynagrodzenPracowniczychPoleTekstowe().should('be.visible')
        this.zusOdWynagrodzenPracowniczychProcentPoleTekstowe().should('be.visible')
        this.kosztyBezposredniePoleTekstowe().should('be.visible')
        this.inneKosztyPoleTekstowe().should('be.visible')
        this.inneKosztyProcentPoleTekstowe().should('be.visible')
        this.cenaSprzedazyPoleTekstowe().should('be.visible')
        this.uslugaProduktLista().should('be.visible')
        this.podgrupaLista().should('be.visible')
        this.grupaLista().should('be.visible')
        this.liczbaJednObliczPoleTekstowe().should('be.visible')
        this.liczbaOsSztPoleTekstowe().should('be.visible')
        this.opisPoleTekstowe().should('be.visible')
        this.jednostkaObliczeniowaLista().should('be.visible')
        this.jednostkaTVPSALista().should('be.visible')
        this.rodzajZatrudnieniaLista().should('be.visible')
        this.stawkaZaJednObliczPoleTekstowe().should('be.visible')
        this.suma1OdcPoleTekstowe().should('be.visible')
        this.vatLista().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        this.dodajPrzycisk().should('be.visible')
    }

}

export const e22011 = new E22011()