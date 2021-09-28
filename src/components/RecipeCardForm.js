import React from 'react';
import { Container, Badge, Card, Form, Button } from 'react-bootstrap';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputAdornment from '@mui/material/InputAdornment';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import chefHat from '@iconify/icons-mdi/chef-hat';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class RecipeCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            dateAdded: '',
            title: '',
            url: '',
            comment: '',
            tags: [],
            difficultyLevel: 0,
            newTag: '',
            invalidForm: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }
    componentDidMount() {
        const { recipeToEdit } = this.props;
        if (recipeToEdit) {
            this.setState({ ...recipeToEdit });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, url, comment, tags, id, dateAdded, difficultyLevel } =
            this.state;
        if (!title) {
            this.setState({ invalidForm: true });
            return;
        }
        const newRecipe = {
            title,
            url,
            comment,
            tags,
            id,
            dateAdded,
            difficultyLevel,
        };
        this.props.saveRecipe(newRecipe);
    }
    handleClose() {
        this.props.closeRecipeForm();
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) this.addTag();
    }

    addTag(e) {
        this.setState({
            tags: [...this.state.tags, this.state.newTag],
            newTag: '',
        });
    }

    deleteTag(e) {
        this.setState({
            tags: [
                ...this.state.tags.filter(
                    (tag, i) => i !== parseInt(e.target.id)
                ),
            ],
        });
    }

    render() {
        const {
            title,
            url,
            comment,
            tags,
            newTag,
            difficultyLevel,
            invalidForm,
        } = this.state;
        const renderedTags = tags.map((tag, idx) => (
            <Badge pill bg="dark" key={idx} id={idx} onClick={this.deleteTag}>
                {tag}
            </Badge>
        ));

        return (
            <div>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add Recipe</Card.Title>
                            <Form>
                                {invalidForm ? (
                                    <Alert severity="warning">
                                        Title field cannot be empty
                                    </Alert>
                                ) : null}
                                <TextField
                                    className="mb-3"
                                    fullWidth
                                    name="title"
                                    variant="filled"
                                    label="Title"
                                    onChange={this.handleChange}
                                    value={title}
                                />

                                <TextField
                                    className="mb-3"
                                    fullWidth
                                    variant="filled"
                                    label="Recipe's URL"
                                    onChange={this.handleChange}
                                    name="url"
                                    value={url}
                                />
                                <TextField
                                    className="mb-3"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    label="Comments"
                                    onChange={this.handleChange}
                                    value={comment}
                                    name="comment"
                                />
                                <div className="d-flex mb-3">
                                    <Typography component="legend">
                                        Difficulty level:
                                    </Typography>
                                    <Rating
                                        max={3}
                                        name="simple-controlled"
                                        value={difficultyLevel}
                                        onChange={(e, newValue) => {
                                            this.setState({
                                                difficultyLevel: newValue,
                                            });
                                        }}
                                        icon={
                                            <Icon icon={chefHat} color="gold" />
                                        }
                                        emptyIcon={
                                            <Icon icon={chefHat} color="gray" />
                                        }
                                    />
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <TextField
                                        variant="filled"
                                        sx={{ m: 1, width: '25ch' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    #
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="Tags"
                                        onChange={this.handleChange}
                                        name="newTag"
                                        value={newTag}
                                        onKeyUp={this.handleKeyUp}
                                    />
                                    <Button
                                        style={{ margin: '8px' }}
                                        variant="warning"
                                        onClick={this.addTag}
                                    >
                                        <AddBoxIcon />
                                    </Button>
                                </div>
                                <div className="mb-3 d-flex justify-content-start">
                                    {renderedTags}
                                </div>
                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        size="large"
                                        type="button"
                                        onClick={this.handleSubmit}
                                    >
                                        <SaveIcon />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="large"
                                        onClick={this.handleClose}
                                    >
                                        <ArrowBackIcon />
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
