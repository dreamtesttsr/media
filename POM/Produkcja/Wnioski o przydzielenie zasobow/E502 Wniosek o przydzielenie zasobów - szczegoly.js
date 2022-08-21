class E502 {
    
    // Selektory
    osobyNaPlaniePrzycisk(){
        return cy.get('#PeopleOnPlanBtn').should('contain', 'Osoby na planie')
    }

    rozliczenieZasobowPrzycisk(){
        return cy.get('#CalculatedCostReportBtn').should('contain', 'Rozliczenie zasobów')
    }

    zapiszPrzycisk(){
        return cy.get('#SaveOrderBtn').contains('Zapisz')
    }

    historiaZmianPrzycisk(){
        return cy.get('button[onclick="showHistory2()"]').should('contain', 'Historia zmian')
    }

    powrotPrzycisk(){
        return cy.get('button.btn.btn-info.return-button').should('contain', 'Powrót')
    }

    nazwaAudycjiTVEtykieta(){
        return cy.get('#AgreementAuditionName')
    }

    nrPorozumieniaEtykieta(){
        return cy.get('#AgreementNumber')
    }

    zamawiajacyZlecajacyEtykieta(){
        return cy.get('#OrderingUnitName')
    }

    opisPoleTekstowe(){
        return cy.get('#Description')
    }

    dodajOsobePrzycisk(){
        return cy.get('#addPeopleToProject')
    }

    rozwinOsobyWiodacePrzycisk(){
        return cy.get('#btnCollapseLeadPerson')
    }

    sekcjaLista(){
        return cy.get('#SectionDefinitionId')
    }

    statusLista(){
        return cy.get('#OrderStatusId')
    }

    realizacjaOdData(){
        return cy.get('#ExecutionDateFrom')
    }

    realizacjaDoData(){
        return cy.get('#ExecutionDateTo')
    }

    miejsceRealizacjiLista(){
        return cy.get('#ExecutionPlaceId')
    }

    ukryjZrealizowanePrzyciskWyboru(){
        return cy.get('#HideExecuted')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    dodajRezerwacjePrzycisk(){
        return cy.get('button[title="Dodaj rezerwację"]')
    }

    masoweDodawanieRezerwacjiPrzycisk(){
        return cy.get('button[title="Masowe dodawanie rezerwacji"]')
    }

    kopiowanieRezerwacjiZInnegoPorozPrzycisk(){
        return cy.get('button[title="Kopiowanie rezerwacji z innego porozumienia"]')
    }

    szczegolyRezerwacjiPierwszyPrzycisk(){
        return cy.get('a[title="Szczegóły rezerwacji"]').contains('R').first().scrollIntoView()
    }

    zasobyPierwszyPrzycisk(){
        return cy.get('a[title="Zasoby"]').contains('Z').first()
    }

    edycjaRezerwacjiPierwszyPrzycisk(){
        return cy.get('a[title="Edycja rezerwacji"]').contains('E').first()
    }

    daneRezerwacjiPierwszyPrzycisk(){
        return cy.get('a[title="Dane rezerwacji"]').contains('P').first()
    }

    kopiujZapotrzebowaniePierwszyPrzycisk(){
        return cy.get('a[title="Kopiuj zapotrzebowanie"]').contains('K').first()
    }

    usunRezerwacjePierwszyPrzycisk(){
        return cy.get('a[title="Usuń rezerwację"]').first()
    }

    powodAnulacjiPopupPoleTekstowe(){
        return cy.get('textarea#CancellationReason')
    }

    usunAnulujPopupPrzycisk(){
        return cy.get('button#ConfirmModalRemoveReservation-yesBtn')
    }

    dodajPlikDoRepoPrzycisk(){
        return cy.get('#btnSelectAttachmentLocal')
    }

    dodajLinkDoZalPrzycisk(){
        return cy.get('#btnSelectAttachmentScanFile')
    }


    // Selektory Osoby na planie PopUp
    tytulOsobyNaPlanie(){
        return cy.get('#PersonOnPlanModal-modalDialog').contains('Osoby na planie')
    }

    zamknijOsobyNaPlanie(){
        return cy.get('#PersonOnPlanModal-close')
    }

    osobyMiejsceRealizacjiLista(){
        return cy.get('#select2-RealizationPlaceId-container')
    }
    
    osobyDzienZdjeciowy(){ 
        return cy.get('#personData > div:nth-child(2) > div:nth-child(4) > div > span.select2.select2-container.select2-container--bootstrap > span.selection > span > ul')
    } /* brak sensownego selectora lub nazwy klasy*/

    osobyImieNazwiskoPoleTekstowe(){
        return cy.get('#Name')
    }

    osobyStanowiskoFunkcjaPoleTekstowe(){
        return cy.get('#Comment')
    }

    osobyDodajOsobePrzycisk(){
        return cy.get('#newPersonBtn')
    }

    osobyZapiszPrzycisk(){
        return cy.get('#savePersonBtn')
    }

    osobyZamknijPrzycisk(){
        return cy.get('#closeBtn')
    }

    anulowanaKolumna(){
        return cy.get('th[title="Anulowana?"]').first()
    }

    historiaTytul(){
        return cy.get('#historyModal-modalDialog').contains('Historia zmian obiektu')
    }

    historiaZamknij(){
        return cy.get('#historyModal-close')
    }

    historiaTypObiektu(){
        return cy.get('#ObjectType')
    }

    historiaIdentyfikatorObiektu(){
        return cy.get('#ObjectId')
    }

    // Metody
    sprawdzWidok(){
        this.powrotPrzycisk().should('be.visible')
        this.nazwaAudycjiTVEtykieta().should('be.visible')
        this.nrPorozumieniaEtykieta().should('be.visible')
        this.zamawiajacyZlecajacyEtykieta().should('be.visible')
        this.opisPoleTekstowe().should('be.visible')
        this.rozwinOsobyWiodacePrzycisk().should('be.visible')
        this.sekcjaLista().should('be.visible')
        this.statusLista().should('be.visible')
        this.realizacjaOdData().should('be.visible')
        this.realizacjaDoData().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.ukryjZrealizowanePrzyciskWyboru().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad2(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
        this.osobyNaPlaniePrzycisk().should('be.visible')
        this.rozliczenieZasobowPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad11(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
        this.osobyNaPlaniePrzycisk().should('be.visible')
        this.rozliczenieZasobowPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad12(){
        this.ukryjZrealizowanePrzyciskWyboru().should('be.visible').click()
        this.wyszukajPrzycisk().should('be.visible').click()
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad13(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad16(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad17(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidokPodglad18(){
        this.daneRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.historiaZmianPrzycisk().should('be.visible')
        this.rozliczenieZasobowPrzycisk().should('be.visible')
    }

    sprawdzWidokEdycja2(){
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.dodajRezerwacjePrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible')
        // this.usunRezerwacjePierwszyPrzycisk().should('be.visible') // wymaga konkretnego typu danych
        this.dodajPlikDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidokEdycja11(){
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.dodajRezerwacjePrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible')
        // this.usunRezerwacjePierwszyPrzycisk().should('be.visible') // wymaga konkretnego typu danych
        this.dodajPlikDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidokEdycja12(){
        this.ukryjZrealizowanePrzyciskWyboru().should('be.visible').click()
        this.wyszukajPrzycisk().should('be.visible').click()
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.usunRezerwacjePierwszyPrzycisk().should('be.visible')
        this.dodajPlikDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidokEdycja13(){
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.usunRezerwacjePierwszyPrzycisk().should('be.visible') // wymaga konkretnego typu danych
        this.dodajPlikDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidokEdycja18(){
        this.zapiszPrzycisk().should('be.visible')
        this.dodajOsobePrzycisk().should('be.visible')
        this.dodajRezerwacjePrzycisk().should('be.visible')
        this.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible')
        this.zasobyPierwszyPrzycisk().should('be.visible')
        this.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible')
        // this.usunRezerwacjePierwszyPrzycisk().should('be.visible') // wymaga konkretnego typu danych
        this.dodajPlikDoRepoPrzycisk().should('be.visible')
        this.dodajLinkDoZalPrzycisk().should('be.visible')
    }

    sprawdzWidokOsobyNaPlanie(){
        this.osobyNaPlaniePrzycisk().click()
        this.tytulOsobyNaPlanie().should('be.visible')
        this.zamknijOsobyNaPlanie().should('be.visible')
        this.osobyMiejsceRealizacjiLista().should('be.visible')
        this.osobyImieNazwiskoPoleTekstowe().should('be.visible')
        this.osobyStanowiskoFunkcjaPoleTekstowe().should('be.visible')
        this.osobyDodajOsobePrzycisk().should('be.visible')
        this.osobyZapiszPrzycisk().should('be.visible')
        this.osobyZamknijPrzycisk().should('be.visible')
    }

    sprawdzWidokHistoriaZmian(){
        this.historiaZmianPrzycisk().click()
        this.historiaTytul().should('be.visible')
        this.historiaZamknij().should('be.visible')
        this.historiaTypObiektu().should('be.visible')
        this.historiaIdentyfikatorObiektu().should('be.visible')
    }

}

export const e502 = new E502()