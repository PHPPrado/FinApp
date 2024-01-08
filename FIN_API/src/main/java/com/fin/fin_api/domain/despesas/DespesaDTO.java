package com.fin.fin_api.domain.despesas;

import java.time.LocalDate;

public record DespesaDTO(double valor, LocalDate data, String tipo, String descricao) {
}
