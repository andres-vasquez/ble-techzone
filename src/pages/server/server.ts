import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BleServerService} from "../../providers/ble-server-service";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html'
})
export class ServerPage {

  private serverId: string = '';
  private startStopText: string = '';


  constructor(public navCtrl: NavController, private bleServer: BleServerService) {
    this.startStopText = 'Start advertising';
    this.getServerId();
  }

  getServerId() {
    return 'DEVICE_' + Math.floor(Math.random() * 99999) + 1000;
  }

  startStopServer() {
    if(this.bleServer.isAdvertising){
      this.bleServer.startAdvertising();
    } else {
      this.bleServer.stopAdvertising();
    }
  }

  ionViewWillEnter() {
    this.subscribeToBLEServiceEvents();
  }

  ionViewDidLeave() {
    this.unsubscribeToBLEServiceEvents();
  }

  subscribeToBLEServiceEvents() {

  }

  unsubscribeToBLEServiceEvents() {

  }
}
