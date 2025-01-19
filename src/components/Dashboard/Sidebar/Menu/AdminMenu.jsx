import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdOutlineRateReview } from 'react-icons/md'
import { FaHouse } from 'react-icons/fa6'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaHouse} label='Manage Properties' address='manage-properties' />
      <MenuItem icon={MdOutlineRateReview} label='Manage reviews' address='Manage-reviews' />
    </>
  )
}

export default AdminMenu