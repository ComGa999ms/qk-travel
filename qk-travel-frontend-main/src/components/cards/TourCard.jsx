import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const TourCard = ({ tour }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-yellow-400"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-gray-300"></i>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
      {/* Image Section */}
      <div className="relative overflow-hidden h-56">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge */}
        {tour.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
              <i className="fas fa-star mr-1 text-xs"></i>
              Nổi bật
            </span>
          </div>
        )}

        {/* Location Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 bg-black/30 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            <i className="fas fa-map-marker-alt mr-1 text-xs"></i>
            {tour.location}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <div className="text-lg font-bold text-primary-600">
              {formatCurrency(tour.price)}
            </div>
            <div className="text-xs text-gray-600 text-center">/người</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-[3.5rem] group-hover:text-primary-600 transition-colors">
            {tour.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(tour.rating)}
              <span className="text-sm text-gray-600 ml-1">
                ({tour.rating})
              </span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {tour.duration}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[4.5rem] flex-1">
          {tour.description}
        </p>

        {/* Tour Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <span className="flex items-center">
              <i className="fas fa-users mr-1.5 text-primary-500"></i>
              Max {tour.maxPeople || tour.maxGroupSize} người
            </span>
            <span className="flex items-center">
              <i className="fas fa-calendar-alt mr-1.5 text-green-500"></i>
              {tour.duration}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to={`/tours/${tour.id}`}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center group/btn"
        >
          <i className="fas fa-eye mr-2 group-hover/btn:scale-110 transition-transform"></i>
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
