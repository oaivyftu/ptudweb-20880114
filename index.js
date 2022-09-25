let express = require('express')
let app = express()

app.use(express.static(__dirname + '/public'))

let expressHbs = require('express-handlebars')
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:page', (req, res) => {
    const banners = {
        blog: 'Our Blog',
        category: 'Category',
        cart: 'Shpping Cart'
    }
    let page = req.params.page
    res.render(page, { banner: banners[page] })
})

app.set('port', process.env.PORT || 5001)
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`)
})
