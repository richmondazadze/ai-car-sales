interface Car {
    id: number
    name: string
    price: string
  }
  
  interface CarItemProps {
    car: Car
    onSelect: () => void
  }
  
  export default function CarItem({ car, onSelect }: CarItemProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
        <p className="text-gray-600 mb-4">Price: {car.price}</p>
        <button
          onClick={onSelect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Select
        </button>
      </div>
    )
  }