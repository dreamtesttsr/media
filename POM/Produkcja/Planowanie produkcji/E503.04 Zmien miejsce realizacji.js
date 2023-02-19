class E50304 {
    // Selektory
    miejsceRealizacjiLista(){
        return cy.get('select#IdRealizationPlace')
    }

    zmienTylkoDlaDanegoMiejscaRealizacjiPrzyciskWyboru(){
        return cy.get('input#ChangeOnlyForChosenRealizationPlace')
    }

    zmienDlaRadio(nrOpcji){
        return cy.get('input#SelectedOption').eq(nrOpcji)
    }

    potwierdzPrzycisk(){
        return cy.get('button#changeSetModal-yesBtn').contains('Potwierdź')
    }

    anulujPrzycisk(){
        return cy.get('button#changeSetModal-noBtn').contains('Anuluj')
    }

}

export const e50304 = new E50304()