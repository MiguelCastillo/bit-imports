import Component from "../js/Component";
import CLIcontent from "./CLI.md";

class CLI extends Component {
  render() {
    return this.content `
      <div class="cli">
        <div class="markdown-body">${ CLIcontent }</div>
      </div>
    `;
  }
}

export default CLI;
