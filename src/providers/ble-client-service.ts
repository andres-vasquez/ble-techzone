import {Injectable} from '@angular/core';
import {BluetoothLE, ScanStatus} from '@ionic-native/bluetooth-le';
import {Observable} from "rxjs/Observable";
import {Constants} from "../utils/Constants";
import {Events} from "ionic-angular";
import {Observer} from "rxjs/Observer";

@Injectable()
export class BleClientService {

  SCAN_TIMEOUT: number = 30000; // 30 seconds

  constructor(private ble: BluetoothLE, public events: Events,) {
  }

  availableBLEdevices(): Observable<any> {
    return Observable.create((observer: any) => {
      this.startScanBLE();
      setTimeout(() => {
        this.stopScanBLE();
      }, this.SCAN_TIMEOUT);
    });
  }

  startScanBLE(): Observable<ScanStatus> {
    return Observable.create((observer: Observer<ScanStatus>) => {
      const params = {};

      this.ble.startScan(params).subscribe(({status: ScanStatus}) => {
        if (status === 'scanStarted') {
          this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'scanStarted');
        } else if (status === 'scanResult') {
          observer.next(ScanStatus);
        }
      }, error => this.errorHander(error);
    });
  }

  stopScanBLE() {
    this.ble.stopScan().then(({status: ScanStatus}) => {
      if (status === 'scanStopped') {
        this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'scanStopped');
      }
    }, error => this.errorHander(error));
  }

  /**
   * Default Error handler for previous methods
   * @param error
   */
  errorHander(error) {
    console.error(error);
    this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'Error: ' +
      JSON.stringify(error));
  }
}
