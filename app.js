'<li>' +
     '<span class="shopping-item js-shopping-item"></span>' +
     '<div class="shopping-item-controls">' +
-      '<button class="shopping-item-toggle">' +
+      '<button class="js-shopping-item-toggle">' +
         '<span class="button-label">check</span>' +
       '</button>' +
-      '<button class="shopping-item-delete js-shopping-item-delete">' +
+      '<button class="js-shopping-item-delete">' +
         '<span class="button-label">delete</span>' +
       '</button>' +
     '</div>' +
@@ -24,19 +24,33 @@ var listItemTemplate = (
 
 // state management
 function addItem(state, item) {
-  state.items.push(item);
+  state.items.push({
+    displayName: item,
+    checkedOff: false
+  });
+}
+
+function getItem(state, itemIndex) {
+  return state.items[itemIndex];
 }
 
 function deleteItem(state, itemIndex) {
   state.items.splice(itemIndex, 1);
 }
 
+function updateItem(state, itemIndex, newItemState) {
+  state.items[itemIndex] = newItemState;
+}
 
 // DOM manipulation
 
 function renderItem(item, itemId, itemTemplate, itemDataAttr) {
   var element = $(itemTemplate);
-  element.find('.js-shopping-item').text(item);
+  element.find('.js-shopping-item').text(item.displayName);
+  if (item.checkedOff) {
+    element.find('.js-shopping-item').addClass('shopping-item__checked');
+  }
+  element.find('.js-shopping-item-toggle')
   element.attr(itemDataAttr, itemId);
   return element;
 }
@@ -76,6 +90,22 @@ function handleItemDeletes(
 }
 
 
+function handleItemToggles(
+  listElement, toggleIdentifier, itemDataAttr, state) {
+
+  listElement.on('click', toggleIdentifier, function(event) {
+    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
+    var oldItem = getItem(state, itemId);
+
+    updateItem(state, itemId, {
+      displayName: oldItem.displayName,
+      checkedOff: !oldItem.checkedOff
+    });
+    renderList(state, listElement, itemDataAttr)
+  });
+}
+
+
 $(function() {
   var formElement = $('#js-shopping-list-form');
   var listElement = $('.js-shopping-list');
@@ -92,9 +122,13 @@ $(function() {
   // we'll use this attribute to store the id of the list item
   var itemDataAttr = 'data-list-item-id';
 
+  //
+  var toggleIdentifier = '.js-shopping-item-toggle'
+
   handleItemAdds(
     formElement, newItemIdentifier, itemDataAttr, listElement, state);
   handleItemDeletes(
     formElement, removeIdentifier, itemDataAttr, listElement, state);
+  handleItemToggles(listElement, toggleIdentifier, itemDataAttr, state);
 });