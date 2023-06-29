let themeSwitcher = document.querySelector("header img") as HTMLImageElement;
let themeSwitcher2 = document.querySelector("header img + small")!;
const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
let theme: string;
let filterBtn = document.querySelector(
  "main .container p"
) as HTMLButtonElement;
let filterIcon = document.querySelector(
  "main .container p + img"
) as HTMLImageElement;
let filterUl = document.querySelector(
  "main .container p + img + ul"
) as HTMLUListElement;
let filterItems = document.querySelectorAll(
  "main ul li"
) as NodeListOf<HTMLLIElement>;
let myInput = document.querySelector("main input") as HTMLInputElement;
let myInputPH: string = myInput.getAttribute("placeholder")!;
let searchIcon = document.getElementById("search") as HTMLImageElement;
let countryContainer = document.querySelector(
  "main > div:nth-child(2)"
) as HTMLDivElement;
let globalData: country[];
let detailSection = document.querySelector("main + section")!;
interface country {
  flags: flag;
  name: name;
  population: number;
  region: string;
  capital: string;
  nativeName?: string;
  subregion?: string;
  borders?: string[];
  tld?: string[];
  currencies?: lanAndCurr[];
  languages?: lanAndCurr[];
  cca3?: string;
  cioc?: string;
  length?: number;
}
interface lanAndCurr {
  name: string;
  [key: string]: string | { param1: number[]; param2: string; param3: string };
}
interface flag {
  svg: string;
  alt: string;
  png: string;
}
interface name {
  common: string;
  official: string;
  nativeName: nativeName;
}
interface nativeName {
  ara: ara;
  eng: ara;
  [key: string]: ara;
}
interface ara {
  common: string;
}

if (window.localStorage.getItem("theme") != null) {
  theme = window.localStorage.getItem("theme")!;
  setTheme();
} else {
  if (darkTheme.matches) {
    themeSwitcher.src = "dist/images/moon-regular-dark.svg";
    filterIcon.src = "dist/images/chevron-down-dark.svg";
    searchIcon.src = "dist/images/search-dark.svg";
    theme = "dark";
    document.documentElement.setAttribute("theme", "dark");
    swapPlaceholder();
  } else {
    themeSwitcher.src = "dist/images/moon-regular.svg";
    filterIcon.src = "dist/images/chevron-down.svg";
    searchIcon.src = "dist/images/search.svg";
    theme = "light";
    document.documentElement.setAttribute("theme", "light");
    swapPlaceholder();
  }
}

function switchTheme(): void {
  if (theme == "dark") {
    themeSwitcher.src = "dist/images/moon-regular.svg";
    filterIcon.src = "dist/images/chevron-down.svg";
    searchIcon.src = "dist/images/search.svg";
    document.documentElement.setAttribute("theme", "light");
    theme = "light";
    swapPlaceholder();
    window.localStorage.setItem("theme", "light");
  } else {
    themeSwitcher.src = "dist/images/moon-regular-dark.svg";
    filterIcon.src = "dist/images/chevron-down-dark.svg";
    searchIcon.src = "dist/images/search-dark.svg";
    document.documentElement.setAttribute("theme", "dark");
    theme = "dark";
    swapPlaceholder();
    window.localStorage.setItem("theme", "dark");
  }
}
function setTheme(): void {
  if (theme == "light") {
    themeSwitcher.src = "dist/images/moon-regular.svg";
    filterIcon.src = "dist/images/chevron-down.svg";
    searchIcon.src = "dist/images/search.svg";
    document.documentElement.setAttribute("theme", "light");
    swapPlaceholder();
  } else {
    themeSwitcher.src = "dist/images/moon-regular-dark.svg";
    filterIcon.src = "dist/images/chevron-down-dark.svg";
    searchIcon.src = "dist/images/search-dark.svg";
    document.documentElement.setAttribute("theme", "dark");
    swapPlaceholder();
  }
}
function swapPlaceholder(): void {
  if (theme == "light") {
    document.documentElement.style.setProperty("--placeholder", "#777");
  } else if (theme == "dark") {
    document.documentElement.style.setProperty("--placeholder", "#f1f1f1");
  }
}
themeSwitcher.addEventListener("click", switchTheme);
themeSwitcher2.addEventListener("click", switchTheme);

function showList(): void {
  if (filterUl.style.opacity === "1") {
    filterUl.style.opacity = "0";
    filterUl.style.height = "0";
    return;
  } else;
  {
    filterUl.style.opacity = "1";
    filterUl.style.height = "160px";
  }
}
filterBtn.addEventListener("click", showList);
filterIcon.addEventListener("click", showList);

