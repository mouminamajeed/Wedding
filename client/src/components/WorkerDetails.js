import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/WorkerProfile.css";
import profile from "../data/profile-placeholder.png";
import Header from "./Header";
import Footer from "./Footer";
import AuthContext from "../context/AuthProvider";

const WorkerProfile = () => {
  const [workerList, setWorkerList] = useState([]);
  const { category } = useParams();
  const {auth}  = useContext(AuthContext)
 
  const Handle = () => {
    alert("Hired");

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/wedease/workers/' + new URLSearchParams({ category }),
        {headers: {Authentication: `Bearer ${auth}`}})

        if (response.ok) {
          const data = await response.json();
          const workerItems = data.map((worker) => (
            <div className="worker-card" key={worker.id}>
              <Link
                to={`/workers/${category}/${worker.id}`}
                className="worker-card-link"
              
              >
                <img
                  className="worker-picture-list"
                  src={'http://localhost:8080/images/'+String(worker.imagePath).substring(8)}
                  alt="profile"
                />
                <h3>Name</h3>
                <p>{worker.name}</p>
                <h3>Email</h3>
                <p>{worker.email}</p>
                <h3>Phone Number</h3>
                <p>{worker.phoneNumber}</p>
                <h3>Bio</h3>
                <p>{worker.bio}</p>
                <h3>category</h3>
                <p>{worker.category}</p>
                <h3>DOB</h3>
                <p>{worker.DOB}</p>

              </Link>
              <Button variant="primary" size="lg" onClick={Handle} className="hire-button">
                Hire
              </Button>
            </div>

          ));

          setWorkerList(workerItems);
        } else {
          throw new Error("Error fetching worker data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
    
    <div className="back-img">
    <Header />
      <br />
      <h2 className="worker-type">{category}</h2>
      {workerList.length > 0 ? (
         <div className="worker-card-container">{workerList}</div>
      ) : (
        <p className="para">No workers found in this category.</p>
      )}
    </div>
    <Footer />
    </>
  );
};

export default WorkerProfile;
