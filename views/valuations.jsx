var React = require('react');
var DefaultLayout = require('./Layout/default');
function Valuations(props) {
  return (
    <DefaultLayout title={props.title} component="valuations">
      <div className="container flex-content-center">
        <canvas id="myChart" style={{ width: "100%", maxWidth: "700px" }}></canvas>
      </div>
    </DefaultLayout>
  );
}

module.exports = Valuations;