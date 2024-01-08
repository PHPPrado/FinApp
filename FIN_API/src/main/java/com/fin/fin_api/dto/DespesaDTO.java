package com.fin.fin_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DespesaDTO(@NotNull double valor, @NotNull LocalDate data, @NotBlank(message = "{tipo.not-blank}") String tipo, String descricao) {
}
