const note = JSON.parse(sessionStorage.getItem("selectedNote"));
console.log(note)
if (note) {
  document.querySelector(".note-title").innerHTML = note.title
  document.querySelector(".note-content").innerHTML = note.content
  document.querySelector(".note-date").innerHTML = note.updateDate + note.specificTtime
}