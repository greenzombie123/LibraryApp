/*Make create pop up appear*/

const addButton = document.querySelector(".addbook");

addButton.addEventListener("click", openCreatePopUp, false);

function openCreatePopUp() {
  const cancelLayer = document.querySelector(".cancel-layer");
  cancelLayer.setAttribute("style", "display:flex");
}

// New Remove Popup Functionality

const cancelLayer = document.querySelector(".cancel-layer");
const cancelButton = document.querySelector(".create-popup #cancel");

cancelLayer.addEventListener("click", removePopUp, false);
cancelButton.addEventListener("click", removePopUp, false);

function removePopUp(e) {
  if (
    e.target.matches(".cancel-layer") ||
    e.target.matches(".create-popup #cancel")
  ) {
    const createPopup = document.querySelector(".create-popup");
    const cancelLayer = createPopup.parentElement;

    createPopup.querySelector('input[id="title"]').value = "";
    createPopup.querySelector('input[id="author"]').value = "";
    createPopup.querySelector('input[id="pages"]').value = "";
    createPopup.querySelector('input[id="yes"]').checked = false;
    createPopup.querySelector('input[id="no"]').checked = false;
    createPopup.querySelector('input[id="still-reading"]').checked = false;
    createPopup.querySelector('input[id="file"]').value = "";

    cancelLayer.setAttribute("style", "display:none");
    setButton.changeButtonToCreate();
    CustomValidation.resetValidation();
  }
}

// Change Popup Button from Create to Edit and vice versa

function SetButton() {
  this.button = document.querySelector("#create");
  this.isEditOn = false;

  this.changeButtonToEdit = function () {
    if (!this.isEditOn) {
      this.button.removeEventListener("click", createBookEntry, false);
      this.button.addEventListener("click", edit.editBookCard, false);
      this.button.textContent = "Edit";
      this.isEditOn = true;
    }
  };

  this.changeButtonToCreate = function () {
    if (this.isEditOn) {
      this.button.removeEventListener("click", edit.editBookCard, false);
      this.button.addEventListener("click", createBookEntry, false);
      this.button.textContent = "Create";
      this.isEditOn = false;
    }
  };
}

const setButton = new SetButton();

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
  this.file = file;
  this.element = renderBookCard(this);
}

/* Add Book Entry Functionality*/

const booklist = [];

const createButton = document.querySelector("#create");
createButton.addEventListener("click", createBookEntry, false);

