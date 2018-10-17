import {ScanStatus} from "@ionic-native/bluetooth-le";
import {Constants} from "./Constants";
import {Platform} from "ionic-angular";

export class BLEUtils {

  constructor() {
  }

  // only works for ASCII characters
  static bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  // only works for ASCII characters
  static stringToBytes(string) {
    let array = new Uint8Array(string.length);
    for (let i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  static getDistance(rssi: number, txPower: number, platform: Platform): number {
    if (platform.is('ios')) {
      if (rssi == 0) {
        return -1.0; // if we cannot determine accuracy, return -1.
      }

      const ratio: number = rssi * 1.0 / txPower;
      if (ratio < 1.0) {
        return Math.pow(ratio, 10);
      }
      else {
        const accuracy: number = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        return accuracy;
      }
    } else {
      //TODO review for Android
      if (rssi == 0) {
        return -1.0; // if we cannot determine accuracy, return -1.
      }

      const ratio: number = rssi * 1.0 / txPower;
      if (ratio < 1.0) {
        return Math.pow(ratio, 10);
      }
      else {
        const accuracy: number = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        return accuracy;
      }
    }
  }

  static isAttenceServer(scanStatus: ScanStatus): boolean {
    if (scanStatus.advertisement) {
      if (typeof scanStatus.advertisement !== "string" &&
        scanStatus.advertisement.serviceUuids.indexOf(Constants.ATTENDANCE_SERVICE_UUID)) {
        return true;
      }
    }
    return false;
  }
}
