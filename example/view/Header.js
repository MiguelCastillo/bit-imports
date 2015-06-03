import Component from "../js/Component";


class Header extends Component {
  constructor(options = {}) {
    super(options);
  }

  render() {
    return Component.cojones `
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <a class="navbar-brand"><img src="img/bit-imports_grey.png" class="logo"/></a>

          <ul class="nav navbar-nav">
            <li><a href="https://github.com/MiguelCastillo/bit-imports/tree/master/example" target="_blank">Examples</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li><a href="https://twitter.com/bitsjs" target="_blank">twitter</a></li>
            <li><a href="https://github.com/MiguelCastillo/bit-imports" target="_blank">github</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}

export default Header;
