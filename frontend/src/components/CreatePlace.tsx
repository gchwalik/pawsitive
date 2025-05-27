import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Header from './Header';

function CreatePlace() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Creating place:', name);
    // After successful creation, navigate back
    navigate('/');
  };

  return (
    <>
        <Header />
        {/* Main Content */}
        <div className="flex justify-center">

            {/* Form */}
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-5 bg-fuchsia-50 pt-1 rounded-lg p-5 pb-3">
                <h2 className="text-center text-xl font-medium p-2">Create Place</h2>
                <form action="/places" method="post" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 mb-4">
                    <label className="w-10 text-right">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 my-2 p-1 border border-neutral-500 rounded-lg focus:ring focus:ring-indigo-800"
                        required
                    />
                    </div>
                <div className="flex justify-center items-center gap-4">
                    <button type="submit" className="w-24 rounded-lg  text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-2 font-medium">
                        Submit
                    </button>
                    <a href="/" className="w-24 rounded-lg text-center text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-2 font-medium">Cancel</a>
                </div>
                </form>
            </div>
        </div>
    </>
  );
}

export default CreatePlace;
