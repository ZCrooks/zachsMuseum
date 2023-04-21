// DATA TO DISPLAY IN CAROUSEL
// title
// objectName
// images.web.url
// department
// measurements
// type
// wall_description
// a
// country

// PSEUDO CODE

const app = {};

// GRAB ARRAY OF ALL AVAILABLE MUSEUM DATA 
app.getData = () => {
    const url = new URL(`https://proxy.junocollege.com/https://openaccess-api.clevelandart.org/api/artworks`);

    // ensure I am only grabbing Pieces with an image to feature
    url.search = new URLSearchParams({
        has_image: 1
    })
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then ((jsonResult) => {
            app.displayData(jsonResult.data);
        })
}


app.displayData = (artArray) => {
    

}

// Method to grabs User's dropdown form selection
app.formInput = () => {
    // User selects a department from dropdown Menu (value)
    const form = document.querySelector(`form`);
    form.addEventListener(`submit`, function(e){
        e.preventDefault();
        // Grab user's department selection
        const department = document.querySelector(`#department`).value;
        // Make Gallery/results section visible
        const gallery = document.querySelector(`.gallery`)
        gallery.style.display = `inline`;
        // Call Scroll Method
        app.scrollToElement();
    });
}

// Method to allow smooth scroll to results
app.scrollToElement = () => {
    const element = document.querySelector(`.results`)
    element.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
}

// For each art piece (li) feature the vital info in a new div with hover carousel scrolling feature 
    // DATA TO DISPLAY IN CAROUSEL
    // title
    // objectName
    // images.web.url
    // department
    // measurements
    // type
    // wall_description
    // a
    // country

// Use Reset button to go back and make another selection

app.init = () => {
    app.getData();
    app.formInput();
}


app.init();
