console.log("this is index.js");

//TO do's
// 1 Store all the data to the local storage
// 2 Give another column as an option to delete the book
// 3. Addd a scrrolbar to the view


//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;

}

//Display constructor
function Display() {


}

//Add method to display prtottype
Display.prototype.add = function (book) {
    console.log('adding to ui');
    tableBody = document.getElementById('tableBody');
    console.log(tableBody);
    let uiString = `<tr>
                   <td>${book.name}</td>
                   <td>${book.author}</td>
                   <td>${book.type}</td>
                   </tr>`;
     tableBody.innerHTML += uiString;   
    // tableBody.innerHTML = tableBodyinnerHTML  + uiString ;
               

}
//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implementing the validate function
Display.prototype.validate = function (book) {
    if(book.name.length<2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
   
}

Display.prototype.show = function (type,displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong>    ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

                        setTimeout(function(){
                            message.innerHTML = '';
                        }, 2000);



}






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



    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success',`Your book has been successfully added`);
    }
    else{
        //Show error to the user
        display.show('danger',`soory you cannot add this book`);
    }

    e.preventDefault();
}
