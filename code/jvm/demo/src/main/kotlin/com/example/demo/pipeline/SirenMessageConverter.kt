package com.example.demo.pipeline

import com.example.demo.Siren
import org.springframework.http.MediaType
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter


class SirenMessageConverter : MappingJackson2HttpMessageConverter() {

    override fun canWrite(clazz: Class<*>, mediaType: MediaType?) =
        (mediaType == null || mediaType== MEDIA_TYPE) && Siren::class.java.isAssignableFrom(clazz)

    override fun canWrite(mediaType: MediaType?) = mediaType == null || mediaType == MEDIA_TYPE

    override fun getSupportedMediaTypes() = listOf(MEDIA_TYPE)

    companion object {
        val MEDIA_TYPE = MediaType("application", "vnd.siren+json")
    }
}