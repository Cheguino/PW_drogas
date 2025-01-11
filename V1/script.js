// Función para agregar un mensaje al chat log
function addMessage(message, sender) {
  var messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender);
  messageElement.innerHTML = `
    <span class="sender">${sender === 'received' ? 'Chatbot' : 'Tú'}:</span>
    <span class="content">${message}</span>
  `;
  chatLog.appendChild(messageElement);

  // Scroll automático hacia el último mensaje
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Función para enviar un mensaje
function sendMessage() {
  var message = userInput.value;
  addMessage(message, "sent");

  // Lógica del chatbot de salud
  var reply = generateReply(message);
  setTimeout(function () {
    addMessage(reply, "received");
  }, 500);

  userInput.value = "";
}

function generateReply(message) {
  // Utilizar compromise.js para analizar el mensaje de entrada
  const doc = nlp(message);

  // Extraer las entidades y palabras clave del mensaje
  const entities = doc.nouns().out('array');
  const verbs = doc.verbs().data().map(verb => verb.text);

  // Lógica de respuesta del chatbot
  if (message.includes("hola") || message.includes("buenos días") || message.includes("buenas tardes") || message.includes("buenas noches") || message.includes("buen día")) {
    return "¡Buenos días! Estoy aquí para ayudarte. ¿En qué puedo asistirte?";
  } else if (message.includes("cómo") && message.includes("estás")) {
    return "Estoy aquí para ayudarte. ¿En qué puedo asistirte?";
  } else if (message.includes("dolor")) {
    return "¿En qué parte del cuerpo sientes el dolor?";
  } else if (message.includes("duele") || message.includes("cabeza")) {
    return "Entiendo que te duele la cabeza, puedes consultar a tu médico...";

  } else if (message.includes("drogadiccion")) {
    return "La drogadicción es una enfermedad caracterizada por la dependencia a sustancias adictivas.";
  } else if (message.includes("efectos")) {
    return "Los efectos de las drogas varían según el tipo y la forma de consumo. Pueden afectar el estado de ánimo, la percepción y la salud. ¿Tienes alguna pregunta sobre una droga en particular?";
  } else if (message.includes("cocaina")) {
    return "La cocaína es un estimulante potente que aumenta la energía y produce euforia. Sin embargo, puede causar problemas cardiovasculares, trastornos mentales, convulsiones y daño cerebral a largo plazo.";
  } else if (message.includes("heroina")) {
    return "La heroína es un opioide altamente adictivo que produce una sensación intensa de euforia y analgesia. Sus efectos dañinos incluyen la supresión del sistema respiratorio, riesgo de sobredosis letal y la propagación de enfermedades infecciosas por el uso de agujas compartidas.";
  } else if (message.includes("marihuana")) {
    return "La marihuana es una droga psicoactiva que puede producir relajación y alteraciones perceptivas. Su consumo prolongado puede afectar la memoria, el aprendizaje y la función pulmonar, y puede aumentar el riesgo de trastornos mentales en personas vulnerables.";
  } else if (message.includes("anfetaminas")) {
    return "Las anfetaminas son estimulantes que aumentan la energía y la concentración. Sin embargo, su abuso puede provocar problemas cardiovasculares, trastornos del sueño, ansiedad, paranoia y dependencia.";
  } else if (message.includes("LSD") || message.includes("lsd")) {
    return "El LSD es un alucinógeno que produce distorsiones visuales y alteraciones en la percepción. Su consumo puede desencadenar reacciones psicóticas, ansiedad intensa, flashbacks y alteraciones en la salud mental a largo plazo.";
  } else if (message.includes("metanfetaminas")) {
    return "Las metanfetaminas son estimulantes altamente adictivos que aumentan la energía y la euforia. El uso prolongado puede provocar deterioro cognitivo, psicosis, daño neuronal y problemas dentales graves (conocidos como 'boca de metanfetamina').";
  } else if (message.includes("opioides")) {
    return "Los opioides son analgésicos potentes que se usan para aliviar el dolor. El abuso de opioides puede llevar a la adicción, la depresión respiratoria, la sobredosis y la propagación de enfermedades infecciosas por el uso de agujas compartidas.";
  } else if (message.includes("extasis")) {
    return "El éxtasis (MDMA) es una droga estimulante y alucinógena que aumenta la energía y la empatía. Su consumo puede provocar deshidratación, hipertermia, daño renal, trastornos del estado de ánimo y problemas de memoria a largo plazo.";
  } else if (message.includes("cannabis")) {
    return "El cannabis es una droga que contiene cannabinoides, como el THC. Puede producir relajación, alteraciones perceptivas y aumento del apetito. Su consumo prolongado puede afectar la memoria, la concentración y el desarrollo cerebral en los jóvenes.";
  } else if (message.includes("alcohol")) {
    return "El alcohol es una sustancia depresora del sistema nervioso central. Su consumo en exceso puede causar daño en el hígado, problemas cardiovasculares, trastornos mentales, dependencia y aumentar el riesgo de accidentes y lesiones.";
  } else if (message.includes("tipos")) {
    return "Hay estimulantes, depresores, alucinógenos y cannabinoides, entre otros. ¿Te interesa alguna droga específica?";
  } else if (message.includes("sintomas")) {
    return "La pérdida de control, la incapacidad para dejar de consumir y los síntomas de abstinencia son algunos signos comunes de la adicción. Si crees tener un problema, busca ayuda profesional.";
  } else if (message.includes("consecuencias")) {
    return "La drogadicción puede tener consecuencias negativas para la salud física, mental y social, además de problemas legales y financieros. Busca ayuda para minimizar sus efectos.";
  } else if (message.includes("tratamientos")) {
    return "El tratamiento puede incluir desintoxicación, terapia cognitivo-conductual, grupos de apoyo y programas de rehabilitación. Consulta a profesionales para obtener el mejor plan de tratamiento.";
  } else if (message.includes("prevención")) {
    return "La prevención implica educación sobre los riesgos de las drogas, estilos de vida saludables y habilidades de resistencia a la presión. Actuar temprano y contar con apoyo social son clave.";
  } else if (message.includes("donde") && message.includes("obtener") && message.includes("ayuda")) {
    return "Busca centros de rehabilitación, grupos de apoyo y profesionales de la salud especializados en adicciones. Siempre hay ayuda disponible.";
  } else if (message.includes("riesgos") && message.includes("automedicacion")) {
    return "La automedicación con drogas psicoactivas puede enmascarar síntomas, interactuar con otros medicamentos y causar dependencia y efectos secundarios. Consulta siempre a un profesional de la salud.";
  } else if (message.includes("embarazo")) {
    return "El consumo de drogas durante el embarazo aumenta el riesgo de complicaciones y problemas para el feto. Es importante evitarlas durante esta etapa.";
  } else if (message.includes("deteccion") && message.includes("temprana")) {
    return "La detección temprana de la adicción es crucial. Presta atención a cambios de comportamiento, problemas de salud y dificultades en el trabajo o estudios. Busca ayuda si sospechas de una adicción.";
  } else if (message.includes("recaidas")) {
    return "Las recaídas son comunes en el proceso de recuperación de la adicción. Es importante aprender a manejarlas, buscar apoyo y retomar el camino hacia la recuperación.";
  } else if (message.includes("recursos")) {
    return "Existen recursos como programas educativos, campañas de prevención y organizaciones especializadas que ofrecen información y apoyo en la prevención de la drogadicción. Explora opciones locales y en línea para acceder a estos recursos.";
  }
  else if (message.includes("gracias")) {
    return "De nada, estoy para servirte";
  }

  else if (entities.length > 0) {
    // Ejemplo de respuesta utilizando entidades extraídas
    const entity = entities.find((entity) => entity.normal !== undefined);
    if (entity) {
      return `¿Podrías proporcionar más detalles sobre ${entity.text}?`;
    } else {
      return "Lo siento, no puedo comprender tu mensaje. Por favor, sé más específico o utiliza otro lenguaje.";
    }
  } else {
    return "Lo siento, no puedo comprender tu mensaje. Por favor, sé más específico o utiliza otro lenguaje.";
  }
}



// Obtener elementos del DOM
var chatLog = document.getElementById("chat-log");
var userInput = document.getElementById("user-input");
var sendButton = document.getElementById("send-button");

// Evento click del botón de enviar
sendButton.addEventListener("click", sendMessage);

// Evento keypress del input de texto
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
