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
import '../public_html/bower_components/paper-button/paper-button.js';
import '../public_html/bower_components/iron-input/iron-input.js';

class ShoppingList extends PolymerElement {
    constructor() {
      super();
        this.inputValue = '';
    }
    static get properties() {
    return {
      products: {
        type: Array,
        value: []
      }
    };
  }
   
    static get template () {    
        return html`
            <style is="custom-style">
                paper-button{
                    max-height: 25px;        
                }
                input{
                    min-height: 25px;
                    font-size: 1.2em;
                    background-color: #fff;
                    border: 0;
                    border-radius: 8px;
                }     
                #wrapper{
                    margin-left: auto;
                    margin-right: auto;
                    width: 400px;
                }
                span{
                    font-size: 1.5em;
                }
            </style>
            <custom-style>
                <style>
                    paper-button.custom:hover {
                      background-color: var(--paper-indigo-100);
                    }
                    paper-button.add {
                      background-color: var(--paper-blue-500);
                      color: white;
                      font-weight: bold;
                      min-width: 20px;
                      min-height: 25px;
                      padding-top: 15px;
                    }        
                    paper-button.delete {
                      background-color: var(--paper-grey-500);
                      color: white;
                      font-weight: bold;
                      min-width: 20px;
                      min-height: 25px;
                      padding-top: 15px;
                    }
                </style>
            </custom-style>
            <div id="wrapper">
                <h3> Lista produktów </h3>
                <p></p>
                <input value="{{inputValue::change}}" mutable-data>        
                <paper-button raised on-tap="handleAddClick" class="custom add">Dodaj</paper-button>
                <template is="dom-repeat" id="productsList" items="{{products}}" mutable-data>
                    <ul>
                        <span contenteditable="true">{{item.name}} </span>
                        <paper-button raised on-tap="handleRemoveClick" class="custom delete">usuń</paper-button>
                    </ul>
                </template>   
            </div>
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
        
    handleRemoveClick(e) {
        const item = this.$.productsList.itemForElement(e.target);
        let index = this.products.map(function(e) {return e.name; }).indexOf(item.name);
        this.splice("products",index, 1);  
    } 
}

window.customElements.define('shopping-list', ShoppingList);
