class E503 {
    
    // Selektory
    przedzialCzasuPrzycisk(){
        return cy.get('button.lbl-select-picker')
    }

    wybierzMiesiacPopupPrzycisk(){
        return cy.get('[title="Select Month"]')
    }

    wybierzRokPopupPrzycisk(){
        return cy.get('[title="Select Year"]')
    }

    wyszukajDatePopupPrzycisk(){
        return cy.get('[onclick="fnDateTimeFilterChange();"]')
    }

    zwinRozwinFiltryPrzycisk(){
        return cy.get('#btnCollapsedFilter')        
    }

    wyszukajPrzycisk(){
        return cy.get('#productionPlanningFilterSubmit')        
    }

    progressBarLoader(){
        return cy.get('div.progress-bar-striped', {timeout: 20000})
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    zaladujFiltrPrzycisk(){
        return cy.get('button[title="Załaduj filtr"]')
    }

    zapiszFiltrPrzycisk(){
        return cy.get('button[title="Zapisz filtr"]')
    }

    objasnienieKolorowPrzycisk(){
        return cy.get('button.color-legend')
    }

    poprzedniDzienPrzycisk(){
        return cy.get('i[title="Poprzedni dzień"]')
    }

    nastepnyDzienPrzycisk(){
        return cy.get('i[title="Następny dzień"]')
    }

    zwinWszystkoPrzycisk(){
        return cy.get('button[title="Zwiń wszystko"]')
    }

    miejsceProdukcjiPrzyciskWyboru(){
        return cy.get('#IfProductionPlace')
    }

    miejsceProdukcjiPoleTekstowe(){
        return cy.get('#ProductionPlaceName')
    }

    tytulAudycjiTVPrzyciskWyboru(){
        return cy.get('#IfAudition')
    }

    tytulAudycjiTVLista(){
        return cy.get('#ProductionTv')
    }

    tytulAudycjiTVPoleTestowe(){
        return cy.get('#planningFilterPartial > fieldset > div:nth-child(2) > div:nth-child(1) > div > div.col-lg-11.bold-place-holder > span > span.selection > span > ul > li > input')
    }

    grupaMiejscLista(){
        return cy.get('#RealizationPlaceGroup')
    }

    opisWnioskuPoleTekstowe(){
        return cy.get('#Description')
    }

    wydzialLista(){
        return cy.get('#Departamant')
    }

    stanRezerwacjiLista(){
        return cy.get('#Status')
    }

    uslugiPrzyciskWyboru(){
        return cy.get('#IfService')
    }

    uslugiLista(){
        return cy.get('#ServiceId')
    }

    sprzetPrzyciskWyboru(){
        return cy.get('#IsEquipment')
    }

    sprzetLista(){
        return cy.get('#EquipmentId')
    }

    bezZlecenPracyPrzyciskWyboru(){
        return cy.get('#WithoutWorkOrder')
    }

    bezElementowSprzetowychPrzyciskWyboru(){
        return cy.get('#WithoutEquipmentRequest')
    }

    pracownicyPrzyciskWyboru(){
        return cy.get('#IfWorker')
    }

    pracownicyLista(){
        return cy.get('#WorkerId')
    }

    elementySprzetowePrzyciskWyboru(){
        return cy.get('#IsEquipmentElement')
    }

    elementySprzetoweLista(){
        return cy.get('#EquipmentElementId')
    }

    ukryjZdjetePrzyciskWyboru(){
        return cy.get('#NotShowTakenOff')
    }

    pokazZasobyZewnetrznePrzyciskWyboru(){
        return cy.get('#IsExternalOrder')
    }

    pokazNiewykorzystaneStudiaWozyPrzyciskWyboru(){
        return cy.get('#ShowUnused')
    }

    pokazZleceniaAnulowanePrzyciskWyboru(){
        return cy.get('#ShowRejected')
    }

    tylkoZleceniaPotwierdzonePrzyciskWyboru(){
        return cy.get('#OnlyAccepted')
    }

    szczegolyRezerwacji(){
        return cy.get('a[title="Podgląd"]').contains('Szczegóły rezerwacji')
    }

    modyfikujWniosekPrzycisk(){
        return cy.get('a[title="Modyfikuj wniosek"]')
    }

    modyfikujPrzypisanieZasobuPrzycisk(){
        return cy.get('a[title="Podgląd"]').contains('Modyfikuj przypisanie zasobu')
    }

    dodajPracownikaPrzycisk(){
        return cy.get('a[title="Dodaj"]').contains('Dodaj pracownika')
    }

    dodajElementSprzetowyPrzycisk(){
        return cy.get('a[title="Dodaj"]').contains('Dodaj element sprzętowy')
    }

    zmienMiejsceRealizacjiPrzycisk(){
        return cy.get('i.fas.fa-sync-alt.w3-text-blue').contains('Zmień miejsce realizacji')
    }

    akceptujZleceniePracyPrzycisk(){
        return cy.get('button#acceptButton')
    }

    odrzucZleceniePracyPrzycisk(){
        return cy.get('button#rejectButton2')
    }

    kopiujPrzypisaneZasobyPrzycisk(){
        return cy.get('button#copyButton')
    }

    // Metody
    sprawdzWidok(){
        this.przedzialCzasuPrzycisk().should('be.visible')
        this.zwinRozwinFiltryPrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.zapiszFiltrPrzycisk().should('be.visible')
        this.zaladujFiltrPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
        this.zwinWszystkoPrzycisk().should('be.visible')
        this.nastepnyDzienPrzycisk().should('be.visible')
        this.poprzedniDzienPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zwinRozwinFiltryPrzycisk().click()
        this.miejsceProdukcjiPrzyciskWyboru().should('be.visible')
        this.miejsceProdukcjiPoleTekstowe().should('be.visible')
        this.tytulAudycjiTVPrzyciskWyboru().should('be.visible')
        this.tytulAudycjiTVLista().should('be.visible')
        this.grupaMiejscLista().should('be.visible')
        this.opisWnioskuPoleTekstowe().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.stanRezerwacjiLista().should('be.visible')
        this.uslugiPrzyciskWyboru().should('be.visible')
        this.uslugiLista().should('be.visible')
        this.sprzetPrzyciskWyboru().should('be.visible')
        this.sprzetLista().should('be.visible')
        this.bezZlecenPracyPrzyciskWyboru().should('be.visible')
        this.bezElementowSprzetowychPrzyciskWyboru().should('be.visible')
        this.pracownicyPrzyciskWyboru().should('be.visible')
        this.pracownicyLista().should('be.visible')
        this.elementySprzetowePrzyciskWyboru().should('be.visible')
        this.elementySprzetoweLista().should('be.visible')
        this.ukryjZdjetePrzyciskWyboru().should('be.visible')
        this.pokazZasobyZewnetrznePrzyciskWyboru().should('be.visible')
        this.pokazNiewykorzystaneStudiaWozyPrzyciskWyboru().should('be.visible')
        this.pokazZleceniaAnulowanePrzyciskWyboru().should('be.visible')
        this.tylkoZleceniaPotwierdzonePrzyciskWyboru().should('be.visible')
    }

    sprawdzProgressBar(){
        this.progressBarLoader().then($loader =>{
            if ($loader.is(':visible')){
                this.progressBarLoader().should('not.be.visible')
            }
        })
    }   
            
}

export const e503 = new E503()