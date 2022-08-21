const perfData = window.performance.timing

class funkcjeWspolne{
    // timeLoadPages = []   // na przyszłość do testów wydajnościowych
    // Selektory
    progressBar(){
        return cy.get('div#progressBar', {timeout: 15000})
    }

    // Metody
    sprawdzProgressBar(){
        cy.get('body').then($body => {
            if($body.find('div#progressBar').length){
                this.progressBar().should('exist')
                // this.progressBar().invoke('attr', 'style').should('not.eq', undefined)
                this.progressBar().then((value) => {
                    if(value.attr('style') == 'display: none;' || value.attr('style') == undefined){
                        // eslint-disable-next-line cypress/no-unnecessary-waiting
                        cy.wait(2000)
                    }
                })
                this.progressBar().should('not.be.visible')
            }
        })
    }

    zamknijKomunikatNiezapisaneDane(){
        cy.get('#copyTitleModal-confirm-return-body').should('contain', 'Na formularzu są niezapisane dane. Czy chcesz odrzucić zmiany?')
        cy.get('#copyTitleModal-confirm-return-noBtn').should('be.visible')
        cy.get('#copyTitleModal-confirm-return-yesBtn').click()
    }
    

    zamknijPowiadomienia(){
        cy.get('body').then(body => {
            if(body.find('#system-message-modal-noBtn').length)
                cy.get('#system-message-modal-noBtn').click()
            if(body.find('#notificationModal-close').length)
                cy.get('#notificationModal-close').click()
        })
    }

    wyszukajOpcjeMenuUzytkownika(){
        let currUrl = ''
        let num = 0
        cy.url().then(url => {
            // pobieram aktualny url
            currUrl = url.substring(0, url.length-1)
            let ddToggle = ''
            cy.log('currURL - ' + currUrl)
            // pobieranie belki menu i każdego elementu z menu, each działa rekurencyjnie i zagłębią się w pod opcje
            cy.get('[data-cy="menu-navbar"] > div').find('ul > li').each(opcja => {
                // link z etykietą ma tag html a i klasę dropdown-toggle w przypadku posiadania podopcji
                if(opcja.children('a').hasClass('dropdown-toggle nav-link')){
                    // pobieramy etykietę opcji menu plus znak '>' w celu późniejszego rozdzielenia opcji odwiedzanych w menu
                    ddToggle = opcja.children('a').text() + '>'
                    // pod opcja menu, jeśli ma pod pod opcje to występuje klasa dropdown-menu
                    if(opcja.parent('ul').hasClass('dropdown menu')){
                        // zapis pod opcji
                        ddToggle = opcja.parent('ul').parent('li').children('a').text() + '>' + ddToggle
                    }
                }else if(opcja.children('a').hasClass('dropdown-toggle dropdown-item')){
                    // pobieramy etykietę opcji menu plus znak '>' w celu późniejszego rozdzielenia opcji odwiedzanych w menu
                    ddToggle = opcja.parent('ul').parent('li').children('a').text() + '>' + opcja.children('a').text() + '>'
                    // pod opcja menu, jeśli ma pod pod opcje to występuje klasa dropdown-menu
                    if(opcja.parent('li').hasClass('dropdown-submenu')){
                        // zapis pod opcji
                        ddToggle = opcja.parent('li').children('a').text() + '>' + ddToggle
                    }
                }else{
                    // znaleziono opcję, która nie ma pod opcji a więc dowolna opcja z menu poziom 1, 2 lub 3
                    // polecenia as daje nam mozliwość dodania w aliasach z numerem porządkowym
                    cy.wrap((opcja.hasClass('nav-item') ? '':ddToggle) + opcja.children('a').text()).as('opcjeGlowne' + num++)
                }
            })
                .then(() => {
                // wypisanie wartości opcji
                    for(let i=0;i<num;i++){
                        cy.get('@opcjeGlowne'+i).then(val => {
                            cy.log('opcja', val)
                        })
                    }
                    // zapisanie wartości liczby znalezionych opcji do aliasu
                    cy.wrap(num).as('ileOpcji')
                })
        })
    }

