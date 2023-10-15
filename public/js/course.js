let currentVideoJSPlayer = null;
document.addEventListener('DOMContentLoaded', () => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const headerEl = document.getElementById("header");
  const containerHeight = vh - headerEl.clientHeight;
  const courseContainer = document.getElementById("course-container");
  courseContainer.style.height = `${containerHeight}px`;
  setCourseContentContainer(containerHeight)
  setVideoMenuListeners()
})

function setCourseContentContainer(containerHeight) {
  const nameRowEl = document.getElementById("course-name-row");
  const targetHeight = containerHeight - nameRowEl.clientHeight;
  const courseContentContainer = document.getElementById("course-content-container");
  courseContentContainer.style.height = `${targetHeight}px`;
}
function clearVidContent() {
  if (currentVideoJSPlayer) {
    currentVideoJSPlayer.dispose();
  }
  document.getElementById("video-container").innerHTML = ""
}
function setVideoMenuListeners() {
  const elements = document.querySelectorAll(".styled-video-menu");
  elements.forEach(element => {
    element.addEventListener("click", (e) => {
      clearVidContent()
      const id = e.target.id;
      const vidKey = id.split("video-menu-")[1];
      const bucket = e.target.getAttribute("video-bucket");
      document.getElementById("vid-helper-text").classList.add("hide")
      document.getElementById("loading").classList.remove("hide")
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
    document.getElementById("loading").classList.add("hide")
  })
}

function injectVideoUrl(videoUrl) {
  const vidContainer = document.getElementById("video-container");
  vidContainer.classList.remove("hide")
  const a = document.createElement("video")
  a.setAttribute("id", "active-video")
  a.classList.add("video-js")

  const b = document.createElement("source")
  b.setAttribute("src", videoUrl)
  a.appendChild(b)
  vidContainer.appendChild(a)
  currentVideoJSPlayer = videojs('active-video', {
    controls: true,
    autoplay: false,
    preload: 'auto',
    aspectRatio: '16:9',
  })
  console.log("down here", videojs.players)
}

