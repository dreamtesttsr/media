const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50901 } = require('../../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy')

describe('SEPP-1188 Edycja wyceny karty pracy', function () {
    const idWorkCard = '2000003'
    it('Edycja wyceny karty pracy', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginOperatorKartPracyNadzor()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // Użytownik wyszukuje wybraną kartę na liście.
        cy.log('Krok 1 - Użytownik wyszukuje wybraną kartę na liście.')
        cy.get('#WorkCardId').type(idWorkCard)
        e509.rodzajKartyLista().select('Honoracyjna', {force: true})
        e509.zaawansowanePrzycisk().click()
        e509.statusZleceniaPracyLista().select('W trakcie wyceny', {force: true})
        e509.zaawansowanePrzycisk().click()
        e509.wyszukajPrzycisk().click()
        cy.get('#progressBar').should('not.be.visible')

        // Przy wybranej karcie znajdują sie przyciski P, E, K i U.
        e509.przegladajWycenePierwszyPrzycisk().should('have.attr', 'title', 'Przeglądaj wycenę')
        e509.edytujWycenePierwszyPrzycisk().should('have.attr', 'title', 'Edytuj wycenę').as('edytujKartePracy')
        // cy.get('.noWrap > .btn-danger').should('have.attr', 'title', 'Anuluj kartę pracy') // tylko z rolą 35

        // Użytkownik klika w przycisk 'E' przy wybranej karcie pracy.
        cy.log('Krok 2 - Użytkownik klika w przycisk "E" przy wybranej karcie pracy.')
        cy.get('@edytujKartePracy').click()
        // Następuje przejście na ekran wyceny danej karty pracy [E509.01].
        cy.get('.active').should('contain', 'Szczegóły karty pracy')
        // Na ekranie znajdują się nastepujące pola:
        // a) Sekcja główna:
        // - Identyfikator
        cy.get('.col-lg-9 > #Id').should('be.visible')
        // - Rodzaj
        cy.get('#WorkCardTypeString').should('be.visible')
        // - Wydział
        cy.get('.select2-selection__rendered').should('be.visible')
        // - Status karty
        cy.get('#WorkCardStatus').should('be.visible')
        // - Za okres od-do
        cy.get('#DateFrom').should('be.visible')
        cy.get('#DateTo').should('be.visible')
        // - Kod usługi (przycisk)
        cy.get('#ServiceCodeName').should('be.visible')
        e50901.kodUslugiPrzycisk().should('be.visible')
        // - Podstawa wyceny (przycisk)
        cy.get('#ValuationBasisIName').should('be.visible')
        e50901.podstawaWycenyPrzycisk().should('be.visible')
        // - Wersja karty
        cy.get('#WorkCardVersion').should('be.visible')
        // - Data wygenerowania
        cy.get('#GeneratedDate').should('be.visible')
        // - Wygenerował
        cy.get('#GeneratedPerson').should('be.visible')
        // - Data wydrukowania
        cy.get('#PrintedDate').should('be.visible')
        // - Wydrukował
        cy.get('#PrintedPerson').should('be.visible')
        // b) Wykaz osób:
        // lista zleceń pracy z następującymi kolumnami:
        // - Lp
        cy.get('#personTable > thead > tr > :nth-child(2)').should('be.visible').and('contain', 'Lp.')
        // - Wydział
        cy.get('#personTable > thead > tr > :nth-child(3)').should('be.visible').and('contain', 'Wydział')
        // - SAP prod./usł.
        cy.get('#personTable > thead > tr > :nth-child(4)').should('be.visible').and('contain', 'SAP prod./usł.')
        // - Nr odcinka
        cy.get('#personTable > thead > tr > :nth-child(5)').should('be.visible').and('contain', 'Nr odcinka')
        // - Tytuł
        cy.get('#personTable > thead > tr > :nth-child(6)').should('be.visible').and('contain', 'Tytuł')
        // - Imię i nazwisko
        cy.get('#personTable > thead > tr > :nth-child(7)').should('be.visible').and('contain', 'Imię i nazwisko')
        // - Rodzaj umowy
        cy.get('#personTable > thead > tr > :nth-child(8)').should('be.visible').and('contain', 'Rodzaj umowy')
        // - Funkcja
        cy.get('#personTable > thead > tr > :nth-child(9)').should('be.visible').and('contain', 'Funkcja')
        // - Od
        cy.get('#personTable > thead > tr > :nth-child(10)').should('be.visible').and('contain', 'Od')
        // - Do
        cy.get('#personTable > thead > tr > :nth-child(11)').should('be.visible').and('contain', 'Do')
        // - Czas pracy
        cy.get('#personTable > thead > tr > :nth-child(12)').should('be.visible').and('contain', 'Czas pracy')
        // - Stawka z kosztorysu
        cy.get('#personTable > thead > tr > :nth-child(13)').should('be.visible').and('contain', 'Stawka z kosztorysu')
        // - Status
        cy.get('#personTable > thead > tr > :nth-child(14)').should('be.visible').and('contain', 'Status')
        // - KUP (lista)
        cy.get('#personTable > thead > tr > :nth-child(15)').should('be.visible').and('contain', 'KUP')
        // - Kwota (checkbox+pole kwotowe)
        cy.get('#personTable > thead > tr > :nth-child(16)').should('be.visible').and('contain', 'Kwota')
        // - Pobierz stawki z kosztorysu (przycisk)
        cy.get('#getPersonPrices').should('be.visible').and('contain', 'Pobierz stawki z kosztorysu')
        // c) Wykaz sprzętów (jeśli znajdują się na karcie):
        // lista sprzętów z następującymi kolumnami:
        // - Wydział
        // - SAP prod./usł.
        // - Tytuł
        // - Kod SAP
        // - Nazwa
        // - Od 
        // - Do
        // - Czas pracy
        // - Stawka z kosztorysu
        // - Liczba
        // - Koszt (checkbox+pole kwotowe)
        // - Koszt po rabacie
        // - Pobierz kwoty z cennika (przycisk)

        // Użytkownik odznacza jednego z checkboxów na wykazie osób
        cy.log('Krok 3 - Użytkownik odznacza jednego z checkboxów na wykazie osób')
        cy.get('#PersonList_0__Cost_checkbox').click()
        // W kolumnie 'Kwota' znika wyświetlana wartość dla tego zlecenia pracy.
        cy.get('#PersonList_0__Cost').should('not.be.visible')

        // Użytkownik ponownie zaznacza checkboxa.
        cy.log('Krok 4 - Użytkownik ponownie zaznacza checkboxa')
        cy.get('#PersonList_0__Cost_checkbox').click({force: true})
        // W kolumnie 'Kwota' ponownie wyświetla się wartość dla tego zlecenia pracy w kwocie równej 0,00 zł.
        cy.get('#PersonList_0__Cost').should('be.visible')
        cy.get('#PersonList_0__Cost-hidden').should('have.value', '0')

        // Użytkownik klika w przycisk 'Pobierz stawki z kosztorysu'.
        cy.log('Krok 5 - Użytkownik klika w przycisk "Pobierz stawki z kosztorysu".')
        e50901.pobierzStawkiZKosztorysuPrzycisk().click()
        cy.wait(1000)

        // Pojawia się popup z pytaniem o potwierdzenie operacji.
        cy.get('.flex-fill.m-0>.modal-title').should('be.visible').and('contain', 'Potwierdzenie operacji')

        // Użytkownik potwierdza.
        cy.log('Krok 6 - Użytkownik potwierdza')
        e50901.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Popup się zamyka ale wartość wyceny zlecenia się nie zmieniła.
        e50901.potwierdzPopupPrzycisk(':hidden')
        e50901.anulujPopupPrzycisk(':hidden')
        cy.get('div#confirmModal').should('not.be.visible')
        cy.get('#PersonList_0__Cost-hidden').should('have.value', '0')

        // Użytkownik odznacza checkboxa dla tej pozycji i ponownie klika w przycisk 'Pobierz stawki z kosztorysu'.
        cy.log('Krok 7 - Użytkownik odznacza checkboxa dla tej pozycji i ponownie klika w przycisk "Pobierz stawki z kosztorysu".')
        cy.get('#PersonList_0__Cost_checkbox').click({force: true})
        e50901.pobierzStawkiZKosztorysuPrzycisk().click()
        
        // Pojawia się popup z pytaniem o potwierdzenie operacji.
        cy.get('#confirmModal > .modal-content > .modal-header > .modal-title').should('be.visible').and('contain', 'Potwierdzenie operacji')   
        
        // Użytkownik potwierdza.
        cy.log('Krok 8 - Użytkownik potwierdza')
        e50901.potwierdzPopupPrzycisk(':visible').should('be.visible').then((button) => {     
            cy.wrap(button).click()
            fWspolne.sprawdzProgressBar()
        })
        
        // Wartość kwoty wyceny zlecenia ponownie się wyświetla zgodnie ze stawką z kosztorysu.
        cy.get('div#confirmModal > .modal-content').should('not.be.visible')
        e50901.potwierdzPopupPrzycisk(':hidden')
        e50901.anulujPopupPrzycisk(':hidden')
        cy.get('#PersonList_0__Cost-hidden').should('not.have.value', '0')

        // Użytkownik klika w przycisk 'Zapisz'.
        cy.log('Krok 9 - Użytkownik klika w przycisk "Zapisz".')
        cy.get('#save').click()
        // Nastapił powrót na ekran listy kart pracy[E509].
        cy.get('.active').should('contain', 'Karty pracy')

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
