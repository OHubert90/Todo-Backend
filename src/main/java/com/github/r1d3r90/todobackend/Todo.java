package com.github.r1d3r90.todobackend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public record Todo(String id, String description, String status) {

}



