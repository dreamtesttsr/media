import { fWspolne } from '../../Funkcje wspolne/Funkcje wspolne'

class E50200 {
    
    // Selektory
    wstepnaRezerwacjaPrzycisk(){
        return cy.get('button#resourceReservationBtn').should('contain', 'Wstępna rezerwacja')
    }

    takWstepnaPopupPrzycisk(){
        return cy.get('#ConfirmResourceRegistrationModal-yesBtn')
    }

    zlozZamowieniePrzycisk(){
        return cy.get('button#SendToAcceptanceSection').should('contain', 'Złóż zamówienie')
    }

    takZlozPopupPrzycisk(){
        return cy.get('#ConfirmSendToAcceptanceModal-yesBtn')
    }
    
    odrzucPrzycisk(){
        return cy.get('button#RejectBtn').should('contain', 'Odrzuć')
    }

    wstepnieZaakceptujPrzycisk(){
        return cy.get('button#InitialAcceptedBtn').should('contain', 'Wstępnie zaakceptuj')
    }

    takWstepnieZaakceptujPopupPrzycisk(){
        return cy.get('#InitialAcceptedModal-yesBtn')
    }
    zaakceptujPrzycisk(){
        return cy.get('button#AcceptedBtn').should('contain', 'Zaakceptuj')
    }

    takZaakceptujPrzycisk(){
        return cy.get('#AcceptedModal-yesBtn')
    }

    pokazRozliczenieZasobowPopupPrzycisk(){
        return cy.get('button#CalculatedCostReportModalBtn').contains('Pokaż rozliczenie zasobów')
    }

    takPrzekazWniosekPopupPrzycisk(){
        return cy.get('button#sendToRealizationError-yesBtn')
    }

    modyfikujRezerwacjePrzycisk(){
        return cy.get('a#goToEdit')
    }

    dodajRezerwacjePrzycisk(){
        return cy.get('a#goToNew')
    }

    zaawansowanePrzycisk(){
        return cy.get('button#showFilterButton')
    }

    sekcjaLista(){
        return cy.get('select#SelectedSectionDefinitionId')
    }

    miejsceRealizacjiLista(){
        return cy.get('select#ExecutionPlaceId')
    }

    realizacjiOdData(){
        return cy.get('input#ExecutionDateFrom')
    }

    realizacjiDoData(){
        return cy.get('input#ExecutionDateTo')
    }

    wyszukajPrzycisk(){
        return cy.get('button#searchBtn')
    }

    wyczyscFiltryPrzycisk(){
        return cy.get('button#filterClearButton')
    }

    objasnienieKolorowPrzycisk(){
        return cy.get('button#legendBtn')
    }

    zmianyNiezatwierdzonePrzycisk(){
        return cy.get('button.btn.btn-danger').contains('Zmiany niezatwierdzone').should('contain', 'Zmiany niezatwierdzone')
    }

    kopiujDaneDoPozostalychDniPrzycisk(){
        return cy.get('button[title="Kopiuj dane do pozostałych dni zdjęciowych"]').should('contain', 'Kopiuj')
    }

    zatwierdzKopiowaniePopupPrzycisk(){
        return cy.get('button#copyDaysModal-yesBtn')
    }

    zapiszPrzycisk(){
        return cy.get('button#saveForm').should('contain', 'Zapisz')
    }
    
    powodyModyfikacjiWnioskuPopupPoleTekstowe(){
        return cy.get('textarea#ModificationReasonTb')
    }

    powodOdrzuceniaPopupPoleTekstowe(){
        return cy.get('textarea#JustificationForRejectionTb')
    }

    potwierdzPopupPrzycisk(){
        return cy.get('button#rejectionReasonModal-yesBtn')
    }

    zapiszPopupPrzycisk(){
        return cy.get('button#changeModal-yesBtn').should('contain', 'Zapisz')
    }

    powrotPrzycisk(){
        return cy.get('button.btn.btn-info.return-button').should('contain', 'Powrót')
    }

