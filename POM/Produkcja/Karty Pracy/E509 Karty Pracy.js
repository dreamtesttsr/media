class E509{
    idKartyPoleTekstowe(){
        return cy.get('input[id="WorkCardId"]')
    }

    rodzajKartyLista(){
        return cy.get('select[id="WorkCardTypeId"]')
    }

    statusKartyLista(){
        return cy.get('select[id="WorkCartStatusId"]')
    }

    ukryjAnulowanePrzyciskWyboru(){
        return cy.get('input#HideCanceled')
    }

    wydzialLista(){
        return cy.get('select[id="DepartmentId"]')
    }

    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNr"]')
    }

    tytulAudycjiPoleTekstowe(){
        return cy.get('input[id="Title"]')
    }

    sapIdAudycjiMPKPoleTekstowe(){
        return cy.get('input[id="SapNumber"]')
    }

    zleceniaPracyOdData(){
        return cy.get('input[id="WorkOrdersFrom"]')
    }

    zleceniaPracyDoData(){
        return cy.get('input[id="WorkOrdersTo"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
    }

    dodajKartePracyPrzycisk(){
        return cy.get('button[title="Dodaj kartę pracy"]')
    }

    zaOkresOdData(){
        return cy.get('#DateFrom')
    }

    zaOkresDoData(){
        return cy.get('#DateTo')
    }

    pracownikLista(){
        return cy.get('#EmployeeId')
    }

    sprzetLista(){
        return cy.get('#EquipmentId')
    }

    statusZleceniaPracyLista(){
        return cy.get('#WorkOrderStatus')
    }

    wygenerowalLista(){
        return cy.get('#GeneratingEmployeeId')
    }

    wydrukowalLista(){
        return cy.get('#PrintingEmployeeId')
    }

    dataWydrukowaniaOdData(){
        return cy.get('#PrintDateFrom')
    }

    dataWydrukowaniaDoData(){
        return cy.get('#PrintDateTo')
    }

    producentLista(){
        return cy.get('#ProducerId')
    }

    miejsceRealizacjiLista(){
        return cy.get('#ExecutionPlaceId')
    }

    dataWygenerowaniaOdData(){
        return cy.get('#GenerationDateFrom')
    }

    dataWygenerowaniaDoData(){
        return cy.get('#GenerationDateTo')
    }

    eksportujWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel widoczne kolumny"]')
    }

    eksportujWszystkieKolumnyPrzycisk(){
        return cy.get('button[title="Eksportuj do Excel wszystkie kolumny"]')
    }

    wybierzWidoczneKolumnyPrzycisk(){
        return cy.get('button[title="Wybierz widoczne kolumny"]')
    }

    // Lista kart pracy na stronie wyszukiwarki
    kartyPracyTabela(){
        return cy.get('table[aria-describedby="workCardList_table_info"]')
    }

    przegladajWycenePierwszyPrzycisk(){
        return cy.get('a[title="Przeglądaj wycenę"]').contains('P').first()
    }

    edytujWycenePierwszyPrzycisk(){
        return cy.get('a[title="Edytuj wycenę"]').contains('E').first()
    }

    anulujKartePracyPierwszyPrzycisk(){
        return cy.get('a[title="Anuluj kartę pracy"]').first()
    }

    zatwierdzKartePracyPierwszyPrzycisk(){
        return cy.get('a[data-cy="Zatwierdz_karte_pracy"]').contains('K').first()
    }

    takPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Tak')
    }

    niePopupPrzycisk(){
        return cy.get('.btn.btn-danger.btn-block.denyBtn').contains('Nie')
    }

    komentarzPopupPoleTekstowe(){
        return cy.get('textarea#modalComment')
    }

    anulujKartePracyPopupPrzycisk(){
        return cy.get('#rejectModal-yesBtn').contains('Anuluj kartę pracy')
    }

    powrotPopupPrzycisk(){
        return cy.get('#rejectModal-noBtn').contains('Powrót')
    }

    takPowrotPopupPrzycisk(){
        return cy.get('#yesReturnButtonId').contains('Tak')
    }

    niePowrotPopupPrzycisk(){
        return cy.get('#noReturnButtonId').contains('Nie')
    }

    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/WorkCard')
    }

    sprawdzURLWew(){
        cy.url().should('contain', '/smf/WorkCard')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Karty pracy')
        this.idKartyPoleTekstowe().should('be.visible')
        this.rodzajKartyLista().should('be.visible')
        this.statusKartyLista().should('be.visible')
        this.ukryjAnulowanePrzyciskWyboru().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.tytulAudycjiPoleTekstowe().should('be.visible')
        this.sapIdAudycjiMPKPoleTekstowe().should('be.visible')
        this.zleceniaPracyOdData().should('be.visible')
        this.zleceniaPracyDoData().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.przegladajWycenePierwszyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.zaOkresOdData().should('be.visible')
        this.zaOkresDoData().should('be.visible')
        this.pracownikLista().should('be.visible')
        this.sprzetLista().should('be.visible')
        this.statusZleceniaPracyLista().should('be.visible')
        this.wygenerowalLista().should('be.visible')
        this.wydrukowalLista().should('be.visible')
        this.dataWydrukowaniaOdData().should('be.visible')
        this.dataWydrukowaniaDoData().should('be.visible')
        this.producentLista().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.dataWygenerowaniaOdData().should('be.visible')
        this.dataWygenerowaniaDoData().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzPopupPotwierdzenia(){
        this.takPopupPrzycisk().should('be.visible')
        this.niePopupPrzycisk().should('be.visible')
    }

    sprawdzPopupPowodAnulowania(){
        this.komentarzPopupPoleTekstowe().should('be.visible')
        this.anulujKartePracyPopupPrzycisk().should('be.visible')
        this.powrotPopupPrzycisk().should('be.visible')
    }

    sprawdzWidok1(){
        this.dodajKartePracyPrzycisk().should('be.visible')
        this.edytujWycenePierwszyPrzycisk().should('be.visible')
        this.anulujKartePracyPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok13(){
        this.dodajKartePracyPrzycisk().should('be.visible')
        this.edytujWycenePierwszyPrzycisk().should('be.visible')
        // this.anulujKartePracyPierwszyPrzycisk().should('be.visible') // wymaga karty stworzonej przez daneogo uzytkownika
    }

    sprawdzWidok22(){
        this.dodajKartePracyPrzycisk().should('be.visible')
        this.edytujWycenePierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok35(){
        this.anulujKartePracyPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok37(){
        this.dodajKartePracyPrzycisk().should('be.visible')
        this.edytujWycenePierwszyPrzycisk().should('be.visible')
        this.zatwierdzKartePracyPierwszyPrzycisk().should('be.visible')
    }
}

export const e509 = new E509()