const note = JSON.parse(sessionStorage.getItem("selectedNote"));
if (note) {
  document.querySelector(".note-title").innerHTML = note.title
  document.querySelector(".note-content").innerHTML = note.content
  document.querySelector(".note-date").innerHTML = note.updateDate + note.specificTime
}

window.addEventListener("unload", () => {
    localStorage.removeItem("noteneedtoshow");
  });