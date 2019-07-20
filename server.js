const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const PORT = 8000;
app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let uploadPath=[];

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  //console.log('req.files >>>', req.files); // eslint-disable-line

  let files = req.files;
  let key="img",
  i = 1,
  t = 1;

  let callbackResponse=function(err) {
    t++;// total of callback
    if (err) {
      return res.status(500).send(err);
    }
    if(i==t) {
      res.send('File(s) uploaded to: <br>' + uploadPath.join('<br>'));
    }
  };

  while(files[key+i]){
    let file = files[key+i];
    uploadPath[i-1] = __dirname + '/uploads/' + file.name;
    file.mv(uploadPath[i-1], callbackResponse);
    i++;
  }

});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
