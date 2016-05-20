import Component from "../js/Component";

class GruntTask extends Component {
  render() {
    return this.content `
      <section class="grunt-task-view">
        <h4>Sometimes you just don't want to bundle your application</h4>
        bit-imports provissions you with a grunt plugin that allows you to pre-process your web application and save all the processed assets to a configurable folder. This way you can transpile your SASS, coffeescript, or ES6 code with Babel, and deploy the transpiled code. Your application's modules can then be loaded dynamically without needing to be transpile each time your application assets are loaded.
      </section>
    `;
  }
}

export default GruntTask;
