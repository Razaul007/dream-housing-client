import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ property }) => {
  const { title, location, minPrice, maxPrice, 
    verificationStatus, agent, imageURL, _id } = property || {}

  
  return (
    <Link
      to={`/property/${_id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={imageURL}
            alt='Property Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='text-xl font-bold'>{title}</div>
        <div className='font-semibold text-lg'>{location}</div>
        <div className='font-semibold'>Min Price: {minPrice}$</div>
        <div className='font-semibold'>Max Price: {maxPrice}$</div>
        <div className='font-semibold'>Agent: {agent.name}</div>
        {/* <div className='font-semibold'>Agent: {agent.image}</div> */}
        <div className='font-semibold'>Status: {verificationStatus}</div>
        <div >
         
         <button 
            // onClick={() => handleViewDetails(_id)}

           className='bg-cyan-600 text-center p-2 rounded-lg' type="button" >View Details</button>
         
        </div>
      </div>
    </Link>
  )
}
Card.propTypes = {
  property: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    verificationStatus: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    imageURL: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
}
export default Card