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

    potwierdzZatwierdzZaznaczonePopupPrzycisk(){
        return cy.get('#beforeAcceptModal-yesBtn').contains('Potwierdź')
    }
    
    potwierdzOdrzucZaznaczonePopupPrzycisk(){
        return cy.get('#beforeRejectionModal-yesBtn').contains('Potwierdź')
    }

    potwierdzZatwierdzWszystkiePopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    potwierdzOdrzucWszystkiePopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Potwierdź')
    }

    potwierdzPopupPrzycisk(){
        return cy.get('#rejectionModal-yesBtn').contains('Potwierdź')
    }
    
    anulujPopupPrzycisk(){
        return cy.get('button.btn-danger.btn-block').contains('Anuluj')
    }

    powodOdrzuceniaModyfikacjiPoleTestowe(){
        return cy.get('textarea#RejectionReasonTb')
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