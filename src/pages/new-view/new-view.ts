import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "ionic-angular";
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

  onOpenCoordsModal(){
    let modal = this.modalCtl.create(SetCoordinatesPage);
    modal.present();
  }




}
