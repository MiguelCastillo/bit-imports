import Component from "../js/Component";

class Banner extends Component {
  render() {
    return this.content `
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

export default Banner;
