import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const DETAILS_API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

function MealDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //function to build an array of ingredients
    function buildIngredientsArr(meal) {
        if (!meal) return [];
        const list = [];
        for (let i = 1; i <= 20; i++) {
            const name = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (name && name.trim())
                list.push(`${measure ? measure.trim() + " " : ""}${name.trim()}`)
        }
        return list;
    }

    useEffect(() => {
        async function fetchDetails() {
            const response = await fetch(`${DETAILS_API}${id}`);
            const data = await response.json();
            setMeal(data.meals ? data.meals[0] : null);
            setLoading(false);
        }
        fetchDetails();
    }, [id]);  // end of useEffect

    if (loading) return <p>Loading Meals...</p>
    if (error) return <p className="error">Error: {error.message}</p>
    if (!meal) return (<p>No meal found.</p>);

    const ingredients = buildIngredientsArr(meal);

    return (
        <div className="meal-details">

            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ maxWidth: 400, width: "100%", borderRadius: 8 }} />
            <p><strong>Category:</strong>{meal.strCategory}</p>
            <p><strong>Area:</strong>{meal.strArea || "-"}</p>

            <h3>Ingredients {ingredients.length}</h3>
            <ul>
                {ingredients.map((ingre, index) => <li key={index}> {ingre} </li>)}
            </ul>

            <h3>Instructions</h3>
            <p style={{ whiteSpace: "pre-line" }}>{meal.strInstructions}</p>

            {meal.strYoutube && (
                <p>
                    <strong>Video:</strong>{" "}
                    <a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch Video here on YouTube..</a>
                </p>
            )}

        </div>
    )
}

export default MealDetails;