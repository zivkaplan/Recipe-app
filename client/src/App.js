import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import RecipeCardForm from './components/RecipeCardForm';
import RecipeCardsList from './components/RecipeCardsList';
import 'bootstrap/dist/css/bootstrap.css';
import AppDrawer from './components/AppDrawer';
import LoginPage from './components/LoginPage';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
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
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        // get recipes from DB
    }
    login() {
        this.setState({ isLoggedIn: true });
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
        this.setState({ editMode: id, recipeFormOpen: true });
    }

    saveRecipe(newRecipe) {
        // add new recipe
        if (!newRecipe.id) {
            newRecipe.id = uuidv4();
            this.setState({
                recipes: [...this.state.recipes, newRecipe],
            });
        } else {
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
            });
        }
        return this.closeRecipeForm();
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

        const renderRecipesListPage = (
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

        const renderRecipeFormPage = (
            <RecipeCardForm
                closeRecipeForm={this.closeRecipeForm}
                saveRecipe={this.saveRecipe}
                recipeToEdit={{ ...this.getRecipeIfEditing(editMode) }}
            />
        );
        const renderPage = () => {
            if (!this.state.isLoggedIn) {
                return <LoginPage login={this.login} />;
            }
            return (
                <div>
                    <AppDrawer
                        filter={filter}
                        recipeFormOpen={recipeFormOpen}
                        setFilter={this.setFilter}
                        allTags={allTags}
                    />
                    {recipeFormOpen
                        ? renderRecipeFormPage
                        : renderRecipesListPage}{' '}
                </div>
            );
        };
        return <div>{renderPage()}</div>;
    }
}
export default App;
