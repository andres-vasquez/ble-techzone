import {Injectable} from '@angular/core';
import {BLE, BLEScanOptions} from '@ionic-native/ble';

@Injectable()
export class BleClientService {

  constructor(private ble: BLE) {
  }

  startScan() {
    const services = [];
    this.ble.startScan(services).subscribe(
      (device) => {
        console.log(JSON.stringify(device));
      }, (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  startScanWithOptions() {
    const services = [];
    const options: BLEScanOptions = {
      reportDuplicates: true
    };
    this.ble.startScanWithOptions(services, options).subscribe(
      (device) => {
        console.log(JSON.stringify(device));
      }, (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  stopScan() {
    this.ble.stopScan().then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  connect(deviceId: string) {
    this.ble.connect(deviceId).subscribe((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  autoconnect(deviceId: string) {
    let connectCallback = function (result: any) {
      console.log(JSON.stringify(result));
    };

    let disconnectCallback = function (result: any) {
      console.log(JSON.stringify(result));
    };

    this.ble.autoConnect(deviceId, connectCallback, disconnectCallback);
  }

  requestMtu(deviceId: string, mtuSize: number) {
    this.ble.requestMtu(deviceId, mtuSize).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  refreshDeviceCache(deviceId: string, timeoutMillis: number) {
    this.ble.refreshDeviceCache(deviceId, timeoutMillis).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  disconnect(deviceId: string) {
    this.ble.disconnect(deviceId).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  read(deviceId: string, serviceUUID: string, characteristicUUID: string) {
    this.ble.read(deviceId, serviceUUID, characteristicUUID).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  write(deviceId: string, serviceUUID: string, characteristicUUID: string, value: ArrayBuffer) {
    this.ble.writeWithoutResponse(deviceId, serviceUUID, characteristicUUID, value).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  startNotification(deviceId: string, serviceUUID: string, characteristicUUID: string) {
    this.ble.startNotification(deviceId, serviceUUID, characteristicUUID).subscribe((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  stopNotification(deviceId: string, serviceUUID: string, characteristicUUID: string) {
    this.ble.stopNotification(deviceId, serviceUUID, characteristicUUID).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  isConnected(deviceId: string) {
    this.ble.isConnected(deviceId).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  readRSSI(deviceId: string) {
    this.ble.readRSSI(deviceId).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  // iOS only
  connectedPeripheralsWithServices(services: string[]) {
    this.ble.connectedPeripheralsWithServices(services).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  // iOS only
  peripheralsWithIdentifiers(uuids: string[]) {
    this.ble.peripheralsWithIdentifiers(uuids).then((result) => {
      console.log(JSON.stringify(result));
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }
}
