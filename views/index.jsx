var React = require('react');
var DefaultLayout = require('./Layout/default');
function HelloMessage(props) {
  const buttons = [
    { name: "Courses", path: "/courses" },
    { name: "Valuations", path: "/valuations" },
    { name: "About", path: "/about" }
  ]
  return (
    <DefaultLayout title={props.title}>
      <div class="container mt-4 home" >
        <div class="row">
          {buttons.map((button, index) => {
            let classString = "col s12 m4 center-align"
            if (true) {
              classString += " mt-2"
            }
            return (
              <div class={classString}>
                <a href={button.path}>
                  <div class="home-link-wrapper">
                    {button.name}

                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </DefaultLayout>
  );
}

module.exports = HelloMessage;