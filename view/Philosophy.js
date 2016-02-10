import Component from "../js/Component";

class Philosophy extends Component {
  render() {
    return this.content `
      <div>
A workflow that works really well is one in which your web application does not have an out of band build step during development, and all external dependencies consumed by your application are prebundled with bit-bundler, browserify, or similar tool. The key is in the separation of what is application code vs external dependencies. Your code vs someone else's code. Your application needs to load dependencies without needing an out of band build step for every change. Only when the application is ready for deployment are you encouraged to bundle your application up.
      </div>
    `;
  }
}

export default Philosophy;
