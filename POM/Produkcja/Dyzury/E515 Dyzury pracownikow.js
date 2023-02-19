class E515{
    // Selektory
    pracownikLista(){
        return cy.get('#UserId')
    }

    dyzurOdData(){
        return cy.get('#DutyStart')
    }

    dyzurDoData(){
        return cy.get('#DutyEnd')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]')
    }

    dodajDyzurPrzycisk(){
        return cy.get('button[title="Dodaj dyżur"]')
    }

    usunDyzurPierwszyPrzycisk(){
        return cy.get('a[title="Usuń dyżur"]').first()
    }

    pracownikPopupLista(){
        return cy.get('#EmployeeId')
    }

    rozpoczecieDyzuruPopupData(){
        return cy.get('#DateFrom')
    }

    zakonczenieDyzuruPopupData(){
        return cy.get('#DateTo')
    }

    rozpoczecieDyzuruPopupCzas(){
        return cy.get('#TimeFrom')
    }

    zakonczenieDyzuruPopupCzas(){
        return cy.get('#TimeTo')
    }

    potwierdzPrzycisk(){
        return cy.get('#detailsModal-yesBtn').contains('Potwierdź')
    }

    anulujPrzycisk(){
        return cy.get('#detailsModal-noBtn').contains('Anuluj')
    }

    takPrzycisk(){
        return cy.get('#confirmBtn').contains('Tak')
    }

    niePrzycisk(){
        return cy.get('button.denyBtn').contains('Nie')
    }

    // Metody
    sprawdzWidok(){
        this.pracownikLista().should('be.visible').and('have.attr', 'data-placeholder', 'Pracownik')
        this.dyzurOdData().should('be.visible').and('have.attr', 'placeholder', 'Dyżur od')
        this.dyzurDoData().should('be.visible').and('have.attr', 'placeholder', 'Dyżur do')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.usunDyzurPierwszyPrzycisk().should('be.visible')
    }
}

export const e515 = new E515()