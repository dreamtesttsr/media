import { ekrany } from '../../../POM/Ekran Powitalny/Ekrany menu'
import { users } from '../../../POM/Ekran Powitalny/Uprawnienia rol'
import { DateTime } from 'luxon'

const password = 'TVPPassw0rd'
const perfData = window.performance.timing

describe('SEPP-14631 - Menu weryfikacja funkcji goToMenu - smoke test', () => {
    it('Rola 1 Administrator - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Administrator'].nazwa
        const todayDate = new Date(Date.now()).toUTCString()
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = DateTime.now()
        cy.log('timeStart - ' + timeStart)
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = DateTime.now()
        cy.log('timeEnd - ' + timeEnd)
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        for(let e in ekrany){
            cy.goToMenu(e)
        }
        cy.logoutUser()
    })

    it('Rola 2 Producent - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Producent'].nazwa
        const todayDate = new Date(Date.now())
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = Date.now()
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = Date.now()
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        for(let e in ekrany){
            cy.log('nazwa ekranu - ' + e)
            if(users['Producent'].opcje.includes(e)){
                cy.log('znaleziono ekran - ' + e)
                cy.goToMenu(e)
            }
        }
        cy.logoutUser()
    })
/*
    it('Rola 7 Kontroling - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Kontroling'].nazwa
        const todayDate = new Date(Date.now())
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = Date.now()
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = Date.now()
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        // funkcje.sprawdzPodstronyIPolaMenu()
        for(let e in ekrany){
            cy.log('nazwa ekranu - ' + e)
            if(users['Kontroling'].opcje.includes(e)){
                cy.log('znaleziono ekran - ' + e)
                cy.goToMenu(e)
            }
        }
        cy.logoutUser()
    })

    it('Rola 12 Pracownik Dyspozytury - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Pracownik Dyspozytury'].nazwa
        const todayDate = new Date(Date.now())
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = Date.now()
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = Date.now()
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        //funkcje.sprawdzPodstronyIPolaMenu()
        for(let e in ekrany){
            cy.log('nazwa ekranu - ' + e)
            if(users['Pracownik Dyspozytury'].opcje.includes(e)){
                cy.log('znaleziono ekran - ' + e)
                cy.goToMenu(e)
            }
        }
        cy.logoutUser()
    })

    it('Rola 22 Pracownik Dyspozytury - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Operator Karty pracy'].nazwa
        const todayDate = new Date(Date.now())
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = Date.now()
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = Date.now()
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        //funkcje.sprawdzPodstronyIPolaMenu()
        for(let e in ekrany){
            cy.log('nazwa ekranu - ' + e)
            if(users['Operator karty pracy'].opcje.includes(e)){
                cy.log('znaleziono ekran - ' + e)
                cy.goToMenu(e)
            }
        }
        cy.logoutUser()
    })

    it('Rola 26 Kierownik Działu Organizacji Usług - odwiedz strony opcji menu', () => {
        var timeStart, timeEnd, loginUzytkownika = users['Kierownik Działu Organizacji Usług'].nazwa
        const todayDate = new Date(Date.now())
        cy.log('Rozpoczęcie testu ' + todayDate)
        timeStart = Date.now()
        cy.visit('/')
            .login(loginUzytkownika, password)
            .loginAssert(loginUzytkownika)
        timeEnd = Date.now()
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;                
        cy.log('Czas logowania się (ms) - ' + (timeEnd - timeStart) + ' ,pageLoadTime (ms) - ' + pageLoadTime)
        //funkcje.sprawdzPodstronyIPolaMenu()
        for(let e in ekrany){
            cy.log('nazwa ekranu - ' + e)
            if(users['Kierownik Działu Organizacji Usług'].opcje.includes(e)){
                cy.log('znaleziono ekran - ' + e)
                cy.goToMenu(e)
            }
        }
        cy.logoutUser()
    })
    */
})
