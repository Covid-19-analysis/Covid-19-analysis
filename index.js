

function vaccine_chart(country,type){

    // Keep track of the country being displayed
    last_country = country;

    d3.json("http://localhost:5000/" + type).then(function(data){

        // Get the data for that country
        result = data[country];

        // Get all vaccines manufacturers
        var vaccines = Object.keys(result);

        // Declare array for chart data
        all_data = []

        // Push each vaccine data into array
        vaccines.forEach(function(vaccine){

            all_data.push(result[vaccine])

        })
        
        // Chart layout
        var layout = {
            title:'Total vaccinations in ' + country,
            xaxis: {
                title: 'Date',
                showgrid: true,
                zeroline: true
              },
              yaxis: {
                title: 'Total Vaccinations',
                showline: true
              }
          };

        
        if(type === 'allvaccines_change'){  
         
            layout.title = 'Daily vaccinatios in ' + country
            layout.yaxis.title = 'Daily vaccinations'

        }

        // Plot data
        //console.log("good format") 
        //console.log(all_data)
        Plotly.newPlot('plot', all_data, layout);


    })

}

// FUNCTION FOR DATA STRACTION (1ST AND 2ND ORDER) AND FUNCTION FOR LAYOUT

function newVaccineChart(countries,type){

    //console.log("countries: " + countries)

    d3.json("http://localhost:5000/" + type).then(function(data){

        //console.log(data)    
    
        // Get all the data for each country checked
        results = []
        countries.forEach(function(country){
            result = data[country]
            results.push(result)
        })
        
        //console.log("countries results:")
        //console.log(results)

        // Index each vaccine manufacturer for each country and push it to array
        all_data = []
        results.forEach(function(results_data){
            
            var vaccines = Object.keys(results_data);
            vaccines.forEach(function(vaccine){

                all_data.push(results_data[vaccine])

            })
                
        })
        
        //console.log(all_data)

        // Chart layout
        var layout = {
            title: 'Total vaccinations in ' + countries,
            xaxis: {
                title: 'Date',
                showgrid: true,
                zeroline: true
            },
            yaxis: {
                title: 'Total Vaccinations',
                showline: true
            }
        };


        if (type === 'allvaccines_change') {

            layout.title = 'Daily vaccinatios in ' + countries
            layout.yaxis.title = 'Daily vaccinations'

        }

        Plotly.newPlot('plot_checkbox', all_data, layout);

    })



}

function statesVaccinesPlot(vaccine_data_type){

    d3.json("http://localhost:5000/vaccines_states").then(function(data){

        //console.log(data)

        results = []
        vaccine_data_type.forEach(function(type){

            result = data[type]
            results.push(result)

        })

        //console.log(results)

        all_data = []

        results.forEach(function(data){

            data.forEach(function(vaccine_data){

                all_data.push(vaccine_data)

            })
            
        })

        //console.log(all_data)

        var ytitle = ""
        vaccine_data_type.forEach(function(title){

            if(vaccine_data_type.length == 1){
                return ytitle = title
            }

            ytitle = ytitle + title + "   "
            return ytitle
        })
        //console.log(ytitle)

        // Chart layout
        var layout = {
            title: 'States vaccination data',
            xaxis: {
                title: 'Date',
                showgrid: true,
                zeroline: true
            },
            yaxis: {
                title: ytitle,
                showline: true
            }
        };

        Plotly.newPlot('state_plot', all_data, layout);

    })


}


function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}

