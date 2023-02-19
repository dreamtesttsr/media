class E51601{

    // Selektory
    nrZamowieniaPoleTekstowe(){
        return cy.get('#OrderNumber')
    }

    idZamowieniaPoleTekstowe(){
        return cy.get('input#Id')
    }

    statusZamowieniaLista(){
        return cy.get('select#StatusId')
    }

    specyfikacjaOpracowanaPrzezPoleTekstowe(){
        return cy.get('input#SpecificationPreparer')
    }

    osobaProwadzacaWDzialeZakupowPoleTekstowe(){
        return cy.get('#PurchasingDepartmentEmployeeId').siblings('.form-control')
    }

    osobaProwadzacaWDzialeZakupowLista(){
        return cy.get('select#PurchasingDepartmentEmployeeId')
    }

    uwagiDoSpecyfikacjiPoleTekstowe(){
        return cy.get('textarea#CommentsToSpecification')
    }

    wartoscKosztorysowaPoleTekstowe(index){
        return cy.get('#AgreementTableId > tbody > tr > td:nth-child(4)').eq(index)
    }

    grupaAsortymentowaLista(){
        return cy.get('select#AssortmentGroupId')
    }

    opisZamowieniaPoleTekstowe(){
        return cy.get('textarea#OrderDescription')
    }

    miejsceRealizacjiPoleTekstowe(){
        return cy.get('input#RealizationPlace')
    }

    okresRealizacjiOdData(){
        return cy.get('input#OrderProcessingPeriodFrom')
    }

    okresRealizacjiDoData(){
        return cy.get('input#OrderProcessingPeriodFrom')
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

    dodajRezerwacjePrzycisk(){
        return cy.get('button#addResourceBtn')
    }

    usuniecieRezerwacjiPierwszyPrzycisk(){
        return cy.get('[title="Usunięcie rezerwacji"]').first()
    }

    usunWybranePrzycisk(){
        return cy.get('button#deleteReservationsBtn').contains('Usuń wybrane')
    }

    takUsunPopupPrzycisk(){
        return cy.get('button#deleteModal-yesBtn').contains('Tak')
    }

    zaznaczWszystkiePrzyciskWyboru(){
        return cy.get('input#selectAllReservationCheckboxes').first()
    }

    zaznaczPierwszyPrzyciskWyboru(){
        return cy.get('input[type="checkbox"].selectReservationCb').first()
    }

    edycjaWartosciZamowieniaPierwszyPrzycisk(){
        return cy.get('button[title="Edycja wartości zamówienia"]').first()
    }

    dodajPlikDoRepozytoriumPrzycisk(){
        return cy.get('button#btnSelectAttachmentLocal')
    }

    dodajLinkDoZalacznikaPrzycisk(){
        return cy.get('button#btnSelectAttachmentScanFile')
    }

    // Metody
    sprawdzWidok(){
        this.nrZamowieniaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.idZamowieniaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.statusZamowieniaLista().should('be.visible')
        this.specyfikacjaOpracowanaPrzezPoleTekstowe().should('be.visible')
        cy.contains('Powiązane produkcje TV').should('be.visible')
        this.edycjaWartosciZamowieniaPierwszyPrzycisk().should('be.visible')
        cy.contains('Powiązane rezerwacje').should('be.visible')
        this.dodajRezerwacjePrzycisk().should('be.visible')
        this.usunWybranePrzycisk().should('be.visible')
        this.usuniecieRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.uwagiDoSpecyfikacjiPoleTekstowe().should('be.visible')
        this.grupaAsortymentowaLista().should('be.visible')
        this.opisZamowieniaPoleTekstowe().should('be.visible')
        this.miejsceRealizacjiPoleTekstowe().should('be.visible')
        this.okresRealizacjiOdData().should('be.visible')
        this.okresRealizacjiDoData().should('be.visible')
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
        this.historiaZmianPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.osobaProwadzacaWDzialeZakupowLista().should('be.visible')
    }

    sprawdzWidok18(){
        this.osobaProwadzacaWDzialeZakupowPoleTekstowe().should('be.visible')
    }

    sprawdzWidok26(){
        this.osobaProwadzacaWDzialeZakupowPoleTekstowe().should('be.visible')
    }

}

export const e51601 = new E51601()