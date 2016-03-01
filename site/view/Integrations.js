import Component from "../js/Component";
import Babel from "./Babel";

class Integrations extends Component {
  render() {
    return this.content `
      <div class="integrations-view">
        <div class="wrapper">
          ${ new Babel() }
        </div>
      </div>
    `;
  }
}

export default Integrations;
