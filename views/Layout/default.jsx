var React = require('react');

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title || "My default title"}</title>
        <link rel="stylesheet" href="css/styles.css" />
      </head>
      <body>{props.children}</body>
    </html>
  );
}

module.exports = DefaultLayout;