function mapStats_slider(){

    d3.json("http://localhost:5000/map_stats").then(function(data){

        //console.log(data)

        //console.log(unpack(data, "total_vaccinations"))

        var frames = [
        
        {
            data: [{z: unpack(data, 'total_vaccinations')}],
            traces: [0],
            name: 'Total Vaccinations',
            layout: {title: 'Total Vaccinations'}
        },
        {
            data: [{z: unpack(data, 'total_distributed')}],
            traces: [0],
            name: 'Total Vaccinations Distributed',
            layout: {title: 'Total Vaccines Distributed'}
        },
        {
            data: [{z: unpack(data, 'people_vaccinated')}],
            traces: [0],
            name: 'Total People Vaccinated',
            layout: {title: 'Total People Vaccinated'}
        },
        {
            data: [{z: unpack(data, 'people_fully_vaccinated_per_hundred')}],
            traces: [0],
            name: 'People Fully Vaccinated per Hundred',
            layout: {title: 'People Fully Vaccinated per Hundred'}
        },
        {
            data: [{z: unpack(data, 'total_vaccinations_per_hundred')}],
            traces: [0],
            name: 'Total Vaccinations per Hundred',
            layout: {title: 'Total Vaccinations per Hundred'}
        },
        {
            data: [{z: unpack(data, 'people_fully_vaccinated')}],
            traces: [0],
            name: 'People Fully Vaccinated',
            layout: {title: 'People Fully Vaccinated'}
        },
        {
            data: [{z: unpack(data, 'people_vaccinated_per_hundred')}],
            traces: [0],
            name: 'People Vaccinated per Hundred',
            layout: {title: 'People Vaccinated per Hundred'}
        },
        {
            data: [{z: unpack(data, 'distributed_per_hundred')}],
            traces: [0],
            name: 'Vaccines Distributed per Hundred',
            layout: {title: 'Vaccines Distributed per Hundred'}
        },
        {
            data: [{z: unpack(data, 'share_doses_used')}],
            traces: [0],
            name: '% Vaccines Used',
            layout: {title: '% Vaccines Used'}
        }
        ]

        var all_data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: unpack(data, 'Code'),
            z: unpack(data, 'total_vaccinations'),
            text: unpack(data, 'location'),
            colorscale: [
                [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
            ],
            colorbar: {
                thickness: 0.2
              },
            marker: {
                line:{
                  color: 'rgb(255,255,255)',
                  width: 2
                }
              }    
        }];

        var layout = {
            title: 'Total Vaccinations',
            geo:{
              scope: 'usa',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
            },
            xaxis: {autorange: false},
            yaxis: {autorange: false},
            sliders: [{
              currentvalue: {
                prefix: 'Last Update: ' + data[0]["date"] + " - ",
              },
              steps: frames.map(f => ({
                label: f.name,
                method: 'animate',
                args: [[f.name], {frame: {duration: 0}}]
              }))
            }]
          };    

        Plotly.plot('map', {
            data: all_data,
            layout: layout,
            frames: frames,
            config: {showLink: false}
          });  

    })

}


function init_vacc(){

    // Select container
    var selector = d3.select("#selDataset")
    var checkbox_sel = d3.select("#checkboxid")

    // Get the data
    d3.json("http://localhost:5000/allvaccines").then(function(data){

        // Get the keys 
        var countries = Object.keys(data);

        // Append each key to the container
        countries.forEach(function(name){

            selector
            .append("option")
            .text(name)
            .property("value",name);

        })

        // Append countries as checkboxes
        // Id works as index to access the label tag an populate it with 
        // Input tag and its attributes
        var id_checkbox = 0;
        countries.forEach(function(name){

            checkbox_sel
            .append('label')
                .attr('for',"a"+id_checkbox)
                .text(name)
            .append("input")
                .attr("type", "checkbox")
                .attr("id","a"+id_checkbox)
                .attr("value",name)
                .attr("onclick","addTrace(this.value)");

            checkbox_sel
            .append("br")
            
            id_checkbox++;

        })
        // Reset id index
        id_checkbox = 0;

        // Initialize the chart with first country and vaccination data address
        vaccine_chart(countries[0],'allvaccines');
        newVaccineChart(countries_selected,'allvaccines')

    })

    // Select container
    var state_container = d3.select("#state_checkboxid")
    d3.json("http://localhost:5000/vaccines_states").then(function(data){

        var column_name = Object.keys(data);
        
        var id_checkbox = 0;
        column_name.forEach(function(name){

            state_container
            .append('label')
                .attr('for',"b"+id_checkbox)
                .text(name)
            .append("input")
                .attr("type", "checkbox")
                .attr("id","b"+id_checkbox)
                .attr("value",name)
                .attr("onclick","addTraceState(this.value)");

            state_container
            .append("br")
            
            id_checkbox++;

        })

        id_checkbox = 0;

        statesVaccinesPlot(selected_states_vaccine_data);
    })

    mapStats_slider();
}

function optionChanged(new_country){

    // Value from well changed
    vaccine_chart(new_country,vacc_type);
}

function vaccChanged(type){

    // Keep track of the data displayed
    vacc_type = type;
    vaccine_chart(last_country,type);
    newVaccineChart(countries_selected,type)

}

function addTrace(name){
    
    // Check if country selected is already in array
    if(countries_selected.includes(name)){

        // If it's in array, it means that the checkbox was unselected, delete country
        countries_selected.splice(countries_selected.indexOf(name),1)
    }
    else{

        // Else, add country to the array
        countries_selected.push(name)
    }

    // Create new chart after a change in the checkbox list
    newVaccineChart(countries_selected,vacc_type)
}

function addTraceState(type){

    // Check if vaccine data type selected is already in array
    if(selected_states_vaccine_data.includes(type)){

        // If it's in array, it means that the checkbox was unselected, delete vaccine data type
        selected_states_vaccine_data.splice(selected_states_vaccine_data.indexOf(type),1)
    }
    else{

        // Else, add vaccine data type to the array
        selected_states_vaccine_data.push(type)
    }

    // Create new chart with updated vaccine data types
    statesVaccinesPlot(selected_states_vaccine_data)

}

// Array that holds the selected state's vaccine data
var selected_states_vaccine_data = []

// Array that holds the amount of countries that are currently being displayed 
var countries_selected = [];

// Initialize global variables, used to keep track of the data being displayed
var last_country = 'Chile';
var vacc_type = 'allvaccines';

init_vacc();