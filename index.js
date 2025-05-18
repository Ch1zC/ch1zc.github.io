const JSON_PATH = "data/notes.json"

function getValueRang(start, end) {

    dataList = new Array()

    return fetch(JSON_PATH)
        .then(response => response.json())
        .then(data => {
            const data_re = data.reverse()
            return top3 = data_re.slice(start, end);
        })
    .catch(err => {
        console.log("something wrong:", err)
        return []
    })
}

function shownote_recentlyUpdated() {

    const srcList = ["img/icon-pc.svg","pic-serverSetup.png","pic-networkSetup.png",
        "img/pic-Cybersecurity.png","img/pic-writing.png"]
    const typeList = ["操作系统开发","服务器搭建","网络搭建","网络安全","小说"]

    getValueRang(0, 3).then(datalist => {
        
        for(i in datalist) {
            const data = datalist[i]
            const type  = data["type"]
            const title = data["title"]
            const update_date = data["updateDate"]

            const showarea = document.querySelector('.recent-updates-showarea')

            //big box, include every div following
            const bigDiv = document.createElement("div");
            bigDiv.classList.add("recent-updates-contentbox")

            //logo box
            const logoBox = document.createElement("div")
            logoBox.classList.add("contentbox-imgbox")

            //img inside the logo box
            const img = document.createElement("img")
            img.src = srcList[type]

            //text: data type
            const text_data_type = document.createElement("p")
            text_data_type.classList.add("contentbox-notetype")
            text_data_type.classList.add("text-second-color")
            text_data_type.innerHTML = typeList[type]

            //a: href
            const a_href = document.createElement("a")
            a_href.href = "data-show.html"

            //text: data title. inside the a
            const text_data_title = document.createElement("h1")
            text_data_title.classList.add("text-main-color")
            text_data_title.innerHTML = title

            //text: update date
            const text_data_update_date = document.createElement("p")
            text_data_update_date.classList.add("text-main-color")
            text_data_update_date.classList.add("contentbox-updatedate")
            text_data_update_date.innerHTML = update_date

            text_data_title.addEventListener("click",function() {
                console.log("clicked")
                sessionStorage.setItem("selectedNote", JSON.stringify(data))
            })

            logoBox.appendChild(img)
            a_href.appendChild(text_data_title)

            bigDiv.appendChild(logoBox)
            bigDiv.appendChild(text_data_type)
            bigDiv.appendChild(a_href)
            bigDiv.appendChild(text_data_update_date)

            showarea.appendChild(bigDiv)
        } 
    });


}

shownote_recentlyUpdated()