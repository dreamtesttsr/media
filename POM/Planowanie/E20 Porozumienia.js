class E20{
    dodajPorozumieniePrzycisk(){
        return cy.get('button[title="Dodaj porozumienie"]')
    }

    sapIdAudycjiMPKPoleTekstowe(){
        return cy.get('input[id="AuditionProductionSap"]')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('input[id="TvAudition"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="Number"]')
    }

    numerWewnPoleTekstowe(){
        return cy.get('input[id="InternalNr"]')
    }

    producentLista(){
        return cy.get('select[id="ProducerId"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    zaawansowaneWyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').eq(1)
    }
    
    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    agencjaLista(){
        return cy.get('#AgencyId')
    }

    jednostkaUslugowaLista(){
        return cy.get('#CooperatingUnitsId')
    }

    bezJednostkiUslugowejPrzyciskWyboru(){
        return cy.get('#SearchAgreementWithoutJw')
    }

    stanPorozumieniaLista(){
        return cy.get('#AgrementStateId')
    }

    statusPorozumieniaLista(){
        return cy.get('#OrderStatusId')
    }

    modelProdukcjiLista(){
        return cy.get('#ProductionModelId')
    }

    porozumienieTrojstronneTakPrzyciskWyboru(){
        return cy.get('#TripartiteAgreementYES')
    }

    porozumienieTrojstronneNiePrzyciskWyboru(){
        return cy.get('#TripartiteAgreementNO')
    }

    lokowanieTakPrzyciskWyboru(){
        return cy.get('#IncludesProductPlacementYES')
    }

    lokowanieNiePrzyciskWyboru(){
        return cy.get('#IncludesProductPlacementNO')
    }

    pozaSEPPTakPrzyciskWyboru(){
        return cy.get('#ProcesingOutOffSeppYES')
    }

    pozaSEPPNiePrzyciskWyboru(){
        return cy.get('#ProcesingOutOffSeppNO')
    }

    funduszKinowyTakPrzyciskWyboru(){
        return cy.get('#CinemaFoundsYES')
    }

    funduszKinowyNiePrzyciskWyboru(){
        return cy.get('#CinemaFoundsNO')
    }

    jednostkaZamawiajacaLista(){
        return cy.get('#OrderUnitId')
    }

    redakcjaZamawiajacaLista(){
        return cy.get('#OfficeId')
    }

    rodzajPrzychoduLista(){
        return cy.get('select#IncomeTypeId')
    }

    rodzajUslugiLista(){
        return cy.get('select#ServiceTypeId')
    }

    osobaWiodacaLista(){
        return cy.get('#LeadingPersonId')
    }

    jednostkaEmitujacaLista(){
        return cy.get('#EmittingUnitId')
    }

    redakcjaEmitujacaLista(){
        return cy.get('#EmittingEditorId')
    }

    dataPorozumieniaOdData(){
        return cy.get('#AgreementDateFrom')
    }

    dataPorozumieniaDoData(){
        return cy.get('#AgreementDateTo')
    }

    dataZamknieciaOdData(){
        return cy.get('#AgreementDateFrom')
    }

    dataZamknieciaDoData(){
        return cy.get('#AgreementDateTo')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#CostName')
    }

    formaAudycjiLista(){
        return cy.get('#AuditionFormID')
    }

    formaAudycjiSzczegLista(){
        return cy.get('#AuditionFormDetailsId')
    }

    antenaLista(){
        return cy.get('#AntenaId')
    }

    nrRejestruAntenyPoleTekstowe(){
        return cy.get('#AntenaNrId')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
    }

    eksportujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel widoczne kolumny"]')
    }

    eksportujWszystkieKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel wszystkie kolumny"]')
    }

    wybierzWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Wybierz widoczne kolumny"]')
    }

    uprawnieniaPrzycisk(){
        return cy.get('button[title="Uprawnienia"]')
    }

    // Dodawanie porozumienia
    nrPoleTekstowe(){
        return cy.get('input#AgrementNrTextBox')
    }

    nrWewnPoleTekstowe(){
        return cy.get('#InternalNr')
    }

    dataZawData(){
        return cy.get('CreateDate')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('#TvAudition')
    }

    jednZamLista(){
        return cy.get('select#OrganizationUnitId')
    }

    jednWspLista(){
        return cy.get('select#CooperatingUnitsId')
    }

    redakcjaZamLista(){
        return cy.get('select#EditorialOfficeId')
    }

    nadzorProdLista(){
        return cy.get('select#SupervisingUnitId')
    }

    rodzPlatnLista(){
        return cy.get('#PaymentTypeId')
    }

    trybProdukcjiLista(){
        return cy.get('select#ProductionMode')
    }

    porozumienieTrojstronnePrzyciskWyboru(){
        return cy.get('input#IsTripartiteAgreement')
    }

    modelProdukcjiDodawanieLista(){
        return cy.get('select#ProductionModel')
    }

    fKinowyPrzyciskWyboru(){
        return cy.get('input#IsCinemaFunds')
    }

    lokowaniePrzyciskWyboru(){
        return cy.get('input#ProductPlacement')
    }

    wartoscFunduszuPoleTekstowe(){
        return cy.get('input#ValueOfCinemaFunds')
    }

    zgodaSPData(){
        return cy.get('input#FastTrackConsentDate')
    }

    rodzajPorozumieniaLista(){
        return cy.get('select#AgreementType')
    }

    celKosztorysuLista(){
        return cy.get('select#NewTitleTarget')
    }

    zapiszPrzycisk(){
        return cy.get('button#btnSubmitAgreement')
    }

    powrotPrzycisk(){
        return cy.get('button#AgreementReturn')
    }

    nrPorozumieniaPowiazanegoPoleTekstowe(){
        return cy.get('input[title="Nr porozumienia powiązanego"]')
    }
    
    // Lista porozumień na stronie wyszukiwarki
    porozumieniaTabela(){
        return cy.get('table[aria-describedby="agreementList_table_info"]')
    }

    podgladPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('P').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja"]').contains('E').first()
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Agreement/Index')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Porozumienia')
        this.sapIdAudycjiMPKPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.numerWewnPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.podgladPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.jednostkaUslugowaLista().should('be.visible')
        this.bezJednostkiUslugowejPrzyciskWyboru().should('be.visible')
        this.stanPorozumieniaLista().should('be.visible')
        this.statusPorozumieniaLista().should('be.visible')
        this.modelProdukcjiLista().should('be.visible')
        this.porozumienieTrojstronneTakPrzyciskWyboru().should('be.visible')
        this.porozumienieTrojstronneNiePrzyciskWyboru().should('be.visible')
        this.lokowanieTakPrzyciskWyboru().should('be.visible')
        this.lokowanieNiePrzyciskWyboru().should('be.visible')
        this.pozaSEPPTakPrzyciskWyboru().should('be.visible')
        this.pozaSEPPNiePrzyciskWyboru().should('be.visible')
        this.funduszKinowyTakPrzyciskWyboru().should('be.visible')
        this.funduszKinowyNiePrzyciskWyboru().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.redakcjaZamawiajacaLista().should('be.visible')
        this.rodzajPrzychoduLista().should('be.visible')
        this.rodzajUslugiLista().should('be.visible')
        this.osobaWiodacaLista().should('be.visible')
        this.jednostkaEmitujacaLista().should('be.visible')
        this.redakcjaEmitujacaLista().should('be.visible')
        this.dataPorozumieniaOdData().should('be.visible')
        this.dataPorozumieniaDoData().should('be.visible')
        this.dataZamknieciaOdData().should('be.visible')
        this.dataZamknieciaDoData().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.formaAudycjiLista().should('be.visible')
        this.formaAudycjiSzczegLista().should('be.visible')
        this.antenaLista().should('be.visible')
        this.nrRejestruAntenyPoleTekstowe().should('be.visible')
        this.nrPorozumieniaPowiazanegoPoleTekstowe().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok1(){
        this.uprawnieniaPrzycisk().should('be.visible')
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        this.uprawnieniaPrzycisk().should('be.visible')
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok18(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok26(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok40(){
        this.dodajPorozumieniePrzycisk().should('be.visible')
        this.edycjaPierwszyPrzycisk().should('be.visible')
    }

    dodajPorozumienie(porozumienieDane){
        this.rodzajPorozumieniaLista().select(porozumienieDane.rodzajPorozumienia, {force: true})
        this.agencjaLista().select(porozumienieDane.agencja, {force: true})
        this.jednostkaUslugowaLista().select(porozumienieDane.jednostkaUslugowa, {force: true})
        cy.get('#select2-ProducerId-container').click()
        cy.get('ul[id="select2-ProducerId-results"] > li:contains('+porozumienieDane.producent+')').click()
        this.celKosztorysuLista().select(porozumienieDane.cel, {force: true})
        this.audycjaTVPoleTekstowe().type(porozumienieDane.audycjaTV)
        this.modelProdukcjiDodawanieLista().select(porozumienieDane.modelProdukcji, {force: true})
        this.rodzajPrzychoduLista().select(porozumienieDane.rodzajPrzychodu, {force: true})
        this.nrPoleTekstowe().invoke('val').then(($text)=>{
            cy.wrap($text).as('NrPorozumienia')
            cy.log('numer porozumienia - ' + $text)
        })
    }

    dodajPorozumienieCUP(porozumienieDane){
        this.rodzajPorozumieniaLista().select(porozumienieDane.rodzajPorozumienia, {force: true})
        this.agencjaLista().select(porozumienieDane.agencja, {force: true})
        cy.get('#select2-ProducerId-container').click()
        cy.get('ul[id="select2-ProducerId-results"] > li:contains('+porozumienieDane.producent+')').click()
        this.celKosztorysuLista().select(porozumienieDane.cel, {force: true})
        this.audycjaTVPoleTekstowe().type(porozumienieDane.audycjaTV)
        this.modelProdukcjiDodawanieLista().select(porozumienieDane.modelProdukcji, {force: true})
        this.rodzajPrzychoduLista().select(porozumienieDane.rodzajPrzychodu, {force: true})
        this.rodzajUslugiLista().select(porozumienieDane.rodzajUslugi, {force: true})
        this.nrPoleTekstowe().invoke('val').then(($text)=>{
            cy.wrap($text).as('NrPorozumienia')
            cy.log('numer porozumienia - ' + $text)
        })
    }

}

export const e20 = new E20()