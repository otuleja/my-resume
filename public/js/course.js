let currentVideoJSPlayer = null;

let headerEl = null;
let courseContainer = null;
let nameRowEl = null;
let courseContentContainer = null;
let videoContainer = null;
let videoMenuElements = null;
// let vidHelperText = null;
let loadingElement = null

let viewHeight = 0;
let vidKey = "";
let courseID = "";

let myCoolInterval = null;
let progressObject = {}


function insertCompletedCheck(vidKey) {
  const completedCheckElement = document.getElementById(`completed-check-${vidKey}`)
  completedCheckElement.classList.remove("hide")
}

function updateProgressBar(vidKey, percentage) {
  const progressBarElement = document.getElementById(`progress-bar-${vidKey}`)
  progressBarElement.style.width = `${percentage}%`
}

function addProgressToVideos() {
  if (progressObject[courseID]) {
    videoMenuElements.forEach(element => {
      const currentVidKey = element.id.split("video-menu-")[1]
      if (progressObject[courseID][currentVidKey]?.isCompleted) {
        insertCompletedCheck(currentVidKey)
      }
      if (progressObject[courseID][currentVidKey]?.progress && progressObject[courseID][currentVidKey]?.duration) {
        const percentComplete = Math.floor((progressObject[courseID][currentVidKey].progress / progressObject[courseID][currentVidKey].duration) * 100)
        updateProgressBar(currentVidKey, percentComplete)
      }
    })

  }
}
function checkVidStatus() {
  if (currentVideoJSPlayer) {
    //expand current video with transition and description of learning points - bold the current part/finsihed sections
    const currentTime = currentVideoJSPlayer.currentTime()
    const duration = currentVideoJSPlayer.duration()
    if (currentTime > 0) {
      progressObject[courseID] = progressObject[courseID] || {}
      progressObject[courseID][vidKey] = progressObject[courseID][vidKey] || {}
      progressObject[courseID][vidKey].progress = currentTime
      progressObject[courseID][vidKey].duration = duration
      if (currentTime / duration > .98) {
        progressObject[courseID][vidKey].isCompleted = true
        insertCompletedCheck(vidKey)
      }
      localStorage.setItem("progressObject", JSON.stringify(progressObject))
    }
    addProgressToVideos()
  }
}
function init() {
  headerEl = document.getElementById("header");
  courseContainer = document.getElementById("course-container");
  nameRowEl = document.getElementById("course-name-row")
  courseContentContainer = document.getElementById("course-content-container");
  videoContainer = document.getElementById("video-container");
  videoMenuElements = document.querySelectorAll(".styled-video-menu");
  // vidHelperText = document.getElementById("vid-helper-text");
  loadingElement = document.getElementById("loading")

  viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  courseID = window.location.pathname.split("/")[2]
  progressObject = JSON.parse(localStorage.getItem("progressObject")) || {}

  const containerHeight = viewHeight - headerEl.clientHeight;
  courseContainer.style.height = `${containerHeight}px`;

  //default to first video being active by simulating click
  handleMenuClick({ currentTarget: videoMenuElements[0] })
  setCourseContentContainer(containerHeight)
  setVideoMenuListeners()
  addProgressToVideos()
}


function setCourseContentContainer(containerHeight) {
  const targetHeight = containerHeight - nameRowEl.clientHeight;
  courseContentContainer.style.height = `${targetHeight}px`;
}

function clearVidContent() {
  if (currentVideoJSPlayer) {
    currentVideoJSPlayer.dispose();
  }
  if (myCoolInterval) {
    clearInterval(myCoolInterval)
    myCoolInterval = null
  }
  videoContainer.innerHTML = ""
}
function setVideoMenuListeners() {
  videoMenuElements.forEach(element => {
    element.addEventListener("click", (e) => {
      handleMenuClick(e)
    })
  })
}

function handleMenuClick(e, isInitialLoad = false) {
  videoMenuElements.forEach(element => {
    element.classList.remove("active-video-menu")
  })
  clearVidContent()
  e.currentTarget.classList.add("active-video-menu")
  const id = e.currentTarget.id;
  vidKey = id.split("video-menu-")[1];
  const bucket = e.currentTarget.getAttribute("video-bucket");
  // vidHelperText.classList.add("hide")
  loadingElement.classList.remove("hide")
  getSignedVideoUrl(bucket, vidKey, isInitialLoad)
}

async function getSignedVideoUrl(bucket, key, isInitialLoad = false) {
  fetch(`/api/getSignedUrl/${bucket}/${key}`).then(async res => {
    res = await res.json()
    const { url: videoUrl } = res;
    injectVideoUrl(videoUrl, isInitialLoad)
  }).catch(err => {
    console.log("err", err)
  }).finally(() => {
    loading.classList.add("hide")
  })
}

function injectVideoUrl(videoUrl, isInitialLoad = false) {
  videoContainer.classList.remove("hide")
  const videoElement = document.createElement("video")
  videoElement.setAttribute("id", "active-video")
  videoElement.classList.add("video-js")

  const source = document.createElement("source")
  source.setAttribute("src", videoUrl)
  videoElement.appendChild(source)
  videoContainer.appendChild(videoElement)

  currentVideoJSPlayer = videojs('active-video', {
    controls: true,
    autoplay: isInitialLoad ? false : true,
    preload: 'auto',
    aspectRatio: '16:9',
  })
  if (progressObject[courseID]?.[vidKey]?.progress) {
    currentVideoJSPlayer.currentTime(progressObject[courseID][vidKey].progress)
  }
  checkVidStatus()
  myCoolInterval = setInterval(checkVidStatus, 5000)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
