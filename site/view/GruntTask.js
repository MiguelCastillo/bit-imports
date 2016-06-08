import Component from "../js/Component";
import GruntTaskContent from "./GruntTask.md";

class GruntTask extends Component {
  render() {
    return this.content `
      <div class="grunt-task">
        <div class="markdown-body">${ GruntTaskContent }</div>
      </div>
    `;
  }
}

export default GruntTask;
