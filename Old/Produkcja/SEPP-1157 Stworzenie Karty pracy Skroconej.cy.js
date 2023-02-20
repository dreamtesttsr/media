// import dla wykomentowanego kodu
// eslint-disable-next-line no-unused-vars
import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e509 } from '../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy'
import { e50902 } from '../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy'

describe('SEPP-1157 Stworzenie Karty pracy Skróconej', function () {

    it('Stworzenie Karty pracy Skróconej', function () {
    // strona glowna i logowanie
        cy.visit('/').loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // 1. Użyj buttonu "Dodaj kartę pracy"
        cy.log('Krok 1 - Użyj buttonu "Dodaj kartę pracy"')

        cy.get('#progressBar').should('not.be.visible')
        cy.get('.dt-buttons > .btn-success').click()
        //   Otwiera się popup generowania kart pracy.
        cy.get('#workCardGeneratorModal-modalDialog').should('contain', 'Generowanie kart pracy')

        // 2. Użyj buttonu "Wyszukaj".
        cy.log('Krok 2 - Użyj buttonu "Wyszukaj".')

        cy.get('#progressBar').should('not.be.visible')
        cy.get('#FilterDateTo').click().clear()
        cy.get('#generatorSearchBtn').click()
        //   Następujące pola zostają oznaczone ikoną jako wymagające uzupełnienia: Rodzaj karty pracy, Data od, Data do, Wydział. Walidacje się pojawiają w polu z tekstem "Uwaga! wymagane wypełnienie pola X" dla każdej z 4 walidacji.
        // BRAKUJE OZNACZENIA IKONĄ JAKO WYMAGAJACE UZUPŁNIENIA POLA "DATA DO"
        cy.get('#FilterWorkCardTypeId')
            .should(
                'have.attr',
                'data-val-required',
                'Wymagane wypełnienie pola \'Rodzaj karty pracy\'.'
            )
        cy.get('#FilterDepartmentId')
            .should(
                'have.attr',
                'data-val-required',
                'Wymagane wypełnienie pola \'Wydział\'.'
            )
        cy.get('#div_FilterDateFrom').children()
            .should(
                'have.attr',
                'data-val-required',
                'Wymagane wypełnienie pola \'Data od\'.'
            )
        cy.get('#div_FilterDateTo').children()
            .should(
                'have.attr',
                'data-val-required',
                'Wymagane wypełnienie pola \'Data do\'.'
            )

        cy.get(
            '[style="padding: 10px; cursor: pointer; width: 340px; display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 9999; top: 55px; right: 5px; animation-iteration-count: 1;"] > div > [style=""] > [data-notify="message"]'
        ).should('have.text', 'Uwaga! Wymagane wypełnienie pola \'Data do\'.')
        cy.get(
            '[style="padding: 10px; cursor: pointer; width: 340px; display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 9999; top: 108px; right: 5px; animation-iteration-count: 1;"] > div > [style=""] > [data-notify="message"]'
        ).should('have.text', 'Uwaga! Wymagane wypełnienie pola \'Data od\'.')
        cy.get(
            '[style="padding: 10px; cursor: pointer; width: 340px; display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 9999; top: 161px; right: 5px; animation-iteration-count: 1;"] > div > [style=""] > [data-notify="message"]'
        ).should('have.text', 'Uwaga! Wymagane wypełnienie pola \'Wydział\'.')
        cy.get(
            '[style="padding: 10px; cursor: pointer; width: 340px; display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 9999; top: 214px; right: 5px; animation-iteration-count: 1;"] > div > [style=""] > [data-notify="message"]'
        ).should(
            'have.text',
            'Uwaga! Wymagane wypełnienie pola \'Rodzaj karty pracy\'.'
        )

        // 3. Uzupełnij pola i kliknij "Wyszukaj"
        cy.log(
            'Krok 3 - Uzupełnij pola: Rodzaj karty pracy - Skrócona, Data od, Data do, Wydział, ID audycji, Nazwa audycji, Sprzęt i kliknij "Wyszukaj"'
        )

        cy.get('#select2-FilterWorkCardTypeId-container').click()
        cy.get('#select2-FilterWorkCardTypeId-results > :nth-child(2)')
            .should('contain', 'Skrócona')
            .click()
        e50902.wydzialLista().select('Wydział postprodukcji (technika postprodukcji)', {force: true})
        cy.get('.select2-selection__choice').should('have.attr', 'title', 'Wydział postprodukcji (technika postprodukcji)')
        // podstawowa wersja (wymaga wielu danych testowych)
        // const pastDate = DateTime.now().plus({days:-7}).toFormat('dd.MM.yyyy')
        // cy.get('#div_FilterDateFrom').type(pastDate)
        // cy.get('#div_FilterDateTo', { timeout: 10000 }).type(
        //     DateTime.now().toFormat('dd.MM.yyyy'))
        
        // dodatkowa wersja (konkretne dane)
        cy.get('#div_FilterDateFrom').type('17.01.2022')
        cy.get('#div_FilterDateTo', { timeout: 10000 }).type('19.01.2022')
        cy.get('#FilterAuditionName').type('ALARM (27.02-05.06.2021)')
        cy.get('#generatorSearchBtn').click()
    
        //   Zostaje znaleziona i wyświetlona audycja spełniająca wymagane kryteria. Checkbox wyboru audycji jest automatycznie zaznaczony.
        cy.get(':nth-child(1) > .noExport > .cardGeneratorCheckbox')
            .should('be.visible')
            .and('be.checked')

        // 4. Użyj "Generuj karty pracy"
        cy.log('Krok 4 - Użyj "Generuj karty pracy"')
        cy.get('.noExport > #addWorkCardTypeGenerate')
            .click()
            .should('not.be.checked')
        cy.get(':nth-child(1) > .noExport > .cardGeneratorCheckbox')
            .click()
            .should('be.checked')

        let auditionID
        cy.get('#workCardGeneratorList_table > tbody > tr > td:nth-child(3)')
            .first()
            .invoke('text')
            .then((c) => {
                auditionID = c
            })

        let auditionTitle
        cy.get('#workCardGeneratorList_table > tbody > tr > td.sorting_2')
            .first()    
            .invoke('text')
            .then((c) => {
                auditionTitle = c
            })
            
        cy.get('#generate').should('contain', 'Generuj karty pracy').click()
        //   Pojawia się popup z listą audycji, którym wygenerowano kartę pracy.
        //   Zweryfikuj wysłane dane i odpowiedź serwera. Zamknij popup. Na liście kart pracy jest
        //   karta pracy odpowiadająca kryteriom utworzenia. Dostępne operacje to "P", "E" i "Usuń".
        cy.get('#auditionsModal-modalDialog > .modal-header > .modal-title').should(
            'have.text',
            'Wygenerowane karty pracy dla audycji'
        )
        cy.get('.dtr-control').should(($p) => {
            expect($p).to.have.text(auditionID)
        })
        cy.get('#cardResultTable > tbody > tr > td:nth-child(3)').should(($p) => {
            expect($p).to.have.text(auditionTitle)
        })
        e50902.zamknijPopupPrzycisk().click()

        cy.get('#SapNumber').then((s) => {
            cy.get(s).type(auditionID)
            e509.wyszukajPrzycisk().click()
        })
        fWspolne.sprawdzProgressBar()
        
        e509.przegladajWycenePierwszyPrzycisk().should(
            'have.attr',
            'title',
            'Przeglądaj wycenę'
        )
        e509.edytujWycenePierwszyPrzycisk().should(
            'have.attr',
            'title',
            'Edytuj wycenę'
        )
        e509.anulujKartePracyPierwszyPrzycisk().should(
            'have.attr',
            'title',
            'Anuluj kartę pracy'
        )

        // usuwam kartę pracy aby test był powtarzalny
        e509.anulujKartePracyPierwszyPrzycisk().click()
        cy.get('#confirmBtn').should('be.visible').click()
        cy.get('#modalComment').type('Anulowanie karty')
        cy.get('#rejectModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()
        cy.get('.dt-buttons > .btn-success').should('be.visible')
        cy.get('#progressBar', { timeout: 30000 }).should('not.be.visible')
        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
