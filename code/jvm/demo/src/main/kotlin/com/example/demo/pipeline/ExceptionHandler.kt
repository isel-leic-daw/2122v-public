package com.example.demo.pipeline

import com.example.demo.ProblemJsonModel
import com.example.demo.SomeDomainException
import org.springframework.beans.TypeMismatchException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.net.URI

@ControllerAdvice
class CustomExceptionHandler : ResponseEntityExceptionHandler() {

    override fun handleMethodArgumentNotValid(
        ex: MethodArgumentNotValidException,
        headers: HttpHeaders,
        status: HttpStatus,
        request: WebRequest,
    ) : ResponseEntity<Any> {

        logger.info("Handling MethodArgumentNotValidException")
        return ResponseEntity
            .status(404)
            .contentType(ProblemJsonModel.MEDIA_TYPE)
            .body(ProblemJsonModel(
                type = URI("https://example.org/problems/not-found")))
    }

    override fun handleTypeMismatch(
        ex: TypeMismatchException,
        headers: HttpHeaders,
        status: HttpStatus,
        request: WebRequest,
    ) : ResponseEntity<Any> {

        logger.info("Handling TypeMismatchException")
        return ResponseEntity
            .status(404)
            .contentType(ProblemJsonModel.MEDIA_TYPE)
            .body(ProblemJsonModel(
                type = URI("https://example.org/problems/not-found")))
    }

    @ExceptionHandler(SomeDomainException::class)
    fun handleSomeDomainException(ex: Exception, request: WebRequest): ResponseEntity<Any> {
        logger.info("Handling SomeDomainException")
        return ResponseEntity
            .status(400)
            .contentType(ProblemJsonModel.MEDIA_TYPE)
            .body(ProblemJsonModel(
                type = URI("https://example.org/problems/some-domain-problem")))
    }

}