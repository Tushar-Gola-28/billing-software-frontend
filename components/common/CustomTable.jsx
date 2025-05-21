/* eslint-disable react/prop-types */
"use client"
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Empty from "../../assets/no-data/empty.svg"


const ScrollBarDesign = {

  '&::-webkit-scrollbar-thumb': {
    background: '#BFD6F8',
    borderRadius: '10px'
  },
  '&::-webkit-scrollbar': {
    // background: "#BFD6F8",
    width: { xs: '6px', md: '8px' },
    height: '10px'
    // display:{xs:"none",sm:"block"}
  },
  '&::-webkit-scrollbar-track': {
    WebkitBoxShadow: '#BFD6F8'
  },
  '&:hover::-webkit-scrollbar-thumb': {
    background: '#BFD6F8'
  },
  '&::-webkit-scrollbar-button:single-button': {
    background: '#BFD6F8',
    display: 'block',
    height: '8px',
    width: '8px',
    borderRadius: '4px'
  },
  "&::-webkit-scrollbar-button:single-button:vertical:decrement": {
    background:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>\') center no-repeat',
  },
  "&::-webkit-scrollbar-button:single-button:vertical:increment": {
    background:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>\') center no-repeat',
  },
  "&::-webkit-scrollbar-button:single-button:horizontal:decrement": {
    background:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>\') center no-repeat',
  },
  "&::-webkit-scrollbar-button:single-button:horizontal:increment": {
    background:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>\') center no-repeat',
  },
}
export function CustomTable({ columns = [], rows = [], loading, imageUrl = "", empty = "" }) {
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    setMaxHeight(window.innerHeight - 330);
  }, []);
  return (
    rows.length || loading ?
      <TableContainer
        sx={{
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
          overflow: "auto",
          ...ScrollBarDesign,
        }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{ borderSpacing: "0" }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column?.align || "center"}
                  style={{
                    minWidth: column.id == "SI No" ? "80px" : column?.width ? column?.width : "150px",
                    padding: "15px 0px",
                    verticalAlign: "middle",
                    position: column.sticky ? "sticky" : "",
                    right: column.sticky ? 0 : "",
                    zIndex: 2,
                    backgroundColor: "white",
                    color: "primary.main"
                  }}
                  sx={{

                  }}
                >
                  {column.label}
                  {
                    column.sort ?
                      <IconButton color="primary" onClick={() => column?.onSort()}>
                        <Box
                          component="img"
                          sx={{
                            cursor: "pointer"
                          }}
                          onClick={() => column?.onSort()}
                          src={column?.icon}
                        />
                      </IconButton>

                      : null
                  }


                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading
              ? rows.map((row, index) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={index} sx={{ background: "white" }}>
                    {columns.map((column) => {
                      const value = row[column?.id];
                      return (
                        <TableCell
                          key={column?.id}
                          align={column?.align || "center"}
                          style={{
                            padding: "15px 0px",
                            position: column.sticky ? "sticky" : "",
                            right: column.sticky ? 0 : "",
                            // zIndex: 2,
                            backgroundColor: "white",
                          }}
                        >
                          {column.renderCell
                            ? column.renderCell(row, index)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
              : [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={"center"}
                      style={{ padding: "15px 10px" }}
                    >
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> : <Stack mt={2}>
        <Paper sx={{ padding: "10px 0 20px 0" }}>
          <Stack sx={{ maxWidth: "400px", margin: "auto" }}>
            <Image src={imageUrl ? imageUrl : Empty} width={380} height={300} alt="Empty Data" loading="lazy" />
            <Typography variant="h4" sx={{ color: "primary.main", textAlign: "center" }}> {empty ? empty : "No data found..."}</Typography>
          </Stack>
        </Paper>
      </Stack>
  );
}
