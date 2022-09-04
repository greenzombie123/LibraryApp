# CSS

Window Layout

# General Plan

In this app, you can record information about books you read. You can store information such as the title, author, and page number of books and also whether you read them or not. Book entry will be presented as a card. You can delete cards by clicking on their X buttons, edit their content by pressing the edit button and change the 'read' status. There is a button in the bottom of the screen where if pressed a form will appear where you can create a book entry and when finished press the Finished button to create a card in the app. A similar form will appear if you press the edit button. 

- A button that makes form appear
- Gather title, author, pages, and read status on the form
- User can attach picture to card.
- If a picture is not upload, a preloaded picture will be used
- Click outside of form to make it disappear
- Click Finished button that takes user input and makes a book object
- After book object is created, it is used to create and render a card
- Each card has a X button where if pressed brings up the delete popup.
- If yes button is pressed on the delete popup, card is deleted. If no button is pressed or if user clicks outside of popup, popup disappears.
- Each card has a edit button where if pressed, a form appears. All forms have the book objects info prewritten on them.
- Each card has a change read status button wher if presses it changs to the next read status. There are three red statuses. 
- If user clicks outside of edit form, it disappears
- If finishhed button is pressed, card hhas its content changed.

## Psuedo Code

- ~~A button that makes form appear~~
    - Call openCreatePopup
        - Make Create Popup appear
- ~~Gather title, author, pages, and read status on the form~~
    - Create form and label for each thing
- ~~User can attach picture to card.~~
    - Create a form and label
- If a picture is not upload, a preloaded picture will be used
    - Call uploadPicture
        - Pass book object to function
        - Check its picture property
        - If null, attach a preloaded picture
        - If there is a file, load it up
- Click outside of form to make it disappear
    - Make a div as big as the viewport with the popup in the middle
    - Add event handler
    - When div is clicked, call hideCreatePop function
- Click Finished button that takes user input and makes a book object
    - Get values from all form
    - Call createBookEntry and pass values to it
    - Create book object
    - Call renderBookCard in constructor
        - Creat card div
        - create elements and add classes to them
        - Return and assign object to property
        - Append div to main element
        - Set eventhandler for clicks 
    - Create and inherit handleevent function
    - Create and inherit edit info, change read, and delete book entry function
- Each card has a X button where if pressed brings up the delete popup.
    - Call delete book entry function
        - Show delete popup message
        - if user presses yes, delete card and book object
        - if no or click outside popup (viewport-wide viewport), hide popup
- Each card has a edit button where if pressed, a form appears. All forms have the book objects info prewritten on them.
    - Call edit book entry function
        - Show popup message.
        - Assign data from object to form's values.
        - if user clicks outside of popup, hide popup
        - When pressed button, call makeChange function
            - Assign values to appropriate elements in card
- Each card has a change read status button wher if presses it changs to the next read status. There are three red statuses. 
- If user clicks outside of edit form, it disappears
- If finishhed button is pressed, card hhas its content changed.

openCreatePopUp

createBookEntry

addBookEntry

editBookEntry

openDeletePopUp

deleteBookEntry

removeBookEntry
 