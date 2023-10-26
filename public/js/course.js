let currentVideoJSPlayer = null;

let headerEl = null;
let courseContainer = null;
let nameRowEl = null;
let courseContentContainer = null;
let videoContainer = null;
let videoMenuElements = null;
let breakpointButtons = null
// let vidHelperText = null;
let loadingElement = null

let viewHeight = 0;
let vidKey = "";
let courseID = "";

let myCoolInterval = null;
const finishThreshold = .98
const beginningThreshold = .05
let progressObject = {}
let breakpointObject = {
  breakpointVideoKey: null,
  breakpoints: []
}

//MAKE breakpoints clickable to take you to that part of video
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

function processBreakpoints(currentTime) {
  if (vidKey === breakpointObject.breakpointVideoKey && breakpointObject.breakpoints?.length) {
    breakpointObject.breakpoints.forEach((breakpoint) => {
      const currentElement = document.getElementById(breakpoint.id)
      currentElement.classList.remove("breakpoint-active")
      currentElement.classList.remove("breakpoint-past")
      currentElement.classList.remove("breakpoint-future")
      if (breakpoint.start < currentTime && currentTime < breakpoint.end) {
        currentElement.classList.add("breakpoint-active")
      } else if (breakpoint.start > currentTime) {
        currentElement.classList.add("breakpoint-future")
      } else {
        currentElement.classList.add("breakpoint-past")
      }

    })
  }
}
function checkVidStatus() {
  if (currentVideoJSPlayer) {
    const currentTime = currentVideoJSPlayer.currentTime()
    const duration = currentVideoJSPlayer.duration()
    if (currentTime > 0) {
      progressObject[courseID] = progressObject[courseID] || {}
      progressObject[courseID][vidKey] = progressObject[courseID][vidKey] || {}
      progressObject[courseID][vidKey].progress = currentTime
      progressObject[courseID][vidKey].duration = duration
      if ((currentTime / duration) > finishThreshold) {
        progressObject[courseID][vidKey].isCompleted = true
        insertCompletedCheck(vidKey)
      }
      localStorage.setItem("progressObject", JSON.stringify(progressObject))
    }
    addProgressToVideos()
    processBreakpoints(currentTime)
  }
}
function init() {
  headerEl = document.getElementById("header");
  courseContainer = document.getElementById("course-container");
  nameRowEl = document.getElementById("course-name-row")
  courseContentContainer = document.getElementById("course-content-container");
  videoContainer = document.getElementById("video-container");
  videoMenuElements = document.querySelectorAll(".styled-video-menu");
  breakpointButtons = document.querySelectorAll(".breakpoint-btn")
  // vidHelperText = document.getElementById("vid-helper-text");
  loadingElement = document.getElementById("loading")

  viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  courseID = window.location.pathname.split("/")[2]
  progressObject = JSON.parse(localStorage.getItem("progressObject")) || {}

  const containerHeight = viewHeight - headerEl.clientHeight;
  courseContainer.style.height = `${containerHeight}px`;

  //default to first video being active by simulating click
  handleMenuClick({ currentTarget: videoMenuElements[0] }, true)
  setCourseContentContainer(containerHeight)
  setVideoMenuListeners()
  addProgressToVideos()
}

function handleBreakpointClick(e) {
  let timestamp = e.currentTarget.dataset.timestamp
  timestamp = parseInt(timestamp)
  console.log(timestamp)
  //force video to play

  if (currentVideoJSPlayer) {
    currentVideoJSPlayer.currentTime(timestamp)
    processBreakpoints(timestamp + 1)
  }
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
  breakpointButtons.forEach(element => {
    element.addEventListener("click", (e) => {
      handleBreakpointClick(e)
    })
  })
}
function clearBreakpointView() {
  const elements = document.querySelectorAll(".breakpoint-wrapper-class") || []
  for (let i = 0; i < elements.length; i++) {
    const currentElement = elements[i]
    currentElement.classList.add("hide")
    const a = currentElement.getAttribute("style")
    currentElement.style.height = "0px"

    const innerElement = currentElement.querySelector(".breakpoint-wrapper-inner")
    if (innerElement) {
      innerElement.classList.add("zero-height")
    }
  }
  const selectedBreakpointInnerWrapper = document.getElementById(`breakpoint_wrapper-${vidKey}`)
  if (selectedBreakpointInnerWrapper) {
    selectedBreakpointInnerWrapper.classList.remove("zero-height")
    selectedBreakpointInnerWrapper.parentElement.classList.remove("hide")
    const targetHeight = selectedBreakpointInnerWrapper.scrollHeight;
    selectedBreakpointInnerWrapper.parentElement.style.height = `${targetHeight}px`
    setTimeout(() => {
      selectedBreakpointInnerWrapper.parentElement.style.height = `fit-content`
    }, 510)
  }
}
function handleMenuClick(e, isInitialLoad = false) {
  breakpointObject = {
    breakpointVideoKey: null,
    breakpoints: []
  }
  videoMenuElements.forEach(element => {
    element.classList.remove("active-video-menu")
  })
  clearVidContent()

  e.currentTarget.classList.add("active-video-menu")
  const id = e.currentTarget.id;
  vidKey = id.split("video-menu-")[1];
  const bucket = e.currentTarget.getAttribute("video-bucket");
  loadingElement.classList.remove("hide")

  clearBreakpointView()
  getSignedVideoUrl(bucket, vidKey, isInitialLoad)
  initializeBreakpoints(vidKey)
}


function initializeBreakpoints(vidKey) {
  const currentVideoBreaktpointWrapper = document.getElementById(`breakpoint_wrapper-${vidKey}`)
  let updatedBreakpoints = []
  if (currentVideoBreaktpointWrapper) {
    for (let i = 0; i < currentVideoBreaktpointWrapper.children.length; i++) {
      const currentElement = currentVideoBreaktpointWrapper.children[i]
      const start = parseInt(currentElement.dataset.timestamp)
      const end = currentVideoBreaktpointWrapper.children[i + 1] ? parseInt(currentVideoBreaktpointWrapper.children[i + 1].dataset.timestamp) : Infinity
      const id = currentElement.id
      updatedBreakpoints.push({ timestamp: currentElement.dataset.timestamp, start, end, id })
    }
  }
  breakpointObject = {
    breakpointVideoKey: vidKey,
    breakpoints: updatedBreakpoints
  }
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
    if ((progressObject[courseID][vidKey].progress / progressObject[courseID][vidKey].duration) > beginningThreshold) {
      currentVideoJSPlayer.currentTime(progressObject[courseID][vidKey].progress)
    }
  }
  checkVidStatus()
  myCoolInterval = setInterval(checkVidStatus, 5000)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
