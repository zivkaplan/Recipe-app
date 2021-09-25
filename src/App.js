import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import RecipeCardForm from './components/RecipeCardForm';
import RecipeCardsList from './components/RecipeCardsList';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';

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
    }
    componentDidMount() {
        // get recipes from DB
    }
    deleteRecipe(id) {
        this.setState({
            recipes: this.state.recipes.filter((recipe) => recipe.id !== id),
        });
    }
    render() {
        const recipes = this.state.recipes;
        return (
            <Switch>
                <Route exact path="/new" render={() => <RecipeCardForm />} />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <RecipeCardsList
                            deleteRecipe={this.deleteRecipe}
                            recipes={recipes}
                        />
                    )}
                ></Route>
            </Switch>
        );
    }
}
export default App;
