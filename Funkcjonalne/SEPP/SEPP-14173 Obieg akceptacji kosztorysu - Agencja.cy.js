import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e10 } from '../../../../POM/Logowanie/E10 Logowanie'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'

describe('SEPP-14173 Obieg akceptacji kosztorysu - Agencja', () => {
    
    const porozumienieDane = {
        agencja: 'AKFiS',
        jednostkaUslugowa: 'CUP',
        producent: 'test_user_2',
        cel: '[PU] Kosztorys planowany (poza Brief) z kosztorysem usługowym',
        audycjaTV: 'SEPP-14173 Audycja Testowa - Agencja',
        modelProdukcji: 'W - Wewnętrzny',
        rodzajPrzychodu: 'PW - Przychody wewnętrzne',
        rodzajPorozumienia: 'produkcyjne',
        pozycjaEdycji: {
            'Montażysta': {
                nazwa: 'Montażysta',
                JednostkaTVPSA: 'CUP',
                RodzajZatrudnienia: 'współpracownik',
                JednostkaObliczeniowa: 'godzina',
                LiczbaJednOblicz: 8,
                StawkaZaJednOblicz: '80,00 zł'
            },
            'Kabina lektorska': {
                nazwa: 'KABINA LEKTORSKA',
                JednostkaTVPSA: 'CUP',
                LiczbaJednOblicz: 8,
                // Vat: 'ZW'
            }
        }
    }

    function sprawdzAkceptacjeKU(numerIkony){
        let etykiety = ['KKW', 'AKU', 'P/KP', 'DYR JU']
        for(let i=0;i<4;i++){
            e22.akceptacjeIkonyBlok().find('label').eq(i).should('contain', etykiety[i])
            e22.akceptacjeIkonyBlok().find('span').eq(i).should('have.attr', 'title', (i<=numerIkony) ? 'Akceptacja' : 'Brak akceptacji')
            e22.akceptacjeIkonyBlok().find('span').eq(i).should('have.attr', 'class', (i<=numerIkony) ? 'dotGreen fas fa-check' : 'dotGrey fas fa-times')
        }
    }

    it('Obieg akceptacji kosztorysu - Producent1', () => {

        // strona glowna i logowanie 
        cy.visit('/')
            .loginProducent()

        cy.goToMenu('Porozumienia')
        fWspolne.sprawdzProgressBar()
        e10.nazwaUzytkownika().should('contain',porozumienieDane.producent)

        cy.log('Krok 1 - Przejście na ekran tworzenia nowego porozumienia')
        e20.dodajPorozumieniePrzycisk().click()

        cy.log('Krok 2 - Wypełnij dane porozumienia')
        e20.dodajPorozumienie(porozumienieDane)

        cy.log('Krok 3 - Zapisz porozumienie')
        e20.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 4 - Przejście na ekran "Koszty planowane"')
        e22.kosztyPlanowanePrzycisk().click() 
        // Otwiera się ekran Kosztorysu
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        // Aktywny kafelek 'Producent/Kierownik produkcji' wyświetla się na czerwono z etykietą 'Wprowadzony'.
        // W sekcji 'Uwagi/Komentarze' wyświetla się licznik o wartości 0.
        e23.uwagiKomentarzeEtykieta().should('contain', '[0]')

        cy.log('Krok 5 - Edytuj pozycję Montażysta w grupie Prace reżysersko-realizacyjne')
        // Rozwiń belkę 'Prace reżysersko-realizacyjne' w grupie 'Wynagrodzenia'.
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        // Przejdź do edycji wybranej pozycji kosztowej
        e23.edytujKosztPrzycisk('Montażysta').click()

        cy.log('Krok 6 - Wypełnij wartości dla wybranej pozycji kosztowej')
        e23.wypelnijPozycjeWartosciami(porozumienieDane.pozycjaEdycji['Montażysta'])

        cy.log('Krok 7 - Zatwierdzenie kosztu')
        e23.pozycjaWCennikuJULista().select('Wszystkie gatunki ->  Wszystkie podgatunki  ->   Montażysta - początkujący', {force: true})
        e23.czySzacowanieZaOdcPrzyciskWyboru().click()
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 8 - Dodanie kosztu dla pozycji sprzętowej w grupie Koszty techniczne urządzeń własnych')
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').click()
        e23.wypelnijPozycjeWartosciami(porozumienieDane.pozycjaEdycji['Kabina lektorska'])
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        
        cy.log('Krok 9 - Producent przekazuje KU')
        e23.producentKierownikProdukcjiEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.producentKierownikProdukcjiEtykieta().should('contain', 'Wprowadzony')
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'Brak akceptacji')
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Brak akceptacji')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')
        e23.przekazProducentKierownikProdukcjiPrzycisk().click()
        // Otwiera się popup do przekazywania kosztorysu gdzie zakład 'TPTP' jest domyślnie zaznaczony i wyszarzony.

        cy.log('Krok 10 - Producent potwierdza przekazanie kosztorysu')
        e23.przekazKosztorysPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.producentKierownikProdukcjiEtykieta().should('contain', 'Przekazany do JU')

        cy.log('Krok 11 - Producent weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 12 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - KKW', () => {            
        cy.log('Krok 13 - Zalogowanie Kierownika Komórek Wyspecjalizowanych, przejście do "Porozumienia" i wyszukanie porozumienia')
        cy.visit('/')
            .loginAkceptantKUKomorkiWyspecjalizowanej()
        cy.goToMenu('Porozumienia')

        cy.log('Krok 14 - Edycja porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 15 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[1]')
        // Otwiera się ekran Kosztorysu.
        // Kafelek 'Kierownicy komórek wyspecjalizowanych' wyświetla się na czerwono z etykietą 'Brak akceptacji'.
        // Na kafelku przy etykiecie 'TPTP' jest widoczna czerwona ikona.
        // W sekcji 'Uwagi/Komentarze' wyświetla się licznik o wartości 1.
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'TPTP')
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Brak akceptacji')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 16 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('be.visible')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('be.visible')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 17 - Kierownik Komórek Wyspecjalizowanych zatwierdza KU')
        e23.zatwierdzKierownicyKomorekWyspecjalizowanychPrzycisk().click()

        cy.log('Krok 18 - Potwierdzenie zatwierdzenia KU')
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 19 - Kierownik Komórek Wyspecjalizowanych weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 20 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Akceptant KU', () => {
        cy.log('Krok 21 - Zalogowanie Akceptanta Kompletności KU, przejście na ekran "Porozumienia" i wyszukanie porozumienia')
        cy.visit('/')
            .loginAkceptantKompletnosciKU()
        cy.goToMenu('Porozumienia')

        cy.log('Krok 22 - Wejście w szczegóły porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(0)

        cy.log('Krok 23 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[2]')
        e23.akceptantKompletnosciKUEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 24 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('be.visible')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('be.visible')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 25 - Akceptant kompletności KU zatwierdza Kosztorys')
        e23.zatwierdzAkceptantKompletnosciKUPrzycisk().click()

        cy.log('Krok 26 - Potwierdzenie zatwierdzenia KU')
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 27 - Akceptant kompletności KU weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 28 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Producent2', () => {
        cy.log('Krok 29 - Zalogowanie Producenta, przejście ekran "Porozumienia" i wyszukanie porozumienia')
        cy.visit('/')
            .loginProducent()

        cy.goToMenu('Porozumienia')
        e10.nazwaUzytkownika().should('contain',porozumienieDane.producent)

        cy.log('Krok 30 - Wejście w szczegóły porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(1)

        cy.log('Krok 31 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[3]')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 32 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 33 - Producent zatwierdza i przekazuje dalej KU')
        e23.przekazProducentKierownikProdukcjiDrugaAkceptacjaPrzycisk().click()

        cy.log('Krok 34 - Potwierdzenie zatwierdzenia KU')
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 35 - Producent weryfikuje czy po przekazaniu nadal ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 36 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Dyrektor Agencji CUP', () => {
        cy.log('Krok 37 - Zalogowanie Dyrektora Agencji CUP, przejście ekran "Porozumienia" i wyszukanie porozumienia')
        cy.visit('/')
            .loginDyrektorAgencjiCUP()

        cy.goToMenu('Porozumienia')

        cy.log('Krok 38 - Wejście w szczegóły porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(2)

        cy.log('Krok 39 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.odrzucDyrekcjaJUPrzycisk().should('be.visible')
        e23.uwagiKomentarzeEtykieta().should('contain', '[4]')
        e23.dyrekcjaJUEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')

        cy.log('Krok 40 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 41 - Dyrektor JU akceptuje KU')
        e23.akceptujDyrekcjaJUPrzycisk().click()

        cy.log('Krok 42 - Potwierdzenie akceptacji KU')
        e23.popupAkceptujPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.dyrekcjaJUEtykieta().should('contain', 'Akceptacja')
        e23.akceptujDyrekcjaJUPrzycisk().should('not.exist')
        e23.odrzucDyrekcjaJUPrzycisk().should('be.visible')

        cy.log('Krok 43 - Dyrektor JU weryfikuje czy po przekazaniu ma nadal zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Montażysta').should('not.exist')
        e23.edytujKosztPrzycisk('Asystent montażysty').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('KABINA LEKTORSKA').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 44 - Powrót na ekran szczegółów porozumienia i sprawdzenie czy odnotowano akceptację kosztorysu')
        e23.powrotPrzycisk().click()
        sprawdzAkceptacjeKU(3)

        // Wylogowanie
        cy.logoutUser()
    })
})
