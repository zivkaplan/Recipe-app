import React from 'react';
import { Container, Card, Accordion, Badge, Button } from 'react-bootstrap';
import './RecipeCardStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { Icon } from '@iconify/react';
import chefHat from '@iconify/icons-mdi/chef-hat';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.filterByTag = this.filterByTag.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    filterByTag(e) {
        const filter = { type: 'tag', value: e.target.innerText };
        this.props.setFilter(filter);
    }

    handleDelete() {
        this.props.deleteRecipe(this.props.id);
    }
    handleEdit() {
        this.props.openEditRecipe(this.props.id);
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
                                icon={<Icon icon={chefHat} color="gold" />}
                                emptyIcon={<Icon icon={chefHat} color="gray" />}
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
                                        <Button
                                            variant="outline-warning"
                                            onClick={this.handleEdit}
                                        >
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
