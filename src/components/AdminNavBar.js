

function AdminNavBar({ onChangePage }) {

  return (
    <nav>
      <button onClick={onChangePage}>New Question</button>
      <button onClick={onChangePage}>View Questions</button>
    </nav>
  )
}

export default AdminNavBar
