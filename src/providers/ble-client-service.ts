///<reference path="../../node_modules/@ionic-native/bluetooth-le/index.d.ts"/>
import {Injectable} from '@angular/core';
import {BluetoothLE} from '@ionic-native/bluetooth-le';
import {Observable} from "rxjs/Observable";
import {Events, Platform} from "ionic-angular";
import {AttendanceBLE} from "../models/AttendanceBLE";
import {UserAction} from "../models/UserAction";
import {BleClientFunctionsService} from "./ble-client-functions-service";

@Injectable()
export class BleClientService extends BleClientFunctionsService {

  constructor(public ble: BluetoothLE, public events: Events, public platform: Platform) {
    super(ble, events, platform);
  }

  /**
   * Given a SCAN_TIMEOUT start scanning for Bluetooth Low Energy devices
   * @returns {Observable<AttendanceBLE>}
   */
  public availableBLEdevices(): Observable<AttendanceBLE> {
    return super.availableBLEdevices();
  }


  /**
   * Write sequence
   * @param serverName
   * @param userData
   */
  public writeSequence(serverName: string, userData: UserAction): Observable<any> {
    return this.baseSequence(serverName, userData);
  }

  /**
   * Read sequence
   * @param serverName
   */
  public readSequence(serverName: string): Observable<any> {
    return this.baseSequence(serverName);
  }
}
