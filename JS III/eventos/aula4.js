function show() {
    let lista = document.getElementById('contact-list')
    console.log(lista)
}

const listElements = document.getElementsByTagName('li')
console.log(listElements)

const contactInputs = document.getElementsByClassName('contact-input')
console.log(contactInputs)

const elementoName = document.getElementsByName ('contact1')
console.log(elementoName)

const contacts = document.querySelectorAll('#contact-list > li > label')
console.log(contacts)

const queryContato = document.querySelector('#contact-list > li > label')