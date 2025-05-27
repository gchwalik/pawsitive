import Header from './Header';
import PlaceForm from './PlaceForm';


function CreatePlace() {
  return (
    <>
        <Header />
        {/* Main Content */}
        <div className="flex justify-center">
            {/* Form */}
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-5 bg-fuchsia-50 pt-1 rounded-lg p-5 pb-3">
                <h2 className="text-center text-xl font-medium p-2">Create Place</h2>
                <PlaceForm />
            </div>
        </div>
    </>
  );
}

export default CreatePlace;
