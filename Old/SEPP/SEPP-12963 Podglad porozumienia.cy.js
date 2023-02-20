const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')

describe('SEPP-12963 Podgląd porozumienia', function () {
    it('Podgląd porozumienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // Kliknięcie w przycisk 'Dodaj porozumienie'
        cy.log('Krok 1 - otwarcie ekranu szczegółów porozumienia w trybie podglądu')
        cy.get('#TvAudition').type('TEST PODGLĄDU')
        e20.wyszukajPrzycisk().click()    
        fWspolne.sprawdzProgressBar() 
        let idPorozumienia
        cy.get('#agreementList_table > tbody > tr > td:nth-child(1)').invoke('text').then((id) => {
            idPorozumienia = id
        })
        e20.podgladPierwszyPrzycisk().click()
        cy.get('legend.fieldsetField').first().should(($p) => {
            expect($p).to.contain.text(idPorozumienia) 
        }) 

        // Weryfikacja przycisków
        cy.log('Krok 2 - weryfikacja przycisków na ekranie szczegółów porozumienia')
        cy.get('#statusHistoryBtn').click()
        cy.get('.modal-header').contains('Statusy porozumienia')
        cy.get('#closeBtn').click()
        cy.get('#addProducerRepresentativeBtn').click()
        cy.get('.modal-title').contains('Osoby uprawnione do porozumienia')
        cy.get('#producerRepresentativeModal-noBtn').click()
        cy.get('#showCopyButton').click()
        cy.get('.modal-title').contains('Kopiuj porozumienie')
        cy.get('#agencyForCopyAgreementModal-noBtn').click()
        e22.zablokujPrzycisk().click()
        cy.wait(500)
        cy.get('.flex-fill.m-0>.modal-title').contains('Potwierdzenie operacji').should('be.visible')
        cy.get('button.btn-block.denyBtn').contains('Anuluj').should('be.visible').click()
        cy.get('div#confirmModal').should('not.be.visible')
        cy.get('#reportDropdownMenuLink').click()
        cy.get('#PrintList').should('be.visible').contains('Porozumienie')
        cy.focused().click()
        cy.get('.btn.btn-info').contains('Zamówienia').click()
        cy.get('.active').contains('Zamówienia do porozumienia')
        cy.go('back')
        cy.get('.btn.btn-info').contains('Wynagrodzenia').click()
        cy.get('#wagesFormPartial > div > div.modal-body > div:nth-child(2) > div:nth-child(2) > label', { timeout: 10000 }).contains('WYNAGRODZENIA RAZEM:')
        cy.get('#wagesReturn').click()
        e22.historiaZmianPrzycisk().click()
        cy.get('.modal-title').contains('Historia zmian obiektu').should('be.visible')
        cy.get('#agreementHistoryModal-close').click()
        cy.get('div#agreementHistoryModal-modal').should('not.exist')
        e22.rozliczenieKosztowPrzycisk().click()
        cy.get('.active').contains('Rozliczenie kosztów')
        cy.get('button.btn.btn-info.return-button').click()
        cy.get('a.btn.btn-info.dropdown-toggle').eq(1).should('be.visible').and('contain','Produkcja')
        /* cypress nie obsługuje pracy z wieloma kartami (prawdopodobnie do usunięcia)
        cy.get('a[href*="/smf/Order/Edit/2000004"]').contains('Wniosek o przydzielenie zasobów').click()
        cy.get('#select2-AgreementId-container').should('have.attr','title', 'TEST PODGLĄDU')
        cy.get('#autoReturnClick').click()
        cy.get('a[href*="/smf/WorkOrder/GetWorkOrderForAgreement?agreementId=2000115"]').contains('Zlecenia pracy').click()
        cy.get('#AgreementNr').should('have.attr','value', 'P/2542/AKFiS/2021')
        cy.go('back')
        cy.get('a[href*="/smf/WorkCard/GetWorkCardForAgreement?agreementId=2000115"]').contains('Karty pracy').click()
        cy.get('#AgreementNr').should('have.attr','value', 'P/2542/AKFiS/2021')
        cy.go('back')
        */

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})