myInput.onfocus = function (): void {
  myInput.setAttribute("placeholder", "");
};
myInput.onblur = function (): void {
  myInput.setAttribute("placeholder", myInputPH);
};

async function fetchData(): Promise<country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    globalData = data;
    return data;
  } catch (error) {
    console.log("Error fetching:", error);
    return [];
  }
}

function randomCountry(data: country[]) {
  let random: any = [];
  for (let i = 0; i < data.length; i++) {
    random.push();
    addCountry(data[Math.floor(Math.random() * data.length)]);
  }
}
fetchData();
async function convertData() {
  await fetchData();
  randomCountry(globalData);
}
convertData();

function addCountry(country: country) {
  countryContainer.innerHTML += `<div class="bg-header shadow-[0_0_5px_-4px] shadow-filter mb-5 rounded-md overflow-hidden hover:scale-110 duration-300 cursor-pointer id="countryDiv"">
  <img
  class="h-40 max-h-40 object-cover w-full"
    src=${country.flags.svg}
    alt="flag"
    loading="lazy"
  />
  <div class="p-5 pb-8">
    <h3 class="font-extrabold my-3 text-text">${country.name.common}</h3>
    <p class="font-semibold inline-block text-sm text-text">Population :</p>
    <span class="font-normal inline-block text-xs text-text">${country.population}</span>
    <br />
    <p class="font-semibold inline-block text-sm text-text">Region :</p>
    <span class="font-normal inline-block text-xs text-text">${country.region}</span>
    <br />
    <p class="font-semibold inline-block text-sm text-text">Capital :</p>
    <span class="font-normal inline-block text-xs text-text">${country.capital}</span>
  </div>
</div>`;
  detail();
}
searchIcon.addEventListener("click", () => {
  search(myInput.value);
});
document.body.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    search(myInput.value);
  }
});
document.forms[0].addEventListener("submit", (e) => e.preventDefault());
async function search(name: string): Promise<void> {
  if (myInput.value.trim() !== "") {
    await fetchData();
    let result = globalData.filter(
      (country: country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase()) ||
        country.name.official.toLowerCase().includes(name.toLowerCase()) ||
        (country.name.nativeName &&
          country.name.nativeName[
            Object.keys(country.name.nativeName)[0]
          ]?.common
            .toLowerCase()
            .includes(name.toLowerCase()))
    );
    countryContainer.innerHTML = "";
    result.forEach((country) => {
      addCountry(country);
    });
  }
}
filterItems.forEach((item: HTMLLIElement) => {
  item.addEventListener("click", () => {
    region(item.innerHTML);
  });
});
async function region(regionName: string) {
  await fetchData();
  let countries = globalData.filter(
    (country) => country.region.toLowerCase() == regionName.toLowerCase()
  );
  countryContainer.innerHTML = "";
  for (let i = 0; i < countries.length; i++) {
    addCountry(countries[i]);
  }
}
function detail(): void {
  let countryDiv = document.querySelectorAll(
    "main > div:nth-child(2) > div"
  ) as NodeListOf<HTMLDivElement>;
  countryDiv.forEach((country) => {
    country.addEventListener("click", openDetail);
  });
}
async function openDetail(this: any): Promise<void> {
  let n: string = this.querySelector("h3").textContent.toLowerCase();
  await fetchData();
  let current: country = globalData.filter(
    (country) => country.name.common.toLowerCase() == n
  )[0];
  document.querySelector("main")!.classList.add("hidden");
  detailSection.classList.remove("hidden");
  detailSection.innerHTML = "";
  detailSection.innerHTML += `
  <button
  class="text-text py-3 px-5 bg-header rounded shadow-[0_0_10px_2px] shadow-shaddow cursor-pointer duration-300 active:scale-95 my-10 brightness-100 hover:brightness-90 "
>
  &#8592; &nbsp;&nbsp;Back
</button>
<div class="flex justify-between items-center flex-col   g:flex-row">
  <img src="${current.flags.svg}" alt="flag" class="w-full g:w-5/12"/>
  <div class = "w-full g:w-5/12">
  <h3 class="font-extrabold my-3 text-text w-full text-2xl  ">${
    current.name.common
  }</h3>
    <div class = "flex justify-between items-start mt-5 flex-col g:flex-row">
      <div>
        <p class="font-semibold inline-block text-base  text-text mt-3">
          Native Name :
        </p>
        <span class="font-normal inline-block text-xs text-text"
          >${
            current.name.nativeName?.ara?.common ??
            current.name.nativeName?.eng?.common ??
            current.name.nativeName[Object.keys(current.name.nativeName)[0]]
              ?.common
          }</span
        >
        <br />
        <p class="font-semibold inline-block text-base text-text mt-3">
          Population :
        </p>
        <span class="font-normal inline-block text-xs text-text"
          >${current.population}</span
        >
        <br />
        <p class="font-semibold inline-block text-base text-text mt-3">
          Region :
        </p>
        <span class="font-normal inline-block text-xs text-text"
          >${current.region}</span
        >
        <br />
        <p class="font-semibold inline-block text-base text-text mt-3">
          Sub Region :
        </p>
        <span class="font-normal inline-block text-xs text-text"
          >${current.subregion}</span
        >
        <br />
        <p class="font-semibold inline-block text-base text-text mt-3">
          Capital:
        </p>
        <span class="font-normal inline-block text-xs text-text"
          >${current.capital}</span
        >
      </div>
    <div class=" my-6 g:my-0">
      <p class="font-semibold inline-block text-base text-text mt-3">
        Top Level Domain:
      </p>
      <span class="font-normal inline-block text-xs text-text"
        >${current.tld}</span
      >
      <br/>
      <p class="font-semibold inline-block text-base text-text mt-3">Currencies:</p>
      <span class="font-normal inline-block text-xs text-text"
        >${getCurrencies(current.currencies!)}</span
      >
      <br/>
      <p class="font-semibold inline-block text-base text-text mt-3">Languages:</p>
      <span class="font-normal inline-block text-xs text-text"
        >${getLanguges(current.languages!)}</span
      >
    </div>
  </div>
  <p class="font-semibold inline-block text-base text-text mt-7">Border Countries:</p>
  <div id="center" class="inline mb-3"></div>
  </div>
</div>`;
  let btn = document.querySelector("section button")!;
  btn.addEventListener("click", getBack);
  getBorders(
    current.borders!,
    document.getElementById("center")! as HTMLDivElement
  );
}
function getBack(): void {
  setTimeout(() => {
    document.querySelector("main")!.classList.remove("hidden");
    detailSection.classList.add("hidden");
  }, 300);
}
function topLevelDomain(tld: string[]) {
  if (tld.length == 1) {
    return tld[0];
  } else {
    let result = "";
    for (let i = 1; i <= tld.length; i++) {
      result += `${i == tld.length ? tld[i - 1] : ` ${tld[i - 1]} , `}`;
    }
    return result;
  }
}
function getLanguges(languagesArray: lanAndCurr[]) {
  if (Object.keys(languagesArray).length == 1) {
    return Object.keys(languagesArray)[0];
  } else {
    let result = "";
    for (let i = 1; i <= Object.keys(languagesArray).length; i++) {
      result += `${
        i == Object.keys(languagesArray).length
          ? Object.keys(languagesArray)[i - 1]
          : ` ${Object.keys(languagesArray)[i - 1]} , `
      }`;
    }
    return result;
  }
}
function getCurrencies(currenciesArray: lanAndCurr[]) {
  if (Object.keys(currenciesArray).length == 1) {
    return Object.keys(currenciesArray)[0];
  } else {
    let result = "";
    for (let i = 1; i <= Object.keys(currenciesArray).length; i++) {
      result += `${
        i == Object.keys(currenciesArray).length
          ? Object.keys(currenciesArray)[i - 1]
          : ` ${Object.keys(currenciesArray)[i - 1]} , `
      }`;
    }
    return result;
  }
}
async function getBorders(
  borders: string[],
  center: HTMLDivElement
): Promise<void> {
  if (borders == undefined) {
    center.innerHTML = "";
    center.innerHTML = `<span class="font-normal inline-block text-xs text-text py-3 px-5 mx-1 mt-5 rounded shadow-[0_0_10px_2px] shadow-shaddow"> There is no border countries</span> `;
  } else {
    await fetchData();
    let bordersC = globalData.filter(
      (country: country) =>
        borders.includes(country.cca3!) || borders.includes(country.cioc!)
    );
    console.log(bordersC);
    let cB = bordersC.map((b) => b.name.common);
    console.log(cB);
    center.innerHTML = "";
    cB.forEach((c) => {
      center.innerHTML += `<span class="font-normal inline-block text-xs text-text py-3 px-5 mx-1 mt-5 rounded shadow-[0_0_10px_2px] shadow-shaddow">${c}</span> `;
    });
  }
}
