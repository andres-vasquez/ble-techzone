import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Constants} from "../../utils/Constants";
import {Events} from "ionic-angular";

@Component({
  selector: 'ble-logs',
  templateUrl: 'ble-logs.html'
})
export class BleLogsComponent implements OnInit {

  public logsEnabled: boolean = true;
  public logs: Array<string> = [];

  @Input() logType: string = '';

  constructor(private ngZone: NgZone,
              private events: Events) {
  }

  ngOnInit() {
    this.subscribeEvents();

    const addLog = () => {
      const message: string = 'ok works';
      this.events.publish(Constants.BLE_EVENT_PREFIX + ":" + this.logType, message);
      console.log('Sned events');

      setTimeout(() => {
        addLog();
      }, 3000);
    };
    addLog();
  }

  public enableDisableLogs() {
    if (this.logsEnabled) {
      this.subscribeEvents();
    } else {
      this.unsubscribeEvents();
    }
  }

  public clearLogs() {
    this.ngZone.run(() => {
      this.logs = [];
    });
  }

  private subscribeEvents() {
    this.events.subscribe(Constants.BLE_EVENT_PREFIX + ":" + this.logType, this.handleLogEvent);
  }

  private unsubscribeEvents() {
    //this.events.unsubscribe(Constants.BLE_EVENT_PREFIX + ":" + this.logType, this.handleLogEvent);
  }

  handleLogEvent = (message: string) =>
    this.ngZone.run(() => {
      this.logs.unshift(message);
      console.table(this.logs);
    });
}
