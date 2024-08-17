import './ToDoHeader.scss'

export default function ToDoHeader({onThemeToggle, darkMode}) {
    return (
        <div className="header__text">
            <h1 className="header__title">To Do</h1>
            <button className="header__switch" onClick={onThemeToggle}>
                {darkMode ? (
                    <span className="material-symbols-outlined">light_mode</span>
                ) : (
                    <span className="material-symbols-outlined">dark_mode</span>
                )}
            </button>
        </div>
    )
}