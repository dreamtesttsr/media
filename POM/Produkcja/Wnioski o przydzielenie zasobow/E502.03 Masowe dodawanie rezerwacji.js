class E50203 {
    // Selektory
    kosztorysLista(){
        return cy.get('select#TitleId')
    }

    sekcjaWnioskuLista(){
        return cy.get('select#SectionNameId')
    }

    miejsceRealizacjiLista(){
        return cy.get('select#ExecutionPlacesId')
    }

    czestotliwoscRadio(tryb){
        return cy.get('#frequncies').contains(tryb).children('input')
    }

    odDniaData(){
        return cy.get('input#FromDate')
    }

    doDniaData(){
        return cy.get('input#ToDate')
    }

    dniTygodniaPrzyciskWyboru(dzien){
        return cy.get('#DaysOfWeek').contains(dzien).siblings('input[type="checkbox"]')
    }

    potwierdzPrzycisk(){
        return cy.get('button#cyklicFormModal-yesBtn')
    }

    anulujPrzycisk(){
        return cy.get('button#cyklicFormModal-noBtn')
    }
}

export const e50203 = new E50203()