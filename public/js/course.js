let currentVideoJSPlayer = null;

let headerEl = null;
let courseContainer = null;
let nameRowEl = null;
let courseContentContainer = null;
let videoContainer = null;
let videoMenuElements = null;
let vidHelperText = null;
let loadingElement = null

let viewHeight = 0;

function init() {
  headerEl = document.getElementById("header");
  courseContainer = document.getElementById("course-container");
  nameRowEl = document.getElementById("course-name-row")
  courseContentContainer = document.getElementById("course-content-container");
  videoContainer = document.getElementById("video-container");
  videoMenuElements = document.querySelectorAll(".styled-video-menu");
  vidHelperText = document.getElementById("vid-helper-text");
  loadingElement = document.getElementById("loading")
  viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const containerHeight = viewHeight - headerEl.clientHeight;
  courseContainer.style.height = `${containerHeight}px`;

  setCourseContentContainer(containerHeight)
  setVideoMenuListeners()
}


function setCourseContentContainer(containerHeight) {
  const targetHeight = containerHeight - nameRowEl.clientHeight;
  courseContentContainer.style.height = `${targetHeight}px`;
}

function clearVidContent() {
  if (currentVideoJSPlayer) {
    currentVideoJSPlayer.dispose();
  }
  videoContainer.innerHTML = ""
}
function setVideoMenuListeners() {

  videoMenuElements.forEach(element => {
    element.addEventListener("click", (e) => {
      clearVidContent()
      const id = e.target.id;
      const vidKey = id.split("video-menu-")[1];
      const bucket = e.target.getAttribute("video-bucket");
      vidHelperText.classList.add("hide")
      loadingElement.classList.remove("hide")
      getSignedVideoUrl(bucket, vidKey)
    })
  })
}

async function getSignedVideoUrl(bucket, key) {
  fetch(`/api/getSignedUrl/${bucket}/${key}`).then(async res => {
    res = await res.json()
    const { url: videoUrl } = res;
    injectVideoUrl(videoUrl)
  }).catch(err => {
    console.log("err", err)
  }).finally(() => {
    loading.classList.add("hide")
  })
}

function injectVideoUrl(videoUrl) {
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
    autoplay: false,
    preload: 'auto',
    aspectRatio: '16:9',
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
