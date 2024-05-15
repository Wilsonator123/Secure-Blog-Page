import React from 'react'
import { UserContextProvider } from './UserContext'

describe('<UserContextProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserContextProvider />)
  })
})