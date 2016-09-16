Controller.prototype.getNextQuestion = function(state, element) {

  // Iterate over the array of question objects apply the callback.
  _.each(this.state.items, addItem_Callback);

  /* DOM Rendering Functions */
  function renderScore() {
    $('.questions-page').hide();
    $('.results-page').css('display', 'block');
    $('.score').empty().append(this.state.correct);
  }
  function renderQStart() {
    this.state.questionHTML = '<p>' + this.state.items[0].text + '</p>';
  }
  function renderQInProgress() {
    this.state.questionHTML = '<p>' + this.state.items[this.state.index + 1].text + '</p>';
  }
  /* Callback Function */
  function addItem_Callback(question, index, questions) {
    // Is the Quiz in progress or not
    if (this.state.items[this.state.index].display) {
      this.state.items[this.state.index].display = false;
      this.state.current_question += 1;
      // Have we gone passed the number of elements in the array?
      // TRUE: Show Score & Hide the Questions Page.
      if (this.state.items[this.state.index + 1] === undefined) {
        renderScore();
      }
      // FALSE: Render the next question in the array.
      else {
        this.state.items[this.state.index + 1].display = true;
        renderQInProgress();
        this.state.index++;

        element.html(this.state.questionHTML);
      }
    }
    // Have we started the Quiz?
    // If not then start at question #1 & render question to the DOM.
    else if (this.state.questionHTML === null) {
      this.state.items[0].display = true;
      renderQStart();
      this.state.current_question += 1;

      element.html(this.state.questionHTML);
    }
  }
};





// #####################################
// Original


Controller.prototype.getNextQuestion = function(state, element) {

  /* DOM Rendering Functions */
  function renderScore() {
    $('.questions-page').hide();
    $('.results-page').css('display', 'block');
    $('.score').empty().append(this.state.correct);
  }
  function renderQStart() {
    this.state.questionHTML = '<p>' + this.state.items[0].text + '</p>';
  }
  function renderQInProgress() {
    this.state.questionHTML = '<p>' + this.state.items[this.state.index + 1].text + '</p>';
  }
  /* Callback Function */
  function addItem_Callback(question, index, questions) {
    // Is the Quiz in progress or not
    if (this.state.items[this.state.index].display) {
      this.state.items[this.state.index].display = false;
      this.state.current_question += 1;
      // Have we gone passed the number of elements in the array?
      // TRUE: Show Score & Hide the Questions Page.
      if (this.state.items[this.state.index + 1] === undefined) {
        renderScore();
      }
      // FALSE: Render the next question in the array.
      else {
        this.state.items[this.state.index + 1].display = true;
        renderQInProgress();
        this.state.index++;
      }
    }
  }

  // Iterate over the array of question objects apply the callback.
  _.each(this.state.items, addItem_Callback);
  // Have we started the Quiz?
  // If not then start at question #1 & render question to the DOM.
  if (this.state.questionHTML === null) {
    this.state.items[0].display = true;
    renderQStart();
    this.state.current_question += 1;
  }

  element.html(this.state.questionHTML);
};
