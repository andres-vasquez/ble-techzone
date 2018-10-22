import {
  BluetoothLE,
  Characteristic, DescriptorParams,
  DeviceInfo,
  OperationResult,
  ScanStatus,
  Service, WriteCharacteristicParams
} from "@ionic-native/bluetooth-le";
import {Events, Platform} from "ionic-angular";
import {Observable, Observer} from "rxjs";
import {Constants} from "../utils/Constants";
import {UserAction} from "../models/UserAction";
import {AttendanceBLE} from "../models/AttendanceBLE";
import {BLEUtils} from "../utils/BLEUtils";

export class BleClientFunctionsService {

  ANDROID_DEFAULT_TX: number = -59;
  SCAN_TIMEOUT: number = 10000; // 10 seconds
  ACTION_TIMEOUT: number = 30000; // 30 seconds

  isScanning: boolean = false;

  constructor(public ble: BluetoothLE, public events: Events, public platform: Platform) {
  }

  protected availableBLEdevices(onlyAttendanceDevices?: boolean): Observable<AttendanceBLE> {
    return Observable.create((observer: Observer<AttendanceBLE>) => {
      this.startScanBLE().subscribe((scanStatus: ScanStatus) => {
        if (scanStatus.name) {
          let device: AttendanceBLE;
          if (onlyAttendanceDevices) {
            if (scanStatus.name.toUpperCase().indexOf('BLE') > -1) {
              device = {
                scanStatus: scanStatus,
                distance: BLEUtils.getDistance(scanStatus.rssi, (typeof scanStatus.advertisement !== "string") ? scanStatus.advertisement.txPowerLevel : this.ANDROID_DEFAULT_TX),
                isAttendanceServer: BLEUtils.isAttenceServer(scanStatus)
              };
            }
          } else {
            device = {
              scanStatus: scanStatus,
              distance: BLEUtils.getDistance(scanStatus.rssi, (typeof scanStatus.advertisement !== "string") ? scanStatus.advertisement.txPowerLevel : this.ANDROID_DEFAULT_TX),
              isAttendanceServer: false
            };
          }

          if (device) {
            observer.next(device);
          }
        }
      }, (error) => {
        this.errorHander(error, observer);
      });

      //  Stop scan after some seconds
      setTimeout(() => {
        this.stopScanBLE();
      }, this.SCAN_TIMEOUT);
    });
  }

  /**
   * Start scanning via BLE
   * @returns {Observable<ScanStatus>}
   */
  private startScanBLE(): Observable<ScanStatus> {
    return Observable.create((observer: Observer<ScanStatus>) => {
      const params = {};

      this.isScanning = true;
      this.ble.startScan(params).subscribe((data: any) => {
        if (data.status && data.status === 'scanStarted') {
          this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'scanStarted');
        } else {
          observer.next(data);
        }
      }, error => this.errorHander(error));
    });
  }

  /**
   * Stop scanning via BLE
   * @returns {Observable<ScanStatus>}
   */
  private stopScanBLE() {
    this.isScanning = false;
    this.ble.stopScan().then(({status: ScanStatus}) => {
      if (status === 'scanStopped') {
        this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'scanStopped');
      }
    }, error => this.errorHander(error));
  }

  /**
   * Connect to a device
   * @param {string} address
   */
  private connect(address: string): Observable<boolean> {
    return Observable.create((connected: Observer<boolean>) => {
      this.ble.connect({address: address, autoConnect: false}).subscribe(
        (parameters: { status: DeviceInfo }) => {
          let status = parameters.status;
          this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'connected');
          connected.next(true);
        }, error => {
          connected.error(error);
          this.errorHander(error)
        });
    });
  }

  /**
   * Disconnect to a device
   * @param {string} address
   */
  private disconnect(address: string) {
    this.ble.disconnect({address: address}).then(
      (parameters: { status: DeviceInfo }) => {
        this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'disconnected');
      }, error => this.errorHander(error));
  }

  /**
   * Discover services after connect
   * @param address
   */
  private discover(address: string): Promise<Array<Service>> {
    return new Promise((resolve, reject) => {
      let serviceAvailableList: Array<Service> = [];
      this.ble.discover({address: address, clearCache: true}).then((data) => {
        if (data.device.services.length) {
          for (let service of data.device.services) {
            if (service.uuid === Constants.ATTENDANCE_SERVICE_UUID) {
              serviceAvailableList.push(service);
            }
          }
        }
        resolve(serviceAvailableList);
      }, error => reject(error));
    });
  }

  private getDefaultCharacteristic(characteristics: Array<Characteristic>): Characteristic {
    for (let characteristic of characteristics) {
      if (characteristic.uuid === Constants.ATTENDANCE_CHAR_SET_UUID) {
        return characteristic;
      }
    }
    return null;
  }

  /**
   * Write function
   * @param characteristic UUID
   * @param address
   * @param service UUID
   * @param data
   */
  private write(characteristic: string, address: string, service: string, data: UserAction): Promise<OperationResult> {
    const params: WriteCharacteristicParams = {
      characteristic: characteristic,
      address: address,
      service: service,
      value: JSON.stringify(data),
      type: ''
    };
    return this.ble.write(params);
  }

  /**
   * Read function
   * @param characteristic UUID
   * @param address
   * @param service UUID
   */
  private read(characteristic: string, address: string, service: string): Promise<{ result: OperationResult }> {
    const params: DescriptorParams = {
      characteristic: characteristic,
      address: address,
      service: service,
    };
    return this.ble.read(params);
  }

  /**
   * Write sequence
   */
  protected baseSequence(serverName: string, userData?: UserAction): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => observer.error('Action timeout'), this.ACTION_TIMEOUT);

      this.availableBLEdevices(true).subscribe((attendanceDevice: AttendanceBLE) => {
        if (attendanceDevice.scanStatus.name.toUpperCase().indexOf(serverName.toUpperCase()) > -1) {
          this.stopScanBLE();

          // Connect
          this.connect(attendanceDevice.scanStatus.address).subscribe((connected: boolean) => {
            if (connected) {

              //Discover services
              this.discover(attendanceDevice.scanStatus.address).then((services: Array<Service>) => {
                const mainService: Service = services[0]; //Note: this sample only considers one service
                const mainCharacteristic = this.getDefaultCharacteristic(mainService.characteristics);

                if (userData) {
                  //Write
                  this.write(mainCharacteristic.uuid, attendanceDevice.scanStatus.address, mainService.uuid, userData)
                    .then((result) => {

                      this.disconnect(attendanceDevice.scanStatus.address);
                    }, error => observer.error(error));
                } else {
                  //Read
                  this.read(mainCharacteristic.uuid, attendanceDevice.scanStatus.address, mainService.uuid)
                    .then((result) => {
                      this.disconnect(attendanceDevice.scanStatus.address);
                    }, error => observer.error(error));
                }
              });
            } else {
              observer.error('Not connected');
            }
          }, error => observer.error(error));
        }
      })
    });
  }

  /**
   * Default Error handler for previous methods
   * @param error
   */
  protected errorHander(error, observer?: Observer<any>) {
    console.error(error);

    if (observer) {
      observer.error(error);
    }

    this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + Constants.BLE_EVENT_CLIENT, 'Error: ' +
      JSON.stringify(error));
  }
}
