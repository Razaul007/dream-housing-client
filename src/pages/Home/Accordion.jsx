

const Accordion = () => {
    return (
        <div className="flex flex-col gap-2 w-full lg:w-1/2 mx-auto">
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">How can I find my dream home on DreamHouzing?</div>
                <div className="collapse-content">
                    <p>At DreamHouzing, you can easily browse through a wide range of properties using our advanced search filters. You can search by location, price range, property type, and more to find a home that fits your needs. Each listing includes detailed descriptions, photos, and contact information for further assistance.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Is the information about the properties accurate and up-to-date?</div>
                <div className="collapse-content">
                    <p>Yes, we ensure that all property details on DreamHouzing are accurate and regularly updated. Our team works closely with property owners and agents to provide the most reliable information. If you have any questions about a specific property, feel free to contact us directly.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Does DreamHouzing help with buying, renting, or selling properties?</div>
                <div className="collapse-content">
                    <p>Absolutely! DreamHouzing is your one-stop platform for buying, renting, or selling properties. Whether you're a buyer, renter, or seller, we offer tools and resources to make the process smooth and hassle-free. You can connect with property owners, schedule viewings, and even list your property on our platform.</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;