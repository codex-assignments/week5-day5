"use strict";

// proof of life, first step in workflow when creating script and wiring it to the html, console returns hi and this can then be removed.
// console.log("hi")

// variables listed together up top

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const dropdown = document.getElementById("flavors");
const resultsDiv = document.getElementById("results");
const resultsDiv2 = document.getElementById("results2")

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

// render functions

function render(jellyData) {
  resultsDiv.innerHTML = "";
  const resultsP = document.createElement("p");
  resultsP.textContent = jellyData;

  resultsDiv.appendChild(resultsP);
}

function render2(jsonData) {
  resultsDiv2.innerHTML = "";
  const resultsP = document.createElement("p");
  resultsP.textContent = jsonData;

  resultsDiv2.appendChild(resultsP);
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
                
        button2.addEventListener("click", async () => {
           try {
               const options = {
                 body: JSON.stringify({
                   title: "Test",
                   body: "Test test",
                   userId: 1,
                 }),
                 //    bearer tokens etc
                 headers: {"Content-type": "application/json; charset=UTF-8"},
                 method: "POST",
               };
             const res = await fetch("https://jsonplaceholder.typicode.com/posts", options);
             if (!res.ok) {
               return
             }
             const data = await res.json();
             render2("ID: "+data.id+" Title: "+data.title+ " Body: " + data.body)
           } catch (error) {
             console.log(error)
         }
    })
        
  } catch (error) {
    console.log(error);
  }
}

main();
