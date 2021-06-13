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
  $("#steps_to_consider").val(400);
});

$( ".display_saddle_node_bifurcation" ).click(function() {
  // $(".display_real_data")
  $('.display_transcritical_bifurcation').removeClass("active")
  $('.display_saddle_node_bifurcation').addClass("active")
  $("#transcritical_bifurcation").hide()
  $("#saddle_node_bifurcation").show()
});


$( ".display_transcritical_bifurcation" ).click(function() {
  // $(".display_real_data")
  $('.display_saddle_node_bifurcation').removeClass("active")
  $('.display_transcritical_bifurcation').addClass("active")
  $("#saddle_node_bifurcation").hide()
  $("#transcritical_bifurcation").show()

});

$( "#generate_simulated_data" ).click(function() {
  var models = {"saddle_node":generate_saddle_node,"transcritical":generate_transcritical};
  var generator_function;
  for (const [ key, value ] of Object.entries(models)) {
    var button_name = ".display_"+key+"_bifurcation"
    if(button_name,$(button_name).hasClass('active')){
      generator_function = value
    }   
  }
  setTimeout(generator_function, 50);
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
                          

function load_real_world_data(key="tripati2005eocene"){
  var series = null;
  var steps_to_consider;
  switch (key) {
    case "tripati2005eocene":
          // series = '12.185,14.142,13.343,12.745,13.964,12.151,13.769,18.289,15.694,11.312,11.691,17.302,20.733,15.958,19.471,13.383,11.208,16.484,11.956,20.585,22.377,14.403,17.615,14.478,22.58,27.211,29.037,19.73,21.506,18.756,31.187,36.339,40.272,43.008,36.023,39.764,46.011,56.769,57.737,50.347,51.63,52.64,49.966,57.444,41.997,56.65,45.978,47.33,58.682,66.348,64.119,55.709,54.726,57.951,51.079,52.501,43.362,45.553,47.063,48.696,52.725,54.47,59.286,57.371,66.379,56.622,56.652,47.626,44.583,43.546,45.021,39.422,52.532,42.555,53.876,46.198,51.77,50.891,71.398,63.84,73.206,77.715,70.913,72.908,70.014,73.288,68.34,54.73,47.669,20.298,20.37,27.376,39.42,44.887,46.155,41.658,32.114,49.494,55.06,59.721,63.907,67.581,61.909,55.188,48.698,19.517,20.621,18.307,14.161,17.631,17.034,17.484,17.772,14.462,12.819,10.036,12.807,14.855,18.265,22.211,19.416,25.806,33.427,24.678,26.487,24.101,36.068,26.132,29.199,24.506,26.952,26.453,22.486,26.932,30.342,33.539,36.675,36.211,43.724,47.684,36.432,46.488,34.926,47.46,47.16,46.861,48.706,46.643,50.136,53.044,51.771,50.55,45.909,41.96,44.809,36.003,53.257,20.206,41.968,34.217,38.148,34.488,33.343,23.322,12.32,19.534,11.38,19.164,25.157,28.65,27.092,25.367,23.981,20.407,18.983,14.617,10.771,7.6827,5.9902,4.7051,3.1334,0.87425,1.2069,2.8629,4.5827,10.519,19.077';
          series = '88.7,88.702,87.804,86.309,84.417,82.152,79.533,79.631,77.437,78.924,78.684,71.436,71.736,77.67,72.514,67.007,77.126,71.672,62.133,64.747,70.531,70.03,75.04,69.757,70.318,70.116,68.713,72.636,78.606,65.496,65.226,69.258,58.207,67.034,68.14,67.564,68.381,57.744,47.018,62.323,66.523,57.447,60.025,69.705,69.115,58.429,61.326,78.119,68.574,65.721,63.36,55.358,61.892,33.094,48.999,43.138,51.982,50.156,55.413,56.569,55.849,45.647,50.217,56.213,48.293,37.126,30.772,18.525,19.046,20.114,25.357,27.781,21.602,18.382,13.892,11.334,7.3629,5.481,15.639,22.838,25.33,35.129,10.221,12.897,12.166,12.888,15.643,10.367,10.44,8.9536,1.8981,0.2,0.2,0.2,0.2,0.2,0.12991,0.1,0.16947,0.2,0.2,0.2,0.2,0.16417,0.067601,0.1,0.1,0.1,0.16636,0.18396,0.1,1.2855,5.8741,12.185,14.142,13.343,12.745,13.964,12.151,13.769,18.289,15.694,11.312,11.691,17.302,20.733,15.958,19.471,13.383,11.208,16.484,11.956,20.585,22.377,14.403,17.615,14.478,22.58,27.211,29.037,19.73,21.506,18.756,31.187,36.339,40.272,43.008,36.023,39.764,46.011,56.769,57.737,50.347,51.63,52.64,49.966,57.444,41.997,56.65,45.978,47.33,58.682,66.348,64.119,55.709,54.726,57.951,51.079,52.501,43.362,45.553,47.063,48.696,52.725,54.47,59.286,57.371,66.379,56.622,56.652,47.626,44.583,43.546,45.021,39.422,52.532,42.555,53.876,46.198,51.77,50.891,71.398,63.84,73.206,77.715,70.913,72.908,70.014,73.288,68.34,54.73,47.669,20.298,20.37,27.376,39.42,44.887,46.155,41.658,32.114,49.494,55.06,59.721,63.907,67.581,61.909,55.188,48.698,19.517,20.621,18.307,14.161,17.631,17.034,17.484,17.772,14.462,12.819,10.036,12.807,14.855,18.265,22.211,19.416,25.806,33.427,24.678,26.487,24.101,36.068,26.132,29.199,24.506,26.952,26.453,22.486,26.932,30.342,33.539,36.675,36.211,43.724,47.684,36.432,46.488,34.926,47.46,47.16,46.861,48.706,46.643,50.136,53.044,51.771,50.55,45.909,41.96,44.809,36.003,53.257,20.206,41.968,34.217,38.148,34.488,33.343,23.322,12.32,19.534,11.38,19.164,25.157,28.65,27.092,25.367,23.981,20.407,18.983,14.617,10.771,7.6827,5.9902,4.7051,3.1334,0.87425,1.2069,2.8629,4.5827,10.519,19.077,26.673,30.64,29.341,25.866,21.288,17.14,16.162,11.848,8.9415,8.2283,6.3606,4.6392,3.3168,5.2018,8.048,13.958,14.164,14.889,16.613,18.709,21.048,23.507,19.347,21.691,25.606,28.743,35.628,40.109,37.735,34.492,31.236,26.76,19.608,18.929,16.759,16.627,23.084,17.302,14.982,11.614,6.2833,6.6936,11.113,29.968,21.543,16.57,19.379,20.689,29.315,30.502,33.046,41.895,40.859,40.02,39.721,42,39.792,35.065,28.996,26.514,28.356,25.491,34.805,45.8,46.474,52.265,49.645,45.669,38.468,27.319,14.16,10.307,9.035,7.848,7.869,7.5495,5.6757,4.9791,6.5093,3.0146,0.3729,0.76231,1.71,3.2915,5.2013,7.88,7.7802,7.3762,5.7296,0.60542,0.42579,0.31454,0.21475,0.2,0.2,0.2,0.2,0.2,0.2,0.26285,0.81948,1.5486,0.2,0.2,0.36293,0.99112,5.3319,0.21248,0.7946,0.70641,9.1389,10.559,13.789,19.963,22.245,28.29,29.754,34.566,43.053,34.734,26.18,24.282,20.722,14.207,8.5193,3.1157,6.5923,10.65,13.15,13.711,14.273,13.706,12.807,11.909,11.037,10.199,9.3606,8.7918,10.862,12.933,15.004,16.974,17.847,18.72,19.593,20.349,19.675,19.002,18.328,17.617,16.39,15.162,13.935,13.11,12.436,11.763,11.089,11.371,12.026,12.681,13.336,13.99,13.839,12.342,10.845,9.3486,8.5253,8.8675,9.2096,9.5518,9.8939,9.7728,9.4435,9.1142,9.4146,10.887,12.359,13.83,14.8,14.8,14.8,14.219,13.351,12.483,11.432,10.01,8.5883,8.7552,9.7532,10.751,11.749,13.109,14.666,16.223,17.607,18.605,19.603,20.601,20.896,19.549,18.202,16.855,14.904,12.928,10.953,8.3155,5.2719,2.7192,1.1417,1.2914,2.1467,2.7422,3.1413,4.2019,7.5729,16.105,25.612,35.192,48.377,58.316,63.387,61.366,70.28,71.403,72.526,73.648,74.771,75.894,77.016,78.139,79.262,80.384,81.507,82.63,83.752,84.875,84.667,84.293,83.919,83.545,83.171,82.796,82.422,82.048,81.674,81.299,80.925,80.551,80.177,79.803,79.428,79.054,78.68,78.306,77.931,77.557,77.183,76.809,76.435,76.06,75.686,75.312,75.062,75.437,75.811,76.185,76.559,76.933,77.308,77.682,78.056,78.43,78.805,79.179,79.553,79.927,79.096,77.973,76.85,75.728,74.605,73.482,72.36,71.237,70.114,68.992,67.869,66.746,65.624,64.834,64.46,64.085,63.711,63.337,62.963,62.588,62.214,61.84,61.466,61.092,60.717,60.343,60.093,61.216,62.339,63.461,64.584,65.707,66.829,67.952,69.075,70.197,71.32,72.443,73.565,74.688,74.73,74.356,73.981,73.607,73.233,72.859,72.484,72.11,71.736,71.362,70.988,70.613,70.239,70.405,71.528,72.651,73.773,74.896,76.019,77.141,78.264,79.387,80.509,81.632,82.755,83.877,85'
          steps_to_consider = 187;
          break;

    case "chen2018rising":
          // series = '0.0000000e+00,0.0000000e+00,0.0000000e+00,0.0000000e+00,2.1686700e+00,1.2650600e+00,9.0361400e-01,9.9397600e+00,2.7108400e+00,9.9397600e+00,6.5060200e+00,5.4216900e+00,1.1385500e+01,1.0301200e+01,1.2469900e+01,8.4939800e+00,3.4337300e+00,1.0120500e+01,2.1325300e+01,2.2771100e+01,4.8795200e+00,1.0120500e+01,1.8795200e+01,9.2168700e+00,1.3915700e+01,9.5783100e+00,8.6747000e+00,2.3313300e+01,5.1325300e+01,2.3674700e+01,3.3433700e+01,9.9397600e+00,6.5060200e+00,6.8674700e+00,6.3253000e+00,6.5060200e+00,1.7349400e+01,4.0843400e+01,2.3132500e+01,1.7168700e+01,1.9879500e+01,1.8433700e+01,3.5783100e+01,3.5241000e+01,3.5783100e+01,4.5542200e+01,5.1144600e+01,4.8072300e+01,4.8975900e+01,3.0765300e+01,4.6071400e+01,3.1003000e+01,4.0867300e+01,3.0050000e+01,4.1479600e+01,4.3928600e+01,4.5000000e+01,4.9000000e+01,3.8100000e+01';
          series = '0,0,0,0,2.1687,1.2651,0.90361,9.9398,2.7108,9.9398,6.506,5.4217,11.386,10.301,12.47,8.494,3.4337,10.12,21.325,22.771,4.8795,10.12,18.795,9.2169,13.916,9.5783,8.6747,23.313,51.325,23.675,33.434,9.9398,6.506,6.8675,6.3253,6.506,17.349,40.843,23.133,17.169,19.88,18.434,35.783,35.241,35.783,45.542,51.145,48.072,48.976,30.765,46.071,31.003,40.867,30.05,41.48,43.929,45,49,38.1'
          steps_to_consider = 27;
          break;
    
    case "demenocal2001cultural":
          // series = '41.555,41.661,41.563,41.35,41.83,42.107,42.315,44.034,42.24,42.597,44.596,45.048,44.125,46.378,44.61,45.133,47.141,45.924,45.468,43.406,44.915,45.976,45.9';
          series = '41.5,41.589,41.679,41.563,41.384,40.748,42.607,41.937,42.922,44.055,42.314,42.469,43.445,45.531,44.852,44.078,46.068,45.627,43.312,46.793,46.796,45.899,45.609,43.924,44.126,45.531,46.178,45.833,45.683,46.051,44.9,47.481,51.568,54.373,57.199,59.185,59.809,60.159,59.85,59.18,58.3'
          steps_to_consider = 23;
          break;

    default:
          console.log("Invalid Key",key)
          break;
  }
  if(series){
    $(":input[name*='steps_to_consider']").val(steps_to_consider);
    $(":input[name*='time_series']").val(series);
  }
}

function predict_transition(){
  var series = $("#time_series").val(); 
  series   = series.replace(/[\n\s]/g, ",");
  series   = series.replace(/\s\s+/g, ',');
  series   = series.replace(/[,]+/g, ',');
  series   = series.split(',').map(function(series){return Number(series);});
  var steps_to_consider = parseInt($(":input[name*='steps_to_consider']").val());
  series   = series.slice(0,steps_to_consider)
  console.log("Running Model on ",series)

  // var series = generate_simulated_data(); 
  // $("#time_series").val(series);
  
  $(".generate_output").css("display", "inline");
  $('#model_prediction').remove(); 
  $('iframe.chartjs-hidden-iframe').remove(); 
  $('.barchart').append('<canvas id="model_prediction" width="10%"><canvas>'); 

  input_tensor       = tf.tensor(series).reshape([1,1,series.length])
  prediction_tensor  = model.predict(input_tensor);
  prediction_values  = Array.from(prediction_tensor.dataSync());
  
  console.log("Prediction:",prediction_values)
  
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
  const steps_to_consider = parseInt($(":input[name*='steps_to_consider']").val());

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
  var ctx = document.getElementById('timeseries_visualization').getContext('2d');
  Chart.defaults.global.defaultFontSize = 14;

  var annotations = [{
      type: "line",
      mode: "vertical",
      scaleID: "x-axis-0",
      value: steps_to_consider,
      borderWidth: 2.5,
      borderColor: "darkcyan",
      label: {
        content: "Last Time Step Considered",
        enabled: true,
        position: "top"
      },
      // type: 'line',
      // id: 'vline' + index,
      // mode: 'vertical',
      // scaleID: 'x-axis-0',
      // value: date,
      // borderColor: 'green',
      // borderWidth: 1,
      // label: {
      //     enabled: true,
      //     position: "center",
      //     content: amount[index]
      // }
  }];

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
          }],
      },
      options: {
        annotation: {
          annotations: annotations
        },
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

function generate_saddle_node(){
  var c =  parseFloat($("#saddle_node_bifurcation :input[name*='bifurcation_parameter']").val());
  var k =  parseFloat($("#saddle_node_bifurcation :input[name*='carrying_capacity']").val());
  var r =  parseFloat($("#saddle_node_bifurcation :input[name*='max_growth_rate']").val());
  var b =  parseFloat($("#saddle_node_bifurcation :input[name*='half_saturation_constant']").val());

  const n_max=900;    
  const c_max=3;
  const t_max=150;
  const dt=0.01;
  var da = (c_max-c)/n_max;
  var n = 0;
  var t = 0;
  var h = 1;
  var corr = 0.0;     
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

function generate_transcritical(){
  var c =  parseFloat($("#transcritical_bifurcation :input[name*='max_grazing_rate']").val());
  var k =  parseFloat($("#transcritical_bifurcation :input[name*='carrying_capacity']").val());
  var r =  parseFloat($("#transcritical_bifurcation :input[name*='max_growth_rate']").val());
  const n_max=900;    
  const c_max=2;
  const t_max=150;
  const dt=0.01;
  var da = (c_max-c)/n_max;
  var n = 0;
  var t = 0;
  var h = 1;
  var corr = 0.0;     
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
      aaa = c*x;
      x   = x + (aa-aaa)*dt + sigma*d3.randomNormal(0, 1)()*x*(Math.sqrt(dt))*y; 
      y   = corr*y + (Math.sqrt(1-Math.pow(corr,2)))*d3.randomNormal(0, 1)();
      t   = t+dt;
    }      
    series.push(x)        
  }     

  $('.loading_icon_sde').hide()
  $("#time_series").val(series);
}