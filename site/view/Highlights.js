import Component from "../js/Component";


class Highlights extends Component {
  render() {
    return this.content `
      <div class="highlights-view">
        <div class="wrapper">
          <section>
            <img src="./img/formats.svg" alt="Formats">
            <h2>Formats</h2>
            <p>Build applications with System.import semantics and CJS module dependencies.</p>
          </section>
          <section>
            <img src="./img/pluggable.svg" alt="Pluggable">
            <h2>Pluggable</h2>
            <p>Powerful plugin system that gives you fine grained control of your application assets.</p>
          </section>
          <section>
            <img src="./img/browser.svg" alt="Browser">
            <h2>Browser</h2>
            <p>Remove your bundling step when developing your Application. Only bundle when you really need to - before deploying to production.</p>
          </section>
        </div>
      </div>
    `;
  }
}


export default Highlights;
