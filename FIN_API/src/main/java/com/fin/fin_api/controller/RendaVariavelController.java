package com.fin.fin_api.controller;

import com.fin.fin_api.domain.investimento.rendavariavel.RegistroRendaVariavel;
import com.fin.fin_api.dto.RegistroRendaVariavelDTO;
import com.fin.fin_api.service.TotalRendaVariavelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/investimento/rendaVariavel")
public class RendaVariavelController {

    @Autowired
    TotalRendaVariavelService totalRendaVariavelService;

//    @GetMapping("/adicionar")
//    public ResponseEntity adicionarRendaVariavel(@RequestBody @Valid RegistroRendaVariavel registroRendaVariavel, UriComponentsBuilder uriBuilder){
//
//    }


}
