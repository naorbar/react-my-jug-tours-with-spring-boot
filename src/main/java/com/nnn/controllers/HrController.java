package com.nnn.controllers;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.ForkJoinPool;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.nnn.managers.HrManager;
import com.nnn.objects.Group;
import com.nnn.objects.User;

@RestController
public class HrController {

	@Autowired
	private HrManager hrManager;

	@GetMapping(path = "/test")
	public String test() {
		return "HELLO, The server time is " + new Date();
	}

	@GetMapping(path = "/groups_static")
	public Iterable<Group> getGroupsStaticList() {
		return hrManager.getAllGroupsStatic();
	}

	@GetMapping(path = "/groups")
	public Iterable<Group> getGroups() {
		return hrManager.getAllGroups();
	}

	@GetMapping(path = "/groups/{id}")
	public Optional<Group> getGroupById(@PathVariable long id) {
		return hrManager.getGroupById(id);
	}

	@PostMapping(path = "/groups")
	public Group addGroup(@RequestBody Group user) {
		return hrManager.addGroup(user);
	}

	@PutMapping(path = "/groups")
	public Group updateGroup(@RequestBody Group group) {
		return hrManager.updateGroup(group);
	}

	@DeleteMapping(path = "/groups")
	public void deleteUser(@RequestBody Group group) {
		hrManager.deleteGroup(group);
	}

	@GetMapping(path = "/add_user_to_group_static")
	public Group addUserToGroupStatic() {
		Group group = hrManager.getGroupById(1).get();
		User user = new User.Builder().withName("NEW_NAME").withTitle("NEW_TITLE").build();
		return hrManager.addUserToGroup(group, user);
	}

	@GetMapping(path = "/users")
	public Iterable<User> getUsers() {
		return hrManager.getAllUsers();
	}

	@GetMapping(path = "/users/{id}")
	public Optional<User> getUserById(@PathVariable long id) {
		return hrManager.getUserById(id);
	}

	@PostMapping(path = "/users")
	public User saveUser(@RequestBody User user) {
		return hrManager.saveUser(user);
	}

	@PostMapping(path = "/users_flush")
	public User saveUserWithFlush(@RequestBody User user) {
		return hrManager.saveUserWithFlush(user);
	}

	@GetMapping("/sync")
	public ResponseEntity<?> sync() {
		System.out.println("Received a sync request");
		return ResponseEntity.ok("sync ok");
	}

	@GetMapping("/async")
	public DeferredResult<ResponseEntity<?>> async() {
		System.out.println("Received an async request");
		DeferredResult<ResponseEntity<?>> output = new DeferredResult<>();

		ForkJoinPool.commonPool().submit(() -> {
			System.out.println("Processing in separate thread");
			try {
				Thread.sleep(6000);
			} catch (InterruptedException e) {
				//
			}
			output.setResult(ResponseEntity.ok("async ok"));
		});

		System.out.println("servlet thread freed");
		return output;
	}
}
