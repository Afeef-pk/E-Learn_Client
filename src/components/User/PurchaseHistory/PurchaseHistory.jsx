import React, { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../../Services/userApi";
import { Card, Typography,Button } from "@material-tailwind/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Link} from 'react-router-dom'

function PurchaseHistory() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

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
                const dateString = order.purchaseDate
                const date = new Date(dateString);

                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
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
                        className="font-normal text-[#9430d7] cursor-pointer" >
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
                          <Button className="border " variant="outlined" >Reciept</Button>
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
      </div>
    </div>
  );
}

export default PurchaseHistory;
