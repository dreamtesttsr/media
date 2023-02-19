class E32 {
    
    // Selektory
    zapiszPrzycisk(){
        return cy.get('#save_button_details').should('have.text', 'Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('span > .btn').should('have.text', 'Powrót')
    }

    podgladPorozumieniaPrzycisk(){
        return cy.get('#view_agreement_button').should('have.attr', 'title', 'Podgląd porozumienia')
    }

    nrZamowieniaPoleTekstowe(){
        return cy.get('input#orderNrTextBox')
    }

    typLista(){
        return cy.get('#select2-IdOrderType-container')
    }

    agencjaLista(){
        return cy.get('#select2-AgencyIdCombo-container')
    }

    popupTakPrzycisk(){
        return cy.get('#limitInfoModal-yesBtn')
    }

    kosztorysLista(){
        return cy.get('[name="IdTitle"]')
    }

    nrWewnLista(){
        return cy.get('[name="AgreementInternalNr"]')
    }

    nrPorozumieniaLista(){
        return cy.get('[name="IdAgreement"]')
    }

    kontrahentLista(){
        return cy.get('#select2-IdContractor-container')
    }

    nettoPoleTekstowe(){
        return cy.get('#AmountNetOnContract')
    }
    
    vatPoleTekstowe(){
        return cy.get('#VatOnContract')
    }

    bruttoEtykieta(){
        return cy.get('[for="AmountGrossOnContract"]')
    }

    bruttoNaUmowiePrzyciskWyboru(){
        return cy.get('#AmountGrossOnContract_checkbox')
    }

    bruttoPoleTekstowe(){
        return cy.get('input#AmountGrossOnContract')
    }

    rodzajLista(){
        return cy.get('#Details_IdOrderKind')
    }

    dfPoleTekstowe(){
        return cy.get('#Details_InternalNumber')
    }

    rejestracjaData(){
        return cy.get('#Details_RegistrationDate')
    }

    dataZawarciaData(){
        return cy.get('#Details_DateOfConclusion')
    }

    terminRealizacjiData(){
        return cy.get('#Details_DateOfImplementation')
    }

    umowaZakupUslugaRadio(){
        return cy.get(':nth-child(2) > #Details_IsContract')
    }

    zamowienieZakupUslugaRadio(){
        return cy.get(':nth-child(3) > #Details_IsContract')
    }

    rezerwacjaMMPrzyciskWyboru(){
        return cy.get('#Details_MmReservation')
    }

    dniUmowyPoleTekstowe(){
        return cy.get('#Details_ContractDurationDates')
    }

    dniPlatnosciPoleTekstowe(){
        return cy.get('#Details_DateOfPayment')
    }

    warunekLista(){
        return cy.get('#Details_IdTermsOfPayment')
    }

    uwagiPlatnosciPoleTekstowe(){
        return cy.get('#Details_PaymentNotes')
    }
    
    przedmiotZleceniaLista(){
        return cy.get('#Details_IdObjectOfOrder')
    }

    niestPrzedZamPoleTekstowe(){
        return cy.get('#Details_ObjectOfOrderRemarks')
    }

    limitLista(){
        return cy.get('#Details_IdPlannedLimit')
    }

    nieplanowanePrzyciskWyboru(){
        return cy.get('#Details_UnplannedCosts')
    }

    powodPoleTekstowe(){
        return cy.get('#Details_ReasonOfUnplannedCosts')
    }

    uwagiZakupUslugaPoleTekstowe(){
        return cy.get('#Details_Comments')
    }    

    opisPoleTekstowe(){
        return cy.get('#Details_Description')
    }

    nettoVatWKosztachPrzyciskWyboru(){
        return cy.get('#Details_CalculatedValueNettoWithCostVat_checkbox')
    }

    nettoVatWKosztachPoleTekstowe(){
        return cy.get('#Details_CalculatedValueNettoWithCostVat')
    }

    statusZamowieniaPrzycisk(){
        return cy.get('#statusHistoryBtn').should('have.attr', 'data-original-title', 'Status zamówienia')
    }

    kopiujPrzycisk(){
        return cy.get('[data-confirm-async="copyConfrimInfo()"]').should('have.text', 'Kopiuj')
    }

    zamknijZamowieniePrzycisk(){
        return cy.get('#btnFinish').should('have.text', 'Zamknij zamówienie')
    }

    zalaczFakturePrzycisk(){
        return cy.get('#addInvoiceButton').should('have.text', 'Załącz fakturę')
    }

    nowaFakturaPrzycisk(){
        return cy.get('a[title="Wprowadź nową fakturę"]').should('have.text', 'Nowa faktura')
    }

    podgladFakturyPierwszyPrzycisk(){
        return cy.get('a.btn.btn-info.btn-xs').first()
    }

    edytujFakturePierwszyPrzycisk(){
        return cy.get('a.btn.btn-success.btn-xs').first()
    }

    usunFakturePierwszyPrzycisk(){
        return cy.get('button.btn.btn-danger.btn-xs.fa.fa-trash').first()
    }

    dodajPlikDoRepoPrzycisk(){
        return cy.get('#btnSelectAttachmentLocal').should('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
    }

    dodajLinkDoZalPrzycisk(){
        return cy.get('#btnSelectAttachmentScanFile').should('have.attr', 'title', 'Dodaj Link Do Załącznika')
    }

    miejscowoscPoleTekstowe(){
        return cy.get('#Hotel_City')
    }

    iloscOsobPoleTekstowe(){
        return cy.get('#Hotel_NumberOfPeople')
    }

    kosztPoleTekstowe(){
        return cy.get('#Hotel_PlannedCost')
    }

    nrDfPoleTekstowe(){
        return cy.get('#Hotel_DfNumber')
    }

    rezerwacjaOdData(){
        return cy.get('#Hotel_ReservationFrom')
    }

    rezerwacjaDoData(){
        return cy.get('#Hotel_ReservationTo')
    }

    kwotaNaFakturzePoleTekstowe(){
        return cy.get('#Hotel_AmountOnInvoice')
    }

    uwagiHotelPoleTekstowe(){
        return cy.get('#Hotel_Comments')
    }

    dataZamowieniaData(){
        return cy.get('#Hotel_OrderDate')
    }

    nrFakturyPoleTekstowe(){
        return cy.get('#Hotel_InvoiceNumber')
    }

    umowaHotelRadio(){
        return cy.get(':nth-child(2) > #Hotel_IsContract')
    }

    zamowienieHotelRadio(){
        return cy.get(':nth-child(3) > #Hotel_IsContract')
    }
    
    czyZagrPrzyciskWyboru(){
        return cy.get('#Hotel_IsAbroad')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Order/Details')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Zamówienie')
    }

    sprawdzOperacje(){
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.podgladPorozumieniaPrzycisk().should('be.visible')
    }

    sprawdzWartosciZakupUsluga(agencjaUzytkownika){
        this.nrZamowieniaPoleTekstowe().should('not.have.value','(brak)')
        this.typLista().should('have.text', 'Zamówienie')
        this.agencjaLista().should('not.have.text','Wybierz...')
        this.agencjaLista().should('contain', agencjaUzytkownika)
    }

    sprawdzWartosciHotel(agencjaUzytkownika){
        this.nrZamowieniaPoleTekstowe().should('not.have.value','(brak)')
        this.typLista().should('have.text', 'Hotel')
        this.agencjaLista().should('not.have.text','Wybierz...')
        this.agencjaLista().should('contain', agencjaUzytkownika)
    }

    sprawdzWalidacjeZakupUsluga(){
        cy.get('.validation-summary-errors > ul > :nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kontrahent\'.')
        // cy.get('.validation-summary-errors > ul > :nth-child(2)').should('be.visible').and('have.text','Wymagane wypełnienie pola \'Agencja\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(4)').should('be.visible').and('have.text', 'Wybierz  \'Umowa\' lub \'Zamówienie\' w szczegółach')
        cy.get('.validation-summary-errors > ul > :nth-child(5)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Rodzaj\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(6)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Zaw.\'.')

        cy.get(':nth-child(7) > .inputgroup > .input-group-prepend').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kontrahent\'.')
        // cy.get(':nth-child(11) > .well > :nth-child(3) > .col-lg-3 > .inputgroup > .input-group-addon > .text-danger').should('be.visible').and('have.text','Wymagane wypełnienie pola \'Agencja\'.')
        cy.get(':nth-child(12) > :nth-child(2) > :nth-child(1) > .col-lg-3 > .inputgroup > .input-group-prepend').should('be.visible').and('have.text','Wymagane wypełnienie pola \'Nr\'.')
        cy.get(':nth-child(2) > .col-lg-5 > .inputgroup > .input-group-prepend').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('[style="padding-right: 3px;"] > :nth-child(2) > :nth-child(2) > :nth-child(2) > .inputgroup > .input-group-prepend > .text-danger').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Rodzaj\'.')
        cy.get('[style="padding-right: 3px;"] > :nth-child(2) > :nth-child(3) > :nth-child(2) > .inputgroup > .textbox-danger > .text-danger').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Zaw.\'.')
    }

    sprawdzWalidacjeHotel(){
        cy.get('.validation-summary-errors > ul > :nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kontrahent\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(4)').should('be.visible').and('have.text', 'Wybierz \'Umowa\' lub \'Zamówienie\' w szczegółach')

        cy.get('[data-valmsg-for="IdContractor"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kontrahent\'.')
        cy.get('[data-valmsg-for="IdAgreement"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('[data-valmsg-for="IdTitle"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
    }

    wypelnijNrPorozumienia(nrPorozumienia, idPorozumienia){
        cy.get('#select2-IdAgreement-container').click()
        cy.get('.select2-search__field').type(nrPorozumienia)
        cy.get('.select2-results__options').contains(`${idPorozumienia} - ${nrPorozumienia}`).click()
    }

    wypelnijNrKosztorysu(nazwaKosztorysu, idKosztorysu){
        cy.get('#select2-IdTitle-container').click()
        cy.get('.select2-search__field').type(nazwaKosztorysu)
        cy.get('.select2-results__options').contains(`${idKosztorysu} - ${nazwaKosztorysu}`).click()
    }

    wypelnijNrWewn(nrWewn){
        cy.get('#select2-AgreementInternalNr-container').click()
        cy.get('.select2-search__field').type(nrWewn)
        cy.get('.select2-results__options').contains(nrWewn).click()
    }

    wypelnijKontrahenta(nazwaKontrahenta, idKontahenta){
        this.kontrahentLista().click()
        cy.get('.select2-search__field').type(idKontahenta)
        cy.get('.select2-results__option', { timeout: 20000 }).should('contain', `${nazwaKontrahenta} - ${idKontahenta}`).click()
    }

}

export const e32 = new E32()