package com.fin.fin_api.service;

import com.fin.fin_api.domain.renda.Renda;
import com.fin.fin_api.domain.renda.RendaRepository;
import com.fin.fin_api.dto.RendaDTO;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RendaService {


    @Autowired
    RendaRepository rendaRepository;

    public Renda salvarRenda(Renda renda){
        return rendaRepository.save(renda);
    }

    //Verifica se o id existe e dispara erro caso seja um valor inválido no banco
    public ResponseEntity editarRenda(int id, @Valid RendaDTO rendaDTO){
        Optional<Renda> optionalRenda = Optional.ofNullable(rendaRepository.findById(id));

        if(optionalRenda.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("id de renda não encontrado");

        } else {
            Renda renda = optionalRenda.get();
            BeanUtils.copyProperties(rendaDTO, renda);

            return ResponseEntity.status(HttpStatus.OK).body(rendaRepository.save(renda));
        }
    }

    public ResponseEntity deletarRenda(int id){
        Optional<Renda> optionalRenda = Optional.ofNullable(rendaRepository.findById(id));

        if(optionalRenda.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Despesa não encontrada");
        } else{
            rendaRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Despesa deletada com sucesso");
        }
    }


}
