import React, { useState, useEffect, Fragment } from 'react';
import './PendingAssignment.css';
import { Link } from 'react-router-dom';
import PendingAssignmentData from './PendingAssignmentData';
import StudyMaterialHeaderImg from '../../../assets/assignment.png';
import axios from 'axios';
import Cookies from 'universal-cookie';
import DateConverter from '../../../HelpingFunctions/DateConverter';
import Snackbar from '@mui/material/Snackbar';
import { RxCross2 } from 'react-icons/rx';
import LogoutLoader from '../../../HelpingFunctions/LogoutLoader';
import CircularColor from '../../../HelpingFunctions/Loader';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import UploadMOM from './UploadMOM';

function Assignments(Props) {
	const { refresher, setRefresher } = Props;
	const [ selected, setSelected ] = useState('');
	const { studentData, setUploadSelector } = Props;
	// console.log(studentData.data.data.Coordinator);
	const [ listOfMeetings, setListOfMeetings ] = useState('');
	const Coordinator_Status = studentData.data.data.Coordinator;
	const [ loading, setLoading ] = useState(true);
	const [ topicName, setTopicName ] = useState('');
	const [ Desc, setDesc ] = useState('');
	const [ Pdata, setPdata ] = useState([]);
	const [ Adata, setAdata ] = useState([]);
	//
	const BASEURL = process.env.REACT_APP_SAMPLE;
	const cookies = new Cookies();
	//

	//
	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let currentDate = `${day}-${month}-${year}`;
	//
	// for snackBar
	const [ open, setOpen ] = useState(false);
	const [ snackbarMsg, setSnackbarMsg ] = useState();
	const [ snackbarClassName, setSnackbarClassName ] = useState();
	const [ momOpen, setOpenMom ] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const openMomUpload = () => {
		setOpenMom(true);
	};
	const closeMomUpload = () => {
		setOpenMom(false);
	};
	const gridOptions = {
		columnDefs: [
			{
				field: 'TopicName',
				width: 250,
				sortable: true,
				filter: true,
				resizable: true,
				headerName: 'Name'
			},
			{
				field: 'Location',
				width: 250,
				sortable: true,
				filter: true,
				resizable: true,
				headerName: 'Location'
			},
			{
				field: 'MinutesOfMeeting',
				width: 220,
				sortable: true,
				filter: true,
				resizable: true,
				headerName: 'Minutes Of Meeting',

				cellRenderer: function(params) {
					console.log(params.value);
					return params.value ? (
						<a target="_blank" href={params.value}>
							View
						</a>
					) : null;
				}
			},
			{
				field: '_id',
				width: 220,
				sortable: true,
				filter: true,
				resizable: true,
				headerName: 'Minutes Of Meeting Upload',
				cellRenderer: function(params) {
					return (
						<Button
							onClick={(e) => {
								setSelected(params.data);
								openMomUpload();
							}}
						>
							Upload
						</Button>
					);
				}
			}
		]
	};

	useEffect(() => {
		fetchMeetingDetails();
	}, []);

	const action = (
		<button onClick={handleClose}>
			<RxCross2 />
		</button>
	);

	const fetchMeetingDetails = async (data) => {
		try {
			const url = `${BASEURL}/GetMeetingDetailsOnMentorName/` + studentData.data.data.Student_Group;

			const response = await axios.get(
				url,
				{},
				{
					headers: {
						Authorization: cookies.get('KeyToken')
					}
				}
			);
			console.log(response.data.approvedMeetings);
			setListOfMeetings({ data: response.data });
		} catch (error) {
			console.log(error);
		}
	};

	const handleUploadStudent = async (event) => {
		// event.preventDefault();
		const UserData = await axios.post(
			`${BASEURL}/UploadAssignmentByCords`,
			{
				Res_Topic_Name: topicName,
				Res_Desc: Desc,
				Res_Mentor_Name: studentData.data.data.Student_Mentor_Name,
				Res_Coordinator_Name: studentData.data.data.Student_Name,
				Res_Coordinator: studentData.data.data.Coordinator,
				Res_Group_Name: studentData.data.data.Student_Group,
				Res_Upload_Date: date
			},
			{
				headers: {
					Authorization: cookies.get('KeyToken')
				}
			}
		);
		if (UserData) {
			// event.preventDefault();
			// console.log("8888888", UserData);
			setOpen(true);
			setSnackbarMsg('Submission Request Created');
			setSnackbarClassName('valid');
		}
	};
	//
	const handelpending = async () => {
		const PendingData = await axios.post(
			`${BASEURL}/ViewAssigmentsByStudent`,
			{
				Res_Group_Name: studentData.data.data.Student_Group,
				Res_Student_Name: studentData.data.data.Student_Name
			},
			{
				headers: {
					Authorization: cookies.get('KeyToken')
				}
			}
		);
		if (PendingData) {
			setPdata(PendingData.data.data);
			setAdata(PendingData.data.data2);
			setLoading(false);
			// console.log("77", Pdata);
			// console.log("77", Adata);
		}
	};
	useEffect(
		() => {
			handelpending();
		},
		[ loading ]
	);
	//
	return (
		<Fragment>
			{loading ? (
				<Fragment>
					<div>
						<CircularColor />
						<LogoutLoader refresher={refresher} setRefresher={setRefresher} />
					</div>
				</Fragment>
			) : (
				<Fragment>
					{' '}
					<div>
						<Snackbar
							className={snackbarClassName}
							sx={{ width: '310px' }}
							open={open}
							autoHideDuration={5000}
							onClose={handleClose}
							action={action}
							message={snackbarMsg}
							anchorOrigin={{
								vertical: 'Bottom',
								horizontal: 'left'
							}}
						/>
						<div className="container">
							<h2 className="pageHeading text-center ">Pending Assignment</h2>
							<div className="card mt-4 p-4">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">Sr.no</th>
											<th scope="col" className="topicname">
												Topic Name
											</th>
											<th scope="col" className="date">
												Date Of Post
											</th>
											<th scope="col" className="description">
												Description
											</th>
											<th scope="col" className="text-center">
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{Pdata.map((item, index) => {
											// console.log("item", item);
											if (item.Approved === true) {
												return (
													<tr>
														<td scope="row">{index + 1}</td>
														<td>{item.Topic_Name}</td>
														<td>{DateConverter(item.Upload_Date, 'Date')}</td>
														<td>{item.Desc}</td>
														<td>
															<Link to="/assignmentsubmission">
																<button
																	className="btn btn-primary"
																	onClick={() => {
																		setUploadSelector(item);
																	}}
																>
																	SUBMIT
																</button>
															</Link>
														</td>
													</tr>
												);
											}
										})}
									</tbody>
								</table>
							</div>
						</div>

						{/*  */}
						<div className="container">
							<h2 className="pageHeading text-center ">Approved Assignments</h2>
							<div className="card mt-4 p-4">
								<table className="table">
									<thead>
										<tr>
											<th scope="col">Sr.no</th>
											<th scope="col" className="topicname">
												Topic Name
											</th>
											<th scope="col" className="date">
												Date Of Post
											</th>
											<th scope="col" className="description">
												Approved Date
											</th>
											<th scope="col" className="text-center">
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{Adata.map((item, index) => {
											// console.log("Adata", Adata);
											if (item.Approved === true) {
												return (
													<tr>
														<td scope="row">{index + 1}</td>
														<td>{item.Topic_Name}</td>
														<td>{DateConverter(item.Upload_Date, 'Date')}</td>
														<td>{DateConverter(item.ApprovedDate, 'Date')}</td>
														<td>
															<a href={item.Link} target="_blank">
																<button className="btn btn-primary">VIEW</button>
															</a>
														</td>
													</tr>
												);
											}
										})}
									</tbody>
								</table>
							</div>
						</div>
						{/*  */}
					</div>
					{/* for upload new assignments by coordinator */}
					<h2 className="pageHeading text-center ">Coordinator Section</h2>
					{Coordinator_Status ? (
						<Fragment>
							{' '}
							<div className="container">
								<div className="studymaterial-card">
									<div className="row">
										<h3 className="text-center mb-3">Upload Assignment for Group</h3>
										<div className="col-md-6">
											<img
												className="study-material-img mx-auto d-block"
												src={StudyMaterialHeaderImg}
												alt=""
											/>
										</div>
										<div className="col-md-6 mt-5">
											<form>
												<div className="mb-3">
													<input
														type="text"
														className="form-control"
														value={` Mentor Name : ${studentData.data.data
															.Student_Mentor_Name}`}
														disabled
													/>
												</div>
												<div className="mb-3">
													<input
														type="text"
														className="form-control"
														value={` Coordinator Name : ${studentData.data.data
															.Student_Name}`}
														disabled
													/>
												</div>
												<div className="mb-3">
													<input
														type="text"
														className="form-control"
														value={` Group Name : ${studentData.data.data.Student_Group}`}
														disabled
													/>
												</div>
												<div className="mb-3">
													<input
														type="text"
														className="form-control"
														required
														placeholder="Topic Name"
														value={topicName}
														onChange={(Event) => {
															setTopicName(Event.target.value);
														}}
													/>
												</div>
												<div className="mb-3">
													<input
														type="date"
														className="form-control"
														required
														placeholder=""
													/>
												</div>
												<div className="mb-3">
													<input
														type="text"
														className="form-control"
														required
														placeholder="Description about the assignment submission !"
														value={Desc}
														onChange={(Event) => {
															setDesc(Event.target.value);
														}}
													/>
												</div>
												<button
													className="button-add-material w-100 mt-5 mb-3"
													type="Submit"
													onClick={() => {
														handleUploadStudent();
													}}
												>
													<i className="fa-solid fa-right-to-bracket" />Assign New Submission
												</button>
											</form>
										</div>
									</div>
								</div>
								<div className="studymaterial-card">
									<div className="row">
										<h2 className="pageHeading text-center ">M.O.M Upload</h2>
										<div className="ag-theme-alpine" style={{ height: 400 }}>
											<AgGridReact
												rowData={listOfMeetings.data.approvedMeetings}
												gridOptions={gridOptions}
											/>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					) : null}
				</Fragment>
			)}
			<Modal
				size="lg"
				show={momOpen}
				onHide={closeMomUpload}
				backdrop="static"
				keyboard={false}
				supportedorientations={[ 'portrait', 'landscape' ]}
			>
				<Modal.Header closeButton>
					<Modal.Title>Upload MOM</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UploadMOM assignment={selected} closeModel={closeMomUpload} />
				</Modal.Body>
			</Modal>
		</Fragment>
	);
}

export default Assignments;
