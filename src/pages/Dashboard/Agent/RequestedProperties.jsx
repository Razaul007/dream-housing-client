
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";




 

const RequestedProperties = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure(); 
    
    const {
      data: offers = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['offers'],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/offers/${user.email}`)
  
        return data
      },
    })
    console.log(offers)
    if (isLoading) return <LoadingSpinner />

    // Handle Accept Offer
    const handleAccept = async (offerId, propertyId) => {
        try {
            await axiosSecure.put(`/properties/offers/status/${offerId}`, {
                status: "accepted",
                propertyId,
            });
            toast.success("Offer accepted!");
            refetch(); // Refresh the list
        } catch (error) {
            console.error("Error accepting offer:", error);
            toast.error("Failed to accept the offer.");
        }
    };

    // Handle Reject Offer
    const handleReject = async (offerId) => {
        try {
            await axiosSecure.put(`/properties/offers/status/${offerId}`, {
                status: "rejected",
            });
            toast.success("Offer rejected!");
            refetch(); // Refresh the list
        } catch (error) {
            console.error("Error rejecting offer:", error);
            toast.error("Failed to reject the offer.");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Requested/Offered Properties
            </h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Property Title</th>
                            <th className="border border-gray-300 p-2">Location</th>
                            <th className="border border-gray-300 p-2">Buyer Email</th>
                            <th className="border border-gray-300 p-2">Buyer Name</th>
                            <th className="border border-gray-300 p-2">Offered Price</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer._id}>
                                <td className="border border-gray-300 p-2">
                                    {offer?.title}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {offer?.location}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {offer?.buyerEmail}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {offer?.buyerName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    ${offer?.offerAmount}
                                </td>
                                <td className="border border-gray-300 p-2">{offer.status}</td>
                                <td className="border border-gray-300 p-2">
                                    {offer.status === "pending" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleAccept(offer._id, offer.propertyId)
                                                }
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(offer._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedProperties;
