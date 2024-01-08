package com.fin.fin_api.service;

import com.fin.fin_api.domain.despesas.Despesa;
import com.fin.fin_api.domain.despesas.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DespesaService {

    @Autowired
    DespesaRepository despesaRepository;

    public Despesa salvarDespesa(Despesa despesa){
        return despesaRepository.save(despesa);
    }

}
