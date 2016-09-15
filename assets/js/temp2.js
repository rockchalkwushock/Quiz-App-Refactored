var questions = state.items;
var index = state.count;
var q_counter = state.question_counter;

function addItem_Callback(question, index, questions) {
  if (questions[index].display) {
    questions[index].display = false;
    q_counter += 1;
    if (questions[index + 1] === undefined) {
      // render function
    } else {
      questions[index + 1].display = true;
      // render function
      index++;
    }
  }
}
_.each(questions, addItem_Callback);
