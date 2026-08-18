
import React, { useEffect, useState } from "react";
import API from "../api";

function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend se protected orders fetch kar rahe hain
    API.get("/allOrders")
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

 
 return (
    <div className="container my-5">
      <h3 className="mb-4">Your Orders ({allOrders.length})</h3>
      <table className="table border align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((stock, index) => (
            <tr key={index}>
              <td>
                <strong>{stock.name}</strong>
              </td>
              <td>{stock.qty}</td>
              <td>₹{stock.price}</td>
              <td>
                <span
                  className={`badge ${
                    stock.mode === "BUY" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {stock.mode}
                </span>
              </td>
                
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;