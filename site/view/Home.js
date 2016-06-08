import Component from "../js/Component";
import Banner from "./Banner";
import Highlights from "./Highlights";


class Home extends Component {
  render() {
    return this.content `
      ${ new Banner() }
      ${ new Highlights() }
    `;
  }
}


export default Home;
