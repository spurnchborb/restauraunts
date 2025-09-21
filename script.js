const URL = "https://iskarr.github.io/austindonovan.github.io/api/business.json";
const statusEl = document.getElementById("status");
const cards = document.querySelector(".cards");

const localData = {
  "business": [
    {
      "name": "Simply Bliss BBQ",
      "address": "88 S Tooele Blvd inside Tooele Tech, use side , Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/SimplyBliss.png",
      "description": "We offer homemade food that is freshly cooked with fresh ingredients."
    },
    {
      "name": "Nigh-Time Donuts",
      "address": "299 N Main St Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/nighTime.png",
      "description": "Fresh donuts, bagels and sandwiches made at 5AM."
    },
    {
      "name": "Osaka Sushi",
      "address": "996 N Main St Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/osaka.webp",
      "description": "Fresh made sushi and a variety of rolls, avacado bom, bento boxes, etc."
    },
    {
      "name": "Roxberry",
      "address": "1485 N 30 West Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/roxberry.png",
      "description": "The best and freshest smoothies in Tooele. Real ingredients, frozen yogurt, acai, pitaya."
    },
    {
      "name": "Home Depot",
      "address": "222 E 2400 N, Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/homedep.png",
      "description": "Chain home improvement retailer for tools, appliances & other products (some offer truck rentals)."
    },
    {
      "name": "Guzzle Soda Shack",
      "address": "188 W 1180 N St, Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/guzzle.jpeg",
      "description": "Some incredible soda flavors and mixtures for a great price."
    },
    {
      "name": "Mountain West Medical Center",
      "address": "2055 N Main St, Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/medical.png",
      "description": "Mountain West Medical Center is a 38 licensed bed hospital in Tooele, Utah, with 37 active and 41 courtesy physicians."
    },
    {
      "name": "The UPS Store",
      "address": "772 N Main St, Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/ups.png",
      "description": "Store offering shipping, packaging, printing & other services, plus office supplies."
    },
    {
      "name": "Security Title Insurance Agency of Utah, Inc.",
      "address": "1485 N 30 W d1, Tooele, UT 84074",
      "imageurl": "https://iskarr.github.io/austindonovan.github.io/Chamber/images/business_imgs/securityTitle.jpeg",
      "description": "Security titles, insurance or law questions, we got you covered."
    }
  ]
};

function renderCards(list) {
  cards.innerHTML = "";
  list.forEach((b) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    const img = document.createElement("img");
    img.src = b.imageurl;
    img.alt = `${b.name} — image`;
    img.loading = "lazy";
    img.decoding = "async";

    const content = document.createElement("div");
    content.className = "content";

    const h2 = document.createElement("h2");
    h2.textContent = b.name;

    const addr = document.createElement("p");
    addr.className = "address";
    addr.textContent = b.address;

    const desc = document.createElement("p");
    desc.className = "description";
    desc.textContent = b.description;

    content.append(h2, addr, desc);
    card.append(img, content);
    cards.append(card);
  });
}

async function load() {
  try {
    const res = await fetch(URL, { cache: "no-store" });
    const text = await res.text();
    try {
      const jsObject = JSON.parse(text);
      console.log("Fetched Data:", jsObject);
      statusEl.textContent = "Loaded from API.";
      renderCards(jsObject.business ?? []);
    } catch {
      throw new Error("API did not return JSON (received HTML or invalid JSON).");
    }
  } catch (err) {
    console.warn("Falling back to local data because:", err);
    statusEl.textContent = "API unavailable — showing local data.";
    renderCards(localData.business);
  }
}

load();
