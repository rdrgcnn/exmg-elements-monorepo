import {connectStore, ConnectedLitElement, PageLitElement} from '../../src/router/connect';
import {createInitialRouterState, mockStore} from '../utils';

declare const fixture: <T extends HTMLElement = HTMLElement>(id: string, model?: object) => T;

const {assert} = chai;

suite('router/connect', () => {
  test('Instance of ConnectedLitElement with connected store should not fail', () => {
    const store = mockStore({router: createInitialRouterState()});
    connectStore(store);

    window.customElements.define('connected-element', ConnectedLitElement);
    const element: ConnectedLitElement = fixture('ConnectedElementFixture') as ConnectedLitElement;
    assert.instanceOf(
      element,
      ConnectedLitElement,
      `Element is instance of ${ConnectedLitElement.prototype.constructor.name} with connected store`,
    );
  });

  test('Instance of PageElement with connected store should not fail', () => {
    const store = mockStore({router: createInitialRouterState()});
    connectStore(store);

    window.customElements.define('page-element', PageLitElement);
    const element: PageLitElement = fixture('PageElementFixture') as PageLitElement;
    assert.instanceOf(
      element,
      PageLitElement,
      `Element is instance of ${PageLitElement.prototype.constructor.name} with connected store`,
    );
  });
});
