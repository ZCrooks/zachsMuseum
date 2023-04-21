// APP OBJECT

const app = {};

// GRAB ARRAY OF ALL AVAILABLE MUSEUM DATA 
app.getData = (department) => {
    const url = new URL(`https://openaccess-api.clevelandart.org/api/artworks`);

    // ensure I am only grabbing Pieces with an image to feature
    url.search = new URLSearchParams({
        has_image: 1,
        department: department
    })
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then ((jsonResult) => {
            // array of all Museum results
            const data = jsonResult.data;
            //  number of items to return
            i = 10;
            // randomizer function
            const randomizer = data.sort(() => 0.5 - Math.random());
            // new array
            const array = data.slice(0, i);
            // display;
            app.displayData(array);
        })
}

// country
app.displayData = (artArray) => {
    // Target node
    const carousel = document.querySelector(`.carousel`);
    // Fresh search query with each selection
    carousel.innerHTML = ``;
    // Build Webpage content using the data
    artArray.forEach((piece) => {
        // LI
        const item = document.createElement(`li`);

        // LIST CONTAINER
        const container = document.createElement(`div`);
        container.classList.add(`listBox`);

        // PIECE TITLE
        const title = document.createElement(`h3`);
        title.classList.add(`h3`);
        title.innerText = piece.title;

        // PIECE IMAGE
        const image = document.createElement(`img`);
        image.src = piece.images.web.url;
        image.alt = piece.images.web.filename;
        
        // PIECE MEASUREMENTS
        const measurements = document.createElement(`p`);
        measurements.innerText = piece.measurements;

        // PIECE TYPE
        const type = document.createElement(`p`);
        type.innerText = piece.type;

        // PIECE DESCRIPTION
        const description = document.createElement(`p`);
        description.innerText = piece.wall_description;

        
        // Append to div container 
        container.appendChild(title);
        container.appendChild(image);
        container.appendChild(measurements);
        container.appendChild(type);
        container.appendChild(description);

        // Collect all elements together
        item.appendChild(container);

        // Amend to carousel
        carousel.appendChild(item);
        
        
    })

}

// Method to grabs User's dropdown form selection
app.formInput = () => {
    // User selects a department from dropdown Menu (value)
    const form = document.querySelector(`form`);
    form.addEventListener(`submit`, function(e){
        e.preventDefault();
        // Grab user's department selection
        const department = document.querySelector(`#department`).value;
        app.getData(department);

        // Make Gallery/results section visible
        const gallery = document.querySelector(`.gallery`)
        gallery.style.display = `inline`;
        // Call Scroll Method
        app.scrollToElement();
        // Make department visible
        const h1 = document.getElementById(`gallery-title`);
        h1.innerHTML = department;
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

// Use Reset button to go back and make another selection

app.init = () => {
    app.formInput();
}


app.init();
