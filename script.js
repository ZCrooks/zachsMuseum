// APP OBJECT

const app = {};

// GRAB ARRAY OF ALL AVAILABLE MUSEUM DATA 
app.getData = (department) => {
    const url = new URL(`https://openaccess-api.clevelandart.org/api/artworks`);

    // ensure I am only grabbing Pieces with an image to feature
    url.search = new URLSearchParams({
        has_image: 1,
        department: department,
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

// METHOD TO DISPLAY DATA
app.displayData = (artArray) => {  
    // LIST CONTAINER
    const carousel = document.querySelector(`.glider`);

    // ITERATE AND PROVIDE VALUES TO APPEND TO PAGE FOR EACH ART PIECE
    artArray.forEach((piece) => {

        // Create Div Container for Item
        const glider = document.createElement(`div`);
        glider.style.
        backgroundColor = `black`;
        glider.style.minWidth = `30%`
        glider.style.color = `white`;
        glider.style.margin = `5px`
        glider.style.padding = `20px`
        glider.style.borderRadius = `10px`
        glider.style.fontFamily = `Varta`;
    


        // PIECE TITLE
        const title = document.createElement(`h3`);
        title.style.fontSize = `20px`;
        title.style.textAlign = `center`;
        title.style.marginBottom = `10px`;
        title.innerText = piece.title;

        // PIECE IMAGE
        const image = document.createElement(`img`);
        image.src = piece.images.web.url;
        image.alt = piece.images.web.filename;
        

        // PIECE TYPES
        const type = document.createElement(`p`);
        type.style.fontSize=`15px`;
        type.innerText = piece.type;
            

        // PIECE CULTURE
        const culture = document.createElement(`p`);
        culture.style.fontSize = `15px`;
        culture.style.marginBottom = `10px`
        culture.innerText = piece.culture[0];  


        // PIECE URL
        const url = document.createElement(`a`);
        url.innerText = `Click here for more info`
        url.href = piece.url;
        url.target=`_blank`;
        url.style.fontSize = `20px`;
        url.style.padding = `1px`;
            
        // BRING ELEMENTS TOGETHER
        glider.appendChild(title);
        glider.appendChild(image);
        glider.appendChild(type);
        glider.appendChild(culture);
        glider.appendChild(url);

        // APPEND TO SLIDER ON PAGE
        carousel.appendChild(glider);
    })  

    // RESET BUTTON
    const resetButton = document.querySelector(`.reset`);
    const resultsPage = document.querySelector(`.gallery`);
    resetButton.addEventListener(`click`, function(e){
        carousel.innerHTML = ``;
        resultsPage.style.display = `none`;
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
        app.scrollToResults();
        // Make department visible
        const h1 = document.getElementById(`gallery-title`);
        h1.innerHTML = department;
    });
}

// Method to allow smooth scroll to results
app.scrollToResults = () => {
    const element = document.querySelector(`.results`)
    element.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
}

// Use Reset button to go back and make another selection
const resetButton = document.querySelector(`.reset`)
resetButton.addEventListener(`click`, function(e) {
    
})

app.init = () => {
    app.formInput();
    new Glider(document.querySelector('.glider'), {
        slidesToScroll: 1,
        slidesToShow: 5.5,
        draggable: true,
        dots: '.dots',
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        scrollLock: true
    });
}


app.init();

