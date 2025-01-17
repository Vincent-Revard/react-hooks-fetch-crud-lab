// import { v4 as uuidv4 } from "uuid"

function QuestionItem({ question, onDelete, onCorrectIndexChange }) {
  const { id, prompt, answers, correctIndex } = question

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ))
  function handleChange(e) {
    const newCorrectIndex = e.target.value
    onCorrectIndexChange(id, newCorrectIndex)
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  )
}

export default QuestionItem
