const JSON_PATH = "data/notes.json"
const typeList = ["操作系统开发","服务器搭建","网络搭建","网络安全","小说"]

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('type'));

const noteType = typeList[id] + "的笔记"
document.getElementsByTagName("title")[0].innerHTML = noteType
document.querySelector(".notetype-title").innerHTML = noteType

dataList = new Array()

fetch(JSON_PATH)
    .then(response => response.json())
    .then(data => {
        for(i in data) {
            if(data[i].type == id) {
                dataList.push(data[i].title,data[i].updateDate)
            }
        }
    })
.catch(err => {
    console.log("something wrong:", err)
})

console.log(dataList)