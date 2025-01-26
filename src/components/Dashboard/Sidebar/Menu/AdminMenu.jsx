import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdOutlineRateReview } from 'react-icons/md'
import { FaHouse } from 'react-icons/fa6'
import { BsGraphUp } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <div className='w-1/4 lg:w-full'>
      
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaHouse} label='Manage Properties' address='manage-properties' />
      <MenuItem icon={MdOutlineRateReview} label='Manage reviews' address='Manage-reviews' />
      
    </div>
  )
}

export default AdminMenu