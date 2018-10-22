import {Constants} from "../../../utils/Constants";
import {Events, LoadingController} from "ionic-angular";
import {NgZone} from "@angular/core";
import {BleClientService} from "../../../providers/ble-client-service";

export class BaseClientPage {
  public serverId: number = Constants.DEFAULT_SERVER_ID;
  public loading: boolean;

  constructor(public events: Events,
              public ngZone: NgZone,
              public clientService: BleClientService,
              public loadingCtrl: LoadingController) {
  }


  /**
   * Show loading
   */
  protected showLoading() {
    this.ngZone.run(()=>{
      this.loading = true;
    });
  }

  /**
   * Dismiss loading
   */
  protected hideLoading(){
    this.ngZone.run(()=>{
      this.loading = false;
    });
  }
}
