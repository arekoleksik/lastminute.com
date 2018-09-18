/* Load the PolymerElement base class and html helper function */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
/* Load shared styles. All view elements use these styles */
import './shared-styles.js';
import '../public_html/bower_components/iron-ajax/iron-ajax.js';

/* Extend the base PolymerElement class */
class CheckWeather extends PolymerElement {
  /* Define a template for the new element */
    constructor(){
        super();
        this.renderCount = 0;
        this.loadAsync();
    }
    
  static get properties() {
    return {
      latitude: String,
      longitude: String,
      path: String
    };
  }
  
  static get template() {
    return html`
        <style include="shared-styles">
          :host {
            display: block;
            padding: 10px;
          }
        </style>
        {{getParam()}}
        <iron-ajax
            id="getAjaxAnswer"
            auto
            url= {{path}}
            params="{{latitude}}"
            method="get"
            handle-as="json"
            last-response="{{answer}}">
        </iron-ajax>
        <div class="card">
          <h1>Pogoda [[answer.name]]  [[getRoundTemp(answer.main.temp)]]&deg</h1>
          <div>{{enableShopping(answer)}}</div> 
        </div>      
    `;
  } 

   _didRender() {
    this.renderCount++;
    console.log(this.renderCount);
  }
  loadAsync() {       
    const options={
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0            
    };  
    let lat;
    let long;
    function success(pos) {
      let crd = pos.coords;
      let latitude = Math.round(crd.latitude * 100) / 100 ;
      let longitude = Math.round(crd.longitude * 100) / 100 ;
      trigger(latitude,longitude);
      }

    function trigger (latitude, longitude) {
        lat = latitude;
        long = longitude;
    } 

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }   
    navigator.geolocation.getCurrentPosition(success, error, options);

    setTimeout(() => {
      this.latitude  = lat;
      this.longitude = long;
      this.path = `http://api.openweathermap.org/data/2.5/weather?appid=0b3d75e5a49f2a267f054a0a60bed6f3&units=metric&lat=${this.latitude}&lon=${this.longitude}`;
    }, 500);
  }

    getRoundTemp(temp) {
        return Math.round(temp);
    }
    
    enableShopping(json){
        if(json.hasOwnProperty('rain') || json.hasOwnProperty('snow')){
            return 'Lepiej nie idź na zakupy, możesz zmoknąć :(';
        }else{
            return 'Dziś jest odpowiednia pogoda na zakupy :-)';
        }
    };

 };
/* Register the new element with the browser */
window.customElements.define('check-weather', CheckWeather);


