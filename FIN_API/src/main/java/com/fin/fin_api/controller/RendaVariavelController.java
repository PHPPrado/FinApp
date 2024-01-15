package com.fin.fin_api.controller;

import com.fin.fin_api.domain.investimento.rendavariavel.RegistroRendaVariavel;
import com.fin.fin_api.domain.investimento.rendavariavel.RegistroRendaVariavelRepository;
import com.fin.fin_api.domain.renda.Renda;
import com.fin.fin_api.dto.RegistroRendaVariavelDTO;
import com.fin.fin_api.service.RegistroRendaVariavelService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RestController
@RequestMapping("/investimento/rendaVariavel")
public class RendaVariavelController {

    @Autowired
    RegistroRendaVariavelService registroRendaVariavelService;

    @Autowired
    RegistroRendaVariavelRepository registroRendaVariavelRepository;

    @PostMapping("/adicionar")
    public ResponseEntity adicionarRendaVariavel(@RequestBody @Valid RegistroRendaVariavelDTO registroRendaVariavelDTO, BindingResult result){
        return registroRendaVariavelService.adicionarRendaVariavel(registroRendaVariavelDTO, result);
    }




}
