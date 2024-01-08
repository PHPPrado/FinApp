package com.fin.fin_api.controller;

import com.fin.fin_api.domain.renda.Renda;
import com.fin.fin_api.domain.renda.RendaRepository;
import com.fin.fin_api.service.RendaService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RestController
@RequestMapping("/renda")
public class RendaController {

    @Autowired
    RendaRepository rendaRepository;

    @Autowired
    RendaService rendaService;


    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/all")
    public List<Renda> getAllRenda(){
        List<Renda> dados = rendaRepository.findAll();
        return dados;
    }

    @PostMapping(value = "/adicionar")
    @Transactional
    public ResponseEntity<Renda> adicionar(@Valid @RequestBody Renda renda, UriComponentsBuilder uriBuilder){
        Renda novaRenda = rendaService.salvarRenda(renda);
        var uri = uriBuilder.path("/{id}").buildAndExpand(renda.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}