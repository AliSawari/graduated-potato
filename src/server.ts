import { createServer } from 'http';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Graduated Potato</title>
</head>
<body>
  <h1>
    I'm a Telegram bot you idiot!</h1>
    <p>here's the correct url: <a href="https://t.me/graduated_potato_bot">@graduated_potato_bot</a></p>
</body>
</html>
`

export const server = createServer((req, res) => {
  if(req.url == "/") {
    res.statusCode = 200;
    res.end(html)
  } else if(req.url == "/heartbeat") {
    res.statusCode = 200;
    res.end(JSON.stringify({alive: true}));
  } else {
    res.statusCode = 404; 
    res.end("Not Found");
  }
})