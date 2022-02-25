const inputField = () => {
    const inputId = document.getElementById('input-field');
    const inputValue = inputId.value;
    inputId.value = '';

    if (inputValue == '') {
        const inputError = document.getElementById('error-input');
        inputError.innerText = 'Please Search Food Name';
    } else {
        const inputError = document.getElementById('error-input');
        inputError.innerText = '';
        const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        fetch(mealUrl)
            .then(res => res.json())
            .then(data => searchResult(data.meals))
    }
}

const searchResult = meal => {
    const searchId = document.getElementById('search-result');
    searchId.innerHTML = '';
    if (meal == null) {
        const inputError = document.getElementById('error-input');
        inputError.innerText = 'No Result Found';
    }
    meal.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="singleMeal(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,180)}</p>
        </div>
  </div>
        `;
        searchId.appendChild(div)
    })
}

const singleMeal = mealId => {
    const singleUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(singleUrl)
        .then(res => res.json())
        .then(data => displaySingle(data.meals[0]))
}

const displaySingle = meal => {
    const singleDetails = document.getElementById('single-details');
    singleDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card', 'my-4');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top rounded px-2 py-3 " alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,280)}</p>
      <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
    </div
    `;
    singleDetails.appendChild(div)
}