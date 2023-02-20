const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e503 } = require('../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji')
const { e501 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka')
const { e502 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly')

describe('SEPP-1081 Pracownik dyspozytury - uprawnienia', function () {

    it('Pracownik dyspozytury - uprawnienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikDyspozytury()

        // Użytkownik przechodzi do ekranu 'Wnioski o przydzielenie zasobów'.==============================================================================================================================================================
        cy.log('Krok 1 -  Przejście do ekranu "Wnioski o przydzielenie zasobów"')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        cy.get('input#HideExecuted').check()
        e501.statusRezerwacjiLista().select('Przekazano do dyspozytury (zamówienie)', {force: true})
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Użytkownik widzie tylko te wnioski które stworzone są do porozumień do których ma dostęp.
        // Użytkownik widzi:
        // - przycisk 'Przeglądaj wniosek'
        cy.get('a[title="Przeglądaj wniosek"]:first()').as('przegladajWniosek')
        cy.get('@przegladajWniosek').should('be.visible').and('have.attr', 'title', 'Przeglądaj wniosek')
        // - przycisk 'Edytuj wniosek'
        cy.get('a[title="Edytuj wniosek"]:first()').as('edytujWniosek')
        cy.get('@edytujWniosek').should('be.visible').and('have.attr', 'title', 'Edytuj wniosek')
        // - przycisk 'Edytuj sekcję wniosku'
        cy.get('a[title="Edytuj sekcję wniosku"]:first()').should('be.visible').and('have.attr', 'title', 'Edytuj sekcję wniosku')
        // - przycisk 'Przegląd sekcji wniosku'
        cy.get('a[title="Przegląd sekcji wniosku"]:first()').should('be.visible').and('have.attr', 'title', 'Przegląd sekcji wniosku')

        // Użytkownik przechodzi do podglądu wybranego wniosku [E502] i rozwija sekcję "Osoby wiodące"..==============================================================================================================================================================
        cy.log('Krok 2 -  Użytkownik przechodzi do podglądu wybranego wniosku [E502] i rozwija sekcję "Osoby wiodące".')
        let idRequest
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(1)').first().invoke('text').then((c) => {
            idRequest = c
        })
        cy.get('@przegladajWniosek').click()
        // Dostępne są przyciski "Historia zmian" i "Powrót".
        cy.get('#main > div > div.clearfix > div > button').as('historiaZmian')
        cy.get('@historiaZmian').should('be.visible').and('contain', 'Historia zmian')
        cy.get('#main > div > div.clearfix > div > span > button').as('powrot')
        cy.get('@powrot').should('be.visible').and('contain', 'Powrót')
        //  Sekcja "Wniosek o przydzielenie zasobów" jest wypełniona danymi odpowiadającymi porozumieniu, z którego wniosek został stworzony. 
        cy.get('#AgreementAuditionName').should('be.visible').and('not.have.value', '')
        cy.get('#AgreementNumber').should('be.visible').and('not.have.value', '')
        cy.get('#OrderingUnitName').should('be.visible').and('not.have.value', '')
        // Sekcja 'Osoby wiodące' zawiera kolumny 'Funkcje w projekcie', 'Imię i nazwisko', 'Telefon' oraz 'e-mail'. Dostępny jest przycisk 'Edycja'.
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('not.be.visible')
        cy.get('#btnCollapseLeadPerson').should('be.visible').click()
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('be.visible').and('have.attr', 'data-title', 'Funkcja w projekcie')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Imię i nazwisko"]').should('be.visible').and('have.attr', 'data-title', 'Imię i nazwisko')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Telefon"]').should('be.visible').and('have.attr', 'data-title', 'Telefon')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="e-mail"]').should('be.visible').and('have.attr', 'data-title', 'e-mail')
        cy.get(':nth-child(1) > .text-center > .showBtnProducerOrDirectorProducer').should('not.exist')
        cy.get('[data-cy="Dane_rezerwacji"]').should('be.visible').and('have.attr', 'title', 'Dane rezerwacji')
        // Sekcja rezerwacje zawiera comboboxy umożliwiające wyszukanie po:
        // Sekcji, Statusie i Miejscu realizacji
        cy.checkingIfTheLocatorIsAContainer('#select2-SectionDefinitionId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-OrderStatusId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-ExecutionPlaceId-container', 'Wybierz...')
        // Można też dokonać wyszukania na podstawie dat.
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateTo')
        // Widoczny jest zaznaczony checkbox "Ukryj zrealizowane".
        cy.get('#HideExecuted').should('be.visible').and('be.checked').uncheck()
        // Dostępne są przyciski:
        // Wyszukaj, Wyczyść filtry wyszukiwania.
        cy.get('#smfSectionFilter > div:nth-child(2) > div.col-lg-12 > div > div > button').should('be.visible').and('have.attr', 'title', 'Wyszukaj').click()
        fWspolne.sprawdzProgressBar()
        cy.get('#smfSectionFilter > div:nth-child(2) > div.col-lg-12 > div > div > a').should('be.visible').and('have.attr', 'title', 'Wyczyść filtry wyszukiwania')
        // Dostępna jest sekcja z danymi rezerwacji, wszystkie wymagane kolumny i informacje są dostępne. Dostępne operacje to "Przegląd rezerwacji" - R, "Zasoby" - Z i "Dane rezerwacji" - P.
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Id. rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Id. rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr odcinka"]').should('be.visible').and('have.attr', 'data-title', 'Nr odcinka')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting_asc').should('be.visible').and('have.attr', 'data-title', 'Data rozpoczęcia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting').should('be.visible').and('have.attr', 'data-title', 'Data zakończenia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Sekcja"]').should('be.visible').and('have.attr', 'data-title', 'Sekcja')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Miejsce realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Miejsce realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible').and('have.attr', 'data-title', 'Status')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Uwagi do rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Uwagi do rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .checkboxClass').should('be.visible').and('have.attr', 'data-title', 'Anulowana?')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .noExport').should('be.visible').and('contain', 'Operacje')

        e502.szczegolyRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Szczegóły rezerwacji')
        e502.zasobyPierwszyPrzycisk().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Zasoby')
        e502.daneRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Dane rezerwacji')
        // Sekcja załączniki jest dostępna.
        cy.get(':nth-child(8) > .fieldsetField').should('be.visible').and('contain', 'Załączniki ')

        // Kliknij na przycisk Historia zmian. ==============================================================================================================================================================
        cy.log('Krok 3 -  Kliknij na przycisk Historia zmian. ')

        cy.get('@historiaZmian').click()

        // Pojawia się popup Historia zmian obiektu. Żadne pole nie jest edytowalne. Identyfikator obiektu odpowiada numerowi wniosku o zasoby. Typ obiektu to "Wniosek o przydzielenie zasobów". Pozostałe dostępne kolumny i dane są zgodne z dokumentacją.         
        cy.get('#historyModal-modalDialog').should('be.visible').and('contain', 'Historia zmian obiektu')
        cy.get('#ObjectType').should('be.visible').and('have.attr', 'readonly')
        cy.get('#ObjectId').should(($p) => {
            expect($p).to.have.value(idRequest)
            expect($p).to.have.attr('readonly')
        })
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderOperationType"]').should('be.visible').and('have.attr', 'data-title', 'Rodzaj operacji')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > .datetime-shortS').should('be.visible').and('have.attr', 'data-title', 'Data operacji')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Użytkownik"]').should('be.visible').and('have.attr', 'data-title', 'Użytkownik')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderItem"]').should('be.visible').and('have.attr', 'data-title', 'Pole')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Stara wartość"]').should('be.visible').and('have.attr', 'data-title', 'Stara wartość')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Nowa wartość"]').should('be.visible').and('have.attr', 'data-title', 'Nowa wartość')
        
        // Kliknij na X w popupie. ==============================================================================================================================================================
        cy.log('Krok 4 -  Kliknij na X w popupie. ')
        cy.get('#historyModal-close').click()
        // Popup z historią zmian został zamknięty.
        cy.get('#historyModal-modalDialog').should('not.exist')

        // Kliknij na przycisk "Powrót". ==============================================================================================================================================================
        cy.log('Krok 5 -  Kliknij na przycisk "Powrót".')
        cy.get('@powrot').click()
        // Użytkownik wraca do głównego ekranu z listą wniosków o zasoby 
        cy.get('.active').should('contain', 'Wnioski o przydzielenie zasobów')

        // Kliknij na przycisk "Edytuj" - E dla tego samego wniosku o zasoby. Rozwiń sekcję "Osoby wiodące". ==============================================================================================================================================================
        cy.log('Krok 6 -  Kliknij na przycisk "Edytuj" - E dla tego samego wniosku o zasoby. Rozwiń sekcję "Osoby wiodące"')
        cy.get('@edytujWniosek').click()
        cy.get('.active').should('contain', 'Wniosek o przydzielenie zasobów')
        // Dostępne są przyciski "Historia zmian", "Zapisz" i "Powrót".
        cy.get('#SaveOrderBtn').should('be.visible').and('contain', 'Zapisz')
        cy.get('#main > div > div.clearfix > div > button.btn.btn-info').should('be.visible').and('contain', 'Historia zmian')
        cy.get('#autoReturnClick').as('powrotK6')
        cy.get('@powrotK6').should('be.visible').and('contain', 'Powrót')
        // Sekcja "Wniosek o przydzielenie zasobów" jest wypełniona danymi odpowiadającymi porozumieniu, z którego wniosek został stworzony. Pole 'Opis' jest edytowalne.
        cy.get('#Description').should('be.visible').and('not.have.attr', 'readonly')
        // Sekcja 'Osoby wiodące' jest rozwinięta, a w niej znajdują się kolumny 'Funkcje w projekcie', 'Imię i nazwisko', 'Telefon' oraz 'e-mail'. Dostępne są przyciski 'Dodaj osobę', 'Podgląd', "Usuń" i "Edycja".
        cy.get('#btnCollapseLeadPerson').click()
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('be.visible').and('have.attr', 'data-title', 'Funkcja w projekcie')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Imię i nazwisko"]').should('be.visible').and('have.attr', 'data-title', 'Imię i nazwisko')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Telefon"]').should('be.visible').and('have.attr', 'data-title', 'Telefon')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="e-mail"]').should('be.visible').and('have.attr', 'data-title', 'e-mail')
        // cy.get('a[title="Dane rezerwacji"]').should('be.visible').and('have.attr', 'title', 'Dane rezerwacji') - przycisk widoczny tylko w trybie podglądu
        cy.get('button.editBtnProducerOrDirector').first().should('be.visible').and('have.attr', 'title', 'Edycja')
        // cy.get(':nth-child(3) > .text-center > span > .removeBtnLeadPerson').should('be.visible').and('have.attr', 'title', 'Usuń') - przycisk widoczny tylko dla wierszy dodanych przez użytkownika

        // Sekcja rezerwacje zawiera comboboxy umożliwiające wyszukanie po:
        // Sekcji, Statusie i Miejscu realizacji. Można też dokonać wyszukania na podstawie dat. Z widoczny jest zaznaczony checkbox "Ukryj zrealizowane".
        cy.checkingIfTheLocatorIsAContainer('#select2-SectionDefinitionId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-OrderStatusId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-ExecutionPlaceId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateTo')
        cy.get('#HideExecuted').should('be.visible').and('not.be.checked')
        // Dostępne są przyciski: "Wyszukaj" i "Wyczyść filtry wyszukiwania". 
        cy.get('button[title="Wyszukaj"]').should('be.visible').and('have.attr', 'title', 'Wyszukaj')
        cy.get('a[title="Wyczyść filtry wyszukiwania"]').should('be.visible').and('have.attr', 'title', 'Wyczyść filtry wyszukiwania')
        // Dostępna jest sekcja z danymi rezerwacji, wszystkie wymagane kolumny i informacje są dostępne. Dostępne operacje to "Dane rezerwacji", "Zasoby", "Przegląd rezerwacji" i "Edycja rezerwacji".
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Id. rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Id. rezerwacji').click()
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr odcinka"]').should('be.visible').and('have.attr', 'data-title', 'Nr odcinka')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Data rozpoczęcia realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Data rozpoczęcia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Data zakończenia realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Data zakończenia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Sekcja"]').should('be.visible').and('have.attr', 'data-title', 'Sekcja')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Miejsce realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Miejsce realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible').and('have.attr', 'data-title', 'Status')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Uwagi do rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Uwagi do rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .checkboxClass').should('be.visible').and('have.attr', 'data-title', 'Anulowana?')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .noExport').should('be.visible').and('contain', 'Operacje')

        cy.get('a[title="Szczegóły rezerwacji"]').first().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Szczegóły rezerwacji')
        e502.zasobyPierwszyPrzycisk().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Zasoby')
        e502.edycjaRezerwacjiPierwszyPrzycisk().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Edycja rezerwacji')
        cy.get('[data-cy="Usun_rezerwacje"]').first().scrollIntoView().should('be.visible').and('have.attr', 'title', 'Usuń rezerwację')
        // Sekcja załączniki jest dostępna. Dostępne są buttony: "Dodaj plik do repozytorium" i "Dodaj link do załącznika".
        cy.get(':nth-child(8) > .fieldsetField').should('be.visible').and('contain', 'Załączniki ')
        cy.get('#btnSelectAttachmentLocal').should('be.visible').and('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        cy.get('#btnSelectAttachmentScanFile').should('be.visible').and('have.attr', 'title', 'Dodaj Link Do Załącznika')

        // Kliknij przycisk powrót. ==============================================================================================================================================================
        cy.log('Krok 7 -  Kliknij przycisk powrót.')
        cy.get('@powrotK6').click()
        // Następuje powrót do ekranu listy wniosków o zasoby. 
        cy.get('.active').should('contain', 'Wnioski o przydzielenie zasobów')

        // Użytkownik przechodzi ekranu 'Zlecenia pracy'  ==============================================================================================================================================================
        cy.log('Krok 8 -  Użytkownik przechodzi ekranu "Zlecenia pracy" ')
        cy.goToMenu('Zlecenia pracy')
        cy.get('#StateOfOrder').select('Oczekujące na akceptację', {force: true})
        cy.get('button[title="Wyszukaj"]').first().click()
        // Użytkownik widzi tylko te zlecenia pracy które są przypisane do jego wydziału.
        // Użytkownik widzi:
        // - przycisk "Przegląd rezerwacji" (na każdym zleceniu) - P
        // - przycisk "Przegląd zlecenia pracy" (na każdym zleceniu) - Z
        // - przycisk "Edycja" - E
        // - przycisk "Akceptacja zlecenia pracy" - A   //nie przy każdym jest
        // - przycisk "Anulacja zlecenia pracy" - N
        fWspolne.sprawdzProgressBar()
        cy.get('#orderList_table > tbody > tr', { timeout: 20000 }).each(() => {
            cy.get('[data-cy="Przeglad_rezerwacji"]').first().should('be.visible').and('have.attr', 'title', 'Przegląd rezerwacji')
            cy.get('.text-center > .btn-purple').first().should('be.visible').and('have.attr', 'title', 'Przegląd zlecenia pracy')
            cy.get('.text-center > .btn-success').first().should('be.visible').and('have.attr', 'title', 'Edycja')
            cy.get('.text-center > .btn-warning').first().should('be.visible').and('have.attr', 'title', 'Anulacja zlecenia pracy')
        })

        // Kliknij przycisk "Przegląd rezerwacji" przy wybranym zleceniu pracy.==============================================================================================================================================================
        cy.log('Krok 9 -  Kliknij przycisk "Przegląd rezerwacji" przy wybranym zleceniu pracy.')
        let agrementNr
        cy.get('tbody > :nth-child(1) > :nth-child(3)').invoke('text').then((c) => {
            agrementNr = c
        })
        cy.get('a[title="Przegląd rezerwacji"]').first().click({force: true})
        // Użytkownik został przeniesiony do ekranu szczegółów rezerwacji [E503.03], w tabeli są dane z numerem i tytułem porozumienia, z którego pochodzi audycja dla której realizowane jest wybrane zlecenie.
        // cy.get('.odd > :nth-child(2)').should('contain', 'P/').and('contain', 'AKFiS')
        cy.get('.odd > :nth-child(3)').should('not.be.empty')
        cy.get('.odd > :nth-child(2)').should(($p) => {
            expect($p).to.have.text(agrementNr)
        })
        // Dostępny jest przycisk: rozwinięcia danych rezerwacji, "Pokaż wniosek o przydzielenie zasobów" - P, "Powrót", "Historia zmian" - H, "Drukuj" i "Drukuj zestawienie sprzętu".
        cy.get('.far').should('be.visible')
        cy.get(':nth-child(6) > .btn-info').as('pokazWniosek')
        cy.get('@pokazWniosek').should('be.visible').and('have.attr', 'title', 'Pokaż wniosek o przydzielenie zasobów')
        cy.get('button.btn.btn-info.return-button').as('powrot')
        cy.get('@powrot').should('be.visible').and('contain', 'Powrót')
        cy.get(':nth-child(6) > .btn-yellow').as('historiaZmian')
        cy.get('@historiaZmian').should('be.visible').and('have.attr', 'title', 'Historia zmian')
        cy.get('[title="Drukuj"]').should('be.visible').and('contain', 'Drukuj')
        cy.get('.btn-purple').as('drukujZestawienie')
        cy.get('@drukujZestawienie').should('be.visible').and('have.attr', 'title', 'Drukuj zestawienie sprzętu')
        // Dostępne jest pole "Rozwiń wszystko".
        cy.get('.all-collapse').as('wszystko')
        cy.get('@wszystko').should('be.visible').and('have.text', 'Rozwiń wszystko')

        // Kliknij w pole "Rozwiń wszystko".==============================================================================================================================================================
        cy.log('Krok 10 -  Kliknij w pole "Rozwiń wszystko".')
        cy.get('@wszystko').click()
        // /Rozwijają się szczegółowe dane rezerwacji. 
        cy.get('[data-title="Nazwa zasobu"]').should('be.visible')
        cy.get('[data-title="Uwagi"]').should('be.visible')
        // Tekst "Rozwiń wszystko" zmienia się na "Zwiń wszystko".
        cy.get('@wszystko').should('be.visible').and('have.text', 'Zwiń wszystko')

        // Kliknij przycisk "Pokaż wniosek o przydzielenie zasobów". ==============================================================================================================================================================
        cy.log('Krok 11 -  Kliknij przycisk "Pokaż wniosek o przydzielenie zasobów". ')
        // var agrementNr = ''
        // cy.get('.odd > :nth-child(2)').invoke('text').then((c) => {
        //     agrementNr = c
        // })
        cy.get('@pokazWniosek').click()
        // Użytkownik jest przeniesiony do ekranu wniosku o zasoby. "ID wniosku" odpowiada danym z ekranu szczegołów rezerwacji.
        cy.get('#AgreementNumber').should(($p) => {
            expect($p).to.have.value(agrementNr)
        })
        // Kliknij Powrót
        cy.get('@powrot').click()
        // Użytkownik wraca do ekranu szczegółów rezerwacji.
        cy.url().should('contain', 'SmfReservationDetailsList/SingleDetailsFromWorkOrderList')

        // Kliknij przycisk "Historia zmian". Kliknij X na popupie. ==============================================================================================================================================================
        cy.log('Krok 12 -  Kliknij przycisk "Historia zmian". Kliknij X na popupie.')
        cy.get('@historiaZmian').click()
        // Pojawia się popup Historia zmian obiektu. Żadne pole nie jest edytowalne. Identyfikator obiektu odpowiada typowi obiektu źródłowego.
        cy.get('#historyModal-modalDialog').should('be.visible').and('contain', 'Historia zmian obiektu')
        cy.get('#ObjectType').should('be.visible').and('have.attr', 'readonly')
        cy.get('#ObjectId').should('be.visible').and('have.attr', 'readonly')
        // Zamknij popup
        cy.get('#historyModal-close').click()

        // Kliknij przycisk "Drukuj zestawienie sprzętu".==============================================================================================================================================================
        cy.log('Krok 13 - Kliknij przycisk "Drukuj zestawienie sprzętu".')
        cy.get('@drukujZestawienie').click()
        // Pojawia się popup z "Drukuj zestawienie sprzętu". Zawiera kolumnę dzień zdjęciowy i checkbox do zaznaczenia wszystkich dni. Domyślnie jest on odznaczony. 
        cy.get('#printEquipmentsReport-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Drukuj zestawienie sprzętu')
        cy.get('[data-title="Dzień zdjęciowy"]').should('be.visible')
        cy.get('[data-body-classname="noExport"] > input').should('be.visible').and('not.be.checked')
        // Są przyciski "Zatwierdź" i "Powrót". 
        cy.get('#printEquipmentsReport-yesBtn').scrollIntoView().as('zatwierdz')
        cy.get('@zatwierdz').should('be.visible').and('contain', 'Zatwierdź')
        cy.get('#printEquipmentsReport-noBtn').scrollIntoView().as('powrotDrukuj')
        cy.get('@powrotDrukuj').should('be.visible').and('contain', 'Powrót')

        // Zaznacz pierwszy checkbox z listy i kliknij "Zatwierdź".
        cy.log('Krok 14 - Zaznacz pierwszy checkbox z listy i kliknij "Zatwierdź"')
        cy.get('#Items_0__Selected').check().should('be.checked')
        cy.get('#Items_0__Selected').uncheck().should('not.be.checked')
        // Użytkownik jest przeniesiony do nowej zakładki. Otwiera się ekran "SZCZEGÓŁY REZERWACJI - ZESTAWIENIE SPRZĘTU". Dane takie jak "Nr. Porozumienia", "Tytuł", "Nazwa zasobu" i "Miejsce realizacji" zgadzają się z danymi ze szczegółów rezerwacji. 
        // brak możliwości przetestowania tego 
        // cy.get('@zatwierdz').click()
        cy.get('@powrotDrukuj').click()

        // Kliknij przycisk "Powrót".
        cy.log('Krok 15 - Kliknij przycisk "Powrót".')
        cy.get('@powrot').click()
        // Użytkownik powraca na ekran listy zleceń pracy
        cy.get('.active').should('contain', 'Zlecenia Pracy')

        // Przejdź do ekranu "Planowania produkcji" [E503].
        cy.log('Krok 16 - Przejdź do ekranu "Planowania produkcji" [E503].')
        cy.goToMenu('Planowanie produkcji')

        // Walidacja widoczności głównych elementów strony. 
        e503.przedzialCzasuPrzycisk().should('be.visible')
        //
        // kroki 17-22 będą testowane manualnie
        //        
        // Kliknij na wybranym nieprzypisanym zasobie osobowym na diagramie.
        // Kliknij w przycisk "Dodaj pracownika".
        // Rozwiń sekcję "Dane rezerwacji".
        // Kliknij przycisk "Pokaż grafik".
        // Użytkownik przechodzi do ekranu Grafiku pracowników [E505].
        // Kliknij w wybranym dniu na grafiku danego pracownika.
        // Użytkownik przechodzi na ekran dyżurów pracowników [E515].

        // wylogowanie
        cy.logoutUser()
    })
})