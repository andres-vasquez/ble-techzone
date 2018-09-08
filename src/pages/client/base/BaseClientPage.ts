import {Constants} from "../../../utils/Constants";

export class BaseClientPage {
  public serverId: number = Constants.DEFAULT_SERVER_ID;
  public logsEnabled: boolean = true;
  public logs: string = '';
}
