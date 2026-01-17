const express = require("express");
const postModel = require("../models/postModel");

const adminController = {
  //GET /ADMIN
  index: (req, res) => {
    const posts = postModel.getAllPosts();
    res.render("admin", {posts});
  },
  //GET /ADMIN/CREATE
  create: (req, res) => {
    res.render("newPostForm");
  },

  //POST /ADMIN/CREATE
  save: (req, res) => {
    const {title, content} = req.body;

    const newPost = postModel.createPost(title, content);
    postModel.savePost(newPost);

    res.redirect("/admin");
  },

  //GET /ADMIN/EDIT/:ID
  edit: (req, res) => {
    const id = req.params.id;

    const post = postModel.getPostById(id);

    res.render("editPostForm", {post});
  },

  //POST /ADMIN/UPDATE/:ID
  update: (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;

    postModel.updatePost(id, {title, content});

    res.redirect("/admin");
  },

  //POST /ADMIN/DELET/:ID
  delete: (req, res) => {
    const id = req.params.id;

    postModel.deletePost(id);

    res.redirect("/admin");
  },
};

module.exports = adminController;
