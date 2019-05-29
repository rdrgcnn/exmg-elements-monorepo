/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, LitElement} from 'lit-element';
import {generateUrlByNameOrComponentName} from '../../index';

// These are the shared styles needed by this element.
import {SharedStyles} from '../components/shared-styles';

class MyView404 extends LitElement {
  static styles = SharedStyles;

  private goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  protected render() {
    return html`
      <section>
        <h2>Oops! You hit a 404 - <a class="back" @click="${this.goBack}">Back</a></h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="${generateUrlByNameOrComponentName('home')}">home</a> and try again?
        </p>
      </section>
    `;
  }
}

window.customElements.define('my-view404', MyView404);