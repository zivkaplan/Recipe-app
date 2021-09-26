import React from 'react';
import RecipeCard from './RecipeCard';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

class RecipeCardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { recipes, deleteRecipe, setFilter, openEditRecipe } = this.props;
        const savedRecipes = recipes.map((recipe) => (
            <RecipeCard
                title={recipe.title}
                url={recipe.url}
                comment={recipe.comment}
                tags={recipe.tags}
                id={recipe.id}
                key={recipe.id}
                deleteRecipe={deleteRecipe}
                difficultyLevel={recipe.difficultyLevel}
                setFilter={setFilter}
                openEditRecipe={openEditRecipe}
            />
        ));
        return (
            <div>
                {savedRecipes}

                <Fab
                    onClick={this.props.openRecipeForm}
                    style={{
                        position: 'fixed',
                        bottom: 'min(10vh, 10vw)',
                        right: 'min(10vh, 10vw)',
                    }}
                    color="primary"
                    aria-label="add"
                >
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default RecipeCardsList;