    wyswietlOpcjeMenu(){
        let wynik = 'opcje menu \n'
        cy.get('div[class="navbar-collapse collapse"]').find('ul > li > a').each(($element, i, $lista) => {
            if($element.attr('data-toggle') == 'dropdown'){
                const linkMenu = Cypress.$($element)
                cy.log(linkMenu.text() + ' - lista dropdown')
                let wynik = wynik + linkMenu.text() + ' - lista dropdown\n'
                // wynik.concat(linkMenu.text() + ' - lista dropdown\n')
            }else{
                cy.log($element.text() + ' - hiperłącze')
                let wynik = wynik + $element.text() + ' - hiperłącze\n'
                // wynik.concat($element.text() + ' - hiperłącze\n')
            }
        })
        cy.log('wynik\n' + wynik)
    }

    szukajOpcjiMenu(opcje){
        const lista = opcje.split(';')
        var wynik = 'PODSUMOWANIE WYSZUKIWANIA \\', czyZnaleziono = new Boolean(false), listaNieZnalezionych = ''
        cy.get('div[class="navbar-collapse collapse"]').find('ul > li > a').should('have.length.above', 0)

        cy.url().then(url => {
            cy.get('div[class="navbar-collapse collapse"]').find('ul > li > a').each(($element, i, $lista) => {
                cy.log('opcja menu - ' + $element.text() + ' ,link - ' + url + $element.attr('href'))
            })
                .then(($lista) => {
                    for(let i in lista){
                        for(let el in $lista){
                            if($lista[el].textContent == lista[i]){
                                czyZnaleziono = true
                                wynik += '\nZNALEZIONA OPCJA ' + lista[i] + '|'
                                break
                            }
                        }
                        if(!czyZnaleziono){
                            wynik += '\nNIE ZNALEZIONO OPCJI ' + lista[i] + '|'
                            listaNieZnalezionych += '\nNIE ZNALEZIONO OPCJI ' + lista[i] + '|'
                        }
                        czyZnaleziono = false
                    }
                    cy.wrap(wynik).as('szukanieOpcjiMenu')
                    cy.wrap(listaNieZnalezionych).as('listaNieZnalezionych')
                })
        })
        cy.get('@listaNieZnalezionych').then(listaNieZnalezionych => {
            cy.get('@szukanieOpcjiMenu').then(opcje => {
                if(opcje.length){
                    opcje = opcje.substring(0, opcje.lastIndexOf('|'))
                    listaNieZnalezionych = listaNieZnalezionych.substring(0, listaNieZnalezionych.lastIndexOf('|'))
                    cy.log(opcje.replaceAll('|', '\\'))
                    let ileZnalezionych = (opcje.split('|').length - ( listaNieZnalezionych.length ? listaNieZnalezionych.split('|').length : 0 ) )
                    cy.log('liczba opcji znalezionych / ogółem - ' + ileZnalezionych + ' / ' + lista.length)
                    if(ileZnalezionych == lista.length){
                        cy.log('WSZYSTKIE SZUKANE OPCJE ZOSTAŁY ZNALEZIONE')
                    }else{
                        cy.log('Nie znaleziono wszystkich opcji menu ')
                        cy.log(listaNieZnalezionych.replaceAll('|', '\\'))
                    }
                }else{
                    cy.log('Nie podano żadnych opcji do sprawdzenia')
                }
            })
        })
    }

    sprawdzPodstronyMenu(){
        this.wyszukajOpcjeMenuUzytkownika()
        // pobieram liczbę opcji z aliasu
        cy.get('@ileOpcji').then((ile) => {
            this.przeszukajOpcjeMenu(ile)
            this.sprawdzPowiadomienia()
            cy.get('@wynik').then(result => {
                // zmienna z podsumowaniem wyciągnięta na zewnątrz i tutaj można dopisywać kolejne weryfikacje
                cy.log(result.replaceAll('|','\\ '))
            })
        })
    }

