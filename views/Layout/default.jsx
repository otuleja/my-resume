var React = require('react');

function DefaultLayout({ title, component, children }) {
  console.log("component", component)
  return (
    <html>
      <head>
        <title>{title || "My default title"}</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        {component === "course" && <link href="https://vjs.zencdn.net/8.6.0/video-js.css" rel="stylesheet" />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header id="header">
          <nav>
            <div class="nav-wrapper purple">
              <a href="#!" class="brand-logo">Logo</a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
              <ul class="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/valuations">Valuations</a></li>

              </ul>
            </div>
          </nav>
          <ul class="sidenav" id="mobile-demo">
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/valuations">Valuations</a></li>
          </ul>
        </header>
        <main>
          {children}
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        {component === "course" && <script src="/js/course.js"></script>}
        {component === "course" && <script src="https://vjs.zencdn.net/8.6.0/video.min.js"></script>}
        {component === "valuations" && <script src="/js/valuations.js"></script>}

        <script src="/js/script.js"></script>
      </body>
    </html>
  );
}

module.exports = DefaultLayout;