package com.fin.fin_api.controller;

import com.fin.fin_api.domain.despesas.Despesa;
import com.fin.fin_api.domain.despesas.DespesaRepository;
import com.fin.fin_api.dto.DespesaDTO;
import com.fin.fin_api.service.DespesaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RequestMapping("/despesa")
public class DespesaController {

    @Autowired
    DespesaRepository despesasRepository;

    @Autowired
    DespesaService despesaService;

    @GetMapping("/all")
    public List<Despesa> getAllDespesas(){
        List<Despesa> dados = despesasRepository.findAll();
        return dados;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<Despesa> adicionar(@Valid @RequestBody Despesa despesa, UriComponentsBuilder uriBuilder){
        Despesa novaDespesa = despesaService.salvarDespesa(despesa);
        var uri = uriBuilder.path("/{id}").buildAndExpand(despesa.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }


    @PutMapping("/editar/{id}")
    public ResponseEntity editar(@PathVariable(value = "id") int id, @RequestBody @Valid DespesaDTO despesaDTO){
        return despesaService.editarDespesa(id, despesaDTO);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity deletar(@PathVariable int id) {
        return despesaService.deletarDespesa(id);
    }

}
