var scoreElement = $('.score');

// Initial starting point
// Data will change here.
var state = {
  items: [

  ],
  'score': 0,
  'current_question': 0,

};

// Changes view in HTML
var render = function(){
  scoreElement.html(state.score);

};

// Action
// Changes the state.
var answerQuestion = function() {
  //code for answering question
  state.score += 1; // changes the score key-value.
  // Call render() to change DOM.
  render();
};


$(document).ready(function() {
  // event
  answersElement.click('button', answerQuestion);
});
