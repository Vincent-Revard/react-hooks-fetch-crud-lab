import { useState, useEffect } from "react"
import AdminNavBar from "./AdminNavBar"
import QuestionForm from "./QuestionForm"
import QuestionList from "./QuestionList"
import { v4 as uuidv4 } from "uuid"


function App() {

  const [page, setPage] = useState([])
  const [currentPage, setCurrentPage] = useState('List')
  const url = "http://localhost:4000/questions"
  console.log(page)

  const onChangePage = (e) => {
    e.target.textContent === 'New Question'? setCurrentPage('Form') : setCurrentPage('List')
    // if(e.target.textContent === 'New Question') {
    //   setCurrentPage('Form')
    // } else {
    // setCurrentPage('List')
    // }
  }
  

  useEffect(() => {
    const fetchQuestions = () => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPage(data)
        // onChangePage('List')
      })
      .catch((err) => console.log(err))
    } 
    fetchQuestions()
  }, [])



  const addQuestion = (newQuestion) => {(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: newQuestion.prompt,
          answers: [
            newQuestion.answer1, 
            newQuestion.answer2, 
            newQuestion.answer3, 
            newQuestion.answer4],
          correctIndex: newQuestion.correctIndex
        })
      })
        .then(resp => {
          if (!resp.ok) {
            throw new Error("Failed to fetch because server is not running")
          }
          return resp.json()
        })
        .then((addedQuestion) => {
          setPage((currentQuestions) => {
            const lastQuestionArray = currentQuestions.slice(-1)
            const id = lastQuestionArray.length 
              ? Number(lastQuestionArray[0].id) + 1 
              : uuidv4()
            return [...currentQuestions, { ...addedQuestion, id}]
          })
        })
  )}

  const onDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to delete question")
        }
        return resp.json()
      })
      .then(() => {
        // Update state to reflect delete
        setPage((currentQuestions) =>
          currentQuestions.filter((question) => question.id !== id)
        )
      })
      .catch((err) => console.error(err))
  }

  const onCorrectIndexChange = (id, correctIndex) => {
    // Update on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "correctIndex": `${correctIndex}`
      }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to update correctIndex")
        }
        return resp.json()
      })
      .then((newCorrectIndex) => {
        // Update state to reflect the change
        setPage((currentQuestions) =>
          currentQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex: newCorrectIndex.correctIndex } : question
          )
        )
      })
      .catch((err) => console.error(err))
  }

  return (
    <main>
      <AdminNavBar onChangePage={onChangePage} />
      {currentPage === 'Form' ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          page={page}
          onDelete={onDelete}
          onCorrectIndexChange={onCorrectIndexChange}
        />
      )}
    </main>
  )
}

export default App
