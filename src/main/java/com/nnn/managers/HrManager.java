package com.nnn.managers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nnn.objects.Group;
import com.nnn.objects.User;
import com.nnn.repositories.GroupRepository;
import com.nnn.repositories.UserRepository;

@Component
public class HrManager {

	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Group> getAllGroupsStatic() {
		List<Group> list = new ArrayList<Group>();
		list.add(new Group.Builder().withName("Naor Bar").withTitle("").build());
		list.add(new Group.Builder().withName("Naor Bar 2").withTitle("TL").build());
		return list;
	}
	
	public Iterable<Group> getAllGroups() {
		return groupRepository.findAll();
	}

	public Optional<Group> getGroupById(long id) {
		return groupRepository.findById(id);
	}

	public Group addGroup(Group group) {
		return groupRepository.save(group);
	}
	
	public Group updateGroup(Group group) {
		return groupRepository.save(group);
	}
	
	public void deleteGroup(Group group) {
		groupRepository.delete(group);
	}
	
	public Group addUserToGroup(Group group, User user) {
		userRepository.save(user); // if not exists
		group.getUsers().add(user);
		return groupRepository.save(group);
	}
	
	public Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> getUserById(long id) {
		return userRepository.findById(id);
	}
	
	public User saveUserWithFlush(User user) {
		return userRepository.saveAndFlush(user);
	}
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
}
