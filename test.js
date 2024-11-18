


function convertToRight(name) {

    let name = "";
    switch(name){
        case "CO MG/M³":
            name = "CO μg/m³"
            break;

        case "NO2 ΜG/M³":
            name = "NO₂ μg/m³"
            break;

        case "O3 ΜG/M³":
            name = "O₃ μg/m³"
            break;

        case "PM10 ΜG/M³":
            name = "PM₁₀ μg/m³"
            break;

        case "PM25 ΜG/M³":
            name = "PM₂.₅ μg/m³"
            break;
        case "SO2 ΜG/M³":
            name = "SO₂ μg/m³"
            break;
    }
    return name;
}



function convertToRightOptimized(name){
    const conversionMap = {
        "CO MG/M³": "CO μg/m³",
        "NO2 ΜG/M³": "NO₂ μg/m³",
        "O3 ΜG/M³": "O₃ μg/m³",
        "PM10 ΜG/M³": "PM₁₀ μg/m³",
        "PM25 ΜG/M³": "PM₂.₅ μg/m³",
        "SO2 ΜG/M³": "SO₂ μg/m³"
    }

    return conversionMap[name] || name
}

// https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals