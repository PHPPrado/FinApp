package com.fin.fin_api.domain.investimento.rendavariavel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TotalRendaVariavel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private double ValorTotalGasto;
    private int quantidadeTotalCotas;


}
