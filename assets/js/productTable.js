$(document).ready(function() {
    $('#products').DataTable({
        ajax: {
            url: 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods',
            dataSrc: 'Items'
        },
        columns: [
            { data: 'SK' },
            { data: 'title' },
            { data: 'author' },
            { data: 'quantity'}       
        ]
    });
});
