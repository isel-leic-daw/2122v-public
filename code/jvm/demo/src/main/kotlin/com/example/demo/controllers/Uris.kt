package com.example.demo.controllers

import org.springframework.web.util.UriTemplate


object Uris {

    object Examples {

        object Resource1 {
            const val PATH = "/1/{id}"
            private val TEMPLATE = UriTemplate(PATH)
            fun make(id: Int) = TEMPLATE.expand(mapOf("id" to id))
        }
    }
}