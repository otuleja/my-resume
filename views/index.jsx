var React = require('react');
var DefaultLayout = require('./Layout/default');

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>
      <a href="/about">About</a>
      <div>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = HelloMessage;