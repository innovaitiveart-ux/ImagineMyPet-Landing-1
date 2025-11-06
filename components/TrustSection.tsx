import React from 'react';
import { TESTIMONIALS } from '../constants';

const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Loved by Pet Parents Like You</h2>
           <p className="mt-4 text-lg text-stone-600">
            Loved by pet owners who’ve turned their favorite photos into custom art.
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold text-stone-700">
                ⭐⭐⭐⭐⭐ “Rated 5/5 by happy pet parents.”
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-stone-50 p-8 rounded-2xl shadow-sm">
              <p className="text-stone-600 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center space-x-4">
                <img className="w-14 h-14 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <p className="font-bold text-stone-800">{testimonial.name}</p>
                  <p className="text-sm text-stone-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-teal-50 border-t-4 border-teal-500 p-8 rounded-b-xl text-center">
            <h3 className="text-2xl font-bold text-teal-900">Our 100% Happiness Guarantee</h3>
            <p className="mt-2 text-teal-800">
                We stand by our work and we want you to feel confident. If you're not absolutely in love with your pet's portrait, you pay nothing. Plus, every order is backed by secure checkout and friendly support from our pet-loving team.
            </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;