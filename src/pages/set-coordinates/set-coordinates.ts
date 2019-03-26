import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController, ToastController, LoadingController} from "ionic-angular";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'page-set-coordinates',
  templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage  implements OnInit {

    latitude: number;
    longitude: number;
     marker: {
             latitude: number,
             longitude: number,
             draggable: true
  };
  constructor(private viewCtl: ViewController, private  navParams: NavParams,
              private  toastCtrl: ToastController,private geolocation: Geolocation,
              private loadingCtrl: LoadingController) {
  }

    ngOnInit(){
      let receivedLatitude = this.navParams.get('latitude');
      let receivedLongitude = this.navParams.get('longitude');
      if(receivedLatitude) {
          this.latitude = receivedLatitude;
          this.longitude = receivedLongitude;
          this.marker = {
              latitude: receivedLatitude,
              longitude: receivedLongitude,
              draggable: true
          }
      }else {
          this.latitude = -4.27;
          this.longitude = 15.28;
      }

    }
    // Methode pour ajouter un marker afin de recuperer les données de coordination
    onMapClicked($event) {
        this.marker = {
            latitude: $event.coords.lat,
            longitude: $event.coords.lng,
            draggable: true
        };
    }
    // Methode pour Fermer la modal
    onCancel(){
    this.viewCtl.dismiss();
  }

  // Methode pour sauvegarder les donnés
    onSave(){
      this.viewCtl.dismiss({
          latitude: this.marker.latitude,
          longitude: this.marker.longitude
      })
  }

  //Methode pour se localiser automatiquement
    onLocateMe() {
        let loader = this.loadingCtrl.create({
            content: 'Recherche de votre position…'
        });
        loader.present();
        this.geolocation.getCurrentPosition().then(
            (resp) => {
                loader.dismiss();
                this.latitude = resp.coords.latitude;
                this.longitude = resp.coords.longitude;
                this.marker = {
                    latitude: resp.coords.latitude,
                    longitude: resp.coords.longitude,
                    draggable: true
                }
            }).catch(
            (error) => {
                loader.dismiss();
                this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }
        );
    }




}
