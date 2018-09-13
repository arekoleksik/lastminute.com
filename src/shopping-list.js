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

class ShoppingList extends PolymerElement {
    constructor() {
      super();

      this.products = [
          
      ];
      this.inputValue = '';
    }
    
    static get template () {
        
        return html`
            <div> Lista produktów </div>
            <p></p>
            <input value="{{inputValue::change}}" mutable-data>        
            <button on-click="handleAddClick">Dodaj</button>
            <template is="dom-repeat" items="{{products}}" mutable-data>
                <div>
                    <span contenteditable="true">{{item.name}} </span>
                    <button on-click="handleRemoveClick">Usuń</button>
                </div>
            </template>       
            `;
    }
    
    handleAddClick() {
        if (this.inputValue.trim().length === 0) {
            alert("Podaj produkt");
        } else{
            this.push('products', {name: this.inputValue});
            this.inputValue = '';
          }
        }
    handleRemoveClick() {
      let index = this.products.map(function(e) { return e.name; }).indexOf('dd');
      console.log(index);
      this.splice("products",index, 1);
      console.info(this.products);
    }
}

window.customElements.define('shopping-list', ShoppingList);
