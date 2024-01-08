package com.fin.fin_api.service;

import com.fin.fin_api.domain.despesas.Despesa;
import com.fin.fin_api.domain.despesas.DespesaDTO;
import com.fin.fin_api.domain.despesas.DespesaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class DespesaService {

    @Autowired
    DespesaRepository despesaRepository;

    public Despesa salvarDespesa(Despesa despesa){
        return despesaRepository.save(despesa);
    }

//    public ResponseEntity editarDespesa(Despesa despesa, @RequestBody @Valid DespesaDTO despesaDTO) {
//        var idDespesa = despesa.getId();
//        Despesa despesa1 = despesaRepository.findById(idDespesa);
//        despesa1.setData();
//
//        return ResponseEntity.status(HttpStatus.OK).body("Despesa alterada com sucesso");
//
//    }

    public ResponseEntity deletarDespesa(int id){
        var despesa = despesaRepository.findById(id);

        if (despesa != null) {
            despesaRepository.deleteById(id);
            return ResponseEntity.ok("Despesa deletada com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
        }

    }

}
