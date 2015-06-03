import Component from "../js/Component";
import Jumbotron  from "./Jumbotron";


class Highlights extends Component {
  render() {
    var content = Component.cojones `
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3 class="text-center"><i class="fa fa-files-o"></i> Formats</h3>
            <div>Building applications generally means dependencies of incompatible module formats. For this, bit imports supports AMD and CJS out of the box.</div>
          </div>
          <div class="col-md-4">
            <h3 class="text-center"><i class="fa fa-plug"></i> Pluggable</h3>
            <div>Simple and flexible plugin system for building pipelines to process your JavaScript, and even add support for other file types.</div>
          </div>
          <div class="col-md-4">
            <h3 class="text-center"><i class="fa fa-list-alt"></i> Browser</h3>
            <div>Remove your bundling step when developing your Application. Only bundle when you really need to - before deploying to production.</div>
          </div>
        </div>
      </div>
    `;

    return Component.cojones `
      ${new Jumbotron({content: content})}
    `;
  }
}


export default Highlights;
