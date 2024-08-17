import './ToDoList.scss'

export default function ToDoList({items, onDone, onRemove, onClearCompleted, filter}) {
    return (
        <div className="todo__container">
            <ul className="todo">
                {
                    items.map(item => (
                        <li key={item.id} className={`todo__item ${item.done ? "item__checked" : ""}`}> 
                            <input type="checkbox" className="item__checkbox" checked={item.done} onChange={()=>onDone(item.id)}/>
                            <p className="item__name">{item.item}</p>
                            <button className="item__close material-symbols-outlined" onClick={()=>onRemove(item.id)}>close</button>
                        </li>
                    ))
                }
            </ul>

            <div className="item__actions">
                <span className="item__count">
                {
                filter === "completed" ?
                (items.filter(item => !item.done).length ? `${items.filter(item => !item.done).length} items left` : `${items.filter(item => item.done).length} items completed`) :
                (filter === "all" ?
                (items.length ? (items.every(item => item.done) ? "All items done!" : `${items.filter(item => !item.done).length} items left`) : "Add an item to the list") :
                (items.length ? `${items.filter(item => !item.done).length} items left` : "No active tasks"))
                }
                </span>

                {
                    items.filter(item => item.done).length > 0 &&
                    <button className="item__clear" onClick={onClearCompleted}>
                        Clear Completed
                    </button>
                }

            </div>
        </div>
    );
}