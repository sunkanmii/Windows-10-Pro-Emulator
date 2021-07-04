const main = document.querySelector("main");
const createNew = document.querySelector(".view-options-list");

main.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    let viewOptionHeader = document.querySelector('.options');
    viewOptionHeader.style.display = "flex";
    viewOptionHeader.style.left = `${(event.pageX - 10) / 16}rem`;
    viewOptionHeader.style.top = `${(event.pageY - 10) / 16}rem`;
}, false);

main.addEventListener("click", (event) => {
    let viewOptionHeader = document.querySelector('.options');
    viewOptionHeader.style.display = "";
    viewOptionHeader.style.left = "";
    viewOptionHeader.style.top = "";
}, false);

createNew.addEventListener('click', (event) => {
    let createNewFile = document.querySelector('.view-options-sublist');
    
    if(createNewFile.hasAttribute('style')){
        createNewFile.removeAttribute('style');
    } else{
        createNewFile.setAttribute('style', 'display: flex;');; 
    }
}, false)

function createTextfile(){
    let appHeader = document.querySelector('.expand-apps');
    let fileNum = appHeader.children.length > 5 ? appHeader.children.length - 4 : 1;
    let div = document.createElement('div');
    div.setAttribute('draggable', 'true');

    let anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-to-page taskbar-hover');
    
    let img = document.createElement("img");
    img.setAttribute('src', './imgs/file.svg');
    img.setAttribute('alt', 'file');
    anchor.appendChild(img);

    let paragraph = document.createElement("p");
    let fileName = document.createTextNode(`New File${fileNum}`);
    paragraph.appendChild(fileName);

    anchor.appendChild(paragraph);
    div.appendChild(anchor);
    appHeader.appendChild(div);
}

function checkInput() {

}

function getCurrentDate() {
    let today = new Date();
    let date = `${(today.getMonth() + 1)}/${today.getDate()}/${today.getFullYear()}`;
    let hours = today.getHours();
    let fullMinutes = today.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    fullMinutes = fullMinutes < 10 ? `0${fullMinutes}` : fullMinutes;
    let time = `${hours}:${fullMinutes} ${ampm}`;
    let machineDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    let machineTime = `${today.getHours()}:${fullMinutes}`;
    let dateTime = {
        timeTag: {date, time},
        machineReadableDate: {machineDate, machineTime}
    };
    return dateTime;
}
function addDateToDOM(){
    let currentTimeTag = document.querySelector("#hours-minutes");
    let currentDate = document.querySelector("#current-date");
    let {timeTag, machineReadableDate} = getCurrentDate();
    currentTimeTag.textContent = timeTag.time;
    currentTimeTag.setAttribute("datetime", machineReadableDate.machineTime);
    
    currentDate.textContent = timeTag.date;
    currentDate.setAttribute("datetime", machineReadableDate.machineDate);
}
addDateToDOM();
let toExactMinute = 60000 - (new Date().getTime() % 60000);
setTimeout(function() {
    setInterval(addDateToDOM, 60000);
    addDateToDOM();
}, toExactMinute);
