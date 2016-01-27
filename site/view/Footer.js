import Component, { content } from "../js/Component";


class Footer extends Component {
  constructor(options = {}) {
    super(options);
  }

  render() {
    return content `
      <footer>
        © Miguel Castillo 2015
      </footer>
    `;
  }
}

export default Footer;
