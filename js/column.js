     var apiUrl = 'https://kodilla.com/pl/bootcamp-api';

     function Column(name, id) {
         this.name = name;
         this.id = id
         this.$element = this.createColumn();
     }
     Column.prototype = {
         createColumn: function() {
             var self = this;
             var $column = $('<div>').addClass('column');
             var $columnTitle = $('<h2>').addClass('column-title').text(this.name);
             var $columnCardList = $('<ul>').addClass('column-card-list');
             var $columnForm = $('<form>').addClass('column-form');
             var $addInput = $('<input>').addClass('column-input').attr('placeholder', 'type your task here');
             var $addCardButton = $('<button>').addClass('add-card').text('+');
             var $deleteColumnButton = $('<button>').addClass('column-delete-button').text('x');
             //************************************************ Event handlers******************************************************
             $deleteColumnButton.click(function() {
                 self.removeColumn();
             });
             $columnForm.submit(function(e) {
                 e.preventDefault();
             });
             $addInput.focus(function(e) {
                 $(e.target).parent().addClass('focused');
                 $(e.target).attr('placeholder', '');
             });
             $addInput.focusout(function(e) {
                 $(e.target).parent().removeClass('focused');
                 $(e.target).attr('placeholder', 'type your task here');
             });
             $addInput.keydown(function(e) {
                 if (e.keyCode === 13) {
                     var cardName = $(e.target).val();
                     $.ajax({
                         url: apiUrl + '/card',
                         method: 'POST',
                         data: {
                             name: cardName,
                             bootcamp_kanban_column_id: self.id
                         },
                         success: function(data) {
                             var card = new Card(cardName, data.id);
                             self.addCard(card);
                         }
                     })

                     $(e.target).val('');
                     e.preventDefault();
                 }
             });
             $addCardButton.click(function(e) {
                 var cardName = $(e.target).prev().val();
                 $.ajax({
                     url: apiUrl + '/card',
                     method: 'POST',
                     data: {
                         name: cardName,
                         bootcamp_kanban_column_id: self.id
                     },
                     success: function(data) {
                         var card = new Card(cardName, data.id);
                         self.addCard(card);
                     }

                 });
                 $(e.target).prev().val('');
             });
             // ****************************************************Appending to column******************************************************
             $columnForm.append($addInput).append($addCardButton);
             $column.append($columnTitle).append($columnForm).append($deleteColumnButton).append($columnCardList);
             return $column;
         },
         removeColumn: function() {
             var self = this;
             this.$element.fadeOut('fast', function() {
                  $.ajax({
                       url: apiUrl + '/column/' + self.id,
                       method: 'DELETE',
                       success: function(response) {
                           self.$element.remove();
                       }

                   })
             });
         },
         addCard: function(card) {
             this.$element.children('.column-card-list').append(card.$element);
             $(card.$element).jAnimateOnce('fadeInUp');
         },
         initSortable: function() {
             $('.column-card-list').sortable({
                 connectWith: '.column-card-list',
             }).disableSelection();
         }
     };