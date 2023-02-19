class E513 {
    
    // Selektory
    grupaZasobowLista(){
        return cy.get('#SelectedGroupId')
    }

    dodajGrupePrzycisk(){
        return cy.get('#addGroupBtn')
    }

    nazwaGrupy(){
        return cy.get('#GroupName')
    }

    dodajPrzycisk(){
        return cy.get('#NewGroupDialog-yesBtn')
    }

    anulujPrzycisk(){
        return cy.get('#NewGroupDialog-noBtn')
    }

    usunGrupePrzycisk(){
        return cy.get('#removeGroupBtn')
    }

    zapiszPrzycisk(){
        return cy.get('#saveForm').contains('Zapisz')
    }

    grupaMiejscRealizacjiPrzyciskWyboru(){
        return cy.get('input[value="RealizationPlace"]')
    }

    grupaElementowSprzetowychPrzyciskWyboru(){
        return cy.get('input[value="EquipmentElement"]')
    }

    miejsceRealizacjiLista(){
        return cy.get('#RealizationPlaceId')
    }

    elementSprzetowyLista(){
        return cy.get('#EquipmentElementId')
    }

    dodajMiejsceRealizacjiPrzycisk(){
        return cy.get('#addRealizationPlaceBtn')
    }

    dodajElementSprzetowyPrzycisk(){
        return cy.get('#addEquipmentElementBtn')
    }

    usunZasobPierwszyPrzycisk(){
        return cy.get('[data-cy="Usun_grupe_zasobow"]').first()
    }

    takPopupPrzycisk(){
        return cy.get('#ConfirmChangeRadioButtonModal-yesBtn')
    }

    niePopupPrzycisk(){
        return cy.get('#ConfirmChangeRadioButtonModal-noBtn')
    }

    // Metody
    sprawdzWidok(){
        this.grupaZasobowLista().should('be.visible')
        this.dodajGrupePrzycisk().should('be.visible')
        this.zapiszPrzycisk().should('be.visible')
    }

    sprawdzWidokMiejscaRealizacji(){
        this.usunGrupePrzycisk().should('be.visible')
        this.grupaMiejscRealizacjiPrzyciskWyboru().should('be.visible')
        this.grupaElementowSprzetowychPrzyciskWyboru().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.elementSprzetowyLista().should('be.visible').and('have.attr', 'disabled')
        this.dodajMiejsceRealizacjiPrzycisk().should('be.visible')
        this.usunZasobPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidokElementySprzetowe(){
        this.usunGrupePrzycisk().should('be.visible')
        this.grupaMiejscRealizacjiPrzyciskWyboru().should('be.visible')
        this.grupaElementowSprzetowychPrzyciskWyboru().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible').and('have.attr', 'disabled')
        this.elementSprzetowyLista().should('be.visible')
        this.dodajMiejsceRealizacjiPrzycisk().should('not.be.visible')
        this.usunZasobPierwszyPrzycisk().should('be.visible')
    }
}

export const e513 = new E513()