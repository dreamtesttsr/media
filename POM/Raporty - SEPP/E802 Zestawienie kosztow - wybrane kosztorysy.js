class E802 {
    
    // Selektory
    nrPorozumieniaSerial1PierwszyLista(){
        return cy.get('select#SeriesInfos_0__SeriesRows_0__AgreementId')
    }

    nrPorozumieniaSerial2PierwszyLista(){
        return cy.get('select#SeriesInfos_1__SeriesRows_0__AgreementId')
    }

    dodanieKosztorysuSerial1Przycisk(){
        return cy.get('#AddRow0')
    }

    dodanieKosztorysuSerial2Przycisk(){
        return cy.get('#AddRow1')
    }

    dodajSerialPrzycisk(){
        return cy.get('#addSeries')
    }

    zaznaczKosztyPowyzejZeraPrzycisk(){
        return cy.get('#checkAllOverZero').should('contain', 'Zaznacz koszty > 0,00 zł')
    }

    zaznaczOdznaczWszystkiePrzycisk(){
        return cy.get('#checkAllCosts').should('contain', 'Zaznacz/odznacz wszystkie')
    }

    generujRaportPrzycisk(){
        return cy.get('button[type="submit"]').should('contain', 'Generuj raport')
    }

    zaznaczPierwszyKosztPrzyciskWyboru(){
        return cy.get('span.icon.check-icon').first()
    }

    // Metody
    sprawdzWidok(){
        this.nrPorozumieniaSerial1PierwszyLista().should('be.visible')
        this.nrPorozumieniaSerial2PierwszyLista().should('be.visible')
        this.dodanieKosztorysuSerial1Przycisk().should('be.visible')
        this.dodanieKosztorysuSerial2Przycisk().should('be.visible')
        this.dodajSerialPrzycisk().should('be.visible')
        this.zaznaczKosztyPowyzejZeraPrzycisk().should('be.visible')
        this.zaznaczOdznaczWszystkiePrzycisk().should('be.visible')
        this.generujRaportPrzycisk().should('be.visible')
        this.zaznaczPierwszyKosztPrzyciskWyboru().should('be.visible')
    }
}

export const e802 = new E802()