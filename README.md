# hevodata-mallinath
This is a task given by Hevo Data to create a pinterest clone


#Summery
This page layout design is made keeping the pinterest website as a reference.
I am using the Bootstrap framework for this project. When I decided to create a layout like pinterest I needed to create a responsive menu layout with search bar etc the bootstrap would be perfect for this kind of requirement. Assuming that this can be further implemented and we can create other pages with any kind of responsive layouts.
I have used the term 'card' for pin's box. I have used the colors blue, black and white.
I am using the online image path for predefined cards to save the time of choosing images and optimising them.


#Instructions
In this folder index.html is the main file you have to run.
Make sure you are online while running this project because card images and javascript files are loading from the internet.
For each card I have added the title, save and close buttons. These buttons are visible only when you hover your mouse on cards. Here the save button is not functional.
If you want to add new cards please click on the "+" button placed at the top right corner then enter the image path and title for the card after submitting the card will be visible at the top of the cards list.

#updates
As per latest instructions I have removed the nonfunctional parts from design and added the database for storing the cards.
  - It will fetch cards from the database and also stores new files in the database.  - Checks for the duplicates using the title of cards while adding a new card and shows error messages.
  - When you delete the card it will also update in the database
  - Multi-user functionality added please test it by changing the user in javascript file.
  - I have used JSON as a database and it is present with this file.

Note: you have to run this file in server to test it's functionality.