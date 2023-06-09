const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const articleRouter = require('./routes/article')
const article = require('./models/article')


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

mongoose.connect("mongodb+srv://marshall:1234@cluster0.1pwwnux.mongodb.net/?retryWrites=true&w=majority")



app.get('/',async (req,res)=>{
    const articles= await article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)


app.listen(3000)