class E200{
    dodajAudycjePrzycisk(){
        return cy.get('button[title="Dodaj audycję"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNumber"]')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('input[id="TvAudition"]')
    }

    sapIdAudycjiMPKPoleTekstowe(){
        return cy.get('input[id="ProductionSapNumber"]')
    }

    odcOdPoleTekstowe(){
        return cy.get('input[id="EpisoderNumberFrom"]')
    }

    odcDoPoleTekstowe(){
        return cy.get('input[id="EpisoderNumberTo"]')
    }
    
    producentLista(){
        return cy.get('select[id="ProducerId"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    agencjaLista(){
        return cy.get('#AgencyId')
    }

    jednZamawiajacaLista(){
        return cy.get('#OrderingUnitId')
    }

    rodzajPrzychoduLista(){
        return cy.get('select#IncomeType')
    }

    rodzajUslugiLista(){
        return cy.get('select#ServiceType')
    }

    rodzajPlatnosciLista(){
        return cy.get('#PaymentsType')
    }

    nazwaKosztorysuPoleTekstowe(){
        return cy.get('#CostEstimate')
    }

    formaAudycjiLista(){
        return cy.get('#AuditionFormId')
    }

    szczFormaAudycjiLista(){
        return cy.get('#DetailedAuditionFormId')
    }

    antenaLista(){
        return cy.get('#AerialId')
    }

    nrRejAntenyPoleTekstowe(){
        return cy.get('#AerialRegisterNumber')
    }

    zrodloFinansLista(){
        return cy.get('#FinancialSourceId')
    }

    nrKontraktuPoleTekstowe(){
        return cy.get('#ContractNumber')
    }

    dataZamowieniaOdData(){
        return cy.get('#OrderDateFrom')
    }

    dataZamowieniaDoData(){
        return cy.get('#OrderDateTo')
    }

    cenaSprzedazyOdcOdPoleTekstowe(){
        return cy.get('#SellPriceFrom')
    }

    cenaSprzedazyOdcDoPoleTekstowe(){
        return cy.get('#SellPriceTo')
    }

    sprzedanaPrzyciskWyboru(){
        return cy.get('#IsSold')
    }
    
    niesprzedanaPrzyciskWyboru(){
        return cy.get('#IsNotSold')
    }

    nrFakturyPoleTekstowe(){
        return cy.get('#InvoiceNumber')
    }

    dataFakturyOdData(){
        return cy.get('#InvoiceDateFrom')
    }

    dataFakturyDoData(){
        return cy.get('#InvoiceDateTo')
    }

    nrProtOdbPoleTekstowe(){
        return cy.get('#GetProtocolNumber')
    }

    dataEmisjiOdData(){
        return cy.get('#EmissionDateFrom')
    }

    dataEmisjiDoData(){
        return cy.get('#EmissionDateTo')
    }

    rokTerminRealizacjiPoleTekstowe(){
        return cy.get('#PlanedRealizationdateYear')
    }

    miesiacTerminRealizacjiLista(){
        return cy.get('select[data-title="Planowany Termin Realizacji - Miesiąc"]')
    }

    miesiacNieZostalPodanyPrzyciskWYboru(){
        return cy.get('#WithoutPlanedRealizationdateMonth')
    }

    dzienTerminRealizacjiPoleTekstowe(){
        return cy.get('#PlanedRealizationdateDay')
    }

    jednostkaZamawiajacaNaZleceniuLista(){
        return cy.get('#OrderingAuditionUnitId')
    }

    opisOdcinkaPoleTekstowe(){
        return cy.get('#EpisodeDescription')
    }

    nrKontraktuJWPoleTekstowe(){
        return cy.get('#CooperationContractNumber')
    }

    cenaSprzedazyOdJWPoleTekstowe(){
        return cy.get('#CooperationSellPriceFrom')
    }

    cenaSprzedazyDoJWPoleTekstowe(){
        return cy.get('#CooperationSellPriceTo')
    }

    sprzedanaJWPrzyciskWyboru(){
        return cy.get('#CooperationIsSold')
    }

    niesprzedanaJWPrzyciskWyboru(){
        return cy.get('#CooperationIsNotSold')
    }

    nrFakturyJWPoleTekstowe(){
        return cy.get('#CooperationInvoiceNumber')
    }

    dataFakturyOdJWData(){
        return cy.get('#CooperationInvoiceDateFrom')
    }

    dataFakturyDoJWData(){
        return cy.get('#CooperationInvoiceDateTo')
    }

    nrProtOdbJWPoleTekstowe(){
        return cy.get('#CooperationGetProtocolNumber')
    }

    rokTerminRealizacjiJWPoleTekstowe(){
        return cy.get('#CoperationUnitPlanedRealizationdateYear')
    }

    miesiacTerminRealizacjiJWLista(){
        return cy.get('select[data-title="Planowany termin realizacji (JW) - miesiąc"]')
    }

    miesiacNieZostalPodanyJWPrzyciskWYboru(){
        return cy.get('#WithoutCoperationUnitPlanedRealizationdateMonth')
    }

    dzienTerminRealizacjiJWPoleTekstowe(){
        return cy.get('#CoperationUnitPlanedRealizationdateDay')
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

    drukujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Drukuj widoczne kolumny"]')
    }

    zaznaczWszystkieAudycjePrzyciskWyboru(){
        return cy.get('th>input.selectAllCheckboxes')
    }
    
    // Lista audycji na stronie wyszukiwarki
    audycjaTabela(){
        return cy.get('table[id="auditionTable_table"]')
    }

    edycjaAudycjiPierwszyPrzycisk(){
        return cy.get('a[title="Edycja audycji"]').contains('E').first().scrollIntoView()
    }

    usuniecieAudycjiPierwszyPrzycisk(){
        return cy.get('a[title="Usunięcie audycji"]').first().scrollIntoView()
    }

    podgladPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Podgląd porozumienia"]').contains('P').first().scrollIntoView()
    }

