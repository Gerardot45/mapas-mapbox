const Store = require("../models/Store");
// @desc Get all stores
// @route GET /api/v1/stores
// @access public

const { response } = require("express");

exports.getStores = async (req, res = response, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.addStore = async (req, res = response, next) => {
    try {
      const store = await Store.create(req.body)
      return res.status(201).json({
        success: true,
        data: store,
      })
    } catch (error) {
      console.log(error);
      if(error.code === 11000){
          return res.status(400).json({
              error:"The store already exists"
          })
      }
      res.status(500).json({ error: "Server Error" });
    }
  };
