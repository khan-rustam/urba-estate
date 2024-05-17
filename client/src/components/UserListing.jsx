import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);

        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      alert('Listing deleted successfully');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }

        setUserListings(data);
        console.log(data);
      } catch (error) {
        setShowListingsError(true);
        console.log(error);
      }
    };
    handleShowListings();
  }, []);
  return (
    <section className='py-10 lg:py-20 bg-stone-100'>
      <div className='max-w-6xl py-4 mx-auto lg:py-6 md:px-6'>
        <h1 className='md:text-3xl text-3xl font-semibold border-b p-3 text-slate-700'>
          Your Listings:
        </h1>
        <p className='text-red-700 mt-5'>
          {showListingsError ? 'Error showing listings' : ''}
        </p>

        {userListings && userListings.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-20 w-20 rounded-md object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className='flex flex-col item-center'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-700 uppercase'
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-700 uppercase'>Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center pt-11'>
            <h1 className='md:text-3xl text-3xl font-semibold p-3  text-slate-700'>
              You Dont have any listing yet.
            </h1>
            <p>
              Create your first listing now?{' '}
              <Link
                to={'/create-listing'}
                className=' text-blue-500 underline uppercase text-sm cursor-pointer'
              >
                Click here
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
