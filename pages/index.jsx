import DialogDetail from "@/components/DialogDetail";
import { DataCase } from "@/utils/DataCase";
import { DataDoctors } from "@/utils/DataDoctors";
import { DataRoom } from "@/utils/DataRoom";
import { DataTimer } from "@/utils/DataTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const initFilter = {
    search: "",
  };

  let nowDate = new Date();

  const [dattaAll, setDataAll] = useState(DataDoctors);
  const [dataFilter, setDataFilter] = useState(DataDoctors);

  const [filter, setFilter] = useState(initFilter);

  return (
    <Box className="grid grid-cols-1 md:grid-cols-5">
      <Box className="md:col-span-2 h-[50dvh] md:h-[100dvh] p-5 overflow-hidden flex flex-col w-full gap-5">
        <Autocomplete
          size="small"
          fullWidth
          disablePortal
          options={DataDoctors.map(
            (option) => "คุณหมอ" + option.firstName + " " + option.lastName
          )}
          value={filter.search}
          onChange={(e, newValue) => {
            setFilter({
              ...filter,
              search: newValue,
            });

            if (newValue === null) {
              setDataFilter(dattaAll);
            } else {
              const dataFilter = dattaAll.filter((item) => {
                return (
                  "คุณหมอ" + item.firstName + " " + item.lastName === newValue
                );
              });
              setDataFilter(dataFilter);
            }
          }}
          name="search"
          renderInput={(params) => <TextField {...params} fullWidth />}
        />

        <Box className="h-full  flex-grow overflow-y-auto">
          {dataFilter.map((doctoritem, index) => (
            <Box key={index} className="">
              <Box className="p-3 bg-[#2F4169] rounded-md flex flex-row justify-between items-center">
                <Typography className="text-white text-[20px]">
                  คุณหมอ{doctoritem.firstName} {doctoritem.lastName}
                </Typography>

                <Avatar src={doctoritem.image} />
              </Box>
              <Box className="p-2 bg-[#9DDDCC] rounded-md">
                <Typography className="text-white text-[18px] text-center">
                  <AccessTimeIcon /> เวลาเข้างาน {doctoritem.timeStart} -{" "}
                  {doctoritem.timeEnd} น.
                </Typography>
              </Box>

              <Box>
                {DataTimer.map((timeritem, index) => (
                  <Box key={index} className="grid grid-cols-6  gap-5">
                    <Box
                      className="col-span-1 flex justify-center items-center p-2"
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#F7F7F7",
                      }}
                    >
                      <Typography>{timeritem.time}</Typography>
                    </Box>
                    <Box
                      className="col-span-5"
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#F7F7F7",
                      }}
                    >
                      {DataCase.find(
                        (itemCase) =>
                          itemCase.doctorId == doctoritem.id &&
                          (itemCase.timeStart == timeritem.time ||
                            itemCase.timeEnd == timeritem.time)
                      ) ? (
                        <DialogDetail
                          data={DataCase.find(
                            (itemCase) =>
                              itemCase.doctorId == doctoritem.id &&
                              (itemCase.timeStart == timeritem.time ||
                                itemCase.timeEnd == timeritem.time)
                          )}
                        />
                      ) : (
                        <Box className=" bg-[#F7F7F7] rounded-md"></Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="md:col-span-3  h-[50dvh] md:h-[100dvh] p-5 overflow-hidden flex flex-col w-full gap-5">
        <Box className="flex flex-row justify-between items-center">
          <Typography className="text-[#1CB99A] text-[28px] font-bold">
            วันที่ 30 มกราคม 2565
          </Typography>

          <Box>
            <Box>
              <Typography className="text-[#1CB99A] text-[20px] font-bold">
                รายได้ทั้งหมด{" "}
                {DataCase.map((item) => item.price).reduce((a, b) => a + b, 0)}{" "}
                บาท
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className=" h-full  flex-grow overflow-y-auto">
          <Box className="grid grid-cols-3 gap-3 h-full">
            {DataRoom.map((roomitem, index) => (
              <Box key={index} className=" bg-[#d5e0e9] h-full rounded-md">
                <Box className="p-3 bg-[#1CB99A]  rounded-md">
                  <Typography className="text-white text-[20px] text-center font-bold ">
                    {roomitem.name} (
                    {
                      DataCase.filter((item) => item.pocessId === roomitem.id)
                        .length
                    }
                    )
                  </Typography>
                </Box>

                <Box className="p-5">
                  {DataCase.filter((item) => item.pocessId === roomitem.id).map(
                    (caseitem, index) => (
                      <Box key={index} className="bg-white rounded-md p-2">
                        <Box className="flex flex-row items-center gap-5">
                          <Box className="bg-[#1CB99A] rounded-md p-2 w-10 h-10 flex justify-center items-center">
                            <Typography className="text-white text-[18px] font-semibold">
                              {index + 1}.
                            </Typography>
                          </Box>

                          <Box>
                            <Typography className="text-[#1F3863] text-[18px] font-semibold">
                              {caseitem.firstName} {caseitem.lastName}
                            </Typography>
                            <Typography className="text-[#1F3863] text-[18px] font-semibold">
                              640000{caseitem.id}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
