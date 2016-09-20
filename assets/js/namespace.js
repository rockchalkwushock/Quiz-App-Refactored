/*
  myLibrary will hold our Global variables (as objects) and make them
    only accessible bycalling myLibrary.property(variable).
  The argument says:
      myLibrary is myLibrary OR create a new object.
*/
var myLibrary = myLibrary || {};

/*
  By saying this the state ojbect now belongs to myLibrary.
  Should anyone else step in on my project and use var state it will not
    interfere with 'my' state object becuase it is only accessed by calling
    myLibrary.
*/

myLibrary.state = {
  questions_array: [],
  answers: ['0815', '2B', 'BAM128','Barely'],
  score: 0,
  current_question: 0,
  correct: 0,
  count: 0,
};
