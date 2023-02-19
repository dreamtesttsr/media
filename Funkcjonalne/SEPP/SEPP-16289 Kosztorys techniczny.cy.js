import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e22011 } from '../../../../POM/Planowanie/E22.011 Koszty planowane uslug'
import { e224 } from '../../../../POM/Planowanie/E224 Dodawanie i edycja wskaznikow'

describe('SEPP-16289 Kosztorys techniczny', () => {
    it('Kosztorys techniczny', () => {
        cy.log('Krok 1 - Loguję się jako Pracownik agencji CUP')
        cy.visit('/')
            .loginPracownikAgencjiCUP()
            
        cy.log('Krok 2 Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')
        cy.goToMenu('Porozumienia')
        e20.nazwaAudycjiTVPoleTekstowe().type('SEPP-16289')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Weryfikuję istniejące dane porozumienia')
        // Liczba odcinków
        e22.liczbaOdcinkowPoleTekstowe().should('have.attr', 'value', 1)
        // Kwoty cyklu
        e22.cenaSprzedazySumarycznaPoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.wartoscPrawNabytychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.przeniesieniePrawMajatkowychLista().find('option[selected]').contains('Wartość praw podlega amortyzacji')
        e22.wartoscMaterialowArchiwalnychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.wynagrodzeniePracowniczePoleTekstowe().should('have.attr', 'value', '500,00')
        e22.wynagrodzenieWspolpracowniczePoleTekstowe().should('have.attr', 'value', '23000,00')
        e22.wartFinansZInJednPoleTekstowe().should('have.attr', 'value', '0,00')
        // Zestawienie zbiorcze kosztów jednostki TVP S.A.
        e22.pochodneOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '47,50')
        e22.kosztyZewnetrznePoleTekstowe().should('have.attr', 'value', '14757,12')
        e22.kosztyBezposredniePoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.kosztyPosredniePoleTekstowe().should('have.attr', 'value', '0,00')
        e22.kosztyRazemPoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.kosztCalkNettoPoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.vatPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.vatOdPrawPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.cenaSprzedazyPoleTekstowe().should('have.attr', 'value', '29514,24')
        // Wskaźniki
        e22.edytujWskaznikiPrzycisk().click()
        e224.jednostkaRozliczeniowaPoleTekstowe().siblings('input.form-control').should('have.attr', 'value', 'Jedn.Koszt.TVP')
        e224.narzutKosztowPosrPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatPZPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatWKosztachPoleTekstowe().should('have.prop', 'value', '69,74 %')
        e224.zusOdWynagrodzenPoleTekstowe().should('have.prop', 'value', '19,00 %')
        e224.sredniaOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatOdPrawPoleTekstowe().should('have.prop', 'value', '23,00 %')
        e224.powrotPrzycisk().click()
        // Usługi w audycjach
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(7)').should('have.text', '25 500,00 zł')
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(8)').should('have.text', '29 466,74 zł')

        cy.log('Krok 4 - Zmieniam liczbę odcinków i weryfikuję dane porozumienia')
        e22.liczbaOdcinkowPoleTekstowe().clear().type('10')
        e22.zapiszPrzycisk().click()
        e22.potwierdzLiczbeOdcinkowPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Liczba odcinków
        e22.liczbaOdcinkowPoleTekstowe().should('have.attr', 'value', 10)
        // Kwoty cyklu
        e22.cenaSprzedazySumarycznaPoleTekstowe().should('have.attr', 'value', '295142,46')
        e22.wartoscPrawNabytychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.przeniesieniePrawMajatkowychLista().find('option[selected]').contains('Wartość praw podlega amortyzacji')
        e22.wartoscMaterialowArchiwalnychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.wynagrodzeniePracowniczePoleTekstowe().should('have.attr', 'value', '500,00')
        e22.wynagrodzenieWspolpracowniczePoleTekstowe().should('have.attr', 'value', '23000,00')
        e22.wartFinansZInJednPoleTekstowe().should('have.attr', 'value', '0,00')
        // Zestawienie zbiorcze kosztów jednostki TVP S.A.
        e22.pochodneOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '47,50')
        e22.kosztyZewnetrznePoleTekstowe().should('have.attr', 'value', '14757,12')
        e22.kosztyBezposredniePoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.kosztyPosredniePoleTekstowe().should('have.attr', 'value', '0,00')
        e22.kosztyRazemPoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.kosztCalkNettoPoleTekstowe().should('have.attr', 'value', '29514,24')
        e22.vatPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.vatOdPrawPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.cenaSprzedazyPoleTekstowe().should('have.attr', 'value', '29514,24')
        // Wskaźniki
        e22.edytujWskaznikiPrzycisk().click()
        e224.jednostkaRozliczeniowaPoleTekstowe().siblings('input.form-control').should('have.attr', 'value', 'Jedn.Koszt.TVP')
        e224.narzutKosztowPosrPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatPZPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatWKosztachPoleTekstowe().should('have.prop', 'value', '69,74 %')
        e224.zusOdWynagrodzenPoleTekstowe().should('have.prop', 'value', '19,00 %')
        e224.sredniaOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatOdPrawPoleTekstowe().should('have.prop', 'value', '23,00 %')
        e224.powrotPrzycisk().click()
        // Usługi w audycjach
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(7)').should('have.text', '25 500,00 zł')
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(8)').should('have.text', '29 466,74 zł')

        cy.log('Krok 5 - Klikam przycisk K przy jedynej pozycji w sekcji Usługi w audycjach i sprawdzam poprawność wyświetlonego ekranu')
        e22.edytujKosztyPlanowanePierwszyPrzycisk().click()
        e22011.sprawdzWidok()

        cy.log('Krok 6 - Dodaję nowy koszt i weryfikuję poprawność dodanych danych')
        e22011.uslugaProduktLista().select('RTES - operator grafiki', {force: true})
        e22011.jednostkaObliczeniowaLista().select('dzień zdjęciowy', {force: true})
        e22011.rodzajZatrudnieniaLista().select('pracownik', {force: true})
        e22011.stawkaZaJednObliczPoleTekstowe().clear().type('750')
        e22011.dodajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#plannedCostAuditionList > tbody').should('contain', 'RTES - operator grafiki -  Prace techniczne i pomocnicze - WYNAGRODZENIA  RAZEM (OSOBY FIZYCZNE, DZIAŁALNOŚĆ GOSPODARCZA) dzień zdjęciowy, Jedn.Koszt.TVP, pracownik: 1,00 * 1,00 * 750,00 zł = 750,00 zł, VAT: NP')
        e22011.sumaKosztowPlanowanychPoleTekstowe().should('have.attr', 'value', '26250,00')
        e22011.zusOdWynagrodzenPracowniczychPoleTekstowe().should('have.attr', 'value', '190,00')
        e22011.kosztyBezposredniePoleTekstowe().should('have.attr', 'value', '30359,24')
        e22011.cenaSprzedazyPoleTekstowe().should('have.attr', 'value', '30359,24')
        cy.get('#plannedCostCount').should('contain', '13')

        cy.log('Krok 7 - Powracam na ekran szczegółów porozumienia i weryfikuję poprawność wyświetlonych danych')
        e22011.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Liczba odcinków
        e22.liczbaOdcinkowPoleTekstowe().should('have.attr', 'value', 10)
        // Kwoty cyklu
        e22.cenaSprzedazySumarycznaPoleTekstowe().should('have.attr', 'value', '296034,96')
        e22.wartoscPrawNabytychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.przeniesieniePrawMajatkowychLista().find('option[selected]').contains('Wartość praw podlega amortyzacji')
        e22.wartoscMaterialowArchiwalnychPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.wynagrodzeniePracowniczePoleTekstowe().should('have.attr', 'value', '1250,00')
        e22.wynagrodzenieWspolpracowniczePoleTekstowe().should('have.attr', 'value', '23000,00')
        e22.wartFinansZInJednPoleTekstowe().should('have.attr', 'value', '0,00')
        // Zestawienie zbiorcze kosztów jednostki TVP S.A.
        e22.pochodneOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '190,00')
        e22.kosztyZewnetrznePoleTekstowe().should('have.attr', 'value', '15649,62')
        e22.kosztyBezposredniePoleTekstowe().should('have.attr', 'value', '30406,74')
        e22.kosztyPosredniePoleTekstowe().should('have.attr', 'value', '0,00')
        e22.kosztyRazemPoleTekstowe().should('have.attr', 'value', '30406,74')
        e22.kosztCalkNettoPoleTekstowe().should('have.attr', 'value', '30406,74')
        e22.vatPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.vatOdPrawPoleTekstowe().should('have.attr', 'value', '0,00')
        e22.cenaSprzedazyPoleTekstowe().should('have.attr', 'value', '30406,74')
        // Wskaźniki
        e22.edytujWskaznikiPrzycisk().click()
        e224.jednostkaRozliczeniowaPoleTekstowe().siblings('input.form-control').should('have.attr', 'value', 'Jedn.Koszt.TVP')
        e224.narzutKosztowPosrPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatPZPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatWKosztachPoleTekstowe().should('have.prop', 'value', '69,74 %')
        e224.zusOdWynagrodzenPoleTekstowe().should('have.prop', 'value', '19,00 %')
        e224.sredniaOdWynagrodzenPoleTekstowe().should('have.attr', 'value', '0,00')
        e224.vatOdPrawPoleTekstowe().should('have.prop', 'value', '23,00 %')
        e224.powrotPrzycisk().click()
        // Usługi w audycjach
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(7)').should('have.text', '26 250,00 zł')
        cy.get('#auditionServicesList > tbody > tr > td:nth-child(8)').should('have.text', '30 359,24 zł')

        cy.log('Krok 8 - Klikam przycisk K przy jedynej pozycji w sekcji Usługi w audycjach, a następnie usuwam pozycję RTES - operator grafiki')
        e22.edytujKosztyPlanowanePierwszyPrzycisk().click()
        e22011.sprawdzWidok()
        cy.get('#plannedCostAuditionList > tbody > tr > td').contains('RTES - operator grafiki').parent().parent().siblings('td').find('span > button[title="Usuń"]').click()
        e22011.potwierdzPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        fWspolne.komunikat().should('contain', 'Pomyślnie usunięto koszt')

        cy.log('Krok 9 - Powracam na ekran szczegółów porozumienia i zmieniam liczbę odcinków')
        e22011.powrotPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e22.liczbaOdcinkowPoleTekstowe().clear().type('1')
        e22.zapiszPrzycisk().click()
        e22.potwierdzLiczbeOdcinkowPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Liczba odcinków
        e22.liczbaOdcinkowPoleTekstowe().should('have.attr', 'value', 1)

        // Wylogowanie
        cy.logoutUser()
    })
})