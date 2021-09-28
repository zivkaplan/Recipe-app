import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LoginIcon from '@mui/icons-material/Login';

class RecipeCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            invalidForm: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { email, password } = this.state;
        e.preventDefault();
        if (!email || !password) {
            return this.setState({ invalidForm: true });
        }
        this.props.login();
    }

    handleClose() {}

    render() {
        const { email, password, invalidForm } = this.state;
        return (
            <div>
                <Container className="mt-5 d-flex justify-content-center align-items-center">
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Form>
                                {invalidForm ? (
                                    <Alert className="my-2" severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        All Fields must be filled
                                    </Alert>
                                ) : null}

                                <TextField
                                    className="mb-3"
                                    fullWidth
                                    name="email"
                                    variant="standard"
                                    label="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                                <TextField
                                    className="mb-3"
                                    fullWidth
                                    variant="standard"
                                    label="password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={password}
                                />

                                <div className="d-grid gap-2">
                                    <Button
                                        variant="success"
                                        size="large"
                                        type="button"
                                        onClick={this.handleSubmit}
                                    >
                                        <LoginIcon />
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
