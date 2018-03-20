const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname+'/public'));

app.use((req,res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url} `;
    fs.appendFile('server.log', log + '\n', (err)=> {
        if (err) {
            console.log('Something went Wrong');
        }
    })
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:'Wellcome to the Home Page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });

}); 
app.get('/bad', (req, res) => {
     res.json({
         response:'Bad URL, Please type a correct URL'
     });
});


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});