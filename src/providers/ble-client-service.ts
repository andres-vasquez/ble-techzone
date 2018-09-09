import {Injectable} from '@angular/core';
import {BluetoothLE} from '@ionic-native/bluetooth-le';

@Injectable()
export class BleClientService {

  constructor(private ble: BluetoothLE) {
  }

}
