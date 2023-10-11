// @flow strict
import { Button } from "@mui/material";
import cn from "classnames";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function LeftSidebar() {
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === "/ez-gf-internal/jigyasa/") {
      document.title = "Memory Prediction";
    } else {
      document.title = "Logic Prediction";
    }
  }, [pathname]);

  return (
    <div
      className="outline-1 bg-white h-full rounded-lg 
    shadow-lg 2xl:p-5 p-2 pt-4 2xl:pt-8 flex flex-col items-start gap-4"
    >
      <Link to="/ez-gf-internal/jigyasa/">
        <Button
          className={cn(
            "text-[#84828A] text-left w-full font-medium py-2 rounded-lg px-6",
            pathname === "/" ? "bg-violet-100 text-violet-600" : ""
          )}
        >
          Memory Prediction
        </Button>
      </Link>
      <Link to="/ez-gf-internal/jigyasa/logic">
        <Button
          className={cn(
            `text-[#84828A] text-left w-full font-medium py-2 rounded-lg px-6 ${
              pathname === "/logic" && "bg-violet-100 text-violet-600"
            }`
          )}
        >
          Logic Prediction
        </Button>
      </Link>
    </div>
  );
}

export default LeftSidebar;
