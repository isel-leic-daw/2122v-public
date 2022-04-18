package com.example.demo

import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ExampleControllerTestsUsingHttpInteraction {

    // We need to use field injection because construction is done by JUnit and not Spring context
    @Autowired
    private lateinit var client: TestRestTemplate

    @LocalServerPort
    private var port: Int = 0

    @Test
    fun `can GET on get0`() {
        // There is a valid client injected
        assertNotNull(client)

        // Use the injected client to do the request
        val body = client.getForObject("http://localhost:$port/examples/0", String::class.java)

        assertEquals("Hello from the greeting service", body)
    }
}