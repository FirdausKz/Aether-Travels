const searchButton = document.getElementById("btnSearch");
const clear = document.getElementById('btnClear');

function searchCondition() {
  const input = document.getElementById("conditionInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let found = false;

      data.countries.forEach((country) => {
        if (country.name.toLowerCase().includes(input)) {
          country.cities.forEach((city) => {
            displayResult(
              city.name,
              city.imageUrl,
              city.description,
              resultDiv
            );
          });
          found = true;
        } else {
          country.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(input)) {
              displayResult(
                city.name,
                city.imageUrl,
                city.description,
                resultDiv
              );
              found = true;
            }
          });
        }
      });

      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(input)) {
          displayResult(
            temple.name,
            temple.imageUrl,
            temple.description,
            resultDiv
          );
          found = true;
        }
      });

      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(input)) {
          displayResult(
            beach.name,
            beach.imageUrl,
            beach.description,
            resultDiv
          );
          found = true;
        }
      });

      if (!input.trim()) {
        resultDiv.innerHTML = "Please enter a keyword to search.";
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function displayResult(title, imageUrl, description, container) {
  const item = document.createElement("div");
  item.className = "bg-white rounded-lg shadow-md overflow-hidden mb-4";

  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;
    image.style.maxWidth = "400px";
    item.appendChild(image);
  }
  const titleEl = document.createElement("h3");
  titleEl.textContent = title;
  titleEl.className = "font-bold text-base mb-1";
  item.appendChild(titleEl);

  if (description) {
    const desc = document.createElement("p");
    desc.textContent = description;
    desc.className = "text-sm text-gray-700";
    item.appendChild(desc);
  }

  container.appendChild(item);
}

function deleteInput(){
document.getElementById('conditionInput').value="";
document.getElementById('result').innerHTML = "";
}

clear.addEventListener("click",deleteInput)
searchButton.addEventListener("click", searchCondition);
