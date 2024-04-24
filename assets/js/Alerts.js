// const alertPlaceholder = document.getElementById('contact-confirm')
// const appendAlert = (message, type) => {
//   const wrapper = document.createElement('div')
//   wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     '</div>'
//   ].join('')

//   alertPlaceholder.append(wrapper)
// }

// const alertTrigger = document.getElementById('contact-submit')
// if (alertTrigger) {
//   alertTrigger.addEventListener('click', () => {
//     appendAlert('Message sent!', 'primary')
//   })
// }

// ex: spawnAlert('contact-confirm', 'contact-submit', 'Message sent!', 'primary')
function spawnAlert(placeHolderID, message, type, linkMessage, link) {
    console.log("Alert attempting to spawn.")
    
    const alertPlaceholder = document.getElementById(placeHolderID)
    const wrapper = document.createElement('div')
    if (link === undefined || linkMessage === undefined) {
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    }
    else {
        wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message} <a href="${link}" class="alert-link">${linkMessage}</a></div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    }
      

      alertPlaceholder.append(wrapper)
    
}