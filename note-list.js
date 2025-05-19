const JSON_PATH = "data/notes.json"
const typeList = ["操作系统开发","服务器搭建","网络搭建","网络安全","小说"]

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('type'));
const warnDisBox = document.querySelector(".warn-dis")

if(id != 3){
    warnDisBox.classList.add("warn-dis-displayNone")
}

const noteType = typeList[id] + "的笔记"
document.getElementsByTagName("title")[0].innerHTML = noteType
document.querySelector(".notetype-title").innerHTML = noteType

function getData() {

    dataList = new Array()

    return fetch(JSON_PATH)
    .then(response => response.json())
    .then(data => {
        data = data.reverse()
        for(i in data) {
            if(data[i].type == id) {
                dataList.push(data[i])
            }
        } 
        return dataList
    })
    .catch(err => {
        console.log("something wrong:", err)
        return []
    })
}

getData().then(data => {

    const notetype_content = document.querySelector(".notetype-content")

    for(let i = 0;i < data.length;i++) {

        const json_data = data[i]

        const noteBox = document.createElement("div")
        noteBox.classList.add("notetype-notebox")

        const noteDate = document.createElement("p")
        noteDate.classList.add("note-date")
        noteDate.innerHTML = data[i].updateDate

        const noteTitle = document.createElement("p")
        noteTitle.classList.add("note-title")
        noteTitle.innerHTML = data[i].title

        noteBox.appendChild(noteDate)
        noteBox.appendChild(noteTitle)

        noteBox.addEventListener("click",function() {
            console.log("clicked")
            sessionStorage.setItem("selectedNote", JSON.stringify(json_data))
            window.location.href = "data-show.html"
        })

        notetype_content.appendChild(noteBox)
    }
})