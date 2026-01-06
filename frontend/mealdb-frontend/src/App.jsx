import { useState, useEffect } from 'react'  // component store and update
import { Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import MealDetails from './pages/MealDetails';

const API_BASE = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function countIngredients(meal) {
  let count = 0;
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") count++;
  }
  return count;
}

function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const line = `${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim();
      items.push(line);
    }
  }
  return items;
}

function App() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leastMeal, setLeastMeal] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault()
    if (!query.trim()) return;

    try {
      setLoading(true);    //start loading
      setError(null);
      const response = await fetch(`${API_BASE}${encodeURIComponent(query)}`)
      if (!response.ok) { throw new Error("Network response Not Ok") }
      const data = await response.json();
      console.log("API Response", data);

      setMeals(data.meals || []);

      if (data.meals && data.meals.length > 0) {
        let minMeal = data.meals[0];
        let minCount = countIngredients(minMeal);
        data.meals.forEach((meal) => {
          const currCount = countIngredients(meal);
          if (currCount < minCount) {
            minMeal = meal;
            minCount = currCount;
          }
        })
        setLeastMeal(minMeal);
      } else setLeastMeal(null);


    } catch (err) {
      setError(err);
      setMeals([]);
    } finally {
      setLoading(false);    //stop loading
    }
  };
  return (
    <div className='app'>

      <nav className='nav'>
        <Link to="/">Home | </Link>
        <Link to="/search">Search meals</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path='/search' element={
          <>
            <h1>MealDB App</h1>
            <p>Search meals by name using TheMealDB API</p>

            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Search meals by name (e.g. Beef Steak)...'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type='submit' disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>

            </form>

            {leastMeal && (
              <div className='least-meal'>
                <h2>Meal with least Ingredients</h2>
                <h3>{leastMeal.strMeal}</h3>
                <img src={leastMeal.strMealThumb} alt={leastMeal.strMeal} width="250" />
                <p>Ingredients: {countIngredients(leastMeal)}</p>

                <h4>Ingredients List:</h4>
                <ul>
                  {getIngredients(leastMeal).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {error && <p className='error'>{error.message}</p>}
            {loading && <p>Loading meals...</p>}
            <ul className="meals-list">
              {meals.length === 0 && !loading && !error && (
                <li className='empty-space'>No meals yet. Try Searching</li>
              )}
              {meals.map((meal) => {
                const isLeast = leastMeal && meal.idMeal === leastMeal.idMeal;
                return (
                  <li key={meal.idMeal} className={`meal-card ${isLeast ? "least" : ""}`}>
                    <Link to={`/meal/${meal.idMeal}`} className="meal-link">
                      <img src={meal.strMealThumb} alt={meal.strMeal} className='meal-thumb' />
                      <h3>{meal.strMeal}</h3>
                    </Link>
                    <p>{meal.strArea} - {meal.strCategory}</p>
                    <p>Ingredients: {countIngredients(meal)}</p>
                  </li>
                );
              })}
            </ul>
          </>
        }
        />
      </Routes>

    </div>
  )
}


export default App
