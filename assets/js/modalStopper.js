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





