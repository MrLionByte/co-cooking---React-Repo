import {toast} from "react-hot-toast";

export default function MealPlan() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Meal Plan</h1>
        <p className="mt-2 text-lg text-gray-600">Plan your meals for the week.</p>
        <div className="mt-10">
          <button
            onClick={() => toast.success("This is a meal plan notification!")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Show Meal Plan Notification
          </button>
        </div>
      </div>
    </div>
  );
}
