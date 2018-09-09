import {Constants} from "../../../utils/Constants";
import {Events} from "ionic-angular";
import {NgZone} from "@angular/core";

export class BaseClientPage {
  public serverId: number = Constants.DEFAULT_SERVER_ID;
  public logsEnabled: boolean = true;
  public logs: string = '';

  constructor(public events: Events, public ngZone: NgZone) {

  }

  ionViewWillEnter() {
    this.subscribeToBLEServiceEvents();
  }

  ionViewDidLeave() {
    this.unsubscribeToBLEServiceEvents();
  }

  subscribeToBLEServiceEvents() {
    this.events.subscribe(Constants.EVENT_KEY_LOGS, (data: string) => {
      this.ngZone.run(() => {
        this.logs += data;
        this.logs += '\n';
      });
    });
  }

  unsubscribeToBLEServiceEvents() {
    this.events.unsubscribe(Constants.EVENT_KEY_LOGS);
  }
}
