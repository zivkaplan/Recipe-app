import React from 'react';
import { Container, Card, Accordion, Badge, Button } from 'react-bootstrap';
import './RecipeCardStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.filterByTag = this.filterByTag.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    filterByTag() {}

    handleDelete() {
        this.props.deleteRecipe(this.props.id);
    }

    render() {
        const { title, url, comment, tags, difficultyLevel } = this.props;
        const clickableTags = tags.map((tag, idx) => (
            <Badge pill bg="primary" key={idx} onClick={this.filterByTag}>
                {tag}
            </Badge>
        ));

        return (
            <Container>
                <Card className="mb-3">
                    <Card.Img
                        variant="top"
                        src="https://source.unsplash.com/1600x900/?food,meal,lunch.jpg"
                        alt="sample food"
                    />
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Card.Title>
                                <a
                                    style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                    href={url}
                                >
                                    {title}
                                </a>
                            </Card.Title>
                            <Rating
                                name="read-only"
                                value={difficultyLevel}
                                max={3}
                                readOnly
                            />
                        </div>

                        <h6 className="text-muted">{clickableTags}</h6>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Show More</Accordion.Header>
                                <Accordion.Body>
                                    <p>
                                        <strong>My Comments: </strong>
                                        {comment}
                                    </p>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <Button variant="outline-warning">
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            onClick={this.handleDelete}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default RecipeCard;
