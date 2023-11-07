import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

let initialQuestions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [questions, setQuestions] = useState(initialQuestions);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  function handleSubmit(e) {
    const newQ = { id: Date.now(), question: newQuestion, answer: newAnswer };
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;
    questions.push(newQ);
    console.log(questions);
    setNewAnswer("");
    setNewQuestion("");
  }

  function handleDelete(e) {
    setQuestions(questions.filter((item) => item.id !== Number(e.target.id)));
  }
  return (
    <>
      <div className="flashcards">
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => handleClick(question.id)}
            className={`card${question.id === selectedId ? " selected" : ""}`}
          >
            <div>
              <p>
                {question.id === selectedId
                  ? question.answer
                  : question.question}
              </p>
              <div>
                <button id={question.id} onClick={(e) => handleDelete(e)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <button onClick={() => setSelectedId(null)}>Clear Selection</button>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "center", margin: "5px" }}
      >
        <input
          type="text"
          placeholder="Type a new question here..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type a new answer here..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button>Add Question</button>
      </form>
    </>
  );
}
