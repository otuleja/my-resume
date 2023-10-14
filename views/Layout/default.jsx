var React = require('react');

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title || "My default title"}</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
        <link rel="stylesheet" href="css/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header>
          <nav>
            <div class="nav-wrapper purple">
              <a href="/" class="brand-logo">Logo</a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">Menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
              </ul>
            </div>
          </nav>
          <ul class="sidenav" id="mobile-demo">
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
          </ul>
        </header>
        <main>
          {props.children}
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="js/script.js"></script>
      </body>
    </html>
  );
}

module.exports = DefaultLayout;