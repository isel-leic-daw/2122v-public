package com.example.demo.controllers

import com.example.demo.ClientIp
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI
import javax.servlet.http.HttpServletRequest

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
        "DAW"
    )

    @GetMapping("/3")
    fun get3() = ResponseEntity
        .status(202)
        .header("my-header", "my-value")
        .body(
            StudentOutputModel(
            "Alice",
            12345,
            "DAW"
        )
        )

    @GetMapping("/4")
    fun get4(clientIp: ClientIp) = "Hello ${clientIp.ipAddress}"

    @GetMapping("/5")
    fun get5(request: HttpServletRequest): String {
        val ipAddress = request.remoteAddr
        return "Hello $ipAddress"
    }

    @GetMapping("/6")
    fun get6() = URI.create("https://www.isel.pt")

}


