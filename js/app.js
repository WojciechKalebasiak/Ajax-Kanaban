$(document).ready(function() {
    var apiUrl = 'https://kodilla.com/pl/bootcamp-api';
    var header = {
        'X-Client-Id': 2947,
        'X-Auth-Token': '5dfb7eec960a6e2a1b550c9a2d4c7892'
    };
    $.ajaxSetup({
        headers: header
    }); // end of ajax setup
    $.ajax({
        url: apiUrl + '/board',
        success: function(response) {
            setupColumns(response.columns);
        }
    }) // end of ajax request
    var board = new Board('My Board');

    function setupColumns(data) {
        $(data).each(function(index, el) {
            var column = new Column(el.name, el.id);
            board.addColumn(column);
            setupCards(column, el.cards);
        }); //end of loop
    } //end of setupColumns
    function setupCards(column, cards) {
        $(cards).each(function(index, el) {
            var card = new Card(el.name, el.id, el.bootcamp_kanban_column_id);
            column.addCard(card);
        });
    }
    $('main').append(board.$element);
}); //end of doc ready