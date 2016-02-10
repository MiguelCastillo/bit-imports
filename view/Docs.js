import Component from "../js/Component";

class Docs extends Component {
  render() {
    return this.content `
      <iframe src="_docs/global.html" style="flex: 1; border:0px;"></iframe>
    `;
  }
}

export default Docs;
