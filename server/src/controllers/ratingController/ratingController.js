
import { Rating } from '../../models/ratingModel.js';
import { Product } from './../../models/productModel.js';


// Add or update rating for a product
export const addOrUpdateRating = async (req, res) => {
  try {
    const { productId, userId, rating, review } = req.body;

    // Find if a rating by the user for the same product already exists
    let existingRating = await Rating.findOne({ product: productId, user: userId });

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: 'Rating updated successfully',
        data: existingRating,
      });
    } else {
      // Create a new rating
      const newRating = new Rating({
        user: userId,
        product: productId,
        rating,
        review,
      });
      await newRating.save();

      // Optional: You can also update the product's average rating here
      const product = await Product.findById(productId);
      if (product) {
        const ratings = await Rating.find({ product: productId });
        const avgRating = ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length;
        product.avgRating = avgRating;
        await product.save();
      }

      return res.status(201).json({
        success: true,
        message: 'Rating added successfully',
        data: newRating,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get all ratings for a product
export const getProductRatings = async (req, res) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ product: productId }).populate('user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Ratings fetched successfully',
      data: ratings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Delete a rating
export const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Rating deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
