const { request, response } = require('express');

const socket = async (req, res = response) => {
    res.sendFile(dirname + "/templates/socket.html");
}

module.exports = {
    socket
}