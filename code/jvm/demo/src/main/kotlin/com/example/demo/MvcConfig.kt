package com.example.demo

import com.example.demo.pipeline.ExampleArgumentResolver
import com.example.demo.pipeline.ExampleMessageConverter
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.stereotype.Component
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Component
class MvcConfig(
    private val interceptors: List<HandlerInterceptor>
) : WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        interceptors.forEach {
            registry.addInterceptor(it)
        }
    }

    override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
        resolvers.add(ExampleArgumentResolver())
    }

    override fun configureMessageConverters(converters: MutableList<HttpMessageConverter<*>>) {
        converters.add(ExampleMessageConverter())
    }
}