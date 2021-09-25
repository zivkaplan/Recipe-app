import React from 'react';
import { Container, Card, InputGroup, FormControl } from 'react-bootstrap';

class RecipeCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // const { recipes, deleteRecipe } = this.props;
        // const savedRecipes = recipes.map((recipe) => (
        //     <RecipeCard
        //         title={recipe.title}
        //         url={recipe.url}
        //         comment={recipe.comment}
        //         tags={recipe.tags}
        //         id={recipe.id}
        //         deleteRecipe={deleteRecipe}
        //     />
        // ));
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Add Recipe</Card.Title>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Title
                            </InputGroup.Text>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                URL
                            </InputGroup.Text>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Comments</InputGroup.Text>
                            <FormControl
                                as="textarea"
                                aria-label="With textarea"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Tags
                            </InputGroup.Text>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                            <small className="text-muted">
                                seperate your tags with space, "#" sign is added
                                automatically
                            </small>
                        </InputGroup>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default RecipeCardForm;
