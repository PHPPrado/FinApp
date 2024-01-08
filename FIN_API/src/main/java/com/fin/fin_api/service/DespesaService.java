package com.fin.fin_api.service;

import com.fin.fin_api.domain.despesas.Despesa;
import com.fin.fin_api.domain.despesas.DespesaRepository;
import com.fin.fin_api.dto.DespesaDTO;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    DespesaRepository despesaRepository;

    public Despesa salvarDespesa(Despesa despesa){
        return despesaRepository.save(despesa);
    }

    public ResponseEntity editarDespesa(int id, @Valid DespesaDTO despesaDTO) {

        //Valida se o id existe no BD
        Optional<Despesa> despesaOptional = Optional.ofNullable(despesaRepository.findById(id));
        if (despesaOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID de despesa não encontrado");
        }

        //trás os dados ainda não atualizados do bd e substitui pelos dados atualizados recebidos no dto
        Despesa despesa = despesaOptional.get();
        BeanUtils.copyProperties(despesaDTO, despesa);
        return ResponseEntity.status(HttpStatus.OK).body(despesaRepository.save(despesa));

    }

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
