import "./commands"

Cypress.on('uncaught:exception', (err, runnable, promise) => {

  console.log("ERROR: ", JSON.stringify(err, null, 2))
  // returning false here prevents Cypress from
  // failing the test
  return false
})