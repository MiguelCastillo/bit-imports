import Component from "../js/Component";

class Docs extends Component {
  render() {
    return this.content `
      <iframe src="/_docs/global.html" style="width:100%; height:100%; border:0px;"></iframe>
    `;
  }
}

export default Docs;
