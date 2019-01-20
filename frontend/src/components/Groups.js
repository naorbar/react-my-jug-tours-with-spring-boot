import React, { Component } from 'react';
import '../App.css';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Container, Table } from 'reactstrap';
import Group from './Group';

class Groups extends Component {

	constructor() {
			super();
			this.state = {
				modal: false,
				new_group: {}
			}
			this.toggleModal = this.toggleModal.bind(this);
	}

	openAddNewGroupModal() {
			console.log("Add was clicked...");
			this.toggleModal();
	}

	handleSaveNewGroup(data) {
			console.log("Save was clicked...");

			fetch('/groups', {
			  method: 'POST', // or 'PUT'
			  body: JSON.stringify(this.state.new_group), // data can be `string` or {object}!
			  headers:{
			    'Content-Type': 'application/json'
			  }
				}).then(res => res.json())
				.then(response => console.log('Success:', JSON.stringify(response)))
				.catch(error => console.error('Error:', error));

			// Close the modal:
			this.toggleModal();

			// Trigger load from server on the parent with callback:
			this.props.loadGroupsFromServer();
	}

	loadGroupsFromServer() {
		// Trigger load from server on the parent with callback:
		this.props.loadGroupsFromServer();
	}

	toggleModal() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleInputChange(e) {
		/* Build the new_group json object: */
		var new_group = this.state.new_group;
		if (e.target.name === "groupName") {
			new_group.name = e.target.value;
		} else {
			new_group.title = e.target.value;
		}
		this.setState({
			new_group: new_group
		});
	}

	render() {
		var groups = this.props.groups;
		const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;

		return (
			<div>
			<Container fluid>
				<div className="float-right">
					<Button color="primary" onClick={() => this.openAddNewGroupModal()}>Add Group</Button>
				</div>
				<h3>Groups:</h3>

				{/* new group dialog: */}
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal} close={closeBtn}>Enter the Group details:</ModalHeader>
          <ModalBody>
						<Label for="title">Name</Label>
						<Input type="text" name="groupName" id="groupName" placeholder="Group Name" onChange={(e) => this.handleInputChange(e)}/>
						<Label for="title">Title</Label>
						<Input type="text" name="groupTitle" id="groupTitle" placeholder="Group Title" onChange={(e) => this.handleInputChange(e)}/>
			    </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSaveNewGroup()}>Save Group</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
				{/* List of groups: */}
				<Table bordered striped>
					<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Title</th>
						<th>Users</th>
						<th>Events</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
						{groups.map(g => <Group group={g} loadGroupsFromServer={this.loadGroupsFromServer.bind(this)}/>)}
					</tbody>
				</Table>
			</Container>
			</div>
		);
	}
}

export default Groups;
