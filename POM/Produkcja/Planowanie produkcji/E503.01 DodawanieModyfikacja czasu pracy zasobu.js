class E50301 {
    // Selektory
    zapiszPrzycisk(){
        return cy.get('button#saveBtn').contains('Zapisz')
    }

    pokazGrafikPrzycisk(){
        return cy.get('button#showScheduleBtn').contains('Pokaż grafik')
    }

    powrotPrzycisk(){
        return cy.get('a.btn.btn-info').contains('Powrót')
    }

    objasnienieKolorowPrzycisk(){
        return cy.get('button.color-legend')
    }

    daneRezerwacjiPrzycisk(){
        return cy.get('a#btnCollapseReservationDetails')
    }

    nazwaZasobuPoleTekstowe(){
        return cy.get('#PriceListPositionName')
    }

    szczegolyPozycjiCennikowejPrzycisk(){
        return cy.get('button.resource-info-legend')
    }

    czasPracyPoleTekstowe(){
        return cy.get('#WorkingTime')
    }

    liczbaOsobSztukPoleTekstowe(){
        return cy.get('[data-val-required*="Liczba os./szt."]')
    }

    uwagiZWnioskuPoleTekstowe(){
        return cy.get('#PlanningModel_Description')
    }

    czasPracyZasobuPrzycisk(){
        return cy.get('a#btnCollapseRequestDetails')
    }

    dataRozpoczeciaPracyPoleTekstowe(){
        return cy.get('input#StartWorkingDate')
    }

    godzinaRozpoczeciaPracyPoleTekstowe(){
        return cy.get('input#StartWorkingTime')
    }

    dataZakonczeniaPracyPoleTekstowe(){
        return cy.get('input#StopWorkingDate')
    }

    godzinaZakonczeniaPracyPoleTekstowe(){
        return cy.get('input#StopWorkingTime')
    }

    nadgodzinyOdDataPoleTekstowe(){
        return cy.get('input#OvertimeDate')
    }

    nadgodzinyOdGodzinaPoleTekstowe(){
        return cy.get('input#OvertimeTime')
    }

    liczbaSztukPoleTekstowe(){
        return cy.get('input#Count')
    }

    obslugiwanyZestawPoleTekstowe(){
        return cy.get('input#EquipmentElementName')
    }

    uwagiDlaPracownikaPoleTekstowe(){
        return cy.get('input#Comments')
    }

    odbiorSprzetuZMagazynuPrzyciskWyboru(){
        return cy.get('input#PickupOfEquipmentFromStorage')
    }

    grupaPracownikowLista(){
        return cy.get('select#GroupId')
    }

    grupaSprzetuLista(){
        return cy.get('select#GroupId')
    }

    pracownikPierwszyPrzyciskWyboru(){
        return cy.get('[class*="edited-checkbox"]').first()
    }

    elementSprzetowyPierwszyPrzyciskWyboru(){
        return cy.get('[class*="edited-checkbox"]').first()
    }

    // Metody
    sprawdzWidokUsluga(){
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.pokazGrafikPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
        this.daneRezerwacjiPrzycisk().should('be.visible')
        this.nazwaZasobuPoleTekstowe().should('be.visible')
        this.szczegolyPozycjiCennikowejPrzycisk().should('be.visible')
        this.czasPracyPoleTekstowe().should('be.visible')
        this.liczbaOsobSztukPoleTekstowe().should('be.visible')
        this.uwagiZWnioskuPoleTekstowe().should('be.visible')
        this.czasPracyZasobuPrzycisk().should('be.visible')
        this.dataRozpoczeciaPracyPoleTekstowe().should('be.visible')
        this.godzinaRozpoczeciaPracyPoleTekstowe().should('be.visible')
        this.dataZakonczeniaPracyPoleTekstowe().should('be.visible')
        this.godzinaZakonczeniaPracyPoleTekstowe().should('be.visible')
        this.nadgodzinyOdDataPoleTekstowe().should('be.visible')
        this.nadgodzinyOdGodzinaPoleTekstowe().should('be.visible')
        this.uwagiDlaPracownikaPoleTekstowe().should('be.visible')
        this.odbiorSprzetuZMagazynuPrzyciskWyboru().should('be.visible')
        this.grupaPracownikowLista().should('be.visible')
        this.pracownikPierwszyPrzyciskWyboru().should('be.visible')
    }

    sprawdzWidokSprzet(){
        this.zapiszPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
        this.daneRezerwacjiPrzycisk().should('be.visible')
        this.nazwaZasobuPoleTekstowe().should('be.visible')
        this.szczegolyPozycjiCennikowejPrzycisk().should('be.visible')
        this.czasPracyPoleTekstowe().should('be.visible')
        this.liczbaOsobSztukPoleTekstowe().should('be.visible')
        this.uwagiZWnioskuPoleTekstowe().should('be.visible')
        this.czasPracyZasobuPrzycisk().should('be.visible')
        this.dataRozpoczeciaPracyPoleTekstowe().should('be.visible')
        this.godzinaRozpoczeciaPracyPoleTekstowe().should('be.visible')
        this.dataZakonczeniaPracyPoleTekstowe().should('be.visible')
        this.godzinaZakonczeniaPracyPoleTekstowe().should('be.visible')
        this.liczbaSztukPoleTekstowe().should('be.visible')
        // this.obslugiwanyZestawPoleTekstowe().should('be.visible') // tylko gdy zasób ma zdefiniowane miejsce realizacji
        this.uwagiDlaPracownikaPoleTekstowe().should('be.visible')
        this.grupaSprzetuLista().should('be.visible')
        this.elementSprzetowyPierwszyPrzyciskWyboru().should('be.visible')
    }

}

export const e50301 = new E50301()