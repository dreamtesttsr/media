class E805 {
    
    // Selektory
    stanNaDzienData(){
        return cy.get('#Date')
    }

    godzinaCzas(){
        return cy.get('#Time')
    }

    pdfPrzycisk(){
        return cy.get('#printPdf')
    }

    excelPrzycisk(){
        return cy.get('#printExcel')
    }
}

export const e805 = new E805()