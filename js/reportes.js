const ctxVentas = document.getElementById("graficoVentas");

new Chart(ctxVentas, {
  type: "bar",
  data: {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas en pesos",
        data: [250000, 300000, 280000, 420000, 390000, 520000],
        backgroundColor: "#dd403a",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  },
});

const ctxServicio = document.getElementById("graficoServicios");

new Chart(ctxServicio, {
  type: "doughnut",
  data: {
    labels: [
      "Consulta Médica",
      "Peluquería",
      "Guardería",
      "Vacunación",
      "Urgencias",
    ],
    datasets: [
      {
        label: "Ingresos por Servicio ($)",
        data: [450000, 320000, 180000, 210000, 550000],
        backgroundColor: [
          "#dd403a",
          "#2e86ab",
          "#f6ae2d",
          "#56eeaa",
          "#343a40",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "55%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  },
});

const ctxTendencia = document.getElementById("graficoTendencia");

new Chart(ctxTendencia, {
  type: "line",
  data: {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Flujo de Clientes",
        data: [120, 185, 140, 210],
        borderColor: "#00dbc2",
        backgroundColor: "rgba(0, 219, 194, 0.1)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  },
});

const canvasPolar = document.getElementById("graficoPolar");

new Chart(canvasPolar, {
  type: "polarArea",
  data: {
    labels: ["Perros", "Gatos", "Aves", "Hámsters"],
    datasets: [
      {
        label: "Pacientes atendidos",
        data: [120, 85, 45, 25],
        backgroundColor: [
          "#dd3f3a7b",
          "#2e86ab71",
          "#f6b02d71",
          "#00dbc172",
        ],
      },
    ],
  },
  options: {
    responsive: true,
  },
});