async function getNoteById(id) {
  return fetch("data/notes.json")
    .then(response => response.json())
    .then(data => {
        data = data.reverse()
        const note = data.find(item => item.id == id);
        return !note ? data.find(item => item.id == -1) : note;
    })
    .catch(err => {
        console.log("cant find it:", err)
        return {
            "updateDate": "2025年5月26日",
            "specificTtime": "18点01分",
            "title": "WRONG",
            "content": "SOMETHING WRONG its the only thing we know."
          } 
    })
}

async function init() {
  const browser_saved_data = sessionStorage.getItem("selectedNote")
  let note

  if (browser_saved_data !== null) {

    note = JSON.parse(browser_saved_data);
    sessionStorage.removeItem("selectedNote");

  } else {
  
    const urlParams = new URLSearchParams(window.location.search);
    const dataID = Number(urlParams.get('id'))
    
    note = await getNoteById(dataID)
  }

  const title = note.title
  const content = note.content
  const date = note.updateDate + " " + note.specificTtime
  
  document.querySelector(".note-title").innerHTML = title
  document.querySelector(".note-content").innerHTML = content
  document.querySelector(".note-date").innerHTML = date
}

init()