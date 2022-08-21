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

    nrZamowienia(){
        return cy.get('input#orderNrTextBox')
    }

    typ(){
        return cy.get('#select2-IdOrderType-container')
    }

    agencja(){
        return cy.get('#select2-AgencyIdCombo-container')
    }

    popupTak(){
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

    kontrahent(){
        return cy.get('#select2-IdContractor-container')
    }

    netto(){
        return cy.get('#AmountNetOnContract')
    }
    
    vat(){
        return cy.get('#VatOnContract')
    }

    etykietaBrutto(){
        return cy.get('[for="AmountGrossOnContract"]')
    }

    checkboxBrutto(){
        return cy.get('#AmountGrossOnContract_checkbox')
    }

    brutto(){
        return cy.get('input#AmountGrossOnContract')
    }

    rodzaj(){
        return cy.get('#Details_IdOrderKind')
    }

    df(){
        return cy.get('#Details_InternalNumber')
    }

    rejestracja(){
        return cy.get('#Details_RegistrationDate')
    }

    dataZawarcia(){
        return cy.get('#Details_DateOfConclusion')
    }

    terminRealizacji(){
        return cy.get('#Details_DateOfImplementation')
    }

    radioUmowaZakupUsluga(){
        return cy.get(':nth-child(2) > #Details_IsContract')
    }

    radioZamowienieZakupUsluga(){
        return cy.get(':nth-child(3) > #Details_IsContract')
    }

    rezerwacjaMM(){
        return cy.get('#Details_MmReservation')
    }

    dniUmowy(){
        return cy.get('#Details_ContractDurationDates')
    }

    dniPlatnosci(){
        return cy.get('#Details_DateOfPayment')
    }

    warunek(){
        return cy.get('#Details_IdTermsOfPayment')
    }

    uwagiPlatnosci(){
        return cy.get('#Details_PaymentNotes')
    }
    
    przedmiotZlecenia(){
        return cy.get('#Details_IdObjectOfOrder')
    }

    niestPrzedZam(){
        return cy.get('#Details_ObjectOfOrderRemarks')
    }

    limit(){
        return cy.get('#Details_IdPlannedLimit')
    }

    nieplanowane(){
        return cy.get('#Details_UnplannedCosts')
    }

    powod(){
        return cy.get('#Details_ReasonOfUnplannedCosts')
    }

    uwagiZakupUsluga(){
        return cy.get('#Details_Comments')
    }    

    opis(){
        return cy.get('#Details_Description')
    }

    checkboxNettoVatWKosztach(){
        return cy.get('#Details_CalculatedValueNettoWithCostVat_checkbox')
    }

    nettoVatWKosztach(){
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

    miejscowosc(){
        return cy.get('#Hotel_City')
    }

    iloscOsob(){
        return cy.get('#Hotel_NumberOfPeople')
    }

    koszt(){
        return cy.get('#Hotel_PlannedCost')
    }

    nrDf(){
        return cy.get('#Hotel_DfNumber')
    }

    rezerwacjaOd(){
        return cy.get('#Hotel_ReservationFrom')
    }

    rezerwacjaDo(){
        return cy.get('#Hotel_ReservationTo')
    }

    kwotaNaFakturze(){
        return cy.get('#Hotel_AmountOnInvoice')
    }

    uwagiHotel(){
        return cy.get('#Hotel_Comments')
    }

    dataZamowienia(){
        return cy.get('#Hotel_OrderDate')
    }

    nrFaktury(){
        return cy.get('#Hotel_InvoiceNumber')
    }

    radioUmowaHotel(){
        return cy.get(':nth-child(2) > #Hotel_IsContract')
    }

    radioZamowienieHotel(){
        return cy.get(':nth-child(3) > #Hotel_IsContract')
    }
    
    checkboxCzyZagr(){
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
        this.nrZamowienia().should('not.have.value','(brak)')
        this.typ().should('have.text', 'Zamówienie')
        this.agencja().should('not.have.text','Wybierz...')
        this.agencja().should('contain', agencjaUzytkownika)
    }

    sprawdzWartosciHotel(agencjaUzytkownika){
        this.nrZamowienia().should('not.have.value','(brak)')
        this.typ().should('have.text', 'Hotel')
        this.agencja().should('not.have.text','Wybierz...')
        this.agencja().should('contain', agencjaUzytkownika)
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
        this.kontrahent().click()
        cy.get('.select2-search__field').type(idKontahenta)
        cy.get('.select2-results__option', { timeout: 20000 }).should('contain', `${nazwaKontrahenta} - ${idKontahenta}`).click()
    }

}

export const e32 = new E32()