class E23{
    // selektory
    nrPorozumieniaPoleTekstowe(){
        return cy.get('input#AgreementNumber')
    }

    audycjaTVPoleTekstowe(){
        return cy.get('input#AuditionName')
    }

    kosztorysLista(){
        return cy.get('select#titleIdCombo')
    }

    celKosztorysuPoleTekstowe(){
        return cy.get('input#TitleTarget')
    }
    
    drukujPrzycisk(){
        return cy.get('a#reportDropdownMenuLink').contains('Drukuj')
    }

    historiaZmianPrzycisk(){
        return cy.get('[onclick="showHistory()"]').contains('Historia zmian')
    }

    historiaPozycjiPrzycisk(){
        return cy.get('[onclick="showCostHistory()"]').contains('Historia pozycji')
    }

    uwagiKomentarzeEtykieta(){
        return cy.contains('Uwagi / Komentarze')
    }

    dodajUwagePrzycisk(){
        return cy.get('button[onclick="showCommentModal()"]')
    }

    pozycjaPraceRezyserskoMontazoweFormularz(nazwaPozycji){
        return cy.get('div#costTable_102').contains(nazwaPozycji).parent('div').parent('div').parent('div').parent('div').parent('form')
    }

    pozycjaKosztyTechniczneUrzadzenWlasnychFormularz(nazwaPozycji){
        return cy.get('div#costTable_119').contains(nazwaPozycji).parent('div').parent('div').parent('div').parent('div').parent('form')
    }

    jednostkaTVPSALista(){
        return cy.get('select[title="Jednostka TVP S.A."]')
    }

    rodzajZatrudnieniaLista(){
        return cy.get('select[title="Rodzaj zatrudnienia"]')
    }

    jednostkaObliczeniowaLista(){
        return cy.get('select[title="Jednostka obliczeniowa"]')
    }

    liczbaJednObliczPoleTekstowe(){
        return cy.get('input.cost-calcfield').eq(0)
    }

    liczbaOsobSztukPoleTekstowe(){
        return cy.get('input.cost-calcfield').eq(1)
    }

    vatLista(){
        return cy.get('select.vatValue')
    }

    stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe(){
        return cy.get('input.discountCostChange')
    }

    stawkaZaJednostkeObliczenowaPoRabaciePoleTekstowe(){
        return cy.get('input.cost-calcfield.currency')
    }

    czySzacowanieZaOdcPrzyciskWyboru(){
        return cy.get('input.cost-calcfield.checkbox-form-control-bs4')
    }

    sumaKosztu1OdcPoleTekstowe(){
        return cy.get('input.sumValidate.selectedCost')
    }

    sumaKosztuWszystkichOdcPoleTekstowe(){
        return cy.get('input.sumValidate').eq(1)
    }

    pozycjaWCennikuJULista(){
        return cy.get('select.costServiceUnit')
    }

    rabatPoleTekstowe(){
        return cy.get('input.discountSizeChange')
    }

    edycjaKosztowEtykieta(){
        return cy.get('ol>.breadcrumb-item.active')
    }

    rozszerzenieNazwyPoleTekstowe(){
        return cy.get('input:not([readonly])[title="Rozszerzenie nazwy usługi/produktu"]')
    }

    uwagiIKomentarzePoleTekstowe(){
        return cy.get('input:not([readonly])[title="Uwagi i komentarze"]')
    }

    rodzajKosztuPoz1Przycisk(nazwaRodzajuKosztuPoz1){
        return cy.get('.list-group-item').contains(nazwaRodzajuKosztuPoz1)
    }

    rodzajKosztuPrzycisk(nazwaRodzajuKosztu){
        return cy.contains(nazwaRodzajuKosztu)
    }

    edytujKosztPrzycisk(nazwaPozycjiKosztowej){
        return cy.get('.form-slim.dataDiv').contains(nazwaPozycjiKosztowej).parent('div').parent('div').parent('div').find('button[title="Edytuj koszt"]')
    }

