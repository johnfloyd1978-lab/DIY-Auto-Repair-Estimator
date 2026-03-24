// ============================
// REPAIR DATABASE
// ============================

const repairs = {

"Oil Change": {
  parts: 35,
  toolsCost: 20,
  supplies: 5,
  time: 0.5,
  shopTime: 1,
  difficulty: 1,
  tools: ["Socket Set","Oil Filter Wrench","Drain Pan"],
  video: "https://www.youtube.com/results?search_query=oil+change"
},

"Brake Pads": {
  parts: 90,
  toolsCost: 40,
  supplies: 10,
  time: 1.5,
  shopTime: 2.0,
  difficulty: 2,
  tools: ["Jack","Jack Stands","Lug Wrench","Socket Set","C-Clamp"],
  video: "https://www.youtube.com/results?search_query=brake+pad+replacement"
},

"Alternator": {
  parts: 220,
  toolsCost: 25,
  supplies: 10,
  time: 2.5,
  shopTime: 3.5,
  difficulty: 3,
  tools: ["Socket Set","Ratchet","Serpentine Belt Tool"],
  video: "https://www.youtube.com/results?search_query=alternator+replacement"
},

"Starter": {
  parts: 180,
  toolsCost: 25,
  supplies: 10,
  time: 2,
  shopTime: 3,
  difficulty: 3,
  tools: ["Socket Set","Ratchet","Extensions"],
  video: "https://www.youtube.com/results?search_query=starter+replacement"
},

"Radiator": {
  parts: 200,
  toolsCost: 30,
  supplies: 20,
  time: 3,
  shopTime: 4,
  difficulty: 3,
  tools: ["Socket Set","Screwdrivers","Drain Pan"],
  video: "https://www.youtube.com/results?search_query=radiator+replacement"
},

"Spark Plugs": {
  parts: 60,
  toolsCost: 20,
  supplies: 5,
  time: 1,
  shopTime: 2,
  difficulty: 2,
  tools: ["Spark Plug Socket","Ratchet","Extensions"],
  video: "https://www.youtube.com/results?search_query=spark+plug+replacement"
}

};


// ============================
// TOOL OWNERSHIP TOGGLE
// ============================

let ownsTools = false;

function toggleTools(){
  ownsTools = !ownsTools;
  console.log("Tool ownership:", ownsTools ? "Own Tools" : "Need Tools");
}


// ============================
// DIFFICULTY STARS
// ============================

function difficultyStars(level){
  return "⭐".repeat(level);
}


// ============================
// COST CALCULATOR
// ============================

function estimateRepair(repairName){

  const repair = repairs[repairName];

  if(!repair){
    return "Repair not found";
  }

  const shopRate = 120;

  const toolCost = ownsTools ? 0 : repair.toolsCost;

  const diyCost =
    repair.parts +
    toolCost +
    repair.supplies;

  const shopCost =
    repair.parts +
    (repair.shopTime * shopRate);

  const savings = shopCost - diyCost;

  return {

    repair: repairName,

    difficulty: difficultyStars(repair.difficulty),

    diyCost: diyCost,

    shopCost: shopCost,

    savings: savings,

    tools: repair.tools,

    video: repair.video

  };

}


// ============================
// VIN LOOKUP
// ============================

async function lookupVIN(vin){

  const response =
  await fetch(
  `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
  );

  const data = await response.json();

  const vehicle = data.Results[0];

  return {

    make: vehicle.Make,
    model: vehicle.Model,
    year: vehicle.ModelYear

  };

}


// ============================
// PARTS SEARCH LINKS
// ============================

function autozoneSearch(part){

return `https://www.autozone.com/searchresult?searchText=${part}`;

}

function rockautoSearch(part){

return `https://www.rockauto.com/en/parts/${part}`;

}


// ============================
// MAINTENANCE SCHEDULE
// ============================

const maintenanceSchedule = {

30000: [
"Air Filter",
"Cabin Air Filter"
],

60000: [
"Spark Plugs",
"Transmission Fluid"
],

90000: [
"Timing Belt",
"Water Pump"
]

};


function checkMaintenance(mileage){

return maintenanceSchedule[mileage] || [];

}


// ============================
// EXAMPLE USE
// ============================

console.log(estimateRepair("Brake Pads"));

console.log(autozoneSearch("Brake Pads"));

console.log(checkMaintenance(60000));
