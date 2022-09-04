/*Make create pop up appear*/

const addButton = document.querySelector(".addbook");
addButton.addEventListener("click", (e) => {
  const cancelLayer = document.querySelector(".cancel-layer");
  cancelLayer.setAttribute("style", "display:flex");
});

/* Remove popup when click outside of it */
const cancelLayer = document.querySelector(".cancel-layer");

cancelLayer.addEventListener("click", cancelPopUp, false);

function cancelPopUp(e) {
  if (e.target === cancelLayer) {
    const create_popup = e.target.children[0];
    create_popup.querySelector('input[id="title"]').value = "";
    create_popup.querySelector('input[id="author"]').value = "";
    create_popup.querySelector('input[id="pages"]').value = "";
    create_popup.querySelector('input[id="yes"]').checked = false;
    create_popup.querySelector('input[id="no"]').checked = false;
    create_popup.querySelector('input[id="still-reading"]').checked = false;
    create_popup.querySelector('input[id="file"]').files[0] = "";

    e.target.setAttribute("style", "display:none");
  }
}

/* Remove popup when click cancel button */
const cancelButton = document.querySelector(".create-popup #cancel");
cancelButton.addEventListener("click", cancelPopUpWithButton, false);

function cancelPopUpWithButton(e) {
  const create_popup = e.target.parentElement;

  create_popup.querySelector('input[id="title"]').value = "";
  create_popup.querySelector('input[id="author"]').value = "";
  create_popup.querySelector('input[id="pages"]').value = "";
  create_popup.querySelector('input[id="yes"]').checked = false;
  create_popup.querySelector('input[id="no"]').checked = false;
  create_popup.querySelector('input[id="still-reading"]').checked = false;
  create_popup.querySelector('input[id="file"]').files[0] = "";

  create_popup.parentElement.setAttribute("style", "display:none");
}

/* Delete Pop Up Object and Functionality */

const deletemodal = {
  deletePopUp: document.querySelector(".delete-popup"),
  bookentry: null,
  showPopUp: function (book) {
    this.bookentry = book;
    this.cancelLayer.setAttribute("style", "display:flex");
  },
  cancelDelete: function () {
    this.bookentry = null;
    this.cancelLayer.setAttribute("style", "display:none");
  },
  removeBookEntry: function () {
    this.bookentry.element.parentElement.remove();
    booklist.splice(booklist.indexOf(this.bookentry));
    this.bookentry = null;
  },
};

deletemodal.cancelLayer = deletemodal.deletePopUp.parentElement;
deletemodal.yesButton = deletemodal.deletePopUp.querySelector("#yes");
deletemodal.noButton = deletemodal.deletePopUp.querySelector("#no");

deletemodal.noButton.addEventListener(
  "click",
  function (e) {
    e.stopPropagation();
    deletemodal.cancelDelete();
  },
  false
);

deletemodal.cancelLayer.addEventListener(
  "click",
  function (e) {
    if (e.target === deletemodal.cancelLayer) {
      deletemodal.cancelDelete();
    }
  },
  false
);

deletemodal.yesButton.addEventListener(
  "click",
  function (e) {
    e.stopPropagation();
    if (!this.bookentry) {
      deletemodal.removeBookEntry();
      deletemodal.cancelDelete();
    }
  },
  false
);

/* Book Constructor */
function Book(title, author, pages, read, file) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.file = file || "/Assets/bookimage.jpg";
  this.element = renderBookCard(this);
}

/* Add Book Entry Functionality*/

const booklist = [];

const createButton = document.querySelector("#create");
createButton.addEventListener("click", createBookEntry, false);

function createBookEntry() {
  const createPopup = document.querySelector(".create-popup");
  const title = createPopup.querySelector('input[id="title"]').value;
  const author = createPopup.querySelector('input[id="author"]').value;
  const pages = createPopup.querySelector('input[id="pages"]').value;
  const read = createPopup.querySelector('input[name="read"]').value;
  const file = createPopup.querySelector('input[id="file"]').files[0];

  const book = new Book(title, author, pages, read, file);
  booklist.push(book);

  createPopup.querySelector('input[id="title"]').value = "";
  createPopup.querySelector('input[id="author"]').value = "";
  createPopup.querySelector('input[id="pages"]').value = "";
  createPopup.querySelector('input[id="yes"]').checked = false;
  createPopup.querySelector('input[id="no"]').checked = false;
  createPopup.querySelector('input[id="still-reading"]').checked = false;
  createPopup.querySelector('input[id="file"]').files[0] = "";

  createPopup.parentElement.setAttribute("style", "display:none");
}

/* Create book card and render it */

function renderBookCard(book) {
  const bookcard = document.createElement("div");
  bookcard.className = "bookcard";

  const deletebutton = document.createElement("button");
  Object.assign(deletebutton, {
    id: "delete",
    type: "button",
    textContent: "x",
  });
  deletebutton.addEventListener("click", (e) => deletemodal.showPopUp(book));
  bookcard.appendChild(deletebutton);

  const img_container = document.createElement("div");
  Object.assign(img_container, {
    className: "img-container",
  });
  bookcard.appendChild(img_container);

  const img = document.createElement("img");
  img_container.appendChild(img);

  const info = document.createElement("div");
  Object.assign(info, {
    className: "info",
  });
  bookcard.appendChild(info);

  const p1 = document.createElement("p");
  info.appendChild(p1);

  const s1 = document.createElement("span");
  Object.assign(s1, {
    className: "title",
    textContent: book.title,
  });
  p1.appendChild(s1);

  const p2 = document.createElement("p");
  info.appendChild(p2);

  const s2 = document.createElement("span");
  Object.assign(s2, {
    className: "author",
    textContent: book.author,
  });
  p2.appendChild(s2);

  const p3 = document.createElement("p");
  info.appendChild(p3);

  const s3 = document.createElement("span");
  Object.assign(s3, {
    className: "pages",
    textContent: book.pages + " pages",
  });
  p3.appendChild(s3);

  const read_section = document.createElement("div");
  Object.assign(read_section, {
    className: "read-section",
  });
  info.appendChild(read_section);

  const p4 = document.createElement("p");
  read_section.appendChild(p4);

  const s4 = document.createElement("span");
  Object.assign(s4, {
    className: "read",
    textContent: book.read,
  });
  p4.appendChild(s4);

  const changebutton = document.createElement("button");
  Object.assign(changebutton, {
    id: "read",
    type: "button",
    textContent: "Change",
  });
  changebutton.addEventListener('click', ()=>changeReadStatus(book), false)
  read_section.appendChild(changebutton);

  const editbutton = document.createElement("span");
  Object.assign(editbutton, {
    className: "edit",
    textContent:'Edit'
  });
  bookcard.appendChild(editbutton);

  const gridcontainer = document.querySelector(".gridcontainer");
  const bookcard_container = document.createElement("div");
  bookcard_container.className = "bookcard-container";
  bookcard_container.appendChild(bookcard);
  gridcontainer.appendChild(bookcard_container);

  return bookcard;
}

/* Change Read Status Functionality */

function changeReadStatus(book) {
  const text = book.element.querySelector(".read");
  let status = book.read;

  switch (status) {
    case "Read":
      book.read = "Not Read";
      text.textContent = book.read;
      break;
    case "Not Read":
      book.read = "Reading Now";
      text.textContent = book.read;
      break;
    case "Reading Now":
      book.read = "Read";
      text.textContent = book.read;
      break;
    default:
      break;
  }
}

/* Validation Constraint Functionality */
