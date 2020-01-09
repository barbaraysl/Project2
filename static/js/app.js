Plotly.d3.csv("../static/data/Final_Table.csv", function(err, rows){

  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
  }

  var allCountryNames = unpack(rows, 'country'),
      allVintage = unpack(rows, 'vintage'),
      allScore = unpack(rows, 'score'),
      allColor=unpack(rows,'color'),
      listofCountries = [],
      currentCountry,
      wineScore = [],
      wineVintage = [],
      wineColor=[],
      red=[],
      white=[],
      pink=[]
  
  for (var i = 0; i < allCountryNames.length; i++ ){
      if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
          listofCountries.push(allCountryNames[i]);
      }
  }

  function getCountryData(chosenCountry) {
      wineScore = [];
      wineVintage = [];
      for (var i = 0 ; i < allCountryNames.length ; i++){
          if ( allCountryNames[i] === chosenCountry ){
              wineScore.push(allScore[i]);
              wineVintage.push(allVintage[i]);
              wineColor.push(allColor[i]);
              if (allColor[i]==="Red") 
        { red.push(allScore[i])}
       ;       
            if (allColor[i]==="White") 
            { white.push(allScore[i])}
           ;
      
  
            if (allColor[i]==="Pink") 
            { pink.push(allScore[i])}
           ;
       
          }}
        };
      
  

 
        // setScatterPlot('France'); 
  function setScatterPlot(chosenCountry) {
      getCountryData(chosenCountry);
     

//plot bar chart
    var trace1 = {
      y: wineScore,
        x: wineVintage,
        text:wineColor,
        mode:'markers',
       
        marker:{
            size: 5,
            color:wineColor,

        },
        
        type:'scatter'};
      
  
  
    // Create the data array for the plot
    var data = [trace1];
  
    // Define the plot layout
    var layout = {
      title: "Wine Score and Vintage Scatter Plot",
      
      plot_bgcolor:"grey",
      yaxis: { title: "Wine Score" },
      xaxis: { title: "Wine Vintage" },
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);

var xData = ['Red','White','Pink'];



var yData = [
       red,white,pink
    ];
var color=["#ea0437","#bababa","#ffc0cb"]
var color2=["#fc3f69","#f9f9f9","#fff3f5"]
    var data2 = [];

for ( var i = 0; i < 30000; i ++ ) {
    var result = {
        type: 'box',
        y: yData[i],
        name: xData[i],
        boxpoints: 'all',
        jitter: 0.4,
        whiskerwidth: 0.2,
        fillcolor: color2[i],
          marker: {
            size: 2
        },
        marker:{
    color: color[i]
  },
        line: {
            width: 2
           }
    };
    data2.push(result);
};


layout2 = {
    title: 'Score Distribution by Wine Color',
    yaxis: {
        autorange: true,
        showgrid: true,
        zeroline: true,
        dtick: 5,
        gridcolor: "#e0e0e0",
        gridwidth: 0.5,
        zerolinecolor: 'rgb(255, 255, 255)',
        zerolinewidth: 2
    },
    margin: {
        l: 40,
        r: 30,
        b: 80,
        t: 100
    },
    paper_bgcolor: '#fffff',
    plot_bgcolor: '#fffff',
    showlegend: false
};

Plotly.newPlot("bubble", data2, layout2);


};

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        // countrySelector = innerContainer.querySelector('.countrydata');
        countrySelector = document.querySelector('.countrydata');


    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofCountries, countrySelector);

    function updateCountry(){
        setScatterPlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
});



