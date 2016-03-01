import Component from "../js/Component";
import BabelIntegration from "./BabelIntegration";
import Banner from "./Banner";
import Highlights from "./Highlights";


class Home extends Component {
  render() {
    return this.content `
      ${ new Banner() }
      ${ new Highlights() }
      ${ new BabelIntegration() }
    `;
  }
}


export default Home;
