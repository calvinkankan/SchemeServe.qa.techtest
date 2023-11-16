describe('Login and verify transaction', () => {
  it('Login and verify transaction', () => {
    cy.task("db:seed")
    cy.visit('http://localhost:3000/signin')
    //login with provided credentials
    cy.get('#username').type('Katharina_Bernier')
    cy.get('#password').type('s3cret')
    cy.get('[data-test="signin-submit"]').click()
    //usename should be visible after logging in
    cy.get('[data-test="sidenav-username"]').should('be.visible')
    //added this wait 
    cy.intercept('http://localhost:3001/transactions/public')
      .as('publicTransactions')
    
    cy.wait('@publicTransactions')

    //log transaction detail for later use
    //let transactionDetail

    cy.get('[data-test^="transaction-item"]').first() 
      .find('p').contains('Payment: ').invoke('text')
      .then((text) => { 
        cy.log(text)
        //transactionDetail = text
      })

    //select checkbox
    cy.get('[data-test^="transaction-item"]').first() 
      .find('input')
      .click({ force: true })
    
    //click the Select button
    cy.get('[data-test^="transaction-item"]').first()
      .find('[data-test="nav-top-new-transaction"]')
      .click()

    //tried to log and save the transaction detail from the home page then verify it here but failed to pass it out of .then to be read below
    // //verify the selected transaction is the one shown here
    // cy.get('[data-test="transaction-description"]').should('have.text', transactionDetail)

    //click like and enter comment
    cy.get('[data-test^="transaction-like-button"]').click()
    cy.get('[data-test^="transaction-comment-input"]').type('Some comments 1234! {enter}')

    //back to home
    cy.get('[data-test="sidenav-home"]').click()
    cy.wait('@publicTransactions')

    //verify like and comment count
    cy.get('[data-test^="transaction-item"]').first()
      .find('[data-test="transaction-like-count"]').should('have.text', '1')
    cy.get('[data-test^="transaction-item"]').first()
      .find('[data-test="transaction-comment-count"]').should('have.text', '1')
  })
})