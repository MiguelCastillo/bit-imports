import "./style/application.css";

import {
  Component,
  DOMElement,
  DOMReady,
  Eventing,
  Region,
  renderer,
  router
} from './js/ere';

import Header from "./view/Header";
import Footer from "./view/Footer";
import Home   from "./view/Home";
import Docs   from "./view/Docs";

import SpecialEffect from "./effects/SpecialEffect";


class AppMain extends Component {
  render() {
    return this.content `
      <div id="app-header">${ new Header() }</div>
      <div id="app-body">${ new Region("content") }</div>
      <div id="app-footer">${ new Footer() }</div>
    `;
  }
}


DOMReady(() => {
  router
    .on(/docs/, () => Region.register("content", () => new Docs()))
    .on(/home/, () => Region.register("content", () => new Home()))
    .on(router.match.none, () => router.navigate("home"))
    .on(router.match.all, () => renderer.render(new DOMElement(document.getElementById("app")), new AppMain()))
    .refresh();

  // Move this to the Home view to be loaded each time the Home view is loaded.
  SpecialEffect.create();
});

