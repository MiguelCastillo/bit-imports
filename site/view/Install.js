import Component from "../js/Component";
import InstallContent from "./Install.md";

class Install extends Component {
  render() {
    return this.content `
      <div class="install">
        <div class="markdown-body">${ InstallContent }</div>
      </div>
    `;
  }
}

export default Install;
