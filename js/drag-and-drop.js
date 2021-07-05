function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = document.getElementById(event.dataTransfer.getData("text"));
    data.parentNode.removeChild(data);
}