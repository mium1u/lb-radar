const socket = new WebSocket('ws://localhost:4001');
const satelliteData = [];
const objectData = [];

socket.onmessage = function(event) {
  const message = JSON.parse(event.data);
  if (message.id === 'object') {
    objectData.push({ x: message.x, y: message.y });
  } else {
    satelliteData.push({ x: message.x, y: message.y });
  }
  updatePlot();
};

function updatePlot() {
  const satelliteTrace = {
    x: satelliteData.map(d => d.x),
    y: satelliteData.map(d => d.y),
    mode: 'markers',
    type: 'scatter',
    name: 'Satellites',
    marker: { size: 8, color: 'blue' }
  };

  const objectTrace = {
    x: objectData.map(d => d.x),
    y: objectData.map(d => d.y),
    mode: 'markers',
    type: 'scatter',
    name: 'Object',
    marker: { size: 12, color: 'red' }
  };

  const layout = {
    title: 'GPS Emulation Viewer',
    xaxis: { title: 'X Coordinate (km)' },
    yaxis: { title: 'Y Coordinate (km)' },
    showlegend: true
  };

  Plotly.newPlot('plot', [satelliteTrace, objectTrace], layout);
}