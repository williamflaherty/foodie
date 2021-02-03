//global variables
const urlParams = new URLSearchParams(window.location.search);
// const taskId = urlParams.get('id');

//global CRUD functions
async function getRecipes(){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes', requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getRecipeById(recipeId){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes/' + recipeId, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getSpecificUser(id){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/users/' + id, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function getUserRecipes(id){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes/user/' + id, requestOptions);
    const body = await response.json();
    if (response.status != 200) {
        throw Error(body.message);
    }
    return body;
}

async function searchRecipes(query, on){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    
    const response = await fetch('/recipes/search/' + on + '/' + query, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;
}

async function createRecipe(title, ingredients, times, directions, summary, image, tags){
    let recipe = {
        title: title,
        ingredients: ingredients,
        prep_cook_time: times,
        directions: directions,
        summary: summary,
        picture: image,
        tags: tags,
        created_by: '6000c2eed43991ec6f6e2487'
    }
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/recipes', requestOptions);
    if (response.status != 201){
        throw Error('Recipe not created');
    }
    return `Recipe "${recipe.title}" created!
    ${recipe}
    `;
}

//https://flaviocopes.com/file-upload-using-ajax/
async function handleImageUpload(imageInput){
    const files = imageInput.files;
    if (files.length === 0){
        return null;
    }
    const formData = new FormData();
    formData.append('image', files[0]);

    const response = await fetch('/saveImage', {method: 'POST', body: formData});
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body.path;
}

//global miscellaneous functions
function addIngredientRow(){
    ingredientCount++;
    let ingRow = document.createElement('div');
    ingRow.setAttribute('class', 'ingredientRow');
    ingRow.setAttribute('id', 'ingRow' + ingredientCount);
    document.getElementById('ingredientWrapper').append(ingRow);
    ingRow.innerHTML = `<input type="text" id="ingredient${ingredientCount}" name="ingredient" placeholder="eggs">
        <input type="text" id="amount${ingredientCount}" name="amount" placeholder="2 large">
        <input type="text" id="substitutions${ingredientCount}" name="substitutions" placeholder="12 oz of applesauce">`;
}