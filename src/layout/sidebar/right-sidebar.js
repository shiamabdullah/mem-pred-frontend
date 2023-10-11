import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Modal,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineFileDownload,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PredictionModal from "../../components/modal/predictionModal";
import {
  removeSavedMultipleResults,
  removeSavedResult,
  selectMultipleSavedResult,
  selectSavedResult,
} from "../../redux/reducer/resultSlice";

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
  const [selectedDataMultiple, setSelectedDataMultiple] = useState({});
  const savedResult = useSelector(selectSavedResult);
  const savedMultipleResult = useSelector(selectMultipleSavedResult) || [];
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const csvHeaders = [
    {
      label: "Vendor",
      key: "Vendor",
    },
    {
      label: "Tech",
      key: "Tech",
    },
    {
      label: "Mem_Type",
      key: "Mem_Type",
    },
    {
      label: "Port",
      key: "Port",
    },
    {
      label: "HD_or_HS",
      key: "HD_or_HS",
    },
    {
      label: "Vt_Type",
      key: "Vt_Type",
    },
    {
      label: "Words",
      key: "Words",
    },
    {
      label: "Bits",
      key: "Bits",
    },
    {
      label: "Mux",
      key: "Mux",
    },
    {
      label: "Banks",
      key: "Banks",
    },
    {
      label: "Area_umA2",
      key: "Area_umA2",
    },
    {
      label: "read_power_pj_ffg",
      key: "read_power_pj_ffg",
    },
    {
      label: "read_power_pj_ssg",
      key: "read_power_pj_ssg",
    },
    {
      label: "read_power_pj_tt",
      key: "read_power_pj_tt",
    },
    {
      label: "tacc_ns_ffg",
      key: "tacc_ns_ffg",
    },
    {
      label: "tacc_ns_ssg",
      key: "tacc_ns_ssg",
    },
    {
      label: "tacc_ns_tt",
      key: "tacc_ns_tt",
    },
    {
      label: "tcycle_ns_ffg",
      key: "tcycle_ns_ffg",
    },
    {
      label: "tcycle_ns_ssg",
      key: "tcycle_ns_ssg",
    },
    {
      label: "tcycle_ns_tt",
      key: "tcycle_ns_tt",
    },
    {
      label: "thold_ns_ffg",
      key: "thold_ns_ffg",
    },
    {
      label: "thold_ns_ssg",
      key: "thold_ns_ssg",
    },
    {
      label: "thold_ns_tt",
      key: "thold_ns_tt",
    },
    {
      label: "tsetup_ns_ffg",
      key: "tsetup_ns_ffg",
    },
    {
      label: "tsetup_ns_ssg",
      key: "tsetup_ns_ssg",
    },
    {
      label: "tsetup_ns_tt",
      key: "tsetup_ns_tt",
    },
    {
      label: "write_power_pj_ffg",
      key: "write_power_pj_ffg",
    },
    {
      label: "write_power_pj_ssg",
      key: "write_power_pj_ssg",
    },
    {
      label: "write_power_pj_tt",
      key: "write_power_pj_tt",
    },
    {
      label: "leakage_power_mw_ffg",
      key: "leakage_power_mw_ffg",
    },
    {
      label: "leakage_power_mw_ssg",
      key: "leakage_power_mw_ssg",
    },
    {
      label: "leakage_power_mw_tt",
      key: "leakage_power_mw_tt",
    },
  ];

  const csvHeadersFor22fdx = [
    {
      label: "Vendor",
      key: "Vendor",
    },
    {
      label: "Tech",
      key: "Tech",
    },
    {
      label: "Mem_Type",
      key: "Mem_Type",
    },
    {
      label: "Port",
      key: "Port",
    },
    {
      label: "HD_or_HS",
      key: "HD_or_HS",
    },
    {
      label: "Vt_Type",
      key: "Vt_Type",
    },
    {
      label: "Words",
      key: "Words",
    },
    {
      label: "Bits",
      key: "Bits",
    },
    {
      label: "Mux",
      key: "Mux",
    },
    {
      label: "Banks",
      key: "Banks",
    },
    {
      label: "Area_um2",
      key: "Area_um2",
    },
    {
      label: "read_power_uWperMHz_ffg",
      key: "read_power_uWperMHz_ffg",
    },
    {
      label: "read_power_uWperMHz_ssg",
      key: "read_power_uWperMHz_ssg",
    },
    {
      label: "read_power_uWperMHz_tt",
      key: "read_power_uWperMHz_tt",
    },
    {
      label: "tacc_ns_ffg",
      key: "tacc_ns_ffg",
    },
    {
      label: "tacc_ns_ssg",
      key: "tacc_ns_ssg",
    },
    {
      label: "tacc_ns_tt",
      key: "tacc_ns_tt",
    },
    {
      label: "tcycle_ns_ffg",
      key: "tcycle_ns_ffg",
    },
    {
      label: "tcycle_ns_ssg",
      key: "tcycle_ns_ssg",
    },
    {
      label: "tcycle_ns_tt",
      key: "tcycle_ns_tt",
    },
    {
      label: "thold_ns_ffg",
      key: "thold_ns_ffg",
    },
    {
      label: "thold_ns_ssg",
      key: "thold_ns_ssg",
    },
    {
      label: "thold_ns_tt",
      key: "thold_ns_tt",
    },
    {
      label: "tsetup_ns_ffg",
      key: "tsetup_ns_ffg",
    },
    {
      label: "tsetup_ns_ssg",
      key: "tsetup_ns_ssg",
    },
    {
      label: "tsetup_ns_tt",
      key: "tsetup_ns_tt",
    },
    {
      label: "write_power_uWperMHz_ffg",
      key: "write_power_uWperMHz_ffg",
    },
    {
      label: "write_power_uWperMHz_ssg",
      key: "write_power_uWperMHz_ssg",
    },
    {
      label: "write_power_uWperMHz_tt",
      key: "write_power_uWperMHz_tt",
    },
    {
      label: "leakage_power_uw_ffg",
      key: "leakage_power_uw_ffg",
    },
    {
      label: "leakage_power_uw_ssg",
      key: "leakage_power_uw_ssg",
    },
    {
      label: "leakage_power_uw_tt",
      key: "leakage_power_uw_tt",
    },
  ];

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

  // Update checkbox data on change
  const handleChangeCheckBoxMultiple = (e) => {
    if (e.target.checked) {
      setSelectedDataMultiple((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[e.target.name] = e.target.value;
        return temp;
      });
    } else {
      setSelectedDataMultiple((prev) => {
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
    console.log("result___________", savedMultipleResult);
    if (pathname === "/logic") {
      setSelectedData({});
      setSelectedDataMultiple({});
    }
  }, [pathname]);

  return (
    <div className="outline-1 h-fit bg-white min-h-full rounded-lg shadow-lg 2xl:p-8 p-4 ">
      <p className="text-center text-base px-6 text-[#753EFE]">
        Previously saved Predictions
      </p>
      {(savedResult?.length > 0 || savedMultipleResult?.length > 0) &&
        pathname === "/ez-gf-internal/jigyasa/" && (
          <>
            <div className="my-12 flex flex-col">
              {savedResult.length > 0 && (
                <Divider>
                  <Chip label="Specific" />
                </Divider>
              )}
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
              <div className="w-full flex justify-center my-5 items-center">
                <Button
                  className="px-2 text-center shadow-sm py-2"
                  color="secondary"
                  variant="contained"
                  onClick={handleChangeModalStatus}
                  disabled={
                    Object.keys(selectedDataMultiple).length > 0 ||
                    Object.keys(selectedData).length < 2
                  }
                >
                  Compare
                </Button>
                {/* <Button
              className="px-2 text-center shadow-sm py-2"
              color="secondary"
              variant="contained"
              disabled={Object.keys(selectedDataMultiple).length === 0}
            >Download</Button> */}
              </div>
              {savedMultipleResult.length > 0 && (
                <Divider>
                  <Chip label="Range" />
                </Divider>
              )}
              {savedMultipleResult.map((result, i) => (
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
                    onChange={handleChangeCheckBoxMultiple}
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
                  <Tooltip title="Download CSV" placement="top">
                    <Button className="p-0 min-w-fit">
                      {console.log("_________________________", result)}
                      <CSVLink
                        data={result?.data}
                        headers={
                          result?.data[0].Tech === "22FDX"
                            ? csvHeadersFor22fdx
                            : csvHeaders
                        }
                        filename={result?.name + ".csv"}
                        className={`inline-flex items-center`}
                      >
                        <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
                      </CSVLink>
                    </Button>
                  </Tooltip>
                  <Button
                    onClick={() => dispatch(removeSavedMultipleResults(i))}
                    className="p-1 min-w-fit m-0"
                  >
                    <RxCross2 className="text-[#F24E1E] text-xl" />
                  </Button>
                </div>
              ))}
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
