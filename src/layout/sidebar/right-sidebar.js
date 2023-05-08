import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PredictionModal from "../../components/modal/predictionModal";
import {
  removeSavedResult,
  selectOutputResult,
} from "../../redux/reducer/resultSlice";
import { selectCurrentState } from "../../redux/reducer/layoutSlice";
import { RxCross2 } from "react-icons/rx";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function RightSidebar() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const currentInput = useSelector(selectCurrentState);
  const savedResult = useSelector(selectOutputResult);
  const dispatch = useDispatch();

  // Update checkbox data on change
  const handleChangeCheckBox = (e) => {
    if (e.target.checked) {
      setSelectedData((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[e.target.name] = e.target.value;
        return temp;
      });
    } else {
      setSelectedData((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        delete temp[e.target.name];
        return temp;
      });
    }
  };

  const handleChangeModalStatus = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    if (currentInput === "logic") {
      setSelectedData({});
    }
  }, [currentInput]);

  return (
    <div className="outline-1 h-fit bg-white min-h-full rounded-lg shadow-lg 2xl:p-8 p-4 ">
      <p className="text-center text-base px-6 text-[#753EFE]">
        Previously saved Predictions
      </p>
      {savedResult?.length > 0 && currentInput === "memory" && (
        <>
          <div className="my-12 flex flex-col">
            {savedResult.map((result, i) => (
              <div key={i} className="flex justify-between items-center">
                <FormControlLabel
                  label={
                    result.name?.length > 12 ? (
                      <Tooltip title={result?.name}>
                        <p className="text-gray-500">
                          {result.name?.slice(0, 12)}
                          {result.name?.length > 12 && "..."}
                        </p>
                      </Tooltip>
                    ) : (
                      <p className="text-gray-500">{result.name}</p>
                    )
                  }
                  key={i}
                  onChange={handleChangeCheckBox}
                  name={result.name}
                  value={JSON.stringify(result.data)}
                  control={
                    <Checkbox
                      icon={
                        <MdOutlineCheckBoxOutlineBlank className="text-[#F24E1E] text-2xl mb-[2px]" />
                      }
                      checkedIcon={
                        <IoMdCheckboxOutline className="text-[#F24E1E] text-2xl mb-[2px]" />
                      }
                    />
                  }
                />
                <Button
                  onClick={() => dispatch(removeSavedResult(i))}
                  className="p-1 min-w-fit m-0"
                >
                  <RxCross2 className="text-[#F24E1E] text-xl" />
                </Button>
              </div>
            ))}
          </div>

          <div className="w-full text-center">
            <Button
              className="px-6 text-center shadow-sm py-2 rounded-md
               bg-[#753EFE] text-white"
              onClick={handleChangeModalStatus}
            >
              Compare
            </Button>
          </div>
        </>
      )}

      <>
        <Modal
          open={isOpenModal && Object.keys(selectedData).length > 0}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <PredictionModal selectedData={selectedData} />
          </Box>
        </Modal>
      </>
    </div>
  );
}

export default RightSidebar;
