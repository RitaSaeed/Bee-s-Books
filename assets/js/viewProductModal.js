$(document).ready(function() {
    $('#data-tables-products').on('click', 'tbody tr', function() {
        // Get the text of the first column of the clicked row
        var firstColumnText = $(this).find('td:first').text();

        // Pass the text to the modal
        //$('#view-product-modal .modal-header').text(firstColumnText);
        
        const apiUrl = `https://psiceqjjgb.execute-api.us-east-1.amazonaws.com/BB_prod/getBooks?isbn=${firstColumnText.slice(5, 15)}`;
            console.log(apiUrl);

            fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status}');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.getElementById('edit-isbn').value = 
                    data["Items"][0]["SK"].slice(5);
                document.getElementById('edit-title').value = 
                    data["Items"][0]["title"];
                document.getElementById('edit-author').value = 
                    data["Items"][0]["author"];
                console.log(data["Items"][0]["PK"].slice(6));

                const genreSelector = document.getElementById('edit-genre');
                switch(data["Items"][0]["PK"].slice(6)) {
                    case 'Action/Adventure':
                        genreSelector.value = 'Action/Adventure';
                        break;
                    case 'Biography':
                        genreSelector.value = 'Biography';
                        break;
                    case 'Children\'s':
                        genreSelector.value = 'Children\'s';
                        break;
                    case 'Classics':
                        genreSelector.value = 'Classics';
                        break;
                    case 'Contemporary':
                        genreSelector.value = 'Contemporary';
                        break;
                    case 'Fantasy':
                        genreSelector.value = 'Fantasy';
                        break;
                    case 'Food and Drink':
                        genreSelector.value = 'Food and Drink';
                        break;
                    case 'Graphic Novels':
                        genreSelector.value = 'Graphic Novels';
                        break;
                    case 'Horror':
                        genreSelector.value = 'Horror';
                        break;
                    case 'Memoir':
                        genreSelector.value = 'Memoirs';
                        break;
                    case 'Mystery':
                        genreSelector.value = 'Mystery';
                        break;
                    case 'Romance':
                        genreSelector.value = 'Romance';
                        break;
                    case 'Science Fiction':
                        genreSelector.value = 'Science Fiction';
                        break;
                    case 'Self Help':
                        genreSelector.value = 'Self Help';
                        break;
                    case 'Textbooks':
                        genreSelector.value = 'Textbooks';
                        break;
                    case 'True Crime':
                        genreSelector.value = 'True Crime';
                        break;
                    default:
                        console.log('hitting default');
                }
                try {
                    $('select[name=edit-genre]').selectpicker('refresh');
                } catch (error) {}
                const fictionSelector = document.getElementById('edit-fiction');
                console.log(data["Items"][0]["fiction"]);
                switch(data["Items"][0]["fiction"]) {
                       case 'Yes':
                            fictionSelector.value = 'Yes';
                            break;
                       case 'No':
                            fictionSelector.value = 'No';
                            break;
                       default: 
                            console.log("hitting default fiction");
                }
                try {
                    $('.selectpicker').selectpicker('refresh');
                } catch (error) {}
                // document.getElementById('edit-fiction').value = 
                //     data["Items"][0]["fiction"];
                document.getElementById('edit-price').value = 
                    data["Items"][0]["price"];
                document.getElementById('edit-quantity').value = 
                    data["Items"][0]["quantity"];
                document.getElementById('edit-description').value = 
                    data["Items"][0]["description"];
                document.getElementById('edit-image').value = 
                    data["Items"][0]["img"];
                document.getElementById('edit-rating').value = 
                    data["Items"][0]["rating"];
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        // Show the modal
        $('#view-product-modal').modal('show');
    });
});
