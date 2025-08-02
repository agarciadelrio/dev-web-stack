export class AppComponent {
  declare $refs: Record<string, HTMLElement>;
  name: string = "HELLO";

  async init() {
    this.$refs.mainViewer.innerHTML = (
      await import("./app_template.html?raw")
    ).default;
  }
}
