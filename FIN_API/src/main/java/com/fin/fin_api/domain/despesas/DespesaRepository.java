package com.fin.fin_api.domain.despesas;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {
    Despesa findById(int id);

    Despesa deleteById(int id);

}
