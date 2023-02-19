import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e516 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne'
import { e51601 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly'
import { e51604 } from '../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.04 Wartosc zamowienia zewnetrznego'

describe('SEPP-18077 Tworzenie i anulacja zamówienia zewnętrznego', () => {
    it('SEPP-18077 Tworzenie i anulacja zamówienia zewnętrznego', () => {
        cy.log('Krok 1 - Loguję się jako Koordynator Usług')
        cy.visit('/')
            .loginKoordynatorUslug()

        cy.log('Krok 2 - Jestem na ekranie listy zamówień zewnętrznych i klikam Edycja na wybranej rezerwacji')
        cy.goToMenu('Zamówienia zewnętrzne')
        cy.get('th[data-title="Opis"]').first().click()
        fWspolne.sprawdzProgressBar()
        cy.get('th[data-title="Opis"]').first().scrollIntoView().click()
        fWspolne.sprawdzProgressBar()
        e516.edycjaPierwszyPrzycisk().click()
        
        cy.log('Krok 3 - Jestem na ekranie tworzenia zamówienia zewnętrznego i klikam Zapisz, aby zweryfikować wymagalnośc pól')
        e51601.zapiszPrzycisk().click()
        cy.get('#AssortmentGroupId-error').contains('Wymagane wypełnienie pola \'Grupa asortymentowa\'.').parent().should('be.visible')
        cy.get('#OrderDescription-error').contains('Wymagane wypełnienie pola \'Opis zamówienia\'.').parent().should('be.visible')
        cy.get('#RealizationPlace-error').contains('Wymagane wypełnienie pola \'Miejsce realizacji\'.').parent().should('be.visible')
        cy.get('#Accommodation-error').contains('Wymagane wypełnienie pola \'Strona pokrywająca koszty zakwaterowania\'.').parent().should('be.visible')
        cy.get('#AssemblyDismantling-error').contains('Wymagane wypełnienie pola \'Usługa uwzględnia montaż/demontaż\'.').parent().should('be.visible')
        cy.get('#Calculation-error').contains('Wymagane wypełnienie pola \'Sposób kalkulacji oferty\'.').parent().should('be.visible')
        cy.get('#Transport-error').contains('Wymagane wypełnienie pola \'Usługa uwzględnia transport sprzętu\'.').parent().should('be.visible')

        cy.log('Krok 4 - Wypełniam wymagane pole i klikam \'Zapisz\', a następnie weryfikuję poprawność utworzenia zamówienia z odpowiednim statusem')
        e51601.grupaAsortymentowaLista().select('sprzęt zdjęciowy', {force: true})
        e51601.opisZamowieniaPoleTekstowe().type('test opis')
        e51601.miejsceRealizacjiPoleTekstowe().type('test miejsce')
        e51601.stronaPokrywajacaKosztyZakwaterowaniaLista().select('Kontrahent', {force: true})
        e51601.uslugaUwzgledniaMontazDemontazLista().select('tak', {force: true})
        e51601.sposobKalkulacjiOfertyLista().select('godzina', {force: true})
        e51601.uslugaUwzgledniaTransportSprzetuLista().select('tak', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.statusZamowieniaLista().find('option[selected]').contains('W trakcie uzupełniania specyfikacji')

        cy.log('Krok 5 - Zmieniam status zamówienia na \'Opracowano specyfikacją techniczną\' i klikam \'Zapisz\'') 
        e51601.statusZamowieniaLista().select('Opracowano specyfikację techniczną', {force: true})
        e51601.zapiszPrzycisk().click()
        fWspolne.komunikat().should('contain', 'Wymagane uzupełnienie pól \'Wartość szacunkowa\' w sekcji \'Powiązane produkcje TV\'')
        e51601.edycjaWartosciZamowieniaPierwszyPrzycisk().click()
        e51604.wartoscSzacunkowaPoleTekstowe().clear().type('500')
        e51604.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e51601.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        fWspolne.komunikat().should('contain', 'wymagane dołączenie przynajmniej jednego załącznika')
        e51601.idZamowieniaPoleTekstowe().invoke('attr', 'value').then((idZamowienia) => {      
            cy.log('Krok 6 - Powracam na ekran listy zamówień zewnętrznych')
            e51601.powrotPrzycisk().click()

            cy.log('Krok 7 - Anuluję wybrane zamówienie')
            e516.idZamowieniaPoleTekstowe().type(idZamowienia)
            e516.wyszukajPrzycisk().click()
            fWspolne.sprawdzProgressBar()
            e516.anulacjaZamowieniaPierwszyPrzycisk().click()
            e516.powodAnulowaniaZamowieniaPopupPoleTekstowe().type('anuluję zamówienie test')
            e516.potwierdzAnulowaniePopupPrzycisk().click()
            cy.get('#externalOrderList_table > tbody > tr > td:nth-child(11)').should('contain', 'Anulowane')
        })

        // Wyloguj użytkownika
        cy.log('Wylogowuję się')
        cy.logoutUser()
    })
})