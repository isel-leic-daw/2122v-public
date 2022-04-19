package com.example.demo

import org.springframework.http.MediaType
import java.net.URI

data class ProblemJsonModel(
    val type: URI,
    val title: String? = null,
) {
    companion object {
        val MEDIA_TYPE = MediaType.parseMediaType("application/problem+json")
    }
}
