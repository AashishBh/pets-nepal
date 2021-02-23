import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errorMessage: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: "", password: "" });
		} catch (error) {
			this.setState({ errorMessage: error });
			this.setState({ email: "", password: "" });
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { email, password, errorMessage } = this.state;
		return (
			<Container>
				<Row>
					<Col md={{ span: 4, offset: 6 }}>
						<br /><h1> Sign In </h1><br/>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={email}
									placeholder="Email"
									onChange={this.handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={password}
									placeholder="Password"
									onChange={this.handleChange}
								/>
							</Form.Group>
							{errorMessage ? (
								<Alert variant="danger">
									{errorMessage.code}
									<br />
									{errorMessage.message}
								</Alert>
							) : null}
							<Button variant="outline-dark" type="submit">
								SIGN IN
							</Button>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Button
								variant="outline-dark"
								onClick={signInWithGoogle}
							>
								SIGN IN WITH GOOGLE
							</Button>
							<hr />
							<Form.Text>
								{" "}
								Don't have an account yet?
								<Link to="/signup"> SIGN UP </Link>
							</Form.Text>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default SignIn;
