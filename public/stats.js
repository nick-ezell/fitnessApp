// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}

function populateChart(data) {
  let durations = duration(data);
  let totalDurations = totalDuration(data);
  let pounds = calculateWeight(data);
  let totalPounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  let days = workoutDays(data);
  const colors = generatePalette();

  document.querySelector("h2").textContent = `(${days.all[0]} to ${
    days.all[days.all.length - 1]
  })`;

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: days.all,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: totalDurations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Workout Durations",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: days.resistance,
      datasets: [
        {
          label: "Pounds",
          data: totalPounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Resistance Workout Weight Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts.all,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text:
          "Duration in Minutes of Each Exercise Relative to Total Workout Time",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts.resistance,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text:
          "Weight in Pounds of Each Resistance Exercise Relative to Total Weight Lifted",
      },
    },
  });
}

function duration(data) {
  let durations = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function totalDuration(data) {
  let totalDurations = [];

  data.forEach((workout) => {
    totalDurations.push(workout.totalDuration);
  });

  return totalDurations;
}

function calculateWeight(data) {
  let pounds = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.type === "resistance") {
        pounds.push(exercise.weight);
      }
    });
  });

  return pounds;
}

function calculateTotalWeight(data) {
  let totalPounds = [];

  data.forEach((workout) => {
    let workoutPounds = 0;
    workout.exercises.forEach((exercise) => {
      if (exercise.type === "resistance") {
        workoutPounds += exercise.weight;
      }
    });
    if (workoutPounds !== 0) {
      totalPounds.push(workoutPounds);
    }
  });

  return totalPounds;
}

function workoutNames(data) {
  let workouts = {
    all: [],
    resistance: [],
  };

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.all.push(exercise.name);
      if (exercise.type === "resistance") {
        workouts.resistance.push(exercise.name);
      }
    });
  });

  return workouts;
}

function workoutDays(data) {
  let days = {
    all: [],
    resistance: [],
  };

  data.forEach((workout) => {
    days.all.push(moment(workout.day).format("ddd M/D, h:mm A"));
    let exercises = workout.exercises;
    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].type === "resistance") {
        days.resistance.push(moment(workout.day).format("ddd M/D, h:mm A"));
        break;
      }
    }
  });

  return days;
}
