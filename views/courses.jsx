var React = require('react');
var DefaultLayout = require('./Layout/default');

function Courses(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>
        {props.courses.map(course => {
          return (
            <div>
              {course.name}
            </div>
          )
        })}
      </div>
    </DefaultLayout>
  );
}

module.exports = Courses;