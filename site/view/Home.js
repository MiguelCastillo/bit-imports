import Component, { content } from "../js/Component";
import Highlights from "./Highlights";


class Description extends Component {
  render() {
    return content `
      <div class="canvas-wrap">
        <div class="canvas-content">
          <img id="bit-imports" src="img/bit-imports.svg" alt="bit imports">
          <h1>module loader for the browser</h1>
        </div>
        <div id="canvas" class="canvas"></div>
      </div>
    `;
  }
}


class Babel extends Component {
  render() {
    return content `
      <div class="wrapper">
        <section class="babel">
          <div class="text">
            <h4>With the flexibility of bit imports' plugin system, adding <a href="https://babeljs.io/" target="_blank">babeljs</a> support in the browser is very trivial</h4>
            <p>This means you can start using the newest ES features available, while transparently integrating with external dependencies and legacy code written in different module formats.</p>
          </div>
          <div class="media">
            <img src="img/babel.png" alt="Babel">
          </div>
        </section>
      </div>
    `;
  }
}


class Home extends Component {
  render() {
    return content `
      ${new Description()}
      ${new Highlights()}
      ${new Babel()}
    `;
  }
}


export default Home;
