import './AdminProfile.css';
import { Fragment } from 'react';
import nitin from '../../assets/MentorProfileImages/Nitin.jpg';
const AdminProfile = () => {
	return (
		<Fragment>
			<section className="section about-section gray-bg" id="about">
				<div className="container">
					<div className="row align-items-center flex-row-reverse">
						<div className="col-lg-6">
							<div className="about-text go-to">
								<h3 className="dark-color">Nitin Deshpande</h3>

								<p>-Project Lead </p>
								<p> Industrial mentorship Program</p>
								<p> Keystone School Of Engineering</p>
								<div className="row about-list">
									<div className="col-md-6" />
									<div className="col-md-6" />
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about-avatar">
								<img src={nitin} title="" alt="" />
							</div>
						</div>
					</div>
					{/* <div className="counter">
						<div className="row">
							<div className="col-6 col-lg-3">
								<div className="count-data text-center">
									<h6 className="count h2" data-to="500" data-speed="500">
										100
									</h6>
									<p className="m-0px font-w-600">Happy Clients</p>
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<div className="count-data text-center">
									<h6 className="count h2" data-to="150" data-speed="150">
										10
									</h6>
									<p className="m-0px font-w-600">Project Completed</p>
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<div className="count-data text-center">
									<h6 className="count h2" data-to="850" data-speed="850">
										100
									</h6>
									<p className="m-0px font-w-600">Photo Capture</p>
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<div className="count-data text-center">
									<h6 className="count h2" data-to="190" data-speed="190">
										190
									</h6>
									<p className="m-0px font-w-600">Telephonic Talk</p>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</section>
		</Fragment>
	);
};

export default AdminProfile;
