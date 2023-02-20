import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e501 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka'
import { e502 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly'
import { e50200 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow'
import { e50201 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji'
import { e50212 } from '../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.12 Wybor pozycji cennikowej'

describe('SEPP-1133,1134 - Operacje na rezerwacjach', function () {
    // dodanie 3 rezerwacji
    // przekazanie do dyspozytury 2 rezerwacji
    // 1133-Odrzucenie rezerwacji
    // 1134-Anulowanie rezerwacji
    const rndAudycja = 'TESTY AUTOMATYCZNE 1133, 1134'

    let idRezerwacji1
    let idRezerwacji2
    let idRezerwacji3
    
    it('Dodanie 3 rezerwacji', function () {
        // Strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.goToMenu('Wnioski o przydzielenie zasobów')
        const todayDate = DateTime.now().toFormat('dd.MM.yyyy')
        cy.get('#AuditionName').type(rndAudycja)
        cy.get('#HideExecuted').click().should('not.be.checked')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().click()
        cy.get('.active').should('contain', 'Wniosek o przydzielenie zasobów')

        e502.dodajRezerwacjePrzycisk().click()
        // Otwiera się ekran szczegółów rezerwacji z możliwością wybrania sekcji, dni zdjęciowych i miejsca realizacji. Dostępne są przyciski "Zapisz" i "Powrót" oraz 'Wstępna rezerwacja'.

        cy.get('#saveForm').should('be.visible').and('contain', 'Zapisz').as('zapiszWniosekOPrzydzielenieZasobow')
        e50201.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')

        // Po wypełnieniu dat realizacji w sekcji "Dni zdjęciowe" pojawia sie lista dni objętych rezerwacją. Po wypełnieniu pola "Sekcja", pole "Miejsce realizacji" zostaje automatycznie wypełnione.
        cy.get('#DateFrom').type(todayDate)
        cy.get('#DateTo').type(todayDate)
        cy.get('#OtherRealizationPlace').click()
        cy.get('.dataTables_empty').should('not.exist')
        cy.get('#select2-SectionDefinitionId-container').click()
        cy.get('#select2-SectionDefinitionId-results > :nth-child(1)').should('be.visible').click()
        cy.get('#OtherRealizationPlace').click()
        e50201.miejsceRealizacjiLista().children('option[selected]').should('contain', 'Studio S1')
        cy.get('#select2-RealizationPlaceId-container').click()
        cy.get('#select2-RealizationPlaceId-results > :nth-child(1)').should('be.visible').click()

        // zaznaczam pierwszy dzień zdjęciowy i zapisuję rezerwację
        cy.get('#DayList_0__IsSelected').check()
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()

        // Pojawia się komunikat o pomyślnym zapisaniu rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano szczegóły rezerwacji.').click()

        // Na górze ekranu pojawił się przycisk "Złóż zamówienie", a pole "Id. rezerwacji" wypełniło się nowo wygenerowanym numerem.
        cy.get('#SendToAcceptanceSection').should('be.visible').and('contain', 'Złóż zamówienie')
        cy.get('div.col-lg-2 > #Id').should('not.have.value', '')

        cy.get('.noWrap > .btn-success').should('be.visible').and('have.attr', 'title', 'Zasoby').as('E')
        cy.get('.noWrap > .btn-yellow').should('be.visible').and('have.attr', 'title', 'Audycje').as('A')

        cy.get('@A').click()
        e50201.audycjaPierwszyPrzyciskWyboru().click().should('be.checked')
        cy.get('#AuditionReservationModal-yesBtn').click()

        // Okienko popup się zamyka. Przy wybranym dniu zdjęciowym pojawiają się odpowiednie wartości zgodne z wybraną audycją.
        cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        // cy.get('.odd > :nth-child(2)').should('contain', 'IDA')

        cy.get('@E').click({force: true})

        // Otwiera się ekran przypisania zasobów do dnia zdjęciowego dla wybranej sekcji [E502.00].
        cy.get('.active').should('contain', 'Dzień zdjęciowy')

        // Wypełniam wszystkie pola w obu sekcjach i klikam w przycisk "Zapisz". ==============================================================================================================================================================
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().click()
        e50212.zatwierdzPrzycisk().click()
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Count').should('have.attr', 'value', '1')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartTime').type('18:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndTime').type('22:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Comments').type('test uwagi')
        cy.get('#btnServiceAdd').click()
        cy.get('#select2-ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__SelectedPositionAndCostIds-container').click()
        cy.get('#select2-ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__SelectedPositionAndCostIds-results > :nth-child(1)').should('be.visible').click()
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Count').should('have.attr', 'value', '1')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartDate').should('have.attr', 'value', todayDate)
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__StartTime').type('18:00')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndDate').should('have.attr', 'value', todayDate)
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__EndTime').type('22:00')
        cy.get('#ServiceAndEquipmentRequestTableInfo_RequestForServiceAndEquipmentList_0__Comments').type('test uwagi')

        cy.get('#saveForm').click()
        // Pojawia się komunikat o pomyślnym zapisaniu szczegółów rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano szczegóły rezerwacji.')

        e50200.powrotPrzycisk().should('contain', 'Powrót').click()
        // Następuje powrót na ekran szczegółów rezerwacji z listą dni zdjęciowych [E502.01].
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')
        cy.get('div.col-lg-2 > #Id').then(($a) => {
            idRezerwacji1 = $a[0].getAttribute('value')
        })

        // powrot
        e50201.powrotPrzycisk().click()
        e502.dodajRezerwacjePrzycisk().should('have.attr', 'title', 'Dodaj rezerwację').click()

        // Otwiera się ekran szczegółów rezerwacji z możliwością wybrania sekcji, dni zdjęciowych i miejsca realizacji. Dostępne są przyciski "Zapisz" i "Powrót" oraz 'Wstępna rezerwacja'.
        cy.get('#saveForm').should('be.visible').and('contain', 'Zapisz').as('zapiszWniosekOPrzydzielenieZasobow')
        e50201.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')

        // Po wypełnieniu dat realizacji w sekcji "Dni zdjęciowe" pojawia sie lista dni objętych rezerwacją. Po wypełnieniu pola "Sekcja", pole "Miejsce realizacji" zostaje automatycznie wypełnione.
        cy.get('#DateFrom').type(todayDate)
        cy.get('#DateTo').type(todayDate)
        cy.get('#OtherRealizationPlace').click()
        cy.get('.dataTables_empty').should('not.exist')
        cy.get('#SectionDefinitionId').select('Charakteryzacja', {force:true})
        cy.get('#RealizationPlaceId').select('23', {force:true})
        cy.get('#DayList_0__IsSelected').check()
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()

        // Pojawia się komunikat o pomyślnym zapisaniu rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano szczegóły rezerwacji.').click()

        // Na górze ekranu pojawił się przycisk "Złóż zamówienie", a pole "Id. rezerwacji" wypełniło się nowo wygenerowanym numerem.
        cy.get('#SendToAcceptanceSection').should('be.visible').and('contain', 'Złóż zamówienie')
        cy.get('div.col-lg-2 > #Id').should('not.have.value', '')

        cy.get('.noWrap > .btn-success').should('be.visible').and('have.attr', 'title', 'Zasoby').as('E')
        cy.get('.noWrap > .btn-yellow').should('be.visible').and('have.attr', 'title', 'Audycje').as('A')

        cy.get('@A').click()
        // wybranie audycji bez id propozycji i numerów wewnętrznych
        cy.get('input#AuditionList_2__IsChecked').click().should('be.checked')
        cy.get('#AuditionReservationModal-yesBtn').click()

        // Okienko popup się zamyka. Przy wybranym dniu zdjęciowym pojawiają się odpowiednie wartości zgodne z wybraną audycją.
        cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        // cy.get('.odd > :nth-child(2)').should('contain', 'IDA')

        cy.get('@E').click({force:true})

        // Otwiera się ekran przypisania zasobów do dnia zdjęciowego dla wybranej sekcji [E502.00].
        cy.get('.active').should('contain', 'Dzień zdjęciowy')

        // Wypełniam wszystkie pola w obu sekcjach i klikam w przycisk "Zapisz". ==============================================================================================================================================================
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().click()
        e50212.zatwierdzPrzycisk().click()
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Count').should('have.attr', 'value', '1')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartTime').type('18:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndTime').type('22:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Comments').type('test uwagi')
        cy.get('#saveForm').click()

        // Pojawia się komunikat o pomyślnym zapisaniu szczegółów rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano szczegóły rezerwacji.')

        e50200.powrotPrzycisk().should('contain', 'Powrót').click()

        // Następuje powrót na ekran szczegółów rezerwacji z listą dni zdjęciowych [E502.01].
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')
        cy.get('div.col-lg-2 > #Id').then(($a) => {
            idRezerwacji2 = $a[0].getAttribute('value')
        })

        // Powrót
        e50201.powrotPrzycisk().click()
        e502.dodajRezerwacjePrzycisk().should('have.attr', 'title', 'Dodaj rezerwację').click()

        // Otwiera się ekran szczegółów rezerwacji z możliwością wybrania sekcji, dni zdjęciowych i miejsca realizacji. Dostępne są przyciski "Zapisz" i "Powrót" oraz 'Wstępna rezerwacja'.
        cy.get('#saveForm').should('be.visible').and('contain', 'Zapisz').as('zapiszWniosekOPrzydzielenieZasobow')
        e50201.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')

        // Po wypełnieniu dat realizacji w sekcji "Dni zdjęciowe" pojawia sie lista dni objętych rezerwacją. Po wypełnieniu pola "Sekcja", pole "Miejsce realizacji" zostaje automatycznie wypełnione.
        cy.get('#DateFrom').type(todayDate)
        cy.get('#DateTo').type(todayDate)
        cy.get('#OtherRealizationPlace').click()
        cy.get('.dataTables_empty').should('not.exist')
        cy.get('#select2-SectionDefinitionId-container').click()
        cy.get('#select2-SectionDefinitionId-results > :nth-child(3)').should('be.visible').click()
        cy.get('#OtherRealizationPlace').click()
        e50201.miejsceRealizacjiLista().children('option[selected]').should('contain', 'Studio S1')
        cy.get('#select2-RealizationPlaceId-container').click()
        cy.get('#select2-RealizationPlaceId-results > :nth-child(3)').should('be.visible').click()

        cy.get('#DayList_0__IsSelected').check()
        cy.get('@zapiszWniosekOPrzydzielenieZasobow').click()

        // Pojawia się komunikat o pomyślnym zapisaniu rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano szczegóły rezerwacji.').click()

        // Na górze ekranu pojawił się przycisk "Złóż zamówienie", a pole "Id. rezerwacji" wypełniło się nowo wygenerowanym numerem.
        cy.get('#SendToAcceptanceSection').should('be.visible').and('contain', 'Złóż zamówienie')
        cy.get('div.col-lg-2 > #Id').should('not.have.value', '')

        cy.get('.noWrap > .btn-success').should('be.visible').and('have.attr', 'title', 'Zasoby').as('E')
        cy.get('.noWrap > .btn-yellow').should('be.visible').and('have.attr', 'title', 'Audycje').as('A')
        cy.get('@A').click()
        e50201.audycjaPierwszyPrzyciskWyboru().click().should('be.checked')
        cy.get('#AuditionReservationModal-yesBtn').click()

        // Okienko popup się zamyka. Przy wybranym dniu zdjęciowym pojawiają się odpowiednie wartości zgodne z wybraną audycją.
        cy.get('#AuditionReservationModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        // cy.get('.odd > :nth-child(2)').should('contain', 'IDA')
        cy.get('@E').click({force:true})

        // Otwiera się ekran przypisania zasobów do dnia zdjęciowego dla wybranej sekcji [E502.00].
        cy.get('.active').should('contain', 'Dzień zdjęciowy')

        // Wypełniam wszystkie pola w obu sekcjach i klikam w przycisk "Zapisz". ==============================================================================================================================================================
        e50200.dodajStanowiskoPrzycisk().click()
        e50212.zaznaczPozycjeCennikowaPierwszyPrzyciskWyboru().click()
        e50212.zatwierdzPrzycisk().click()
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Count').should('have.attr', 'value', '1')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__StartTime').type('18:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndDate').should('have.attr', 'value', todayDate)
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__EndTime').type('22:00')
        cy.get('#PersonRequestListTableInfo_RequestForPersonList_0__Comments').type('test uwagi')

        cy.get('#saveForm').click()
        // Pojawia się komunikat o pomyślnym zapisaniu szczegółów rezerwacji.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano szczegóły rezerwacji.')

        e50200.powrotPrzycisk().should('contain', 'Powrót').click()
        // Następuje powrót na ekran szczegółów rezerwacji z listą dni zdjęciowych [E502.01].
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')
        cy.get('div.col-lg-2 > #Id').then(($a) => {
            idRezerwacji3 = $a[0].getAttribute('value')
        })
        // powrot
        e50201.powrotPrzycisk().click()
    })

    it('Przekazanie rezerwacji do Dyspozytury', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // Użytkownik jest na ekranie listy wniosków [E501].
        // Istnieje rezerwacja w statusie "Roboczy"
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        cy.get('#AuditionName').type(rndAudycja)
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e501.edytujWniosekPierwszyPrzycisk().should('have.attr', 'title', 'Edytuj wniosek').click()
        fWspolne.sprawdzProgressBar()
        cy.get('#sectionTable_table > tbody > :nth-child(1) > :nth-child(2)').should('be.visible')
        // cy.get('#select2-OrderStatusId-container').should('be.visible').click()
        // cy.get('#select2-OrderStatusId-results > :nth-child(8)').should('contain', 'Roboczy').click()
        // cy.get('.glyphicon-search').first().click()
        // cy.get('#progressBar').should('not.be.visible')
        // cy.get('.auditionCheckBtn').first().click()
        cy.contains('td', idRezerwacji1)
            .parent()
            .within(_$tr => {
                cy.get('.text-center > .auditionCheckBtn')
                    .click()
            })
        cy.get('#SendToAcceptanceSection').click()
        cy.get('#ConfirmSendToAcceptanceModal-yesBtn').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('body').then(($body) => {
            if ($body.find('button#sendToRealizationError-yesBtn').length) {
                cy.get('button#sendToRealizationError-yesBtn').click()
            } 
            cy.log('Nie przekroczono czasu zasobów')
        })

        // Okienko popup zniknęło i pojawił się komunikat o pomyślnym przekazaniu rezerwacji do Dyspozytury.
        fWspolne.komunikat().should('contain', 'Pomyślnie przekazano wniosek do realizacji.')
        cy.get('#StatusName').should('have.attr', 'value', 'Przekazano do dyspozytury (zamówienie)')

        // klikniecie Powrót i wejście do drugiej rezerwacji
        e50201.powrotPrzycisk().click()
        cy.contains('td', idRezerwacji2)
            .parent()
            .within( () => {   // _$tr
                cy.get('.text-center > .auditionCheckBtn')
                    .click()
            })

        // złożenie rezerwacji wstępnej
        e50201.wstepnaRezerwacjaPrzycisk().click()
        cy.get('#ConfirmResourceRegistrationModal-body').should('be.visible').and('contain.text', 'Złożenie rezerwacji wstępnej nie jest równoznaczne z jej realizacją. Wniosek podlega weryfikacji przez Dział Dyspozytury. Proszę oczekiwać na decyzję Działu Dyspozytury.')
        cy.get('button#ConfirmResourceRegistrationModal-yesBtn').click()
        /* wyłączone do czasu wejscia nowego toku produkcji (NTP)
        // wyświetlenie walidacji o braku id propozycji i numerów wewnętrznych
        cy.get('#AuditionError-modalDialog').should('be.visible')
        cy.get('#AuditionErrorContainer').should('contain.text', 'wskazano audycję, która nie ma uzupełnionego nr SAP (ID propozycji audycji, SAP produkcyjny wewnętrzny, SAP jednostki usługowej wewnętrzny). Proszę uzupełnić dane i spróbować ponownie przekazać wniosek do dyspozytury.')
        cy.get('button#AuditionError-noBtn').contains('OK').click()
        */
        // zmieniam audycję na taką, która posiada id propozycji audycji oraz numery wewnętrzne
        e50201.audycjePierwszyPrzycisk().click()
        cy.get('#auditionList > tbody').should('be.visible').and('have.prop', 'childElementCount', 3)
        e50201.zaznaczWszystkieAudycjePrzyciskWyboru().dblclick()
        e50201.audycjaPierwszyPrzyciskWyboru().click().should('be.checked')
        e50201.potwierdzAudycjePopupPrzycisk().click()
        
        /* do odblokowania po uruchomieniu NTP
        // Ponownie składam rezerwację wstępną
        e50201.wstepnaRezerwacjaPrzycisk().click()
        cy.get('button#ConfirmResourceRegistrationModal-yesBtn').click()
        */

        /*
        cy.get('#ConfirmSendToAcceptanceModal-yesBtn').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('body')
            .then(($body) => {
                if ($body.find('#sendToRealizationError-yesBtn').length) {
                    cy.get('#sendToRealizationError-yesBtn').click()
                } 
                cy.log('Nie przekroczono czasu zasobów')
            })
            */
        // Okienko popup zniknęło i pojawił się komunikat o pomyślnym przekazaniu rezerwacji wstępnej do Dyspozytury.
        fWspolne.komunikat().should('contain', 'Zapisano zmiany')
        cy.get('#StatusName').should('have.attr', 'value', 'Przekazano do dyspozytury (rezerwacja wstępna)')
    })

    it('1133 - Odrzucenie rezerwacji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        cy.goToMenu('Wnioski o przydzielenie zasobów')
        // Użytkownik jest na ekranie listy wniosków [E501].
        // Istnieje rezerwacja w statusie "Przekazany do Dyspozytury"
        cy.get('#AuditionName').type(rndAudycja)
        cy.get('#HideExecuted').click().should('not.be.checked')
        e501.zaaawansowanePrzycisk().click()
        cy.get('#select2-OrderStatusId-container').click()
        cy.get('#select2-OrderStatusId-results > :nth-child(5)').should('contain', 'Przekazano do dyspozytury (zamówienie)').click()
        e501.zaaawansowanePrzycisk().click()
        e501.wyszukajPrzycisk().first().click()
        fWspolne.sprawdzProgressBar()

        // Kliknij w przycisk "Edytuj wniosek" (E) przy wniosku w statusie "Przekazany do Dyspozytury".
        cy.log('Krok 1 -  Kliknij w przycisk "Edytuj wniosek" (E)  przy wniosku w statusie "Przekazano do dyspozytury".')
        e501.edytujWniosekPierwszyPrzycisk().should('have.attr', 'title', 'Edytuj wniosek').click()

        // Nastąpiło przejście na ekran z listą rezerwacji [E502] zawierającą kolumnę "Status"
        cy.url().should('contain', '/OrderDetails/Edit')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible')

        // Przy wybranej rezerwacji w statusie "Przekazany do Dyspozytury" kliknij "Edycja rezerwacji" (E).
        cy.log('Krok 2 -  Przy wybranej rezerwacji w statusie "Przekazany do Dyspozytury" kliknij "Edycja rezerwacji" (E).')
        fWspolne.sprawdzProgressBar()
        cy.get('#sectionTable_table > tbody > :nth-child(1) > :nth-child(2)').should('be.visible')
        cy.get('#OrderStatusId').should('be.visible').select('Przekazano do dyspozytury (zamówienie)', {force: true})
        e502.wyszukajPrzycisk().first().click()
        fWspolne.sprawdzProgressBar()
        cy.contains('td', idRezerwacji1)
            .parent()
            .within(_$tr => {
                // cy.get(':nth-child(7)').should('contain', 'Przekazano do dyspozytury')
                cy.get('.text-center > .auditionCheckBtn').scrollIntoView().click({force: true})
            })

        // Nastąpiło przejście na ekran szczegółów rezerwacji [E502.01] 
        cy.get('.breadcrumb > .active').should('contain', 'Dane rezerwacji')
        // z listą dni zdjęciowych oraz dostępnymi przyciskami:        
        // Odrzuć
        // Zaakceptuj
        // Historia zmian
        // Zapisz
        // Powrót
        cy.get('#RejectBtn').should('contain', 'Odrzuć').and('be.visible').as('odrzuc')
        cy.get('#AcceptedBtn').should('contain', 'Zaakceptuj').and('be.visible')
        e50201.historiaZmianPrzycisk().should('contain', 'Historia zmian').and('be.visible')
        cy.get('#saveForm').should('contain', 'Zapisz').and('be.visible')
        e50201.powrotPrzycisk().should('contain', 'Powrót').and('be.visible')

        // Kliknij przycisk "Odrzuć".
        cy.log('Krok 3 -  Kliknij przycisk "Odrzuć".')
        cy.get('@odrzuc').click()
        // Pojawił się popup z prośbą o potwierdzenie operacji i przyciskami "Tak" i "Nie".
        cy.get('#RejectionModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Potwierdzenie operacji')
        cy.get('#RejectionModal-yesBtn').should('be.visible').and('contain', 'Tak')
        cy.get('#RejectionModal-noBtn').should('be.visible').and('contain', 'Nie')
        cy.get('#RejectionModal-yesBtn').click()

        // Wypełnij wymagane pole uzasadnienia i kliknij ponownie przycisk "Potwierdź".
        cy.log('Krok 4 -  Wypełnij wymagane pole z powodem odrzucenia i kliknij przycisk "Potwierdź".')
        cy.get('#JustificationForRejectionTb').type('TEST odrzucenia wniosku SEPP-1133')
        cy.get('#rejectionReasonModal-yesBtn').click()        

        // Okienko popup zniknęło i pojawił się komunikat o poprawnym wykonaniu operacji.
        cy.get('#RejectionModal-modalDialog > .modal-header > .modal-title').should('not.exist')
        fWspolne.komunikat().should('be.visible').and('contain', 'Pomyślnie zapisano szczegóły rezerwacji.')

        // W polu "Status wniosku" pojawiła się wartość "Odrzucony". Liczba cofnięć wniosku wynosi 1.  Zweryfikuj wysłane dane i odpowiedź serwera. 
        cy.get('#StatusName').should('have.attr', 'value', 'Odrzucony (zamówienie)')
        cy.get('#ReturnCount').should('have.attr', 'value', '1')
    })

    it('1134 - Anulowanie rezerwacji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginKierownikProdukcji()

        cy.goToMenu('Wnioski o przydzielenie zasobów')
        // Użytkownik jest na ekranie listy wniosków [E501].
        cy.get('#AuditionName').type(rndAudycja)
        e501.zaaawansowanePrzycisk().click()
        cy.get('#select2-OrderStatusId-container').click()
        cy.get('#select2-OrderStatusId-results > :nth-child(9)').should('contain', 'Roboczy').click()
        e501.zaaawansowanePrzycisk().click()
        e501.wyszukajPrzycisk().first().click()
        cy.get('#progressBar').should('not.be.visible')
        // klikniecie Edytuj wniosek
        e501.edytujWniosekPierwszyPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')
        cy.url().should('contain', '/OrderDetails/Edit')

        // Przy wybranej rezerwacji w statusie "Robocze" kliknij przycisk "Usuń rezerwację".
        cy.log('Krok 1 -  Przy wybranej rezerwacji w statusie "Robocze" kliknij przycisk "Usuń rezerwację".')
        cy.get('#sectionTable_table > tbody > :nth-child(1) > :nth-child(2)').should('be.visible')
        cy.contains('td', idRezerwacji3).parent().within(_$tr => {
            // cy.get(':nth-child(8)').should('contain', 'Roboczy')
            cy.get('.text-center > .btn-danger').scrollIntoView().click()
        })

        // Pojawia się okienko popup z pytaniem o potwierdzenie operacji z przyciskami "Usuń" i "Powrót".
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('contain', 'Uwaga!')
        e502.usunAnulujPopupPrzycisk().should('be.visible').and('have.text', 'Usuń')
        cy.get('#ConfirmModalRemoveReservation-noBtn').should('be.visible').and('have.text', 'Powrót')

        // Kliknij przycisk "Usuń".
        cy.log('Krok 2 -  Kliknij przycisk "Usuń".')
        e502.usunAnulujPopupPrzycisk().click()
        // Okienko popup zniknęło i pojawił się komunikat o poprawnym anulowaniu rezerwacji. Zweryfikuj wysłane dane i odpowiedź serwera. 
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('not.exist')
        fWspolne.komunikat().should('have.text', 'Rezerwacja została usunięta')

        // Przy wybranej rezerwacji w statusie "Przekazany do Dyspozytury" kliknij w przycisk "Usuń rezerwację".
        cy.log('Krok 3 -  Przy wybranej rezerwacji w statusie "Przekazany do Dyspozytury" kliknij w przycisk "Usuń rezerwację".')
        fWspolne.sprawdzProgressBar()
        cy.contains('td', idRezerwacji2).parent().within(_$tr => {
            // cy.get(':nth-child(8)').should('contain', 'Przekazano do dyspozytury')
            cy.get('.text-center > .btn-danger').scrollIntoView().click({ force: true })
        })

        // Pojawia się okienko popup z pytaniem o potwierdzenie operacji z przyciskami "Anuluj" i "Powrót".
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('contain', 'Uwaga!')
        e502.usunAnulujPopupPrzycisk().should('be.visible').and('have.text', 'Anuluj')
        cy.get('#ConfirmModalRemoveReservation-noBtn').should('be.visible').and('have.text', 'Powrót')
        cy.get('#CancellationReason').type('Anulowanie rezerwacji')

        // Kliknij przycisk "Anuluj".
        cy.log('Krok 4 -  Kliknij przycisk "Anuluj".')
        e502.usunAnulujPopupPrzycisk().click()
        
        // Okienko popup zniknęło i pojawił się komunikat o poprawnym anulowaniu rezerwacji. Zweryfikuj wysłane dane i odpowiedź serwera.  
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('not.exist')
        fWspolne.komunikat().should('have.text', 'Rezerwacja została anulowana')
        // Dla wybranej rezerwacji w kolumnie "Anulowana?" pojawił się zaznaczony checkbox.
        fWspolne.sprawdzProgressBar() 
        // cy.contains('td', idRezerwacji2).parent().within($tr => {
        //     cy.get('.checkboxClass > :nth-child(1)').scrollIntoView().should('be.checked')
        // })

        // Przy wybranej rezerwacji w statusie "Odrzucony" kliknij przycisk "Usuń rezerwację".
        cy.log('Krok 5 -  Przy wybranej rezerwacji w statusie "Odrzucony" kliknij przycisk "Usuń rezerwację".')
        cy.contains('td', idRezerwacji1).parent().within(_$tr => {
            // cy.get(':nth-child(8)').should('contain', 'Odrzucony')
            cy.get('.text-center > .btn-danger').scrollIntoView().click({ force: true })
        })
        // Pojawia się okienko popup z pytaniem o potwierdzenie operacji z przyciskami "Anuluj" i "Powrót".
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('contain', 'Uwaga!')
        e502.usunAnulujPopupPrzycisk().should('be.visible').and('have.text', 'Anuluj')
        cy.get('#ConfirmModalRemoveReservation-noBtn').should('be.visible').and('have.text', 'Powrót')
        cy.get('#CancellationReason').type('Anulowanie rezerwacji')

        // Kliknij przycisk "Anuluj".
        cy.log('Krok 6 - Kliknij przycisk "Anuluj".')

        e502.usunAnulujPopupPrzycisk().click()
        // Okienko popup zniknęło i pojawił się komunikat o poprawnym anulowaniu rezerwacji. Zweryfikuj wysłane dane i odpowiedź serwera.  
        cy.get('#ConfirmModalRemoveReservation-modalDialog > .modal-header > .modal-title').should('not.exist')
        fWspolne.komunikat().should('have.text', 'Rezerwacja została anulowana')

        // Dla wybranej rezerwacji w kolumnie "Anulowana?" pojawił się zaznaczony checkbox.
        fWspolne.sprawdzProgressBar()
        cy.contains('td', idRezerwacji2).parent().within(_$tr => {
            cy.get('.checkboxClass > :nth-child(1)').scrollIntoView().should('be.checked')
        })
        cy.contains('td', idRezerwacji1).parent().within(_$tr => {
            cy.get('.checkboxClass > :nth-child(1)').scrollIntoView().should('be.checked')
        })

        // wylogowanie
        cy.log('Krok 7 - Wylogowuje się z systemu')
        cy.logoutUser()
    })
})