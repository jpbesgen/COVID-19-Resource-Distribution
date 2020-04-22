import React from 'react';
import Navbar from './Navbar';

const About = () => {
	return (
		<div>
			<Navbar />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>About Us</h1>
				<p style={style.Text}>
					We are a team of college students and recent graduates who hope to
					create and mobilize a community of makers, manufacturers, and
					designers to help close the increasingly large gaps within the medical
					supply chain in the United States. Currently, many Americans feel
					trapped at home helpless watching as household after household falls
					to the tragedy of the COVID-19 pandemic. We hope to revitalize that
					current despair and restlessness into the resolve and grit of the
					American people that has pulled America through every crisis. As our
					grandparents collected cans for bullets and rolled bandages for first
					aid kits in WW2, we hope that we will see individual Americans and
					small businesses mobilize to open source the designs for vital medical
					equipment, sew surgical masks, construct gowns, build face shields,
					and 3D print much-needed materials for the battle we now face against
					COVID-19.
				</p>
				<p style={style.BoldText}>
					Our team consists of the following people in the following roles:
				</p>

				<h3 style={style.Header3}>Leads</h3>
				<p style={style.Text}>
					<b style={style.Bold}>John Miller</b> - UC Berkeley Economics w/ minor
					in Data Science
					<br />
					Role: Project Lead - Product Management and Design
					<br />
					<a href="https://www.linkedin.com/in/john-joseph-miller-ab4796137/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:johnjamiller@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>
				<p style={style.Text}>
					<b style={style.Bold}>Joseph Besgen</b> - UC Berkeley Electrical
					Engineering and Computer Science w/ minor in Mechanical Engineering
					<br />
					Role: Project Lead - Technical Organization
					<br />
					<a href="https://www.linkedin.com/in/jpbesgen/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:jpbesgen@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<h3 style={style.Header3}>Strategy</h3>
				<p style={style.Text}>
					<b style={style.Bold}>James Zamora</b> - Program Manager, Office of
					the CTO at VMWare
					<br />
					Role: Product Strategy
					<br />
					<a href="https://www.linkedin.com/in/jazammm/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="maito:james.z.zamora@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<h3 style={style.Header3}>Engineers</h3>
				<p style={style.Text}>
					<b style={style.Bold}>Alex Madrzyk</b> - Infrastructure Software
					Engineer at Slack
					<br />
					Role: Full-Stack Engineer
					<br />
					<a href="http://linkedin.com/in/alexmadrzyk">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:alexmadrzyk@gmail.com">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Gunner Spencer</b> - UC Santa Cruz Computer
					Science
					<br />
					Role: Full-Stack Engineer
					<br />
					<a href="https://www.linkedin.com/in/gunner-spencer-822551178/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:gunn686@gmail.com">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Samarth Goel</b> - UC Berkeley Double Major in
					Computer Science and Business Administration
					<br />
					Role: Frontend Engineer
					<br />
					<a href="http://linkedin.com/in/samarth-goel-07">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:sgoel9@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Nikhil Yerasi</b> - UC Berkeley Data Science
					<br />
					Role: Frontend Engineer
					<br />
					<a href="https://www.linkedin.com/in/nyerasi/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:nyerasi@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Clark Palmer</b> - UC Berkeley Computer Science
					<br />
					Role: Frontend Engineer/UI UX Design
					<br />
					<a href="https://www.linkedin.com/in/clarkpalmer/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:clark.palmer@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Ervin Baccay</b> - UC Berkeley Double Major in
					Electrical Engineering and Computer Science and Bioengineering
					<br />
					Role: Backend Engineer
					<br />
					<a href="https://www.linkedin.com/in/ebaccay/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:ebaccay@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<h3 style={style.Header3}>Designers</h3>
				<p style={style.Text}>
					<b style={style.Bold}>Victoria Li</b> - UC Berkeley Computer Science
					w/ minor in Data Science
					<br />
					Role: UI/UX Design
					<br />
					<a href="http://linkedin.com/in/victoriayli/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:victoria.li@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Manooshree Patel</b> - UC Berkeley
					Bioengineering w/ minor in Electrical Engineering and Computer Science
					<br />
					Role: UI/UX Design
					<br />
					<a href="https://www.linkedin.com/in/manooshree-patel-894b82132/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:manooshreepatel@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Leilani Chu</b> - UC Berkeley Cellular and
					Molecular Biology w/ minor in Ethnic Studies
					<br />
					Role: UI/UX Design
					<br />
					<a href="https://www.linkedin.com/in/leilani-chu-342563130/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:leilanic@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<h3 style={style.Header3}>User Researchers</h3>
				<p style={style.Text}>
					<b style={style.Bold}>Allan Lee</b> - UC Berkeley Bioengineering
					<br />
					Role: User Research
					<br />
					<a href="https://www.linkedin.com/in/allan-lee-22a0a614a/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:allanlee815@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Katrina Gonzales</b> - UC Berkeley Public Health
					<br />
					Role: User Research
					<br />
					<a href="mailto:katrinagon@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>
				<p style={style.Text}>
					<b style={style.Bold}>Joseph Schroer</b> - Process Development
					Engineer at Genentech
					<br />
					Role: Business/User Research
					<br />
					<a href="http://www.linkedin.com/in/joseph-schroer">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:joseph.schroer1@gmail.com">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<h3 style={style.Header3}>Marketing</h3>
				<p style={style.Text}>
					<b style={style.Bold}>Taylor Rimell</b> - UC Berkeley Business
					Administration
					<br />
					Role: Marketing Lead
					<br />
					<a href="https://www.linkedin.com/in/taylor-rimell-85476b146">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:Taylorrimell@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Connor Smith</b> - UC Berkeley Business
					Administration
					<br />
					Role: Marketing Lead
					<br />
					<a href="https://www.linkedin.com/in/connordsmith/">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="2rem"
							height="2rem"
						>
							<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
						</svg>
					</a>
					<a href="mailto:connorsmith@berkeley.edu">
						<svg
							fill="#7A98AF"
							xmlns="http://www.w3.org/2000/svg"
							width="2rem"
							height="2rem"
							viewBox="0 0 24 24"
						>
							<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
						</svg>
					</a>
				</p>
			</section>
		</div>
	);
};

let style = {
	BodyContent: {
		backgroundColor: 'white',
		paddingBottom: '3rem',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '3.5rem',
		marginLeft: '9.25%',
		paddingTop: '52px',
		color: '#3B628B',
	},
	Header3: {
		fontWeight: '300',
		marginLeft: '9.25%',
		marginTop: '52px',
		color: '#3B628B',
	},
	Text: {
		fontSize: '1.25rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: 'black',
	},
	BoldText: {
		fontSize: '1.25rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: 'black',
		fontSeight: '400',
	},
	Bold: {
		fontSeight: '400',
	},
};

export default About;
