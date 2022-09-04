const job = {k:12,dosomething:function(){console.log(this)}}

function doThings(callback){
    callback();
}

const eggs = {
    k:3,
    doThings:function(callback){
        callback();
    }
}

job.dosomething()

eggs.doThings(job.dosomething.bind(eggs))