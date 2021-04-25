/// <reference types="cypress" />

describe('Add most expensive items to basket - Alza', () => {
    it('Add two most expensive items to the basket from any search', () => {
        cy.visit('https://www.alza.cz/') // Go to Alza website
        cy.title().should('eq','Alza.cz – nakupujte bezpečně z pohodlí domova | Alza.cz') // Verify title of the website
        cy.get('#edtSearch').type("iphone") // Search for "iphone"
        cy.get('#btnSearch').click() // Click on Search button
        cy.get('#ui-id-5').scrollIntoView().click() // Click on button "From most expensive"
        cy.wait(500) // Wait for items to reload
        cy.get('.first.firstRow > .bottom > .price > .btnkx > .btnk1').scrollIntoView().click() // Click on most expensive item
        cy.title().should('eq','Zboží přidáno do košíku | Alza.cz') // Verify title of next website
        cy.get('#varBBackButton').click() // Click on back button
        cy.get('[data-id="6216487"] > .bottom > .price > .btnkx > .btnk1').scrollIntoView().click() // Click on second most expensive item
        cy.title().should('eq','Zboží přidáno do košíku | Alza.cz') // Verify title of next website
        cy.get('#varBToBasketButton').click() // Click on basket button
        cy.title().should('eq','Nákupní košík | Alza.cz') // Verify title of basket website
        cy.get('.last > .c2 > span').scrollIntoView() // Scroll to see sum price
    })
  })