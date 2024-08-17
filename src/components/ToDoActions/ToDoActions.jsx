export default function ToDoActions({onFilter}) {
    return (
        <div className="todo__actions">
            <button className="action__btn" value="all" onClick={(e)=> onFilter(e.target.value)}>All</button>
            <button className="action__btn" value="active" onClick={(e)=> onFilter(e.target.value)}>Active</button>
            <button className="action__btn" value="completed" onClick={(e)=> onFilter(e.target.value)}>Completed</button>
        </div>
    )
}