//import HTMLTPL from "./app_template.html?raw";
export class AppComponent {
  declare $refs: Record<string, HTMLElement>;
  name: string = "HELLO";

  async init() {
    // carga la plantilla en el visor principal
    console.log("¿CONSERVA EL VERDE? NOOOOO");
    this.$refs.mainViewer.innerHTML = (
      await import("./app_template.html?raw")
    ).default;
  }
}
