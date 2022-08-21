class E34 {
    
    // Selektory
    zapiszPrzycisk(){
        return cy.get('#save_button').should('have.text', 'Zapisz')
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
        return cy.get('.inputgroup > [value="Zamówienie wewnętrzne"]')
    }

    agencja(){
        return cy.get('#select2-AgencyIdCombo-container')
    }

    kosztorys(){
        return cy.get('#select2-IdTitle-container')
    }

    nrWewn(){
        return cy.get('#select2-AgreementInternalNr-container')
    }

    nrPorozumienia(){
        return cy.get('#select2-IdAgreement-container')
    }

    kontrahent(){
        return cy.get('#select2-IdContractor-container')
    }

    kosztLacznie(){
        return cy.get('#CostTotal')
    }

    jednostkaTVP(){
        return cy.get('#select2-OrganizationUnitId-container')
    }

    kosztWew(){
        return cy.get('#InternalCost')
    }

    kosztZew(){
        return cy.get('#ExtermalCost')
    }

    wynagrodzenie(){
        return cy.get('#Salary')
    }

    rodzaj(){
        return cy.get('#IdOrderKind')
    }

    rodzajWartosc(){
        return cy.get('#select2-IdOrderKind-container')
    }

    dataZawarcia(){
        return cy.get('#DateOfConclusion')
    }

    terminRealizacji(){
        return cy.get('#DateOfImplementation')
    }

    limit(){
        return cy.get('select#IdPlannedLimit')
    }

    limitWartosc(){
        return cy.get('#select2-IdPlannedLimit-container')
    }

    nieplanowane(){
        return cy.get('#UnplannedCosts')
    }

    powod(){
        return cy.get('#ReasonOfUnplannedCosts')
    }

    uwagi(){
        return cy.get('#Comments')
    }

    opis(){
        return cy.get('#Description')
    }

    zalaczRachunekPrzycisk(){
        return cy.get('button#addInvoiceButton').should('have.text', 'Załącz rachunek')
    }

    statusZamowieniaPrzycisk(){
        return cy.get('#statusHistoryBtn').should('have.attr', 'data-original-title', 'Status zamówienia')
    }

    kopiujPrzycisk(){
        return cy.get('[data-confirm-async="copyConfrimInfo()"]').should('have.text', 'Kopiuj')
    }

    zamknijZamowieniePrzycisk(){
        return cy.get('button#btnFinish').should('have.text', 'Zamknij zamówienie')
    }

    nowyRachunekPrzycisk(){
        return cy.get('a[title="Wprowadź nowy rachunek"]').should('have.text', 'Nowy rachunek')
    }

    dodajPlikDoRepoPrzycisk(){
        return cy.get('button[title="Dodaj Plik Do Repozytorium"]').should('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
    }

    dodajLinkDoZalPrzycisk(){
        return cy.get('button[title="Dodaj Link Do Załącznika"]').should('have.attr', 'title', 'Dodaj Link Do Załącznika')
    }

    dniUmowy(){
        return cy.get('#DateOfPayment')
    }
    
    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Order/DetailsInternalOrder')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Zamówienie')
    }

    sprawdzOperacje(){
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.podgladPorozumieniaPrzycisk().should('be.visible')
    }

    sprawdzWartosciWewnetrzne(agencjaUzytkownika){
        this.nrZamowienia().should('not.have.value','(brak)')
        this.typ().should('have.attr', 'value', 'Zamówienie wewnętrzne')
        this.agencja().should('not.have.text','Wybierz...')
        this.agencja().should('contain', agencjaUzytkownika)
    }

    sprawdzWalidacje(){
        cy.get('.validation-summary-errors > ul > :nth-child(1)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Jednostka TVP \'.')
        cy.get('.validation-summary-errors > ul > :nth-child(2)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(3)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('.validation-summary-errors > ul > :nth-child(4)').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Rodzaj\'.')
        cy.get('[data-valmsg-for="OrganizationUnitId"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Jednostka TVP \'.')
        cy.get('[data-valmsg-for="IdAgreement"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Nr\'.')
        cy.get('[data-valmsg-for="IdTitle"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Kosztorys\'.')
        cy.get('[data-valmsg-for="IdOrderKind"]').should('be.visible').and('have.text', 'Wymagane wypełnienie pola \'Rodzaj\'.')
    }

    wypelnijNrPorozumienia(nrPorozumienia){
        this.nrPorozumienia().click()
        cy.get('.select2-search__field').type(nrPorozumienia)
        cy.get('.select2-results__option').should('contain', nrPorozumienia).click()
    }

    wypelnijNrKosztorysu(nazwaKosztorysu, idKosztorysu){
        this.kosztorys().click()
        cy.get('.select2-search__field').type(nazwaKosztorysu)
        cy.get('.select2-results__option').should('contain', `${idKosztorysu} - ${nazwaKosztorysu}`).click()
    }

    wypelnijNrWewn(nrWewn){
        this.nrWewn().click()
        cy.get('.select2-search__field').type(nrWewn)
        cy.get('.select2-results__option').should('contain', nrWewn).click()
    }

    wypelnijJednTVP(jednostkaTVP){
        this.jednostkaTVP().click()
        cy.get('.select2-search__field').type(jednostkaTVP)
        cy.get('.select2-results__option').should('contain', jednostkaTVP).click()
    }
}

export const e34 = new E34()