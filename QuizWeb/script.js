STORE = [
    { question: "What is the most populous city in Scotland?",
    answer: ["Edinburgh", "Glasgow", "Aberdeen", "Fort William" ],
    correctAnswer:"Glasgow"
    },
    { question: "Which volcano is located in the Gulf of Naples, Italy?",
    answer: ["Mount Vesuvius", "Mount Etna", "Stromboli", "Volcano"],
    correctAnswer:"Mount Vesuvius"
    },
    { question: "Which country can you find between Spain and France?",
    answer: ["Andorra", "Vatican City", "San Marino", "Monaco"],
    correctAnswer: "Andorra"
    },
    { question: "Which country does not share a border with Czechia?",
    answer: ["Austria", "Germany", "Slovakia", "Slovenia"],
    correctAnswer: "Slovenia"
    },
    { question: "When was Pompeii destroyed by Mount Vesuvius?",
    answer: ["279 AD", "179 AD", "79 AD", "79 BC"],
    correctAnswer: "79 AD"
    },
    { question: "When was the Spanish Civil War?",
    answer: ["1914-1918", "1936-1939", "1939-1945", "1949-1951" ],
    correctAnswer:"1936-1939"
    },
    { question: "Which country is not part of the Balkans?",
    answer: ["Croatia", "Bulgaria", "Montenegro", "Poland"],
    correctAnswer:"Poland"
    },
    { question: "How many countries are part of Europe?",
    answer: ["45", "46", "47", "48"],
    correctAnswer: "47"
    },
    { question: "The largest European country by population is this country.",
    answer: ["Germany", "Spain", "Italy", "France"],
    correctAnswer: "Germany"
    },
    { question: "Europe is ranked as the 6th largest of this kind of formation in terms of its size.",
    answer: ["island", "country", "continent", "territory"],
    correctAnswer: "continent"
    },
    { question: "The smallest country in the world is located in Europe. What is it?",
    answer: ["San Obispo", "El Salvador", "The Vatican", "San Marino" ],
    correctAnswer:"The Vatican"
    },
    { question: "Mt. Blanc is considered as the highest point in Europe. Where is it located?",
    answer: ["France", "Italy", "France and Italy", "neither France nor Italy"],
    correctAnswer:"France and Italy"
    },
    { question: "This river is considered as the longest river stretching within the European Union.",
    answer: ["Volger", "Maru", "Danube", "Heret"],
    correctAnswer: "Danube"
    },
    { question: "Zurich is the largest city of which European country?",
    answer: ["Swaziland", "Thailand", "Switzerland", "Finland"],
    correctAnswer: "Switzerland"
    },
    { question: 'This European country is also known as "the land of the midnight sun."',
    answer: ["Armenia", "Norway", "Ukraine", "Greenland"],
    correctAnswer: "Norway"
    }
]
/* sets initial values to zero for the question number and score */

let qNumber = 0;
let score = 0;

/* event listener for start quiz button. Hides the start page and calls the function generateQuizQuestion */
function startQuiz() {
    $('main').on('click', '#button-start', function(event){
        $('.start-quiz').hide();
        generateQuizQuestion();
    });
}

/* begins displaying quiz questions from the STORE array until the very last question has been displayed, then calls the displayResults function */
function generateQuizQuestion() {
    if (qNumber < STORE.length) {
    let question =$(`<form class ="js-quiz-form">
    <legend class = "question">${STORE[qNumber].question}</legend>
    <ul class="radiogroup" role="radiogroup" aria-labelledby="question"></ul>`);
    let answers = STORE[qNumber].answer.map(function(answerValue, answerIndex){
        return `<label for="${answerValue}"><input type="radio" id="${answerValue}" name="answer" tabindex="${answerIndex}" value="${answerValue}" aria-checked="false" required>${answerValue}</label><br>`;
    });
    let button = $(`<button type="submit" id ="button-submit">Submit</button></form>`)
    $('.js-quiz').append(question);
    $('.radiogroup').append(answers, button);
    questionNumber();
} else {
    displayResults();
}

}

/* event listener for the submit button. Then checks to see if an input is selected, and if the answer selected is correct */
function questionChecker(){
    $('main').on('click','#button-submit', function (event){
        if ($('input:radio').is(':checked')) {
        event.preventDefault();
        let selectedAnswer= $("input[name=answer]:checked").val();
        console.log(selectedAnswer);
        if (selectedAnswer === STORE[qNumber].correctAnswer) {
            rightAnswer();
        } else {
                wrongAnswer();
            }
        }else {
            alert('Please select an answer.')
        }
    });
}

/* updates the question number and displays it at the top of the page */
function questionNumber(){
    $('header').find('#question-number').text(qNumber+1);
}

/* keeps score of correct answers and displays at the top of the page */
function scoreKeeper(){
    score++;
    $('header').find('#score').text(`${score}/15`);

}

/* displays the page for when the answer is right, updates score accordingly */
function rightAnswer() {
    console.log('rightAnswer ran');
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>You're Right!</h2>
    <p>Great Job.</p>
    <button type="button" id ="button-next">Next Question</button>`).show();
    scoreKeeper();
}

/* displays page for when the answer is wrong and displays the correct answer */
function wrongAnswer() {
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>That answer is not quite right...</h2>
        <h3>The correct answer is:</h3>
        <p><span class="correct-answer">${STORE[qNumber].correctAnswer}</span></p>
        <button type="button" id ="button-next">Next</button>`).show();
}

/* event listener for the next question button, calls the generateQuizQuestion function to display the next question */
function nextQuestion() {
    $('main').on('click','#button-next', function(event) {
        $('.js-answer').empty();
        $('.js-quiz-form').empty();
        qNumber++;
        generateQuizQuestion();
        $('js-quiz-form').show();
    });
}

/* displays the final percentage score and total number of correct answers */
function displayResults(){
    console.log("`displayResults` ran");
    let finalScore = (score/15)*100;
    $('.js-answer').append(`<h2>Quiz Results</h2>
    <h3>${finalScore}%</h3>
    <p>You got <span class="right-answers">${score} </span>out of 15 questions right.</p>
    <button type="button" id ="button-restart">Start a New Quiz</button>`)
}

function restartQuiz(){
    console.log('restart quiz ran');
 $('main').on('click', '#button-restart', function(event){
     console.log('restart button clicked');
    score = 0;
    qNumber = 0;
    $('.js-answer').empty();
    $('.js-quiz-form').empty();
    $('.start-quiz').show();
    $('header').find('#score').text(`${score}/15`);
    $('header').find('#question-number').text(`${qNumber}`);
 });
}

function handleQuizApp(){
    startQuiz();
    questionChecker();
    nextQuestion();
    restartQuiz();
}

/* calls the handleQuizApp to activate functions with event listeners */
$(handleQuizApp);