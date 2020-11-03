

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
        <div class="tab" id="curiosityTab">Curiosity tab</div>
        <div class="tab" id="opportunityTab">Opportunity tab</div>
        <div class="tab" id="spiritTab">Spirit tab</div>
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

/*
getData(data, 'curiosity');
getData(data, 'opportunity');
getData(data, 'spirit');
*/

//display tab function

const displayCuriosityTab = () => {
    
    let { data } = store;
    const curiosityTab = document.getElementById('curiosityTab');
    spiritTab.style.display = 'none';
    opportunityTab.style.display = 'none';
    curiosityTab.style.display = 'inline-block';
    
    getData(data, 'curiosity');
    
 /*
    photo = document.createElement('div');
    photo.innerHTML = data.photos[0];
    curiosityTab.appendChild(photo);
  */
}


/*  TEST UNIT
const showStore = () => {
        console.log(store.data);
    }
    
    setTimeout(showStore, 3000)
*/    

const displayOpportunityTab = () => {
    let { rovers, data } = store;
    const opportunityTab = document.getElementById('opportunityTab');
    spiritTab.style.display = 'none';
    curiosityTab.style.display = 'none';
    opportunityTab.style.display = 'inline-block';


}


const displaySpiritTab = () => {
    let { rovers, data } = store;
    const spiritTab = document.getElementById('spiritTab');
    curiosityTab.style.display = 'none';
    opportunityTab.style.display = 'none';
    spiritTab.style.display = 'inline-block';


}


/*  TEST API UNIT
async function testApiPull() {
    const apiFetch = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=Gv5rFsnXyiFh4tuFN5Bwypvc1HKxAWUCvxZeBtnY').then((res) => res.json());
    console.log(apiFetch);
}
testApiPull();
*/


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})



// ------------------------------------------------------  COMPONENTS




// Example API call
const getData = (state, currentRover) => {
    let { data } = state;
    
    let result = fetch(`http://localhost:3000/data?rover=${currentRover}`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
        .then(res => res.json())
        .then(data => updateStore(store, { data }))


    return data
}
