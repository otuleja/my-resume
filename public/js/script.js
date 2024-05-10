console.log("here in script")
let navLinks = []
let loadingModal = null

function hideLoadingModal() {
  if (loadingModal) {
    loadingModal.style.display = "none"
  }
}

function showLoadingModal() {
  if (loadingModal) {
    loadingModal.style.display = "flex"
  }
}
document.addEventListener('DOMContentLoaded', function () {
  //makes sure that mobile menu works - "M" is a global object from materialize
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});

  loadingModal = document.getElementById('loading-modal');
  navLinks = document.querySelectorAll('#header a:not(.sidenav-trigger)');
  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', function (e) {
      showLoadingModal()
    })
  })
});