import { DataDoctors } from "@/utils/DataDoctors";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EditIcon from "@mui/icons-material/Edit";
import Excel from "exceljs";
import { saveAs } from "file-saver";
export default function DialogDetail({ data }) {
  const [caseData, setCaseData] = useState(data);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const printExcel = () => {
    const workbook = new Excel.Workbook();
    workbook.creator =
      "640000" +
      caseData.id +
      "_" +
      caseData.firstName +
      "_" +
      caseData.lastName;
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
      { header: "ชื่อ", key: "firstName", width: 20 },
      { header: "นามสกุล", key: "lastName", width: 20 },
      { header: "เวลาเริ่ม", key: "timeStart", width: 20 },
      { header: "เวลาสิ้นสุด", key: "timeEnd", width: 20 },
      { header: "บริการ", key: "service", width: 20 },
      { header: "เบอร์โทร", key: "phoneNo", width: 20 },
      { header: "ราคา", key: "price", width: 20 },
    ];

    worksheet.addRow({
      firstName: caseData.firstName,
      lastName: caseData.lastName,
      timeStart: caseData.timeStart,
      timeEnd: caseData.timeEnd,
      service: caseData.service,
      phoneNo: caseData.phoneNo,
      price: caseData.price,
    });
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(
        blob,
        "640000" +
          caseData.id +
          "_" +
          caseData.firstName +
          "_" +
          caseData.lastName +
          ".xlsx"
      );

      //window print
    });
  };
  const printPDF = () => {
    const doc = new jsPDF();
    doc.text(
      `ชื่อ: ${caseData.firstName} ${caseData.lastName} \n
          เวลาเริ่ม: ${caseData.timeStart} \n
          เวลาสิ้นสุด: ${caseData.timeEnd} \n
          บริการ: ${caseData.service} \n
          เบอร์โทร: ${caseData.phoneNo} \n
          ราคา: ${caseData.price} บาท \n
          `,
      10,
      10
    );
    doc.save("report.pdf");
  };
  const printWord = () => {
    const doc = new docx.Document();
    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: `ชื่อ: ${caseData.firstName} ${caseData.lastName} \n
                  เวลาเริ่ม: ${caseData.timeStart} \n
                  เวลาสิ้นสุด: ${caseData.timeEnd} \n
                  บริการ: ${caseData.service} \n
                  เบอร์โทร: ${caseData.phoneNo} \n
                  ราคา: ${caseData.price} บาท \n
                  `,
            }),
          ],
        }),
      ],
    });
    docx.Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "report.docx");
    });
  };
  const printText = () => {
    const text = `ชื่อ: ${caseData.firstName} ${caseData.lastName} \n
        เวลาเริ่ม: ${caseData.timeStart} \n
        เวลาสิ้นสุด: ${caseData.timeEnd} \n
        บริการ: ${caseData.service} \n
        เบอร์โทร: ${caseData.phoneNo} \n
        ราคา: ${caseData.price} บาท \n
        `;
    const blob = new Blob([text], {
      type: "text/plain",
    });
    saveAs(blob, "report.txt");
  };
  const printJson = () => {
    const text = JSON.stringify(caseData, null, 2);
    const blob = new Blob([text], {
      type: "application/json",
    });
    saveAs(blob, "report.json");
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        className="p-2 bg-[#FE9902]   h-full w-fit rounded-none"
      >
        <Box className="flex flex-wrap gap-3 cursor-pointer items-center">
          <Typography className="text-black text-[14px] ">
            {caseData.firstName} {caseData.lastName}
          </Typography> | 
          <Typography className="text-black text-[14px] ">
            {caseData.service}
          </Typography> |
          <Typography className="text-black text-[14px] ">
            640000{caseData.id}
          </Typography> |
          <Typography className="text-black text-[14px] ">
            {caseData.phoneNo}
          </Typography>
        </Box>
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <Box className="flex flex-col p-3 gap-5">
          <Box className="flex flex-row justify-between items-center">
            <Box>
              <Typography className="text-[#1CB99A] text-[20px] font-bold">
                นัดหมาย
              </Typography>
              <Typography className="text-[#1CB99A] text-[20px] font-bold">
                ทันตแพทย์ คุณหมอ
                {
                  DataDoctors.find((item) => item.id === caseData.doctorId)
                    .firstName
                }{" "}
                {
                  DataDoctors.find((item) => item.id === caseData.doctorId)
                    .lastName
                }
              </Typography>
            </Box>
            <Avatar
              src={
                DataDoctors.find((item) => item.id === caseData.doctorId).image
              }
              className="h-16 w-16"
            />
          </Box>
          <Box className="pl-3">
            <Typography className="text-black text-[18px] ">
              <PersonIcon className="text-[#1CB99A]" /> {caseData.firstName}{" "}
              {caseData.lastName}
            </Typography>
            <Typography className="text-black text-[18px] ">
              <ArticleIcon className="text-[#1CB99A]" /> {caseData.service}
            </Typography>
            <Typography className="text-black text-[18px] ">
              <LocalPhoneIcon className="text-[#1CB99A]" /> {caseData.phoneNo}
            </Typography>
            <Typography className="text-black text-[18px] ">
              <LocalPhoneIcon className="text-[#1CB99A]" /> {caseData.phoneNo}
            </Typography>
            <Typography className="text-black text-[18px] ">
              ประะเมิาค่าใช้จ่าย {caseData.price} บาท
            </Typography>

            <Typography className="text-black text-[18px] ">
              <AccessTimeFilledIcon className="text-[#1CB99A]" />
              {caseData.timeStart} - {caseData.timeEnd}
            </Typography>
          </Box>

          <Box className="flex flex-row justify-center items-center gap-2">
            <IconButton
              className="bg-[#1CB99A] text-white"
              onClick={printExcel}
            >
              <LocalPrintshopIcon />
            </IconButton>
            <IconButton className="bg-[#1CB99A] text-white">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
