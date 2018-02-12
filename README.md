# Trivia

Andrew, Xavyr, and I have taken over a project.

#### Steps
1. User Logs In.
2. Load 10 Q/A pairs from API
3. Socket info to client
4. Now the Start Button is Clickable.
5. Clicking the button goes into our Game Loop
6. Outcome Screen w/ Play again button


###### 1. User Login
  1. something
  2. another
  3. thing

###### 2. Load 10 Q/A pairs from API
  1. which api?
  2. how is the data coming to us?
  3. we want
  ``` {
    1: {
      "question": "Where was Lincoln born?",
        "answer": "Lincoln, Nebraska",
        "possibleAnswers": ["cali", "nyc", "dubai", "Lincoln, Nebraska"],
        "userAnswer": "undefined"
      },
    2: {
      "question": "How old is Donald Trump?",
        "answer": "42",
        "possibleAnswers": ["100", "80", "21", "42"],
        "userAnswer": "100"
      },  

  ```
What should we do about the userAnswer?
Should it be stored on the data object?
###### 3. Socket info to client
  This isn't necessary but it's a chance for us all
  to get some experience with sockets.
  We will send...
  1. all questions, answers, and possibilities.

###### 4. Now the Start Button is Clickable.
  Now that everything is loaded, we can change the
  color of the button from red to green.
  Onclick() we will start the next step.
###### 5. Our Game Loop


###### 6. Outcome Screen w/ Play again button
