package com.github.r1d3r90.todobackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo,String>{
}
