# Quiz-App-Refactored
Practice with Removing the State &amp; Advanced OOP

## The State
What does the 'state' of my app represent, or a better question to ask myself
is what will be changing in the DOM?
  * overarching reality is that the HTML changes as a whole
    * does this mean the HTML itself should be represented as a property
      in `state`
  - current question value
  - question being appended (4 questions so it changes 4 times)
  - answers being appended  (4 answers/question so again 4 times)
    * answers is an array of the same values in the same order
    * so does the state of `answers[]` ever really change? (I think no)
  - correct (answer index) (changes 4 times)
  - counter for questions (changes 4 times)

## The Action
What 'action' functions do I need to write for the program to run properly?

  - must add question object to the state from `QUESTIONS[obj]`.
  - must change score.
  - must reset score.
  - must 
