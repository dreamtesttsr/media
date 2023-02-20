const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50902 } = require('../../../../POM/Produkcja/Karty Pracy/E509.02 Generowanie kart pracy')

describe('SEPP-1153 Stworzenie Karty pracy Honoracyjnej', function () {
    it('Stworzenie Karty pracy Honoracyjnej', function () {
    // strona glowna i logowanie
        cy.visit('/').loginKierownikDyspozytury()

        // otworzenie widoku kart pracy
        cy.goToMenu('Karty pracy')

        // 1. Użyj buttonu "Dodaj kartę pracy"
        //   Otwiera się popup generowania kart pracy.
        cy.log('Krok 1 - Użyj buttonu "Dodaj kartę pracy"')
        cy.get('#progressBar').should('not.be.visible')
        cy.get('.dt-buttons > .btn-success').click()
        cy.get('#workCardGeneratorModal-modalDialog').should('contain', 'Generowanie kart pracy')

        // 2. Użyj buttonu "Wyszukaj".
        //   Następujące pola zostają oznaczone ikoną jako wymagające uzupełnienia: Rodzaj karty pracy,
        //   Data od, Data do, Wydział. Walidacje się pojawiają w polu z tekstem
        //   "Uwaga! wymagane wypełnienie pola X" dla każdej z 4 walidacji.
        cy.log('Krok 2 - Użyj buttonu "Wyszukaj".')
        cy.get('#FilterDateTo').click().clear()
        cy.get('#generatorSearchBtn').click()
        
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

        // 3. Uzupełnij pola: Rodzaj karty pracy - Honoracyjna, Data od, Data do, Wydział, ID audycji,
        //   Nazwa audycji, Stanowisko, Pracownik / współpracownik i kliknij "Wyszukaj"
        //   Zostaje znaleziona i wyświetlona audycja spełniająca wymagane kryteria. Checkbox wyboru audycji jest automatycznie zaznaczony.
        cy.log(
            'Krok 3 - Uzupełnij pola: Rodzaj karty pracy - Honoracyjna, Data od, Data do, Wydział, ID audycji, Nazwa audycji, Stanowisko, Pracownik / współpracownik i kliknij "Wyszukaj"'
        )
        // wypełniam pole rodzaj karty pracy
        cy.get('#select2-FilterWorkCardTypeId-container').click()
        cy.get(
            'body > span > span > span.select2-search.select2-search--dropdown > input'
        ).type('Honoracyjna')
        cy.get('.select2-results__option').should('contain', 'Honoracyjna').click()
        cy.get('#select2-FilterWorkCardTypeId-container')
            .should('include.text', 'Honoracyjna')
            .and('be.visible')

        // wypełniam pole Wydział
        e50902.wydzialLista().select('Wydział techniki studyjnej', {force: true})
        cy.get('li.select2-selection__choice').should('have.attr', 'title', 'Wydział techniki studyjnej')

        // wypełniam pole Data od
        cy.get('#FilterDateFrom').type('01.04.2021')

        // wypełniam pole Data do
        cy.get('#FilterDateTo').type('25.04.2021')

        // wypełniam pole Nazwa audycji
        cy.get('#FilterAuditionName').type('ANIOŁ PAŃSKI')

        // wypełniam pole ID audycji
        cy.get('#FilterAuditionId').type('T1B2101061')

        // wypełniam pole Stanowisko
        cy.get('#select2-ModalPositionId-container').click()
        cy.get(
            'body > span > span > span.select2-search.select2-search--dropdown > input'
        ).type('KTA - inżynier studia')
        cy.get('.select2-results__option')
            .should('contain', 'KTA - INŻYNIER STUDIA')
            .first()
            .click()
        cy.get('#select2-ModalPositionId-container')
            .should('include.text', 'KTA - INŻYNIER STUDIA')
            .and('be.visible')

        // wypełniam pole Pracownik / współpracownik
        cy.get('#workCardGeneratorList_filter > div:nth-child(4) > div:nth-child(1) > span > span.selection > span > ul > li > input').type('Mackiewicz Sławomir (29814)')
        cy.get('#select2-ModalWorkerId-results').click()
        cy.get('#workCardGeneratorList_filter > div:nth-child(4) > div:nth-child(1) > span > span.selection > span > ul > li.select2-selection__choice').should('have.attr', 'title', 'Mackiewicz Sławomir (29814)').and('be.visible')

        // klikam button wyszukaj
        cy.get('#generatorSearchBtn').click()
        // sprawdzam czy checkbox wyboru audycji jest automatycznie zaznaczony
        cy.get('.cardGeneratorCheckbox').should('be.checked')
        // sprawdzam czy została znaleziona audycja spełniająca kryteria wyszukiwania
        cy.get('tbody >tr > td >input').should('be.visible')

        // 4. Użyj "Generuj karty pracy"
        //   Pojawia się popup z listą audycji, którym wygenerowano kartę pracy.
        //   Zweryfikuj wysłane dane i odpowiedź serwera. Zamknij popup. Na liście kart pracy jest
        //   karta pracy odpowiadająca kryteriom utworzenia. Dostępne operacje to "P", "E" i "Usuń".
        cy.log('Krok 4 - Użyj "Generuj karty pracy"')
        cy.get('#generate').click()
        // weryfikuję wysłane dane
        cy.get(
            '#cardResultTable > tbody > tr:nth-child(1) > td:nth-child(3)'
        ).should('contain', 'ANIOŁ PAŃSKI')
        // zamykam popup
        e50902.zamknijPopupPrzycisk().click()
        // sprawdzam czy na liście kart pracy jest karta pracy odpowiadająca kryteriom utworzenia i czy
        // dostępne są operacje "P", "E" i "Usuń".
        e509.wyszukajPrzycisk().click()
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(4)')
            .should('have.text', 'Honoracyjna')
            .and('be.visible')
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(5)')
            .should(
                'have.text',
                'Wydział techniki studyjnej'
            )
            .and('be.visible')
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(6)')
            .should('have.text', 'ANIOŁ PAŃSKI (LUTY-CZERWIEC 2021)')
            .and('be.visible')
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(7)')
            .scrollIntoView()
            .should('have.text', 'T1B2101061, T1B2101062, T1B2101063')
            .and('be.visible')
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(9)')
            .scrollIntoView()
            .should('have.text', '01.04.2021')
            .and('be.visible')
        cy.get('#workCardList_table > tbody > tr:nth-child(1) > td:nth-child(10)')
            .scrollIntoView()
            .should('have.text', '25.04.2021')
            .and('be.visible')
        e509.przegladajWycenePierwszyPrzycisk()
            .should('have.attr', 'title', 'Przeglądaj wycenę')
            .and('be.visible')
        e509.edytujWycenePierwszyPrzycisk()
            .should('have.attr', 'title', 'Edytuj wycenę')
            .and('be.visible')
            
        // usuwam kartę pracy aby test był powtarzalny
        cy.get('a[title="Anuluj kartę pracy"')
            .first()    
            .click()
        cy.get('#confirmBtn').click()
        cy.get('#modalComment').type('Anulowanie karty')
        cy.get('#rejectModal-yesBtn').click()
        fWspolne.sprawdzProgressBar()

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
