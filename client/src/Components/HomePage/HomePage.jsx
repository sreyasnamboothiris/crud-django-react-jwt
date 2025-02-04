import React, { useEffect } from 'react';
import './homepage.css'; // Ensure this path is correct based on your project structure
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, logedOut } from '../../Redux/authSlice';



function HomePage() {
    
    const user = useSelector((state)=>{
        return state.user.user
    })
    
    
    
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#3C0B63] via-[#814EC3] to-[#150D1C] text-white"> {/* Updated gradient for a darker bottom */}
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 animate-fadeIn" style={{ color: '#FFFFFF' }}> {/* Set to white for contrast */}
                    Hello, {user? user.username:''}
                </h1>
                <p className="text-xl animate-fadeIn delay-200" style={{ color: '#FFFFFF' }}> {/* Set to white for contrast */}
                    Welcome to your space.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
