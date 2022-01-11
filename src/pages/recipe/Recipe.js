import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
import './Recipe.css'

export default function Recipe() {

    const {id} = useParams()
    const url = 'http://localhost:3000/recipes/' + id
    const {data: recipe, isPending, error} = useFetch(url)
    const {mode} = useTheme()


    return (
        <div className={`recipe ${mode}`}>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipe && (
            <>
                <h2>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li className={`ingredient ${mode}`}>{ingredient}</li>
                ))}

                </ul>
                <p>{recipe.method}</p>
            </>
            )}
        </div>
    )
}
