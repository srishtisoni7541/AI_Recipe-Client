
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, selectNewRecipeAdded } from "../redux/slices/RecipeSlice";  // Adjust the import if necessary
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the recipes from Redux state
  const { recipes, status, error } = useSelector((state) => state.recipes);
  console.log('recipes from redux:',recipes);
  const newRecipeAdded = useSelector(selectNewRecipeAdded);  

  useEffect(() => {
    if (newRecipeAdded) {
      // Fetch recipes only if a new recipe was added
      dispatch(fetchRecipes());
    }
  }, [dispatch, newRecipeAdded]);  // Trigger fetch when a new recipe is added

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">🍽️ Latest Recipes</h2>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="relative group bg-white rounded-lg shadow-md p-4">
            <img
              src={recipe.imageUrl || "https://i.pinimg.com/474x/1b/dc/09/1bdc09ea5a714a29493d039f5e130533.jpg"}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p className="text-gray-600 text-sm">{recipe.description}</p>

            <button
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center bg-green-400 bg-opacity-80 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
