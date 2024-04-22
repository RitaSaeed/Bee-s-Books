// $(document).ready(function() {
//     $('#products').DataTable({
//         ajax: {
//             url: 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods',
//             dataSrc: 'Items'
//         },
//         columns: [
//             { data: 'SK' },
//             { data: 'title' },
//             { data: 'author' },
//             { data: 'quantity'}       
//         ]
//     });
// });

$(document).ready(function() {
    //const idToken = getCookie("id_token");
    var table = $('#products').DataTable({
        ajax: {
            url: 'https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/AdminMethods',
            dataSrc: 'Items'//,
            // beforeSend: function (request) {
            //     request.setRequestHeader("Authorization", `Bearer  ${idToken}`);
            // }
        },
        columns: [
            { data: 'SK' },
            { data: 'title' },
            { data: 'author' },
            { data: 'quantity'}       
        ]
    });

    // Adjust column sizing when the table becomes visible
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });
});

