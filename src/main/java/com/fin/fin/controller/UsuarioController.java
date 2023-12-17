package com.fin.fin.controller;

import com.fin.fin.domain.despesas.DespesasRepository;
import com.fin.fin.domain.renda.RendaRepository;
import com.fin.fin.domain.usuario.Usuario;
import com.fin.fin.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RendaRepository rendaRepository;

    @Autowired
    private DespesasRepository despesasRepository;

//    @PostMapping("/cadastro")
//    public ResponseEntity<Usuario> cadastrar(){
//
//    }

}
