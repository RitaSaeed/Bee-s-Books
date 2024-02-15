// $(document).ready(function() {
//     $('#add-product-modal').on('hide.bs.modal', function(e) {
//         // Check if the target of the event is the close button
//         console.log(e.target.id);
//         if (e.target.id === 'close-add-product-icon') {
//             return;
//         }
        
//         // If it's not the close button, prevent the modal from closing if the form is not valid
//         else if ($('#add-product-form')[0].checkValidity() === false) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//     });
// });

// $(document).ready(function() {
//     var closeButtonClicked = false;

//     // Add a click event listener to the close button
//     $('#close-add-product-icon').click(function() {
//         closeButtonClicked = true;
//     });

//     $('#add-product-modal').on('hide.bs.modal', function(e) {
//         if (!closeButtonClicked && $('#add-product-form')[0].checkValidity() === false) {
//             e.preventDefault();
//             e.stopPropagation();
//         }

//         // Reset the flag
//         closeButtonClicked = false;
//     });
// });

// $(document).ready(function() {
//     // Directly hide the modal when the close button is clicked
//     $('#close-add-product-icon').click(function() {
//         $('#add-product-modal').modal('hide');
//     });

//     // Prevent the modal from hiding if the form is not valid
//     $('#add-product-modal').on('hide.bs.modal', function(e) {
//         if (!closeButtonClicked && $('#add-product-form')[0].checkValidity() === false) {
//             e.preventDefault();
//             e.stopPropagation();
//         }
//     });
// });

$(document).ready(function() {
    var closeButtonClicked = false;

    // Add a click event listener to the close button
    $('#close-add-product-icon').click(function() {
        closeButtonClicked = true;
        $('#add-product-modal').modal('hide');
    });

    $('#add-product-modal').on('hide.bs.modal', function(e) {
        if (!closeButtonClicked && $('#add-product-form')[0].checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Reset the flag
        closeButtonClicked = false;
    });
});





