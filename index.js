'use strict'

function getRepoList(userInput) {
    fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(response => { 
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#results-list').empty();
        $('#results').addClass('hidden');
        $('#js-error-message').removeClass('hidden');
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    $('#js-error-message').addClass('hidden');

    responseJson.forEach(ele => 
        $('#results-list').append(`<li>${ele.name} - <a href="${ele.html_url}">Repo Link</a></li>`)
    );
}

function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        const userInput = $('#username-input').val();
        getRepoList(userInput)
    })
}

$(watchForm);