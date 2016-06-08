import "./style/application.css";
import "./style/nav.css";
import "./style/dropdown.css";
import "./style/utils.css";
import "./style/github-markdown.css";

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
import API    from "./view/API";
import CLI    from "./view/CLI";
import GruntTask from "./view/GruntTask";
import Install from "./view/Install";

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
    .on(/api/, () => Region.register("content", () => new API()))
    .on(/cli/, () => Region.register("content", () => new CLI()))
    .on(/grunt-task/, () => Region.register("content", () => new GruntTask()))
    .on(/install/, () => Region.register("content", () => new Install()))
    .on(/home/, () => Region.register("content", () => new Home()))
    .on(router.match.none, () => router.navigate("home"))
    .on(router.match.all, () => renderer.render(new DOMElement(document.getElementById("app")), new AppMain()))
    .refresh();

  // Move this to the Home view to be loaded each time the Home view is loaded.
  SpecialEffect.create();
});

