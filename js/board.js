      var apiUrl = 'https://kodilla.com/pl/bootcamp-api';

      function Board(name) {
          this.name = name;
          this.$element = this.createBoard();
      }
      Board.prototype = {
          createBoard: function() {
              var self = this;
              var $board = $('<div>').addClass('board');
              var $boardHeader = $('<div>').addClass('board-header');
              var $boardForm = $('<form>').addClass('board-form');
              var $addColumnInput = $('<input>').addClass('add-column-input').attr('placeholder', 'type column name');
              var $boardDescription = $('<h1>').addClass('board-description').text(this.name);
              var $addColumnButton = $('<button>').addClass('add-column-button').text('+');
              var $removeBoardButton = $('<button>').addClass('remove-board-button').text('x');
              var $columnContainer = $('<div>').addClass('column-container');
              $boardForm.submit(function(e) {
                  e.preventDefault();
              });
              $addColumnInput.focus(function(e) {
                  $(e.target).parent().addClass('focused');
                  $(e.target).attr('placeholder', '');
              });
              $addColumnInput.focusout(function(e) {
                  $(e.target).parent().removeClass('focused');
                  $(e.target).attr('placeholder', 'type column name');
              });
              $addColumnInput.keydown(function(e) {
                  if (e.keyCode === 13) {
                      var columnName = $(e.target).val();
                      $.ajax({
                          url: apiUrl + '/column',
                          method: 'POST',
                          data: {
                              name: columnName
                          },
                          success: function(data) {
                              var column = new Column(columnName, data.id)
                              self.addColumn(column);
                          }
                      })
                      $(e.target).val('');
                      e.preventDefault();
                  }
              });
              $removeBoardButton.click(function() {
                  self.removeBoard();
              });
              $addColumnButton.click(function(e) {
                  self.addColumn(new Column($(e.target).prev().val()));
              });
              $boardForm.append($addColumnInput).append($addColumnButton);
              $boardHeader.append($boardDescription).append($removeBoardButton);
              $board.append($boardHeader).append($boardForm).append($columnContainer);
              return $board;
          },
          removeBoard: function() {
              var self = this;
              this.$element.fadeOut('fast', function() {
                  self.$element.remove();
              });
          },
          addColumn: function(column) {
              this.$element.children('.column-container').append(column.$element);
              column.initSortable();
              $(column.$element).jAnimateOnce('fadeInUp');
          }
      };
      $('#add-board').click(function(e) {
          var newBoard = new Board(prompt('Enter board name: '));
          newBoard.$element.insertAfter(e.target);
          newBoard.$element.children('.board-header').jAnimateOnce('fadeInUp');
          newBoard.$element.children('.board-form').jAnimateOnce('fadeInUp');
      });
      $('main').append(this.$element);