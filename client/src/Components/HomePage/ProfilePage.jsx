import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { submitBtn } from '../Button/buttons';
function ProfilePage() {
  const { control, handleSubmit, formState:{errors}} = useForm();
  const formHandle = ()=>{
    console.log('form submitted');
  }
  return (
    <div className='flex items-center bg-[#3C0B63] text-white flex-col p-4'>
      <div className='border-2 p-2 px-4 font-bold text-2xl m-3 rounded border-black'>
        <h1>Profile Page</h1>
      </div>
      <div>
        
        <form onSubmit={handleSubmit(formHandle)}>
        <div className='flex items-center justify-center flex-col p-3'>
        <div className='relative w-32 bg-black h-32 rounded overflow-hidden'>
        <img
            src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUBAv/EADgQAAICAQIDBQUFBwUAAAAAAAABAgMEBREGMVESIUFxgWGRscHREyJSYqEUJCUyosLhFSNCQ3P/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSytW07Ee2Rl1Rl07W79yCt0HOp13Sr5KMM2rtP8TcfidCLUoqUWnF8mnvuB6AAgAAAAAAAAAAAAAAAAAAB8W2wpqlbbKMIQW8pS5JH2Q3jTU3O+On0z2rhtK1rxb5L0Xf6gamt8SX58pVYspU4v5e6U/P6HBALiB0NK1jM0uxOixyr/wCVUnvF/Q54BFn6XqVGp4qvo8pQfOL6M3Ct+H9SlpmoQsbf2M2o2x8NuvpzLHTTW6e66oivQAAAAAAAAAAAAAAAAAA327yqsvIllZV2RJ7uybl7y05reua6xZUy7kkAABpAACkCyuHsiWVouJZJ7y7HZfo2vkVqWFwimtAo38ZTf9TMq7IAAAAAAAAAAAAAAAAAAIq3U8d4uoZFDW3YsaXlv3foy0iI8a6XJuOo0x3W3ZuXwl8mBEgNmDSAAIoWdomO8XScWmXdKNa3833v4kI4a0uWo6hBzj+71PtWPr0j6lieiIAAAAAAAAAAAAAAAAAAAHkkpRcWk0+5p8megCK6pwjGybs0yyNe/f8AY2fyryfgcK7h7Vqm08Ocl1g1JMsZvZbvka88/Dre1mXRH2OxBVfQ0LVJvZYN3qkvidXT+EMmyUZZ9sKa/wAMH2pP5IlcNSwJvaOZj7/+iNmE42LeuSktucWmEYcPEowseNGNWoVR8F49W+rM4AAAAAAAAAAAAAAAAAAA5muaxTpNG8vv3zT+zq6+1+wDbzczHwqXblWquC6835LxIpqPF91m8dOrVcfx2LeT8lyRH87NyM+93ZdjnN8l4RXRLwNcDYys7Ly5drJyLbX0lPu93I1wC4gZKrrqJKVFs65LxjJr4GMDB39P4qz8ZqOS1k1/m7pe/wCpK9K1nD1SP7vY42bfeqn3SX1K1PqucqrIzqk4Tj3qUXs0wsWyCOcOcRrNccTOko5PKFnJWeftJGQAAAAAAAAAAAAAGpqedVp2FZk3bNRXdH8TfJFbZuXdnZM8nIl2pzfol4Jew7PGOovJ1H9lrf8AtY3c9n/NPxf67EfAAAqAAKAAAAAD1NppptNd6a8Cf8L6x/qeK672v2mlLt/nXhL6lfm3pedPTs6rKhyi/vLrHxRFWgD5hONkIzg94SScX7HyPogAAAAAAAAGDNyFi4d+RLlVBy93+TOcXi+11aDcl/2ThDf2b7/ICv5zlOUpze8pPds8ALEAAUAAAAAAAAAARU/4PynkaPCuT3lRJwflzXxO4Q7gK1/bZtPg4RmvRtfNExIAAAAAAAABHuOH/CK11vj8GABBQAWMgAKoAAAAAAAAAAJHwK/4reutH9yJwARYAAgAAD//2Q=='
            alt="Selected"
            className="w-full h-full object-cover"
          />
        <span
        
        className="absolute bottom-2 right-2  cursor-pointer text-white"
      >
        <i class="fa-solid fa-pen-to-square"></i>
      </span>
                
            </div>
            <div>
            <input type="file" className='hidden' />
            </div>
            
            <div className='flex flex-col'> 
              <div className='flex flex-col p-2  m-1'>
              <label htmlFor="">Edit User name</label>
              <input type="text"  className='bg-[#A388EF] rounded'/>
              </div>
              <div className="flex flex-col p-2 m-1">
              <label htmlFor="email">Edit Email</label>
              <input type="email" className='bg-[#A388EF] rounded' />
              </div>
              <div className="flex flex-col p-2 m-1">
              <label htmlFor="password">Edit Password(old password)</label>
              <input type="password" className='bg-[#A388EF] rounded' />
              </div>
              <div className="flex flex-col p-2 m-1">
              <label htmlFor="password">New password</label>
              <input type="password" className='bg-[#A388EF] rounded' />
              </div>
              
              
              <button type='submit' className={`hover:bg-black mt-3d ${submitBtn}`}>Submit</button>

            </div>
            </div>
        </form>
        
        
      </div>
    </div>
  )
}

export default ProfilePage
