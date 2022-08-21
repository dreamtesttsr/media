class E50209 {
    
    // Selektory
    zatwierdzWszystkiePrzycisk(){
        return cy.get('button.btn-success').contains('Zatwierdź wszystkie')
    }

    zatwierdzZaznaczonePrzycisk(){
        return cy.get('button.btn-success').contains('Zatwierdź zaznaczone')
    }

    odrzucWszystkiePrzycisk(){
        return cy.get('button.btn-danger').contains('Odrzuć wszystkie')
    }

    odrzucZaznaczonePrzycisk(){
        return cy.get('button.btn-danger').contains('Odrzuć zaznaczone')
    }

    powrotPrzycisk(){
        return cy.get('.return-button').contains('Powrót')
    }

    zaznaczPierwszaZmianePrzyciskWyboru(){
        return cy.get('input.checkbox').eq(1)
    }

    potwierdzPopupPrzycisk(){
        return cy.get('.btn.btn-success.btn-block')
    }

    anulujPopupPrzycisk(){
        return cy.get('button.btn-danger.btn-block').contains('Anuluj')
    }


    // Metody
    sprawdzWidok(){
        this.zatwierdzWszystkiePrzycisk().should('be.visible')
        this.zatwierdzZaznaczonePrzycisk().should('be.visible')
        this.odrzucWszystkiePrzycisk().should('be.visible')
        this.odrzucZaznaczonePrzycisk().should('be.visible')
        this.powrotPrzycisk().should('be.visible')
        this.zaznaczPierwszaZmianePrzyciskWyboru().should('be.visible')
    }

}

export const e50209 = new E50209()