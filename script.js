// APP OBJECT

const app = {};

// GRAB ARRAY OF ALL AVAILABLE MUSEUM DATA 
app.getData = (department) => {
    const url = new URL(`https://openaccess-api.clevelandart.org/api/artworks`);

    // Ensure I am only grabbing Pieces with an image to feature
    url.search = new URLSearchParams({
        has_image: 1,
        department: department,
    })
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }   else {
                throw new Error(res.statusText);
            } 
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
            console.log(array);
        })
        .catch((e) => {
            if (e.message === `"ERROR getting artwork data`) {
                alert (`We're sorry - the data you were looking for could not be generated!`)
            }
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
        glider.style.minWidth = `75%`;
        glider.style.color = `white`;
        glider.style.margin = `5px`;
        glider.style.padding = `20px`;
        glider.style.borderRadius = `10px`;
        glider.style.fontFamily = `Varta`;
        glider.style.display = `flex`;
        glider.style.justifyContent = `center`;
        glider.style.alignItems = `center`;
    
        // Grab Piece's Image and put in Container
        const image = document.createElement(`img`);
        image.src = piece.images.web.url;
        image.alt = piece.images.web.filename;
        const imageContainer = document.createElement(`div`);
        imageContainer.appendChild(image);
        imageContainer.style.width = `50%`;
        
    
        // Grab Piece's Title
        const title = document.createElement(`h3`);
        title.style.fontSize = `30px`;
        title.style.marginBottom = `10px`;
        title.innerText = piece.title;
    
        // Grab Piece's 'Type'
        const type = document.createElement(`p`);
        type.style.fontSize=`20px`;
        type.innerText = piece.type;
            
        // Grab Piece's Culture
        const culture = document.createElement(`p`);
        culture.style.fontSize = `20px`;
        culture.style.marginBottom = `10px`
        culture.innerText = piece.culture[0];  

        // Grab Piece's Description
        const description = document.createElement(`p`);
        description.style.fontSize = `15px`;
        description.style.marginTop = `5px`;
        description.innerText = piece.fun_fact;
        
        // Grab Piece's URL
        const url = document.createElement(`a`);
        url.innerText = `Click here for more info`
        url.href = piece.url;
        url.target=`_blank`;
        url.style.fontSize = `20px`;
        url.style.padding = `5px`;
        url.style.marginTop = `10px`;
        url.style.width = `80%`;

        // Create a Container for Title, Type, Culture, and Description
        const contentContainer = document.createElement(`div`);
        contentContainer.style.display = `flex`;
        contentContainer.style.flexDirection = `column`;
        contentContainer.style.justifyContent = `center`;
        contentContainer.style.alignContent = `flex-start`;
        contentContainer.style.width = `50%`;
        contentContainer.style.marginLeft = `20%`;
        contentContainer.appendChild(title);
        contentContainer.appendChild(type);
        contentContainer.appendChild(culture);
        contentContainer.appendChild(description);
        contentContainer.appendChild(url);

        // Bring Elements Together in an individual Div
        glider.appendChild(imageContainer);
        glider.appendChild(contentContainer);

        // Append all divs to page Carousel
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

// METHOD TO GRAB USER'S DROPDOWN FORM SELECTION
app.formInput = () => {
    // User selects a department from dropdown Menu (value)
    const form = document.querySelector(`form`);
    form.addEventListener(`submit`, function(e){
        e.preventDefault();
        // Grab user's department selection
        const department = document.querySelector(`#department`).value;
        app.getData(department);
        // Prevent empty queries
        if (department === ``) {
            alert(`Please select an option to continue!`);
        } else {
            // Make Gallery/results section visible
            const gallery = document.querySelector(`.gallery`)
            gallery.style.display = `inline`;
            // Call Scroll Method
            app.scrollToResults();
            // Make department visible
            const h1 = document.getElementById(`gallery-title`);
            h1.innerHTML = department;
        } 
    });
}

// METHODS TO ALLOW SMOOTH SCROLL TO CONTENT
app.scrollToResults = () => {
    const element = document.querySelector(`.results`)
    element.scrollIntoView({
        behavior:`smooth`,
        block: `start`
    });
}

app.entrance = () => {
    const enter = document.querySelector(`.enter`)
    enter.addEventListener(`click`, function(e) {
        e.preventDefault();
        app.scrollToContent();
    });
}
app.scrollToContent = () => {
    const content = document.getElementById(`content`)
    content.scrollIntoView({
        behavior: `smooth`,
        block: `start`
    });
}

// INIT FUNCTION
app.init = () => {
    app.formInput();
    app.entrance();
    new Glider(document.querySelector('.glider'), {
        slidesToScroll: auto,
        slidesToShow: auto,
        draggable: true,
        dots: '.dots',
        arrows: {
            prev: document.querySelector(`.glider-prev`),
            next: document.querySelector(`.glider-next`),
        },
        scrollLock: true
    });
}

// INIT
app.init();

