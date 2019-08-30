package com.stackroute.keepnote.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exceptions.UserAlreadyExistsException;
import com.stackroute.keepnote.exceptions.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserService;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
public class UserController {

	/*
	 * Autowiring should be implemented for the UserService. (Use Constructor-based
	 * autowiring) Please note that we should not create an object using the new
	 * keyword
	 */
	@Autowired
	private UserService userservice;
	public UserController(UserService userservice) {
		this.userservice = userservice;
	}
	

	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations:
	 * 1. 201(CREATED) - If the user created successfully. 
	 * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	 * 
	 * This handler method should map to the URL "/user" using HTTP POST method
	 */
	/*@PostMapping("api/v1/user")
	public ResponseEntity<?> registerUser(@RequestBody User user){
		try {
			User usr = userservice.registerUser(user);
			if(usr!= null)
				return new ResponseEntity<User>(usr,HttpStatus.CREATED);
			else
				return new ResponseEntity<String>("User already exists",HttpStatus.CONFLICT);
		} catch (UserAlreadyExistsException e) {
			e.printStackTrace();
			return new ResponseEntity<String>("User already exists",HttpStatus.CONFLICT);
			
		}
	}*/
	@PostMapping("/api/v1/user")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		try {
			User registerUser = userservice.registerUser(user);
				return new ResponseEntity<String>("Successfull", HttpStatus.CREATED);
		}catch(UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	/*
	 * Define a handler method which will update a specific user by reading the
	 * Serialized object from request body and save the updated user details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the user updated successfully.
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP PUT method.
	 */
	@PutMapping("/api/v1/user/{id}")// -- pedning with one login condition
	public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String id,HttpSession session){
		
		
		//if(session.getAttribute("loggedInUserId").equals(id)) {
			try {
				User usr = userservice.updateUser(id,user);
				return new ResponseEntity<String>("User updated sucessfully",HttpStatus.OK);
			} catch (Exception e) {
				
				return new ResponseEntity<String>("User Not found with userId "+id,HttpStatus.NOT_FOUND);
			}
		/*}else {
			return new ResponseEntity<String>("Please login before update "+id,HttpStatus.UNAUTHORIZED);
		} */
	}
	/*
	 * Define a handler method which will delete a user from a database.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid userId without {}
	 */
	@DeleteMapping("/api/v1/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable String id,HttpSession session){
		//if(session.getAttribute("loggedInUserId").equals(id)) {
			try {
				if(userservice.deleteUser(id)) {
					return new ResponseEntity<String>("Sucessfully deleted",HttpStatus.OK);
				}
			} catch (UserNotFoundException e) {
				
				e.printStackTrace();
			}
			return new ResponseEntity<String>("User not found to delete",HttpStatus.NOT_FOUND);
	/*	}else {
			return new ResponseEntity<String>("Please login before update "+id,HttpStatus.UNAUTHORIZED);
		}*/
	}	
	/*
	 * Define a handler method which will show details of a specific user. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the user found successfully. 
	 * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
	 * This handler method should map to the URL "/api/v1/user/{id}" using HTTP GET method where "id" should be
	 * replaced by a valid userId without {}
	 */
	@GetMapping("/api/v1/user/{id}")
	public ResponseEntity<?> getUserById(@PathVariable String id){
		try {
			User user = userservice.getUserById(id);
			return new ResponseEntity<User>(user,HttpStatus.OK);
		} catch (UserNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	//sample 
/*	@GetMapping("user/all")
	public ResponseEntity<?> getAll(){
		userservice.getAllUsers();
		
	} */
}
