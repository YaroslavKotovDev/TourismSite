const telegram_bot_id = "6531160021:AAEO_3dWSBkTBc8-5g77MIqb5oerHErGrbg";
const chat_id = -888768633;
const messageForm = document.getElementById("messageForm");
const responseDiv = document.getElementById("response");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const iti = window.intlTelInputGlobals.getInstance(input);
const email = document.getElementById("email");
let phoneNumber = null;
let message = null;
let dataJSON = null;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const resetForm = async () => {
  dataJSON = await fetch("./test.json").then((response) => {
    return response.json();
  });

  firstName.value = dataJSON.firstName;
  lastName.value = dataJSON.lastName;
  email.value = dataJSON.email;
  iti.setNumber(dataJSON?.phone?.countryCode + dataJSON?.phone?.number);
};

resetForm();

const ready = () => {
  const phoneNumber = iti.getNumber();

  if (
    phoneNumber &&
    iti.isValidNumber() &&
    firstName.value &&
    lastName.value &&
    validateEmail(email.value)
  ) {
    message =
      "FirstName: " +
      firstName.value +
      "\nLastName:" +
      lastName.value +
      "\nEmail: " +
      email.value +
      "\nPhone Number: " +
      phoneNumber;
  }
};

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  ready();

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: message
      })
    });

    const data = await response.json();
  } catch (error) {
    responseDiv.textContent = 'Error: ' + error.message;
  }

  resetForm();
});
