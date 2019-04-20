console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const errorMessage = document.getElementById('error-message')
const message = document.getElementById('message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get input field value
    const location = document.querySelector('input').value

    message.textContent = 'Loading. . .'
    errorMessage.textContent = ''

    // get location
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = ''
                return errorMessage.textContent = data.error 
            }
                
            message.textContent = `${data.location}. ${data.forecastData}`
        })
    })
})