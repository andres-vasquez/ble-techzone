import {Injectable} from '@angular/core';
import {BLEUtils} from "../utils/BLEUtils";

@Injectable()
export class BleServerService {

  // UUID: https://www.uuidgenerator.net/
  //Attendance
  private ATTENDANCE_SERVICE_NAME = 'Attendance';
  private ATTENDANCE_SERVICE_UUID = 'AE400001-93FF-4340-AED9-F0C8F25A3796';
  private ATTENDANCE_CHAR_SET_UUID = 'AE400002-93FF-4340-AED9-F0C8F25A3796';
  private ATTENDANCE_VALUE_UUID = 2901;

  //Questions
  private QUESTIONS_SERVICE_NAME = 'Questions';
  private QUESTIONS_SERVICE_UUID = 'BE400001-93FF-4340-AED9-F0C8F25A3796';
  private QUESTIONS_CHAR_SET_UUID = 'BE400002-93FF-4340-AED9-F0C8F25A3796';
  private QUESTIONS_CHAR_GET_UUID = 'BE400003-93FF-4340-AED9-F0C8F25A3796';
  private QUESTIONS_VALUE_UUID = 3901;


  private attendanceService: any;
  private questionsService: any;

  public isAdvertising: boolean = false;

  constructor() {
  }


  init() {
    blePeripheral.onWriteRequest(this.didReceiveWriteRequest);
    blePeripheral.onBluetoothStateChange(this.onBluetoothStateChange);
    this.createServiceJSON();
  }

  startAdvertising() {
    if (this.attendanceService && this.questionsService) {
      Promise.all([
        blePeripheral.createServiceFromJSON(this.attendanceService),
        blePeripheral.startAdvertising(this.attendanceService.uuid, this.ATTENDANCE_SERVICE_NAME),
        blePeripheral.createServiceFromJSON(this.questionsService),
        blePeripheral.startAdvertising(this.questionsService.uuid, this.QUESTIONS_SERVICE_NAME)
      ]).then(
        function () {
          console.log('Attendance and question service created');
          this.isAdvertising = true;
        },
      );
    } else {
      console.log('Error loading Attendance or question service');
    }
  }

  stopAdvertising() {
    if (this.attendanceService && this.questionsService) {
      Promise.all([
        blePeripheral.stopAdvertising(this.attendanceService.uuid),
        blePeripheral.stopAdvertising(this.questionsService.uuid)
      ]).then(
        function () {
          console.log('Advertising services stopped');
        },
      );
    } else {
      console.log('Error loading Attendance or question service');
    }
  }

  private didReceiveWriteRequest(request: any) {
    const message = BLEUtils.bytesToString(request.value);
    console.log(message);
  }

  private onBluetoothStateChange(state: any) {
    console.log('Bluetooth State is', state);
  }

  createServiceJSON() {
    const property = blePeripheral.properties;
    const permission = blePeripheral.permissions;

    this.attendanceService = {
      uuid: this.ATTENDANCE_SERVICE_UUID,
      characteristics: [
        {
          uuid: this.ATTENDANCE_CHAR_SET_UUID,
          properties: property.WRITE,
          permissions: permission.WRITEABLE,
          descriptors: [
            {
              uuid: this.ATTENDANCE_VALUE_UUID,
              value: ''
            }
          ]
        }
      ]
    };

    this.questionsService = {
      uuid: this.QUESTIONS_SERVICE_UUID,
      characteristics: [
        {
          uuid: this.QUESTIONS_CHAR_SET_UUID,
          properties: property.WRITE,
          permissions: permission.WRITEABLE,
          descriptors: [
            {
              uuid: this.QUESTIONS_VALUE_UUID,
              value: 'Set'
            }
          ]
        },
        {
          uuid: this.QUESTIONS_CHAR_GET_UUID,
          properties: property.READ | property.NOTIFY,
          permissions: permission.READABLE,
          descriptors: [
            {
              uuid: this.QUESTIONS_VALUE_UUID,
              value: 'Get'
            }
          ]
        }
      ]
    };
  }
}
