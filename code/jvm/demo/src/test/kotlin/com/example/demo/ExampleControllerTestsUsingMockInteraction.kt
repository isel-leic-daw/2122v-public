package com.example.demo

import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest
@AutoConfigureMockMvc
class ExampleControllerTestsUsingMockInteraction {

    // We need to use field injection because construction is done by JUnit and not Spring context
    @Autowired
    private lateinit var client: MockMvc

    @Test
    fun `can GET on get0`() {
        // There is a valid client injected
        assertNotNull(client)

        client
            .perform(get("/examples/0"))
            .andExpect(status().isOk)
            .andExpect(content().string("Hello from the greeting service"))
    }
}