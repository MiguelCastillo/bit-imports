import Component, { content } from "../js/Component";


class Highlights extends Component {
  render() {
    return content `
      <div class="wrapper">
        <section>
          <img src="./img/formats.svg" alt="Formats">
          <h2>Formats</h2>
          <p>Build applications with System.import and CJS syntax and conventions.</p>
        </section>
        <section>
          <img src="./img/pluggable.svg" alt="Pluggable">
          <h2>Pluggable</h2>
          <p>Simple and powerful plugin system for processing your application assets.</p>
        </section>
        <section>
          <img src="./img/browser.svg" alt="Browser">
          <h2>Browser</h2>
          <p>Remove your bundling step when developing your Application. Only bundle when you really need to - before deploying to production.</p>
        </section>
      </div>
    `;
  }
}


export default Highlights;