// Función para obtener el clima actual en Ciudad Madero, Tamaulipas utilizando wttr.in
async function getWeather() {
  try {
    const response = await fetch("https://wttr.in/Ciudad+Madero?format=%C+%t");
    const data = await response.text();
    return `en Ciudad Madero es ${data.trim()}.`;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    return "Lo siento, no pude obtener la información del clima en este momento.";
  }
}

// Función para obtener la hora actual en Ciudad Madero, Tamaulipas utilizando worldtimeapi.org
async function getTime() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/America/Matamoros");
    const data = await response.json();
    const dateTime = new Date(data.datetime);
    const day = dateTime.toLocaleDateString("es-MX", { weekday: "long" });
    const time = dateTime.toLocaleTimeString("es-MX", { timeStyle: "short" });
    return `es ${day} y son las ${time}.`;
  } catch (error) {
    console.error("Error al obtener la hora:", error);
    return "Lo siento, no pude obtener la información de la hora en este momento.";
  }
}

let chatState = {};

function addMessage(message, sender) {
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender);
  messageElement.innerHTML = `
    <img src="${sender === 'received' ? 'bot.png' : 'user.png'}" class="avatar">
    <span class="content">${message}</span>
  `;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;

  if (sender === 'received') {
    readMessage(message);
  }
}

function readMessage(message) {
  if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
    synthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'es-ES';
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    synthesis.speak(utterance);
  } else {
    console.log('La API SpeechSynthesis no está disponible en este navegador.');
  }
}

function sendMessage() {
  var message = userInput.value;
  addMessage(message, "sent");

  var reply = generateReply(message);
  setTimeout(function() {
    addMessage(reply, "received");
  }, 500);

  userInput.value = "";
}



