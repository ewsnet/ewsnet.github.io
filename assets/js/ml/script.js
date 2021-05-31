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



$( ".display_real_data" ).click(function() {
  // $(".display_real_data")
  $('.display_simulated_data').removeClass("active")
  $('.display_real_data').addClass("active")
  $("#simulated_data").hide()
  $("#real_world_data").show()
});


$( ".display_simulated_data" ).click(function() {
  // $(".display_real_data")
  $('.display_real_data').removeClass("active")
  $('.display_simulated_data').addClass("active")
  $("#real_world_data").hide()
  $("#simulated_data").show()
});

$( "#generate_simulated_data" ).click(function() {
  setTimeout(generate_simulated_data, 50);
  $('.loading_icon_sde').show()
  $( '#loading_message_sde' ).html( '<strong> Simulating stochastic time series data by solving the differential equation... </strong>');
});


$( "#visualize_time_series" ).click(function() {
  setTimeout(plot_timeseries, 50);
  $('.loading_icon_plot').show()
  $( '#loading_message_plot' ).html( '<strong> Plotting Time Series ... </strong>');
});


$( "#make_prediction" ).click(function() {
  
  setTimeout(predict_transition, 50);
  $('.loading_icon_model').show()
  $( '#loading_message_model' ).html( '<strong> Running EWSNet on the provided time series ... </strong>');
});
                          

function predict_transition(){
  var series = $("#time_series").val(); 
  series   = series.replace(/[\n\s]/g, ",");
  series   = series.replace(/\s\s+/g, ',');
  series   = series.replace(/[,]+/g, ',');
  series   = series.split(',').map(function(series){return Number(series);});

  // var series = generate_simulated_data(); 
  // $("#time_series").val(series);
  
  $(".generate_output").css("display", "inline");
  $('#model_prediction').remove(); 
  $('iframe.chartjs-hidden-iframe').remove(); 
  $('.barchart').append('<canvas id="model_prediction" width="10%"><canvas>'); 

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
  $('.loading_icon_model').hide()

}

function plot_timeseries(){
  $(".generate_plot").css("display", "inline");
  
  $('#timeseries_visualization').remove(); 
  $('iframe.chartjs-hidden-iframe').remove(); 
  $('.linegraph').append('<canvas id="timeseries_visualization" width="10%"></canvas>'); 

  var series = $("#time_series").val(); 
  series   = series.replace(/[\n\s]/g, ",");
  series   = series.replace(/\s\s+/g, ',');
  series   = series.replace(/[,]+/g, ',');
  series   = series.split(',').map(function(series){return Number(series);});

  labels   = []
  plot_data= []
  for (i = 0; i < series.length; i++) {
    plot_data.push({"x":i+1,"y":series[i]})
    labels.push(i+1)
  }
  console.log(series.length,labels.length)
  var ctx = document.getElementById('timeseries_visualization').getContext('2d');
  Chart.defaults.global.defaultFontSize = 14;
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              backgroundColor: 'rgba(255, 99, 132,0.05)',
              borderColor: 'rgb(205, 99, 192)',
              data: series,
              borderWidth:1.5,
              pointRadius: 0,
              // lineTension: 0,
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
  $('.loading_icon_plot').hide()
}

function argMax(array) {
  return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function generate_simulated_data(){
  var c=1; 
  var r=1;      
  const n_max=400;    
  const c_max=3;
  const t_max=300;
  const dt=0.01;
  var da = (c_max-c)/n_max;
  var b = 1;
  var n = 0;
  var t = 0;
  var h = 1;
  var corr = 0.0;     
  var k = 5.2;
  var sigma = 0.10
  var x0 = 70+Math.random();
  var x = x0;

  var series = []
  while (n<n_max) {
    n=n+1; 
    t=0.0;
    c=c+da;
    y=d3.randomNormal(0, 1)();
    while(t < t_max){
      aa  = r*x*(1-(x/k));
      aaa = c*(Math.pow(x,2))/((Math.pow(b,2))+(Math.pow(x,2)));
      x   = x + (aa-aaa)*dt + sigma*d3.randomNormal(0, 1)()*x*(Math.sqrt(dt))*y; 
      y   = corr*y + (Math.sqrt(1-Math.pow(corr,2)))*d3.randomNormal(0, 1)();
      t   = t+dt;
    }      
    series.push(x)        
  }     

  $('.loading_icon_sde').hide()
  $("#time_series").val(series);
}