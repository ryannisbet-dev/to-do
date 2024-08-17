import { useState, useEffect, useCallback, useReducer } from 'react';
import './common.scss';

import ToDoHeader from './components/ToDoHeader/ToDoHeader';
import FormInput from './components/FormInput/FormInput';
import ToDoList from './components/ToDoList/ToDoList';
import ToDoActions from './components/ToDoActions/ToDoActions';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [toDoItems, setToDoItems] = useState(() => {
    const savedItems = localStorage.getItem('toDoItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [filteredItems, setFilteredItems] = useState(toDoItems);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilter = useCallback((filter, items = toDoItems) => {
    setActiveFilter(filter);

    if(filter === "active") {
      setFilteredItems(items.filter(item => item.done === false))
    } else if (filter === "completed") {
      setFilteredItems(items.filter(item => item.done === true))
    } else {
      setFilteredItems(items)
    }
  }, [toDoItems]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  }, [darkMode, toDoItems]);

  useEffect(()=> {
    setFilteredItems(toDoItems);
    handleFilter(activeFilter);
  }, [activeFilter, handleFilter, toDoItems])

  function handleThemeToggle() {
    setDarkMode(theme => !theme)
  }

  function handleNewToDo(value) {
    const newToDoItem = {
      id: crypto.randomUUID(),
      item: value,
      done: false
    };

    setToDoItems(toDoItems => [...toDoItems, newToDoItem]);
  }

  function handleDone(itemId) {
    setToDoItems(toDoItems => {
      const updatedItems = toDoItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            done: !item.done
          };
        }
        return item;
      });
      return updatedItems;
    });
  }

  function handleRemove(itemId) {
    setToDoItems(toDoItems => {
      return toDoItems.filter(item => item.id !== itemId);
    });
  }

  function handleClearCompleted() {
    setToDoItems(toDoItems => {
      return toDoItems.filter(item => item.done === false);
    })
  }

  return (
    <div className={`pageContainer ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
      <ToDoHeader onThemeToggle={handleThemeToggle} darkMode={darkMode}/>
      <FormInput onSubmit={handleNewToDo}/>
      </header>
      <ToDoList items={filteredItems} onDone={handleDone} onRemove={handleRemove} onClearCompleted={handleClearCompleted} filter={activeFilter}/>
      <ToDoActions onFilter={handleFilter}/>
    </div>
  );
}