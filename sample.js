for (i = 1; i <= 5; ++i) {
  setDelay(i);
}

function setDelay(i) {
  setTimeout(function(){
    console.log(i);
  }, 1000);
}
