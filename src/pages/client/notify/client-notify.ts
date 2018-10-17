import {Component, NgZone, OnInit} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BaseClientPage} from "../base/BaseClientPage";
import {Constants} from "../../../utils/Constants";
import {BleClientService} from "../../../providers/ble-client-service";
import {AttendanceBLE} from "../../../models/AttendanceBLE";
import {Subscription} from "rxjs";

@IonicPage()
@Component({
  selector: 'client-notify',
  templateUrl: 'client-notify.html'
})
export class ClientNotifyPage extends BaseClientPage {

  // Add logType
  public logType: string = Constants.BLE_EVENT_RSSI;
  tab: 'list' | 'graph' = 'list';

  subscription: Subscription;

  // List of items to handle
  items: Array<AttendanceBLE> = [];

  // Map of items positions: Key: Addres, Value: position in the list
  map: Map<string, number> = new Map<string, number>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public ngZone: NgZone,
              public clientService: BleClientService,
              public loadingCtrl: LoadingController) {
    super(events, ngZone, clientService, loadingCtrl);
  }

  ionViewDidEnter() {
    this.subscription = this.clientService.availableBLEdevices().subscribe((attendanceBle: AttendanceBLE) => {
      this.ngZone.run(() => {
        if (this.map.has(attendanceBle.scanStatus.address)) {
          //Update the UI
          const device = this.items[this.map.get(attendanceBle.scanStatus.address)];
          device.distance = attendanceBle.distance;
          device.scanStatus.rssi = attendanceBle.scanStatus.rssi;
        } else {
          this.map.set(attendanceBle.scanStatus.address, this.items.length);
          this.items.push(attendanceBle);
        }
      });
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  tabChanged(tab: 'list' | 'graph') {
    this.ngZone.run(() => this.tab = tab);
  }
}
