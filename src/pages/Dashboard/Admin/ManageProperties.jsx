import { useQuery} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyDataRow from "../../../components/Dashboard/TableRows/PropertyDataRow";


const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();
    

    // Fetch properties
    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/properties");
            return data;
        },
    });
    console.log(properties)

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="lg:max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Properties</h2>
            <table className="table-auto lg:w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Location</th>
                        <th className="px-4 py-2 border">Agent Name</th>
                        <th className="px-4 py-2 border">Agent Email</th>
                        <th className="px-4 py-2 border">Price Range</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {properties.map(property => (
                                       <PropertyDataRow
                                         refetch={refetch}
                                         key={property?._id}
                                         property={property}
                                       />
                                     ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;
