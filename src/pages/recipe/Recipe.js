import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Recipe.css'

export default function Recipe() {

    const {id} = useParams()
    const url = 'http://localhost:3000/recipes/' + id
    const {data: recipe, isPending, error} = useFetch(url)



    return (
        <div className='recipe'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {recipe && (
            <>
                <h2>{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                ))}

                </ul>
                <p>{recipe.method}</p>
            </>
            )}
        </div>
    )
}
