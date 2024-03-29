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
            <div class="col s12 show-on-small hide-on-med-and-up">
              <div class="row mobile-wrapper">
                <div class="col s2">
                  <button id="mobile-decrement-video" class="btn waves-effect mobile-video-button" disabled>&larr;</button>
                </div>
                <div class="col s8 center-align" id="mobile-current-title"></div>
                <div class="col s2 flex justify-content-end">
                  <button id="mobile-increment-video" class="btn waves-effect mobile-video-button">&rarr;</button>
                </div>
              </div>
            </div>
            <div class="col s3 full-height menu-wrapper hide-on-small-only" >
              <div class="row">
                <div class="col s12">
                  <h6 class="center-align">Videos</h6>
                </div>
              </div>
              <div class="row mb-0 menu-container">
                {course.videos.map((video, index) => {
                  return (
                    <div class="col s12 scrollable-video-menu-parent" key={index}>
                      <div class="styled-video-wrapper">
                        <div class="styled-video-menu styled-video-menu-main-content full-width center-align" id={`video-menu-${video.key}`} video-bucket={video.bucket}>
                          <div>
                            <span class="progress-check hide" id={`completed-check-${video.key}`}>
                              <i class="material-icons">check_circle</i>
                            </span>
                            <span class="video-name-span">
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
                        {video.breakpoints && video.breakpoints.length > 0 ?
                          <div class="row mb-0 center-align breakpoint-wrapper-class hide">
                            <div class="col s10 offset-s1 breakpoint-wrapper-inner" id={`breakpoint_wrapper-${video.key}`}>
                              {video.breakpoints.map((breakpoint, index) => {
                                return (
                                  <button key={index} id={`breakpoint-${video.key}-${breakpoint.timestamp}`} data-timestamp={breakpoint.timestamp} className="breakpoint-btn">
                                    {breakpoint.text}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                          :
                          null
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div class="col s12 m9 full-height" >
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