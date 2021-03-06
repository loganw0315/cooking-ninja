import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import './Create.css'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setNewIngredients] = useState([])
    const ingredientInput= useRef(null)
    const navigate = useNavigate()

    const {postData, data, error} = useFetch('http://localhost:3000/recipes', 'POST')

    const handleSubmit = (e) => {
        e.preventDefault()
        postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
        
        if(data){
            navigate('/')
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if(ing && !ingredients.includes(ing)){
            setNewIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    return (
        <div className='create'>
            <h2 className='page-title'>Add a new Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input 
                    type="text" 
                    onChange={(e) =>setTitle(e.target.value)}
                    value={title}
                    required
                    />
                </label>
                <label>
                    <span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input 
                        type="text" 
                        onChange={(e) => setNewIngredient(e.target.value)}
                        value={newIngredient}
                        ref={ingredientInput}
                        />
                        <button onClick={handleAdd} className='btn'>add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe method</span>
                    <textarea 
                    onChange={(e) => setMethod(e.target.value)}
                    value={method}
                    required
                    />
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input 
                    type="number"
                    onChange={(e) => setCookingTime(e.target.value)}
                    required
                    />
                </label>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}