    wyczyscKosztPrzycisk(nazwaPozycjiKosztowej){
        return cy.get('.form-slim.dataDiv').contains(nazwaPozycjiKosztowej).parent('div').parent('div').parent('div').find('button[title="Wyczyść koszt"]')
    }

    usunKosztPrzycisk(nazwaPozycjiKosztowej){
        return cy.get('.form-slim.dataDiv').contains(nazwaPozycjiKosztowej).parent('div').parent('div').parent('div').find('button[title="Usuń koszt"]')
    }

    zatwierdzKosztPrzycisk(){
        return cy.get('button[title="Zatwierdź koszt"]')
    }

    anulujZmianePrzycisk(){
        return cy.get('button[title="Anuluj zmianę"]')
    }

    dodajUslugeProduktPrzycisk(){
        return cy.get('button[title="Dodanie wiersza do tabeli kosztów"]')
    }

    uslugaProduktLista(){
        return cy.get('select[title="Usługa/Produkt"]')
    }

    producentKierownikProdukcjiEtykieta(){
        return cy.get('b:contains("Producent / Kierownik produkcji")').first().parent().parent()
    }

    koordynatorUslugEtykieta(){
        return cy.get('b:contains("Koordynator usług (Producent)")').first().parent().parent()
    }
    
    przekazProducentKierownikProdukcjiPrzycisk(){
        return cy.get('b:contains("Producent / Kierownik produkcji")').first().parent('div').parent('div').find('button:contains("Przekaż")')
    }

    przekazKoordynatorUslugPrzycisk(){
        return cy.get('b:contains("Koordynator usług (Producent)")').first().parent('div').parent('div').find('button:contains("Przekaż")')
    }

    producentKierownikProdukcjiDrugaAkceptacjaEtykieta(){
        return cy.get('b:contains("Producent / Kierownik produkcji")').last().parent().parent()
    }

    przekazProducentKierownikProdukcjiDrugaAkceptacjaPrzycisk(){
        return cy.get('b:contains("Producent / Kierownik produkcji")').last().parent('div').parent('div').find('button:contains("Zatwierdź")')
    }

    kierownicyKomorekWyspecjalizowanychEtykieta(){
        return cy.contains('Kierownicy komórek wyspecjalizowanych').parent('div').parent('div')
    }

    akceptantKompletnosciKUEtykieta(){
        return cy.contains('Akceptant kompletności KU').parent('div').parent('div')
    }

    zatwierdzAkceptantKompletnosciKUPrzycisk(){
        return this.akceptantKompletnosciKUEtykieta().contains('Zatwierdź')
    }

    odrzucAkceptantKompletnosciKUPrzycisk(){
        return cy.get('button.btn-danger').contains('Odrzuć')
    }

    dyrekcjaJUEtykieta(){
        return cy.get('b:contains("Dyrekcja JU")').parent('div').parent('div')
    }

    akceptujDyrekcjaJUPrzycisk(){
        return this.dyrekcjaJUEtykieta().find('button:contains("Akceptuj")')
    }

    przekazKosztorysPrzycisk(){
        return cy.get('button[id*="transferModal"]').contains('Przekaż kosztorys')
    }

    zatwierdzKierownicyKomorekWyspecjalizowanychPrzycisk(){
        return this.kierownicyKomorekWyspecjalizowanychEtykieta().find('button')
    }

    popupZatwierdzPrzycisk(){
        return cy.get('button#approveModal-yesBtn').contains('Zatwierdź')
    }

    popupAkceptujPrzycisk(){
        return cy.get('button[data-root-id="acceptModal"]').contains('Akceptuj')
    }

    odrzucDyrekcjaJUPrzycisk(){
        return cy.get('button.btn-danger').contains('Odrzuć')
    }

    powrotPrzycisk(){
        return cy.get('button.btn-info').contains('Powrót').first()
    }

