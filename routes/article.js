const express = require('express')
const Article = require('../models/article')
const articleRouter = express.Router()

articleRouter.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()})
})

articleRouter.get('/edit/:slug',async(req,res)=>{
         let article = await Article.findOne({slug:req.params.slug})
         res.render('articles/edit',{article:article})
})
articleRouter.get('/:slug',async (req,res)=>{
    const article =await Article.findOne({slug:req.params.slug})
    if(article==null) {res.redirect('/')}
    res.render('articles/show',{article:article})
})

articleRouter.post('/',async (req,res,next)=>
{
        req.article = new Article()
        next()
    
    },saveArticleAndRedirect('new'))
    


articleRouter.put('/:slug',async (req,res,next)=>{
    req.article = await Article.findOne({slug:req.params.slug})
    next()
},saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path)
{
    return async (req,res)=>{
        let article = req.article
        article.title= req.body.title
        
        article.markdown=req.body.markdown
        
       try{
         article= await article.save()
        res.redirect(`/articles/${article.slug}`)
       }catch(e){
        res.render(`articles/${path}`,{article:article})
        
       }
    }
}

articleRouter.delete('/:slug',async (req,res)=>{
  await Article.findOneAndDelete(req.params.slug)
  res.redirect('/')
})

module.exports = articleRouter