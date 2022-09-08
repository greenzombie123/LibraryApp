function doCodeStuff(){
  this.doThings = function(){
    console.log('Wow')
  }
}

const o = new doCodeStuff()

o.doThings()