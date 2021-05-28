
var model;
    
class L2 {
  static className = 'L2';
  constructor(config) {
     return tf.regularizers.l1l2(config)
  }
}
tf.serialization.registerClass(L2);

async function run() {
  model = await tf.loadLayersModel('https://raw.githubusercontent.com/sahilsid/public_files/master/weights/W/1/model.json', strict = false);
}  

document.addEventListener('DOMContentLoaded', run);



function plot_timeseries(){
  $(".generate_output").css("display", "inline");
  $('#model_prediction').remove(); 
  $('iframe.chartjs-hidden-iframe').remove(); 
  $('.barchart').append('<canvas id="model_prediction" width="10%"><canvas>'); 

  $('#timeseries_visualization').remove(); 
  $('iframe.chartjs-hidden-iframe').remove(); 
  $('.linegraph').append('<canvas id="timeseries_visualization" width="10%"></canvas>'); 

  var series = $("#time_series").val(); 
  series   = series.replace(/[\n\s]/g, ",");
  series   = series.replace(/\s\s+/g, ',');
  series   = series.replace(/[,]+/g, ',');
  console.log(series)
  series   = series.split(',').map(function(series){return Number(series);});
  labels   = []
  plot_data= []
  for (i = 0; i < series.length; i++) {
    plot_data.push({"x":i+1,"y":series[i]})
    labels.push(i+1)
  }
  var ctx = document.getElementById('timeseries_visualization').getContext('2d');
  Chart.defaults.global.defaultFontSize = 14;
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              backgroundColor: 'rgba(255, 99, 132,0.05)',
              borderColor: 'rgb(205, 99, 192)',
              data: series
          }]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Value',
            },
            ticks:{
              fontSize:14
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Timestep',
              
            },
            ticks:{
              fontSize:14
            },
          }]
        }   
      },
  });
  input_tensor       = tf.tensor(series).reshape([1,1,series.length])
  prediction_tensor  = model.predict(input_tensor);
  prediction_values  = Array.from(prediction_tensor.dataSync());
  console.log(prediction_values)
  transition_labels = ["No Transition","a Smooth Transition","a Critical Transition"]
  $("#transition_type").text(transition_labels[argMax(prediction_values)])

  var barchart = new Chart(document.getElementById("model_prediction"), {
      type: 'horizontalBar',
      data: {
        labels: ["No Transition", "Smooth Transition", "Critical Transition"],
        datasets: [
          {
            label: "Prediction Probability",
            backgroundColor: ["#3cba9f","#e8c3b9","#c45850"],
            data: prediction_values
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Probability of Prediction',
          position: 'bottom',
          fontColor: '#2c2c2c'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#2c2c2c', // X-Axis font color
                fontStyle: 'bold',    // X-Axis font style 
              },
            },
          ],
          xAxes: [{
            ticks:{
              fontColor: '#2c2c2c', // X-Axis font color
              
            },
          }]
        }
      }
  });
}

function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}