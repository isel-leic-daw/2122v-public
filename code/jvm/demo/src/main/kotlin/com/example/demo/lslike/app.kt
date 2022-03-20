package com.example.demo.lslike

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.AnnotationConfigApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import java.time.Instant

val logger = LoggerFactory.getLogger("app")

class Request
class Response
interface DemoDataSource

interface Handler {
    fun handle(request: Request): Response
}

interface TransactionManager {
    // ... methods to access the DB
}

interface TimeService {
    fun now(): Instant
}

@Component
class MyTransactionManager(
    private val dataSource: DemoDataSource
): TransactionManager{

}

@Component
class MyTimeService : TimeService{
    override fun now(): Instant = Instant.now()
}

@Component
class GetCourseListHandler(
    private val tm: TransactionManager
) : Handler {
    override fun handle(request: Request): Response {
        TODO("Not yet implemented")
    }
}

@Component
class GetCourseDetailHandler(
    private val tm: TransactionManager
): Handler {
    override fun handle(request: Request): Response {
        TODO("Not yet implemented")
    }
}

@Component
class CreateCourseHandler(
    private val tm: TransactionManager
) : Handler {
    override fun handle(request: Request): Response {
        TODO("Not yet implemented")
    }
}

@Component
class GetTimeHandler(
    private val timeService: TimeService
) : Handler {
    override fun handle(request: Request): Response {
        TODO("Not yet implemented")
    }
}

@Component
class GreetingsHandler : Handler {
    override fun handle(request: Request): Response {
        // just says hello
        TODO("Not yet implemented")
    }
}

@Component
class Router(
    val handlers: List<Handler>
) {
    fun handle(request: Request): Response {
        TODO("Not yet implemented")
    }
}

@Configuration
@ComponentScan
class MyConfig {

    @Bean
    fun createDataSource(): DemoDataSource {
        return object : DemoDataSource {}
    }
}