    zapiszPopupPrzycisk(){
        return cy.get('button#CostConfirmSaveBtn').contains('Zapisz')
    }

    nieZapisujPopupPrzycisk(){
        return cy.get('button.return-button').contains('Nie zapisuj')
    }

    pokazPozycjeRadio(){
        return cy.get('label.btn-primary')
    }



    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/Agreement/EditCosts')
    }

    sprawdzWidok(){
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.audycjaTVPoleTekstowe().should('be.visible')
        this.kosztorysLista().should('be.visible')
        this.celKosztorysuPoleTekstowe().should('be.visible')
        this.drukujPrzycisk().should('be.visible')
        this.historiaPozycjiPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.pokazPozycjeRadio().should('be.visible')
    }

    sprawdzWidok40(){
        this.kierownicyKomorekWyspecjalizowanychEtykieta().should('be.visible')
        this.akceptantKompletnosciKUEtykieta().should('be.visible')
        this.dyrekcjaJUEtykieta().should('be.visible')
        this.dodajUwagePrzycisk().should('be.visible')
    }

    sprawdzWidokKoszt(){
        this.jednostkaTVPSALista().should('be.visible')
        this.rodzajZatrudnieniaLista().should('be.visible')
        this.jednostkaObliczeniowaLista().should('be.visible')
        this.liczbaJednObliczPoleTekstowe().should('be.visible')
        this.liczbaOsobSztukPoleTekstowe().should('be.visible')
        this.vatLista().should('be.visible')
        this.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('be.visible')
        this.rabatPoleTekstowe().should('be.visible')
        this.stawkaZaJednostkeObliczenowaPoRabaciePoleTekstowe().should('be.visible')
        this.czySzacowanieZaOdcPrzyciskWyboru().should('be.visible')
        this.rozszerzenieNazwyPoleTekstowe().should('be.visible')
        this.uwagiIKomentarzePoleTekstowe().should('be.visible')
        // this.pozycjaWCennikuJULista().should('be.visible')
        this.sumaKosztu1OdcPoleTekstowe().should('be.visible')
        this.sumaKosztuWszystkichOdcPoleTekstowe().should('be.visible')
        this.zatwierdzKosztPrzycisk().should('be.visible')
        this.anulujZmianePrzycisk().should('be.visible')
        cy.get('[id*="ServiceUnitPricePositionName"][readonly]').should('be.visible')
    }

    // wypełenie znalezionej pozycji wartościami
    wypelnijPozycjeWartosciami(pozycjaEdycji){
        cy.wait(2000)

        cy.get('body').then(() => {
            if (pozycjaEdycji.nazwa == 'Montażysta') {
                this.jednostkaTVPSALista().select(pozycjaEdycji.JednostkaTVPSA, {force: true})
                this.rodzajZatrudnieniaLista().select(pozycjaEdycji.RodzajZatrudnienia, {force: true})
                this.jednostkaObliczeniowaLista().select(pozycjaEdycji.JednostkaObliczeniowa, {force: true})
                this.liczbaJednObliczPoleTekstowe().clear().type(pozycjaEdycji.LiczbaJednOblicz)
            // this.stawkaZaJednostkeObliczenowaPoleTekstowe().clear().type(pozycjaEdycji.StawkaZaJednOblicz)
            } 
            if (pozycjaEdycji.nazwa == 'KABINA LEKTORSKA') {
                this.jednostkaTVPSALista().select(pozycjaEdycji.JednostkaTVPSA, {force: true})
                this.liczbaJednObliczPoleTekstowe().clear().type(pozycjaEdycji.LiczbaJednOblicz)
            // this.vatLista().select(pozycjaEdycji.Vat, {force: true})
            // this.stawkaZaJednostkeObliczenowaPoleTekstowe().clear().type(pozycjaEdycji.StawkaZaJednOblicz)
            }
        })
    }
}

export const e23 = new E23()