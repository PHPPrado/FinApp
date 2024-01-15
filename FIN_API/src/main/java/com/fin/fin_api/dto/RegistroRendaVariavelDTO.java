package com.fin.fin_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record RegistroRendaVariavelDTO(@NotNull LocalDate data, @NotBlank String categoria,@NotBlank String nomeAtivo,
                                       @NotBlank String tipo, @NotNull Double valorUnitario,@NotNull int quantidade) {
}
