import { DateTime } from 'luxon'
import { fWspolne } from '../../../../POM/Funkcje wspolne/Funkcje wspolne'
import { e20 } from '../../../../POM/Planowanie/E20 Porozumienia'
import { e22 } from '../../../../POM/Planowanie/E22 Porozumienia - szczegoly'
import { e23 } from '../../../../POM/Planowanie/E23 Koszty planowane'

describe('SEPP-16937 Obieg akceptacji na kosztorysie skopiowanym ze starego porozumienia', () => {
    const dzisiaj = DateTime.now().toFormat('dd.MM.yyyy')
    const zaMiesiac = DateTime.now().plus({days:30}).toFormat('dd.MM.yyyy')

    function sprawdzAkceptacjeKU(numerIkony){
        let etykiety = ['KKW', 'AKU', 'P/KP', 'DYR JU']
        for(let i=0;i<4;i++){
            e22.akceptacjeIkonyBlok().find('label').eq(i).should('contain', etykiety[i])
            e22.akceptacjeIkonyBlok().find('span').eq(i).should('have.attr', 'title', (i<=numerIkony) ? 'Akceptacja' : 'Brak akceptacji')
            e22.akceptacjeIkonyBlok().find('span').eq(i).should('have.attr', 'class', (i<=numerIkony) ? 'dotGreen fas fa-check' : 'dotGrey fas fa-times')
        }
    }
    
    it('Skopiowanie starego porozumienia i przekazanie kosztorysu do KKW', () => {
        cy.log('Krok 1 - Loguję się jako Producent') 
        cy.visit('/')
            .loginProducent() 

        cy.log('Krok 2 - Jestem na ekranie listy porozumień i przechodzę na ekran edycji wybranego porozumienia')    
        cy.goToMenu('Porozumienia')
        e20.numerPorozumieniaPoleTekstowe().type('P/1001743/AKFiS/2021')
        e20.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e20.edycjaPierwszyPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 3 - Jestem na ekranie szczegółów porozumienia i kopiuję je') 
        e22.kopiujPrzycisk().click()
        e22.agencjaPopupLista().should('be.visible').select('AKFiS', {force: true})
        e22.zaznaczPierwszyKosztorysPrzyciskWyboru().check()
        e22.potwierdzKopiujPopupPrzycisk().click()
        e22.potwierdzKopiujPopupPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#notificationPopupText').should('be.visible').and('contain','Operacja kopiowania porozumienia powiodła się.')
        cy.get('a.btn-sm > i.fas.fa-check').click()

        cy.log('Krok 4 - Jestem na ekranie szczegółów porozumienia i edytuję nowe porozumienie')
        e22.audycjaTVPoleTekstowe().type(' (kopia)')
        e22.celKosztorysuLista().select('[PU] Kosztorys planowany (poza Brief) z kosztorysem usługowym', {force:true})
        e22.modelProdukcjiLista().select('W - Wewnętrzny', {force: true})
        e22.czasPoleTekstowe().type('10')
        e22.terminRozpoczeciaPoleTekstowe().type(dzisiaj)
        e22.terminOdbioruPoleTekstowe().type(zaMiesiac)
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 5 - Weryfikacja komunikatu walidacyjnego o braku przypisania pozycji cennikowych')
        cy.get('#notificationErrorPopupText').should('contain.text', 'Dla poniższych pozycji kosztorysu należy wskazać aktualną pozycję z cennika CUP:').and('contain.text','030 Prace reżysersko-realizacyjne pozycja: 000017 Asystent operatora kamery').and('contain.text','070 Prace techniczne i pomocnicze pozycja: 000057 RTP - przegląd emisyjny').and('contain.text','Operacja zapisu zmiany celu kosztorysu została anulowana.')
        cy.get('a.btn-danger').click()

        cy.log('Krok 6 - Jestem na ekranie kosztów planowanych i przypisuje brakujące pozycje cennikowe')
        e22.kosztyPlanowanePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.edytujKosztPrzycisk('Asystent operatora kamery').click()
        e23.pozycjaWCennikuJULista().select('Publicystyka i edukacja ->  ABC - technika studyjna  ->  Kategoria: I ->  Asystent operatora kamery', {force: true})
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.rodzajKosztuPrzycisk('Prace reżysersko-realizacyjne').click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.dodajUslugeProduktPrzycisk().should('be.visible')
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').click()
        e23.pozycjaWCennikuJULista().select('Wszystkie gatunki ->  Wszystkie podgatunki  ->   RTP - przegląd emisyjny', {force: true})
        e23.jednostkaObliczeniowaLista().find('option:selected').should('have.text', 'godzina')
        e23.zatwierdzKosztPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        e23.zatwierdzKosztPrzycisk().should('not.exist')

        cy.log('Krok 7 - Wracam na ekran szczegółów porozumienia i ponownie edytuję porozumienie')
        e23.powrotPrzycisk().click()
        e22.audycjaTVPoleTekstowe().type(' (kopia)')
        e22.celKosztorysuLista().select('[PU] Kosztorys planowany (poza Brief) z kosztorysem usługowym', {force:true})
        e22.modelProdukcjiLista().select('W - Wewnętrzny', {force: true})
        e22.czasPoleTekstowe().type('10')
        e22.terminRozpoczeciaPoleTekstowe().type(dzisiaj)
        e22.terminOdbioruPoleTekstowe().type(zaMiesiac)
        e22.zapiszPrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 8 - Jestem na ekranie kosztów planowanych i Producent przekazuje KU')
        e22.kosztyPlanowanePrzycisk().click()
        e23.producentKierownikProdukcjiEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.producentKierownikProdukcjiEtykieta().should('contain', 'Wprowadzony')
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'Brak akceptacji')
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Brak akceptacji')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')
        e23.przekazProducentKierownikProdukcjiPrzycisk().click()

        cy.log('Krok 9 - Producent potwierdza przekazanie kosztorysu')
        e23.przekazKosztorysPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.producentKierownikProdukcjiEtykieta().should('contain', 'Przekazany do JU')

        cy.log('Krok 10 - Producent weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 11 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - KKW', () => {            
        cy.log('Krok 12 - Zalogowanie na Kierownika Komórek Wyspecjalizowanych i przejście do szczegółów wybranego porozumienia')
        cy.visit('/')
            .loginAkceptantKUKomorkiWyspecjalizowanej()
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 13 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[1]')

        e23.kierownicyKomorekWyspecjalizowanychEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'TPTP').and('contain', 'TPTZ')
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Brak akceptacji')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 14 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('be.visible')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        
        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('be.visible')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 15 - Kierownik Komórek Wyspecjalizowanych zatwierdza KU dla obu zakładów')
        e23.zatwierdzKierownicyKomorekWyspecjalizowanychPrzycisk().click()
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.zatwierdzKierownicyKomorekWyspecjalizowanychPrzycisk().click()
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.kierownicyKomorekWyspecjalizowanychEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 16 - Kierownik Komórek Wyspecjalizowanych weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 17 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Akceptant KU', () => {
        cy.log('Krok 18 - Zalogowanie na Akceptanta Kompletności KU i przejście do szczegółów wybranego porozumienia')
        cy.visit('/')
            .loginAkceptantKompletnosciKU()
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(0)

        cy.log('Krok 19 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[3]')
        e23.akceptantKompletnosciKUEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Brak akceptacji')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 20 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('be.visible')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('be.visible')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').eq(1).should('contain.text', 'CUP')
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 21 - Akceptant kompletności KU zatwierdza Kosztorys')
        e23.zatwierdzAkceptantKompletnosciKUPrzycisk().click()

        cy.log('Krok 22 - Potwierdzenie zatwierdzenia KU')
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.akceptantKompletnosciKUEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 23 - Akceptant kompletności KU weryfikuje czy po przekazaniu ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 24 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Producent2', () => {
        cy.log('Krok 25 - Zalogowanie na Producenta i przejście do szczegółów wybranego porozumienia')
        cy.visit('/')
            .loginProducent()
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(1)

        cy.log('Krok 26 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.uwagiKomentarzeEtykieta().should('contain', '[4]')
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')
        e23.dyrekcjaJUEtykieta().should('contain', 'Brak akceptacji')

        cy.log('Krok 27 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 28 - Producent zatwierdza i przekazuje dalej KU')
        e23.przekazProducentKierownikProdukcjiDrugaAkceptacjaPrzycisk().click()

        cy.log('Krok 29 - Potwierdzenie zatwierdzenia KU')
        e23.popupZatwierdzPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.producentKierownikProdukcjiDrugaAkceptacjaEtykieta().should('contain', 'Akceptacja')

        cy.log('Krok 30 - Producent weryfikuje czy po przekazaniu nadal ma zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 31 - Wylogowanie użytkownika')
        cy.logoutUser()
    })

    it('Obieg akceptacji kosztorysu - Dyrektor Agencji CUP', () => {
        cy.log('Krok 32 - Zalogowanie na Dyrektora Agencji CUP i przejście do szczegółów wybranego porozumienia')
        cy.visit('/')
            .loginDyrektorAgencjiCUP()
        cy.goToMenu('Porozumienia')
        e20.edycjaPierwszyPrzycisk().click({force:true})
        fWspolne.sprawdzProgressBar()
        sprawdzAkceptacjeKU(2)

        cy.log('Krok 32 - Przejście do kosztów planowanych')
        e22.kosztyPlanowanePrzycisk().click()
        e23.edycjaKosztowEtykieta().should('contain', 'Edycja kosztów')
        e23.odrzucDyrekcjaJUPrzycisk().should('be.visible')
        e23.uwagiKomentarzeEtykieta().should('contain', '[5]')
        e23.dyrekcjaJUEtykieta().children('div').last().should('have.css', 'background-color', 'rgb(242, 222, 222)')

        cy.log('Krok 34 - Weryfikacja edytowalności kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        fWspolne.sprawdzProgressBar()

        cy.log('Krok 35 - Dyrektor JU akceptuje KU')
        e23.akceptujDyrekcjaJUPrzycisk().click()

        cy.log('Krok 36 - Potwierdzenie akceptacji KU')
        e23.popupAkceptujPrzycisk().should('be.visible').click()
        fWspolne.sprawdzProgressBar()
        e23.dyrekcjaJUEtykieta().should('contain', 'Akceptacja')
        e23.akceptujDyrekcjaJUPrzycisk().should('not.exist')
        e23.odrzucDyrekcjaJUPrzycisk().should('be.visible')

        cy.log('Krok 37 - Dyrektor JU weryfikuje czy po przekazaniu ma nadal zablokowaną możliwość edycji kosztorysu')
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()
        e23.edytujKosztPrzycisk('RTP - przegląd emisyjny').should('not.exist')
        e23.edytujKosztPrzycisk('KTA - inżynier studia').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()
        e23.rodzajKosztuPrzycisk('Prace techniczne i pomocnicze').click()

        e23.rodzajKosztuPoz1Przycisk('KOSZTY TECHNICZNE').click()
        e23.rodzajKosztuPrzycisk('Koszty urządzeń technicznych własnych').click()
        e23.edytujKosztPrzycisk('STUDIA DŹWIĘKOWE PROTOOLS').should('not.exist')
        e23.edytujKosztPrzycisk('ZESPÓŁ EMISYJNY').click()
        cy.get('[title="Jednostka TVP S.A."]>option').each(($ele) => {
            expect($ele).to.not.contain.text('CUP')
        })
        e23.anulujZmianePrzycisk().click()

        cy.log('Krok 38 - Powrót na ekran szczegółów porozumienia i sprawdzenie czy odnotowano akceptację kosztorysu')
        e23.powrotPrzycisk().click()
        sprawdzAkceptacjeKU(3)

        // Wylogowanie
        cy.logoutUser()
    })
})
