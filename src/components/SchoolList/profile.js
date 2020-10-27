import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import state from '../../state';

export default class Profile extends Component {
	key = -1;

	constructor(props) {
		super(props);
		this.state = {
			user: state.get('user'),
			logged: state.has('user'),
		};
	}

	componentDidMount() {
		this.key = state.listen('user', (user) => this.setState({ user }));
	}

	componentWillUnmount() {
		state.removeListener('user', this.key);
	}

	render() {
		const {
			name,
			address,
			province,
			district,
			type,
			phone,
			email,
			website,
			curricular_program,
			mission,
			vision,
			id,
		} = this.props.profile;
		return (
			<div>
				{this.state.logged &&
				(this.state.user.type === 'Admin' ||
					Number(this.state.user.id) === Number(id)) ? (
					<div className="text-center mt-5 mb-2">
						<Link
							className="btn btn-sm btn-warning"
							to={`/schools/${id}/edit`}
						>
							Edit
						</Link>
						<button
							type="button"
							className="btn btn-sm btn-danger"
							data-toggle="modal"
							data-target={`#delete${id}`}
						>
							Delete
						</button>
						<div
							class="modal fade"
							id={`delete${id}`}
							tabindex="-1"
							role="dialog"
							aria-labelledby={`delete${id}Label`}
							aria-hidden="true"
							style={{ zIndex: 9999 }}
						>
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5
											class="modal-title"
											id={`delete${id}Label`}
										>
											Delete {name}
										</h5>
										<button
											type="button"
											class="close"
											data-dismiss="modal"
											aria-label="Close"
										>
											<span aria-hidden="true">
												&times;
											</span>
										</button>
									</div>
									<div class="modal-body">
										Are you sure you want to delete {name}?
									</div>
									<div class="modal-footer">
										<button
											type="button"
											class="btn btn-danger btn-sm"
										>
											Delete
										</button>
										<button
											type="button"
											class="btn btn-secondary btn-sm"
											data-dismiss="modal"
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null}
				<div
					className={`text-center ${this.state.logged ? '' : 'mt-5'}`}
				>
					<h3>{name}</h3>
					<div className="h6 font-weight-300">{address}</div>
					<div>
						Province of {province} - District {district}
					</div>
					<div>
						School Type:
						{' ' + type}
					</div>
					<div>{phone}</div>
					<div>{email}</div>
					<a href={website}>{website}</a>
					<div className="mt-4">
						<h5>Mission</h5>
						<p>{mission}</p>
					</div>
					<div>
						<h5>Vision</h5>
						<p>{vision}</p>
					</div>
				</div>
				<div className="mt-5 py-5 border-top text-center">
					<div className="row justify-content-center">
						<div className="col-lg-9">
							<p>{curricular_program}</p>
							<a href={website}>Visit Website</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
