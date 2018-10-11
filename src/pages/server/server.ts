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

  // Add logType
  public logType: string = Constants.BLE_EVENT_SERVER;
  private serverId: number = Constants.DEFAULT_SERVER_ID;

  // List of questions
  private entries: Array<UserAction> = [];

  // Text for start/stop button
  private startStopText: string = '';


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

    /*const addQuestion = () => {
      const userQuestion = new UserAction('hola@si.com', 'Que hase');
      this.events.publish(Constants.EVENT_KEY_USER_ACTION, userQuestion);
      console.log('Event');
      setTimeout(() => addQuestion(), 4000);
    };
    addQuestion();*/
  }

  ionViewDidLeave() {
    this.unsubscribeToBLEServiceEvents();
  }

  subscribeToBLEServiceEvents() {
    this.events.subscribe(Constants.EVENT_KEY_USER_ACTION, (data: UserAction) => {
      this.ngZone.run(() => {
        this.entries.push(data);
      });
    });
  }

  unsubscribeToBLEServiceEvents() {
    this.events.unsubscribe(Constants.EVENT_KEY_USER_ACTION)
  }
}
