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
              <div class="row mb-0 menu-container">
                {course.videos.map(video => {
                  return (
                    <div class="col s12">
                      <div class="styled-video-menu full-width center-align" id={`video-menu-${video.key}`} video-bucket={video.bucket}>
                        <div>
                          <span class="progress-check hide" id={`completed-check-${video.key}`}>
                            <i class="material-icons">check_circle</i>
                          </span>
                          <span>
                            {video.name}
                          </span>
                        </div>
                        <div class="row mb-0">
                          <div class="col s6 offset-s3">
                            <div class="progress">
                              <div class="determinate" id={`progress-bar-${video.key}`} style={{ width: "0%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div class="col s9 full-height" >
              {/* <div class="mt-2" id="vid-helper-text">
                <h6 class="grey-text text-darken-1 center-align">
                  Select a video from the menu on the left to start watching.
                </h6>
              </div> */}
              <div class="center-align mt-2 hide" id="loading">
                <div class="preloader-wrapper active">
                  <div class="spinner-layer spinner-purple-only">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>
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