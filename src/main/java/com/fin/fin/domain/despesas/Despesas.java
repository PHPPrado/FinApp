package com.fin.fin.domain.despesas;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Despesas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    @NotEmpty
    private double valor;

    @NotNull
    @NotEmpty
    private LocalDate data;

    @NotNull
    @NotEmpty
    private String tipo;

    private String descricao;

}

