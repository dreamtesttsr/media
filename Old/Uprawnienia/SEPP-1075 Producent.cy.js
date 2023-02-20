const { e200 } = require('../../../../POM/Audycje/E200 Audycje')
const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e20 } = require('../../../../POM/Planowanie/E20 Porozumienia')
const { e22 } = require('../../../../POM/Planowanie/E22 Porozumienia - szczegoly')
const { e23 } = require('../../../../POM/Planowanie/E23 Koszty planowane')
const { e509 } = require('../../../../POM/Produkcja/Karty Pracy/E509 Karty Pracy')
const { e50901 } = require('../../../../POM/Produkcja/Karty Pracy/E509.01 Wycena karty pracy')
const { e503 } = require('../../../../POM/Produkcja/Planowanie produkcji/E503 Planowanie produkcji')
const { e501 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E501 Wniosek o przydzielenie zasobów - wyszukiwarka')
const { e502 } = require('../../../../POM/Produkcja/Wnioski o przydzielenie zasobow/E502 Wniosek o przydzielenie zasobów - szczegoly')
const { e516 } = require('../../../../POM/Produkcja/Zamowienia zewnetrzne/E516 Zamowienia zewnetrzne')
const { e51601 } = require('../../../../POM/Produkcja/Zamowienia zewnetrzne/E516.01 Zamowienia zewnetrzne - szczegoly')
const { e504 } = require('../../../../POM/Produkcja/Zlecenia pracy/E504 Zlecenia pracy')
const { e35 } = require('../../../../POM/Rozliczenia/E35 Lista faktur')
const { e37 } = require('../../../../POM/Rozliczenia/E37 Szczegoly faktury')
const { e3801 } = require('../../../../POM/Rozliczenia/E38.01 Rachunki wewnetrzne - szczegoly')
const { e30 } = require('../../../../POM/Zaangazowanie/E30 Lista zamowien')
const { e32 } = require('../../../../POM/Zaangazowanie/E32 Zamowienia ZakupUsluga i Hotel - szczegoly')
const { e40 } = require('../../../../POM/Zaangazowanie/E40 Delegacje')
const { e42 } = require('../../../../POM/Zaangazowanie/E42 Delegacja krajowa')
import { e38 } from '../../../../POM/Rozliczenia/E38 Rachunki wewnetrzne'

describe('SEPP-1075 Producent - uprawnienia', function () {
    it('Producent - uprawnienia', function () {
        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()
        // Porozumienia=============================================================================================================================================================================
        cy.log('Krok 1 - przejście do ekranu "Porozumienia"')      
        cy.goToMenu('Porozumienia')
        // user test_user_2 powiążany jest z agencja AKFiS
        // Użytkownik widzi te porozumienia które są powiązane z agencją/agencjami do których przypisany jest użytkownik.
        // TBD
        // Użytkownik widzi:
        // - przycisk dodawania nowego porozumienia 'Dodaj porozumienie'
        cy.get('.dt-buttons > .btn-success').should('be.visible').and('have.attr', 'title', 'Dodaj porozumienie')
        // - przyciski edycji i podglądu porozumień ('Edycja', 'Podgląd)    
        cy.get('#agreementList_table > tbody > tr', { timeout: 20000 }).each(() => {
            cy.get('.text-center > .btn-info').should('be.visible').and('have.attr', 'title', 'Podgląd')// .and('have.text','P')
            cy.get('.text-center > .btn-success').should('be.visible').and('have.attr', 'title', 'Edycja')// .and('have.text','E')
            // cy.get('.td(7)').should('be.visible').and('have.text','AKFiS')
        })
        
        // Użytkownik wybiera porozumienie w statusie 'Robocze' i przechodzi do jego edycji.========================================================================================================
        cy.log('Krok 2 - filtruje porozumienie w statusie "Robocze" i przechodzi do jego edycji')	
        cy.get('#TvAudition').type('SEPP-1075 AUDYCJA TESTOWA')
        cy.filterAgreementByFilter('Robocze')
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.url().should('contain', '/Agreement/Edit')
        // Użytkownik widzi następujące przyciski:
        // -Status porozumienia
        e22.statusPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status porozumienia')
        cy.get('#statusText').should('be.visible')
        // -Drukuj
        e22.drukujPrzycisk().should('be.visible').and('contain', 'Drukuj')
        // -Zamówienia
        e22.zamowieniaPrzycisk().should('be.visible').and('contain', 'Zamówienia')
        // -Zgłoś opracowanie
        e22.zglosOpracowaniePrzycisk().should('be.visible').and('contain', 'Zgłoś opr.')
        // -Produkcja
        e22.produkcjaPrzycisk().should('be.visible').and('contain', 'Produkcja')
        // -Rozliczenie kosztów
        e22.rozliczenieKosztowPrzycisk().should('be.visible').and('contain', 'Rozliczenie kosztów')
        // -Historia zmian
        e22.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // -Uprawnienia
        e22.uprawnieniaPrzycisk().should('be.visible').and('contain', 'Uprawnienia')
        // -Wynagrodzenia
        e22.wynagrodzeniaPrzycisk().should('be.visible').and('contain', 'Wynagrodzenia')
        // -Kopiuj
        e22.kopiujPrzycisk().should('be.visible').and('contain', 'Kopiuj')
        // -Zablokuj
        e22.zablokujPrzycisk().should('contain', 'Zablokuj').and('be.visible')
        // -Zapisz
        e22.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        // -Powrót
        e22.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -Dodaj osobę ( sekcja 'Osoby wiodące')
        e22.dodajOsobePrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj Osobę')
        // -Dodaj kosztorys (sekcja 'Kosztorysy')
        e22.dodajKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj kosztorys')
        // -Edytuj kosztorys (sekcja 'Kosztorysy')
        e22.edytujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Edytuj kosztorys')
        // -Kopiuj kosztorys w porozumieniu (sekcja 'Kosztorysy)
        e22.kopiujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Kopiuj kosztorys w porozumieniu')
        // -Koszty planowane (sekcja 'Kosztorysy')
        e22.kosztyPlanowanePrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja kosztów planowanych')
        // -Dodaj wskaźniki (sekcja 'Wskaźniki')
        cy.get('#AddRatioBtn').should('be.visible').and('have.attr', 'title', 'Dodaj wskaźniki')
        // -Edytuj (sekcja 'Wskaźniki')
        cy.get('#auditionList > tbody > tr:nth-child(1) > td.text-center.checkboxClass > span:nth-child(1) > a').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Dodaj audycję (sekcja 'Audycje')
        cy.get('#ToSellEvidence').should('be.visible').and('have.attr', 'title', 'Dodaj audycję')
        // -Masowa Ewidencja Sprzedaży (sekcja 'Audycje')
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.attr', 'title', 'Masowa ewidencji sprzedaży')
        // -Kopiuj Id audycji SAP (sekcja 'Audycje')
        cy.get('#cpySapIdAudition').should('be.visible').and('have.attr', 'title', 'Kopiuj ID audycji SAP')
        // -Kopiuj nr Sap prod. (sekcja 'Audycje')
        cy.get('#cpySapNr').should('be.visible').and('have.attr', 'title', 'Kopiuj nr SAP prod.')
        // -Pełna lista audycji (sekcja 'Audycje')
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Pełna lista audycji')
        // -Edytuj (sekcja 'Audycje' - na konkretnej audycji)
        // /TBD - może nie być dostępnych audycji
        // -Usuń (sekcja 'Audycje' - na konkretnej audycji)
        // /TBD - może nie być dostępnych audycji
        // -Dodaj plik do repozytorium (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentLocal').should('be.visible').and('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        // -Dodaj link do załącznika (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentScanFile').should('be.visible').and('have.attr', 'title', 'Dodaj Link Do Załącznika')
        /* // wyłączone pole i komunikat
        // zmień wartość w polu "Cena audycji" i kliknij "Zapisz"
        cy.get('#CurrentTitle_ZatwierdzonaCenaPojedynczejAudycji').clear().type('50')
        e22.zapiszPrzycisk().click()
        // sprawdź czy pojawi się komunikat o róznicach w cenie
        cy.get('.col-sm-11', { timeout: 5000 }).contains(' Różnica pomiędzy Ceną zatwierdzoną a Ceną sprzedaży wynosi: ').click()
        */

        // Kliknij na przycisk "Status porozumienia".===============================================================================================================================================================================
        cy.log('Krok 3 -  Kliknij przycisk "Status porozumienia"')
        // Pola Data, "Wybierz status" i Komentarz są edytowalne, pozostałe elementy nie są.
        e22.statusPorozumieniaPrzycisk().should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('contain', 'Statusy porozumienia')
        cy.get('input#IdSource').should('be.visible').and('have.attr', 'disabled', 'disabled')
        cy.get('input#Number').should('be.visible').and('have.attr', 'disabled', 'disabled')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        // Dostępne są przyciski "Dodaj nowy status" i Powrót.
        cy.get('#addStatus').should('be.visible').and('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('be.visible').and('contain', 'Powrót').click()
        // przejście do kosztorysu i sprawdzenie czy można dodać uwagę
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().click()
        cy.get('h4.modal-title').contains('Dodaj uwagę').should('be.visible')
        cy.get('button#addCommentModal-noBtn').should('be.visible').click()
        e23.powrotPrzycisk().click()
        e22.zablokujPrzycisk().click()
        cy.get('a#confirmBtn').click()
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().should('not.exist')
        e23.powrotPrzycisk().click()
        e22.odblokujPrzycisk().click()
        cy.get('a#confirmBtn').click()

        // Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie 'W opracowaniu' i przejdź do jego edycji.==========================================================================================================
        cy.log('Krok 4 -  Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie "W opracowaniu" i przejdź do jego edycji')
        // powrot do listy porozumien
        cy.get('.breadcrumb > :nth-child(2) > a').click()
        cy.url().should('contain', '/Agreement')
        e20.nazwaAudycjiTVPoleTekstowe().clear().type('TEST - W OPRACOWANIU')
        // filtrowanie porozumien po statusie i wejscie do edycji
        cy.filterAgreementByFilter('W opracowaniu')
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.url().should('contain', '/Agreement/Edit')
        // Użytkownik widzi następujące przyciski:
        // -Status porozumienia
        e22.statusPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status porozumienia')
        cy.get('#statusText').should('be.visible')
        // -Drukuj
        e22.drukujPrzycisk().should('be.visible').and('contain', 'Drukuj')
        // -Uprawnienia
        e22.uprawnieniaPrzycisk().should('be.visible').and('contain', 'Uprawnienia')
        // -Zamówienia
        e22.zamowieniaPrzycisk().should('be.visible').and('contain', 'Zamówienia')
        // -Produkcja
        e22.produkcjaPrzycisk().should('be.visible').and('contain', 'Produkcja')
        // -Wynagrodzenia
        e22.wynagrodzeniaPrzycisk().should('be.visible').and('contain', 'Wynagrodzenia')
        // -Rozliczenie kosztów
        e22.rozliczenieKosztowPrzycisk().should('be.visible').and('contain', 'Rozliczenie kosztów')
        // -Historia zmian
        e22.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // -Kopiuj
        e22.kopiujPrzycisk().should('be.visible').and('contain', 'Kopiuj')
        // -Zablokuj
        e22.zablokujPrzycisk().should('be.visible').and('contain', 'Zablokuj')
        // -Cofnij opracowanie
        cy.get('[data-confirm="Czy chcesz cofnąć opracowanie?"]').should('be.visible').and('contain', 'Cofnij opr.')
        // -Powrót
        e22.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -Koszty planowane (sekcja 'Kosztorysy')
        e22.kosztyPlanowanePrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja kosztów planowanych')
        // -Dodaj audycję (sekcja 'Audycje')
        cy.get('#ToSellEvidence').should('be.visible').and('have.attr', 'title', 'Dodaj audycję')
        // -Masowa Ewidencja Sprzedaży (sekcja 'Audycje')
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.attr', 'title', 'Masowa ewidencji sprzedaży')
        // -Kopiuj Id audycji SAP (sekcja 'Audycje')
        cy.get('#cpySapIdAudition').should('be.visible').and('have.attr', 'title', 'Kopiuj ID audycji SAP')
        // -Kopiuj nr Sap prod. (sekcja 'Audycje')
        cy.get('#cpySapNr').should('be.visible').and('have.attr', 'title', 'Kopiuj nr SAP prod.')
        // -Pełna lista audycji (sekcja 'Audycje')
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Pełna lista audycji')
        // -Edytuj (sekcja 'Audycje' - na konkretnej audycji)
        // cy.get('#auditionList > tbody > .odd > .checkboxClass > :nth-child(1) > .btn').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Usuń (sekcja 'Audycje' - na konkretnej audycji)
        // cy.get('.removeBtnAud').should('be.visible').and('have.attr', 'title', 'Usuń')
        // Wszystkie pola danych są niemożliwe do edycji.

        // Kliknij na przycisk "Status porozumienia".===============================================================================================================================================================================
        cy.log('Krok 5 -  Kliknij przycisk "Status porozumienia"')
        // Pola "Data", "Wybierz status" i "Komentarz" są edytowalne, pozostałe elementy nie są.
        e22.statusPorozumieniaPrzycisk().should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('contain', 'Statusy porozumienia')
        cy.get('#IdSource').should('be.visible').and('have.attr', 'disabled', 'disabled')
        cy.get('#Number').should('be.visible').and('have.attr', 'disabled', 'disabled')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        // Dostępne są przyciski "Dodaj nowy status" i "Powrót".
        cy.get('#addStatus').should('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('be.visible').and('contain', 'Powrót').click()
        // przejście do kosztorysu i sprawdzenie czy można dodać uwagę
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().click()
        cy.get('h4.modal-title').contains('Dodaj uwagę').should('be.visible')
        cy.get('button#addCommentModal-noBtn').should('be.visible').click()
        e23.powrotPrzycisk().click()

        // Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie 'Zarejestrowane' i przejdź do jego edycji.==========================================================================================================
        cy.log('Krok 6 -  Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie "Zarejestrowane" i przejdź do jego edycji')
        // powrot do listy porozumien
        cy.get('.breadcrumb > :nth-child(2) > a').click()
        cy.url().should('contain', '/Agreement')
        e20.nazwaAudycjiTVPoleTekstowe().clear().type('TEST - ZAREJESTROWANE')
        // filtrowanie porozumien po statusie i wejscie do edycji
        cy.filterAgreementByFilter('Zarejestrowane')
        e20.edycjaPierwszyPrzycisk().click()
        cy.url().should('contain', '/Agreement/Edit')
        // Użytkownik widzi następujące przyciski:
        // -Status porozumienia
        e22.statusPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status porozumienia')
        cy.get('#statusText').should('be.visible')
        // -Drukuj
        e22.drukujPrzycisk().should('be.visible').and('contain', 'Drukuj')
        // -Zamówienia
        e22.zamowieniaPrzycisk().should('be.visible').and('contain', 'Zamówienia')
        // -Produkcja
        e22.produkcjaPrzycisk().should('be.visible').and('contain', 'Produkcja')
        // -Rozliczenie kosztów
        e22.rozliczenieKosztowPrzycisk().should('be.visible').and('contain', 'Rozliczenie kosztów')
        // -Historia zmian
        e22.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // -Wynagrodzenia
        e22.wynagrodzeniaPrzycisk().should('be.visible').and('contain', 'Wynagrodzenia')
        // -Twórz aneks
        cy.get('button.btn.btn-info').should('contain', 'Twórz aneks').and('be.visible')
        // -Uprawnienia
        e22.uprawnieniaPrzycisk().should('be.visible').and('contain', 'Uprawnienia')
        // -Kopiuj
        e22.kopiujPrzycisk().should('be.visible').and('contain', 'Kopiuj')
        // -Zablokuj
        e22.zablokujPrzycisk().should('contain', 'Zablokuj').and('be.visible') 
        // -Zapisz
        e22.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        // -Powrót
        e22.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -Dodaj osobę ( sekcja 'Osoby wiodące')
        e22.dodajOsobePrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj Osobę')
        // -Koszty planowane (sekcja 'Kosztorysy')
        e22.kosztyPlanowanePrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja kosztów planowanych')
        // -Kopiuj kosztorys w porozumieniu (sekcja 'Kosztorysy)
        e22.kopiujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Kopiuj kosztorys w porozumieniu')
        // -Dodaj kosztorys (sekcja 'Kosztorysy')
        e22.dodajKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj kosztorys')
        // -Edytuj kosztorys (sekcja 'Kosztorysy')
        e22.edytujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Edytuj kosztorys')
        // -Dodaj wskaźniki (sekcja 'Wskaźniki')
        cy.get('#AddRatioBtn').should('be.visible').and('have.attr', 'title', 'Dodaj wskaźniki')
        // -Edytuj (sekcja 'Wskaźniki')
        cy.get('#RatioListTable > tbody > .odd > .text-center > span > .btn').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Dodaj audycję (sekcja 'Audycje')
        cy.get('#ToSellEvidence').should('be.visible').and('have.attr', 'title', 'Dodaj audycję')
        // -Masowa Ewidencja Sprzedaży (sekcja 'Audycje')
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.attr', 'title', 'Masowa ewidencji sprzedaży')
        // -Kopiuj Id audycji SAP (sekcja 'Audycje')
        cy.get('#cpySapIdAudition').should('be.visible').and('have.attr', 'title', 'Kopiuj ID audycji SAP')
        // -Kopiuj nr Sap prod. (sekcja 'Audycje')
        cy.get('#cpySapNr').should('be.visible').and('have.attr', 'title', 'Kopiuj nr SAP prod.')
        // -Pełna lista audycji (sekcja 'Audycje')
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Pełna lista audycji')
        // -Edytuj (sekcja 'Audycje' - na konkretnej audycji)
        cy.get('#auditionList > tbody > .odd > .checkboxClass > :nth-child(1) > .btn').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Usuń (sekcja 'Audycje' - na konkretnej audycji)
        cy.get('.removeBtnAud').should('be.visible').and('have.attr', 'title', 'Usuń')
        // -Dodaj plik do repozytorium (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentLocal').should('be.visible').and('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        // -Dodaj link do załącznika (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentScanFile').should('be.visible').and('have.attr', 'title', 'Dodaj Link Do Załącznika')

        // kliknięcie w przycisk Status porozumienia===============================================================================================================================================================================
        cy.log('Krok 7 -  Kliknij przycisk "Status porozumienia"')
        // Pola "Data", "Wybierz status" i "Komentarz" są edytowalne, pozostałe elementy nie są.
        e22.statusPorozumieniaPrzycisk().should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('contain', 'Statusy porozumienia')
        cy.get('#IdSource').should('have.attr', 'disabled', 'disabled')
        cy.get('#Number').should('have.attr', 'disabled', 'disabled')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        // /Dostępne są przyciski "Dodaj nowy status" i "Powrót".
        cy.get('#addStatus').should('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('contain', 'Powrót').click()
        // przejście do kosztorysu i sprawdzenie czy można dodać uwagę
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().click()
        cy.get('h4.modal-title').contains('Dodaj uwagę').should('be.visible')
        cy.get('button#addCommentModal-noBtn').should('be.visible').click()
        e23.powrotPrzycisk().click()

        // Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie 'Aneks' i przejdź do jego edycji.==============================================================================================================
        cy.log('Krok 8 -  Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie "Aneks" i przejdź do jego edycji')
        // powrot do listy porozumien
        cy.get('.breadcrumb > :nth-child(2) > a').click()
        cy.url().should('contain', '/Agreement')
        e20.nazwaAudycjiTVPoleTekstowe().clear().type('TEST-ANEKS')
        // filtrowanie porozumien po statusie i wejscie do edycji
        cy.filterAgreementByFilter('Aneks')
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.url().should('contain', '/Agreement/Edit')

        // Użytkownik widzi następujące przyciski:
        // -Status porozumienia
        e22.statusPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status porozumienia')
        cy.get('#statusText').should('be.visible')
        // -Drukuj
        e22.drukujPrzycisk().should('be.visible').and('contain', 'Drukuj')
        // -Zamówienia
        e22.zamowieniaPrzycisk().should('be.visible').and('contain', 'Zamówienia')
        // -Uprawnienia
        e22.uprawnieniaPrzycisk().should('be.visible').and('contain', 'Uprawnienia')
        // -Twórz aneks
        cy.get('button.btn.btn-info').should('contain', 'Twórz aneks').and('be.visible')
        // -Produkcja
        e22.produkcjaPrzycisk().should('be.visible').and('contain', 'Produkcja')
        // -Rozliczenie kosztów
        e22.rozliczenieKosztowPrzycisk().should('be.visible').and('contain', 'Rozliczenie kosztów')
        // -Historia zmian
        e22.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // -Wynagrodzenia
        e22.wynagrodzeniaPrzycisk().should('be.visible').and('contain', 'Wynagrodzenia')
        // -Kopiuj
        e22.kopiujPrzycisk().should('be.visible').and('contain', 'Kopiuj')
        // -Zablokuj
        e22.zablokujPrzycisk().should('contain', 'Zablokuj').and('be.visible')
        // -Zapisz
        e22.zapiszPrzycisk().should('be.visible').and('contain', 'Zapisz')
        // -Powrót
        e22.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -Dodaj osobę ( sekcja 'Osoby wiodące')
        e22.dodajOsobePrzycisk().should('have.attr', 'title', 'Dodaj Osobę')
        // -Koszty planowane (sekcja 'Kosztorysy')
        e22.kosztyPlanowanePrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja kosztów planowanych')
        // -Kopiuj kosztorys w porozumieniu (sekcja 'Kosztorysy)
        e22.kopiujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Kopiuj kosztorys w porozumieniu')
        // -Dodaj kosztorys (sekcja 'Kosztorysy')
        e22.dodajKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj kosztorys')
        // -Edytuj kosztorys (sekcja 'Kosztorysy')
        e22.edytujKosztorysPrzycisk().should('be.visible').and('have.attr', 'title', 'Edytuj kosztorys')
        // -Dodaj wskaźniki (sekcja 'Wskaźniki')
        cy.get('#AddRatioBtn').should('be.visible').and('have.attr', 'title', 'Dodaj wskaźniki')
        // -Edytuj (sekcja 'Wskaźniki')
        cy.get('#RatioListTable > tbody > .odd > .text-center > span > .btn').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Dodaj audycję (sekcja 'Audycje')
        cy.get('#ToSellEvidence').should('be.visible').and('have.attr', 'title', 'Dodaj audycję')
        // -Masowa Ewidencja Sprzedaży (sekcja 'Audycje')
        cy.get('#ToMassSellEvidence').should('be.visible').and('have.attr', 'title', 'Masowa ewidencji sprzedaży')
        // -Kopiuj Id audycji SAP (sekcja 'Audycje')
        cy.get('#cpySapIdAudition').should('be.visible').and('have.attr', 'title', 'Kopiuj ID audycji SAP')
        // -Kopiuj nr Sap prod. (sekcja 'Audycje')
        cy.get('#cpySapNr').should('be.visible').and('have.attr', 'title', 'Kopiuj nr SAP prod.')
        // -Pełna lista audycji (sekcja 'Audycje')
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Pełna lista audycji')
        // -Edytuj (sekcja 'Audycje' - na konkretnej audycji)
        cy.get('#auditionList > tbody > .odd > .checkboxClass > :nth-child(1) > .btn').should('be.visible').and('have.attr', 'title', 'Edytuj')
        // -Usuń (sekcja 'Audycje' - na konkretnej audycji)
        cy.get('.removeBtnAud').should('be.visible').and('have.attr', 'title', 'Usuń')
        // -Dodaj plik do repozytorium (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentLocal').should('be.visible').and('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        // -Dodaj link do załącznika (sekcja 'Załączniki')
        cy.get('#btnSelectAttachmentScanFile').should('be.visible').and('have.attr', 'title', 'Dodaj Link Do Załącznika')

        // kliknięcie w przycisk Status porozumienia===============================================================================================================================================================================
        cy.log('Krok 9 -  Kliknij przycisk "Status porozumienia"')
        e22.statusPorozumieniaPrzycisk().should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content > .modal-header > .modal-title').should('be.visible').and('contain', 'Statusy porozumienia')
        cy.get('#IdSource').should('have.attr', 'disabled', 'disabled')
        cy.get('#Number').should('have.attr', 'disabled', 'disabled')
        cy.checkingIfTheLocatorIsACalendar('#div_StatusDate')
        cy.checkingIfTheLocatorIsAContainer('#select2-StatusTypeId-container', 'Wybierz status')
        cy.checkingIfTheLocatorIsATextField('#Notes', 'Komentarz do nowego statusu')
        cy.get('#addStatus').should('have.attr', 'title', 'Dodaj nowy status')
        cy.get('#closeBtn').should('be.visible').and('contain', 'Powrót').click()
        // przejście do kosztorysu i sprawdzenie czy można dodać uwagę
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().click()
        cy.get('h4.modal-title').contains('Dodaj uwagę').should('be.visible')
        cy.get('button#addCommentModal-noBtn').should('be.visible').click()
        e23.powrotPrzycisk().click()

        // Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie 'Rozliczone' i przejdź do jego edycji.==============================================================================================================
        cy.log('Krok 10 -  Wyjdź do głównego ekranu porozumień i wybierz porozumienie w statusie "Rozliczone" i przejdź do jego edycji')
        // powrot do listy porozumien
        cy.get('.breadcrumb > :nth-child(2) > a').click()
        cy.url().should('contain', '/Agreement')
        e20.nazwaAudycjiTVPoleTekstowe().clear()
        // filtrowanie porozumien po statusie i wejscie do edycji
        cy.filterAgreementByFilter('Rozliczone')
        e20.edycjaPierwszyPrzycisk().should('have.attr', 'title', 'Edycja').click()
        cy.url().should('contain', '/Agreement/Edit')

        // Użytkownik widzi następujące przyciski:
        // -Status porozumienia
        e22.statusPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status porozumienia')
        cy.get('#statusText').should('be.visible')
        // -Uprawnienia
        e22.uprawnieniaPrzycisk().should('be.visible').and('contain', 'Uprawnienia')
        // -Drukuj
        e22.drukujPrzycisk().should('be.visible').and('contain', 'Drukuj')
        // -Zamówienia
        e22.zamowieniaPrzycisk().should('be.visible').and('contain', 'Zamówienia')
        // -Produkcja
        e22.produkcjaPrzycisk().should('be.visible').and('contain', 'Produkcja')
        // -Wynagrodzenia
        e22.wynagrodzeniaPrzycisk().should('be.visible').and('contain', 'Wynagrodzenia')
        // -Rozliczenie kosztów
        e22.rozliczenieKosztowPrzycisk().should('be.visible').and('contain', 'Rozliczenie kosztów')
        // -Historia zmian
        e22.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // -Kopiuj
        e22.kopiujPrzycisk().should('be.visible').and('contain', 'Kopiuj')
        // -Powrót
        e22.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -Koszty planowane (sekcja 'Kosztorysy')
        e22.kosztyPlanowanePrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja kosztów planowanych')
        // -Kopiuj Id audycji SAP (sekcja 'Audycje')
        cy.get('#cpySapIdAudition').should('be.visible').and('have.attr', 'title', 'Kopiuj ID audycji SAP')
        // -Kopiuj nr Sap prod. (sekcja 'Audycje')
        cy.get('#cpySapNr').should('be.visible').and('have.attr', 'title', 'Kopiuj nr SAP prod.')
        // -Pełna lista audycji (sekcja 'Audycje')
        e22.pelnaListaAudycjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Pełna lista audycji')

        // kliknięcie w przycisk Status porozumienia===============================================================================================================================================================================
        cy.log('Krok 11 -  Kliknij przycisk "Status porozumienia"')
        // Żadne pola nie są edytowalne.
        e22.statusPorozumieniaPrzycisk().should('have.attr', 'data-original-title', 'Status porozumienia').click()
        cy.get('#content').should('be.visible')
        cy.get('#content > .modal-header > .modal-title').should('contain', 'Statusy porozumienia')
        cy.get('#IdSource').should('have.attr', 'disabled', 'disabled')
        cy.get('#Number').should('have.attr', 'disabled', 'disabled')
        cy.get('#addStatus').should('not.exist')
        // Dostępny jest przycisk 'Powrót'.
        cy.get('button#closeBtn', {timeout: 5000}).scrollIntoView().should('be.visible').and('contain', 'Powrót').click()
        // przejście do kosztorysu i sprawdzenie czy można dodać uwagę
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().should('not.exist')
        e23.powrotPrzycisk().click()
        e22.podgladPorozumieniaPierwszyPrzycisk().click()
        e22.kosztyPlanowanePrzycisk().click()
        e23.dodajUwagePrzycisk().should('not.exist')

        // Użytkownik przechodzi do ekranu 'Audycje'.===============================================================================================================================================================================
        cy.log('Krok 12 -  Przejście do ekranu "Audycje"')
        cy.goToMenu('Audycje')
        cy.get('#ProductionSapNumber').type('35345356')
        e200.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Użytkownik widzi:
        // - przycisk dodawania nowej audycji 'Dodaj audycję'
        e200.dodajAudycjePrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj audycję')
        // - przycisk edycji wybranej audycji 'Edycja audycji'
        e200.edycjaAudycjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja audycji')
        // - przycisk usunięcia wybranej audycji 'Usunięcie audycji'
        e200.usuniecieAudycjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Usunięcie audycji')
        // - przyciski podglądu/ edycji porozumienia przypisanego do danej audycji 'Podgląd porozumienia / 'Edycja porozumienia'
        e200.podgladPorozumieniaPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd porozumienia')
        e200.edycjaPorozumieniaPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja porozumienia')
        // - po zaznaczeniu checkbox'a przy wybranej audycji widoczny jest przycisk 'Masowa Ewidencja Sprzedaży'
        cy.get('.massEvidenceCheckbox').check().should('be.checked')
        e200.masowaEwidencjaSprzedazyPrzycisk().should('be.visible').and('have.attr', 'title', 'Masowa ewidencja sprzedaży')

        // Użytkownik wybiera audycję i przechodzi do jej edycji.==============================================================================================================================================================
        cy.log('Krok 13 -  Wybranie audycji i przejście do jej edycji')
        e200.edycjaAudycjiPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Zapisz'
        cy.get('#UpdateButton').should('be.visible').and('contain', 'Zapisz')
        // -przycisk 'Powrót'
        cy.get('button#AgreementReturn').should('be.visible').and('contain', 'Powrót')

        // Użytkownik przechodzi do ekranu 'Zamówienia'.===============================================================================================================================================================================
        cy.log('Krok 14 -  Przejście do ekranu "Zamówienia"')
        cy.goToMenu('Zamówienia')
        e30.zaawansowanePrzycisk().click()
        cy.get('#select2-OrderType-container').click()
        cy.get('#select2-OrderType-results > :nth-child(1)').click()
        e30.wyszukajPrzycisk().click()
        // Użytkownik widzi:
        // - przycisk 'Podgląd' ( na wybranym zamówieniu)
        cy.get('#progressBar', { timeout: 10000 }).should('not.be.visible')
        e30.podgladPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd')

        // Użytkownik wybiera zamówienie i przechodzi do jego podglądu.======================================================================================================================================================
        cy.log('Krok 15 -  Wybranie zamówienia i przejście do jego podglądu')
        e30.podgladPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Status zamówienia'
        e32.statusZamowieniaPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status zamówienia')
        cy.get('span#statusText').should('be.visible')
        // -przycisk 'Powrót'
        e32.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -przycisk 'Podgląd porozumienia' ( w sekcji 'Porozumienie')
        e32.podgladPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd porozumienia')
        // Wszystkie pola formularza są nieedytowalne. 
        cy.get('#orderNrTextBox').should('be.disabled')
        // cy.get('#select2-IdOrderType-container').parent().should('have.attr', 'tabindex', '-1')   // do wyjaśnienia
        cy.get('#select2-IdContractor-container').parent().should('have.attr', 'tabindex', '-1') 
        cy.get('#AmountGrossOnContract_checkbox').should('be.disabled')
        cy.get('#AmountNetOnContract').should('be.disabled')
        cy.get('#VatOnContract').should('be.disabled')
        cy.get('#select2-AgencyIdCombo-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#select2-IdAgreement-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#TvAudition').should('be.disabled')
        e32.nrWewnLista().should('be.disabled')
        e32.kosztorysLista().should('be.disabled')
        cy.get('#Details_IsContract').should('be.disabled')
        cy.get('#Details_MmReservation').should('be.disabled')       
        cy.get('#select2-Details_IdOrderKind-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#Details_InternalNumber').should('be.disabled') 
        cy.get('#Details_RegistrationDate').should('be.disabled')
        cy.get('#Details_DateOfConclusion').should('be.disabled')
        cy.get('#Details_DateOfImplementation').should('be.disabled')
        cy.get('#Details_ContractDurationDates').should('be.disabled')
        cy.get('#Details_DateOfPayment').should('be.disabled')       
        cy.get('#Details_PaymentNotes').should('be.disabled')        
        cy.get('#Details_CalculatedValueNettoWithCostVat').should('be.disabled')
        cy.get('#Details_CalculatedVatInCosts').should('be.disabled')
        cy.get('#Details_WeightedAmount').should('be.disabled')
        cy.get('#Details_TheValueOfCopyright').should('be.disabled')
        cy.get('#select2-Details_IdObjectOfOrder-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#Details_ObjectOfOrderRemarks').should('be.disabled')    
        cy.get('#select2-Details_IdPlannedLimit-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#Details_UnplannedCosts').should('be.disabled')
        cy.get('#Details_ReasonOfUnplannedCosts').should('be.disabled')
        cy.get('#Details_Comments').should('be.disabled')
        cy.get('#Details_Description').should('be.disabled')
        cy.get('#NettSum').should('be.disabled')
        cy.get('#BruttSum').should('be.disabled')    
        cy.get('#ForSettlement').should('be.disabled')
        cy.get('#OverpaidMessage').should('have.attr', 'readonly', 'readonly')

        // Użytkownik przechodzi do ekranu 'Delegacje'..==============================================================================================================================================================
        cy.log('Krok 16 -  Przejście do ekranu "Delegacje"')
        cy.goToMenu('Delegacje')
        e40.zaawansowanePrzycisk().click()
        cy.get('#IsForeign').click()
        e40.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // Użytkownik widzi:
        // - przycisk 'Podgląd' ( na wybranym zamówieniu)
        e40.podgladPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd')

        // Użytkownik przechodzi do podglądu wybranej delegacji.==============================================================================================================================================================
        cy.log('Krok 17 -  Użytkownik przechodzi do podglądu wybranej delegacji')
        e40.podgladPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Status delegacji'
        e42.statusDelegacjiPrzycisk().should('be.visible').and('have.attr', 'data-original-title', 'Status delegacji')
        cy.get('#statusText').should('be.visible')
        // -przycisk 'Powrót'
        e42.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // -przycisk 'Podgląd porozumienia' ( w sekcji 'Porozumienie')
        e42.podgladPorozumieniaPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd porozumienia')
        // Wszystkie pola formularza są nieedytowalne. 
        cy.get('.inputgroup>input#Number').should('have.prop', 'readOnly', true)
        e42.agencjaLista().should('have.prop', 'readOnly', true)
        cy.get('#DfNumber').should('have.prop', 'readOnly', true)
        cy.get('#CrdNumber').should('have.prop', 'readOnly', true)
        cy.get('#select2-IdAgreement-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#TvAudition').should('have.prop', 'readOnly', true)
        cy.get('input#AgreementInternalNr').should('have.prop', 'readOnly', true)
        cy.get('input#IdTitle').should('have.prop', 'readOnly', true)
        cy.get('#DelegateLastName').should('have.prop', 'readOnly', true)
        cy.get('#DelegateFirstName').should('have.prop', 'readOnly', true)
        cy.get('input#DelegatePosition').should('have.prop', 'readOnly', true)
        cy.get('#DelegateEvidence').should('have.prop', 'readOnly', true)
        cy.get('#IsEmployee').should('have.attr', 'disabled', 'disabled')
        cy.get('#City').should('have.prop', 'readOnly', true)
        cy.get('input#MeanOfTransport').should('have.prop', 'readOnly', true)
        cy.get('#DepartureDate').should('have.prop', 'readOnly', true)
        cy.get('#DepartureTime').should('have.prop', 'readOnly', true)
        cy.get('#ArrivalDate').should('have.prop', 'readOnly', true)
        cy.get('#ArrivalTime').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedRideCost').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningRideCost').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DifferenceRideCost').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedRideLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningRideLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DifferenceRideLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedAllRides').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningAllRides').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedOvernightLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningOvernightLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DifferenceOvernightLumpSum').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedOtherCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningOtherCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DifferenceOtherCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_Diet').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_PlannedAllCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_ReckoningAllCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DifferenceAllCosts').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_AdvancePayment').should('have.prop', 'readOnly', true)
        cy.get('#ReckoningDate').should('have.prop', 'readOnly', true)
        cy.get('#Calculation_DelegationCost').should('have.prop', 'readOnly', true)
        cy.get('#ReckoningDiv > .form-control').should('have.attr', 'readonly', 'readonly')
        cy.get('#NettSum').should('have.prop', 'readOnly', true)
        cy.get('#BruttSum').should('have.prop', 'readOnly', true)

        // Użytkownik przechodzi do ekranu 'Faktury'..==============================================================================================================================================================
        cy.log('Krok 18 -  Przejście do ekranu "Faktury"')
        cy.goToMenu('Faktury')
        // Użytkownik widzi:
        // - przycisk 'Podgląd' ( na wybranym zamówieniu)
        e35.podgladPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd')

        // Użytkownik przechodzi do podglądu wybranej faktury.==============================================================================================================================================================
        cy.log('Krok 19 -  Użytkownik przechodzi do podglądu wybranej faktury')
        e35.podgladPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Powrót'
        e37.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // Wszystkie pola formularza są nieedytowalne. 
        cy.get('input#AgencyId').should('have.prop', 'readOnly', true)
        cy.get('#select2-IdContractor-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#select2-IdOrder-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#Number').should('have.prop', 'readOnly', true)
        cy.get('#InvoiceDate').should('have.prop', 'readOnly', true)
        cy.get('input#IdTitle').should('have.prop', 'readOnly', true)
        cy.get('#CompletionDate').should('have.prop', 'readOnly', true)
        cy.get('#RegistrationDate').should('have.prop', 'readOnly', true)
        cy.get('input#IdAgreement').should('have.prop', 'readOnly', true)
        cy.get('#DebtValueNet').should('have.prop', 'readOnly', true)
        cy.get('#AmountLeftToPayNet').should('have.prop', 'readOnly', true)
        cy.get('input#IdProducer').should('have.prop', 'readOnly', true)
        cy.get('#AmountNet').should('have.prop', 'readOnly', true)
        cy.get('#VatRate').should('have.prop', 'readOnly', true)
        cy.get('#AmountGross').should('have.prop', 'readOnly', true)
        cy.get('#DeclaredSettlementDate').should('have.prop', 'readOnly', true)
        cy.get('#DeclaredSettlementDateNotes').should('have.prop', 'readOnly', true)
        cy.get('#SettlementDate').should('have.prop', 'readOnly', true)
        cy.get('#SettlementDateNotes').should('have.prop', 'readOnly', true)
        cy.get('#SettlementNotes').should('have.prop', 'readOnly', true)

        // Użytkownik przechodzi do ekranu 'Rachunki wewnętrzne'..==============================================================================================================================================================
        cy.log('Krok 20 -  Przejście do ekranu "Rachunki wewnętrzne"')
        cy.goToMenu('Rachunki wewnętrzne')
        // Użytkownik widzi:
        // - przycisk 'Podgląd' ( na wybranym zamówieniu)
        e38.podgladPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Podgląd')

        // Użytkownik przechodzi do podglądu wybranego rachunku.==============================================================================================================================================================
        cy.log('Krok 21 -  Użytkownik przechodzi do podglądu wybranego rachunku')
        e38.podgladPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Powrót'
        e3801.powrotPrzycisk().should('be.visible').and('contain', 'Powrót')
        // Wszystkie pola formularza są nieedytowalne. 
        cy.get('#select2-AgencyId-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#select2-IdOrganizationUnit-container').parent().should('have.attr', 'tabindex', '-1')
        cy.get('#select2-IdOrder-container').parent().should('have.attr', 'tabindex', '-1')
        e3801.nrRachunkuPoleTekstowe().should('be.disabled')
        e3801.dataRozliczeniaData().should('be.disabled')
        cy.get('#select2-IdTitle-container').parent().should('have.attr', 'tabindex', '-1')
        e3801.kosztLaczniePoleTekstowe().should('be.disabled')
        e3801.doZaplatyPoleTekstowe().should('be.disabled')
        cy.get('#select2-IdAgreement-container').parent().should('have.attr', 'tabindex', '-1')
        e3801.kwotaRozliczeniaPoleTekstowe().should('be.disabled')
        cy.get('#select2-IdProducer-container').parent().should('have.attr', 'tabindex', '-1')
        e3801.uwagiPoleTekstowe().should('be.disabled')

        // Użytkownik przechodzi do ekranu 'Wnioski o przydzielenie zasobów'..==============================================================================================================================================================
        cy.log('Krok 22 -  Przejście do ekranu "Wnioski o przydzielenie zasobów"')
        cy.goToMenu('Wnioski o przydzielenie zasobów')
        cy.get('#HideExecuted').click()
        cy.get('#AuditionName').type('TEST PODGLĄDU')
        e501.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        // cy.get('#progressBar', { timeout: 10000 }).should('be.visible')
        // cy.get('#progressBar', { timeout: 10000 }).should('not.be.visible')
        // Użytkownik widzie tylko te wnioski które stworzone są do porozumień do których ma dostęp.
        // Użytkownik widzi:
        // - przycisk 'Dodaj nowy wniosek'
        e501.dodajNowyWniosekPrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj nowy wniosek')
        // - przycisk 'Przeglądaj wniosek'
        e501.przegladajWniosekPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Przeglądaj wniosek').as('przegladajWniosekK22')
        // - przycisk 'Edytuj wniosek'
        e501.edytujWniosekPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edytuj wniosek').as('edytujWniosekK22')
        // - przycisk 'Edytuj sekcję wniosku' - brak takiego przycisku
        e501.edytujSekcjeWnioskuPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edytuj sekcję wniosku')
        // - przycisk 'Przegląd sekcji wniosku'
        e501.przegladSekcjiWnioskuPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Przegląd sekcji wniosku')

        // Użytkownik przechodzi do podglądu wybranego wniosku i rozwija listę osób wiodących.==============================================================================================================================================================
        
        cy.log('Krok 23 -  Użytkownik przechodzi do podglądu wybranego wniosku i rozwija listę osób wiodących.')
        let idRequest
        cy.get('#orderList_table > tbody > tr:nth-child(1) > td:nth-child(1)').invoke('text').then((c) => {
            idRequest = c
        })
        e501.edytujWniosekPierwszyPrzycisk().click({force: true})
        // Dostępne są przyciski "Osoby na planie", "Rozliczenie zasobów", "Historia zmian" i "Powrót"
        cy.get('#PeopleOnPlanBtn').should('be.visible').and('contain', 'Osoby na planie').as('osobyNaPlanieK23')
        cy.get('#CalculatedCostReportBtn').should('be.visible').and('contain', 'Rozliczenie zasobów').as('rozliczenieZasobowK23')
        e502.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian').as('historiaZmianK23')
        e502.powrotPrzycisk().should('be.visible').and('contain', 'Powrót').as('powrotK23')
        // Sekcja "Wniosek o przydzielenie zasobów" jest wypełniona danymi odpowiadającymi porozumieniu, z którego wniosek został stworzony. 
        cy.get('#HideExecuted').click()
        e502.wyszukajPrzycisk().click()

        cy.get('#AgreementAuditionName').should('be.visible').and('not.have.value', '')
        cy.get('#AgreementNumber').should('be.visible').and('not.have.value', '').invoke('attr', 'value').then(($value1)=>{
            const nrPorozumienia = $value1
        
            cy.get('#OrderingUnitName').should('be.visible').and('not.have.value', '')
            // Można rozwinąć sekcję 'Osoby wiodące', a w niej będą wypełnione kolumny 'Funkcje w projekcie', 'Imię i nazwisko' , 'Telefon' oraz 'e-mail'. Dostępny jest przycisk 'Podgląd'.
            cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('not.be.visible')
            cy.get('#btnCollapseLeadPerson').should('be.visible').click()
            cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('be.visible').and('have.attr', 'data-title', 'Funkcja w projekcie')
            cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Imię i nazwisko"]').should('be.visible').and('have.attr', 'data-title', 'Imię i nazwisko')
            cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Telefon"]').should('be.visible').and('have.attr', 'data-title', 'Telefon')
            cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="e-mail"]').should('be.visible').and('have.attr', 'data-title', 'e-mail')
            cy.get('#leadPersonList > tbody > tr:nth-child(1) > td.text-center.checkboxClass > button').should('be.visible').and('have.attr', 'title', 'Edycja')
            // Sekcja rezerwacje zawiera comboboxy umożliwiające wyszukanie po:
            // Sekcji, Statusie i Miejscu realizacji
            cy.checkingIfTheLocatorIsAContainer('#select2-SectionDefinitionId-container', 'Wybierz...')
            cy.checkingIfTheLocatorIsAContainer('#select2-OrderStatusId-container', 'Wybierz...')
            cy.checkingIfTheLocatorIsAContainer('#select2-ExecutionPlaceId-container', 'Wybierz...')
            // Można też dokonać wyszukania na podstawie dat.
            cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateFrom')
            cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateTo')
            // Widoczny jest zaznaczony checkbox "Ukryj zrealizowane".
            // cy.get('#HideExecuted').should('be.visible').and('be.checked')
            // Dostępne są przyciski:
            // Wyszukaj, Wyczyść filtry wyszukiwania.
            e502.wyszukajPrzycisk().should('be.visible').and('have.attr', 'title', 'Wyszukaj')
            e502.wyczyscFiltryPrzycisk().should('be.visible').and('have.attr', 'title', 'Wyczyść filtry wyszukiwania')
            // Dostępna jest sekcja z danymi rezerwacji, wszystkie wymagane kolumny i informacje są dostępne. Dostępne operacje to "Dane rezerwacji", "Zasoby" i "Szczegóły rezerwacji"
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Id. rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Id. rezerwacji')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr odcinka"]').should('be.visible').and('have.attr', 'data-title', 'Nr odcinka')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting_asc').should('be.visible').and('have.attr', 'data-title', 'Data rozpoczęcia realizacji')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting').should('be.visible').and('have.attr', 'data-title', 'Data zakończenia realizacji')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Sekcja"]').should('be.visible').and('have.attr', 'data-title', 'Sekcja')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Miejsce realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Miejsce realizacji')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible').and('have.attr', 'data-title', 'Status')
            // cy.get('.DTFC_ScrollWrapper > .dataTables_scroll > .dataTables_scrollBody').scrollTo('right')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Uwagi do rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Uwagi do rezerwacji')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .checkboxClass').should('be.visible').and('have.attr', 'data-title', 'Anulowana?')
            cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .noExport').should('contain', 'Operacje')

            e502.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Szczegóły rezerwacji')
            e502.zasobyPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Zasoby')
            e502.daneRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Dane rezerwacji')
            // Sekcja załączniki jest dostępna.
            cy.get(':nth-child(8) > .fieldsetField').should('be.visible').and('contain', 'Załączniki ')

            // Kliknij na przycisk "Osoby na planie". Kliknij przycisk "Zamknij"==============================================================================================================================================================
            cy.log('Krok 24 -  Kliknij na przycisk "Osoby na planie". Kliknij przycisk "Zamknij"')
            cy.get('@osobyNaPlanieK23').click()
            fWspolne.sprawdzProgressBar()
            // Otwiera się popup z sekcją Dane osoby, żadne z dostępnych pół nie jest edytowalne.
            cy.get('#peopleOnPlanForm > :nth-child(6) > .fieldsetField').should('be.visible').and('contain', 'Dane osoby')
            cy.get('#select2-RealizationPlaceId-container').should('be.visible')
            cy.get('.select2-search__field').should('be.visible')
            cy.get('#Name').should('be.visible')
            cy.get('#Comment').should('be.visible')
            // Dostępny jest button "Zamknij". Po kliknięciu go, popup jest zamykany.
            cy.get('#closeBtn').should('be.visible').click()
            cy.get('#peopleOnPlanForm > :nth-child(6) > .fieldsetField').should('not.exist')

            // Kliknij na przycisk Historia zmian. Kliknij na X w popupie ==============================================================================================================================================================
            cy.log('Krok 25 -  Kliknij na przycisk Historia zmian. Kliknij na X w popupie ')
            cy.get('@historiaZmianK23').click()
            // Pojawia się popup Historia zmian obiektu. Żadne pole nie jest edytowalne. Identyfikator obiektu odpowiada numerowi wniosku o zasoby. Typ obiektu to "wniosek o zasoby". Pozostałe dostępne kolumny i dane są zgodne z dokumentacją.
            cy.get('#historyModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Historia zmian obiektu')
            cy.get('#ObjectType').should('be.visible').and('have.attr', 'readonly')
            cy.get('#ObjectId').should(($p) => {
                expect($p).to.have.value(idRequest)
                expect($p).to.have.attr('readonly')
            })
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderOperationType"]').should('be.visible').and('have.attr', 'data-title', 'Rodzaj operacji')
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > .datetime-shortS').should('be.visible').and('have.attr', 'data-title', 'Data operacji')
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Użytkownik"]').should('be.visible').and('have.attr', 'data-title', 'Użytkownik')
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderItem"]').should('be.visible').and('have.attr', 'data-title', 'Pole')
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Stara wartość"]').should('be.visible').and('have.attr', 'data-title', 'Stara wartość')
            cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Nowa wartość"]').should('be.visible').and('have.attr', 'data-title', 'Nowa wartość')
            cy.get('#historyModal-close').click()
            cy.get('#historyModal-modalDialog').should('not.exist')

            // Kliknij na button 'Rozliczenie zasobów' ==============================================================================================================================================================
            cy.log('Krok 26 -  Kliknij na button "Rozliczenie zasobów" ')
            cy.get('@rozliczenieZasobowK23').click()
            // Sprawdzenie edytowalności pól na popupie
            cy.get('#calculatedCostsModal-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Generuj raport rozliczenia zasobów')
            cy.get('select#ReportAgreementId').should('have.prop', 'disabled', false).and('contain.text', nrPorozumienia)
            cy.get('select#ReportAuditionName').parent().should('be.visible')
            cy.get('select#ReportAuditionName').should('have.prop', 'disabled', false)
            cy.get('select#ReportTitleId').parent().should('be.visible')
            cy.get('select#ReportTitleId').should('have.prop', 'disabled', false)
            cy.get('#ReportAgreementVersionName').should('be.visible').and('have.prop', 'readOnly', true)
            cy.get('select#ReportAuditionIds').parent().should('be.visible')
            cy.get('select#ReportAuditionIds').should('have.prop', 'disabled', true)
            cy.get('#ReportShowResourcesUsage').should('be.visible').and('have.prop', 'disabled', false)
            cy.get('#GenerateForAllAuditions').should('be.visible').and('have.prop', 'disabled', false)
            cy.get('#GenerateForAllAuditions').click()
            cy.get('#ReportAuditionIds').should('have.prop', 'disabled', false)
            cy.get('#GenerateForAllAuditions').click()
        })
        // Kliknij button generuj ==============================================================================================================================================================
        // cy.log('Krok 27 -  Kliknij button generuj')

        // cy.get('#calculatedCostsModal-yesBtn').should('be.visible').and('contain', 'Generuj').click()

        // Zweryfikuj zapytanie i odpowiedź. - nie można zweryfikowac tego co jest w nowej zakładce

        // Kliknij na button 'Anuluj' ==============================================================================================================================================================
        cy.log('Krok 28 -  Kliknij na button "Anuluj"')
        cy.get('#calculatedCostsModal-noBtn').should('be.visible').and('contain', 'Anuluj').click()
        cy.get('#calculatedCostsModal-modalDialog > .modal-header > .modal-title').should('not.exist')

        // Kliknij na button powrót. ==============================================================================================================================================================
        cy.log('Krok 29 -  Kliknij na button powrót.')
        cy.get('@powrotK23').click()
        fWspolne.sprawdzProgressBar()
        cy.get('.breadcrumb-item.active').should('contain', 'Wnioski o przydzielenie zasobów')

        // Kliknij na button Edytuj dla tego samego wniosku o zasoby. Rozwiń sekcję "Osoby wiodące". ==============================================================================================================================================================
        cy.log('Krok 30 -  Kliknij na button Edytuj dla tego samego wniosku o zasoby. Rozwiń sekcję "Osoby wiodące"')
        e501.edytujWniosekPierwszyPrzycisk().click()
        cy.get('.breadcrumb-item.active').should('contain', 'Wniosek o przydzielenie zasobów')
        // Dostępne są przyciski "Osoby na planie", "Historia zmian", "Rozliczenie zasobów", "Zapisz" i "Powrót".
        cy.get('#PeopleOnPlanBtn').should('be.visible').and('contain', 'Osoby na planie')
        cy.get('#CalculatedCostReportBtn').should('be.visible').and('contain', 'Rozliczenie zasobów')
        cy.get('#SaveOrderBtn').should('be.visible').and('contain', 'Zapisz')
        e502.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        cy.get('#autoReturnClick').should('be.visible').and('contain', 'Powrót').as('powrotK30')
        // Sekcja "wniosek o przydzielenie zasobów" jest wypełniona danymi odpowiadającymi porozumieniu, z którego wniosek został stworzony. Pole Opis jest edytowalne.
        cy.get('#Description').should('be.visible').and('not.have.attr', 'readonly')
        // Można rozwinąć sekcję 'Osoby wiodące', a w niej będą wypełnione kolumny 'Funkcje w projekcie', 'Imię i nazwisko' , 'Telefon' oraz 'e-mail'.
        cy.get('#btnCollapseLeadPerson').click()
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > .thWrap').should('be.visible').and('have.attr', 'data-title', 'Funkcja w projekcie')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Imię i nazwisko"]').should('be.visible').and('have.attr', 'data-title', 'Imię i nazwisko')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="Telefon"]').should('be.visible').and('have.attr', 'data-title', 'Telefon')
        cy.get('.dataTables_scrollHeadInner > .table-striped > thead > tr > [data-title="e-mail"]').should('be.visible').and('have.attr', 'data-title', 'e-mail')
        // Przy każdym wierszu na liście sostępne są przyciski 'Podgląd' i "Edycja". Dodatkowo przy niektórych pojawia się również przycisk 'Usuń'.
        cy.get('#leadPersonList > tbody > tr:nth-child(1) > td.text-center.checkboxClass > button').should('be.visible').and('have.attr', 'title', 'Edycja')
        cy.get('.editBtnProducerOrDirector.personOptionBtn.btn.btn-success.btn-xs').first().should('be.visible').and('have.attr', 'title', 'Edycja')  
        // cy.get(':nth-child(3) > .text-center > span > .removeBtnLeadPerson').should('be.visible').and('have.attr', 'title', 'Usuń')
        // Sekcja rezerwacje zawiera comboboxy umożliwiające wyszukanie po:
        // Sekcji, Statusie i Miejscu realizacji. Można też dokonać wyszukania na podstawie dat. Z widoczny jest zaznaczony checkbox "Ukryj zrealizowane".
        cy.checkingIfTheLocatorIsAContainer('#select2-SectionDefinitionId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-OrderStatusId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsAContainer('#select2-ExecutionPlaceId-container', 'Wybierz...')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateFrom')
        cy.checkingIfTheLocatorIsACalendar('#div_ExecutionDateTo')
        // cy.get('#HideExecuted').should('be.visible').and('be.checked')
        // Dostępne są buttony: "Wyszukaj", "Wyczyść filtry wyszukiwania", "Dodaj rezerwacje" i "Masowe dodawanie rezerwacji". 
        e502.wyszukajPrzycisk().should('be.visible').and('have.attr', 'title', 'Wyszukaj')
        e502.wyczyscFiltryPrzycisk().should('be.visible').and('have.attr', 'title', 'Wyczyść filtry wyszukiwania')
        e502.dodajRezerwacjePrzycisk().should('be.visible').and('have.attr', 'title', 'Dodaj rezerwację')
        e502.masoweDodawanieRezerwacjiPrzycisk().should('be.visible').and('have.attr', 'title', 'Masowe dodawanie rezerwacji')
        // Dostępna jest sekcja z danymi rezerwacji, wszystkie wymagane kolumny i informacje są dostępne. Dostępne operacje to "Dane rezerwacji", "Zasoby", "Szczegóły rezerwacji", "Edycja rezerwacji" i "Usuń rezerwację".
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Id. rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Id. rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Nr odcinka"]').should('be.visible').and('have.attr', 'data-title', 'Nr odcinka')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting_asc').should('be.visible').and('have.attr', 'data-title', 'Data rozpoczęcia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .date.sorting').should('be.visible').and('have.attr', 'data-title', 'Data zakończenia realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Sekcja"]').should('be.visible').and('have.attr', 'data-title', 'Sekcja')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Miejsce realizacji"]').should('be.visible').and('have.attr', 'data-title', 'Miejsce realizacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Status"]').should('be.visible').and('have.attr', 'data-title', 'Status')
        // cy.get('.DTFC_ScrollWrapper > .dataTables_scroll > .dataTables_scrollBody').scrollTo('right')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > [data-title="Uwagi do rezerwacji"]').should('be.visible').and('have.attr', 'data-title', 'Uwagi do rezerwacji')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .checkboxClass').should('be.visible').and('have.attr', 'data-title', 'Anulowana?')
        // cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .noExport').scrollIntoView().should('be.visible').and('contain', 'Operacje')
        cy.get('.dataTables_scrollHeadInner > .table > thead > tr > .noExport').should('contain', 'Operacje')
        // cy.get('#HideExecuted').click()
        // cy.get('button[title="Wyszukaj"]').click()
        e502.szczegolyRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Szczegóły rezerwacji')
        e502.zasobyPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Zasoby')
        e502.edycjaRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Edycja rezerwacji')
        e502.daneRezerwacjiPierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Dane rezerwacji')   
        e502.usunRezerwacjePierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Usuń rezerwację')
        // Sekcja załączniki jest dostępna. Dostępne są buttony: "Dodaj plik do repozytorium" i "Dodaj link do załącznika".
        cy.get(':nth-child(8) > .fieldsetField').should('be.visible').and('contain', 'Załączniki ')
        cy.get('#btnSelectAttachmentLocal').should('be.visible').and('have.attr', 'title', 'Dodaj Plik Do Repozytorium')
        cy.get('#btnSelectAttachmentScanFile').should('be.visible').and('have.attr', 'title', 'Dodaj Link Do Załącznika')

        // Kliknij w przycisk 'Dodaj osobę' znajdujący się nad listą osób wiodących. ==============================================================================================================================================================
        cy.log('Krok 31 -  Kliknij w przycisk "Dodaj osobę" znajdujący się nad listą osób wiodących')
        e22.dodajOsobePrzycisk().click({force: true})
        // Pojawi się popup z nagłówkiem "Osoba w projekcie".
        cy.get('#personInProject-modalDialog > .modal-header > .modal-title', {timeout: 20000}).should('be.visible').and('have.text', 'Osoba w projekcie')
        // Na popupie znajdują się następujące pola:
        // Funkcja w projekcie (dropdown)
        cy.checkingIfTheLocatorIsAContainer('#select2-IdFunction-container', 'Wybierz...')
        // konto w SPPT (checkbox)
        cy.get('#UserFromSepp').should('be.visible').and('have.attr', 'type', 'checkbox')
        // Nazwisko (input)
        cy.get('#Surname').should('be.visible').and('have.attr', 'type', 'text').and('not.have.attr', 'disabled', 'disabled')
        // Imię (input)
        cy.get('#Name').should('be.visible').and('have.attr', 'type', 'text').and('not.have.attr', 'disabled', 'disabled')
        // Telefon (input)
        cy.get('#PhoneNumber').should('be.visible').and('have.attr', 'type', 'text').and('not.have.attr', 'disabled', 'disabled')
        // e-mail (input)
        cy.get('#Email').should('be.visible').and('have.attr', 'type', 'email').and('not.have.attr', 'disabled', 'disabled')
        // Zatwierdź (przycisk)
        cy.get('#personInProject-yesBtn').should('be.visible').and('contain', 'Potwierdź')
        // Anuluj (przycisk)
        cy.get('#personInProject-noBtn').should('be.visible').and('contain', 'Anuluj')
        // Kliknij w przycisk "Anuluj" i potwierdź operację. ==============================================================================================================================================================
        cy.log('Krok 32 -  Kliknij w przycisk "Anuluj" i potwierdź operację.')
        cy.get('#personInProject-noBtn').click()
        // Popup się zamyka. Następuje powrót do ekranu szczegółów wniosku o zasoby.
        cy.get('#personInProject-container').should('not.be.visible')

        // Użytkownik przechodzi do ekranu 'Zamówienia zewnętrzne'. ==============================================================================================================================================================
        cy.log('Krok 33 -  Użytkownik przechodzi do ekranu "Zamówienia zewnętrzne"')
        cy.goToMenu('Zamówienia zewnętrzne')
        // zapisanie nazwy audycji
        let idRequest2
        cy.get('.odd:nth-child(1) > :nth-child(4)').invoke('text').then((c) => {
            idRequest2 = c
        })
        // Użytkownik widzi tylko te zamówienia zewnętrzne które są przypisane do porozumień do których ma dostęp.
        // Użytkownik widzi:
        // -przycisk 'Podgląd' (na każdym zamówieniu)
        // -przycisk 'Przegląd wniosku o zasoby (na każdym zamówieniu)
        cy.get('#externalOrderList_table > tbody > tr', { timeout: 20000 }).each(() => {
            cy.get('.text-center > .btn-info').should('be.visible').and('have.attr', 'title', 'Podgląd')
            // cy.get('.text-center > .btn-purple').should('be.visible').and('have.attr', 'title', 'Przegląd wniosku o zasoby') // widoczne tylko dla rezerwacji
        })

        // Użytkownik przechodzi do podglądu wybranego zamówienie zewnętrznego. ==============================================================================================================================================================
        cy.log('Krok 34 -  Użytkownik przechodzi do podglądu wybranego zamówienie zewnętrznego.')
        e516.podgladPierwszyPrzycisk().click()
        // Użytkownik widzi:
        // -przycisk 'Powrót'
        cy.get('button.btn-info').should('be.visible').and('contain', 'Powrót')
        // -przycisk 'Historia zmian'
        e51601.historiaZmianPrzycisk().should('be.visible')
        // -przycisk 'P' (przegląd wniosku o zasoby)
        cy.get('#AgreementTableId > tbody > tr > td:nth-child(1) > a').should('have.text', '2000003').as('idWnioskuOZasoby')

        // Wejdź i sprawdź  przycisk "Historia zmian" ==============================================================================================================================================================
        cy.log('Krok 35 -  Wejdź i sprawdź  przycisk "Historia zmian"')
        e51601.historiaZmianPrzycisk().click()
        // Pojawia się popup Historia zmian obiektu. Żadne pole nie jest edytowalne. Identyfikator obiektu odpowiada numerowi wniosku o zasoby. Typ obiektu to "Zamówienie zewnętrzne". Pozostałe dostępne kolumny i dane są zgodne z dokumentacją.

        cy.get('#historyModal-modalDialog > div.modal-header').should('be.visible').and('contain', 'Historia zmian obiektu')
        cy.get('#ObjectType').should('be.visible').and('have.attr', 'readonly')
        // cy.get('#ObjectId').should(($p) => {    //błąd - identyfikator obiektu odpowiada nr zamowienia a nie id wniosku o zasoby
        //     expect($p).to.have.value(idRequest2)
        //     expect($p).to.have.attr('readonly')
        // })
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderOperationType"]').should('be.visible').and('have.attr', 'data-title', 'Rodzaj operacji')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > .datetime-shortS').should('be.visible').and('have.attr', 'data-title', 'Data operacji')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Użytkownik"]').should('be.visible').and('have.attr', 'data-title', 'Użytkownik')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-body-render="renderItem"]').should('be.visible').and('have.attr', 'data-title', 'Pole')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Stara wartość"]').should('be.visible').and('have.attr', 'data-title', 'Stara wartość')
        cy.get('.dataTables_scrollHeadInner > .dataTable > thead > tr > [data-title="Nowa wartość"]').should('be.visible').and('have.attr', 'data-title', 'Nowa wartość')
        cy.get('#historyModal-close').click()
        cy.get('#historyModal-modalDialog').should('not.exist')

        // Przejdź do powiązanego wniosku o zasoby ==============================================================================================================================================================
        cy.log('Krok 36 - Kliknij w link do powiązanego wniosku o zasoby')
        cy.get('@idWnioskuOZasoby').click()
        // Użytkownik jest przeniesiony do ekranu wniosku o zasoby. Nazwa audycji odpowiada danym z zamówienia zewnętrznego
        cy.get('.breadcrumb-item.active').should('contain', 'Wniosek o przydzielenie zasobów')
        e502.nazwaAudycjiTVPoleTekstowe().should(($p) => {
            expect($p).have.value(idRequest2)
        })

        // Kliknij przycisk powrót. ==============================================================================================================================================================
        cy.log('Krok 37 - Kliknij przycisk powrót.')
        e51601.powrotPrzycisk().click()
        // Użytkownik jest przeniesiony do ekranu zamówień zewnętrznych.
        cy.get('.breadcrumb-item.active').should('contain', 'Dane zamówienia zewnętrznego')

        // Użytkownik przechodzi do ekranu 'Zlecenia pracy'.==============================================================================================================================================================
        cy.log('Krok 38 -  Przejście do ekranu "Zlecenia pracy"')
        cy.goToMenu('Zlecenia pracy')
        // Użytkownik widzi:
        // - przycisk 'Przegląd rezerwacji' (na każdym zleceniu)
        // - przycisk 'Przegląd zlecenia pracy' (na każdym zleceniu)
        // - przycisk "Zatwierdzenie/odrzucenie wyceny" - tego przycisku nie ma
        // - przycisk ''Raport rozliczenie kosztów zasobów'
        cy.get('#orderList_table > tbody > tr', { timeout: 30000 }).each(() => {
            cy.get('.text-center > .btn-info').should('be.visible').and('have.attr', 'title', 'Przegląd rezerwacji')
            cy.get('.text-center > .btn-purple').should('be.visible').and('have.attr', 'title', 'Przegląd zlecenia pracy')
            cy.get('.text-center > .btn-gray').should('be.visible').and('have.attr', 'title', 'Raport rozliczenie kosztów zasobów')
        })

        // Użytkownik wybiera zlecenie i przechodzi do Przegląd rezerwacji.==============================================================================================================================================================
        cy.log('Krok 39 -  Wybranie zamówienia i przejście do podglądu rezerwacji')
        e504.przegladRezerwacjiPierwszyPrzycisk().click()
        // Użytkownik jest przeniesiony do ekranu szczegółów rezerwacji, w tabeli są dane z numerem porozumienia i tytułem porozumienia.
        cy.get('.odd > :nth-child(2)').should('contain', 'P/').and('contain', 'AKFiS')
        cy.get('.odd > :nth-child(3)').should('not.be.empty')
        // Dostępny jest przycisk: rozwinięcia danych rezerwacji, "Pokaż wniosek o przydzielenie zasobów", "Powrót", "Historia zmian", "Drukuj" i "Drukuj zestawienie sprzętu".
        cy.get('.far').should('be.visible')
        cy.get(':nth-child(6) > .btn-info').should('be.visible').and('have.attr', 'title', 'Pokaż wniosek o przydzielenie zasobów').as('pokazWniosek')
        cy.get('.return-button').should('be.visible').and('contain', 'Powrót').as('powrot')
        cy.get(':nth-child(6) > .btn-yellow').should('be.visible').and('have.attr', 'title', 'Historia zmian').as('historiaZmian')
        cy.get('[title="Drukuj"]').should('be.visible').and('contain', 'Drukuj')
        cy.get('.btn-purple').should('be.visible').and('have.attr', 'title', 'Drukuj zestawienie sprzętu').as('drukujZestawienie')
        // Dostępne jest pole "Rozwiń wszystko".
        cy.get('.all-collapse').should('be.visible').and('have.text', 'Rozwiń wszystko').as('wszystko')

        // Użytkownik klika tekst "Rozwiń wszystko".==============================================================================================================================================================
        cy.log('Krok 40 -  Kliknij tekst "Rozwiń wszystko".')
        cy.get('@wszystko').click()
        // /Rozwijają się szczegółowe dane rezerwacji. 
        cy.get('[data-title="Nazwa zasobu"]').should('be.visible')
        cy.get('[data-title="Uwagi"]').should('be.visible')
        // Tekst "Rozwiń wszystko" zmienia się na "Zwiń wszystko".
        cy.get('@wszystko').should('be.visible').and('have.text', 'Zwiń wszystko')

        // Kliknij przycisk "Przegląd wniosku o zasoby".==============================================================================================================================================================
        cy.log('Krok 41 -  Kliknij przycisk "Przegląd wniosku o zasoby".')
        let agrementNr
        cy.get('.shown > :nth-child(2)').invoke('text').then((c) => {
            agrementNr = c
        })
        // Użytkownik jest przeniesiony do ekranu wniosku o zasoby. "ID wniosku" odpowiada danym z ekranu szczegołów rezerwacji.
        cy.get('@pokazWniosek').click()

        cy.get('#AgreementNumber').should(($p) => {
            expect($p).to.have.value(agrementNr)
        })
        // Kliknij Powrót
        cy.get('@powrot').click()
        // Użytkownik wraca do ekranu szczegółów rezerwacji.
        cy.url().should('contain', 'SmfReservationDetailsList/SingleDetailsFromWorkOrderList')

        // Kliknij przycisk "Historia zmian".==============================================================================================================================================================
        cy.log('Krok 42 - Kliknij przycisk "Historia zmian"')
        cy.get('@historiaZmian').click()
        
        // Pojawia się popup Historia zmian obiektu. Żadne pole nie jest edytowalne. Identyfikator obiektu odpowiada typowi obiektu źródłowego, identyfikator odpowiada identyfikatorowi.
        cy.get('#historyModal-modalDialog > div.modal-header').should('be.visible').and('contain', 'Historia zmian obiektu')
        cy.get('#ObjectType').should('be.visible').and('have.attr', 'readonly')
        cy.get('#ObjectId').should('be.visible').and('have.attr', 'readonly')
        // Zamknij popup
        cy.get('#historyModal-close').click()

        // Kliknij przycisk "Drukuj zestawienie sprzętu".==============================================================================================================================================================
        cy.log('Krok 43 - Kliknij przycisk "Drukuj zestawienie sprzętu".')
        cy.get('@drukujZestawienie').click()

        // /Pojawia się popup z "Drukuj zestawienie sprzętu". Zawiera kolumnę dzień zdjęciowy i checkbox (nie zaznaczony) do wybrania wszystkich dni. Są buttony Zatwierdź i Powrót. 
        cy.get('#printEquipmentsReport-modalDialog > .modal-header > .modal-title').should('be.visible').and('contain', 'Drukuj zestawienie sprzętu')
        cy.get('[data-title="Dzień zdjęciowy"]').should('be.visible')
        cy.get('[data-body-classname="noExport"] > input').should('be.visible').and('not.be.checked')
        cy.get('#printEquipmentsReport-yesBtn').should('be.visible').and('contain', 'Zatwierdź').as('zatwierdz')
        cy.get('#printEquipmentsReport-noBtn').should('be.visible').and('contain', 'Powrót').as('powrotDrukuj')

        // Zaznacz pierwszy checkbox z listy i kliknij "Zatwierdź".
        cy.log('Krok 44 - Zaznacz pierwszy checkbox z listy i kliknij "Zatwierdź"')
        cy.get('#Items_0__Selected').check().should('be.checked')
        cy.get('#Items_0__Selected').uncheck().should('not.be.checked')
        // cy.get('@zatwierdz').click()
        cy.get('@powrotDrukuj').click()

        // 	Uzytkownik jest przeniesiony do nowej zakładki. Otwiera się "SZCZEGÓŁY REZERWACJI - ZESTAWIENIE SPRZĘTU". Dane akie jak "Nr. Porozumienia", "Tytuł", "Nazwa zasobu" i "Miejsce realizacji" zgadzają się z danymi ze szczegółów rezerwacji. 
        //
        // Brak mozliwości sprawdzenia otwarcia nowego okna
        //

        // Kliknij przycisk powrót
        cy.log('Krok 45 - Kliknij przycisk powrót')

        cy.get('@powrot').click()
        fWspolne.sprawdzProgressBar()
        // Użytkownik wraca do ekranu Zleceń pracy.
        cy.get('.breadcrumb-item.active').should('contain', 'Zlecenia Pracy') 

        // Kliknij przycisk "Zatwierdzenie/odrzucenie wyceny".
        // cy.log('Krok 46 - Kliknij przycisk "Zatwierdzenie/odrzucenie wyceny".')
        //
        // Brak takiego przycisku
        //
        // Otwiera się popup ze szczegółami zlecenia pracy. Wszystkie pola po za polem "Uwagi do wyceny" są nieedytowalne. Dostępne przyciski to "Potwierdź wycenę" i "Odrzuć wycenę".
        //
        // Zamknij popup.         

        // Przejdź do ekranu "Planowania produkcji".
        cy.log('Krok 47 - Przejdź do ekranu "Planowania produkcji"')
        cy.goToMenu('Planowanie produkcji')

        // Walidacja widoczności głównych elementów strony. 
        e503.przedzialCzasuPrzycisk().should('be.visible')

        // Użytkownik przechodzi do ekranu 'Karty pracy'.
        cy.log('Krok 48 - Użytkownik przechodzi do ekranu "Karty pracy".')
        cy.goToMenu('Karty pracy')

        // Użytkownik widzi tylko te karty pracy które są powiązane z porozumieniami do których ma dostęp. - brak możliwości sprawdzenia tego wymagania
        // Użytkownik widzi:
        // - przycisk 'Przeglądaj wycenę' (na każdej karcie)
        cy.get('#workCardList_table > tbody > tr', { timeout: 30000 }).each(() => {
            e509.przegladajWycenePierwszyPrzycisk().should('be.visible').and('have.attr', 'title', 'Przeglądaj wycenę')
        })

        // Kliknij na przycisk "Przeglądaj wycenę"
        cy.log('Krok 49 - Kliknij na przycisk "Przeglądaj wycenę"')
        e509.rodzajKartyLista().select('Zbiorcza', {force: true})
        e509.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e509.przegladajWycenePierwszyPrzycisk().click()
        // Otwiera się ekran "Szczegóły karty pracy". Wszystkie pola na ekranie są nieedytowalne.
        cy.get('.breadcrumb-item.active').should('contain', 'Szczegóły karty pracy')
        cy.get('.col-lg-9 > #Id').should('have.attr', 'readonly', 'readonly')
        cy.get('#WorkCardTypeString').should('have.attr', 'readonly', 'readonly')
        cy.get('#DateFrom').should('have.attr', 'readonly', 'readonly')
        cy.get('#DateTo').should('have.attr', 'readonly', 'readonly')
        cy.get('#ServiceCodeName').should('have.attr', 'readonly', 'readonly')
        cy.get('#ValuationBasisIName').should('have.attr', 'readonly', 'readonly')
        cy.get('.select2-selection').should('have.attr', 'tabindex', '-1')
        cy.get('#WorkCardStatus').should('have.attr', 'readonly', 'readonly')
        cy.get('#WorkCardVersion').should('have.attr', 'readonly', 'readonly')
        cy.get('#GeneratedDate').should('have.attr', 'readonly', 'readonly')
        cy.get('#GeneratedPerson').should('have.attr', 'readonly', 'readonly')
        cy.get('#PrintedDate').should('have.attr', 'readonly', 'readonly')
        cy.get('#PrintedPerson').should('have.attr', 'readonly', 'readonly')

        // Dostępne są buttony "Rabat", "Historia zmian" i "Powrót".
        // cy.get('.btn-white').should('be.visible').and('contain', 'Rabat').as('rabat') ( pole dostępne tylkoe jeżeli rodzaj karty pracy =! 'Honoracyjna')
        e50901.historiaZmianPrzycisk().should('be.visible').and('contain', 'Historia zmian')
        // cy.get('[onclick="fnConfirmOrCancel()"]').should('be.visible').and('contain', 'Powrót')
        cy.get('#WorkCardReturn').should('be.visible').and('contain', 'Powrót')

        // Kliknij na przycisk "Rabat".
        cy.log('Krok 50 - Kliknij na przycisk "Rabat"')
        cy.get('.btn-white').click()
        cy.get('input#DiscountType.radioBtn').eq(0).should('be.disabled')
        cy.get('input#DiscountType.radioBtn').eq(1).should('be.disabled')
        cy.get('#discountsTable > tbody > tr:nth-child(1)').contains('Brak danych')
        cy.get('#DiscountValue').should('have.attr', 'readonly')

        // Kliknij przycisk Powrót.
        cy.get('button:contains("Powrót")').last().should('be.visible').and('be.enabled').click({force:true})
        cy.get('.breadcrumb-item.active').should('be.visible').and('contain', 'Szczegóły karty pracy')

        // Wylogowanie
        cy.logoutUser()
    })
})