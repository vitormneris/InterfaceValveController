const client = mqtt.connect('wss://test.mosquitto.org:8081');

client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    client.subscribe('valve/status', (err) => {
        if (!err) {
            console.log('Inscrito no tópico valve/status');
        }
    });
    client.subscribe('sensor/distance', (err) => {
        if (!err) {
            console.log('Inscrito no tópico sensor/distance');
        }
    });
});

client.on('message', (topic, message) => {
    const messageDistancia = document.getElementById('messageDistancia');
    const messageStatus = document.getElementById('messageStatus');

    if (topic === 'sensor/distance') {
        messageDistancia.innerText = `Tópico: ${topic}\nDistância da água até o sensor: ${message.toString()} cm\n`;

    } else if (topic === 'valve/status') {
        messageStatus.innerText = `Tópico: ${topic}\n Status da valvula: ${message.toString()} \n`;
    }
});

document.getElementById('openButton').onclick = () => {
    client.publish('valve/controller', 'abrir');
    console.log('Comando enviado: abrir');
};

document.getElementById('closeButton').onclick = () => {
    client.publish('valve/controller', 'fechar');
    console.log('Comando enviado: fechar');
};

