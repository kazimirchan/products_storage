window.onload = () => {
  let products = [];
  const rows = document.getElementsByTagName('tr');
  Object.keys(rows)
    .forEach( key => {
      rows[key].addEventListener('dblclick', () => {
        const product_id = rows[key].id.replace('product_', '');
        editProduct(product_id);
      });
    });
  const xhr = new XMLHttpRequest();
  xhr.open("GET", '/list/all', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send();
  xhr.onload = function () {
    if (xhr.status === 200) {
      products = JSON.parse(xhr.response);
      console.log(products);
    }
  };
};


/**
 * @description send delete request and remove row from table
 * @param event - clicked button
 */
function deleteProduct(event) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", '/list/delete', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  const data = {id: event.target.id};
  const json = JSON.stringify(data);
  xhr.send(json);
  xhr.onload = function () {
    if (xhr.status === 200) {
      remove(event.target.id);
    }
  };
}

/**
 * @description filter all products in table
 * @param event
 */
function filter_products(event) {

}

/**
 * @description remove row from DOM
 * @param product_id
 */
function remove(product_id) {
  console.log('deleteProduct', product_id);
  // console.log('deleteProduct', document.getElementById('product_'+product_id));
  document.getElementById('product_' + product_id).remove();
}

/**
 * @description open /edit for current product
 * @param product_id - current product
 */
function editProduct(product_id) {
  window.location.href = '/edit?product_id='+product_id;
}
