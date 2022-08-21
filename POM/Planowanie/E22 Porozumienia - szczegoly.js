class E22 {
    zapiszPrzycisk(){
        return cy.get('#btnSubmitAgreement').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('#AgreementReturn').contains('Powrót')
    }

    statusPorozumieniaPrzycisk(){
        return cy.get('button#statusHistoryBtn')
    }

    uprawnieniaPrzycisk(){
        return cy.get('button#addProducerRepresentativeBtn').contains('Uprawnienia')
    }

    zglosOpracowaniePrzycisk(){
        return cy.get('button.btn.btn-info').contains('Zgłoś opr.')
    }

    zablokujPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Zablokuj')
    }

    odblokujPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Odblokuj')
    }

    rozliczenieKosztowPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Rozliczenie kosztów')
    }

    historiaZmianPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Historia zmian')
    }

    drukujPrzycisk(){
        return cy.get('#reportDropdownMenuLink').contains('Drukuj')
    }

    zamowieniaPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Zamówienia')
    }

    produkcjaPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Produkcja')
    }

    kopiujPrzycisk(){
        return cy.get('#showCopyButton')
    }

    agencjaPopupLista(){
        return cy.get('select#CopyAgencyId')
    }

    zaznaczPierwszyKosztorysPrzyciskWyboru(){
        return cy.get('input#Titles_0__IsChecked')
    }

    potwierdzPopupPrzycisk(){
        return cy.get('button#agencyForCopyAgreementModal-yesBtn').contains('Potwierdź')
    }

    wynagrodzeniaPrzycisk(){
        return cy.get('button[onclick="showWagesModal()"]')
    }

    osobyWiodacePrzycisk(){
        return cy.get('a#btnCollapseLeadPerson')
    }

    dodajOsobePrzycisk(){
        return cy.get('button#addPeopleToProject')
    }

    numerWewnetrznyPoleTekstowe(){
        return cy.get('#InternalNr')
    }

    dataUtworzeniaPoleTekstowe(){
        return cy.get('#CreateDate')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('#TvAudition')
    }

    jednostkaZamawiajacaLista(){
        return cy.get('#OrganizationUnitId')
    }

    agencjaLista() {
        return cy.get('#AgencyId')
    }

    producentLista(){
        return cy.get('#select2-ProducerId-container')
    }

    redakcjaZamawiajacaLista(){
        return cy.get('#EditorialOfficeId')
    }

    jednostkiWspolpracujaceLista(){
        return cy.get('select#CooperatingUnitsId')
    }

    JSULista(){
        return cy.get('select#ServiceUnitProvidersId')
    }

    jednostkaNadzorujacaProdukcjeLista(){
        return cy.get('#SupervisingUnitId')
    }

    rodzajProdukcjiLista(){
        return cy.get('#ProductionTypeId')
    }

    rodzajPlatnosciLista() {
        return cy.get('#PaymentTypeId')
    }

    rodzajPorozumieniaLista(){
        return cy.get('select#AgreementType')
    }

    lokowaniePrzyciskWyboru(){
        return cy.get('#ProductPlacement')
    }

    trybProdukcjiLista(){
        return cy.get('#ProductionMode')
    }

    zgodaSzybkiPrzebiegData(){
        return cy.get('#div_FastTrackConsentDate')
    }

    porozumienieTrojstronnePrzyciskWyboru(){
        return cy.get('#IsTripartiteAgreement')
    }

    modelProdukcjiLista(){
        return cy.get('select#ProductionModel')
    }

    funduszKinowyPrzyciskWyboru(){
        return cy.get('#IsCinemaFunds')
    }

    wartoscFunduszuKinowegoPoleTekstowe(){
        return cy.get('#ValueOfCinemaFunds')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgrementNrTextBox"]')
    }

    dodajKosztorysPrzycisk(){
        return cy.get('button#addTitleButton')
    }

    edytujKosztorysPrzycisk(){
        return cy.get('button#editTitleButton')
    }


    nazwaKosztorysuPopupPoleTestowe(){
        return cy.get('input[name="AgreementTitle"]')
    }

    usunKosztorysPrzycisk(){
        return cy.get('button#deleteTitleButton')
    }

    kopiujKosztorysPrzycisk(){
        return cy.get('button#copyTitleButton')
    }

    kosztorysyLista(){
        return cy.get('#select2-CurrentTitleId-container')
    }

    celKosztorysuLista(){
        return cy.get('select#CurrentTitle_TitleTargetId')
    }

    czasPoleTekstowe(){
        return cy.get('#CurrentTitle_DurationTime')
    }

    formaLista(){
        return cy.get('#CurrentTitle_AuditionTypeId')
    }

    kosztyPlanowanePrzycisk(){
        return cy.get('#ToPlanedCosts')
    }

    pelnaListaAudycjiPrzycisk(){
        return cy.get('a[title="Pełna lista audycji"]')
    }

    akceptacjeIkonyBlok(){
        return cy.get('label[data-original-title="Akceptacje - kosztorys usługowy"]').parent('div').children('div').last()
    }

    popupAkceptujPrzycisk(){
        return cy.get('#yesReturnButtonId')
    }

    pdf1PlikPopupPrzyciskWyboru(){
        return cy.get('#Merge-In-One-File')
    }

    pdfPopupPrzyciskWyboru(){
        return cy.get('#selectPdf > span')
    }

    excelPopupPrzyciskWyboru(){
        return cy.get('#selectExcel > span')
    }

    drukujPopupPrzycisk(){
        return cy.get('button#printBtn')
    }

    jednostkaWspolpracujacaPopupLista(){
        return cy.get('select#JWIDList')
    }

    podgladPorozumieniaPierwszyPrzycisk(){
        return cy.get('[title="Podgląd Porozumienia"]').contains('P').first()
    }

    masowaEwidencjaSprzedazyPrzycisk(){
        return cy.get('button#ToMassSellEvidence')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Agreement/Edit')
    }

    sprawdzWidok(){ // dotyczy ekranu dodawania porozumienia
        this.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        this.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        this.numerPorozumieniaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.numerWewnetrznyPoleTekstowe().should('be.visible')
        this.dataUtworzeniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz jednostkę zamawiającą').and('not.have.attr', 'readonly')
        this.agencjaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz agencję')
        this.redakcjaZamawiajacaLista().should('be.visible').and('not.have.attr', 'readonly')
        this.jednostkiWspolpracujaceLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...')
        this.jednostkaNadzorujacaProdukcjeLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz jednostkę nadzorującą produkcję').and('not.have.attr', 'readonly')
        this.rodzajProdukcjiLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz rodzaj produkcji').and('not.have.attr', 'readonly')
        this.rodzajPlatnosciLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz rodzaj płatności').and('not.have.attr', 'readonly')
        this.lokowaniePrzyciskWyboru().should('be.visible').and('not.to.be.checked')
        this.trybProdukcjiLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...')
        this.zgodaSzybkiPrzebiegData().should('be.visible').and('have.attr', 'data-custom-date-format', 'DD.MM.YYYY')
        this.porozumienieTrojstronnePrzyciskWyboru().should('be.visible').and('have.prop', 'disabled', true)
        this.modelProdukcjiLista().should('be.visible')
        this.funduszKinowyPrzyciskWyboru().should('be.visible').and('not.to.be.checked')
        this.wartoscFunduszuKinowegoPoleTekstowe().should('be.visible').and('have.attr', 'value', '0,00')
        this.rodzajPorozumieniaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
    }

}

export const e22 = new E22()