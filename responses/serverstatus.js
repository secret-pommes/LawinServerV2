const API_URL = "https://pommesmitketchup.com/api/serverstaus";
console.log("Using: " + API_URL + " as API.");

document.addEventListener("DOMContentLoaded", function () {
  const proxy = document.getElementById("proxyStatus");
  const connection = document.getElementById("connectionStatus");
  const lawinserverv2 = document.getElementById("lawinserverv2Status");
  const proxyStatusV2 = document.getElementById("proxyStatusV2");

  if (fetch(API_URL + "/proxyCheck")) {
    proxy.innerHTML = "Online";
    proxyStatusV2.innerHTML = "Online";
    proxy.style.color = "green";
    proxyStatusV2.style.color = "green";
  } else {
    proxy.innerHTML = "Offline";
    proxyStatusV2.innerHTML = "Offline";
    proxy.style.color = "red";
    proxyStatusV2.style.color = "red";
  }

  if (fetch(API_URL + "/connectionCheck")) {
    connection.innerHTML = "Online";
    connection.style.color = "green";
  } else {
    connection.innerHTML = "Offline";
    connection.style.color = "red";
  }
  lawinserverv2.innerHTML = "Online";
  lawinserverv2.style.color = "green";
  // makes no sense to implement this cuz if lawinserver server is off the page cant be displayed ^^
});
