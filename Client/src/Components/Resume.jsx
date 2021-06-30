import React from 'react';
import { Table, Accordion, Card, Button } from 'react-bootstrap';
import '../css/resume.css';
import myPicutre from '../images/myPicture/myPicture.jpg';


function Resume() {
	return (
		<div className='resume'>
			<img className='myPicture' src={myPicutre} alt="myPicture" />
			<h1>Donghyun Kim</h1>
			<h6><li>Location: Calgary / AB / T3K 2Z6</li></h6>
			<h6><li>Mobile: 403-472-6707</li></h6>
			<h6><li>E-Mail: dean.kim0507@gmail.com</li></h6>
			<h6><li>LinkedIn: www.linkedin.com/in/donghyunkimdean</li></h6>

			<hr />

			<Accordion>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							Professional Profile
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<Table size="sm" striped bordered>
								<thead>
									<tr>
										<th><h3>Professional Profile</h3></th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<th scope="row"><h6>• Good research skill including identifying when research is required.</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• Object-Oriented Program: Java</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• Web programming languages: HTML, CSS, Java Script / React, Redux / NodeJS Express / JSP</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• Git: Github, AWS, Linux, Database: MongoDB, My SQL, SQL PLUS, PL/SQL.</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• Ability to work self-directed tasks with good time management skills.</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• Good written and verbal communication skills.</h6></th>
									</tr>
									<tr>
										<th scope="row"><h6>• English Fluent /  Korean Native</h6></th>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							Education
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<Table size="sm" striped bordered>
								<thead>
									<tr>
										<th><h3>Education</h3></th>
										<th><h5>Date</h5></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Southern Alberta Institute of Technology / Diploma
											<h6><li>Major - Software Development. </li>
												<li>Obj.-Oriented: Java, Web development, Data base design and Programming. </li>
												<li>Linux, Power Shell, Networking, Hardware Operating system, UX/UI Design </li>
												<li>Data Structure, Security, OS, Databasae Administration </li>
											</h6></th>
										<th><h6>Jan, 2020 - (2021.8)</h6></th>
									</tr>
									<tr>
										<th scope="row">Korea Coast Guard Academy
											<h6><li>Maritime Law Enforcement</li></h6>	</th>
										<th><h6>Aug 2014 – May 2015</h6></th>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							Work Experience
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							<Table size="sm" striped bordered>
								<thead>
									<tr>
										<th><h3>Work Experience</h3></th>
										<th><h5>Date</h5></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Programming Tutor
											<h6><li>Java Programming Tutor</li>
											</h6></th>
										<th><h6>Feb 2021 – Now</h6></th>
									</tr>
									<tr>
										<th scope="row">Senior Police Officer / Korea Coast Guard
											<h6><li>Investigation of maritime crimes.</li>
												<li>Safety management against maritime disaster.</li>
												<li>Prevention and response to marine pollution.</li>
											</h6></th>
										<th><h6>May 2015 – Aug 2021</h6></th>
									</tr>
									<tr>
										<th scope="row">Chief Petty Officer / Republic of Korea NAVY
											<h6><li>Navigation and Maintenance battle ship’s deck, Operation of deck machine.</li></h6>	</th>
										<th><h6>Mar 2008 – Mar 2014</h6></th>
									</tr>
									<tr>
										<th scope="row">Cashier / Family mart (Convenience store)
											<h6><li>Handled the cash register.</li></h6></th>
										<th><h6>Sep 2007 - Dec 2007</h6></th>
									</tr>
									<tr>
										<th scope="row">Sales Man / LG Electronics Inc
											<h6><li>Explained and sold the Electronics.</li></h6></th>
										<th><h6>July 2007 - Aug 2007</h6></th>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="3">
							Certificates
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="3">
						<Card.Body>
							<Table size="sm" striped bordered>
								<thead>
									<tr>
										<th><h3>Certificates</h3></th>
										<th><h5>Date</h5></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">Certification of  Engineer Information Processing
											<h6><li>DataBase practical ability to design databases, identify problems, and derive
												Improvements.
											</li>
												<li>Logical resolution of algorithms and data structures.</li>
												<li>Issued by Human Resources Development Service of Korea.</li>
											</h6></th>
										<th><h6>2013</h6></th>
									</tr>
									<tr>
										<th scope="row">Third Class Deck Officer(Navigator) Certificate
											<h6><li>Issued by DIRECTOR GENERAL OF PYEONGTAEK REGIONAL MARITIME AFFAIRS AND PORT OFFICE.</li></h6>	</th>
										<th><h6>2014</h6></th>
									</tr>
									<tr>
										<th scope="row">Craftsman Architectural Painting
											<h6><li>Issued by Human Resources Development Service of Korea.</li></h6></th>
										<th><h6>2014</h6></th>
									</tr>
									<tr>
										<th scope="row">Boat operator’s License
											<h6><li>Issued by Korea Coast Guard.</li></h6></th>
										<th><h6>2014</h6></th>
									</tr>
									<tr>
										<th scope="row">Open Water Diver
											<h6><li>Issued by PSA INTERNATIONAL.</li></h6></th>
										<th><h6>2018</h6></th>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
}

export default Resume;