package com.fin.fin_api.domain.renda;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RendaRepository extends JpaRepository<Renda, Integer> {

    Renda findById(int id);
}
