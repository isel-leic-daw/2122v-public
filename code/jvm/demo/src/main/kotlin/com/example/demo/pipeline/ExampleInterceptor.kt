package com.example.demo.pipeline

import com.example.demo.VeryUsefulService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class ExampleInterceptor(
    private val service: VeryUsefulService
) : HandlerInterceptor {

    override fun preHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any): Boolean {

        logger.info("on preHandle")
        return true
    }

    override fun postHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        modelAndView: ModelAndView?
    ) {
        logger.info("on postHandle")
    }

    companion object {

        private val logger: Logger = LoggerFactory.getLogger(ExampleInterceptor::class.java)
    }

}