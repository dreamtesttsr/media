import { fWspolne } from '../../Funkcje wspolne/Funkcje wspolne'

class E501 {
    
    // Selektory
    idWnioskuPoleTekstowe(){
        return cy.get('#Id')
    }

    nrPorozumieniaPoleTekstowe(){
        return cy.get('#AgreementNumber')
    }

    nazwaAudycjiTVPoleTekstowe(){
        return cy.get('#AuditionName')
    }

    sapIdAudycjiPoleTekstowe(){
        return cy.get('#OrderSAP')
    }

    jednZamawiajacaLista(){
        return cy.get('#OrganizationUnitId')
    }

    wydzialLista(){
        return cy.get('#DepartmentId')
    }

    idRezerwacjiPoleTekstowe(){
        return cy.get('#SectionId')
    }

    pokazZdjeteZAntenyPrzyciskWyboru(){
        return cy.get('#ShowRemoved')
    }

    ukryjZrealizowanePrzyciskWyboru(){
        return cy.get('#HideExecuted')
    }

    statusRezerwacjiLista(){
        return cy.get('#OrderStatusId')
    }

    trybProdukcjiLista(){
        return cy.get('#ProductionMode')
    }

    zaaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
    }

    rodzajRezerwacjiLista(){
        return cy.get('select#ReservationTypeDisplay')
    }

    dataRealizacjiOdData(){
        return cy.get('input#ExecutionDateFrom')
    }

    dataRealizacjiDoData(){
        return cy.get('input#ExecutionDateTo')
    }

    dataZamowieniaOdData(){
        return cy.get('input#OrderDateFrom')
    }

    dataZamowieniaDoData(){
        return cy.get('input#OrderDateTo')
    }

    kierownikProjektuLista(){
        return cy.get('#ProjectManagerId')
    }

    osobaZamawiajacaLista(){
        return cy.get('#OrderUserId')
    }

    miejsceRealizacjiLista(){
        return cy.get('#ExectuionPlaceId')
    }

    uslugaLista(){
        return cy.get('#ServiceId')
    }

    sprzetLista(){
        return cy.get('#EquipmentId')
    }

    dodajNowyWniosekPrzycisk(){
        return cy.get('button[title="Dodaj nowy wniosek"]')
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

    objasnienieKolorowPrzycisk(){
        return cy.get('button.color-legend')
    }

    przegladajWniosekPierwszyPrzycisk(){
        return cy.get('a[title="Przeglądaj wniosek"]').first().scrollIntoView().contains('P')
    }

    edytujWniosekPierwszyPrzycisk(){
        return cy.get('a[title="Edytuj wniosek"]').first().contains('E')
    }

    edytujSekcjeWnioskuPierwszyPrzycisk(){
        return cy.get('a[title="Edytuj sekcję wniosku"]').first().contains('S')
    }

    przegladSekcjiWnioskuPierwszyPrzycisk(){
        return cy.get('a[title="Przegląd sekcji wniosku"]').first().scrollIntoView().contains('R')
    }

    zmianyNiezatwierdzonePierwszyPrzycisk(){
        return cy.get('a[title="Zmiany niezatwierdzone"]').first().contains('N')
    }

    wnioskiTabela(){
        return cy.get('table#orderList_table')
    }

    // Metody
    sprawdzWidok(){
        this.ukryjZrealizowanePrzyciskWyboru().should('be.visible').click()
        this.wyszukajPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        this.idWnioskuPoleTekstowe().should('be.visible')
        this.nrPorozumieniaPoleTekstowe().should('be.visible')
        this.nazwaAudycjiTVPoleTekstowe().should('be.visible')
        this.sapIdAudycjiPoleTekstowe().should('be.visible')
        this.jednZamawiajacaLista().should('be.visible')
        this.wydzialLista().should('be.visible')
        this.idRezerwacjiPoleTekstowe().should('be.visible')
        this.pokazZdjeteZAntenyPrzyciskWyboru().should('be.visible')
        this.statusRezerwacjiLista().should('be.visible')
        this.trybProdukcjiLista().should('be.visible')
        this.zaaawansowanePrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
        this.objasnienieKolorowPrzycisk().should('be.visible')
        this.przegladajWniosekPierwszyPrzycisk().should('be.visible')
        this.przegladSekcjiWnioskuPierwszyPrzycisk().should('be.visible')
    }

    sprawdzWidok2(){
        this.dodajNowyWniosekPrzycisk().should('be.visible')
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzWidok11(){
        this.dodajNowyWniosekPrzycisk().should('be.visible')
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzWidok12(){
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzWidok13(){
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzWidok18(){
        this.dodajNowyWniosekPrzycisk().should('be.visible')
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzWidok26(){
        this.dodajNowyWniosekPrzycisk().should('be.visible')
        this.edytujWniosekPierwszyPrzycisk().should('be.visible')
        this.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible') 
    }

    sprawdzFiltryZaawansowane(){
        this.zaaawansowanePrzycisk().click()
        cy.get('#menuFilter > div.row.form-group.form-narrow-vertical > label').should('have.text', 'Szczegóły wniosku:').and('be.visible')
        this.rodzajRezerwacjiLista().should('be.visible')
        this.dataRealizacjiOdData().should('be.visible')
        this.dataRealizacjiDoData().should('be.visible')
        this.dataZamowieniaOdData().should('be.visible')
        this.dataZamowieniaDoData().should('be.visible')
        this.kierownikProjektuLista().should('be.visible')
        this.osobaZamawiajacaLista().should('be.visible')
        this.miejsceRealizacjiLista().should('be.visible')
        this.uslugaLista().should('be.visible')
        this.sprzetLista().should('be.visible')
        this.zaaawansowanePrzycisk().click()
    }

}

export const e501 = new E501()