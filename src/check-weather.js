/* Load the PolymerElement base class and html helper function */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
/* Load shared styles. All view elements use these styles */
import './shared-styles.js';
import '../public_html/bower_components/iron-ajax/iron-ajax.js';

/* Extend the base PolymerElement class */
class CheckWeather extends PolymerElement {
  /* Define a template for the new element */
  static get template() {
    return html`
        <style include="shared-styles">
          :host {
            display: block;

            padding: 10px;
          }
        </style>
        <iron-ajax
            id="getAjaxAnswer"
            auto
            url="http://api.openweathermap.org/data/2.5/weather?id=3083829&appid=0b3d75e5a49f2a267f054a0a60bed6f3&units=metric"
            method="get"
            handle-as="json"
            last-response="{{answer}}">
        </iron-ajax>
        <div class="card">
          <h1>Pogoda: [[answer.name]]  [[getRoundTemp(answer.main.temp)]]&deg</h1>
          <div>{{enableShopping(answer)}}</div>  
        </div>
        
    `;
  }
    getRoundTemp(temp) {
        return Math.round(temp);;
    }
    
    enableShopping(json){
        console.log(json);
        if(json.hasOwnProperty('rain') || json.hasOwnProperty('snow')){
            return 'Lepiej nie idź na zakupy, możesz zmoknąć';
        }else{
            return 'Dziś jest odpowiednia pogoda na zakupy';
        }
    };
  
 };
/* Register the new element with the browser */
window.customElements.define('check-weather', CheckWeather);


