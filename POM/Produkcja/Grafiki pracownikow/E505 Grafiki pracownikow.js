class E505 {
    // Selektory
    trybWyswietlaniaRadio(){
        return cy.get('#EmployeeDayShowingType').parent('label').parent('div')
    }	
		
    tytulAudycjiPoleTekstowe(){
        return cy.get('#AuditionName')
    }

    identyfikatorAudycjiPoleTekstowe(){
        return cy.get('#AuditionSapId')
    }

    numerSAPAudycjiPoleTekstowe(){
        return cy.get('#AuditionSapNr')
    }

    wydziałLista(){
        return cy.get('#DepartmentId')
    }

    odDniaData(){
        return cy.get('#DateFrom')
    }

    doDniaData(){
        return cy.get('#DateTo')
    }

    pracownikPoleTekstowe(){
        return cy.get('input[type="search"][placeholder="Wybierz..."]')
    }
	
    pracownikLista(){
        return cy.get('select#UserList')
    }
	
    stanowiskoLista(){
        return cy.get('#PositionId')
    }

    eksportujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Eksport do excela widocznych kolumn"]')
    }
	
    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }
	
    rodzajUmowyLista(){
        return cy.get('#ContractTypeId')
    }
	
    rodzajCzasuPracyLista(){
        return cy.get('#WorkingTimeTypeId')
    }
	
    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }
	
    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
    }

    objasnienieKolorowPrzycisk(){
        return cy.get('button.color-legend')
    }
			
    pokazPlanPracyPierwszyPrzycisk(){
        return cy.get('a[title="Pokaż plan pracy"]')
    }

    // Metody
    sprawdzWidok(){
        this.trybWyswietlaniaRadio().should('be.visible')
        this.tytulAudycjiPoleTekstowe().should('be.visible')
        this.identyfikatorAudycjiPoleTekstowe().should('be.visible')
        this.numerSAPAudycjiPoleTekstowe().should('be.visible')
        this.wydziałLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.odDniaData().should('be.visible')
        this.doDniaData().should('be.visible')
        this.pracownikPoleTekstowe().should('be.visible')
        this.pracownikLista().should('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.stanowiskoLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible') 
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
        this.pokazPlanPracyPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok37(){
        this.trybWyswietlaniaRadio().should('be.visible')
        this.tytulAudycjiPoleTekstowe().should('be.visible')
        this.identyfikatorAudycjiPoleTekstowe().should('be.visible')
        this.numerSAPAudycjiPoleTekstowe().should('be.visible')
        this.wydziałLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.odDniaData().should('be.visible')
        this.doDniaData().should('be.visible')
        this.pracownikPoleTekstowe().should('be.visible')
        this.pracownikLista().should('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.stanowiskoLista().should('be.visible').and('have.attr', 'data-placeholder', 'Wybierz...').and('not.have.attr', 'readonly')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible') 
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.rodzajUmowyLista().should('be.visible')
        this.rodzajCzasuPracyLista().should('be.visible')
    }

    wybierzWartoscRadio(wartosc){
        let num = 0
        this.trybWyswietlaniaRadio().find('input').each(pole => {
            if(pole.parent('label').text().includes(wartosc)){
                cy.log('Znaleziono szukaną opcję: ' + wartosc)
                num++
                pole.click()
                // eslint-disable-next-line cypress/no-unnecessary-waiting
                cy.wait(1000)
            }
            cy.wrap(num).as('ileZnaleziono')
        })
        cy.get('@ileZnaleziono').then((ile) => {
            if(ile == 0){
                cy.log('Nie znaleziono szukanej opcji: ' + wartosc)
            }
        })
    }
}

export const e505 = new E505()