const admin = require("firebase-admin");
var serviceAccount = require("../permission.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const express = require("express");
const multer = require("multer");
const bcrypt = require('bcrypt')
const router = express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + '-' + Date.now() + "." + ext)
  }
})

var upload = multer({ storage: storage })

router.post("/api/create",upload.single('profile'),(req,res)=>{
  (async () =>{
    try
      {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const profile = req.file.filename;
        if (!firstname) {
                    return res.send({
                      status: 400,
                      message: "firstname is required",
                    });
                  }
                  if (!lastname) {
                    return res.send({
                      status: 400,
                      message: "lastname is required",
                    });
                  }
                  if (!email) {
                    return res.send({
                      status: 400,
                      message: "email is required",
                    });
                  }
                  if (!username) {
                    return res.send({
                      status: 400,
                      message: "username is required",
                    });
                  }
                  if (!password) {
                    return res.send({
                      status: 400,
                      message: "password is required",
                    });
                  }
            await bcrypt.hash(password,12).then((hashpassword)=>{
               db.collection("users").doc().create({
                firstname,
                lastname,
                email,
                username,
                profile,
                password:hashpassword,
              });
              return res.status(200).send("add user successfuly");
            })
      } 
      catch(error)
      { 
        console.log(error);
        res.json(error);
      }    
    })();      
})

router.get("/api/read",(req,res)=>{
  (async () =>{
      try
      {
          const query = db.collection("users");
          const response = [];

          await query.get().then((querysnapshot)=>{
              const docs = querysnapshot.docs;

              for(let doc of docs)
              {
                  const selectItem = {    
                      id:doc.id,
                      firstname:doc.data().firstname,
                      lastname:doc.data().lastname,
                      email:doc.data().email,
                      username:doc.data().username,
                      password:doc.data.password,
                      profile:doc.data().profile,
                  };
                  response.push(selectItem);
              }
              return response;
          })
          return res.status(200).json(response);
      }
      catch(error)
      {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
})

router.put("/api/update/:id",upload.single('profile'),(req,res)=>{
  (async () =>{
    try
    {
      const { firstname, lastname, email, username } = req.body;
        if (!firstname || !lastname || !email || !username) {
          return res.status(422).json({
              error: "please add all field"
          })
      }
        if (req.file) {
          const document = db.collection('users').doc(req.params.id)
          await document.update({    
             firstname:req.body.firstname, 
             lastname:req.body.lastname, 
             email:req.body.email, 
             username:req.body.username, 
             profile:req.file.filename
         })
         return res.status(200).send("updated data");
        }
        else
        {
          const document = db.collection('users').doc(req.params.id)
          await document.update({    
             firstname:req.body.firstname, 
             lastname:req.body.lastname, 
             email:req.body.email, 
             username:req.body.username, 
         })
         return res.status(200).send("updated data");
        }
      }
      catch(error)
      {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
})

router.delete("/api/delete/:id",(req,res)=>{
  (async () =>{
      try
      {
          const document = db.collection('users').doc(req.params.id)
           await document.delete();
          return res.status(200).send("deleted");
      }
      catch(error)
      {
          console.log(error);
          return res.status(500).send(error);
      }
  })();
})

module.exports = router;