import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'
import { e25 } from '../../../../POM/Planowanie/E25 Kosztorysy'

describe('SEPP-15614 Podstawianie wartości z cennika przy dodawaniu pozycji kosztowych CUP', () => {

    it('Podstawianie wartości z cennika przy dodawaniu pozycji kosztowych CUP', () => {
        cy.log('Krok 1 - Loguję się jako Koordynator Usług (producent)')
        cy.visit('')
            .loginKoordynatorUslug()
        
        cy.log('Krok 2 - Jestem na ekranie listy kosztorysów, wyszukuje kosztorys i przechodzę do jego edycji')
        cy.goToMenu('Kosztorysy')
        fWspolne.sprawdzProgressBar()
        e25.nazwaAudycjiPoleTekstowe().type('TEST-15614')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()
        
        cy.log('Krok 3 - Jestem na ekranie edycji kosztorysu i dodaję pozycję kosztową w sekcji Prace reżysersko-realizacyjne')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Realizator audycji').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.rodzajZatrudnieniaLista().select('współpracownik', {force: true})
        e23.jednostkaObliczeniowaLista().should('have.prop', 'value', '')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '0,00 zł')
        e23.pozycjaWCennikuJULista().select('[Publicystyka i edukacja] [Publicystyka typu magazyn] [I] Realizator audycji', {force: true})
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'godzina')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '150,00 zł')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // sprawdzamy czy przy ponownym wejściu w edycję kosztu wartości się nie zmieniają
        e23.edytujKosztPrzycisk('Realizator audycji').click()
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'godzina')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '150,00 zł')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        cy.log('Krok 4 - Jestem na ekranie edycji kosztorysu i dodaję pozycję kosztową w sekcji Prace muzyczne')
        e23.rodzajKosztuPrzycisk('Prace muzyczne').click()
        e23.rodzajKosztuPrzycisk('Prace muzyczne').should('have.attr', 'aria-expanded', 'true')
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Kierownik muzyczny').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        cy.get('span[title="Stawka Vat"]').children().should('not.have.attr', 'title', '23%')
        e23.rodzajZatrudnieniaLista().select('firma', {force: true})
        cy.get('span[title="Stawka Vat"]').children().should('have.attr', 'title', '23%')
        e23.jednostkaObliczeniowaLista().should('have.prop', 'value', '')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '0,00 zł')
        e23.pozycjaWCennikuJULista().select('[Teledysk] [F25 Teledysk]  Kierownik muzyczny', {force: true})
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'odcinek')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '2 000,00 zł')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // sprawdzamy czy przy ponownym wejściu w edycję kosztu wartości się nie zmieniają
        e23.edytujKosztPrzycisk('Kierownik muzyczny').click()
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'odcinek')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '2 000,00 zł')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace muzyczne').click()

        cy.log('Krok 5 - Jestem na ekranie edycji kosztorysu i dodaję pozycję kosztową w sekcji Prace techniczne i pomocnicze')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.rodzajZatrudnieniaLista().select('pracownik', {force: true})
        e23.jednostkaObliczeniowaLista().should('have.prop', 'value', '')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '0,00 zł')
        e23.pozycjaWCennikuJULista().select('[Wszystkie gatunki] [Wszystkie podgatunki] [I] KTA - inżynier studia - S7', {force: true})
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'godzina')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '90,00 zł')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        // sprawdzamy czy przy ponownym wejściu w edycję kosztu wartości się nie zmieniają
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'godzina')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '90,00 zł')
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 6 - Weryfikacja czy dla rodzaju kosztu, któy nie jest powiązany z żadną aktywną pozycją cennikową pole `Pozycja w cenniku JU` będzie niedostępne do edycji')
        e23.edytujKosztPrzycisk('Asystent techniczny - wózkarz').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        cy.get('[id*="ServiceUnitPricePositionName"]').should('have.attr', 'readonly')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        cy.log('Krok 7 - Jestem na ekranie edycji kosztorysu i dodaję pozycję kosztową w sekcji Prace techniczne i pomocnicze')
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Mikroporty - 8 torów').click()
        e23.czySzacowanieZaOdcPrzyciskWyboru().should('be.checked')
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.czySzacowanieZaOdcPrzyciskWyboru().should('not.be.checked')
        e23.jednostkaObliczeniowaLista().select('godzina', {force: true})
        // e23.vatLista().select('ZW', {force: true})
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.rabatPoleTekstowe().clear().type('10')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // sprawdzamy czy przy ponownym wejściu w edycję kosztu wartości się nie zmieniają
        e23.edytujKosztPrzycisk('Mikroporty - 8 torów').click()
        // stawka zaciągana z cennika
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '30,00 zł')
        e23.rabatPoleTekstowe().should('have.attr', 'value', '0,10')
        cy.get('[title="Stawka Vat"]').siblings('input').should('have.value', 'NP')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()

        cy.log('Krok 8 - Jestem na ekranie edycji kosztorysu i dodaję pozycję kosztową w sekcji Prace produkcyjne')
        e23.rodzajKosztuPoz1Przycisk('WYNAGRODZENIA RAZEM').click()
        e23.rodzajKosztuPrzycisk('Prace produkcyjne').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Asystent producenta').click()
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.rodzajZatrudnieniaLista().select('pracownik', {force: true})
        e23.liczbaJednObliczPoleTekstowe().clear().type('4')
        e23.liczbaOsobSztukPoleTekstowe().clear().type('2')
        e23.jednostkaObliczeniowaLista().should('have.prop', 'value', '').select('akt', {force: true})
        e23.stawkaZaJednostkeObliczenowaPoRabaciePoleTekstowe().should('have.prop', 'value', '0,00 zł').clear().type('75')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // sprawdzamy czy przy ponownym wejściu w edycję kosztu wartości się nie zmieniają
        e23.edytujKosztPrzycisk('Asystent producenta').click()
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'akt')
        e23.liczbaJednObliczPoleTekstowe().should('have.value', 4)
        e23.liczbaOsobSztukPoleTekstowe().should('have.value', 2)
        e23.stawkaZaJednostkeObliczenowaPoRabaciePoleTekstowe().should('have.prop', 'value', '75,00 zł')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace produkcyjne').click()
        
        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()
    })

    it('Weryfikacja pola Rabat', () => {
        cy.log('Krok 9 - Loguję się jako Producent')
        cy.visit('')
            .loginProducent()

        cy.log('Krok 10 - Jestem na ekranie listy kosztorysów, wyszukuje kosztorys i przechodzę do jego edycji')
        cy.goToMenu('Kosztorysy')
        fWspolne.sprawdzProgressBar()
        e25.nazwaAudycjiPoleTekstowe().type('TEST-15614')
        e25.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e25.edycjaKosztorysuPierwszyPrzycisk().click()  
        
        cy.log('Krok 11 - Jestem na ekranie edycji kosztorysu i przechodzę po dodanych kosztach by sprawdzić czy pole Rabat jest zablokowane do edycji, a następnie zeruję te koszty w celu replikowalności testu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Realizator audycji').click()
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.wyczyscKosztPrzycisk('Realizator audycji').click()
        cy.wait(1000)
        cy.get('a#confirmBtn').should('contain', 'Potwierdź').click()
        cy.get('div.modal-lg>div.modal-header').should('not.be.visible')
        // sprawdzam zablokowanie pola Rabat przy dodawaniu kosztu
        e23.edytujKosztPrzycisk('Realizator światła').click()
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.jednostkaTVPSALista().select('CUP', {force: true})
        e23.rodzajZatrudnieniaLista().select('współpracownik', {force: true})
        e23.jednostkaObliczeniowaLista().should('have.prop', 'value', '')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '0,00 zł')
        e23.pozycjaWCennikuJULista().select('[Zdjęcia filmowe] [ABC - technika filmowa] [I] Realizator światła', {force: true})
        cy.get('span[title="Jednostka obliczeniowa"]').children().should('have.attr', 'title', 'dzień zdjęciowy')
        e23.stawkaZaJednostkeObliczenowaPrzedRabatemPoleTekstowe().should('have.prop', 'value', '880,00 zł')
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true).and('have.value', '0,00 %')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPrzycisk('Prace muzyczne').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Kierownik muzyczny').click()
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.wyczyscKosztPrzycisk('Kierownik muzyczny').click()
        cy.wait(1000)
        cy.get('a#confirmBtn').should('contain', 'Potwierdź').click()
        cy.get('div.modal-lg>div.modal-header').should('not.be.visible')
        e23.rodzajKosztuPrzycisk('Prace muzyczne').click()

        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.wyczyscKosztPrzycisk('KTA - inżynier studia').click()
        cy.wait(1000)
        cy.get('a#confirmBtn').should('contain', 'Potwierdź').click()
        cy.get('div.modal-lg>div.modal-header').should('not.be.visible')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPrzycisk('Prace produkcyjne').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Asystent producenta').click()
        e23.rabatPoleTekstowe().should('not.exist')
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.wyczyscKosztPrzycisk('Asystent producenta').click()
        cy.wait(1000)
        cy.get('a#confirmBtn').should('contain', 'Potwierdź').click()
        cy.get('div.modal-lg>div.modal-header').should('not.be.visible')
        e23.rodzajKosztuPrzycisk('Prace produkcyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('Mikroporty - 8 torów').click()
        e23.rabatPoleTekstowe().should('have.prop', 'readOnly', true)
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.wyczyscKosztPrzycisk('Mikroporty - 8 torów').click()
        cy.wait(1000)
        cy.get('a#confirmBtn').should('contain', 'Potwierdź').click()
        cy.get('div.modal-lg>div.modal-header').should('not.be.visible')

        cy.log('Wylogowuję się')
        // Wyloguj użytkownika
        cy.logoutUser()

    })
})