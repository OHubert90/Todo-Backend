package com.github.r1d3r90.todobackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todo")
    public Todo postTodo(@RequestBody Todo todo) {
        return todoService.postTodo(todo);
    }

    @GetMapping("/todo")
    public List<Todo> getAllTodos() {
        return todoService.findAll();
    }
}
