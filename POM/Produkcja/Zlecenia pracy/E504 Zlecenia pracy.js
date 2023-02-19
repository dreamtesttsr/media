import { fWspolne } from '../../Funkcje wspolne/Funkcje wspolne'

class E504{
    numerPorozumieniaPoleTekstowe(){
        return cy.get('input[id="AgreementNr"]')
    }

    numerZleceniaPracyPoleTekstowe(){
        return cy.get('input[id="WordkOrderId"]')
    }
    
    tytulAudycjiPoleTekstowe(){
        return cy.get('input[id="AuditionName"]')
    }

    sapProdIdAudycjiMPKPoleTekstowe(){
        return cy.get('#ProductionSapNumber')
    }

    idKosztorysuPoleTekstowe(){
        return cy.get('input#CostPlanningId')
    }

    numerKartyPracyPoleTekstowe(){
        return cy.get('input[id="WorkCardId"]')
    }
    
    pracownikLista(){
        return cy.get('select[id="UserName"]')
    }

    stanZleceniaLista(){
        return cy.get('select[id="StateOfOrder"]')
    }

    oczekujaceNaAkceptacjeWycenyPrzyciskWyboru(){
        return cy.get('#IsRequiredApproval')
    }

    wyszukajPrzycisk(){
        return cy.get('button[title="Wyszukaj"]').first()
    }

    zaawansowanePrzycisk(){
        return cy.get('button[title="Zaawansowane"]')
    }

    wydzialLista(){
        return cy.get('#Department')
    }

    stanowiskoLista(){
        return cy.get('#ServiceId')
    }

    nrEwidSapPoleTekstowe(){
        return cy.get('#RecordSap')
    }

    nrSapKontrahentaPoleTekstowe(){
        return cy.get('#ContractorSap')
    }

    dataRozpatrzeniaOdData(){
        return cy.get('#DateRealisationFrom')
    }

    dataRozpatrzeniaDoData(){
        return cy.get('#DateRealisationTo')
    }

    dataRealizacjiOdData(){
        return cy.get('#DateFrom')
    }

    godzinaRealizacjiOdData(){
        return cy.get('#TimeFrom')
    }

    dataRealizacjiDoData(){
        return cy.get('#DateTo')
    }

    godzinaRealizacjiDoData(){
        return cy.get('#TimeTo')
    }

    tylkoZleceniaZNadgodzinamiPrzyciskWyboru(){
        return cy.get('#OnlyOvertime')
    }

    osobaGenerujacaKartePracyLista(){
        return cy.get('#GeneratedWorkCardUserId')
    }

    grupaPracownikowLista(){
        return cy.get('#GroupEmployeesId')
    }

    dataWygenerowaniaOdData(){
        return cy.get('#GenerationDateFrom')
    }

    dataWygenerowaniaDoData(){
        return cy.get('#GenerationDateTo')
    }

    idWnioskuOPrzydzielenieZasobowPoleTekstowe(){
        return cy.get('#ResourceOrderId')
    }