    edycjaPorozumieniaPierwszyPrzycisk(){
        return cy.get('a[title="Edycja porozumienia"]').contains('EP').first().scrollIntoView()
    }

    masowaEwidencjaSprzedazyPrzycisk(){
        return cy.get('button[title="Masowa ewidencja sprzedaży"]')
    }

    przeliczSumySprzedazyPrzyciskWyboru(){
        return cy.get('input#CountSumSwitch')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Audition/Index')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Audycje')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.sapIdAudycjiMPKPoleTekstowe().should('be.visible')
        this.odcOdPoleTekstowe().should('be.visible')
        this.odcDoPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.drukujWidoczneKolumnyPrzycisk().should('be.visible')
        this.podgladPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.agencjaLista().should('be.visible')
        this.jednZamawiajacaLista().should('be.visible')
        this.rodzajPrzychoduLista().should('be.visible')
        this.rodzajUslugiLista().should('be.visible')
        this.rodzajPlatnosciLista().should('be.visible')
        this.nazwaKosztorysuPoleTekstowe().should('be.visible')
        this.formaAudycjiLista().should('be.visible')
        this.szczFormaAudycjiLista().should('be.visible')
        this.antenaLista().should('be.visible')
        this.nrRejAntenyPoleTekstowe().should('be.visible')
        this.zrodloFinansLista().should('be.visible')
        this.nrKontraktuPoleTekstowe().should('be.visible')
        this.dataZamowieniaOdData().should('be.visible')
        this.dataZamowieniaDoData().should('be.visible')
        this.cenaSprzedazyOdcOdPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdcDoPoleTekstowe().should('be.visible')
        this.sprzedanaPrzyciskWyboru().should('be.visible')
        this.niesprzedanaPrzyciskWyboru().should('be.visible')
        this.nrFakturyPoleTekstowe().should('be.visible')
        this.dataFakturyOdData().should('be.visible')
        this.dataFakturyDoData().should('be.visible')
        this.nrProtOdbPoleTekstowe().should('be.visible')
        this.dataEmisjiOdData().should('be.visible')
        this.dataEmisjiDoData().should('be.visible')
        this.rokTerminRealizacjiPoleTekstowe().should('be.visible')
        this.miesiacTerminRealizacjiLista().should('be.visible')
        this.miesiacNieZostalPodanyPrzyciskWYboru().should('be.visible')
        this.dzienTerminRealizacjiPoleTekstowe().should('be.visible')
        this.jednostkaZamawiajacaNaZleceniuLista().should('be.visible')
        this.opisOdcinkaPoleTekstowe().should('be.visible')
        this.nrKontraktuJWPoleTekstowe().should('be.visible')
        this.cenaSprzedazyOdJWPoleTekstowe().should('be.visible')
        this.cenaSprzedazyDoJWPoleTekstowe().should('be.visible')
        this.sprzedanaJWPrzyciskWyboru().should('be.visible')
        this.niesprzedanaJWPrzyciskWyboru().should('be.visible')
        this.nrFakturyJWPoleTekstowe().should('be.visible')
        this.dataFakturyOdJWData().should('be.visible')
        this.dataFakturyDoJWData().should('be.visible')
        this.nrProtOdbJWPoleTekstowe().should('be.visible')
        this.rokTerminRealizacjiJWPoleTekstowe().should('be.visible')
        this.miesiacTerminRealizacjiJWLista().should('be.visible')
        this.miesiacNieZostalPodanyJWPrzyciskWYboru().should('be.visible')
        this.dzienTerminRealizacjiJWPoleTekstowe().should('be.visible')
    }

    sprawdzWidok1(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok10(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok18(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok26(){
        this.dodajAudycjePrzycisk().should('be.visible')
        this.edycjaAudycjiPierwszyPrzycisk().should('be.visible')
        this.usuniecieAudycjiPierwszyPrzycisk().should('be.visible')
        this.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible')
    }

}

export const e200 = new E200()