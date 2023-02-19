class E22 {
    zapiszPrzycisk(){
        return cy.get('#btnSubmitAgreement').contains('Zapisz')
    }

    potwierdzZmianeAgencjiPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
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

    potwierdzZglosOprPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    cofnijOprPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Cofnij opr.')
    }

    zarejestrujPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Zarejestruj')
    }

    potwierdzZarejestrujPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    zablokujPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Zablokuj')
    }

    odblokujPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Odblokuj')
    }

    rozliczPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Rozlicz')
    }

    potwierdzRozliczPopupPrzycisk(){
        return cy.get('button#FinishAgreementModal-yesBtn').contains('Potwierdz')
    }

    komentarzRozliczPopupPoleTekstowe(){
        return cy.get('input#userComment')
    }

    tworzAneksPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Twórz aneks')
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

    potwierdzKopiujPopupPrzycisk(){
        return cy.get('button#agencyForCopyAgreementModal-yesBtn').contains('Potwierdź')
    }

    potwierdzKosztorysPopupPrzycisk(){
        return cy.get('button#titleModal-yesBtn').contains('Potwierdź')
    }

    potwierdzUsunKosztorysPopupPrzycisk(){
        return cy.get('button#DeleteTitleModal-yesBtn').contains('Potwierdź')
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

    dataZawPoleTekstowe(){
        return cy.get('#CreateDate')
    }

    woPoleTekstowe(){
        return cy.get('input#DescriptionVersion')
    }

    pozaSEPPPrzyciskWyboru(){
        return cy.get('input#ProcessingOutOffSepp')
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

    jednostkaUslugowaLista(){
        return cy.get('select#CooperatingUnitsId')
    }

    JSULista(){
        return cy.get('select#ServiceUnitProvidersId')
    }

    jednostkaNadzorujacaProdukcjeLista(){
        return cy.get('#SupervisingUnitId')
    }

    rodzajPrzychoduLista(){
        return cy.get('select#IncomeTypeId')
    }

    rodzajUslugiLista(){
        return cy.get('select#ServiceTypeId')
    }

    rodzajPlatnosciLista() {
        return cy.get('#PaymentTypeId')
    }

    sapEmisyjnyPoleTekstowe(){
        return cy.get('input#SapNumber')
    }

    rodzajPorozumieniaLista(){
        return cy.get('select#AgreementType')
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

    wyszukajBriefPrzycisk(){
        return cy.get('button#searchBriefBtn')
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

    kosztorysLista(){
        return cy.get('#select2-CurrentTitleId-container')
    }

    celKosztorysuPopupLista(){
        return cy.get('select#ModalTitleTarget')
    }

    celKosztorysuLista(){
        return cy.get('select[id*="TitleTarget"]')
    }

    liczbaOdcinkowPoleTekstowe(){
        return cy.get('input#CurrentTitle_LiczbaOdcinkow')
    }

    potwierdzLiczbeOdcinkowPopupPrzycisk(){
        return cy.get('button#changeNumberOfEpisodesConfirmModal-yesBtn')
    }

    czasPoleTekstowe(){
        return cy.get('#CurrentTitle_DurationTime')
    }

    akceptacjeKUEtykieta(){
        return cy.get('[data-original-title="Akceptacje - kosztorys usługowy"]')
    }

    formaLista(){
        return cy.get('#CurrentTitle_AuditionTypeId')
    }

    kosztyPlanowanePrzycisk(){
        return cy.get('#ToPlanedCosts')
    }

    dodajKosztorysPowiazanyPrzycisk(){
        return cy.get('button[title="Dodaj kosztorys powiązany"]')
    }

    usunKosztorysPowiazanyPierwszyPrzycisk(){
        return cy.get('button[title="Usuń kosztorys powiązany"]').first()
    }

    takUsunKosztorysPowiazanyPopupPrzycisk(){
        return cy.get('button#removeModal-yesBtn')
    }

    kosztorysPowiazanyPopupLista(){
        return cy.get('select#SelectedTitleId')
    }

    potwierdzKosztorysPowiazanyPopupPrzycisk(){
        return cy.get('button#connectedTitleModal-yesBtn')
    }

    anulujKosztorysPowiazanyPopupPrzycisk(){
        return cy.get('button#connectedTitleModal-noBtn')
    }

    pelnaListaAudycjiPrzycisk(){
        return cy.get('a[title="Pełna lista audycji"]')
    }

    akceptacjeIkonyBlok(){
        return cy.get('label[data-original-title="Akceptacje - kosztorys usługowy"]').parent('div').parent('div').children('div').last()
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

    antenaLista(){
        return cy.get('select#CurrentTitle_AntenaInt')
    }

    nraPoleTekstowe(){
        return cy.get('input#CurrentTitle_Nra')
    }

    fSzczegLista(){
        return cy.get('select#CurrentTitle_AuditionTypeDetailId')
    }

    fOpisPoleTekstowe(){
        return cy.get('input#CurrentTitle_AuditionTypeDescription')
    }

    kontrahentPrzycisk(){
        return cy.get('button[data-forid="CurrentTitle_ExternalSales_IdContractor"]')
    }

    kozPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_GeneralCostManagement')
    }

    kosztyOgolnegoZarzadu1OdcPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_GeneralCostManagementForOneEpisode')
    }

    kosztyOgolnegoZarzaduCalkPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_GeneralCostManagementForAllEpisodes')
    }

    zyskPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_Profit')
    }

    zysk1OdcPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_ProfitForOneEpisode')
    }

    zyskCalkowityPoleTekstowe(){
        return cy.get('input#CurrentTitle_ExternalSales_ProfitForAllEpisodes')
    }

    cenaSprzedazySumarycznaPoleTekstowe(){
        return cy.get('input#CurrentTitle_CenaSprzedazySumaryczna')
    }

    wartoscPrawNabytychPoleTekstowe(){
        return cy.get('input#CurrentTitle_CalkowitaWartoscPrawMajatkowychNabytych')
    }

    przeniesieniePrawMajatkowychLista(){
        return cy.get('select#CurrentTitle_TransferPropertyRights')
    }

    potwierdzPrzeniesieniePrawPopupPrzycisk(){
        return cy.get('a#confirmBtn')
    }

    wartoscMaterialowArchiwalnychPoleTekstowe(){
        return cy.get('input#CurrentTitle_WartoscPrawMaterialowArchiwalnych')
    }

    wynagrodzeniePracowniczePoleTekstowe(){
        return cy.get('input#CurrentTitle_WynagrodzeniePracowniczeRazem')
    }

    wynagrodzenieWspolpracowniczePoleTekstowe(){
        return cy.get('input#CurrentTitle_WynagrodzenieWspolpracowniczeRazem')
    }

    wartFinansZInJednPoleTekstowe(){
        return cy.get('input#CurrentTitle_WartoscFinansowaniaZInnychJednostek')
    }

    dodajWskaznikiPrzycisk(){
        return cy.get('button[title="Dodaj wskaźniki"]')
    }

    edytujWskaznikiPrzycisk(){
        return cy.get('button[title="Edytuj"]')
    }

    pochodneOdWynagrodzenPoleTekstowe(){
        return cy.get('input#CurrentTitle_PochodneOdWynagrodzen')
    }

    kosztyZewnetrznePoleTekstowe(){
        return cy.get('input#CurrentTitle_KosztyZewnetrzne')
    }

    kosztyBezposredniePoleTekstowe(){
        return cy.get('input#CurrentTitle_KosztyBezposrednie')
    }

    kosztyPosredniePoleTekstowe(){
        return cy.get('input#CurrentTitle_KosztyPosrednie')
    }

    kosztyRazemPoleTekstowe(){
        return cy.get('input#CurrentTitle_KosztyRazem')
    }

    kosztCalkNettoPoleTekstowe(){
        return cy.get('input#CurrentTitle_KosztCalkowityNetto')
    }

    vatPoleTekstowe(){
        return cy.get('input#CurrentTitle_VatMoney')
    }

    vatOdPrawPoleTekstowe(){
        return cy.get('input#CurrentTitle_VatOdPraw')
    }

    cenaSprzedazyPoleTekstowe(){
        return cy.get('input#CurrentTitle_CenaSprzedazy')
    }

    dataEmisjiPoleTekstowe(){
        return cy.get('input#CurrentTitle_EmissionDatePlan')
    }

    godzinaEmisjiPoleTekstowe(){
        return cy.get('input#CurrentTitle_EmissionTimePlan')
    }

    poprzedniTerminRozpoczeciaPoleTekstowe(){
        return cy.get('input#CurrentTitle_PreviousStartDate')
    }

    poprzedniTerminOdbioruPoleTekstowe(){
        return cy.get('input#CurrentTitle_PreviousReceiveDate')
    }

    terminRozpoczeciaPoleTekstowe(){
        return cy.get('input[title="Termin rozpoczęcia"]')
    }

    terminOdbioruPoleTekstowe(){
        return cy.get('input#CurrentTitle_ReceiveDate')
    }

    dodajAudycjePrzycisk(){
        return cy.get('button#ToSellEvidence')
    }

    kopiujIdAudycjiPrzycisk(){
        return cy.get('button[title="Kopiuj ID audycji SAP"]')
    }

    kopiujSapProdPrzycisk(){
        return cy.get('button[title="Kopiuj nr SAP prod."]')
    }

    edytujAudycjePierwszyPrzycisk(){
        return cy.get('a[title="Edytuj"]').first()
    }

    usunAudycjePierwszyPrzycisk(){
        return cy.get('button[title="Usuń"]').first()
    }

    potwierdzUsunAudycjePopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    edytujKosztyPlanowanePierwszyPrzycisk(){
        return cy.get('a[title="Edytuj Koszty Planowane"]').first()
    }

    finansowanieLista(){
        return cy.get('select#CurrentTitle_FundingTypeId')
    }

    kosztorysZLokowaniemPrzyciskWyboru(){
        return cy.get('input#CurrentTitle_HasProductPlacement')
    }

    podmiotFinansujacyPoleTekstowe(){
        return cy.get('input#CurrentTitle_FinancingContractorName')
    }

    wyszukajPodmiotFinansujacyPrzycisk(){
        return cy.get('button[data-forid="CurrentTitle_FinancingContractorId"]')
    }

    wspolpracaProdukcyjnaPoleTekstowe(){
        return cy.get('input#CurrentTitle_ParticipantCooperationContractorName')
    }

    wyszukajWspolpraceProdukcyjnaPrzycisk(){
        return cy.get('button[data-forid="CurrentTitle_ParticipantCooperationContractorId"]')
    }

    inneUstaleniaPoleTekstowe(){
        return cy.get('textarea#CurrentTitle_Other')
    }

    uwagiPoleTekstowe(){
        return cy.get('textarea#CurrentTitle_Comments')
    }

    dodajPlikDoRepozytoriumPrzycisk(){
        return cy.get('button[title="Dodaj Plik Do Repozytorium"]')
    }

    dodajLinkDoZalacznikaPrzycisk(){
        return cy.get('button[title="Dodaj Link Do Załącznika"]')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Agreement/Edit')
    }

    sprawdzWidokDodajPorozumienie(){ // dotyczy ekranu dodawania porozumienia
        this.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        this.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        this.numerPorozumieniaPoleTekstowe().should('be.visible').and('have.prop', 'readOnly', true)
        this.numerWewnetrznyPoleTekstowe().should('be.visible')
        this.dataZawPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz jednostkę zamawiającą').and('not.have.attr', 'readonly')
        this.agencjaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz agencję')
        this.redakcjaZamawiajacaLista().should('be.visible').and('not.have.attr', 'readonly')
        this.jednostkaUslugowaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...')
        this.jednostkaNadzorujacaProdukcjeLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz jednostkę nadzorującą produkcję').and('not.have.attr', 'readonly')
        this.rodzajPrzychoduLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz rodzaj przychodu').and('not.have.attr', 'readonly')
        this.rodzajUslugiLista().should('be.visible').and('have.attr', 'disabled')
        this.rodzajPlatnosciLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz rodzaj płatności').and('not.have.attr', 'readonly')
        this.trybProdukcjiLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...')
        this.zgodaSzybkiPrzebiegData().should('be.visible').and('have.attr', 'data-custom-date-format', 'DD.MM.YYYY')
        this.porozumienieTrojstronnePrzyciskWyboru().should('be.visible').and('have.prop', 'disabled', true)
        this.modelProdukcjiLista().should('be.visible')
        this.funduszKinowyPrzyciskWyboru().should('be.visible').and('not.to.be.checked')
        this.wartoscFunduszuKinowegoPoleTekstowe().should('be.visible').and('have.attr', 'value', '0,00')
        this.rodzajPorozumieniaLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
    }

    sprawdzWidok(){
        this.powrotPrzycisk().should('be.visible')
        this.statusPorozumieniaPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
        this.drukujPrzycisk().should('be.visible')
        this.osobyWiodacePrzycisk().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.numerWewnetrznyPoleTekstowe().should('be.visible')
        this.dataZawPoleTekstowe().should('be.visible')
        this.woPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.jednostkaZamawiajacaLista().should('be.visible')
        this.agencjaLista().should('be.visible')
        this.jednostkaUslugowaLista().should('be.visible')
        this.JSULista().should('be.visible')
        this.redakcjaZamawiajacaLista().should('be.visible')
        this.producentLista().should('be.visible')
        this.jednostkaNadzorujacaProdukcjeLista().should('be.visible')
        this.rodzajPrzychoduLista().should('be.visible')
        this.rodzajUslugiLista().should('be.visible')
        this.rodzajPlatnosciLista().should('be.visible')
        this.sapEmisyjnyPoleTekstowe().should('be.visible')
        this.trybProdukcjiLista().should('be.visible')
        this.porozumienieTrojstronnePrzyciskWyboru().should('be.visible')
        this.zgodaSzybkiPrzebiegData().should('be.visible')
        this.funduszKinowyPrzyciskWyboru().should('be.visible')
        this.wartoscFunduszuKinowegoPoleTekstowe().should('be.visible')
        this.modelProdukcjiLista().should('be.visible')
        this.rodzajPorozumieniaLista().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible')        
        this.kosztyPlanowanePrzycisk().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.celKosztorysuLista().should('be.visible')
        this.liczbaOdcinkowPoleTekstowe().should('be.visible')
        this.czasPoleTekstowe().should('be.visible')
        this.akceptacjeKUEtykieta().should('be.visible')
        this.antenaLista().should('be.visible')
        this.nraPoleTekstowe().should('be.visible')
        this.formaLista().should('be.visible')
        this.fSzczegLista().should('be.visible')
        this.fOpisPoleTekstowe().should('be.visible')
        this.cenaSprzedazySumarycznaPoleTekstowe().should('be.visible')
        this.wartoscPrawNabytychPoleTekstowe().should('be.visible')
        this.przeniesieniePrawMajatkowychLista().should('be.visible')
        this.wartoscMaterialowArchiwalnychPoleTekstowe().should('be.visible')
        this.wynagrodzeniePracowniczePoleTekstowe().should('be.visible')
        this.wynagrodzenieWspolpracowniczePoleTekstowe().should('be.visible')
        this.wartFinansZInJednPoleTekstowe().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.pochodneOdWynagrodzenPoleTekstowe().should('be.visible')
        this.kosztyZewnetrznePoleTekstowe().should('be.visible')
        this.kosztyBezposredniePoleTekstowe().should('be.visible')
        this.kosztyPosredniePoleTekstowe().should('be.visible')
        this.kosztyRazemPoleTekstowe().should('be.visible')
        this.kosztCalkNettoPoleTekstowe().should('be.visible')
        this.vatPoleTekstowe().should('be.visible')
        this.vatOdPrawPoleTekstowe().should('be.visible')
        this.cenaSprzedazyPoleTekstowe().should('be.visible')
        this.dataEmisjiPoleTekstowe().should('be.visible')
        this.godzinaEmisjiPoleTekstowe().should('be.visible')
        this.terminRozpoczeciaPoleTekstowe().should('be.visible')
        this.terminOdbioruPoleTekstowe().should('be.visible')
        this.kopiujIdAudycjiPrzycisk().should('be.visible')
        this.kopiujSapProdPrzycisk().should('be.visible')
        this.pelnaListaAudycjiPrzycisk().should('be.visible')
        this.finansowanieLista().should('be.visible')
        this.kosztorysZLokowaniemPrzyciskWyboru().should('be.visible')
        this.podmiotFinansujacyPoleTekstowe().should('be.visible')
        this.wspolpracaProdukcyjnaPoleTekstowe().should('be.visible')
        this.inneUstaleniaPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
    }

    sprawdzWidok1(){
        this.zapiszPrzycisk().should('be.visible')
        this.uprawnieniaPrzycisk().should('be.visible')
        this.zglosOpracowaniePrzycisk().should('be.visible')
        this.zablokujPrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.kopiujPrzycisk().should('be.visible')
        this.wynagrodzeniaPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.pozaSEPPPrzyciskWyboru().should('be.visible')
        this.dodajKosztorysPrzycisk().should('be.visible')
        this.edytujKosztorysPrzycisk().should('be.visible')
        this.usunKosztorysPrzycisk().should('be.visible')
        this.kopiujKosztorysPrzycisk().should('be.visible')
        this.dodajKosztorysPowiazanyPrzycisk().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.edytujWskaznikiPrzycisk().should('be.visible')
        this.dodajAudycjePrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
        this.usunAudycjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.zapiszPrzycisk().should('be.visible')
        this.uprawnieniaPrzycisk().should('be.visible')
        this.zablokujPrzycisk().should('be.visible')
        this.zglosOpracowaniePrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.kopiujPrzycisk().should('be.visible')
        this.wynagrodzeniaPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible')
        this.akceptacjeKUEtykieta().should('be.visible')
        this.dodajKosztorysPrzycisk().should('be.visible')
        this.edytujKosztorysPrzycisk().should('be.visible')
        this.usunKosztorysPrzycisk().should('be.visible')
        this.kopiujKosztorysPrzycisk().should('be.visible')
        this.dodajKosztorysPowiazanyPrzycisk().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.edytujWskaznikiPrzycisk().should('be.visible')
        this.dodajAudycjePrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
        this.usunAudycjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok3(){
        this.zapiszPrzycisk().should('be.visible')
        this.zablokujPrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.kopiujPrzycisk().should('be.visible')
        this.wynagrodzeniaPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible') 
        this.akceptacjeKUEtykieta().should('be.visible')
        this.dodajKosztorysPowiazanyPrzycisk().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.edytujWskaznikiPrzycisk().should('be.visible')
        this.dodajAudycjePrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
        this.usunAudycjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok5(){
        this.zapiszPrzycisk().should('be.visible')
        this.uprawnieniaPrzycisk().should('be.visible')
        this.zablokujPrzycisk().should('be.visible')
        this.zglosOpracowaniePrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.kopiujPrzycisk().should('be.visible')
        this.wynagrodzeniaPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible')
        this.akceptacjeKUEtykieta().should('be.visible')
        this.dodajKosztorysPrzycisk().should('be.visible')
        this.edytujKosztorysPrzycisk().should('be.visible')
        this.usunKosztorysPrzycisk().should('be.visible')
        this.kopiujKosztorysPrzycisk().should('be.visible')
        this.dodajKosztorysPowiazanyPrzycisk().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.edytujWskaznikiPrzycisk().should('be.visible')
        this.dodajAudycjePrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
        this.usunAudycjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok11(){
        this.zapiszPrzycisk().should('be.visible')
        this.uprawnieniaPrzycisk().should('be.visible')
        this.zablokujPrzycisk().should('be.visible')
        this.zglosOpracowaniePrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.kopiujPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible') 
        this.akceptacjeKUEtykieta().should('be.visible')
        this.dodajKosztorysPrzycisk().should('be.visible')
        this.edytujKosztorysPrzycisk().should('be.visible')
        this.usunKosztorysPrzycisk().should('be.visible')
        this.kopiujKosztorysPrzycisk().should('be.visible')
        this.dodajKosztorysPowiazanyPrzycisk().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.edytujWskaznikiPrzycisk().should('be.visible')
        this.dodajAudycjePrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
        this.usunAudycjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepozytoriumPrzycisk().should('be.visible')
        this.dodajLinkDoZalacznikaPrzycisk().should('be.visible')
    }

    sprawdzWidok18(){
        this.uprawnieniaPrzycisk().should('be.visible')
        this.rozliczenieKosztowPrzycisk().should('be.visible')
        this.zamowieniaPrzycisk().should('be.visible')
        this.wyszukajBriefPrzycisk().should('be.visible')
        this.akceptacjeKUEtykieta().should('be.visible')
        this.dodajWskaznikiPrzycisk().should('be.visible')
        this.masowaEwidencjaSprzedazyPrzycisk().should('be.visible')
        this.edytujAudycjePierwszyPrzycisk().should('be.visible')
    }
}

export const e22 = new E22()