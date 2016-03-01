import Component from "../js/Component";
import Banner from "./Banner";
import Integrations from "./Integrations";
import Highlights from "./Highlights";


class Home extends Component {
  render() {
    return this.content `
      ${ new Banner() }
      ${ new Highlights() }
      ${ new Integrations() }
    `;
  }
}


export default Home;
