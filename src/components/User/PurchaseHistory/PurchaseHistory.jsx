import React, { useEffect, useRef, useState } from "react";
import { getPurchaseHistory } from "../../../Services/userApi";
import { Card, Typography, Button } from "@material-tailwind/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";


import Header from "./Invoice/Header";
import MainDetails from "./Invoice/MainDetails";
import ClientDetails from "./Invoice/ClientDetails";
import Dates from "./Invoice/Dates";
import Table from "./Invoice/Table";
import Notes from "./Invoice/Notes";
import Footer from "./Invoice/Footer";

function PurchaseHistory() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const componentRef = useRef()
  const TABLE_HEAD = ["", "Course", "Date", "Total price", ""];

  useEffect(() => {
    getPurchaseHistory().then(({ data }) => {
      setPurchasedCourses(data.orders);
    });
  }, []);

  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl w-full  font-semibold font-sans">
        Purchase History
      </h1>
      <div className=" h-full w-full my-5">
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchasedCourses.map((order, index) => {
                const isLast = index === purchasedCourses.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const formattedDate = dateFormat(
                  new Date(order.purchaseDate),
                  "mmmm dd, yyyy"
                );
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        <AiOutlineShoppingCart size={20} />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/course/view/${order.course._id}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[#9430d7] cursor-pointer">
                          {order.course.name}
                        </Typography>
                      </Link>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {formattedDate}
                        {/* May-25 2022 */}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue"
                        className="font-medium">
                        {order.total}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue"
                        className="font-medium">
                        <div className="grid grid-cols-2 gap-7">
                          <Button className="border " variant="outlined">
                            Reciept
                          </Button>
                          <Button variant="outlined">Invoice</Button>
                        </div>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          {/* <ReactToPrint
            trigger={() => (
            )}
            content={() => componentRef.current}
          /> */}
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Dates />

            <Table />

            <Notes />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseHistory;
