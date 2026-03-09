"use strict";

// proof of life, first step in workflow when creating script and wiring it to the html, console returns hi and this can then be removed.
// console.log("hi")

// variables listed together up top

const button1 = document.getElementById("button1");
const dropdown = document.getElementById("flavors");
const resultsDiv = document.getElementById("results")

// fetch helper function

async function fetchJellies(url) {
  try {
    //   fetch data from API, url defined in main function
      const res = await fetch(url);
    //   checks response.ok, stops function if status is not ok
    if (!res.ok) {
      return;
    }
    //   parse fetched data as JSON
      const data = await res.json();
    //   returns data outside function as a result of calling this function
      return data
  } catch (error) {
    console.log(error);
  }
}

// render function

function render(jellyData) {
  resultsDiv.innerHTML = "";
  const resultsP = document.createElement("p");
  resultsP.textContent = jellyData;

  resultsDiv.appendChild(resultsP);
}


// main function, used to call all other functions -- used to avoid "spaghetti code"

async function main() {
    try {
    //   when Get button is clicked
      button1.addEventListener("click", async () => {
        // define fetch parameters
      const jellyURL =
        "https://jellybellywikiapi.onrender.com/api/beans?pageIndex=1&pageSize=114";
      const jellyOptions = { method: "GET" };
      // call fetch function with defined parameters
      const jelly = await fetchJellies(jellyURL, jellyOptions);
      //   create a list of flavor names from json
        const flavorNames = await jelly.items.map((item) => item.flavorName);
        console.log(flavorNames);

        render(flavorNames)

      });
        
        // button2.addEventListener("click",()=> {})
        
  } catch (error) {
    console.log(error);
  }
}

main();
