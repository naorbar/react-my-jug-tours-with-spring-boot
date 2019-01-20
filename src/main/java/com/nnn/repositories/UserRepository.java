package com.nnn.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.nnn.objects.User;

//public interface UserRepository extends CrudRepository<User, Long> {
public interface UserRepository extends JpaRepository<User, Long> {

}
