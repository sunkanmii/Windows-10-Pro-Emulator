function allowDrop(ev) {
    ev.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.style.backgroundColor = "goldenrod";
    event.target.appendChild(document.getElementById(data));
}

function drag(event) {
    ev.dataTransfer.setData("text", ev.target.id);
}