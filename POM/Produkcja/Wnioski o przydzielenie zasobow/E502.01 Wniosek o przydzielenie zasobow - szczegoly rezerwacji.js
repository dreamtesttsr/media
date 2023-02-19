import { fWspolne } from '../../Funkcje wspolne/Funkcje wspolne'

class E50201 {
    
    // Selektory
    zapiszPrzycisk(){
        return cy.get('#saveForm').should('contain', 'Zapisz')
    }

    zapiszPopupPrzycisk(){
        return cy.get('button#changeModal-yesBtn').should('contain', 'Zapisz')
    }

    powodyModyfikacjiWnioskuPopupPoleTekstowe(){
        return cy.get('textarea#ModificationReasonTb')
    }

    powrotPrzycisk(){
        return cy.get('button.btn.btn-info.return-button').should('contain', 'Powrót')
    }

    zmianyNiezatwierdzonePrzycisk(){
        return cy.get('button.btn.btn-danger').contains('Zmiany niezatwierdzone').should('contain', 'Zmiany niezatwierdzone')
    }

    powodyZmian(){
        return cy.get('#modificationReasonBtn').should('contain', 'Powody zmian')
    }

    historiaZmianPrzycisk(){
        return cy.get('button[onclick="showHistory()"]').should('contain', 'Historia zmian')
    }

    wstepnaRezerwacjaPrzycisk(){
        return cy.get('#resourceReservationBtn').should('contain', 'Wstępna rezerwacja')
    }

    zlozZamowieniePrzycisk(){
        return cy.get('#SendToAcceptanceSection').should('contain', 'Złóż zamówienie')
    }

    odrzucPrzycisk(){
        return cy.get('#RejectBtn').should('contain', 'Odrzuć')
    }

    wstepnieZaakceptujPrzycisk(){
        return cy.get('#InitialAcceptedBtn').should('contain', 'Wstępnie zaakceptuj')
    }

    zaakceptujPrzycisk(){
        return cy.get('#AcceptedBtn').should('contain', 'Zaakceptuj')
    }

    takZaakceptujPrzycisk(){
        return cy.get('#AcceptedModal-yesBtn')
    }

    tytulAudycjiEtykieta(){
        return cy.get('#ProgramName')
    }

    trybProdukcjiEtykieta(){
        return cy.get('#ProductionMode')
    }

    idRezerwacjiPoleTekstowe(){
        return cy.get('input#Id.form-control')
    }

    statusRezerwacjiEtykieta(){
        return cy.get('#StatusName')
    }

    rezerwacjaWstepnaRadio(){
        return cy.get('input[value="InitialReservation"]')
    }

    zamowienieRadio(){
        return cy.get('input[value="Order"]')
    }

    sekcjaLista(){
        return cy.get('select[name="SectionDefinitionId"]')
    }

    dataRealizacjiOdData(){
        return cy.get('#DateFrom')
    }

    dataRealizacjiDoData(){
        return cy.get('#DateTo')
    }

    kosztorysLista(){
        return cy.get('#TitleId')
    }

    niestandMiejsceRealizacjiPrzyciskWyboru(){
        return cy.get('#IsExternalRealization')
    }

    miejsceRealizacjiLista(){
        return cy.get('select#RealizationPlaceId')
    }

    inneMiejsceRealizacjiPoletekstowe(){
        return cy.get('#OtherRealizationPlace')
    }

    uwagiDoRezerwacjiPoleTekstowe(){
        return cy.get('#Comments')
    }

    powodAnulacjiPoleTekstowe(){
        return cy.get('#CancellationReason')
    }

    pokazDniPrzycisk(){
        return cy.get('.active.toggle-off').should('contain', 'wszystkie')
    }

    wypelnijIdAudycjiPrzycisk(){
        return cy.get('#FillAuditionBtn')
    }

    potwierdzWypelnieniePopupPrzycisk(){
        return cy.get('#FillAuditionModal-yesBtn')
    }

    takOdrzucPopupPrzycisk(){
        return cy.get('button#RejectionModal-yesBtn')
    }

    powodOdrzuceniaPopupPoleTekstowe(){
        return cy.get('textarea#JustificationForRejectionTb')
    }

    potwierdzPopupPrzycisk(){
        return cy.get('button#rejectionReasonModal-yesBtn')
    }

    rozpocznijOdAudycjiLista(){
        return cy.get('#AuditionFromId')
    }

    zaznaczWszystkieDniPrzyciskWyboru(){
        return cy.get('#IsAllMovieDaysSelected')
    }

    zaznaczPierwszyDzienPrzyciskWyboru(){
        return cy.get('#DayList_0__IsSelected')
    }

    takUsunDzienPopupPrzycisk(){
        return cy.get('button#CheckboxConfirmModal-yesBtn')
    }

    zasobyPierwszyPrzycisk(){
        return cy.get('a[title="Zasoby"]').first()
    }

    kopiujDaneDoPozostalychDniPierwszyPrzycisk(){
        return cy.get('button[title="Kopiuj dane do pozostałych dni zdjęciowych"]').first()
    }

    audycjePierwszyPrzycisk(){
        return cy.get('button[title="Audycje"]').first()
    }

    dniTabela(){
        return cy.get('table#daysTable')
    }

    takPopupPrzycisk(){
        return cy.get('#changeModal-yesBtn')
    }

    zaznaczWszystkieAudycjePrzyciskWyboru(){
        return cy.get('th.no-sort>input.selectAllDayCheckboxes[style="transform: scale(1.5); margin-left: 0px;"]')
    }

    audycjaPierwszyPrzyciskWyboru(){
        return cy.get('#AuditionList_0__IsChecked')
    }

    audycjaPopupPrzyciskWyboru(index){
        return cy.get('input.dayCheckBox').eq(index)
    }

    potwierdzAudycjePopupPrzycisk(){
        return cy.get('#AuditionReservationModal-yesBtn')
    }

    tytulPopupEtykieta(){
        return cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title')
    }

    tytulStronyEtykieta(){
        return cy.get('.breadcrumb > .active')
    }

    dodajRezerwacjePrzycisk(){
        return cy.get('.dt-buttons > .glyphicon-plus')
    }

    pustaTabela(){
        return cy.get('.dataTables_empty')
    }

    takZlozPopupPrzycisk(){
        return cy.get('#ConfirmSendToAcceptanceModal-yesBtn')
    }

    wyslijDoRealizacjiTakPrzycisk(){
        return cy.get('#sendToRealizationError-yesBtn')
    }

    rezerwacjeTabela(){
        return cy.get('#sectionTable_table')
    }

    // Metody
    sprawdzPrzekroczenieCzasuZasobow(){
        fWspolne.sprawdzProgressBar()
        cy.get('body').then($body => {
            if ($body.find('button#sendToRealizationError-yesBtn').length > 0) {   
                this.takPrzekazWniosekPopupPrzycisk().click()
                fWspolne.sprawdzProgressBar()
            } else {
                cy.log('Nie przekroczono czasu zasobów')
            }
        })
    }
}

export const e50201 = new E50201()