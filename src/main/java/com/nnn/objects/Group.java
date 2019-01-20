package com.nnn.objects;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "GROUPS")
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String title;

	@OneToMany
	private List<User> users;
	@OneToMany
	private List<Event> events;

	public Group() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public static class Builder {
		private String name;
		private String title;
		private List<Event> events;
		private List<User> users;

		public Builder withName(String name) {
			this.name = name;
			return this;
		}

		public Builder withTitle(String title) {
			this.title = title;
			return this;
		}

		public Builder withEvents(List<Event> events) {
			this.events = events;
			return this;
		}

		public Builder withUsers(List<User> users) {
			this.users = users;
			return this;
		}

		public Group build() {
			return new Group(this);
		}
	}

	private Group(Builder builder) {
		this.name = builder.name;
		this.title = builder.title;
		this.events = builder.events;
		this.users = builder.users;
	}
}
