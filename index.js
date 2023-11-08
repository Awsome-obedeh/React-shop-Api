const express= require('express');
app=express();

const port=2000
app.listen(port ,()=>{
    console.log(`app is running on ${port}`);
})