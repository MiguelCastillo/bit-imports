import Component from "js/Component";


class Footer extends Component {
  constructor(options = {}) {
    super(options);
  }

  render() {
    return Component.cojones `
      <footer>
        © Miguel Castillo 2015
      </footer>
    `;
  }
}

export default Footer;
