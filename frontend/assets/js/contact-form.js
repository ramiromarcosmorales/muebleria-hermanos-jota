const form = document.getElementById("contact-form");
const statusMessageContainer = document.getElementById("status-message");

function isValidName(name, minLength, maxLength) {
  if (!name) {
    return false;
  }

  if (name.length < minLength || name.length > maxLength) {
    return false;
  }

  return true;
}

function isValidEmail(email) {
  if (!email) {
    return false;
  }

  // Regex RFC-2822 compliant from: https://masteringjs.io/tutorials/fundamentals/email-regex
  const emailRegex =
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

function isValidMessage(message, minLength, maxLength) {
  if (!message) {
    return false;
  }

  if (message.length < minLength || message.length > maxLength) {
    return false;
  }

  return true;
}

function resetStatusDisplay() {
  statusMessageContainer.textContent = "";
}

function displayErrors(errorArray) {
  statusMessageContainer.className = "errorStatus";

  const errorPara = document.createElement("p");
  errorPara.textContent =
    "No se pudo enviar el formulario por los siguientes errores:";

  const errorList = document.createElement("ul");
  errorArray.forEach((error) => {
    const errorListElement = document.createElement("li");
    errorListElement.textContent = error;
    errorList.appendChild(errorListElement);
  });

  statusMessageContainer.appendChild(errorPara);
  statusMessageContainer.appendChild(errorList);
}

function displaySuccess() {
  statusMessageContainer.className = "successStatus";
  const successPara = document.createElement("p");
  successPara.textContent = "Formulario enviado exitosamente.";
  statusMessageContainer.appendChild(successPara);
}

function handleSubmit(event) {
  event.preventDefault();

  const errorArray = [];

  const name = form.nombreUsuario;
  if (!isValidName(name.value, name.minLength, name.maxLength)) {
    errorArray.push(
      "El nombre debe tener una longitud de " +
        name.minLength +
        " a " +
        name.maxLength +
        " caracteres."
    );
  }

  const email = form.emailUsuario;
  if (!isValidEmail(email.value)) {
    errorArray.push(
      "El correo electrónico no puede estar vacío y deber cumplir con el formato adecuado."
    );
  }

  const message = form.mensajeUsuario;
  if (!isValidMessage(message.value)) {
    errorArray.push(
      "El mensaje a enviar debe tener una longitud de " +
        message.minLength +
        " a " +
        message.maxLength +
        " caracteres."
    );
  }

  resetStatusDisplay();
  if (errorArray.length > 0) {
    displayErrors(errorArray);
    return;
  }

  displaySuccess();
}

document.addEventListener("submit", handleSubmit);
