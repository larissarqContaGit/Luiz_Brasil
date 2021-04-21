firebase.initializeApp(firebaseConfig);
firebase.analytics()

var d = new Date()
var t = d.getTime()
var counter = t

document.getElementById('form').addEventListener('submit', (e) => {
    var secao = document.getElementById('secao').value
    var idLivro = document.getElementById('idLivro').value
    var titulo = document.getElementById('titulo').value
    var autor = document.getElementById('autor').value
    e.preventDefault()
    criaLivro(secao, idLivro, titulo, autor)
    form.reset()
})


//adiciona dados ao banco especificado
function criaLivro(secaoLivro, idLivro, titulo, autor) {
    counter += 1
    var dados = {
        id: counter,
        secao: secaoLivro,
        idLivro: idLivro,
        titulo: titulo,
        autor: autor
    }
    let db = firebase.database().ref("livros/" + counter)
    db.set(dados)
        //adiciona os elementos à div
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}

function lerDados() {
    var dados = firebase.database().ref("livros/")
    dados.on("child_added", function(data) {
        var dadosValue = data.val()
        document.getElementById('recebeDados').innerHTML += `
            <div class="conteudo">
                <tr>
                    <td>${dadosValue.secao}</td>
                    <td>${dadosValue.idLivro}</td>
                    <td>${dadosValue.titulo}</td>
                    <td>${dadosValue.autor}</td>
                    <td> <button type="submit" id="btn1" class="btn1" onclick="updateDados(${dadosValue.id}, '${dadosValue.secao}', '${dadosValue.idLivro}', '${dadosValue.titulo}', '${dadosValue.autor}')"><i class="fas fa-edit"></i></button>
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
        <input type="text" class="form-control" id="secao" placeholder="Seção">
        <input type="text" class="form-control" id="idLivro" placeholder="ID">
        <input type="text" class="form-control" id="titulo" placeholder="Título">
        <input type="text" class="form-control" id="autor" placeholder="Autor">
            <button type="submit" id="button1">ADICIONAR</button>
            <button style="display: none" id="button2">ALTERAR</button>
            <button style="display: none" id="button3">CANCELAR</button>
    </div>
</form>
    `

    document.getElementById('form').addEventListener('submit', (e) => {
        var secao = document.getElementById('secao').value
        var idLivro = document.getElementById('idLivro').value
        var titulo = document.getElementById('titulo').value
        var autor = document.getElementById('autor').value
        e.preventDefault()
        criaLivro(secao, idLivro, titulo, autor)
        form.reset()
        window.scrollTo(0, 0);

    })
}


//faz o update e exibe na tela
function updateDados(id, secao, idLivro, titulo, autor) {
    document.getElementById("indice").innerHTML = `
    <form class="form" id="form2">
    <div class="form-group">
        <input type="text" class="form-control" id="secao" placeholder="Seção">
        <input type="text" class="form-control" id="idLivro" placeholder="ID">
        <input type="text" class="form-control" id="titulo" placeholder="Título">
        <input type="text" class="form-control" id="autor" placeholder="Autor">
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
        updateDados2(id, document.getElementById("secao").value, document.getElementById("idLivro").value, document.getElementById("titulo").value, document.getElementById("autor").value)
    })

    //faz aparecer no input
    document.getElementById("secao").value = secao
    document.getElementById("idLivro").value = idLivro
    document.getElementById("titulo").value = titulo
    document.getElementById("autor").value = autor
}

//faz o update
function updateDados2(id, secao, idLivro, titulo, autor) {
    var dadosUp = {
        id: id,
        secao: secao,
        idLivro: idLivro,
        titulo: titulo,
        autor: autor
    }

    let db = firebase.database().ref("livros/" + id)
    db.set(dadosUp)
        //limpa a recebeDados depois que a função é executada
    document.getElementById('recebeDados').innerHTML = ''
    lerDados()
    reset()
}

//deleta o dado de acordo com o id
function deletaDados(id) {
    var dados = firebase.database().ref("livros/" + id)
    dados.remove()
    reset()
    document.getElementById("recebeDados").innerHTML = ''
    lerDados()
}