import { mount } from "cypress/react18";

import '../../src/styles/globals.css';

declare global {
  namespace Cypress {
    interface Chainable {
      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount: typeof mount;

      /**
       * Custom command to type a few random words into input elements
       * @param count=3
       * @example cy.get('input').typeRandomWords()
       */
      typeRandomWords(
        count?: number,
        options?: Partial<TypeOptions>
      ): Chainable<JQuery<HTMLElement>>
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>;

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        partialQaSelector: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}