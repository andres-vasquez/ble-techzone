export class Constants {
  public static DEFAULT_SERVER_PREFIX: string = 'BLE';
  public static DEFAULT_SERVER_ID: number = 1000;
  public static DEFAULT_RATE: number = 5;

  public static SERVER_TEXT_START_ADVERTISING = 'Start advertising';
  public static SERVER_TEXT_STOP_ADVERTISING = 'Stop advertising';

  public static EVENT_KEY_USER_ACTION: string = 'user:message';


  public static BLE_ADVERTISING_TIMEOUT: number = 180000;

  public static BLE_EVENT_PREFIX: string = 'ble';
  public static BLE_EVENT_SERVER: string = 'server';
  public static BLE_EVENT_CLIENT: string = 'client';
  public static BLE_EVENT_READ: string = 'read';
  public static BLE_EVENT_WRITE: string = 'write';
  public static BLE_EVENT_RSSI: string = 'rssi';
}
