import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { faker } from '../../../../support/e2e'

describe('SEPP-1175 Dodanie Statusu w Porozumieniu', function () {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const rndStr = faker.lorem.words(3)

    it('Dodanie Statusu w Porozumieniu', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // filtrowanie porozumien po stanie - Robocze
        cy.log('filtrowanie po stanie porozumienia')
        cy.filterAgreementByFilter('Robocze')

        // kliknięcie przycisku Edycja na pierwszym porozumieniu
        cy.log('Kliknij przycisk "Edycja"')
        e20.edycjaPierwszyPrzycisk().click()
        cy.url().should('contain', '/Agreement/Edit')

        // kliknięcie w przycisk Status porozumienia i sprawdzenie widocznosci elementów na otwartym oknie
        cy.log('Krok 1 -  Kliknij przycisk "Status porozumienia"')
        e22.statusPorozumieniaPrzycisk().click()
        cy.get('#content > .modal-header > .modal-title').should('contain', 'Statusy porozumienia')
        cy.get('#IdSource').should('have.attr', 'disabled', 'disabled')
        cy.get('#Number').should('have.attr', 'disabled', 'disabled')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        cy.get('#addStatus').should('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('contain', 'Powrót')

        // uzupełnienie pól i dodanie nowego statusu
        cy.log('Krok 2 -  Uzupełnij pola i dodaj nowy status')
        cy.get('#StatusTypeId').select('Biuro Reklamy', {force: true})
        cy.get('#Notes').type('komentarz testowy 2 ' + rndStr)
        cy.get('#addStatus', { timeout: 10000 }).click()
        fWspolne.komunikat().should('contain', 'Pomyślnie dodano status')

        // sprawdzenie statusu na porozumieniu
        cy.log('Krok 3 -  Sprawdzenie statusu')
        fWspolne.sprawdzProgressBar()
        cy.scrollTo('top')
        cy.get('#statusText').should('contain', dzisiaj + ' - Biuro Reklamy')
        cy.get('#statusHistoryBtn').should('have.attr','data-original-title','Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('contain','Statusy porozumienia')
        cy.get('tbody > :nth-child(1) > .date').should('contain', dzisiaj)
        cy.get('tbody > :nth-child(1) > .breakWord').should('contain', rndStr)

        // zamknięcie popupu i powrót na listę porozumień
        cy.get('#content > .modal-header > .close').click()
        cy.get('#content > .modal-header > .modal-title').should('not.be.visible')
        e22.powrotPrzycisk().click()

        // filtrowanie porozumien po stanie - Zarejestrowane
        cy.log('Krok 4 - filtrowanie po stanie porozumienia')
        cy.filterAgreementByFilter('Zarejestrowane')

        // kliknięcie przycisku Edycja na pierwszym porozumieniu
        cy.log('Krok 5 - Kliknij przycisk "Edycja"')
        cy.get('#agreementList_table > tbody > tr:nth-child(1) > td.text-center.dtfc-fixed-right > a.btn.btn-xs.btn-list.btn-success').should('have.attr', 'title', 'Edycja').click()
        cy.url().should('contain', '/Agreement/Edit')

        // kliknięcie w przycisk Status porozumienia i sprawdzenie widocznosci elementów na otwartym oknie
        cy.log('Krok 6 -  Kliknij przycisk "Status porozumienia"')
        cy.get('#statusHistoryBtn').should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('be.visible').and('contain', 'Statusy porozumienia')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        cy.get('#addStatus').should('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('contain', 'Powrót')

        // uzupełnienie pól i dodanie nowego statusu
        cy.log('Krok 7 -  Uzupełnij pola i dodaj nowy status')
        cy.get('#StatusDate').should('have.value', dzisiaj)
        cy.get('#StatusTypeId').select('BIURO PROGRAMOWE', {force: true})
        cy.get('#Notes').type('komentarz testowy ' + rndStr)
        cy.get('#addStatus').click()
        cy.get('.col-sm-11').should('contain', 'Pomyślnie dodano status')

        // sprawdzenie statusu na porozumieniu
        cy.log('Krok 8 -  Sprawdzenie  statusu')
        cy.get('#progressBar').should('not.be.visible')
        cy.scrollTo('top')
        cy.get('#statusText').should('contain', dzisiaj + ' - BIURO PROGRAMOWE')
        cy.get('.col-sm-11', { timeout: 20000 }).should('not.exist')

        // Wylogowanie
        cy.logoutUser()
    })
})