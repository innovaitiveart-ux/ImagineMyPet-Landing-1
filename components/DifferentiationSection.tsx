import React from 'react';
import type { UspItem } from '../types';
import { USP_ITEMS } from '../constants';


const UspCard: React.FC<{ item: UspItem }> = ({ item }) => (
    <div className="flex items-start space-x-5 p-4">
        <div className="flex-shrink-0 w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
            <item.icon className="w-7 h-7" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-stone-800">{item.title}</h3>
            <p className="mt-1 text-stone-600">{item.description}</p>
        </div>
    </div>
);


const DifferentiationSection: React.FC = () => {
    return (
        <section className="py-20 bg-amber-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">What Makes ImagineMyPet Different?</h2>
                    <p className="mt-4 text-lg text-stone-600">
                        When it comes to turning your pet's photo into art, we know you have options. Here's why ImagineMyPet stands in a class of its own.
                    </p>
                </div>

                <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {USP_ITEMS.map((item, index) => (
                        <UspCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DifferentiationSection;
