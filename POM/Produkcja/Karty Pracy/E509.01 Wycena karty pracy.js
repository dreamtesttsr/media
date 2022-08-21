class E50901{

    // Selektory
    identyfikatorPoleTekstowe(){
        return cy.get('input[id="Id"]')
    }
    rodzajPoleTekstowe(){
        return cy.get('input[id="WorkCardTypeString"]')
    }
    wydzialLista(){
        return cy.get('select[id="WorkCardDepartmentsId"]')
    }
    statusKartyPoleTekstowe(){
        return cy.get('input[id="WorkCardStatus"]')
    }
    zaOkresOdPoleTekstowe(){
        return cy.get('input[id="DateFrom"]')
    }
    zaOkresDoPoleTekstowe(){
        return cy.get('input[id="DateTo"]')
    }
    kodUslugiPoleTekstowe(){
        return cy.get('input[id="ServiceCodeName"]')
    }

    kodUslugiPrzycisk(){
        return cy.get('button[data-forid="ServiceCodeId"]')
    }

    podstawaWycenyPoleTekstowe(){
        return cy.get('input[id="ValuationBasisIName"]')
    }

    podstawaWycenyPrzycisk(){
        return cy.get('button[data-forid="ValuationBasisId"]')
    }

    wersjaKartyPoleTekstowe(){
        return cy.get('input[id="WorkCardVersion"]')
    }

    dataWygenerowaniaPoleTekstowe(){
        return cy.get('input[id="GeneratedDate"]')
    }

    wygenerowalPoleTekstowe(){
        return cy.get('input[id="GeneratedPerson"]')
    }

    dataWydrukowaniaPoleTekstowe(){
        return cy.get('input[id="PrintedDate"]')
    }

    wydrukowalPoleTekstowe(){
        return cy.get('input[id="PrintedPerson"]')
    }

    pobierzStawkiZKosztorysuPrzycisk(){
        return cy.get('button#getPersonPrices').contains('Pobierz stawki z kosztorysu')
    }

    pobierzKwotyZCennikaPrzycisk(){
        return cy.get('button[id="getEquipmentPrices"]').contains('Pobierz kwoty z cennika')
    }

    kosztPierwszyPrzyciskWyboru(){
        return cy.get('input[id="EquipmentList_0__Cost_checkbox"]')
    }

    usunPierwszyPrzycisk(){
        return cy.get('button[id="delEquipmentBtn_0"]')
    }

    uwagiPoleTekstowe(){
        return cy.get('textarea[name="Comments"]')
    }

    rabatPrzycisk(){
        return cy.get('button[onclick="fnShowDiscountWhenFormHasChanges()"]').contains('Rabat')
    }

    zapiszPrzycisk(){
        return cy.get('button[id="save"]').contains('Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button[id="WorkCardReturn"]').contains('Powrót')
    }

    historiaZmianPrzycisk(){
        return cy.get('button.btn.btn-info').contains('Historia zmian')
    }

    potwierdzPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    anulujPopupPrzycisk(){
        return cy.get('button.btn-danger.denyBtn').contains('Anuluj')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/WorkCard/Edit/')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Szczegóły karty pracy')
        this.identyfikatorPoleTekstowe().should('be.visible')
        this.rodzajPoleTekstowe().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.statusKartyPoleTekstowe().should('be.visible')
        this.zaOkresOdPoleTekstowe().should('be.visible')
        this.zaOkresDoPoleTekstowe().should('be.visible')
        this.kodUslugiPoleTekstowe().should('be.visible')
        this.podstawaWycenyPoleTekstowe().should('be.visible')
        this.wersjaKartyPoleTekstowe().should('be.visible')
        this.dataWygenerowaniaPoleTekstowe().should('be.visible')
        this.wygenerowalPoleTekstowe().should('be.visible')
        this.dataWydrukowaniaPoleTekstowe().should('be.visible')
        this.wydrukowalPoleTekstowe().should('be.visible')
        this.uwagiPoleTekstowe().should('be.visible')
        // this.rabatPrzycisk().should('be.visible') // widoczne tylko gdy karta nie jest honoracyjna
        this.powrotPrzycisk().should('be.visible')
    }
    
    sprawdzWidokEdycja(){
        this.pobierzStawkiZKosztorysuPrzycisk().should('be.visible')
        this.pobierzKwotyZCennikaPrzycisk().should('be.visible')
        this.kosztPierwszyPrzyciskWyboru().should('be.visible')
        this.usunPierwszyPrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
    }

}

export const e50901 = new E50901()