    sprawdzPodstronyIPolaMenu(){
        this.wyszukajOpcjeMenuUzytkownika()
        // pobieram liczbę opcji z aliasu
        cy.get('@ileOpcji').then((ile) => {
            this.przeszukajOpcjeMenu(ile)
            this.sprawdzPowiadomienia()
            cy.get('@wynik').then(result => {
                // zmienna z podsumowaniem wyciągnięta na zewnątrz i tutaj można dopisywać kolejne weryfikacje
                cy.log(result.replaceAll('|','\\ '))
            })
        })
    }

    sprawdzPowiadomienia(){
        cy.log('Otwieramy okno powiadomień')
        this.otworzPowiadomienie()
        cy.get('#notificationModal-modalDialog > .modal-body').then($modalBody => {
            if($modalBody.find('#notifyTable_table > tbody > tr > td').hasClass('#dataTables_empty')){
                cy.log('Brak powiadomień')
                this.zamknijPowiadomienie()
            }else{
                cy.get('#notifyTable_table > tbody > tr:nth-child(1)').invoke('text').then(komunikat => {
                    cy.log('komunikat - ' + komunikat)
                    if(!komunikat.includes('Brak danych')){
                        cy.get('#notifyTable_table > tbody > tr:nth-child(1)').click()
                        cy.get('#notifyTable_table > tbody > tr.odd.notify-selected').should('be.visible')
                        cy.log('Widoczne zaznaczenie')
                        cy.get('#notifyText').should('have.class','col-lg-6 breakLongWord')
                    }else{
                        cy.log('Brak komunikatów')
                    }
                    this.zamknijPowiadomienie()
                })
            }
        })
    }

    otworzPowiadomienie(){
        cy.get('span[title="Notyfikacje użytkownika"]').click()
    }

    zamknijPowiadomienie(){
        cy.get('#notificationModal-close').click()
    }

    szukajPolNaPodstronie(){
        cy.get('div#containerBody').then( container => {
            cy.log('pola tekstowe - ' + container.find('input[type="text"]').length)
            cy.log('pola liczbowe - ' + container.find('input[type="number"]').length)
            cy.log('pola wyszukiwania - ' + container.find('input[type="search"]').length)
            cy.log('listy - ' + container.find('select').length)
            cy.log('etykiety checkbox - ' + container.find('label[data_toggle="tooltip"]').length)
            cy.log('tabele - ' + container.find('table > tbody').length)
            cy.log('NAGŁÓWKI TABELI')
            if(container.find('table > tbody').length){
                cy.get('table > thead > tr').find('th').each(naglowek => {
                    if(naglowek.text().includes('Operacje')){
                        cy.log('Operacje')
                    }else{
                        cy.log(naglowek.text())
                    }
                })
            }
        })
    }

