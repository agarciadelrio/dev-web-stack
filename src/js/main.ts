import "../css/tailwind.css";
import Alpine from "alpinejs";
import { AppComponent } from "./components/app/app_component";

Alpine.data("App", () => new AppComponent());
Alpine.start();
