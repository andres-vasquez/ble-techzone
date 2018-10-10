import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {Constants} from "../../../utils/Constants";

@IonicPage()
@Component({
  selector: 'client-notify',
  templateUrl: 'client-notify.html'
})
export class ClientNotifyPage extends BaseClientPage{

  // Add logType
  public logType: string = Constants.BLE_EVENT_RSSI;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public ngZone: NgZone) {
    super(events, ngZone);
  }
}
