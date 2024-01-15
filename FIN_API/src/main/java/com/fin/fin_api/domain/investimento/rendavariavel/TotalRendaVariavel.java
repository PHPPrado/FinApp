package com.fin.fin_api.domain.investimento.rendavariavel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class TotalRendaVariavel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank

    private String nomeAtivo;
    private double ValorTotalGasto;
    private int quantidadeTotalCotas;


}
