import React from 'react'
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

export default function Account() {

  const deleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in.");
      return;
    }
    const provider = new GoogleAuthProvider();
    await reauthenticateWithPopup(user, provider);
    alert("Reauthenticated successfully.");
    await deleteUser(user);
    window.location.href = '/';
    alert("Account deleted successfully.");
  };
  return (
    <div className='flex items-center flex-col pb-2 gap-1 p-1 h-[100vh]'>

      <div className="px-0 py-3 w-full h-[16vh] bg-gray-400 flex rounded flex-col items-center ">
        <div className='mb-2 -2 flex flex-col gap-2 rounded-md w-full'>
          {/* <h1 className="text-sm font-bold text-center  w-full">Vehicle Provider Dashboard</h1> */}
          <div className='w-full flex justify-around items-center '>
            <img className='rounded-[50%] h-20' src={auth.currentUser.photoURL} alt="" />
            <div className=''>
              <h3 className='text-md'>{auth.currentUser.displayName}</h3>
            </div>
          </div>
        </div>
      </div>


      <div className='bg-red-500 h-[77vh] w-full rounded'>

      </div>
 
      {auth?.currentUser?.displayName && (
        <button
          onClick={deleteAccount}
          className="w-full h-[7vh] bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      )}

    </div>
  )
}
