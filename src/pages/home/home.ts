import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {NatureView} from "../../models/NatureView.models";
import {Subscription} from "rxjs";
import {NatureViewService} from "../../services/natureView.service";
import {NewViewPage} from "../new-view/new-view";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements  OnInit, OnDestroy {
  natureViewList: NatureView[];

  // Puis nous avons une seconde variable afin que notre premier variable vienne souscrire au subject du service
  natureViewLsitsubscription : Subscription;
  newViewPage = NewViewPage;

  constructor(public navCtrl: NavController, private  natureService: NatureViewService) {
  }

  ngOnInit(): void {
    this.natureViewLsitsubscription = this.natureService.natureViewList$.subscribe(
        (natureView:  NatureView[]) => {
          this.natureViewList = natureView;
        }
    );
    this.natureService.emitList();
  }

  ngOnDestroy(): void {
    this.natureViewLsitsubscription.unsubscribe();
  }
}
