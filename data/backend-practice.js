const xhr = new XMLHttpRequest(); //creates a new HTTP message to send to the backend

xhr.addEventListener('load',() => {
  console.log(xhr.response);
})

xhr.open('GET','https://supersimplebackend.dev/products/first');
xhr.send();
