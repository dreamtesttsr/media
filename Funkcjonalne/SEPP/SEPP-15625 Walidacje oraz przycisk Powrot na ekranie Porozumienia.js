import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e25 } from '../../../../POM/Planowanie/E25 Kosztorysy'
import { e200 } from '../../../../POM/Audycje/E200 Audycje'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'

describe('SEPP-15625 Walidacje oraz przycisk Powrót na ekranie Porozumienia', () => {

    it('Przycisk Powrót na ekranie porozumienia', () => {
        cy.log('Krok 1 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()
        
        cy.log('Krok 2 - Jestem na ekranie listy kosztorysów i przechodzę do ekranu szczegółów Porozumienia')
        cy.goToMenu('Kosztorysy')
        e25.edycjaPorozumieniaPierwszyPrzycisk().click()

        cy.log('Krok 3 - Jestem na ekranie szczegółów Porozumienia i wracam do ekranu listy kosztorysów')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.sprawdzURL()

        cy.log('Krok 4 - Jestem na ekranie listy Porozumień i przechodzę do ekranu szczegółów Porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('TEST-15625')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        let nazwaAudycji
        cy.get('#agreementList_table > tbody > tr > td:nth-child(6)').invoke('text').then((c) => {
            nazwaAudycji = c
        })
        e20.edycjaPierwszyPrzycisk().click()

        cy.log('Krok 5 - Jestem na ekranie szczegółów Porozumienia i sprawdzam walidację zmiany celu kosztorysu')
        e22.celKosztorysuLista().select('[P] Kosztorys planowany bez kosztorysu usługowego', {force: true})
        e22.zapiszPrzycisk().click()
        cy.get('.validation-summary-errors.text-danger').contains('Kosztorys zawiera koszty CUP. Należy wskazać cel uwzględniający kosztorys usługowy.')

        cy.log('Krok 6 - Jestem na ekranie szczegółów Porozumienia i sprawdzam walidację kopiowania kosztorysu, na którym są koszty CUP')
        e22.kopiujKosztorysPrzycisk().click()
        cy.get('#copyTitleModal-modalDialog').should('be.visible').and('contain', 'Kopiuj kosztorys w porozumieniu')
        cy.get('.mb-3>.form-group').should(($p) => {
            expect($p).to.contain.text(nazwaAudycji) 
        }) 
        cy.get('#AgreementTitle').should(($p) => {
            expect($p).to.have.value(nazwaAudycji + '(KOPIA)') 
        }) 
        cy.get('select#TitleTargetforCopy').select('[P] Kosztorys planowany bez kosztorysu usługowego', {force: true})
        cy.get('#copyTitleModal-yesBtn').click()
        cy.get('.inputgroup.input-group').should('have.attr', 'data-original-title', 'Kosztorys zawiera koszty CUP. Należy wskazać cel uwzględniający kosztorys usługowy.')
        cy.get('#copyTitleModal-noBtn').click()
        fWspolne.zamknijKomunikatNiezapisaneDane()

        cy.log('Krok 7 - Jestem na ekranie szczegółów Porozumienia i wracam do ekranu listy porozumień')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.sprawdzURL()

        cy.log('Krok 8 - Jestem na ekranie listy Audycji i przechodzę do ekranu szczegółów Porozumienia')
        cy.goToMenu('Audycje')
        e200.edycjaPorozumieniaPierwszyPrzycisk().click()

        cy.log('Krok 9 - Jestem na ekranie szczegółów Porozumienia i wracam do ekranu listy Audycji')
        e22.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e200.sprawdzURL()

        cy.log('Krok 10 - Jestem na ekranie listy kosztorysów i przechodzę do ekranu kosztów planowanych')
        cy.goToMenu('Kosztorysy')
        e25.edycjaKosztorysuPierwszyPrzycisk().click()

        cy.log('Krok 11 - Jestem na ekranie kosztów planowanych i wracam do ekranu listy kosztorysów')
        e23.powrotPrzycisk().click()
        e25.sprawdzURL()

        cy.log('Krok 12 - Jestem na ekranie porozumienia, przechodzę do ekranu edycji porozumienia po czym do kosztów planowanych')
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click()
        e22.kosztyPlanowanePrzycisk().click()

        cy.log('Krok 13 - Jestem na ekranie kosztów planowanych i wracam do ekranu listy porozumień')
        e23.powrotPrzycisk().click()
        e22.sprawdzURL()
        e22.powrotPrzycisk().click()
        e20.sprawdzURL()

        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})