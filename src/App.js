import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import RecipeCardForm from './components/RecipeCardForm';
import RecipeCardsList from './components/RecipeCardsList';
import 'bootstrap/dist/css/bootstrap.css';
import AppDrawer from './components/AppDrawer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeFormOpen: false,
            filter: { filterBy: null, value: null },
            recipes: [
                {
                    title: 'Wacky Mac',
                    url: 'https://www.google.com',
                    comment: '250g butter is enough',
                    tags: ['simple', 'pasta'],
                    id: uuidv4(),
                    difficultyLevel: 2,
                },
                {
                    title: 'Bread and Butter',
                    url: '#',
                    comment: 'I like with more salt',
                    tags: ['simple', 'quick', 'bread'],
                    id: uuidv4(),
                    difficultyLevel: 1,
                },
            ],
        };

        this.openRecipeForm = this.openRecipeForm.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        // get recipes from DB
    }

    setFilter(filter) {
        if (this.state.recipeFormOpen) {
            this.setState({ recipeFormOpen: false });
        }
        this.setState({ filter });
    }

    openRecipeForm() {
        this.setState({ recipeFormOpen: true });
    }

    saveRecipe(newRecipe) {
        this.setState({
            recipes: [...this.state.recipes, newRecipe],
            recipeFormOpen: false,
        });
    }

    deleteRecipe(id) {
        this.setState({
            recipes: this.state.recipes.filter((recipe) => recipe.id !== id),
        });
    }

    render() {
        const { recipes, filter, recipeFormOpen } = this.state;
        const allTags = [
            ...new Set(recipes.map((recipe) => recipe.tags).flat()),
        ];
        const filteredRecipes = () => {
            if (!filter.value) return recipes;
            if (filter.type === 'difficulty') {
                return recipes.filter(
                    (recipe) =>
                        recipe.difficultyLevel === parseInt(filter.value)
                );
            }
            if (filter.type === 'tag') {
                return recipes.filter((recipe) =>
                    recipe.tags.includes(filter.value)
                );
            }
        };
        const mainPage = recipeFormOpen ? (
            <RecipeCardForm saveRecipe={this.saveRecipe} />
        ) : (
            <RecipeCardsList
                openRecipeForm={this.openRecipeForm}
                deleteRecipe={this.deleteRecipe}
                setFilter={this.setFilter}
                recipes={filteredRecipes()}
            />
        );
        return (
            <div>
                <AppDrawer
                    filter={filter}
                    recipeFormOpen={recipeFormOpen}
                    setFilter={this.setFilter}
                    allTags={allTags}
                />
                {mainPage}
            </div>
        );
    }
}
export default App;
