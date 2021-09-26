import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import RecipeCardForm from './components/RecipeCardForm';
import RecipeCardsList from './components/RecipeCardsList';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import AppDrawer from './components/AppDrawer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [
                {
                    title: 'Wacky Mac',
                    url: '#',
                    comment: '250g butter is enough',
                    tags: ['simple', 'pasta'],
                    id: uuidv4(),
                },
                {
                    title: 'Bread and Butter',
                    url: '#',
                    comment: 'I like with more salt',
                    tags: ['simple', 'quick', 'bread'],
                    id: uuidv4(),
                },
            ],
        };

        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

    componentDidMount() {
        // get recipes from DB
    }

    saveRecipe(newRecipe) {
        this.setState({
            recipes: [...this.state.recipes, newRecipe],
        });
    }

    deleteRecipe(id) {
        this.setState({
            recipes: this.state.recipes.filter((recipe) => recipe.id !== id),
        });
    }
    render() {
        const recipes = this.state.recipes;
        const allTags = recipes.map((recipe) => recipe.tags).flat();

        return (
            <Switch>
                <Route
                    exact
                    path="/new"
                    render={(routeProps) => (
                        <div>
                            <AppDrawer
                                title="Add Recipe"
                                allTags={allTags}
                                {...routeProps}
                            />
                            <RecipeCardForm
                                saveRecipe={this.saveRecipe}
                                {...routeProps}
                            />
                        </div>
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                        <div>
                            <AppDrawer title="Add Recipe" allTags={allTags} />
                            <RecipeCardsList
                                deleteRecipe={this.deleteRecipe}
                                {...routeProps}
                                recipes={recipes}
                            />
                        </div>
                    )}
                ></Route>
            </Switch>
        );
    }
}
export default App;
