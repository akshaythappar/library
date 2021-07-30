console.log('This is ES6 version of Project2');

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;

    }
}

class Display {
    add(book) {
        console.log('adding to ui');
        let tableBody;
        tableBody = document.getElementById('tableBody');
        console.log(tableBody);
        let uiString = `<tr>
                       <td>${book.name}</td>
                       <td>${book.author}</td>
                       <td>${book.type}</td>
                       </tr>`;
        // tableBody.innerHTML += uiString;
        // tableBody.innerHTML = tableBodyinnerHTML  + uiString ;





        let notes = localStorage.getItem("notes");
        let notesObj;
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        let html = "";
        notesObj.forEach(function (element, index) {
            html = html + `    <tr class='tr'>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
           <td> <button id=" ${index}"onclick = "deleteNode(this.id)" class="btn btn-primary">Delete </button><td>
          </tr> `
            console.log(`This is object ${index}`);
            


        });
        tableBody = document.getElementById("tableBody");
        console.log(tableBody);
        if (notesObj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            // tableBody.innerText = `Nothing to show! Use "Add a Book" section above to add Book.`
        let table = document.getElementById('table');
            table.innerHTML = `Nothing to show! Use "Add a Book" section above to add Book.`
        }
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }

    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong>    ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);



    }

}
book = new Book();
d1 = new Display();
d1.add(book);

//Add submit event listner to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log(e);
    console.log('You have submitted the library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    // let type = document.getElementById('').value;
    let type;
    // fiction,programming,cooking
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }

    else if (programming.checked) {
        type = programming.value;
    }

    else if (cooking.checked) {
        type = cooking.value;
    }



    // let book = new Book(name, author, type);
    // console.log(book);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let book = new Book(name, author, type);

    notesObj.push(book);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // addTxt.value = "";
    // addTitle.value = "";
    console.log(notesObj);
    // showNotes();

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        // showNotes();
        display.clear();
        display.show('success', `Your book has been successfully added`);
    }
    else {
        //Show error to the user
        display.show('danger', `soory you cannot add this book`);
    }

    e.preventDefault();
}

// let b = document.getElementById('btn');
// b.addEventListener('click',btn);
//  function btn() {
//     console.log('btn is clicked');
// }

//Function to delete a node
function deleteNode(index) {
    console.log("i am deleting node", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    // showNotes();
    book = new Book();
d1 = new Display();
d1.add(book);
}


let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();
    console.log('input event fired!',inputVal);
    // let noteCards = document.getElementsByClassName("noteCard");
    let tr = document.getElementsByClassName("tr");
    console.log(tr);
    Array.from(tr).forEach(function(element){
        let cardTxt = element.getElementsByTagName("td")[0].innerText;
        let cardTxt1 = element.getElementsByTagName("td")[1].innerText;
        let cardTxt2 = element.getElementsByTagName("td")[2].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal)||cardTxt1.includes(inputVal)||cardTxt2.includes(inputVal)){
            element.style.display = 'block';
            console.log('yes');
        }
        else{
            element.style.display = 'none';
            console.log('no')
        }
        // console.log(cardTxt);

        })
})

