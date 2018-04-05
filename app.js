$(document).ready(() => {
 
 var state = {
  items: []
};


var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

function addItem(state, item) {
  state.items.push({
  });
}

  $(".button-label").on("click", function(event) {
    $(".shopping-item").toggleClass("shopping-item__checked");
  });

  $("#js-shopping-list-form").on("submit", function(event) {
    event.preventDefault();
    let userEntry = $(this)
      .find("#shopping-list-entry").val();
  });
});
