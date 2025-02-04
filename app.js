const fileInput = document.getElementById("fileInput");
const uploadBox = document.querySelector(".upload-box");
const fileInfo = document.getElementById("file-info");
const formElement = document.getElementById("hideForm");
const ticket = document.getElementById("campo");
const form = document.querySelector("form");
const formTicket = document.getElementById("divFormTicket");
let imgPreview = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = form.name.value;
  const email = form.email.value;
  const gitHub = form.gitHub.value;
  const file = form.fileInput.files[0];

  formElement.style.display = "block";
  imgPreview.style.display = "none";

  console.log(nome, email, gitHub, file);
  formTicket.style.display = "none";

  ticket.innerHTML = `
    <h1 class="tituloTicket">Congrats, <span class="spanNome">${nome}</span>! Your ticket is ready.</h1>
    <p class="paragrafoTicket">We've emailed your ticket to <span class="spanEmail">${email}</span> and will send updates in the run-up to the event.</p>
`;

  // Se um arquivo foi enviado e for uma imagem, exibe a pré-visualização
  if (file && file.type.startsWith("image/")) {
    const imgUrl = URL.createObjectURL(file); // Cria um URL temporário da imagem
    ticket.innerHTML += `
    <div class="paiImgTicket">
    <div class="divPerfilTicket">
      <h2 class="nomeTicket">${nome}</h2>
      <p> <img src="./assets/images/icon-github.svg" alt="icon github" />${gitHub}</p>
    </div>
    <img src="${imgUrl}" alt="Uploaded image" class="imgTicket" />
    </div>`;
  } else {
    ticket.innerHTML += `<p>No image uploaded.</p>`;
  }

  form.reset();
});

// Exibir informações do arquivo selecionado
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    displayFileInfo(file);
  }
});

// Drag-and-drop funcionalidade
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.style.backgroundColor = "rgba(108, 99, 255, 0.1)";
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.style.backgroundColor = "transparent";
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.style.backgroundColor = "transparent";
  const file = e.dataTransfer.files[0];
  if (file) {
    displayFileInfo(file);
  }
});

// Função para exibir informações do arquivo
function displayFileInfo(file) {
  // Limpa o conteúdo anterior
  fileInfo.innerHTML = "";

  // Pré-visualizar imagem (se for um tipo suportado)
  if (file.type.startsWith("image/")) {
    formElement.style.display = "none";
    imgPreview = document.createElement("img");
    imgPreview.classList = "imgFile";
    imgPreview.src = URL.createObjectURL(file);
    imgPreview.style.maxWidth = "100%";
    imgPreview.style.marginTop = "10px";
    fileInfo.appendChild(imgPreview);
  }
}
