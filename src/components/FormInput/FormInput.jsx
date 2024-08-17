import { useState } from "react"
import './FormInput.scss'

export default function FormInput({onSubmit}) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue("");
    }

    return (
        <form onSubmit={handleSubmit} className="form__wrap">
            <input type="text" className="form__input" placeholder="Type your task here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} required/>
            <button type="submit" className="form__btn material-symbols-outlined" >add</button>
        </form>
    )
}