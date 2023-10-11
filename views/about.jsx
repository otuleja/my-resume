var React = require('react');
var DefaultLayout = require('./Layout/default');

function About(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = About;