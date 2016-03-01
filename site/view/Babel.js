import Component from "../js/Component";

class BabelIntegration extends Component {
  render() {
    return this.content `
      <section class="babel-view">
        <div class="text">
          <h4>
            With the flexibility of bit-imports' plugin system, adding <a href="https://babeljs.io/" target="_blank">babeljs</a> support is very trivial
          </h4>
          <div>This means you can start using the newest ES features available, right in the browser without an out of band build process.</div>
        </div>
        <div class="media">
          <img src="img/babel.png" alt="Babel" class="babel-logo">
        </div>
      </section>
    `;
  }
}

export default BabelIntegration;