    dodajZadaniePrzycisk(){
        return cy.get('button#workEventAdd')
    }

    dodajStanowiskoPrzycisk(){
        return cy.get('button#btnPersonAdd')
    }

    stanowiskoPierwszaLista(){
        return cy.get('select[name="PersonRequestListTableInfo.RequestForPersonList[0].PositionId"]')
    }

    szczegolyPozycjiCennikowejPrzycisk(){
        return cy.get('button.pricePositionPopUp')
    }

    liczbaStanPierwszePoleTekstowe(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].Count"]')
    }

    dataRozpoczeciaStanPierwszaData(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].StartDate"]')
    }

    dataZakonczeniaStanPierwszaData(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].EndDate"]')
    }

    godzinaRozpoczeciaStanPierwszaData(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].StartTime"]')
    }

    godzinaZakonczeniaStanPierwszaData(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].EndTime"]')
    }

    uwagiStanPierwszePoleTekstowe(){
        return cy.get('input[name="PersonRequestListTableInfo.RequestForPersonList[0].Comments"]')
    }

    kopiujDatyGodzinyStanPierwszyPrzycisk(){
        return cy.get('button#copyBtnPerson_0')
    }

    kopiujTylkoNiewypelnionePopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Tak, tylko gdy niewypełnione')
    }

    usunStanowiskoPierwszyPrzycisk(){
        return cy.get('button#delbtnPerson_0')
    }

    takPopupPrzycisk(){
        return cy.get('a#confirmBtn').contains('Tak')
    }

    dodajSprzetPrzycisk(){
        return cy.get('button#btnServiceAdd')
    }

    pobierzZKosztorysuSprzetPrzycisk(){
        return cy.get('button#equipmentCostBtn').should('contain', 'Pobierz z kosztorysu')
    }

    takPobierzPopupPrzycisk(){
        return cy.get ('button#SelectingCostLoadingModal-yesBtn')
    }

    takOdrzucPopupPrzycisk(){
        return cy.get('button#RejectionModal-yesBtn')
    }

    zamowienieZewPrzyciskWyboru(){
        return cy.get('input[data-original-title="Zamówienie zewnętrzne"]')
    }

    sprzetPierwszaLista(){
        return cy.get('select[id*="ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0"]').first()
    }

    liczbaUslPierwszePoleTekstowe(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].Count"]')
    }

    dataRozpoczeciaSprzetPierwszaData(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].StartDate"]')
    }

    dataZakonczeniaSprzetPierwszaData(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].EndDate"]')
    }

    godzinaRozpoczeciaSprzetPierwszaData(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].StartTime"]')
    }

    godzinaZakonczeniaSprzetPierwszaData(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].EndTime"]')
    }

    uwagiSprzetPierwszePoleTekstowe(){
        return cy.get('input[name="ServiceAndEquipmentRequestTableInfo.RequestForServiceAndEquipmentList[0].Comments"]')
    }

    kopiujDatyGodzinySprzetPierwszyPrzycisk(){
        return cy.get('button#copyBtnService_0')
    }

    dodajOsobyDlaStandarduPierwszyPrzycisk(){
        return cy.get('button#ObtnService_1')
    }

    zamowienieZewnetrznePierwszyPrzycisk(){
        return cy.get('a[title="Zamówienie zewnętrzne"]').first()
    }

    pokazSzczegolySprzetuPierwszyPrzycisk(){
        return cy.get('button#PbtnService_0')
    }

    usunSprzetPierwszyPrzycisk(){
        return cy.get('button#delbtnService_0')
    }

    tytulAudycjiEtykieta(){
        return cy.get('#ProgramName')
    }

    zapotrzebowanieNaOsobyTabela(){
        return cy.get('#PersonTable')
    }

    zapotrzebowanieNaSprzetTabela(){
        return cy.get('#ServiceTable')
    }

    komunikatEtykieta(){
        return cy.get('[data-notify="message"]')
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

export const e50200 = new E50200()