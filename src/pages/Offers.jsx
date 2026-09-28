function Offers() {

  const offers = [
    {
      id: 1,
      title: "Student Discount",
      discount: "20% OFF",
      description: "Students can enjoy 20% discount on selected trains."
    },
    {
      id: 2,
      title: "Festival Special",
      discount: "15% OFF",
      description: "Book tickets during festivals and save more."
    },
    {
      id: 3,
      title: "UPI Cashback",
      discount: "₹100 Cashback",
      description: "Pay using UPI and get instant cashback."
    },
    {
      id: 4,
      title: "Family Package",
      discount: "25% OFF",
      description: "Book 4 or more tickets and receive a family discount."
    }
  ];

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        🎁 Latest Offers
      </h2>

      <div className="row">

        {offers.map((offer) => (

          <div className="col-md-6 mb-4" key={offer.id}>

            <div className="card shadow h-100">

              <div className="card-body">

                <h3 className="text-primary">
                  {offer.title}
                </h3>

                <h4 className="text-success">
                  {offer.discount}
                </h4>

                <p>
                  {offer.description}
                </p>

                <button className="btn btn-warning">
                  Claim Offer
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Offers;