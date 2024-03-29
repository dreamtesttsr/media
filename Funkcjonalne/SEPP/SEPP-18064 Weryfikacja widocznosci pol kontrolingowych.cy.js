import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e24 } from '../../../../POM/Planowanie/E24 Ewidencja sprzedazy'
import { e26 } from '../../../../POM/Planowanie/E26 Masowa ewidencja sprzedazy'

describe('SEPP-18064 Weryfikacja widoczności pól kontrolingowych', () => {
    it('Weryfikacja widoczności pól kontrolingowych - produkcyjne', () => {
        cy.log('Krok 1 - Loguję się jako Producent') 
        cy.visit('/')
            .loginProducent()
    
        cy.log('Krok 2 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-18064')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Jestem na ekranie szczegółów porozumienia i klikam Dodaj audycję, a nastepnie sprawdzam widoczność i edytowalność wymaganych pól kontrolingowych')
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 4 - Powracam na ekran szczegółów porozumienia i klikam Edytuj przy jedynej audycji na tym porozumieniu, a nastepnie sprawdzam widoczność i edytowalność wymaganych pól kontrolingowych')
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')

        cy.log('Krok 5 - Powracam na ekran szczegółów porozumienia i klikam Masowa ewidencja sprzedaży, a nastepnie wybieram Dodanie nowych odcinków. Sprawdzam widoczność wymaganych pól kontrolingowych')
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('be.visible')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 6 - Wybieram Edycja istniejących odcinków. Sprawdzam widoczność wymaganych pól kontrolingowych')
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible').and('be.disabled')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 7 - Powracam na ekran szczegółów porozumienia i zmieniam Rodzaj przychodu na PZ oraz usuwam jednostkę współpracującą')
        e26.powrotPrzycisk().click()
        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.jednostkaUslugowaLista().select([], {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 8 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
 
        // Wylogowanie
        cy.logoutUser()
    })

    it('Weryfikacja widoczności pól kontrolingowych - prace przygotowawcze', () => {
        cy.log('Krok 9 - Loguję się jako Producent') 
        cy.visit('/')
            .loginProducent()
    
        cy.log('Krok 10 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-18064')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 11 - Jestem na ekranie szczegółów porozumienia i zmieniam jego rodzaj na prace przygotowawcze, rodzaj przychodu na PW oraz dodaje jednostkę współpracującą CUP')
        e22.rodzajPorozumieniaLista().select('prace przygotowawcze', {force: true})
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        e22.jednostkaUslugowaLista().select('CUP', {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 12 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapUslugowyPoleTekstowe().should('be.visible')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')

        cy.log('Krok 13 - Powracam na ekran szczegółów porozumienia i zmieniam Rodzaj przychodu na PZ oraz usuwam jednostkę współpracującą')
        e26.powrotPrzycisk().click()
        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.jednostkaUslugowaLista().select([], {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 14 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapUslugowyPoleTekstowe().should('be.visible')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('not.exist')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')      

        // Wylogowanie
        cy.logoutUser()
    })

    it('Weryfikacja widoczności pól kontrolingowych - event korporacyjny', () => {
        cy.log('Krok 15 - Loguję się jako Producent') 
        cy.visit('/')
            .loginProducent()
    
        cy.log('Krok 16 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-18064')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 17 - Jestem na ekranie szczegółów porozumienia i zmieniam jego rodzaj na event korporacyjny, rodzaj przychodu na PW oraz dodaje jednostkę usługową CUP')
        e22.rodzajPorozumieniaLista().select('event korporacyjny', {force: true})
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        e22.jednostkaUslugowaLista().select('CUP', {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 18 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e26.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible').and('be.disabled')
        e26.mpkPoleTekstowe().should('be.visible').and('be.disabled')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 19 - Powracam na ekran szczegółów porozumienia i zmieniam Rodzaj przychodu na PZ oraz usuwam jednostkę współpracującą')
        e26.powrotPrzycisk().click()
        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.jednostkaUslugowaLista().select([], {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 20 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        // Wylogowanie
        cy.logoutUser()
    })

    it('Weryfikacja widoczności pól kontrolingowych - kosztorys usług własnych CUP', () => {
        cy.log('Krok 21 - Loguję się jako Producent') 
        cy.visit('/')
            .loginProducent()
    
        cy.log('Krok 22 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-18064')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 23 - Jestem na ekranie szczegółów porozumienia i zmieniam jego rodzaj na kosztorys usług własnych CUP, rodzaj przychodu na PW oraz ustawiam rodzaj usługi na UP')
        e22.rodzajPorozumieniaLista().select('kosztorys usług własnych CUP', {force: true})
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        fWspolne.sprawdzProgressBar()
        e22.rodzajUslugiLista().select('UP - Usługa produkcyjna', {force: true})
        e22.zapiszPrzycisk().click()
        e22.potwierdzZmianeAgencjiPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wylogowanie
        cy.logoutUser()

        cy.log('Krok 24 - Loguję się jako Pracownik agencji CUP') 
        cy.visit('/')
            .loginPracownikAgencjiCUP()

        cy.log('Krok 25 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-18064')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 26 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e24.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible').and('be.enabled')
        e26.mpkPoleTekstowe().should('be.visible').and('be.enabled')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('be.visible').and('be.disabled')
        e26.mpkPoleTekstowe().should('be.visible').and('be.disabled')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 27 - Powracam na ekran szczegółów porozumienia i zmieniam Rodzaj przychodu na PZ')
        e26.powrotPrzycisk().click()
        e22.rodzajPrzychoduLista().select('PZ - Przychody zewnętrzne', {force: true})
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 28 - Ponawiam kroki 3-6')
        // 3
        e22.dodajAudycjePrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('not.exist')
        e24.sapUslugowyPoleTekstowe().should('not.exist')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 4        
        e24.powrotPrzycisk().click()
        e22.edytujAudycjePierwszyPrzycisk().click()
        e24.idAudycjiPoleTekstowe().should('not.exist')
        e24.mpkPoleTekstowe().should('not.exist')
        e24.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e24.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e24.sapProdukcyjnyWewnetrznyPoleTekstowe().should('be.visible')
        e24.sapUslugowyPoleTekstowe().should('be.visible').and('have.attr', 'readonly')
        e24.sapUslugowyWewnetrznyPoleTekstowe().should('be.visible')
        // 5
        e24.powrotPrzycisk().click()
        e22.masowaEwidencjaSprzedazyPrzycisk().click()
        e26.dodanieNowychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.enabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')
        // 6
        e26.edycjaIstniejacychOdcinkowRadio().check()
        e26.idAudycjiPoleTekstowe().should('not.exist')
        e26.mpkPoleTekstowe().should('not.exist')
        e26.idPropozycjiAudycjiPoleTekstowe().should('not.exist')
        e26.sapProdukcyjnyPoleTekstowe().should('be.visible').and('be.disabled')
        e26.sapPropozycjiWewnetrznyPoleTekstowe().should('not.exist')
        e26.sapUslugowyPoleTekstowe().should('not.exist')
        e26.sapUslugowyWewnetrznyPoleTekstowe().should('not.exist')

        cy.log('Krok 29 - Powracam na ekran szczegółów porozumienia i zmieniam jego rodzaj na produkcyjne, rodzaj przychodu na PW oraz ustawiam jednostkę usługową CUP')
        e26.powrotPrzycisk().click()
        e22.rodzajPorozumieniaLista().select('produkcyjne', {force: true})
        e22.rodzajPrzychoduLista().select('PW - Przychody wewnętrzne', {force: true})
        e22.agencjaLista().select('AKFiS', {force: true})
        e22.jednostkaUslugowaLista().select('CUP', {force: true})
        e22.zapiszPrzycisk().click()
        e22.potwierdzZmianeAgencjiPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // Wylogowanie
        cy.logoutUser()
    })
})