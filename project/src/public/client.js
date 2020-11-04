

let store = {
    data: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    currentTab: '',
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


  const content = () => {
    return `
    <header>
    <div id="titleContainer">
      <div id="title">NASA Mars Rover</div>
    </div>  
      <div id="navContainer">
        <div class="navBar" id="navBar">
          <div class="tabButton"><a href="#" id="curiosity" onclick="displayCuriosityTab()">Curiosity rover</a></div>
          <div class="tabButton"><a href="#" id="opportunity" onclick="displayOpportunityTab()">Opportunity rover</a></div>
          <div class="tabButton"><a href="#" id="spirit" onclick="displaySpiritTab()">Spirit rover</a></div>
        </div>
      </div>
    </header>

    <main>
      <div id="tabContainer">
      </div>
    </main>

    <footer></footer>
`
  }


// create content
const App = (state) => {
    
  return content();
}

    // define buttons and tabs
const curiosityButton = document.getElementById('curiosity');
const opportunityButton = document.getElementById('opportunity');
const spiritButton = document.getElementById('spirit');


// check for store update


/*
    photo = document.createElement('div');
    photo.innerHTML = data.photos[0];
    curiosityTab.appendChild(photo);
*/ 



//display tab function

const displayCuriosityTab = () => {
    
    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const curiosityTab = document.createElement('div');
    curiosityTab.classList.add("tab");
    curiosityTab.setAttribute("id", "curiosityTab");
    tabContainer.appendChild(curiosityTab);
    
    getData(data, 'curiosity', curiosityTab);

    }



/*  TEST UNIT
const showStore = () => {
        console.log(store.data);
    }
    
    setTimeout(showStore, 3000)
*/    

const displayOpportunityTab = () => {

    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const opportunityTab = document.createElement('div');
    opportunityTab.classList.add("tab");
    opportunityTab.setAttribute("id", "opportunityTab");
    tabContainer.appendChild(opportunityTab);

    getData(data, 'opportunity', opportunityTab);


}


const displaySpiritTab = () => {
    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const spiritTab = document.createElement('div');
    spiritTab.classList.add("tab");
    spiritTab.setAttribute("id", "spiritTab");
    tabContainer.appendChild(spiritTab);

    getData(data, 'spirit', spiritTab);
    
  }



// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})



// ------------------------------------------------------  COMPONENTS




// API call from localhost

const getData = async (state, rover, tab) => {
  
    let { data } = state;
    let result = await fetch(`http://localhost:3000/data?rover=${rover}`)
        .then(res => res.json())
        .then(data => updateStore(store, { data }))
        console.dir(store.data);

        photoContainer = document.createElement('div');
        photo = document.createElement('img');
        photo.src = store.data.data.photos[0].img_src;
    
        tab.appendChild(photoContainer);
        photoContainer.appendChild(photo);

        return result

        }

    
/*
async function testApiPull() {
    const apiFetch = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Gv5rFsnXyiFh4tuFN5Bwypvc1HKxAWUCvxZeBtnY').then((res) => res.json());
    console.log(apiFetch);
}
testApiPull();
*/
