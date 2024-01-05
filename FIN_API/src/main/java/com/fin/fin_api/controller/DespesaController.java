package com.fin.fin_api.controller;

import com.fin.fin_api.domain.despesas.Despesa;
import com.fin.fin_api.domain.despesas.DespesaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;


@RestController
@RequestMapping("/despesa")
public class DespesaController {

    @Autowired
    DespesaRepository despesasRepository;

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/all")
    public List<Despesa> getAllDespesas(){
        List<Despesa> dados = despesasRepository.findAll();
        return dados;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping("/adicionar")
    public ResponseEntity<Despesa> adicionar(@Valid @RequestBody Despesa despesa, UriComponentsBuilder uriBuilder){
        despesasRepository.save(despesa);
        var uri = uriBuilder.path("/{id}").buildAndExpand(despesa.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