function createBookEntry() {
  if (!CustomValidation.checkValidation()) {
    return;
  }

  const createPopup = document.querySelector(".create-popup");
  const title = createPopup.querySelector('input[id="title"]').value;
  const author = createPopup.querySelector('input[id="author"]').value;
  const pages = createPopup.querySelector('input[id="pages"]').value;
  const read = createPopup.querySelector("input:checked")
    ? createPopup.querySelector("input:checked").value
    : "Not Read";
  const file = createPopup.querySelector('input[id="file"]').files[0];

  const book = new Book(title, author, pages, read, file);
  booklist.push(book);

  createPopup.querySelector('input[id="title"]').value = "";
  createPopup.querySelector('input[id="author"]').value = "";
  createPopup.querySelector('input[id="pages"]').value = "";
  createPopup.querySelector('input[id="yes"]').checked = false;
  createPopup.querySelector('input[id="no"]').checked = false;
  createPopup.querySelector('input[id="still-reading"]').checked = false;
  createPopup.querySelector('input[id="file"]').value = "";

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
  if (!book.file) {
    img.src = "Assets/bookimage.jpg";
  } else {
    img.src = URL.createObjectURL(book.file);
    img.onload = () => URL.revokeObjectURL(this.src);
  }

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
  changebutton.addEventListener("click", () => changeReadStatus(book), false);
  read_section.appendChild(changebutton);

  const editbutton = document.createElement("span");
  Object.assign(editbutton, {
    className: "edit",
    textContent: "Edit",
  });
  editbutton.addEventListener("click", () => edit.openPopup(book), false);
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

// Edit Constructor and Functionality

function Edit() {
  let bookitem = null;

  const createPopup = document.querySelector(".create-popup");
  const cancelLayer = document.querySelector(".cancel-layer");
  const title = createPopup.querySelector('input[id="title"]');
  const author = createPopup.querySelector('input[id="author"]');
  const pages = createPopup.querySelector('input[id="pages"]');
  const readbuttons = createPopup.querySelectorAll('input[name="read"]');
  const file = createPopup.querySelector('input[id="file"]');

  this.openPopup = (book) => {
    bookitem = book;

    cancelLayer.setAttribute("style", "display:flex");

    title.value = bookitem.title;
    author.value = bookitem.author;
    pages.value = bookitem.pages;

    //Adding File Object to File Input if file property of Book object has a File Object
    if (bookitem.file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(bookitem.file);
      file.files = dataTransfer.files;
    }

    switch (bookitem.read) {
      case "Read":
        readbuttons[0].checked = true;
        break;
      case "Not Read":
        readbuttons[1].checked = true;
        break;
      case "Reading Now":
        readbuttons[2].checked = true;
        break;

      default:
        break;
    }

    setButton.changeButtonToEdit();
  };

  this.editBookCard = () => {
    if (!CustomValidation.checkValidation()) {
      return;
    }
    bookitem.title = title.value;
    bookitem.author = author.value;
    bookitem.pages = pages.value;
    bookitem.read = createPopup.querySelector("input:checked").value;
    bookitem.file = file.files[0];

    bookitem.element.querySelector(".title").textContent = bookitem.title;
    bookitem.element.querySelector(".author").textContent = bookitem.author;
    bookitem.element.querySelector(".pages").textContent =
      bookitem.pages + `${bookitem.pages > 1 ? " pages" : " page"}`;
    bookitem.element.querySelector(".read").textContent = bookitem.read;
    const img = bookitem.element.querySelector("img");
    if (!bookitem.file) {
      img.src = "Assets/bookimage.jpg";
    } else {
      img.src = URL.createObjectURL(bookitem.file);
      img.onload = () => URL.revokeObjectURL(this.src);
    }

    cancelLayer.setAttribute("style", "display:none");

    title.value = "";
    author.value = "";
    pages.value = "";
    readbuttons.forEach((button) => (button.checked = false));
    file.value = "";

    setButton.changeButtonToCreate();
  };
}

const edit = new Edit();

/* Validation Constraint Functionality */

function customValidation() {
  const inputs = [];
  const createPopup = document.querySelector(".create-popup");
  inputs.push(createPopup.querySelector('input[id="title"]'));
  inputs.push(createPopup.querySelector('input[id="author"]'));
  inputs.push(createPopup.querySelector('input[id="pages"]'));

  this.checkValidation = function () {
    let IsEmpty = false;
    for (let i = 0; i < inputs.length; i++) {
      const span = inputs[i].previousElementSibling;
      if (inputs[i].getAttribute("type") === "number" && inputs[i].value.startsWith('0') || inputs[i].getAttribute("type") === "number" && inputs[i].value.includes('.')) {
        IsEmpty = true;
        reportMissingValue(span);
        continue;
      }
      if (inputs[i].validity.valueMissing) {
        IsEmpty = true;
        reportMissingValue(span);
      } else clearReport(span);
    }
    if (IsEmpty) {
      return false;
    } else return true;
  };

  this.resetValidation = function () {
    clearReports();
  };

  function clearReports() {
    const spans = createPopup.querySelectorAll('span[class^="val-"]');
    spans.forEach((span) => span.classList.add("hidden"));
  }

  function clearReport(span) {
    span.classList.add("hidden");
  }

  function reportMissingValue(span) {
    span.classList.remove("hidden");
  }
}

const CustomValidation = new customValidation();

// const entries = [];
// for (let index = 0; index < 20; index++) {
//   entries.push(new Book('My Grandmother Asked Me to Tell You She’s Sorry', 'author', 12, "Read"))
// }

const firstBook = new Book('A Title To Beat All Titles', 'Mr. Author', 192, "Read")