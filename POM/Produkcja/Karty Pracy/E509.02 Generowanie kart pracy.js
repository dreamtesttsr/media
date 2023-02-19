class E50902{

    generowanieKartPracyModal(){
        return cy.get('div[id="workCardGeneratorModal-modal"]')
    }

    rodzajKartyPracyLista(){
        return cy.get('select[id="FilterWorkCardTypeId"]')
    }

    wydzialLista(){
        return cy.get('select[id="FilterDepartmentId"]')
    }

    dataOdPoleTekstowe(){
        return cy.get('input[id="FilterDateFrom"]')
    }

    dataDoPoleTekstowe(){
        return cy.get('input[id="FilterDateTo"]')
    }

    nazwaAudycjiPoleTekstowe(){
        return cy.get('input[id="FilterAuditionName"]')
    }

    idAudycjiPoleTekstowe(){
        return cy.get('input[id="FilterAuditionId"]')
    }

    stanowiskoLista(){
        return cy.get('select[id="ModalPositionId"]')
    }
    grupaOsobLista(){
        return cy.get('select[id="ModalWorkerGroupId"]')
    }

    pracownikLista(){
        return cy.get('select[id="ModalWorkerId"]')
    }

    sprzetLista(){
        return cy.get('select[id="ModalEquipmentId"]')
    }

    grupaSprzetuLista(){
        return cy.get('select[id="ModalEquipmentGroupId"]')
    }

    grupaMiejscRealizacjiLista(){
        return cy.get('select[id="ModalRealizationPlaceGroupId"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[id="generatorSearchBtn"]')
    }

    zaznaczwszystkiePrzyciskWyboru(){
        return cy.get('th > #addWorkCardTypeGenerate')
    }

    zaznaczAudycjePierwszyPrzyciskWyboru(){
        return cy.get('input.cardGeneratorCheckbox').first()
    }

    generujKartyPracyPrzycisk(){
        return cy.get('button[id="generate"]').contains('Generuj karty pracy')
    }
    
    powrotPrzycisk(){
        return cy.get('button[onclick="confirmReturnBack()"]')
    }

    zamknijPopupPrzycisk(){
        return cy.get('#auditionsModal-close')
    }

    // Metody
    sprawdzWidok(){
        this.generowanieKartPracyModal().should('be.visible')
        this.rodzajKartyPracyLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.dataOdPoleTekstowe().should('be.visible')
        this.dataDoPoleTekstowe().should('be.visible')
        this.nazwaAudycjiPoleTekstowe().should('be.visible')
        this.idAudycjiPoleTekstowe().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.grupaOsobLista().should('be.visible')
        this.pracownikLista().should('be.visible')
        this.sprzetLista().should('be.visible')
        this.grupaSprzetuLista().should('be.visible')
        this.grupaMiejscRealizacjiLista().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.generujKartyPracyPrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
    }

}

export const e50902 = new E50902()
