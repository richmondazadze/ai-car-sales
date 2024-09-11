import { useState } from "react";

const cars = [
  { id: 1, name: "Sedan Model X", price: "$30,000" },
  { id: 2, name: "SUV Model Y", price: "$45,000" },
  { id: 3, name: "Sports Car Z", price: "$60,000" },
];

interface CarListProps {
  onSelectCar: (carId: number) => void; // Define the type of onSelectCar
}

export default function CarList({ onSelectCar }: CarListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="border p-4 rounded">
          <h2 className="text-xl font-bold">{car.name}</h2>
          <p>Price: {car.price}</p>
          <button
            onClick={() => onSelectCar(car.id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
}
