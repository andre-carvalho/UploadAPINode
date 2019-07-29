const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.options('*', cors());

app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

// to test API response
app.get('/ping', function(req, res) {
  res.send('pong');
});

// fake method to test
app.post('/login/mobile/auth', function(req, res) {
  console.log('call to login/mobile/auth ');
  res.send({status:1,token:'lajs8a7d89asd98uya89b'});
});

// fake method to test
app.post('/login/logout', function(req, res) {
  console.log('call to login/logout ');
  res.send({status:1});
});

// fake method to test
app.post('/core/users/getbytoken', function(req, res) {
  console.log('call to core/users/getbytoken ');
  res.send({status:1,user:'one name...'});
});


app.post('/upload', function(req, res) {
  let uploadPath=[];

  if (!req.files || Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  if (!req.body.formKey || req.body.formKey == "") {
    res.status(400).send('Form key is missing');
    return;
  }

  // console.log('req.formKey: ', req.body.formKey);
  // console.log('req.files >>>', req.files); // eslint-disable-line

  let files = req.files;
  let formKey = req.body.formKey;
  let key="img",
  i = 1,
  t = 1;

  let callbackResponse=function(err) {
    t++;// total of callback
    if (err) {
      return res.status(500).send(err);
    }
    if(i==t) {
      res.send({status:1});
    }
  };

  while(files[key+i]){
    let file = files[key+i];
    //uploadPath[i-1] = __dirname + '/uploads/' + formKey + '/' + file.name;
    uploadPath[i-1] = __dirname + '/uploads/' + file.name;
    file.mv(uploadPath[i-1], callbackResponse);
    i++;
  }

});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
