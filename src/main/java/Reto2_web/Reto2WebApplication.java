package Reto2_web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import Reto2_web.repository.crud.FraganceCrudRepository;
import Reto2_web.repository.crud.UserCrudRepository;

@Component
@SpringBootApplication
public class Reto2WebApplication implements CommandLineRunner {

	@Autowired
	private UserCrudRepository userCrudRepository;

	@Autowired
	private FraganceCrudRepository fraganceCrudRepository;

	public static void main(String[] args) {
		SpringApplication.run(Reto2WebApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
		userCrudRepository.deleteAll();
		fraganceCrudRepository.deleteAll();
	}

}
