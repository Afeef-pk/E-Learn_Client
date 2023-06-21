import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { getcouponData } from "../../../Services/adminApi";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Coupon() {
  const [couponData, setCouponData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getcouponData(page).then(({ data }) => {
      setCouponData(data.coupons);
    });
  }, []);

  console.log(couponData);
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Coupons
        </h1>

        <div className="bg-[#1F2A40] m-10 rounded-lg h-screen pt-10">
          <Card className="mt-6 w-96">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                UI/UX Review Check
              </Typography>
              <Typography>
                The place is close to Barceloneta Beach and bus stop just 2 min
                by walk and near to &quot;Naviglio&quot; where you can enjoy the
                main night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Coupon;
