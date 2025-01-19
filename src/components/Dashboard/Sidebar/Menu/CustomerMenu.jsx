import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useState } from 'react'
import MenuItem from './MenuItem'
import { FaHouse } from 'react-icons/fa6'
import { MdOutlineRateReview } from 'react-icons/md'
// import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Wishlist' address='my-wishlist' />
      <MenuItem icon={FaHouse} label='Property bought' address='Property-bought' />
      <MenuItem icon={MdOutlineRateReview} label='My reviews' address='my-reviews' />

      <div
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become An Agent</span>
      </div>

      {/* <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} /> */}
    </>
  )
}

export default CustomerMenu