       var apiUrl = 'https://kodilla.com/pl/bootcamp-api';

       function Card(name, id) {
           this.name = name || 'No name given';
           this.id = id
           this.$element = this.createCard();
       }
       Card.prototype = {
           createCard: function() {
               var self = this;
               var $card = $('<li>').addClass('card');
               var $cardDescription = $('<p>').addClass('card-description').text(this.name);
               var $cardDelete = $('<button>').addClass('card-delete-button').text('x');
               $cardDelete.click(function() {
                   self.removeCard();
               });
               $card.append($cardDelete).append($cardDescription);
               return $card;
           },
           removeCard: function() {
               var self = this;
               this.$element.fadeOut('fast', function() {
                   $.$.ajax({
                       url: apiUrl + '/card/' + self.id,
                       method: 'DELETE',
                       success: function(response) {
                           self.$element.remove();
                       }

                   })

               });

           }
       }