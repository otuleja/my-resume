var React = require('react');
var DefaultLayout = require('./Layout/default');

function Courses(props) {
  return (
    <DefaultLayout title={props.title}>
      <div class="container mt-4" >
        <div class="row center-align">
          {props.courses.map(course => {
            return (
              <div class="col s10 offset-s1 m8 offset-m2 l6 offset-l3" >
                <div class="card z-depth-5">
                  <div class="card-image">
                    <img src="images/react-1.png" />
                    <span class="card-title">{course.name}</span>
                  </div>
                  <div class="card-content">
                    <p>{course.description}</p>
                  </div>
                  <div class="card-action">
                    <a href={`/course/${course.id}`} class="no-margin">View this course</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </DefaultLayout>
  );
}

module.exports = Courses;