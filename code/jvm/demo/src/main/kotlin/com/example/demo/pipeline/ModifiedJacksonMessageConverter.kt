package com.example.demo.pipeline

import com.example.demo.Siren
import org.springframework.http.MediaType
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import java.lang.reflect.Type


class ModifiedJacksonMessageConverter : MappingJackson2HttpMessageConverter() {

    override fun canWrite(clazz: Class<*>, mediaType: MediaType?) =
        !Siren::class.java.isAssignableFrom(clazz) && super.canWrite(clazz, mediaType)

    override fun canWrite(type: Type?, clazz: Class<*>, mediaType: MediaType?) =
        !Siren::class.java.isAssignableFrom(clazz) && super.canWrite(type, clazz, mediaType)

    override fun getSupportedMediaTypes() = listOf(
        MediaType("application","json"),
        MediaType("application", "problem+json"),
    )
}
