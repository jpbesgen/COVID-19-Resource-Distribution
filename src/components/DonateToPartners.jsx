import React, { Component } from "react";
// import FormButton from './FormButton';

import FeelWelcome from "../img/feel_welcome.jpg";

import "../css/donate-to-partners.css";

class DonateToPartners extends Component {
	render() {
		return (
			<div className="form_step">
				<div className="form_label">
					Donate to our trusted partners:
				</div>
				<div className="partner_card__wrapper">
					<a
						href="https://www.feelwelcome.co/donate"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="partner_card">
							<img
								className="partner_image"
								src={FeelWelcome}
								alt=""
							/>
							<div className="partner_card__text">
								<p className="partner_card__title">
									FeelWelcome.co
								</p>
								<p className="partner_card__subtitle">
									Donate hand sanitizer directly to a local
									organization of your choice. All donations
									ship for free and funds cover manufacturing
									of sanitizer.
								</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		);
	}
}

export default DonateToPartners;
