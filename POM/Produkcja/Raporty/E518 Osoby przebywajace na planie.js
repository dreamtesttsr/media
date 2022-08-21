class E518{
// selektory
    miejsceRealizacjiLista(){
        return cy.get('select#RealizationPlaceIds')
    }
	
    odDniaData(){
        return cy.get('#DateFrom')
    }
	
    doDniaData(){
        return cy.get('#DateTo')
    }
	
    formatZestawieniaRadio(){
        return cy.get('#DocumentType').parent('label').parent('div')
    }
	
    utworzZestawieniePrzycisk(){
        return cy.get('button[title=printButton]')
    }
	
    // Metody
    sprawdzWidok(){
        this.miejsceRealizacjiLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.odDniaData().should('be.visible')
        this.doDniaData().should('be.visible')
        this.wybierzWartoscRadio('PDF')
        this.wybierzWartoscRadio('XLS')
    }

    wybierzWartoscRadio(wartosc){
        this.formatZestawieniaRadio().find('input').each(pole => {
            if(pole.parent('label').text().includes(wartosc)){
                cy.log('ZNALEZIONO SZUKANĄ OPCJĘ ' + wartosc)
                pole.click()
            }else{
                cy.log('Nie znaleziono szukanej opcji ' + wartosc)
            }
        })
    }
}

export const e518 = new E518()