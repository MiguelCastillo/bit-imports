import Component from "../js/Component";
import UsageDropdown from "./UsageDropdown";

class Header extends Component {
  render() {
    return this.content `
      <header>
        <nav id="nav">
          <ul class="nav-left dropdown">
            <li>
              <a href="home">Home</a>
            </li>
            <li>
              <a>Usage <span class="caret"></span></a>
              ${ new UsageDropdown() }
            </li>
        </ul>
        <ul class="nav-right">
            <li>
              <a href="https://twitter.com/bitsjs" target="_blank">
                <img src="img/twitter.svg" alt="Twitter @bitsjs">
              </a>
            </li>
            <li>
              <a href="https://github.com/MiguelCastillo/bit-imports" target="_blank">
                <img src="img/github.svg" alt="GitHub bit imports">
              </a>
            </li>
            <li>
              <a href="https://gitter.im/MiguelCastillo/bit-imports" target="_blank">
                <img src="img/gitter.svg" alt="Gitter bit imports">
              </a>
            </li>
          </ul>
        </nav>
      </header>
    `;
  }
}

export default Header;