function generateReply(message) {

  var lowercaseMessage = message.toLowerCase();


  // INFORMACIÓN SOBRE BIENVENIDA Y DOLORES:

  if (lowercaseMessage.includes("hola") || lowercaseMessage.includes("buenos días") || lowercaseMessage.includes("buenas tardes") || lowercaseMessage.includes("buenas noches") || lowercaseMessage.includes("buen día")) {
    return "¡Buenos días! ¿En qué puedo asistirte?";
  } else if (lowercaseMessage.includes("cómo") && lowercaseMessage.includes("estás")) {
    return "Estoy aquí para ayudarte. ¿En qué puedo asistirte?";
  } else if (lowercaseMessage.includes("dolor")) {
    if (lowercaseMessage.includes("dolor") && lowercaseMessage.includes("en la cabeza")) {
      return "Entiendo que te duele la cabeza. Puedes consultar a tu médico para obtener un diagnóstico y tratamiento adecuado.";
    } else if (lowercaseMessage.includes("dolor") && lowercaseMessage.includes("en la espalda")) {
      return "Entiendo que tienes dolor en la espalda. Puedo recomendarte algunos ejercicios de estiramiento que podrían ayudar a aliviar el dolor, pero recuerda que es importante buscar atención médica si el dolor persiste.";
    } else if (lowercaseMessage.includes("dolor") && lowercaseMessage.includes("en el brazo")) {
      return "Entiendo que tienes dolor en el brazo. Puede que se deba a una lesión o tensión muscular. Te recomiendo descansar y aplicar compresas frías y calientes alternadamente. Si el dolor persiste, es mejor que visites a un médico.";
    } else if (lowercaseMessage.includes("dolor") && lowercaseMessage.includes("en la pierna")) {
      return "Entiendo que tienes dolor en la pierna. Puede que se deba a una mala postura o ejercicio intenso. Te recomiendo descansar y elevar la pierna. Si el dolor no mejora, consulta a un médico para un diagnóstico adecuado.";
    } else {
      return "Entiendo que tienes dolor. ¿En qué parte del cuerpo sientes el dolor?";
    }

  // INFORMACIÓN SOBRE DESPEDIDA:

  } else if (lowercaseMessage.includes("gracias")) {
    return "De nada, estoy para servirte";
  } else if (lowercaseMessage.includes("adiós") || lowercaseMessage.includes("hasta luego")) {
    return "¡Hasta luego! Si necesitas algo más, no dudes en volver.";
  } else if (lowercaseMessage.includes("ayuda") || lowercaseMessage.includes("ayúdame")) {
    return "Claro, estaré encantado de ayudarte. ¿En qué puedo asistirte?";

  } 
  

  // INFORMACIÓN SOBRE DROGAS:
  
  else if (lowercaseMessage.includes("droga") || lowercaseMessage.includes("drogas")) {
    return "Las drogas son sustancias que pueden afectar el funcionamiento normal del cuerpo y la mente. Existen diferentes tipos de drogas, como estimulantes, depresores, alucinógenos y opioides. Es importante recordar que el consumo de drogas puede ser peligroso para la salud y puede tener consecuencias graves. Si necesitas información específica sobre algún tipo de droga, por favor indícame cuál te interesa conocer.";
  } else if (lowercaseMessage.includes("estimulantes")) {
    return "Los estimulantes son drogas que aumentan la actividad cerebral y física. Algunos ejemplos de estimulantes son la cocaína, el crack, las anfetaminas y el metilfenidato (Ritalin). Estas drogas pueden provocar euforia, hiperactividad, insomnio y disminución del apetito, pero también pueden ser adictivas y tener efectos secundarios negativos para la salud.";
  } else if (lowercaseMessage.includes("depresores")) {
    return "Los depresores son drogas que ralentizan la actividad cerebral y pueden tener efectos relajantes o sedantes. Algunos ejemplos de depresores son el alcohol, los tranquilizantes y los opioides como la heroína y los medicamentos para el dolor. El abuso de estos medicamentos puede llevar a la dependencia y a graves problemas de salud.";
  } else if (lowercaseMessage.includes("alucinógenos")) {
    return "Los alucinógenos son drogas que alteran la percepción, el estado de ánimo y la conciencia. Algunos ejemplos de alucinógenos son el LSD, la psilocibina (hongos alucinógenos) y la DMT. Estas drogas pueden producir alucinaciones, distorsiones en el tiempo y la percepción, y experiencias espirituales, pero también pueden ser impredecibles y potencialmente peligrosas.";
  } else if (lowercaseMessage.includes("opioides")) {
    return "Los opioides son una clase de drogas que se utilizan principalmente para aliviar el dolor. Algunos ejemplos son la morfina, la codeína, el fentanilo y los medicamentos recetados para el dolor. Estas drogas pueden ser altamente adictivas y su uso indebido puede llevar a una sobredosis y la muerte. Es importante seguir las indicaciones médicas al usar opioides.";
  } else if (lowercaseMessage.includes("cocaína")) {
    return "La cocaína es un estimulante poderoso que proviene de las hojas de la planta de coca. Se consume principalmente inhalándola, fumándola o inyectándola. Los efectos de la cocaína incluyen euforia, aumento de la energía, agitación y disminución del apetito. Sin embargo, también puede tener efectos secundarios graves como ritmo cardíaco irregular, convulsiones y paranoia. La cocaína es altamente adictiva y su uso prolongado puede llevar a daños en el corazón, el cerebro y otros órganos.";
  } else if (lowercaseMessage.includes("heroína")) {
    return "La heroína es un opiáceo que se deriva de la morfina. Se consume generalmente inyectándola o fumándola. La heroína produce una sensación intensa de euforia y relajación, pero también puede causar somnolencia, náuseas y problemas respiratorios. El uso de heroína puede llevar rápidamente a la adicción y aumenta el riesgo de sufrir una sobredosis. Además, compartir agujas para inyectarse heroína puede transmitir enfermedades como el VIH y la hepatitis.";
  } else if (lowercaseMessage.includes("mdma") || lowercaseMessage.includes("éxtasis")) {
    return "El MDMA, comúnmente conocido como éxtasis, es una droga estimulante y alucinógena. Se consume principalmente en forma de pastillas o polvo. Los efectos del MDMA incluyen euforia, aumento de la empatía y sensaciones táctiles mejoradas. Sin embargo, el consumo de éxtasis también puede llevar a deshidratación, aumento de la temperatura corporal, ansiedad y depresión. El uso frecuente de MDMA puede dañar el cerebro y el sistema nervioso.";
  } else if (lowercaseMessage.includes("marihuana") || lowercaseMessage.includes("cannabis")) {
    return "La marihuana, también conocida como cannabis, es una droga que se deriva de la planta de cannabis. Se consume principalmente fumándola, aunque también puede ingerirse en alimentos (edibles). Los efectos de la marihuana incluyen relajación, euforia y cambios en la percepción sensorial. Aunque es menos adictiva que algunas otras drogas, el consumo frecuente de marihuana puede afectar la memoria, el aprendizaje y la coordinación.";
  } 
  
  else if (lowercaseMessage.includes("metanfetamina")) {
    return "La metanfetamina es un poderoso estimulante del sistema nervioso central. Se consume comúnmente fumándola, inhalándola o inyectándola. Los efectos de la metanfetamina incluyen aumento de la energía, euforia, hiperactividad y supresión del apetito. Sin embargo, el uso de metanfetamina también puede provocar comportamientos agresivos, paranoia, alucinaciones y daños graves al sistema nervioso y al corazón. El abuso de esta droga puede llevar a una adicción severa y problemas de salud a largo plazo.";
  } else if (lowercaseMessage.includes("crack")) {
    return "El crack es una forma procesada de la cocaína que se fuma. Es altamente adictivo y produce efectos intensos pero de corta duración. Los efectos del crack incluyen euforia, aumento de la energía y supresión del apetito. Sin embargo, también puede causar daños graves al corazón, los pulmones y el sistema nervioso. El uso frecuente de crack puede llevar a una rápida adicción y a problemas de salud graves.";
  } else if (lowercaseMessage.includes("anfetaminas")) {
    return "Las anfetaminas son un grupo de estimulantes que incluyen drogas como el Adderall y el Ritalin. Se utilizan principalmente para tratar el trastorno por déficit de atención e hiperactividad (TDAH) y la narcolepsia. Los efectos de las anfetaminas incluyen aumento de la atención, concentración y energía. Sin embargo, el uso indebido de anfetaminas puede llevar a la dependencia, la ansiedad, la agitación y problemas de salud a largo plazo.";
  } else if (lowercaseMessage.includes("tranquilizantes")) {
    return "Los tranquilizantes son drogas depresoras que se utilizan para reducir la ansiedad y promover la relajación. Algunos ejemplos de tranquilizantes son el Xanax, el Valium y el Ativan. Estas drogas pueden causar sedación, somnolencia y disminución de la coordinación. El uso prolongado de tranquilizantes puede llevar a la dependencia y a problemas de memoria y concentración.";
  } else if (lowercaseMessage.includes("lsd")) {
    return "El LSD, también conocido como ácido, es un poderoso alucinógeno. Se consume generalmente en forma de pequeños trozos de papel impregnados con la droga. Los efectos del LSD incluyen alucinaciones visuales, cambios en la percepción del tiempo y el espacio, y experiencias espirituales. Sin embargo, el uso de LSD también puede causar ataques de pánico, ansiedad y psicosis, especialmente en personas con antecedentes de problemas de salud mental.";
  } else if (lowercaseMessage.includes("psilocibina")) {
    return "La psilocibina es un alucinógeno que se encuentra en ciertos tipos de hongos, conocidos como hongos alucinógenos. Los efectos de la psilocibina incluyen alucinaciones visuales y cambios en la percepción del tiempo y el espacio. Al igual que el LSD, el uso de psilocibina puede llevar a experiencias espirituales y cambios de humor intensos. Sin embargo, también puede causar ansiedad, confusión y náuseas.";
  } else if (lowercaseMessage.includes("herbalife")) {
    return "Herbalife es una empresa que se dedica a la venta de suplementos nutricionales y productos para el control de peso. Sus productos contienen una mezcla de ingredientes naturales y, según la empresa, están diseñados para promover la salud y el bienestar. Sin embargo, es importante recordar que la eficacia de los productos de Herbalife no ha sido respaldada por estudios científicos sólidos y que el uso excesivo de suplementos puede tener efectos negativos para la salud.";
  } else if (lowercaseMessage.includes("tabaco")) {
    return "El tabaco es una planta que se utiliza para la producción de productos de tabaco, como cigarrillos, puros y tabaco de pipa. La nicotina es una sustancia adictiva presente en el tabaco que afecta al sistema nervioso y puede llevar a la adicción. Fumar tabaco está relacionado con numerosos problemas de salud, como enfermedades cardiovasculares, pulmonares y diversos tipos de cáncer.";
  } else if (lowercaseMessage.includes("alcohol")) {
    return "El alcohol es una sustancia que se encuentra en las bebidas alcohólicas, como la cerveza, el vino y los licores. El consumo excesivo de alcohol puede tener efectos perjudiciales para la salud, como daño hepático, trastornos mentales y problemas sociales. El consumo responsable de alcohol es importante para mantener una buena salud y bienestar.";
  }
  else if (lowercaseMessage.includes("donde") && lowercaseMessage.includes("puedo") && lowercaseMessage.includes("recibir") && lowercaseMessage.includes("atención")) {
    return "Busca centros de rehabilitación, grupos de apoyo y profesionales de la salud especializados en adicciones. Siempre hay ayuda disponible.";
  

  // INFORMACIÓN EXTRA: 

}else if (lowercaseMessage.includes("clima") || lowercaseMessage.includes("tiempo")) {
  // Llamar a las funciones para obtener el clima y la hora actual
  const weatherPromise = getWeather();
  const timePromise = getTime();

  // Esperar a que ambas promesas se resuelvan
  Promise.all([weatherPromise, timePromise])
    .then(([weather, time]) => {
      // Devolver la información del clima y la hora obtenida
      const reply = `El clima de hoy ${weather}`;
      addMessage(reply, "received");
    })
    .catch((error) => {
      console.error("Error al obtener información del clima y la hora:", error);
      addMessage("Lo siento, no pude obtener la información en este momento.", "received");
    });

  // Devolver una respuesta mientras se esperan las promesas
  return reply;
}


else if (lowercaseMessage.includes("hora") || lowercaseMessage.includes("fecha")) {
  // Llamar a las funciones para obtener el clima y la hora actual
  const timePromise = getTime();

  
  // Esperar a que ambas promesas se resuelvan
  Promise.all([timePromise])
    .then(([time]) => {
      // Devolver la información del clima y la hora obtenida
      const reply = `El día de hoy ${time}`;
      addMessage(reply, "received");
    })
    .catch((error) => {
      console.error("Error al obtener información del clima y la hora:", error);
      addMessage("Lo siento, no pude obtener la información en este momento.", "received");
    });

  // Devolver una respuesta mientras se esperan las promesas
  return reply;
}





  // DATA:


else {

    // Utilizar compromise.js para analizar el mensaje de entrada y extraer entidades
    const doc = nlp(message);
    const entities = doc.entities().out('array');

    if (entities.length > 0) {
      // Ejemplo de respuesta utilizando entidades extraídas
      const entity = entities.find((entity) => entity.normal !== undefined);
      if (entity) {
        return `¿Podrías proporcionar más detalles sobre ${entity.text}?`;
      }
    }

    return "Lo siento, no puedo comprender tu mensaje. Por favor, sé más específico o utiliza otro lenguaje.";
  }
}

var chatLog = document.getElementById("chat-log");
var userInput = document.getElementById("user-input");
var sendButton = document.getElementById("send-button");
var backButton = document.getElementById("back-button");

// Escuchar el evento click del botón "Volver" y redireccionar a otra página
backButton.addEventListener("click", goToOtherPage);

// Función para redireccionar a otra página
function goToOtherPage() {
  // Cambiar "otra-pagina.html" por la URL de la página a la que deseas redireccionar
  window.location.href = "../Principal.html";
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
