package com.example.demo.pipeline

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.util.StopWatch
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class ExampleFilter : Filter {

    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse,
        chain: FilterChain) {

        val stopWatch = StopWatch()
        stopWatch.start()
        val httpRequest = request as HttpServletRequest
        val httpResponse = response as HttpServletResponse
        val method = httpRequest.method
        val uri = httpRequest.requestURI
        chain.doFilter(request, response)
        val status = httpResponse.status
        stopWatch.stop()
        val elapsed = stopWatch.lastTaskTimeMillis
        logger.info("Request: method={}, uri={}, status={}, duration={}",
            method, uri, status, elapsed);
    }

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(ExampleFilter::class.java)
    }
}