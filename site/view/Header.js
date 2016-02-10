import Component from "../js/Component";


class Header extends Component {
  render() {
    return this.content `
      <header>
        <nav id="nav">
          <ul class="nav-left">
            <li>
              <a href="home">
                Home
              </a>
            </li>
            <li>
              <a href="docs">
                Docs
              </a>
            </li>
        </ul>
        <ul class="nav-middle">
            <li>
              <a href="home">
                <img id="bit-imports-mini" src="img/bit-imports.svg" alt="bit imports" class="mini-logo">
              </a>
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
