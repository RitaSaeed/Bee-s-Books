$(document).ready(function() {
    $('#data-tables-products').on('click', 'tbody tr', function() {
        // Get the text of the first column of the clicked row
        var firstColumnText = $(this).find('td:first').text();

        // Pass the text to the modal
        $('#view-product-modal .modal-body').text(firstColumnText);

        // Show the modal
        $('#view-product-modal').modal('show');
    });
});
