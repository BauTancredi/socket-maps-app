const Markers = require("./Markers");

class Sockets {
  constructor(io) {
    this.io = io;

    this.markers = new Markers();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.emit("active-markers", this.markers.active);

      socket.on("new-marker", (marker) => {
        this.markers.addMarker(marker);
        socket.broadcast.emit("new-marker", marker);
      });

      socket.on("marker-updated", (marker) => {
        this.markers.updateMarker(marker);
        socket.broadcast.emit("marker-updated", marker);
      });
    });
  }
}

module.exports = Sockets;
