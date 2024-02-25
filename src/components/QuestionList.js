
import QuestionItem from "./QuestionItem"

function QuestionList({ page , onDelete , onCorrectIndexChange}) {
  const pagesMapped = () => {
    return page.map(pageObj => (
      <QuestionItem
        key={pageObj.id} 
        question={pageObj}
        onDelete={() => onDelete(pageObj.id)}
        onCorrectIndexChange={onCorrectIndexChange}
      />
    ))
  }
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{pagesMapped()}</ul>
    </section>
  );
}

export default QuestionList;
