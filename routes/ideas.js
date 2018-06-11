const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
      //load idea model
      require('../models/Ideas');
      const Idea = mongoose.model('ideas');


router.get('/' ,(req,res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
     res.render('ideas/index',{
         ideas:ideas
     });
    });


});



// add ideas
     router.get('/add',(req,res)=>{
         res.render('ideas/add');
         });

         // edit idea
         router.get('/edit/:id',(req,res)=>{
             Idea.findOne({

                 _id:req.params.id
                   
             })
             .then(idea =>{
                 res.render('ideas/edit',{
                     idea:idea
                 });
             });
             });
           


 // process form Idea

 router.post('/',(req,res)=>{
    
     var errors = [];
     if(!req.body.title){
        errors.push({text:'Please add text'});
     }
     if(!req.body.details){
         errors.push({text:'Please add details'});
      }

  if(errors.length > 0){

     res.render('/add', {
         errors:errors,
         title:req.body.title,
         details:req.body.details
     })

  }

  else {
   const newUser = {
       title: req.body.title,
       details: req.body.details
   }
       
     new Idea(newUser)
     .save()
     .then(idea =>{
         req.flash('sucess_msg','Video idea Added');
         res.redirect('/ideas');
     })

  }


     });


// edit form processsssssssss

router.put('/:id' ,(req,res)=>{
Idea.findOne({
 _id:req.params.id

}).then(idea =>{

  //New values
  idea.title = req.body.title;
  idea.details = req.body.details;

  idea.save()
  .then(idea=>{
     req.flash('sucess_msg','Video idea Updated');
      res.redirect('/ideas');
  })



});

});


router.delete('/:id',(req,res)=>{

Idea.remove({

  _id:req.params.id

})

.then(()=>{
     req.flash('sucess_msg','Video idea removed');
     res.redirect('/ideas');
});

});

module.exports = router;