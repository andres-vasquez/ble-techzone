import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {UserAction} from "../../../models/UserAction";
import {Constants} from "../../../utils/Constants";
import {BleClientService} from "../../../providers/ble-client-service";

@IonicPage()
@Component({
  selector: 'client-send',
  templateUrl: 'client-send.html'
})
export class ClientSendPage extends BaseClientPage {

  // Add logType
  public logType: string = Constants.BLE_EVENT_WRITE;

  public inputData: UserAction = new UserAction('hola@temp.com', 'Si si');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public ngZone: NgZone,
              public clientService: BleClientService) {
    super(events, ngZone, clientService);
  }

  sendData() {
    if (!this.inputData.email || !this.inputData.question) {
      alert('Introduzca los datos');
      return;
    }
  }
}
