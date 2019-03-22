import {NatureView} from "../models/NatureView.models";
import {Subject} from "rxjs";

export class NatureViewService {
    /**j'ai mon attribut qui sera un array de type NatureView et qui sera initialisé*/
    private natureViewList: NatureView [] = [];
    natureViewList$ =  new Subject<NatureView[]>()


    emitList(){
        this.natureViewList$.next(this.natureViewList)
    }

    // je cree ma methode pour ajouter mes infomation
    addNatureView(view: NatureView){
        this.natureViewList.push(view)
        this.emitList();
    }

}
