package com.fin.fin_api.service;

import com.fin.fin_api.domain.investimento.rendavariavel.RegistroRendaVariavel;
import com.fin.fin_api.domain.investimento.rendavariavel.RegistroRendaVariavelRepository;
import com.fin.fin_api.dto.RegistroRendaVariavelDTO;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Optional;

@Service
public class RegistroRendaVariavelService {
    @Autowired
    RegistroRendaVariavelRepository registroRendaVariavelRepository;

//    public ResponseEntity adicionarRendaVariavel(@Valid RegistroRendaVariavelDTO registroRendaVariavelDTO){
//        Optional<RegistroRendaVariavelDTO> optionalRegistroRendaVariavelDTO = Optional.ofNullable(registroRendaVariavelDTO);
//
//        if (optionalRegistroRendaVariavelDTO.isPresent()){
//            RegistroRendaVariavel registroRendaVariavel = new RegistroRendaVariavel();
//            BeanUtils.copyProperties(registroRendaVariavelDTO, registroRendaVariavel);
//            return ResponseEntity.status(HttpStatus.OK).body(registroRendaVariavelRepository.save(registroRendaVariavel));
//        } else{
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }



        public ResponseEntity adicionarRendaVariavel(@Valid RegistroRendaVariavelDTO registroRendaVariavelDTO, BindingResult resultado){
            if(resultado.hasErrors()){
                //String erro = String.valueOf(resultado.getFieldError());
                String errorMessage = resultado.getFieldErrors().get(0).getDefaultMessage();
                return ResponseEntity.badRequest().body(errorMessage);
            }


            try {
                RegistroRendaVariavel registroRendaVariavel = new RegistroRendaVariavel();
                BeanUtils.copyProperties(registroRendaVariavelDTO, registroRendaVariavel);
                return ResponseEntity.status(HttpStatus.OK).body(registroRendaVariavelRepository.save(registroRendaVariavel));
            } catch(Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
}
