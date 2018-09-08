export class MenuItem {

  icon: string;
  title: string;
  component: any;

  constructor(icon: string, title: string, component: any) {
    this.icon = icon;
    this.title = title;
    this.component = component;
  }
}
