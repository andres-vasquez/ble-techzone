import {Constants} from "../../../utils/Constants";
import {Events, LoadingController} from "ionic-angular";
import {NgZone} from "@angular/core";
import {BleClientService} from "../../../providers/ble-client-service";

export class BaseClientPage {
  public serverId: number = Constants.DEFAULT_SERVER_ID;
  public loading;

  constructor(public events: Events,
              public ngZone: NgZone,
              public clientService: BleClientService,
              public loadingCtrl: LoadingController) {
  }


  /**
   * Show loading
   */
  protected showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    this.loading.present();
  }

  /**
   * Dismiss loading
   */
  protected hideLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }
}
