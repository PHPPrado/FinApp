package com.fin.fin_api.domain.investimento.rendavariavel;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class RegistroRendaVariavel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private LocalDate data;

    @NotBlank
    private String categoria;

    @NotBlank
    private String nomeAtivo;

    @NotBlank
    private String tipo;

    @NotNull
    private Double valorUnitario;

    @NotNull
    private int quantidade;


}
