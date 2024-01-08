let despesas = [];
var adicionarUrlDespesa = 'http://localhost:8080/despesa/adicionar';
var getAllUrlDespesa = 'http://localhost:8080/despesa/all';
var btnEnviarDespesa = document.querySelector('.btnEnviarDespesa');
var camposObrigatorios = document.querySelectorAll('#formDespesa [required]')
var erro = false;





function enviarDespesa() {


    for(var i = 0; i < camposObrigatorios.length; i++){
        var campo = camposObrigatorios[i];
        if(campo == null || campo.value.trim() == ''){
            var erro = true;
            var campoSpan = document.querySelector('#campoError');
            campoSpan.innerText = 'Preencha todos os campos!'
            campoSpan.classList.toggle('hidden');
            break;
        }
    }

    if(!erro){
        var campoSpan = document.querySelector('#campoError');
        campoSpan.innerText = '';
        campoSpan.classList.add('hidden');

        var url = adicionarUrlDespesa;
    var formularioDespesa = document.getElementById('formDespesa');

    console.log(formularioDespesa);
    var dadosDespesa={
        valor: formularioDespesa.valor.value,
        data: formularioDespesa.date.value,
        tipo: formularioDespesa.tipo.value,
        descricao: formularioDespesa.descricao.value
    };

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDespesa),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        alert("Dados enviados com sucesso!");
        return response.json();
        
    })
    .then(data => {
        console.log('Despesa adicionada com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar a despesa:', error);
    });
    }

    
    
};
