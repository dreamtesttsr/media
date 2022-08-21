class E51601{

    // Selektory
    nrZamowieniaPoleTekstowe(){
        return cy.get('#OrderNumber')
    }

    statusZamowieniaLista(){
        return cy.get('select#StatusId')
    }

    idWnioskuOZasobyPoleTekstowe(){
        return cy.get('input#RequestId')
    }

    tytulAudycjiPoleTekstowe(){
        return cy.get('input#AuditionTitle')
    }

    koordynatorUslugPoleTekstowe(){
        return cy.get('input#CoordinatorNames')
    }

    specyfikacjaOpracowanaPrzezPoleTekstowe(){
        return cy.get('input#SpecificationPreparer')
    }

    osobaProwadzacaWDzialeZakupowPoleTekstowe(){
        return cy.get('select#PurchasingDepartmentEmployeeId')
    }

    uwagiDoSpecyfikacjiPoleTekstowe(){
        return cy.get('textarea#CommentsToSpecification')
    }

    grupaAsortymentowaLista(){
        return cy.get('select#AssortmentGroupId')
    }

    opisZamowieniaPoleTekstowe(){
        return cy.get('textarea#Description')
    }

    miejsceRealizacji(){
        return cy.get('input#RealizationPlace')
    }

    okresRealizacjiOdData(){
        return cy.get('input#OrderProcessingPeriodFrom')
    }

    okresRealizacjiDoData(){
        return cy.get('input#OrderProcessingPeriodFrom')
    }

    wartoscKosztorysowaPoleTekstowe(){
        return cy.get('input#CostEstimate')
    }

    wartoscSzacunkowaPoleTekstowe(){
        return cy.get('input#EstimatedOrderValue')
    }

    sprzetZObslugaTakRadio(){
        return cy.get('#IsEquipmentWithStaff').eq(0)
    }

    sprzetZObslugaNieRadio(){
        return cy.get('#IsEquipmentWithStaff').eq(1)
    }

    uwagiDodatkowePoleTekstowe(){
        return cy.get('input#AdditionalComments')
    }

    stronaPokrywajacaKosztyZakwaterowaniaLista(){
        return cy.get('select#Accommodation')
    }

    uslugaUwzgledniaMontazDemontazLista(){
        return cy.get('select#AssemblyDismantling')
    }

    sposobKalkulacjiOfertyLista(){
        return cy.get('select#Calculation')
    }

    innySposobKalkulacjiOfertyPoleTekstowe(){
        return cy.get('input#CalculationDifferentType')
    }

    uslugaUwzgledniaTransportSprzetuLista(){
        return cy.get('select#Transport')
    }

    czyZarejestrowanoNaPlatformieZakupowejPrzyciskWyboru(){
        return cy.get('input#IsPzOrder')
    }

    wartoscWybranejOfertyPoleTekstowe(){
        return cy.get('input#SelectedOfferValue')
    }

    wybranyOferentPoleTekstowe(){
        return cy.get('input#SelectedOfferName')
    }

    sposobRozstrzygnieciaUmowaRadio(){
        return cy.get('input#IsContract').eq(0)
    }

    sposobRozstrzygnieciaZamowienieRadio(){
        return cy.get('input#IsContract').eq(1)
    }

    nrUmowyWCRUPoleTekstowe(){
        return cy.get('input#CruNumber')
    }

    komentarzPoleTekstowe(){
        return cy.get('textarea#Comment')
    }

    zapiszPrzycisk(){
        return cy.get('button#saveBtn').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button.btn-info.btn').contains('Powrót')
    }

    historiaZmianPrzycisk(){
        return cy.get('button[onclick="showHistory()"]').contains('Historia zmian')
    }

    przegladWnioskuOZasobyPrzycisk(){
        return cy.get('a[title="Przegląd wniosku o zasoby"]').contains('P')
    }

    // Metody
    sprawdzWidok(){
        this.nrZamowieniaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.statusZamowieniaLista().should('be.visible')
        this.idWnioskuOZasobyPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.tytulAudycjiPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.koordynatorUslugPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.specyfikacjaOpracowanaPrzezPoleTekstowe().should('be.visible')
        this.osobaProwadzacaWDzialeZakupowPoleTekstowe().should('be.visible')
        this.uwagiDoSpecyfikacjiPoleTekstowe().should('be.visible')
        this.grupaAsortymentowaLista().should('be.visible')
        this.opisZamowieniaPoleTekstowe().should('be.visible')
        this.miejsceRealizacji().should('be.visible')
        this.okresRealizacjiOdData().should('be.visible')
        this.okresRealizacjiDoData().should('be.visible')
        this.wartoscKosztorysowaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.wartoscSzacunkowaPoleTekstowe().should('be.visible')
        this.sprzetZObslugaTakRadio().should('be.visible').and('have.prop', 'checked', true)
        // this.sprzetZObslugaNieRadio().should('be.visible').and('have.prop', 'checked', false)
        this.uwagiDodatkowePoleTekstowe().should('be.visible')
        this.stronaPokrywajacaKosztyZakwaterowaniaLista().should('be.visible')
        this.uslugaUwzgledniaMontazDemontazLista().should('be.visible')
        this.sposobKalkulacjiOfertyLista().should('be.visible')
        this.innySposobKalkulacjiOfertyPoleTekstowe().should('be.visible')
        this.uslugaUwzgledniaTransportSprzetuLista().should('be.visible')
        this.czyZarejestrowanoNaPlatformieZakupowejPrzyciskWyboru().should('be.visible').and('have.prop', 'checked', false).and('have.prop', 'disabled', true)
        this.wartoscWybranejOfertyPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.wybranyOferentPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.sposobRozstrzygnieciaUmowaRadio().should('be.visible').and('have.prop', 'checked', true).and('have.prop', 'disabled', false)
        this.sposobRozstrzygnieciaZamowienieRadio().should('be.visible').and('have.prop', 'checked', false).and('have.prop', 'disabled', true)
        this.nrUmowyWCRUPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.komentarzPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.przegladWnioskuOZasobyPrzycisk().should('be.visible')
    }

}

export const e51601 = new E51601()