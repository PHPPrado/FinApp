let rendas = [];
var adicionarUrlRenda = 'http://localhost:8080/renda/adicionar';
var getAllUrlRenda = 'http://localhost:8080/renda/all';
const formRenda2 = document.querySelector('#formRenda');
var btnEnviarRenda = document.querySelector('.btnEnviarRenda');
var camposObrigatoriosR = document.querySelectorAll('#formRenda [required]')
var erro = false;

function enviarRenda() {

    for(var i = 0; i < camposObrigatoriosR.length; i++){
        var campo = camposObrigatoriosR[i];
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

        var url = adicionarUrlRenda;
        var formularioRenda = document.getElementById('formRenda');
        console.log(formularioRenda)

        console.log(formularioRenda);
        var dadosRenda={
            valor: formularioRenda.valor.value,
            data: formularioRenda.date.value,
            tipo: formularioRenda.tipo.value,
            descricao: formularioRenda.descricao.value
        };

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosRenda),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            formRenda2.classList.toggle('hidden');
            alert("Dados enviados com sucesso!");
            return response.json();
            
        })
        .then(data => {
            console.log('Renda adicionada com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao adicionar a renda:', error);
        });

    }
};