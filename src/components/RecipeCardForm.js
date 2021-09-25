import React from 'react';
import {
    Container,
    Card,
    Form,
    FormControl,
    FloatingLabel,
} from 'react-bootstrap';

class RecipeCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Add Recipe</Card.Title>
                        <Form>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Title"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="URL"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingTextarea2"
                                label="Comments"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Tags"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                />
                                <small className="text-muted">
                                    seperate your tags with space, "#" sign is
                                    added automatically
                                </small>
                            </FloatingLabel>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default RecipeCardForm;
