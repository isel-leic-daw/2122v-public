package com.example.demo

import com.example.demo.controllers.GreetingsService
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

private val logger = LoggerFactory.getLogger(DemoApplicationConfig::class.java)

@SpringBootApplication
class DemoApplicationConfig {

    @Bean
    fun getGreetingsService(): GreetingsService {

		logger.info("Creating GreetingsService")

        return object : GreetingsService {
            override fun greet() = "Hello from the greeting service"
        }
    }
}

fun main(args: Array<String>) {
    runApplication<DemoApplicationConfig>(*args)
}
