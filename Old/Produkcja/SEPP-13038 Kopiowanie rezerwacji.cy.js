const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e501 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka')
const { e502 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly')
const { e50200 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.00 Wniosek o przydzielenie zasobow - wykorzystanie zasobow')
const { e50201 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502.01 Wniosek o przydzielenie zasobow - szczegoly rezerwacji')

describe('SEPP-13038 Kopiowanie rezerwacji', function () {
    it('Kopiowanie rezerwacji', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        cy.log('Krok 1 - otwarcie ekranu Wniosku o przydzielenie zasobów')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        
        cy.log('Krok 2 - wejście w szczegóły wybranego wniosku o zasoby')
        cy.get('#AuditionName').type('TEST PODGLĄDU')
        cy.get('#HideExecuted').click()
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        let nrWniosku
        cy.get('#orderList_table > tbody > tr > td:nth-child(1)')
            .first()
            .invoke('text')
            .then((c) => {
                nrWniosku = c
            })
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        cy.get('.fieldsetField').should(($p)=> {
            expect($p).to.contain.text('Wniosek o przydzielenie zasobów ('+ nrWniosku +')')
        })
        cy.get('.fieldsetField').contains('Rezerwacje')

        cy.log('Krok 3 - skopiowanie wybranej rezerwacji')
        cy.get('#SectionDefinitionId', { timeout: 3000 }).select('Technika studyjna', {force: true})
        cy.get('#HideExecuted').click()
        e502.wyszukajPrzycisk().click()
        cy.get('a[title="Edycja rezerwacji"]').last().click({force: true})
        cy.get('.fieldsetField').contains('Dni zdjęciowe')
        cy.get('#daysTable > tbody > tr.odd').should('not.contain','11111111111111')
        cy.get('#daysTable > tbody > tr.even').should('not.contain', '11111111111111')
        e50201.powrotPrzycisk().click()
        e502.kopiujZapotrzebowaniePierwszyPrzycisk().click()
        // wymagany wait
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('h4.modal-title', { timeout: 3000 }).contains('Kopiowanie rezerwacji')
        cy.get('.label-control').contains('Miejsce kopiowania danych')
        cy.get('#copyReservationList > tbody').contains('Roboczy').should('be.visible')
        cy.get('#Reservations_0__IsSelected').click()
        cy.get('#copyFormModal-yesBtn').contains('Potwierdź').click()
        cy.get('#ConfirmModalCopyReservation2-yesBtn').click()
        cy.get('.col-sm-11.col-sm-3', { timeout: 3000 }).should('contain', 'Rezerwacja skopiowana pomyślnie')

        cy.log('Krok 4 - weryfikacja poprawności operacji kopiowania')
        cy.get('a[title="Edycja rezerwacji"]').last().click({force: true})
        cy.get('.fieldsetField').contains('Dni zdjęciowe')
        cy.get('#daysTable > tbody > tr.odd').should('contain','11111111111111')
        cy.get('#daysTable > tbody > tr.even').should('not.contain', '11111111111111')
        e50201.zasobyPierwszyPrzycisk().click({force: true})
        cy.get('.fieldsetField').contains('Rezerwacje we wniosku')
        cy.get('#PersonTable > tbody').should('have.prop','childElementCount', 1)
        cy.get('#ServiceTable > tbody').should('have.prop','childElementCount', 1)
        cy.get('#daysDiv > div:nth-child(3) > div > button:nth-child(2)').click()
        cy.get('#PersonTable > tbody > tr > td').should('have.text','Brak danych')
        cy.get('#ServiceTable > tbody > tr > td').should('have.text','Brak danych')

        cy.log('Krok 5 - reużywalność danych')
        cy.get('#daysDiv > div:nth-child(3) > div > button:nth-child(1)').click()
        cy.get('#delbtnPerson_0').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('#confirmBtn').click()
        cy.get('#delbtnService_0').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('a#confirmBtn.btn-success.btn-block').click()
        e50200.zapiszPrzycisk().click()
        fWspolne.komunikat().should('contain', 'Pomyślnie zapisano szczegóły rezerwacji')
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('#goToEdit').click()
        e50201.audycjePierwszyPrzycisk().click()
        cy.get('#AuditionList_0__IsChecked').click()
        cy.get('#AuditionReservationModal-yesBtn').click()           

        // wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})
