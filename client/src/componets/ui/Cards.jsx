/* eslint-disable react/prop-types */

export const ProductCards = ({ product }) => {
  return (
    <div className="card bg-base-300 w-full md:w-80 lg:w-96 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <figure className="h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold mb-2">
          {product?.brand}
        </h2>
        <p className="text-gray-600 mb-4">{product?.desc}</p>
        <p className="text-xl font-bold text-blue-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto">
          <button className="btn btn-primary w-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
// data
// :
// Array(2)
// 0
// :
// brand
// :
// "samsung"
// category
// :
// "mobiles"
// createdAt
// :
// "2024-08-20T15:11:05.961Z"
// desc
// :
// "this is a good product"
// image
// :
// "http://res.cloudinary.com/dsdjuxugm/image/upload/v1724166662/e_commerce_website/pmshkmrjsul2ddtld9fw.png"
// price
// :
// 100000
// ratings
// :
// []
// stock
// :
// 300
// title
// :
// "samsung s24"
