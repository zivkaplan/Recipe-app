import React from 'react';
import RecipeCard from './RecipeCard';

class RecipeCardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { recipes, deleteRecipe } = this.props;
        const savedRecipes = recipes.map((recipe) => (
            <RecipeCard
                title={recipe.title}
                url={recipe.url}
                comment={recipe.comment}
                tags={recipe.tags}
                id={recipe.id}
                key={recipe.id}
                deleteRecipe={deleteRecipe}
            />
        ));
        return <div>{savedRecipes}</div>;
    }
}

export default RecipeCardsList;
