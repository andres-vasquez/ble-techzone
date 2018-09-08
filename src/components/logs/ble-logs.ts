import {Component, Input} from '@angular/core';
import {Constants} from "../../utils/Constants";

@Component({
  selector: 'ble-logs',
  templateUrl: 'ble-logs.html'
})
export class BleLogsComponent {

  @Input() logsEnabled: boolean = true;
  @Input() logs: string = '';

  constructor() {
  }

  clearLogs() {
    this.logs = '';
  }
}
