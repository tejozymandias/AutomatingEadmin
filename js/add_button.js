var button = document.createElement("button")

button.innerText = "This is the inserted button, click on me!"
button['id'] = 'inserted'
button['data-name'] = 'name1'
button.onclick = function() {
    alert('clicked!')
}

document.body.appendChild(button)