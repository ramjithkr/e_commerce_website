import mongoose from "mongoose";
import { Rating } from "../../models/ratingModel.js";
import { Product } from "../../models/productModel.js";

export const addOrUpdateRating = async (req, res) => {
  try {
    const { productId, id, rating, review } = req.body;

    let existingRating = await Rating.findOne({ productId, id });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        data: existingRating,
      });
    } else {
      const newRating = new Rating({
        id,
        productId,
        rating,
        review,
      });
      await newRating.save();

      const product = await Product.findById(productId);
      if (product) {
        const ratings = await Rating.find({ productId });
        const avgRating =
          ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;
        product.avgRating = avgRating;
        await product.save();
      }

      return res.status(201).json({
        success: true,
        message: "Rating added successfully",
        data: newRating,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }
    const product = await Product.findById(deletedRating.productId);
    if (product) {
      const ratings = await Rating.find({ productId: deletedRating.productId });
      if (ratings.length > 0) {
        const avgRating =
          ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;
        product.avgRating = avgRating;
      } else {
        product.avgRating = 0;
      }
      await product.save();
    }

    return res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ productId }).populate(
      "id",
      "name email profile"
    );

    if (ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for this product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ratings retrieved successfully",
      data: ratings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