    producentLista(){
        return cy.get('#ProducerId')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('a[title="Wyczyść filtry wyszukiwania"]').first()
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

    // Lista zleceń pracy na stronie wyszukiwarki
    zleceniaTabela(){
        return cy.get('table[aria-describedby="orderList_table_info"]')
    }

    przegladRezerwacjiPierwszyPrzycisk(){
        return cy.get('[data-cy="Przeglad_rezerwacji"]').contains('P').first()
    }

    przegladZleceniaPracyPierwszyPrzycisk(){
        return cy.get('[data-cy="Przeglad_zlecenia_pracy"]').contains('Z').first()
    }

    edycjaPierwszyPrzycisk(){
        return cy.get('[data-cy="Edycja"]').contains('E').first()
    }

    akceptacjaZleceniaPracyPierwszyPrzycisk(){
        return cy.get('[data-cy="Akceptacja_zlecenia_pracy"]').contains('A').first()
    }

    anulacjaZleceniaPracyPierwszyPrzycisk(){
        return cy.get('[data-cy="Anulacja_zlecenia_pracy"]').contains('N').first()
    }

    zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk(){
        return cy.get('[data-cy="Zatwierdzenie_odrzucenie_wyceny"]').contains('H').first()
    }

    raportRozliczenieKosztowZasobowPierwszyPrzycisk(){
        return cy.get('[data-cy="Raport_rozliczenie_kosztow_zasobow"]').contains('KZ').first()
    }

    // Pop-up zlecenia pracy
    zamknijPopUpXPrzycisk(){
        return cy.get('button[id="DetailsModal-close"]')
    }


    // Metody
    sprawdzURL(){
        cy.url().should('contain', '/smf/WorkOrder')
    }

    sprawdzWidok(){
        cy.get('.active').should('contain', 'Zlecenia Pracy')
        this.numerPorozumieniaPoleTekstowe().should('be.visible')
        this.numerZleceniaPracyPoleTekstowe().should('be.visible')
        this.tytulAudycjiPoleTekstowe().should('be.visible')
        this.sapProdIdAudycjiMPKPoleTekstowe().should('be.visible')
        this.idKosztorysuPoleTekstowe().should('be.visible')
        this.pracownikLista().should('be.visible')
        this.stanZleceniaLista().should('be.visible')
        this.numerKartyPracyPoleTekstowe().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.wyszukajPrzycisk().should('be.visible')
        this.wyczyscFiltryPrzycisk().should('be.visible')
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().should('be.visible')
        this.eksportujWidoczneKolumnyPrzycisk().should('be.visible')
        this.eksportujWszystkieKolumnyPrzycisk().should('be.visible')
        this.wybierzWidoczneKolumnyPrzycisk().should('be.visible')
    }

    sprawdzFiltryZaawansowane(){
        this.zaawansowanePrzycisk().click()
        this.wydzialLista().should('be.visible')
        this.stanowiskoLista().should('be.visible')
        this.nrEwidSapPoleTekstowe().should('be.visible')
        this.nrSapKontrahentaPoleTekstowe().should('be.visible')
        this.dataRozpatrzeniaOdData().should('be.visible')
        this.dataRozpatrzeniaDoData().should('be.visible')
        this.dataRealizacjiOdData().should('be.visible')
        this.godzinaRealizacjiOdData().should('be.visible')
        this.dataRealizacjiDoData().should('be.visible')
        this.godzinaRealizacjiDoData().should('be.visible')
        this.tylkoZleceniaZNadgodzinamiPrzyciskWyboru().should('be.visible')
        this.osobaGenerujacaKartePracyLista().should('be.visible')
        this.grupaPracownikowLista().should('be.visible')
        this.zaawansowanePrzycisk().should('be.visible')
        this.dataWygenerowaniaOdData().should('be.visible')
        this.dataWygenerowaniaDoData().should('be.visible')
        this.idWnioskuOPrzydzielenieZasobowPoleTekstowe().should('be.visible')
        this.producentLista().should('be.visible')
        this.zaawansowanePrzycisk().click()
    }

    sprawdzWidok2(){
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().click()
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok3(){
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok4(){
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok11(){
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().click()
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok12(){
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.edycjaPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.akceptacjaZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.anulacjaZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok13(){
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.edycjaPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.akceptacjaZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.anulacjaZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok17(){
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().click()
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok18(){
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().click()
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok26(){
        this.przegladRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.raportRozliczenieKosztowZasobowPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    sprawdzWidok37(){
        this.oczekujaceNaAkceptacjeWycenyPrzyciskWyboru().click()
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        this.przegladZleceniaPracyPierwszyPrzycisk().scrollIntoView().should('be.visible')
        this.zatwierdzanieOdrzucenieWycenyPierwszyPrzycisk().scrollIntoView().should('be.visible')
    }

    filtrujPoNumerzePierwszegoZlecenia(){
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(2)').invoke('text')
            .then((text) => {
                const nrZleceniaPracy = text
                this.numerZleceniaPracyPoleTekstowe().clear().type(nrZleceniaPracy)
            })
        this.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
    }
}

export const e504 = new E504()