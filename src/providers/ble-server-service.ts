import {Injectable} from '@angular/core';
import {BLEUtils} from "../utils/BLEUtils";
import {AdvertisingParams, AdvertisingParamsAndroid, BluetoothLE, InitializeResult} from "@ionic-native/bluetooth-le";
import {Events, Platform} from "ionic-angular";
import {Constants} from "../utils/Constants";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {UserAction} from "../models/UserAction";

@Injectable()
export class BleServerService {

  private isAndroid: boolean = true;

  // UUID: https://www.uuidgenerator.net/
  //Attendance
  private ATTENDANCE_SERVICE_NAME = 'Attendance';
  private ATTENDANCE_SERVICE_UUID = 'AE400001-93FF-4340-AED9-F0C8F25A3796';
  private ATTENDANCE_CHAR_SET_UUID = 'AE400002-93FF-4340-AED9-F0C8F25A3796';
  private ATTENDANCE_VALUE_UUID = 2901;


  public isAdvertising: boolean = false;

  constructor(public platform: Platform, public events: Events, private ble: BluetoothLE) {
  }


  intialize(isAndroid: boolean) {
    this.isAndroid = isAndroid;
    this.ble.initialize({request: true}).then((result) => {
      if (result.status === 'enabled') {
        console.log('BLE initialized successfully');
        this.events.publish(Constants.EVENT_KEY_LOGS, 'BLE initialized successfully');
        this.initializePeripheral();
      } else {
        this.events.publish(Constants.EVENT_KEY_LOGS, 'BLE not initialized');
        if (this.platform.is('android')) {
          this.events.publish(Constants.EVENT_KEY_LOGS, 'Initializing Bluetooth');
          this.enable();
        } else {
          this.events.publish(Constants.EVENT_KEY_LOGS, 'Bluetooth is not Enabled');
        }
      }
    });
  }

  initializePeripheral() {
    let observer = Observable.create((observer: Observer<any>) => {
      let successCallback = function (data) {
        console.log('1', data);
        observer.next(data);
      };

      let errorCallback = function (error) {
        observer.error(error);
      };

      //TODO review IonicNative upates
      //Error in the Ionic Native Plugin, Promise mapped as Observable
      cordova.exec(successCallback, errorCallback, 'BluetoothLePlugin', "initializePeripheral", []);
    });

    observer.subscribe((data: InitializeResult) => {
      this.events.publish(Constants.EVENT_KEY_LOGS, 'Server status: ' + data.status);

      if (data.status === 'enabled') {
        this.addService();
      }
    }, error => this.errorHander(error));
  }

  enable() {
    this.ble.enable().then(() => {
      this.events.publish(Constants.EVENT_KEY_LOGS, 'Bluetooth enabled!');
      this.intialize(this.isAndroid);
    }, this.errorHander);
  }

  addService() {
    const params = {
      service: "1234",
      characteristics: [
        {
          uuid: "ABCD",
          permissions: {
            read: true,
            write: true,
            //readEncryptionRequired: true,
            //writeEncryptionRequired: true,
          },
          properties: {
            read: true,
            writeWithoutResponse: true,
            write: true,
            notify: true,
            indicate: true,
            //authenticatedSignedWrites: true,
            //notifyEncryptionRequired: true,
            //indicateEncryptionRequired: true,
          }
        }
      ]
    };
    this.ble.addService(params).then((status) => {
      console.log(status);
    }, this.errorHander);
  }

  startAdvertising(deviceName: string) {
    let params;

    if (this.isAndroid) {
      params = {name: deviceName, service: "1234"};
    } else {
      params = {name: deviceName, services: ["1234"]};
    }

    this.ble.startAdvertising(params).then((status) => {
      this.isAdvertising = true;
      console.log(status);
    }, this.errorHander)
  }

  stopAdvertising() {
    this.ble.stopAdvertising().then((status) => {
      this.isAdvertising = false;
      console.log(status);
    }, this.errorHander);
  }

  errorHander(error) {
    console.log('Error', error);
    this.events.publish(Constants.EVENT_KEY_LOGS, 'Error: ' + error);
  }
}
