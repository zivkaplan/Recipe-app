import React from 'react';
import {
    Container,
    Badge,
    Card,
    Form,
    FloatingLabel,
    Button,
    Row,
    Col,
} from 'react-bootstrap';
import SaveIcon from '@mui/icons-material/Save';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import AddBoxIcon from '@mui/icons-material/AddBox';
class RecipeCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            URL: '',
            comment: '',
            tags: ['a', 'asdfsaf'],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSave() {
        this.props.saveRecipe(this.state);
    }
    addTag(e) {
        const newTag = e.target.value;
        this.setState({ tags: this.state.tags.push(newTag) });
    }
    render() {
        const { title, URL, comment, tags } = this.state;
        const renderedTags = tags.map((tag) => (
            <ListItem>
                <Badge pill bg="dark">
                    {tag}
                </Badge>
            </ListItem>
        ));
        return (
            <div>
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
                                        name="title"
                                        onChange={this.handleChange}
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
                                        onChange={this.handleChange}
                                        name="URL"
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
                                        onChange={this.handleChange}
                                        name="comment"
                                    />
                                </FloatingLabel>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingTextarea"
                                            label="Tags"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Leave a comment here"
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <Button
                                            variant="primary"
                                            onClick={this.addTag}
                                        >
                                            <AddBoxIcon />
                                        </Button>
                                    </Col>
                                </Row>
                                <List>{renderedTags}</List>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        onClick={this.handleSave}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default RecipeCardForm;
