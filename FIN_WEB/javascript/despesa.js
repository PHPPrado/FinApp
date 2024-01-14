var despesas = [];
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
        popularTabela();
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


function maioresDespesas(){
    var url = getAllUrlDespesa;

    fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
          }
          return response.json();
        })
    .then(data => {

        console.log(data);

        //acc é o acumulador, obj.tipo é o objeto alvo
        const contagemTipo = data.reduce((acc, obj) => {
            const tipo = obj.tipo;
            acc[tipo] = (acc[tipo] || 0) + obj.valor;
            return acc;
        }, {});
    
        const contagemArray = Object.entries(contagemTipo);
        contagemArray.sort((a, b) => b[1] - a[1]);


        const principais = document.querySelector('#principais');
        principais.innerHTML = ''; // Limpar o conteúdo anterior
        principais.innerHTML = '<h1 class="self-center font-league text-finGreen-0 font-bold text-2xl mt-2">Principais Gastos</h1>'

        if (contagemArray.length > 0) {
            contagemArray.forEach(item => {
                const tipo = item[0];
                const valorTotal = item[1];
    
                const div = document.createElement('div');
                div.classList.add('flex', 'mt-2', 'p-4', 'shadow-lg', 'rounded-lg', 'w-full', 'items-start');
    
                const img = document.createElement('img');
                img.classList.add('w-8');
                img.src = `images/${tipo}.png`;
                img.alt = '';
    
                const h2 = document.createElement('h2');
                h2.classList.add('font-league', 'font-bold', 'text-xl', 'self-center', 'ml-2', 'text-finGreen-0');
                h2.textContent = `${tipo.toUpperCase()}`;
    
                div.appendChild(img);
                div.appendChild(h2);
    
                principais.appendChild(div);
            });
        } else {
            console.error('Array de contagem vazio ou elemento .principais não encontrado.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}


function getDespesas(){

    var url = getAllUrlDespesa;

    fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error(`Erro de rede! Status: ${response.status}`);
          }
          return response.json();
        })
    .then(data => {

        despesas = data;
        console.log(despesas);
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

}





maioresDespesas()