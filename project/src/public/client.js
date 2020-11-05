let store = {
    data: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    currentTab: '',
}

// add markup
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



//display tab function

const displayCuriosityTab = () => {
    
    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const curiosityTab = document.createElement('div');
    curiosityTab.classList.add("tab");
    curiosityTab.setAttribute("id", "curiosityTab");
    tabContainer.appendChild(curiosityTab);
    
    getData(data, 'Curiosity', curiosityTab, 'active', 'November 26, 2011', 'August 6, 2012');

    }


const displayOpportunityTab = () => {

    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const opportunityTab = document.createElement('div');
    opportunityTab.classList.add("tab");
    opportunityTab.setAttribute("id", "opportunityTab");
    tabContainer.appendChild(opportunityTab);

    getData(data, 'Opportunity', opportunityTab, 'complete', 'July 7, 2003', 'January 25, 2004');

}


const displaySpiritTab = () => {
    let { data } = store;
    const tabContainer = document.getElementById('tabContainer');
    tabContainer.removeChild(tabContainer.firstChild);
    const spiritTab = document.createElement('div');
    spiritTab.classList.add("tab");
    spiritTab.setAttribute("id", "spiritTab");
    tabContainer.appendChild(spiritTab);

    getData(data, 'Spirit', spiritTab, 'complete', 'June 10, 2003', 'January 1, 2004');
    
  }



// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})



// ------------------------------------------------------  COMPONENTS




// API call from localhost

const getData = async (state, rover, tab, status, dateLaunched, dateLanded) => {
  
    let { data } = state;
    let result = await fetch(`http://localhost:3000/data?rover=${rover.toLowerCase()}`)
        .then(res => res.json())
        .then(data => updateStore(store, { data }))
        console.dir(store.data);

        // add rover data to tab
        dataContainer = document.createElement('div');
        dataContainer.classList.add('dataContainer');

        roverName = document.createElement('div');
        roverName.classList.add('data');
        roverName.innerHTML = `Rover name: ${rover}`;

        launchDate = document.createElement('div');
        launchDate.classList.add('data');
        launchDate.innerHTML = `Launch date: ${dateLaunched}`;

        landDate = document.createElement('div');
        landDate.classList.add('data');
        landDate.innerHTML = `Land date: ${dateLanded}`;

        missionStatus = document.createElement('div');
        missionStatus.classList.add('data');
        missionStatus.innerHTML = `Mission status: ${status}`;

        photoDate = document.createElement('div');
        photoDate.classList.add('data');
        /*
        photoDate.innerHTML = `photo date`;
        */

        // display data
        tab.appendChild(dataContainer);
        dataContainer.appendChild(roverName);
        dataContainer.appendChild(launchDate);
        dataContainer.appendChild(landDate);
        dataContainer.appendChild(missionStatus);
        dataContainer.appendChild(photoDate);

        // display photos
        photoContainer = document.createElement('div');
        photoContainer.classList.add('photoContainer');
        tab.appendChild(photoContainer);

        
        for (let i = 0; i < store.data.data.latest_photos.length && i < 5; i++) {
        photo = document.createElement('img');
        photoUrlArr = store.data.data.latest_photos.map(input => input.img_src);
        photo.src = photoUrlArr[i];
        photoContainer.appendChild(photo);
        }
        

        return result

        }

    
/*
async function testApiPull() {
    const apiFetch = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Gv5rFsnXyiFh4tuFN5Bwypvc1HKxAWUCvxZeBtnY').then((res) => res.json());
    console.log(apiFetch);
}
testApiPull();
*/
