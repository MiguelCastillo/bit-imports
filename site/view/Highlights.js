import Component, { content } from "../js/Component";


class Highlights extends Component {
  render() {
    return content `
      <div class="wrapper">
        <section>
          <img src="./img/formats.svg" alt="Formats">
          <h2>Formats</h2>
          <p>Building applications generally means dependencies of incompatible module formats. For this, bit imports supports AMD and CJS out of the box.</p>
        </section>
        <section>
          <img src="./img/pluggable.svg" alt="Pluggable">
          <h2>Pluggable</h2>
          <p>Simple and flexible plugin system for building pipelines to process your assets.</p>
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
