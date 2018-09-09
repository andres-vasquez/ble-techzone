import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {BleServerService} from "../../providers/ble-server-service";
import {Constants} from "../../utils/Constants";
import {UserAction} from "../../models/UserAction";

@IonicPage()
@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {

  private serverId: number = Constants.DEFAULT_SERVER_ID;
  private logs: string = '';

  private startStopText: string = '';
  private entries: Array<UserAction> = [];

  constructor(public navCtrl: NavController,
              public events: Events,
              private bleServer: BleServerService,
              private ngZone: NgZone) {
    this.startStopText = Constants.SERVER_TEXT_START_ADVERTISING;
  }

  startStopServer() {
    if (!this.bleServer.isAdvertising) {
      this.bleServer.startAdvertising(this.getDeviceName());
      this.startStopText = Constants.SERVER_TEXT_STOP_ADVERTISING;
    } else {
      this.bleServer.stopAdvertising();
      this.startStopText = Constants.SERVER_TEXT_START_ADVERTISING;
    }
  }

  generateRandomServerId() {
    this.serverId = Math.floor(Math.random() * 99999) + 1001;
  }

  getDeviceName(): string {
    return Constants.DEFAULT_SERVER_PREFIX + this.serverId;
  }

  ionViewWillEnter() {
    this.subscribeToBLEServiceEvents();
  }

  ionViewDidLeave() {
    this.unsubscribeToBLEServiceEvents();
  }

  subscribeToBLEServiceEvents() {
    this.events.subscribe(Constants.EVENT_KEY_LOGS, (data: string) => {
      this.ngZone.run(() => {
        this.logs += data;
        this.logs += '\n';
      });
    });

    this.events.subscribe(Constants.EVENT_KEY_USER_ACTION, (data: UserAction) => {
      this.ngZone.run(() => {
        this.entries.unshift(data);
      });
    });
  }

  unsubscribeToBLEServiceEvents() {
    this.events.unsubscribe(Constants.EVENT_KEY_LOGS);
    this.events.unsubscribe(Constants.EVENT_KEY_USER_ACTION)
  }
}
