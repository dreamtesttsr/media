import { DateTime } from 'luxon'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { faker } from '../../../../support/e2e'

describe('SEPP-12955 Dodanie porozumienia PZ', function () {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const zaMiesiac = DateTime.now().plus({days:30}).toFormat('dd.MM.yyyy')
    const rndStr = faker.lorem.words(3)
    it('Dodanie porozumienia PZ', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        // przejście do zakładki Porozumienia
        cy.goToMenu('Porozumienia')

        // Kliknięcie w przycisk 'Dodaj porozumienie'
        cy.log('Krok 1 - otwarcie ekranu do dodawania porozumień')
        cy.get('button[title="Dodaj porozumienie"]').click()   

        // Sprawdzenie czy wszystkie pola się poprawnie wyświetliły a w pole Producent jest automatycznie wypełnione nazwą użytkownika testowego
        cy.log('Krok 2 - sprawdzenie poprawności pól')
        e22.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        cy.get('#AgreementReturn').should('be.visible').and('contain', 'Powrót')
        cy.get('#AgrementNrTextBox').should('be.visible').and('have.prop', 'readOnly', true )
        cy.get('#InternalNr').should('be.visible')
        cy.get('#CreateDate').should('be.visible')
        cy.get('#TvAudition').should('be.visible')
        cy.get('#select2-OrganizationUnitId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-OrganizationUnitId-container','Wybierz jednostkę zamawiającą')
        cy.get('#select2-AgencyId-container').should('be.visible').and('have.attr', 'data-original-title', 'AKFiS' )
        cy.get('#select2-ProducerId-container').should('be.visible').and('have.attr', 'data-original-title', 'test_user_2' )
        cy.get('#select2-EditorialOfficeId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-EditorialOfficeId-container','Wybierz redakcję zamawiającą')
        cy.get('#CooperatingUnitsId').should('be.visible').and('have.attr','data-placeholder', 'Wybierz...')
        cy.get('#select2-SupervisingUnitId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-SupervisingUnitId-container','Wybierz jednostkę nadzorującą produkcję')
        e22.rodzajPrzychoduLista().should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-IncomeTypeId-container','Wybierz rodzaj przychodu')
        e22.rodzajUslugiLista().should('be.visible')
        cy.get('#select2-PaymentTypeId-container').should('be.visible')
        cy.checkingIfTheLocatorIsAContainer('#select2-PaymentTypeId-container','Wybierz rodzaj płatności')
        cy.get('#ProductionMode').should('be.visible')
        cy.get('#div_FastTrackConsentDate').should('be.visible')
        cy.get('#IsTripartiteAgreement').should('be.visible').and('have.prop', 'disabled', true )
        cy.get('#ProductionModel').should('be.visible')
        cy.get('#IsCinemaFunds').should('be.visible').and('not.to.be.checked')
        cy.get('#ValueOfCinemaFunds').should('be.visible').and('have.attr', 'value', '0,00' )

        // Wypełnienie pól
        cy.log('Krok 3 - wypełnienie pól')
        e22.rodzajPorozumieniaLista().select('produkcyjne', {force: true})
        cy.get('#InternalNr').type('007wew')
        cy.get('#CreateDate').type(dzisiaj)
        cy.get('#TvAudition').type('test pz: ' + rndStr)
        cy.get('#select2-OrganizationUnitId-container').click()
        cy.get('#select2-OrganizationUnitId-results').contains('Agencja Kreacji Filmu i Serialu').click()
        e22.jednostkaUslugowaLista().select('CUP', {force: true})
        cy.get('#select2-SupervisingUnitId-container').click()
        cy.get('#select2-SupervisingUnitId-results').contains('Dział Kreacji i Rozwoju Form Dokumentalnych (AKPDiAS)').click()
        cy.get('#select2-EditorialOfficeId-container').click()
        cy.get('#select2-EditorialOfficeId-results', {timeout:3000}).contains('<N/D>').click()
        e20.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        /*     
        let wartosci = ['PW', 'UP', 'UF', 'UR', 'PZ', 'UO', 'UT'], aktualnaWartosc = '', ileZnaleziono = 0, ileWartosci = wartosci.length
        e22.rodzajPrzychoduLista().find('option').each((opcja) => {
            if(opcja.text() != ''){
                aktualnaWartosc = opcja.text()
                cy.log('opcja - ' + aktualnaWartosc)
                var wartosc = wartosci.find(function (element) {
                    return element == aktualnaWartosc.substring(0, 2);
                });
                if(wartosc != undefined){
                    cy.log('Znaleziona wartosc z listy ' + wartosc + ' (' + (++ileZnaleziono) + ' / ' + ileWartosci + ')')
                }else{
                    cy.log('Nie znaleziono na liście')
                }
            }
        })
*/
        cy.get('#select2-PaymentTypeId-container').click()
        cy.get('#select2-PaymentTypeId-results').contains('Abonament').click()
        cy.get('#ProductionModel').select('W - Wewnętrzny', {force: true})
        cy.get('#NewTitleTarget').select('[U] Kosztorys usługowy (jednostki usługowej)', {force: true})

        // Zapisanie porozumienia i sprawdzenie poprawności danych
        cy.log('Krok 4 - zapisanie porozumienia')
        e22.zapiszPrzycisk().click()
        cy.contains('Pomyślnie dodano porozumienie')
        cy.get('[data-original-title="PZ - Przychody zewnętrzne"]').should('be.visible')
        e22.rodzajPrzychoduLista().should('not.be.disabled')
        e22.rodzajUslugiLista().should('be.disabled')
        cy.get('.fieldsetField').contains('Sprzedaż zewnętrzna')
        cy.get('.fieldsetField').should('not.contain' , 'Opracowanie / licencja')
        cy.get('.fieldsetField').should('not.contain' , 'Usługi w audycjach')
        cy.get('#ToPlanedCosts').contains('Koszty planowane').and('have.prop','disabled', false)
        cy.get('.fieldsetField').contains('Audycje')
        // e22.JSULista().should('not.be.visible') // wycofane        
        cy.get('#ToSellEvidence').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#cpySapIdAudition').should('be.visible').and('have.prop', 'disabled', false)
        cy.get('#cpySapNr').should('be.visible').and('have.prop', 'disabled', false)
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.prop', 'isConnected', true)
        e22.rodzajPrzychoduLista().find('option:selected').should('have.text', 'PZ - Przychody zewnętrzne')
        e22.zapiszPrzycisk().click()
        // eslint-disable-next-line quotes
        cy.get('#agreementForm > div.text-danger.validation-summary-errors').should('contain', "Wymagane wypełnienie pola 'Czas Antenowy Jednostkowy'")
        // eslint-disable-next-line quotes
        cy.get('#agreementForm > div.text-danger.validation-summary-errors').should('contain', "Wymagane wypełnienie pola 'Forma'.")

        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        cy.get('input#CurrentTitle_DurationTime').should('have.attr', 'placeholder', 'gg:mm:ss').and('not.have.value', 'gg:mm:ss').and('not.have.value', '00:00:00').type('00:10:20')
        cy.get('span#select2-CurrentTitle_AuditionTypeId-container > span').then((tekst) => {
            cy.log('wybrana opcja - ' + tekst.text())
            if(tekst.text() == 'Wybierz formę audycji')
                cy.get('select#CurrentTitle_AuditionTypeId').select('KOMENTARZ', {force: true})
        })
        e22.terminRozpoczeciaPoleTekstowe().type(dzisiaj)
        e22.terminOdbioruPoleTekstowe().type(zaMiesiac)
        e22.zapiszPrzycisk().click()
        cy.contains('Pomyślnie zapisano porozumienie')
        e22.rodzajPrzychoduLista().should('not.be.disabled')
        e22.rodzajUslugiLista().should('be.disabled')

        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.zapiszPrzycisk().click()
        cy.contains('Pomyślnie zapisano porozumienie')
        e22.rodzajPrzychoduLista().should('not.be.disabled')
        e22.rodzajUslugiLista().should('be.disabled')

        e22.rodzajPrzychoduLista().select('PM - Przychody mieszane', {force: true})
        e22.zapiszPrzycisk().click()
        cy.contains('Pomyślnie zapisano porozumienie')
        e22.rodzajPrzychoduLista().should('not.be.disabled')
        e22.rodzajUslugiLista().should('be.disabled')

        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.zapiszPrzycisk().click()
        cy.contains('Pomyślnie zapisano porozumienie')
        e22.rodzajPrzychoduLista().should('not.be.disabled')
        e22.rodzajUslugiLista().should('be.disabled')

        // Wylogowanie
        cy.log('Wylogowuje się z systemu')
        cy.logoutUser()
    })
})