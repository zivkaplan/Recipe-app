import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import RecipeCardForm from './components/RecipeCardForm';
import RecipeCardsList from './components/RecipeCardsList';
import 'bootstrap/dist/css/bootstrap.css';
import AppDrawer from './components/AppDrawer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeFormOpen: false,
            editMode: null, //or ID
            filter: { filterBy: null, value: null },
            recipes: [
                {
                    title: 'Wacky Mac',
                    url: 'https://www.google.com',
                    comment: '250g butter is enough',
                    tags: ['simple', 'pasta'],
                    id: uuidv4(),
                    difficultyLevel: 2,
                    dateAdded: Date.now() - 6000,
                },
                {
                    title: 'Bread and Butter',
                    url: '#',
                    comment: 'I like with more salt',
                    tags: ['simple', 'quick', 'bread'],
                    id: uuidv4(),
                    difficultyLevel: 1,
                    dateAdded: Date.now(),
                },
            ],
        };

        this.getRecipeIfEditing = this.getRecipeIfEditing.bind(this);
        this.openEditRecipe = this.openEditRecipe.bind(this);
        this.openRecipeForm = this.openRecipeForm.bind(this);
        this.closeRecipeForm = this.closeRecipeForm.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        // get recipes from DB
    }

    setFilter(filter) {
        this.closeRecipeForm();
        this.setState({ filter });
    }

    openRecipeForm() {
        this.setState({ recipeFormOpen: true });
    }

    closeRecipeForm() {
        this.setState({ editMode: false, recipeFormOpen: false });
    }

    openEditRecipe(id) {
        this.setState({ editMode: id });
    }

    saveRecipe(newRecipe) {
        if (!newRecipe.id) {
            newRecipe.id = uuidv4();
            this.setState({
                recipes: [...this.state.recipes, newRecipe],
                recipeFormOpen: false,
            });
            return;
        }
        //update existing recipe
        this.setState({
            recipes: [
                ...this.state.recipes.map((oldRecipe) => {
                    if (oldRecipe.id === newRecipe.id) {
                        return newRecipe;
                    }
                    return oldRecipe;
                }),
            ],
            editMode: null,
        });
    }
    getRecipeIfEditing(id) {
        if (!id) return false;
        return this.state.recipes.find((r) => r.id === id);
    }

    deleteRecipe(id) {
        this.setState({
            recipes: this.state.recipes.filter((recipe) => recipe.id !== id),
        });
    }

    render() {
        const { recipes, filter, recipeFormOpen, editMode } = this.state;
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

        const recipesListPage = (routeProps) => (
            <RecipeCardsList
                openEditRecipe={this.openEditRecipe}
                openRecipeForm={this.openRecipeForm}
                deleteRecipe={this.deleteRecipe}
                setFilter={this.setFilter}
                recipes={filteredRecipes().sort(
                    (firstEl, secondEl) =>
                        firstEl.addedDate < secondEl.addedDate
                )}
            />
        );

        const recipeFormPage = (routeProps) => (
            <RecipeCardForm
                saveRecipe={this.saveRecipe}
                recipeToEdit={{ ...this.getRecipeIfEditing(editMode) }}
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
                <Switch>
                    <Route exact path="/" render={recipesListPage} />
                    <Route exact path="/new" render={recipeFormPage} />
                </Switch>
            </div>
        );
    }
}
export default App;
