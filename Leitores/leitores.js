firebase.initializeApp(firebaseConfig);
firebase.analytics()

var d = new Date()
var t = d.getTime()
var counter = t

document.getElementById('form').addEventListener('submit', (e) => {
    var idLeitor = document.getElementById('idLeitor').value
    var nome = document.getElementById('nome').value
    var rg = document.getElementById('rg').value
    var cpf = document.getElementById('cpf').value
    var email = document.getElementById('email').value
    var telefone = document.getElementById('telefone').value
    var endereco = document.getElementById('endereco').value
    e.preventDefault()
    criaLeitor(idLeitor, nome, rg, cpf, email, telefone, endereco)
    form.reset()
})


//adiciona dados ao banco especificado
function criaLeitor(idLeitor, nome, rg, cpf, email, telefone, endereco) {
    counter += 1
    var dados = {
        id: counter,
        idLeitor: idLeitor,
        nome: nome,
        rg: rg,
        cpf: cpf,
        email: email,
        telefone: telefone,
        endereco: endereco
    }
    let db = firebase.database().ref("leitores/" + counter)
    db.set(dados)
        //adiciona os elementos à div
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}

function lerDados() {
    var dados = firebase.database().ref("leitores/")
    dados.on("child_added", function(data) {
        var dadosValue = data.val()
        document.getElementById('recebeDados').innerHTML += `
            <div class="conteudo">
                <tr>
                    <td>${dadosValue.idLeitor}</td>
                    <td>${dadosValue.nome}</td>
                    <td>${dadosValue.rg}</td>
                    <td>${dadosValue.cpf}</td>
                    <td>${dadosValue.email}</td>
                    <td>${dadosValue.telefone}</td>
                    <td>${dadosValue.endereco}</td>
                    <td> <button type="submit" id="btn1" class="btn1" onclick="updateDados(${dadosValue.id}, '${dadosValue.idLeitor}', '${dadosValue.nome}', '${dadosValue.rg}', '${dadosValue.cpf}', '${dadosValue.email}', '${dadosValue.telefone}','${dadosValue.endereco}')"><i class="fas fa-edit"></i></button>
                    <button type="submit" class="btn2" onclick="deletaDados(${dadosValue.id})"><i class="fas fa-trash"></i></button></td>
                </tr>
                </div>
            `
    })
}

function reset() {
    document.getElementById('indice').innerHTML = `
        <form class="form" id="form">
            <div class="form-group">
                <input type="text" class="form-control" id="idLeitor" placeholder="ID">
                <input type="text" class="form-control" id="nome" placeholder="Nome">
                <input type="text" class="form-control" id="rg" placeholder="RG">
                <input type="text" class="form-control" id="cpf" placeholder="CPF">
                <input type="email" class="form-control" id="email" placeholder="Email">
                <input type="text" class="form-control" id="telefone" placeholder="Telefone">
                <input type="text" class="form-control" id="endereco" placeholder="Endereço">
                <button type="submit" id="button1">ADICIONAR</button>
                <button style="display: none" id="button2">ALTERAR</button>
                <button style="display: none" id="button3">CANCELAR</button>
            </div>
        </form>
        `

    document.getElementById('form').addEventListener('submit', (e) => {
        var idLeitor = document.getElementById('idLeitor').value
        var nome = document.getElementById('nome').value
        var rg = document.getElementById('rg').value
        var cpf = document.getElementById('cpf').value
        var email = document.getElementById('email').value
        var telefone = document.getElementById('telefone').value
        var endereco = document.getElementById('endereco').value
        e.preventDefault()
        criaLeitor(idLeitor, nome, rg, cpf, email, telefone, endereco)
        form.reset()
    })
}


//faz o update e exibe na tela
function updateDados(id, idLeitor, nome, rg, cpf, email, telefone, endereco) {
    document.getElementById("indice").innerHTML = `
    <form class="form" id="form2">
    <div class="form-group">
        <input type="text" class="form-control" id="idLeitor" placeholder="ID">
        <input type="text" class="form-control" id="nome" placeholder="Nome">
        <input type="text" class="form-control" id="rg" placeholder="RG">
        <input type="text" class="form-control" id="cpf" placeholder="CPF">
        <input type="email" class="form-control" id="email" placeholder="Email">
        <input type="text" class="form-control" id="telefone" placeholder="Telefone">
        <input type="text" class="form-control" id="endereco" placeholder="Endereço">
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
        updateDados2(id, document.getElementById("idLeitor").value, document.getElementById("nome").value, document.getElementById("rg").value, document.getElementById("cpf").value, document.getElementById("email").value, document.getElementById("telefone").value, document.getElementById("endereco").value)
    })

    //faz aparecer no input
    document.getElementById("idLeitor").value = idLeitor
    document.getElementById("nome").value = nome
    document.getElementById("rg").value = rg
    document.getElementById("cpf").value = cpf
    document.getElementById("email").value = email
    document.getElementById("telefone").value = telefone
    document.getElementById("endereco").value = endereco

}

//faz o update
function updateDados2(id, idLeitor, nome, rg, cpf, email, telefone, endereco) {
    var dadosUp = {
        id: id,
        idLeitor: idLeitor,
        nome: nome,
        rg: rg,
        cpf: cpf,
        email: email,
        telefone: telefone,
        endereco: endereco
    }

    let db = firebase.database().ref("leitores/" + id)
    db.set(dadosUp)
        //limpa a recebeDados depois que a função é executada
    document.getElementById('recebeDados').innerHTML = ''
    lerDados()
    reset()
}

//deleta o dado de acordo com o id
function deletaDados(id) {
    var dados = firebase.database().ref("leitores/" + id)
    dados.remove()
    reset()
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}