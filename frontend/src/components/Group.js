import React, { Component } from 'react';
import '../App.css';

import { Button, Alert, Label, Input, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Group extends Component {

	constructor() {
			super();
			this.state = {
				modal_edit: false,
				modal_delete: false,
				edited_group: {}
			}
	}

	componentDidMount() {
		this.setState({
			edited_group: this.props.group
		});
	}

	handleEdit(groupId) {
		console.log("Edit was clicked..." + groupId);
		this.toggleModalEdit();
	}

	handleEditGroup(data) {
			console.log("Save was clicked...");

			fetch('/groups', {
			  method: 'POST', // or 'PUT'
			  body: JSON.stringify(this.state.edited_group), // data can be `string` or {object}!
			  headers:{
			    'Content-Type': 'application/json'
			  }
				}).then(res => res.json())
				.then(response => console.log('Success:', JSON.stringify(response)))
				.catch(error => console.error('Error:', error));

			// Close the modal:
			this.toggleModalEdit();

			// Trigger load from server on the parent with callback:
			this.loadGroupFromServer(this.state.edited_group.id);
	}

	loadGroupFromServer(id) {
		// Get data from the server:
		// It works when adding this line to package.json:
		//  "proxy": "http://localhost:8080",
		fetch("/groups/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            edited_group: result
          });
        },
        (error) => {
          console.log("Failed to get data from the server: " + error);
        }
      )
	}

	handleDelete(groupId) {
		console.log("Delete was clicked..." + groupId);
		this.toggleModalDelete();
	}

	handleDeleteGroup(groupId) {
		console.log("Delete was clicked..." + groupId);

		fetch('/groups', {
			method: 'DELETE',
			body: JSON.stringify(this.state.edited_group), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
			}).then(res => res.json())
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));

		this.props.loadGroupsFromServer();
		this.toggleModalDelete();
	}

	toggleModalEdit() {
		this.setState({
			modal_edit: !this.state.modal_edit
		});
	}

	toggleModalDelete() {
		this.setState({
			modal_delete: !this.state.modal_delete
		});
	}

	handleInputChange(e) {
		/* Build the edited_group json object: */
		var edited_group = this.state.edited_group;
		if (e.target.name === "groupName") {
			edited_group.name = e.target.value;
		} else if (e.target.name === "groupTitle") {
			edited_group.title = e.target.value;
		}
		this.setState({
			edited_group: edited_group
		});
	}

	render() {
		const closeBtnEdit = <button className="close" onClick={() => this.toggleModalEdit()}>&times;</button>;
		const closeBtnDelete = <button className="close" onClick={() => this.toggleModalDelete()}>&times;</button>;

		var users = this.state.edited_group.users;
		if (users === undefined)
			users = [];
		var events = this.state.edited_group.events;
		if (events === undefined)
			events = [];

		return (
			<tr>
				<td>{this.state.edited_group.id}</td>
				<td>{this.state.edited_group.name}</td>
				<td>{this.state.edited_group.title}</td>
				<td>{users.map(u => <div>{u.name}</div>)}</td>
				<td>{events.map(e => <div>{e.name}</div>)}</td>
				<td>
					<Button color="info" onClick={() => this.handleEdit(this.state.edited_group.id)}>Edit</Button>
					{/* edit group dialog: */}
					<Modal isOpen={this.state.modal_edit} toggle={() => this.toggleModalEdit()}>
						<ModalHeader toggle={() => this.toggleModalEdit()} close={closeBtnEdit}>Edit the Group details:</ModalHeader>
						<ModalBody>
							<Label for="groupId">ID</Label>
							<Input type="text" name="groupId" id="groupId" placeholder={this.state.edited_group.id} disabled/>
							<Label for="title">Name</Label>
							<Input type="text" name="groupName" id="groupName" placeholder={this.state.edited_group.name} onChange={(e) => this.handleInputChange(e)}/>
							<Label for="title">Title</Label>
							<Input type="text" name="groupTitle" id="groupTitle" placeholder={this.state.edited_group.title} onChange={(e) => this.handleInputChange(e)}/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={() => this.handleEditGroup(this.state.edited_group.id)}>Save Group</Button>{' '}
							<Button color="secondary" onClick={() => this.toggleModalEdit()}>Cancel</Button>
						</ModalFooter>
					</Modal>

					<Button color="danger" onClick={() => this.handleDelete(this.state.edited_group.id)}>Delete</Button>
					{/* delete group dialog: */}
					<Modal isOpen={this.state.modal_delete} toggle={() => this.toggleModalDelete()}>
						<ModalHeader toggle={() => this.toggleModalDelete()} close={closeBtnDelete}>Delete Group:</ModalHeader>
						<ModalBody>
							<Label for="groupId">Are you sure you want to delete group {this.state.edited_group.id}?</Label>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={() => this.handleDeleteGroup(this.state.edited_group.id)}>Yes, I'm Sure!</Button>{' '}
							<Button color="secondary" onClick={() => this.toggleModalDelete()}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</td>
			</tr>
		);
	}
}

export default Group;
