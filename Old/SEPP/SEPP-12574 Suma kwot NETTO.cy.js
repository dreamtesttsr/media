const { fWspolne } = require('../../../../POM/Funkcje wspolne/Funkcje wspolne')
const { e30 } = require('../../../../POM/Zaangazowanie/E30 Lista zamowien')

describe('SEPP-12574 Suma kwot NETTO', function () {

    it('Suma kwot NETTO', function () {
    // strona glowna i logowanie 
        cy.visit('/')
            .loginPracownikAgencji()

        // Zamówienia
        cy.goToMenu('Zamówienia')

        // 1. asercje 
        cy.log('Krok 1 - wyszukanie zamówień testowych')
        e30.zaawansowanePrzycisk().click()
        cy.get('#select2-ContractorId-container').click()
        cy.get('.select2-search__field').type('EAST RIDERS HUBERT KOSTRZEWA')
        cy.get('.select2-results__option.select2-results__option--highlighted', {timeout:3000}).contains('EAST RIDERS HUBERT KOSTRZEWA').click()
        e30.wyszukajPrzycisk().click()
        fWspolne.sprawdzProgressBar()
        cy.get('#CountSumSwitch', {timeout:3000}).check({ force: true })
        fWspolne.sprawdzProgressBar()
        
        let sum=0
        cy.get('span.currency.initialized').then(($sumofsum) => {
            let sumaNETTO=parseFloat($sumofsum.text().replace(',', '.'))
        
            cy.get('.currency.text-nowrap.initialized').each(($title, index, $titles) => {
                sum += parseFloat($title.text().replace(',', '.'))
    
                if (index === $titles.length - 1) {
                    assert.equal(sumaNETTO, sum, 'Suma NETTO jest wyliczana prawidłowo')
                }
            })
        })

        // Wyloguj uzytkownika
        cy.logoutUser()
    })
})