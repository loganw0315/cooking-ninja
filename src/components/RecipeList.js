import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

import './RecipeList.css'

export default function RecipeList({recipes, query}) {
    const {mode} = useTheme()

    if(recipes.length === 0 ){
        return <div className="error">No recipes including {query} found...</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map((recipe) => (
                <div className={`card ${mode}`} key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{recipe.method.substring(0, 100)}</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                </div>
            ))}
        </div>
    )
}
