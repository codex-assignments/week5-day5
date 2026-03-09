'use strict';

const mainEl = document.getElementById("main")
const button = document.getElementById("button")

//  helper function example (for strings)

// with a fixed domain usecase so only one domain, otherwise would use a global db of acceptable domains
function buildEmail(firstName, lastName) {
    // console.log(firstName[0])
    // or use firstName.charAt(0)

    const firstNameLower = firstName.charAt(0).toLowerCase()
    const lastNameLower = lastName.toLowerCase()
    const domain = "@gmail.com"
    const username = firstNameLower + lastNameLower;
    const email = username + domain
    return email
    
}

// example of generic fetch function

async function fetchData(url, options) {

    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error("Error in fetch")
        }
        const data = await res.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}

// specific fetch function

async function getPokemon(id) {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
        if (!res.ok) {
            throw new Error("Something broke with fetching pokemon")
            
        }

        const data = await res.json()

        return data

    } catch (error) {
      console.log(error)  
    }
}

// fetch function 

function renderDog(src) {
    // get the name of dog breed from url by slicing off the first 30 characters, splitting by / and index 0 or splitting by "/" and index [4]
    const breed = src.split("/")[4]

    const h2 = document.createElement("h2")
    h2.textContent = breed
    mainEl.appendChild(h2)

    const img = document.createElement("img")
    img.src = src
    img.alt = breed

    mainEl.appendChild(img)

}

// main function to run them all

async function main() {
    try {

        //run helper function to build email
        const email = buildEmail("Ashley","Flynn")
        console.log(email)

        //run helper function to get pokemon info from API
        const charmander = await getPokemon(5)
        console.log(charmander)

        //run helper function to get dog img data from dog API

        const dog = await fetchData("https://dog.ceo/api/breeds/image/random", { method: "GET" });
        renderDog(dog)

    } catch (error) {
        console.error(error)
    }
}

main()
