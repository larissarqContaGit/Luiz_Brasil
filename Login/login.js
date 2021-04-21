//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

var email = document.getElementById('email')
var senha = document.getElementById('senha')
var addButton = document.getElementById('addButton')
var cadButton = document.getElementById('cadButton')


//Ao clicar no botão a função create é chamada
cadButton.addEventListener('click', e => {
    e.preventDefault()
    checkInputs()
})

addButton.addEventListener('click', e => {
    e.preventDefault()

})

//faz as mensagens de erro surgirem caso algo esteja errado
function checkInputs() {
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    if (emailValue === '' || senhaValue === '') {
        enviaMsgErro(email, 'Preenchimento obrigatório');
        enviaMsgErro(senha, 'Preenchimento obrigatório');
    } else if (!isEmail(emailValue)) {
        enviaMsgErro(email, 'Insira um email válido');
    } else {}
}

//adiciona o usuário ao auth do firebase
cadButton.addEventListener('click', function() {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, senha.value)
        .then(function() {
            alert('Bem-vindo ' + email.value)
        })
        .catch(function(error) {
            alert('Falha ao cadastrar! Verifique os dados inseridos')
            console.error(error.code)
            console.error(error.message)
        })
})

//autentica com o auth
addButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, senha.value)
        .then(function(result) {
            console.log(result)
            window.location.assign('../Home/home.html')

        })
        .catch(function(error) {
            alert('Crie uma conta ou verifique novamente os dados inseridos!')
            console.error(error.code)
            console.error(error.message)
        })
})

//função de mensagem de erro
function enviaMsgErro(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error';
    small.innerText = message;
}

//função para verificar se é mesmo email
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}