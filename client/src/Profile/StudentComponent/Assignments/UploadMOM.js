import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';

const UploadMOM = (props) => {
	const cookies = new Cookies();
	const [ url, setUrl ] = useState(props.assignment.MinutesOfMeeting);
	const BASEURL = process.env.REACT_APP_SAMPLE;
	useEffect(() => {
		const print = () => {
			console.log(props.assignment);
		};
		print();
	}, []);

	const addMoM = async (e) => {
		e.preventDefault();

		const response = await axios.post(
			`http://localhost:5000/api/v1/UploadMom`,
			{
				id: props.assignment._id,
				url: url
			},
			{
				headers: {
					Authorization: cookies.get('KeyToken')
				}
			}
		);
		console.log(response);
		if (response.status === 200) {
			props.closeModel();
		}
	};
	return (
		<Container>
			<Form>
				<FloatingLabel controlId="floatingInput" label="Drive Link" className="mb-3">
					<Form.Control
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
						type="text"
						placeholder="name@example.com"
					/>
				</FloatingLabel>

				<Button
					className="mt-3"
					onClick={(e) => {
						addMoM(e);
					}}
				>
					Upload
				</Button>
				<Button className="mt-3" onClick={props.closeModel}>
					close
				</Button>
			</Form>
		</Container>
	);
};

export default UploadMOM;