    przeszukajOpcjeMenu(ile){
        cy.log('liczba opcji menu - ' + ile)
        var wynik = 'PODSUMOWANIE SMOKE TESTU \n ------------------------------ \n'
        let tytulStrony = '', opcjaMenu = '', dokumentPDF = '', timeStart = '', timeEnd = ''
        // dla każdej z ścieżek opcji menu przechodzę po drzewku menu
        for(let i=0;i<ile;i++){
            // pobranie wartości z aliasu
            cy.get('@opcjeGlowne'+i).then(val => {
                // wypisuje ścieżkę opcji
                cy.log('opcja - ' + val)
                let opcjaSciezka = val.split('>')
                // wyszukuję w opcjach menu poziom 1 elementów child z tag a i etykietą z ścieżki opcji (pierwszy poziom)
                cy.get('[data-cy="menu-navbar"] > div > ul > li').children('a:contains("'+''+opcjaSciezka[0]+'")').then(element => {
                    // klikam w znalezioną opcję menu poziom 1
                    cy.get(element).click({force: true})

                    timeStart = Date.now()
                    // szukam notyfikacji popup
                    cy.get('body').then($body => {
                        if($body.find('#notificationModal-close').length){
                            this.zamknijPowiadomienie()
                            // ponownie klikam opcję menu 1 poziom
                            cy.get(element).click({force: true})
                        }
                    })
                    // szczególny przypadek opcja Pomoc
                    if(val.includes('Pomoc')){
                        dokumentPDF = ''
                        // pobranie wartości pod href
                        cy.get(element).parent('li').contains(''+opcjaSciezka[1]).attribute('href').then(link => {
                            cy.log('{POMOC} dokument - ' + link)
                            dokumentPDF = link.substring(link.lastIndexOf('/')+1, link.indexOf('?'))
                            wynik += '\n' + val + ' ,link ' + link + ' ,dokument ' + dokumentPDF + '|'
                            // cy.wrap(wynik).as('wynik')
                        })
                        // ponownie klika w opcję Pomoc
                        cy.get(element).click({force: true})
                        timeStart = ''
                    }else{
                        // ścieżka opcji ma dwa elementy i klimay każdy z nich
                        if(opcjaSciezka.length == 2){
                            cy.get(element).parent('li').contains(''+opcjaSciezka[1]).should('be.visible').click({force: true})
                            cy.wait(1000)
                            timeStart = Date.now()
                        }
                        // ścieżka opcji ma trzy elementy i klimay pierwszy, na drugi należy przesunąć kursor myszki i klikamy trzeci element
                        if(opcjaSciezka.length == 3){
                            cy.get(element).parent('li').contains(''+opcjaSciezka[1]).trigger('mouseover', {force: true})
                            cy.get(element).parent('li').contains(''+opcjaSciezka[2]).click({force: true})
                            cy.wait(1000)
                            timeStart = Date.now()
                        }
                        cy.log('tytuł strony - ' + opcjaSciezka[opcjaSciezka.length-1])
                        // po załadowaniu się strony z ściezki opcji menu w górnym lewym rogu jest tytuł strony
                        cy.get('body').then($body => {
                            if($body.find('div#containerBody > ol.breadcrumb > li.active').text() != ''){
                                timeEnd = Date.now()
                                this.timeLoadPages.push( val + ' czas ładowania (ms) ' + (timeEnd - timeStart) + ' (' + (perfData.loadEventEnd - perfData.navigationStart) + ') ,ładowania elementów (ms) - ' + (perfData.domComplete - perfData.domLoading) )

                                // sprawdzenie tytułu strony
                                cy.get('div#containerBody > ol.breadcrumb > li.active').then(tytul => {
                                    tytulStrony = (''+tytul.text()).toLowerCase()
                                    opcjaMenu = (''+opcjaSciezka[opcjaSciezka.length-1]).toLowerCase()
                                    if( tytulStrony == opcjaMenu ){
                                        // cy.log('tytuł strony ' + tytul.text() + ' zgodny z opcją menu')
                                        wynik += '\n' + val + ' ,TYTUŁ STRONY ' + tytul.text() + ' ZGODNY z opcją MENU, czas ładowania (ms) ' + (timeEnd - timeStart) + '|'
                                    }else{
                                        // cy.log('tytuł strony ' + tytul.text() + ' nie zgodny z opcją menu ' + opcjaSciezka[opcjaSciezka.length-1])
                                        wynik += '\n' + val + ' ,TYTUŁ STRONY ' + tytul.text() + ' NIE ZGODNY z opcją MENU ' + opcjaSciezka[opcjaSciezka.length-1] + ' , czas ładowania (ms) ' + (timeEnd - timeStart) + '|'
                                    }
                                })
                                this.szukajPolNaPodstronie()
                            }else{
                                // w przypadku braku tytułu podstrony wystąpił jakiś problem
                                cy.log('STRONA ' + val + ' NIE ZAŁADOWAŁA SIĘ')
                                wynik += '\nSTRONA ' + val + ' NIE ZAŁADOWAŁA SIĘ|'
                            }
                            // powrót do strony początkowej
                            cy.go('back')
                            // oczekuje na alert notyfikację, po czym zamyka
                            cy.wait(1000)
                            if($body.find('#notificationModal-close').length)
                                this.zamknijPowiadomienie()
                        })
                    }
                    cy.wrap(wynik).as('wynik')
                })
            })
            // cy.wait(5000)
        }
    }
}

export const fWspolne = new funkcjeWspolne()
