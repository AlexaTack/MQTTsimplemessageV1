// Gegevens van de client.
var mqttHost = "farmer.cloudmqtt.com";
var mqttPort = 34511;
var user = "itiwppsz";
var password = "BkRYsnNyy_tk";


window.onload = Init;

function Init()
{
    var clientId = Math.floor(Math.random() * 10001);
    client = new Paho.MQTT.Client(mqttHost, Number(mqttPort), String(clientId));

    // Event onMessageArrived, koppelen met functie onMessageArrived.
    client.onMessageArrived = onMessageArrived;

    // Verbinding maken met de broker.
    client.connect(
        {
            onSuccess:onConnected, 
            userName:user,
            password:password,
            useSSL:true
        }
    );

    // Klikken op de knop, koppelen met een actie...
    document.getElementById("btnSendMessage").addEventListener("click",
    function(){
        message = new Paho.MQTT.Message(
            document.getElementById("tbxMessage").value);
        message.destinationName = "demo";       // Moet gelijk zijn aan 'topic'.
        client.send(message);
    })
}

function onConnected(){
    console.log("onConnected");
    client.subscribe("demo",
        {
            onSuccess:onSubscribed
        }
    );
}

function onMessageArrived(message){
    var currentTime = new Date();

    document.getElementById("divSubscription").innerHTML +=
        message.payloadString + " (" + currentTime.toLocaleTimeString() + ")<br>";
    console.log("onMessageArrived: " + message.payloadString);    
}

function onSubscribed(invocationContext){
    console.log("onSubscribed");
}