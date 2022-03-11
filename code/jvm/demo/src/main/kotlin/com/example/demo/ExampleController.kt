package com.example.demo

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.websocket.server.PathParam

interface GreetingsService {
    fun greet(): String
}

@RestController
@RequestMapping("/examples")
class ExampleController(
    private val greetingsService: GreetingsService
) {

    @GetMapping("/0")
    fun get0() = greetingsService.greet()

    @GetMapping("/1/{id}")
    fun get1(@PathVariable id: Int) = "Request done with $id"

    @GetMapping("/2")
    fun get2() = StudentOutputModel(
        "Alice",
        12345,
    )

    @GetMapping("/3")
    fun get3() = ResponseEntity
        .status(202)
        .header("my-header", "my-value")
        .body(StudentOutputModel(
            "Alice",
            12345
        ))
}

data class StudentOutputModel(
    val name: String,
    val number: Int,
)

