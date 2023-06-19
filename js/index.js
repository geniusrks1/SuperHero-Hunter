
// declaring two variables searchHero and searchResults,
// which are assumed to be HTML elements in the document identified by their respective IDs.

const searchHero = document.getElementById("searchHero");
const searchResults = document.getElementById("searchResults");

// The variable favourite_buttons is declared
// as an empty array to store references to favorite buttons later.
var favourite_buttons = [];

// for fetching the api thorugh xhr request



// An event listener is added to the searchHero element, listening for the keyup event. 
// This means that whenever a key is released while 
// the user is typing in the search input field, the associated function will be executed.
searchHero.addEventListener("keyup", function(){

// Inside the event listener function, an XMLHttpRequest object xhrRequest is created.
//  This object is responsible for making an asynchronous request to the API to 
//  fetch superhero data based on the search value entered by the user.
    var xhrRequest = new XMLHttpRequest();
// The value entered in the search input field is stored in the searchValue variable.
    var searchValue = this.value;

// If the length of the searchValue is less than or equal to 2 characters,
// the searchResults element's inner HTML is cleared, and the function returns. 
// This condition is used to avoid making unnecessary 
// API requests for short search terms.

    if(searchValue.length <= 2){
        searchResults.innerHTML = "";
        return;
    }

 // The onreadystatechange event handler is set on the xhrRequest object. 
// It is triggered whenever the state of the request changes. The handler checks 
// if the request is complete (readyState == 4) and successful (status == 200).
    xhrRequest.onreadystatechange = function() {
// If the request is successful, the response received from the API is parsed
//  as JSON, and the parsed response is stored in the response variable.
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhrRequest.responseText);
// If the API response indicates an error (based on the value of response.response),
//  the searchResults element's inner HTML is cleared, and the function returns.
            if(response.response === "error"){
                searchResults.innerHTML = "";
                return;
            }
// If there are no errors, 
// the results array is extracted from the API response.
            const results = response.results
// The searchResults element's inner HTML is cleared to prepare 
// for displaying the new search results.
            searchResults.innerHTML = "";
// A loop is used to iterate over each result in the results array.
            for(let i of results){
// Inside the loop, a new li (list item) element is created 
// using document.createElement(). The element is assigned the CSS class "search-item".
                var li = document.createElement("li");
                li.classList.add("search-item");

// The li element's inner HTML is set to a string that represents the
// HTML structure for displaying the superhero's name, image,
// and an add/remove favorite button. The superhero's ID,
// name, and image URL are retrieved from the i object representing the current result.

li.innerHTML = '<a href="" class="searchResults" id="'+i.id+'">'
+i.name+'<img src="'+i.image.url+'" alt="" class="image-size"></a></><div class ="add" id="'
+i.id+'" data-name="'+i.name+'" data-photo="'
+i.image.url+'"><i id="addFav" class="fa fa-heart"></i></div>';

// The newly created li element is appended as a child to the searchResults element,
// effectively adding it to the list of search results.

searchResults.appendChild(li);
            }

// Another loop is used to iterate over each element with the CSS class "searchResults" 
// (the superhero links) within the search results.
let resultHeros = document.getElementsByClassName("searchResults");

//  Inside this loop, an event listener is added to each superhero link.
//  When a link is clicked, the associated function is executed. 
//  The function prevents the default link behavior,
//  logs the superhero's ID to the console, 
//  stores the selected hero's ID in the localStorage, and 
//  redirects the user to a "heroDetails.html" page.
     for(let j of resultHeros){
        j.addEventListener("click", function(event){
                        event.preventDefault();
                        console.log(this.id);
                        localStorage.setItem('heroSelected', this.id);
                        location.replace("./heroDetails.html");
                    });
                }

// adding suerhero to the fav list

// The code then selects all elements with the CSS class "add" (the add/remove favorite 
// buttons) and assigns them to the favourite_buttons array.
            favourite_buttons = document.getElementsByClassName("add");
//  Another loop is used to iterate over each element in the favourite_buttons array.
            for(let i of favourite_buttons){

// Inside this loop, an event listener is added to each favorite button. 
// When a button is clicked, the associated function is executed. 
// The function checks if the button's inner HTML represents an "add" or 
// "remove" action based on its content.               
                i.addEventListener("click", function(){
                    if(i.innerHTML == '<i id="delFav" class="fa fa-heart"></i>'){
                        i.innerHTML = '<i id="addFav" class="fa fa-heart"></i>'

                        
// If the button represents a "remove" action (i.e., the inner HTML is an "X" icon
//  the button's inner HTML is changed to represent an "add" action, and the corresponding 
// superhero data is removed from the favHeroes array stored in the localStorage.

                        function remove(value){
                            return this.id != value.id;
                        }
                        // saving the data in local storage
                        let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                        newItems = oldItems.filter(remove.bind(i));
                        localStorage.setItem('favHeroes', JSON.stringify(newItems));
                        return;
                    }
// If the button represents an "add" action, the button's inner HTML is changed to 
// represent a "remove" action, and the corresponding superhero data 
// (ID, name, and photo URL) is added to the favHeroes array stored in the localStorage.


                    i.innerHTML = '<i id="delFav" class="fa fa-heart"></i>';
                    let favItem = {
                        id: this.id,
                        name: this.dataset.name,
                        photoUrl: this.dataset.photo
                    }
                    let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                    oldItems.push(favItem);
                    localStorage.setItem('favHeroes', JSON.stringify(oldItems));
                });
            }
            
        }
    };
// After the loops and event listeners, the xhrRequest object is opened by 
// specifying the HTTP method ("GET") and the URL of the API endpoint. 
// The search value is appended to the URL as a query parameter.
    xhrRequest.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/search/"+searchValue, true);
    // Finally, the request is sent to the server using xhrRequest.send().
    xhrRequest.send();
});



