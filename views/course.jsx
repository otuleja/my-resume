var React = require('react');
var DefaultLayout = require('./Layout/default');

function Course({ course }) {
  return (
    <DefaultLayout title={null} component="course">
      <div id="course-container" >
        <div class="container full-screen-width full-height">
          <div class="row mb-0" id="course-name-row">
            <div class="col s12">
              <h4 class="center-align">
                {course.name}
              </h4>
            </div>
          </div>
          <div class="row mb-0" id="course-content-container">
            <div class="col s3 full-height" >
              <div class="row">
                <div class="col s12">
                  <h6 class="center-align">Videos</h6>
                </div>
              </div>
              <div class="row mb-0">
                {course.videos.map(video => {
                  return (
                    <div class="col s12">
                      <div class="styled-video-menu full width center-align" id={`video-menu-${video.key}`} video-bucket={video.bucket}>
                        {video.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div class="col s9 full-height" >
              <div class="" id="vid-helper-text">
                <p>
                  Select a video from the menu on the left to start watching.
                </p>
              </div>
              <div class="hide" id="loading">
                <p>
                  Loading video...
                </p>
              </div>
              <div id="video-container" class="hide full-height">
              </div>
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout >
  );
}

module.exports = Course;