package com.example.demo

import com.example.demo.pipeline.ExampleArgumentResolver
import com.example.demo.pipeline.ExampleMessageConverter
import com.example.demo.pipeline.ModifiedJacksonMessageConverter
import com.example.demo.pipeline.SirenMessageConverter
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import org.springframework.http.MediaType
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.stereotype.Component
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer
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

        converters.removeIf{ it is MappingJackson2HttpMessageConverter}

        converters.add(SirenMessageConverter())
        converters.add(ModifiedJacksonMessageConverter().apply {
            objectMapper.apply {
                propertyNamingStrategy = PropertyNamingStrategies.SNAKE_CASE
                setSerializationInclusion(JsonInclude.Include.NON_NULL)
            }
        })
    }
}