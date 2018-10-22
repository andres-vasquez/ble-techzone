import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {UserAction} from "../../../models/UserAction";
import {Constants} from "../../../utils/Constants";
import {BleClientService} from "../../../providers/ble-client-service";
import {AttendanceBLE} from "../../../models/AttendanceBLE";

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
              public clientService: BleClientService,
              public loadingCtrl: LoadingController) {
    super(events, ngZone, clientService, loadingCtrl);
  }

  sendData() {
    if (!this.inputData.email || !this.inputData.question) {
      alert('Introduzca los datos');
      return;
    }

    this.showLoading();
    this.clientService.writeSequence(Constants.BLE_EVENT_PREFIX + this.serverId, this.inputData).subscribe(
      () => this.hideLoading(),
      (error) => this.hideLoading()
    );
  }
}
