import {Injectable} from '@angular/core';
import {BLE} from '@ionic-native/ble';

@Injectable()
export class BluetoothService {

  constructor(private ble: BLE) {
  }

  isEnabled() {
    this.ble.isEnabled().then(() => {
      console.log("Result");
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  startStateNotifications() {
    this.ble.startStateNotifications().subscribe((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  stopStateNotifications() {
    this.ble.stopStateNotifications().then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  // Android only
  showBluetoothSettings() {
    this.ble.showBluetoothSettings().then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  // Android only
  enable() {
    this.ble.enable().then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  // Android only
  bondedDevices() {
    this.ble.bondedDevices().then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }
}
