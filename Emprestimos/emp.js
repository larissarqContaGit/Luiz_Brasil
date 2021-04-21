firebase.initializeApp(firebaseConfig);
firebase.analytics()

var d = new Date()
var t = d.getTime()
var counter = t


document.getElementById('form').addEventListener('submit', (e) => {
    var livro = document.getElementById('livro').value
    var leitor = document.getElementById('leitor').value
    var contato = document.getElementById('contato').value
    var emprestimo = document.getElementById('emprestimo').value
    var devolucao = document.getElementById('devolucao').value
    e.preventDefault()
    criaEmprestimo(livro, leitor, contato, emprestimo, devolucao)
    form.reset()
})


//adiciona dados ao banco especificado
function criaEmprestimo(livro, leitor, contato, emprestimo, devolucao) {
    counter += 1
    var dados = {
        id: counter,
        livro: livro,
        leitor: leitor,
        contato: contato,
        emprestimo: emprestimo,
        devolucao: devolucao
    }
    let db = firebase.database().ref("emprestimos/" + counter)
    db.set(dados)
        //adiciona os elementos à div
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}

//leitura dos dados que serão inseridos
function lerDados() {
    var dados = firebase.database().ref("emprestimos/")
    dados.on("child_added", function(data) {
        var dadosValue = data.val()
        document.getElementById('recebeDados').innerHTML += `
            <div class="conteudo">
                <tr>
                <td>${dadosValue.livro}</td>
                <td>${dadosValue.leitor}</td>
                <td>${dadosValue.contato}</td>
                <td>${dadosValue.emprestimo}</td>
                <td>${dadosValue.devolucao}</td>
                <td> <button type="submit" id="btn1" class="btn1" onclick="updateDados(${dadosValue.id}, '${dadosValue.livro}', '${dadosValue.leitor}', '${dadosValue.contato}', '${dadosValue.emprestimo}', '${dadosValue.devolucao}')"><i class="fas fa-edit"></i></button>
                <button type="submit" class="btn2" onclick="deletaDados(${dadosValue.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
                </div>
            `
    })
}

//reseta a tela depois que a alteração é cancelada
function reset() {
    document.getElementById('indice').innerHTML = `
        <form class="form" id="form">
            <div class="form-group">
                <input type="text" class="form-control" id="livro" placeholder="Título do livro">
                <input type="text" class="form-control" id="leitor" placeholder="Nome do leitor">
                <input type="text" class="form-control" id="contato" placeholder="Email ou telefone">
                <input type="date" class="form-control" id="emprestimo" placeholder="Data do empréstimo">
                <input type="date" class="form-control" id="devolucao" placeholder="Data de devolução">
                <button type="submit" id="button1">ADICIONAR</button>
                <button style="display: none" id="button2">ALTERAR</button>
                <button style="display: none" id="button3">CANCELAR</button>
            </div>
        </form>
        `

    document.getElementById('form').addEventListener('submit', (e) => {
        var livro = document.getElementById('livro').value
        var leitor = document.getElementById('leitor').value
        var contato = document.getElementById('contato').value
        var emprestimo = document.getElementById('emprestimo').value
        var devolucao = document.getElementById('devolucao').value
        e.preventDefault()
        criaEmprestimo(livro, leitor, contato, emprestimo, devolucao)
        form.reset()
    })
}


//faz o update e exibe na tela
function updateDados(id, livro, leitor, contato, emprestimo, devolucao) {
    document.getElementById("indice").innerHTML = `
    <form class="form" id="form2">
    <div class="form-group">
        <input type="text" class="form-control" id="livro" placeholder="Título do livro">
        <input type="text" class="form-control" id="leitor" placeholder="Nome do leitor">
        <input type="text" class="form-control" id="contato" placeholder="Email ou telefone">
        <input type="date" class="form-control" id="emprestimo" placeholder="Data do empréstimo">
        <input type="date" class="form-control" id="devolucao" placeholder="Data de devolução">
        <button type= "submit" style="display: inline-block" id="button2""><i class="fas fa-check-square"></i></button>
        <button style="display: inline-block" id="button3""><i class="fas fa-window-close"></i></button>
        </div>
    </form>
    `
        //pega o formulário 2
    document.getElementById("form2").addEventListener("submit", (e) => {
            e.preventDefault()
        })
        //reseta a tela ao clicar em cancelar
    document.getElementById("button3").addEventListener("click", (e) => {
        reset()
    })

    //pega os valores do banco
    document.getElementById("button2").addEventListener("click", (e) => {

        updateDados2(id, document.getElementById("livro").value, document.getElementById("leitor").value, document.getElementById("contato").value, document.getElementById("emprestimo").value, document.getElementById("devolucao").value)
    })

    //faz aparecer no input
    document.getElementById("livro").value = livro
    document.getElementById("leitor").value = leitor
    document.getElementById("contato").value = contato
    document.getElementById("emprestimo").value = emprestimo
    document.getElementById("devolucao").value = devolucao
}

//faz o update
function updateDados2(id, livro, leitor, contato, emprestimo, devolucao) {
    var dadosUp = {
        id: id,
        livro: livro,
        leitor: leitor,
        contato: contato,
        emprestimo: emprestimo,
        devolucao: devolucao
    }

    let db = firebase.database().ref("emprestimos/" + id)
    db.set(dadosUp)
        //limpa a recebeDados depois que a função é executada
    document.getElementById('recebeDados').innerHTML = ''
    lerDados()
    reset()
}

//deleta o dado de acordo com o id
function deletaDados(id) {
    var dados = firebase.database().ref("emprestimos/" + id)
    dados.remove()
    reset()
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}