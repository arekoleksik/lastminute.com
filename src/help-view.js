/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class HelpView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
        img{
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
      </style>
      <div class="card">
        <img src="https://media.makeameme.org/created/help-me-lord.jpg" alt="Help" height="540" width="420">
      </div>
    `;
  }
};

window.customElements.define('help-view', HelpView);
