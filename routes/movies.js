const express = require('express');
const router = express.Router() 
const Movie = require('../models/movie.js');

router.get('/',async(req, res) =>{
    try{
        const movies = await Movie.find();
        res.json(movies);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id',getMovie,(req, res) =>{
    res.json(res.movie);    
});

router.post('/',async (req, res) =>{
    const movie = new Movie({
        movieDirector: req.body.movieDirector,
        movieTitle: req.body.movieTitle,    

    });
    try{
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

router.delete('/:id',getMovie,async (req, res) =>{
    try{
        await res.movie.remove();
        res.json({message:'Movie deleted.'})
    }catch(error){
        res.status(500).json({message:"Could not find a mvoie"});
    }
})

router.patch('/:id',getMovie,async (req, res) =>{
    if(req.body.movieTitle != null){
        res.movie.movieTitle = req.body.movieTitle;
    }
    if(req.body.movieDirector != null){
        res.movie.movieDirector = req.body.movieDirector;
    }
    try{
        const updateMovie = await res.movie.save();
        res.json(updateMovie);
    }catch(err){
        res.status(400).json({message:"Movie not upadted!"});
    }
})

async function getMovie(req, res,next){
    let movie;
    try{
        movie = await Movie.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({message:"Movie Not Found"});
        }
    }catch(error){  
        return res.status(500).json({message:"ID selected was not found"});
    }
    res.movie = movie;
    next();
}

module.exports = router;
