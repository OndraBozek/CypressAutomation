/// <reference types="cypress" />

beforeEach(() => {
    cy.visit('https://george.csas.cz/?login_hint=7777777777') // Go to George website with hint
    cy.title().should('eq','Přihlášení | Česká spořitelna') // Verify title of the website
    cy.wait(1000) // Wait for page script be loaded
        
    //cy.get('.ng-isolate-scope > .font-bold').click()
    //cy.wait(1000) // Wait for page script be loaded
    //cy.get('#btn\.continue > .flex > .flex-grow').click()
    cy.get('body').type('{enter}') // Click Enter to login
        
    cy.title().should('eq','George') // Verify title of the website
    cy.wait(1000) // Waiting for demo message to be loaded
    cy.get('#readBtn').click() // Message read 
  })

describe('Test search functionality', () => {
    it('Search results displayed should be relevant to search keyword', () => {
        cy.get('[data-cy=overview-search-bar]').type('Liftago') // Search for "Liftago"
        cy.get('body').type('{enter}') // Click Enter to search
        cy.get('#account-history-region > :nth-child(1) > :nth-child(1) > .g-bootstrap').should('be.visible') // Assertion
    })

    it('After clicking Search field - search suggestions should be displayed ', () => {
        cy.get('[data-cy=overview-search-bar]').type(' ') // Click on searchbar to see suggestions
        cy.get('[data-cy=search-keyword]').click()
        cy.get('[data-cy=search-dropdown-item-lastWeek]').should('be.visible') // Assertion
        //cy.wait(1000) // This waiting time for manual check of item
    })

    it('Verify search results in detail ', () => {
        cy.get('[data-cy=overview-search-bar]').type('DM') // Search for "DM"
        cy.wait(1000) // Waiting for results
        cy.get('[data-cy=transaction-list-item-100000435868666]').click() // Clicking on detail of the result
        cy.get('.mr-auto').should('include.text','Únor 2016') // Assertion
        //cy.wait(1000) // This waiting time for manual check of item
        cy.get('.clearable-input--3mLh1HA6 > .g-button > .ico-error').click() // Clearing searchbar
    })

    it('Print of found results ', () => {
        cy.get('[data-cy=overview-search-bar]').type('Liftago') // Search for "Liftago"
        cy.get('body').type('{enter}') // Click Enter to search
        cy.get('#account-history-region > :nth-child(1) > :nth-child(1) > .g-bootstrap').should('be.visible') // Assertion

        cy.get('[data-cy=print-link]').click() //Click on ready for print button
        cy.get('[data-cy=print-button]').click() //Click on Print button
        cy.get('.g-status-info-title').should('include.text','Data k tisku jsou připravena.') // Assertion
    })
  })