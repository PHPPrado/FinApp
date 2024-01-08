package com.fin.fin_api.service;

import com.fin.fin_api.domain.renda.Renda;
import com.fin.fin_api.domain.renda.RendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RendaService {

    @Autowired
    RendaRepository rendaRepository;

    public Renda salvarRenda(Renda renda){
        return rendaRepository.save(renda);
    }
}
