import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Modal, ModalController} from "ionic-angular";
import {SetCoordinatesPage} from "../set-coordinates/set-coordinates";

@Component({
  selector: 'page-new-view',
  templateUrl: 'new-view.html',
})
export class NewViewPage implements OnInit{
  natureViewForm : FormGroup;
  latitude: number;
  longitude: number;

  // On ajoute le FormBuilder pour la creation du FormGroup
  constructor( private formBuilder: FormBuilder,
               private modalCtl: ModalController) {
  }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.natureViewForm = this.formBuilder.group({
      name:['', Validators.required],
      date:[new Date().toISOString(), Validators.required],
      description: ['']
    });
  }

  // Ancienne Methde
  onOpenCoordsModal1(){
    let modal = this.modalCtl.create(SetCoordinatesPage);
    modal.present();
    // cette fonction permet d'excuter un call back au moment de la fermuture d'un modal
    modal.onDidDismiss(
        (data)=>{
          if (data){
            this.latitude = data.latitude;
            this.longitude = data.longitude;
          }
        }
    )
  }


  onOpenCoordsModal(){
    let modal: Modal;

    if( this.latitude){
      modal = this.modalCtl.create(SetCoordinatesPage,
          {latitude: this.latitude,
                 longitude: this.longitude});
    }else {
      modal = this.modalCtl.create(SetCoordinatesPage);
    }

    modal.present();
    // cette fonction permet d'excuter un call back au moment de la fermuture d'un modal
    modal.onDidDismiss(
        (data)=>{
          if (data){
            this.latitude = data.latitude;
            this.longitude = data.longitude;
          }
        }
    )
  }




}
