var React = require('react');
var DefaultLayout = require('./Layout/default');
function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Hello {props.name}</div>
      {/* <video width="320" height="240" controls>
        <source src="https://react-class-videos.s3.amazonaws.com/Lesson_3.mp4?AWSAccessKeyId=AKIAURDYARGHD2XG7XKR&Expires=1697024287&Signature=C06APCNY4ZB5HNguQVUK1rYJJ%2B0%3D" type="video/mp4" />
      </video> */}
    </DefaultLayout>
  );
}

module.exports = HelloMessage;