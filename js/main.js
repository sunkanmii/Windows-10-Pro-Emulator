if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

const main = document.querySelector("main");
const createNew = document.querySelector(".view-options-list");

// right click to create new file
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
    let windowsMenu = document.querySelector(".open-windows-menu");
    if (windowsMenu.getAttribute("style") != null) {
        windowsMenu.removeAttribute("style");
    }
}, false);

createNew.addEventListener('click', (event) => {
    let createNewFile = document.querySelector('.view-options-sublist');

    if (createNewFile.hasAttribute('style')) {
        createNewFile.removeAttribute('style');
    } else {
        createNewFile.setAttribute('style', 'display: flex;');;
    }
}, false)

// Create new file function
function createTextfile() {
    let appHeader = document.querySelector('.expand-apps');
    let fileNum = appHeader.children.length > 5 ? appHeader.children.length - 4 : 1;
    let id = 0;
    let items = appHeader.children;
    let itemsArr = [...items];
    itemsArr.sort(function (a, b) {
        return a.getAttribute('id') == b.getAttribute('id') ?
            0 :
            (a.getAttribute('id') > b.getAttribute('id') ? 1 : -1);
    });

    for (let i = 0; i < itemsArr.length; i++) {
        if (itemsArr[i].getAttribute('id') != String(i + 1)) {
            id = i + 1;
            break;
        } else {
            id = itemsArr.length + 1;
            break;
        }
    }

    let div = document.createElement('div');
    div.setAttribute('draggable', 'true');
    div.setAttribute('ondragstart', 'drag(event)');
    div.setAttribute('id', id);
    div.addEventListener("dragstart", function (e) {
        drag(e);
    });
    div.addEventListener('dragend', function (e) {
        drag(e);
    }, false)

    let anchor = document.createElement('a');
    anchor.setAttribute('class', 'link-to-page');
    anchor.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })
    let img = document.createElement("img");
    img.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })
    img.setAttribute('src', './imgs/apps/file.svg');
    img.setAttribute('draggable', 'false');
    img.setAttribute('alt', 'file');
    anchor.appendChild(img);

    let paragraph = document.createElement("p");
    let fileName = document.createTextNode(`New File${fileNum}`);
    paragraph.appendChild(fileName);

    anchor.appendChild(paragraph);
    div.appendChild(anchor);
    appHeader.appendChild(div);
}

// Gets and returns current date
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
        timeTag: {
            date,
            time
        },
        machineReadableDate: {
            machineDate,
            machineTime
        }
    };
    return dateTime;
}

// Adds date to DOM
function addDateToDOM() {
    let currentTimeTag = document.querySelector("#hours-minutes");
    let currentDate = document.querySelector("#current-date");
    let {
        timeTag,
        machineReadableDate
    } = getCurrentDate();
    currentTimeTag.textContent = timeTag.time;
    currentTimeTag.setAttribute("datetime", machineReadableDate.machineTime);

    currentDate.textContent = timeTag.date;
    currentDate.setAttribute("datetime", machineReadableDate.machineDate);
}
addDateToDOM();
let toExactMinute = 60000 - (new Date().getTime() % 60000);
setTimeout(function () {
    setInterval(addDateToDOM, 60000);
    addDateToDOM();
}, toExactMinute);

// Opens Windows taskbar menu
function openMenu() {
    let windowsMenu = document.querySelector(".open-windows-menu");

    if (windowsMenu.getAttribute("style") == null) {
        windowsMenu.setAttribute('style', 'display: flex; transition: all 0.2s ease-in')
    } else {
        windowsMenu.removeAttribute("style");
    }
}

// Gets all apps on desktop and duplicates them on windows taskbar menu
function getAllApps() {
    let getAllApps = document.querySelectorAll('.expand-apps div');
    let nameOfApps = document.querySelectorAll('.expand-apps div p');
    let middlePanel = document.querySelector('.middle-panel');

    let lenOfApps = getAllApps.length;
    let sortedApps = [];
    let newSections = [];
    nameOfApps.forEach(element => {
        sortedApps.push(element.textContent[0]);
    });

    sortedApps.sort();
    let duplicates = [];
    let count = 0;
    for (let i = 0; i < lenOfApps; i++) {
        count = 0;
        for (let j = 0; j < lenOfApps; j++) {
            if (nameOfApps[j].textContent.charAt(0) == sortedApps[i]) {
                count++;
                let tempParent = nameOfApps[j].parentNode.cloneNode(true);
                tempParent.removeAttribute("class");
                newSections.push(tempParent);
            };
            if (j == lenOfApps - 1) {
                duplicates.push(count);
            }
        }
    }
    let lenSec = newSections.length;
    let indOfSec = 0;
    let indOfDupli = 0;
    while (indOfSec < lenSec - 1) {
        let article = document.createElement('article');
        article.setAttribute('class', 'menu-app-section');
        let paragraph = document.createElement('p');
        let text = '';
        let section = null;
        text = document.createTextNode(sortedApps[indOfDupli]);
        paragraph.appendChild(text);
        article.appendChild(paragraph);

        for (let i = 0; i < duplicates[indOfDupli]; i++) {
            section = document.createElement('section');
            section.setAttribute('class', 'app-container left-panel-hover');
            section.appendChild(newSections[indOfSec]);
            indOfSec++;
            article.appendChild(section);
            if (i == duplicates[indOfDupli] - 1) {
                indOfDupli++;
            }
        }
        middlePanel.appendChild(article);
    }

}

getAllApps();