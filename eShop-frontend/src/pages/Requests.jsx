import * as React from "react";
import useAxios from "../utils/useAxios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const { logoutUser, user, userPermissions } = useContext(AuthContext);
  const api = useAxios();
  function handleClick(id) {
    // Define the logic for handling the button click here
    // <PopUp />;
    // console.log(`Button clicked for row with id ${id}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You will execute this request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, execute it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Accept or Reject the request",
          input: "select",
          inputOptions: {
            accept: "Accept",
            reject: "Reject",
          },
          inputPlaceholder: "Select an option",
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === "accept") {
                executeRequest(id, value);
                resolve();
              } else if (value === "reject") {
                executeRequest(id, value);
                resolve();
              }
            });
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Request Executed Successfully",
              icon: "success",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                getRequests();
              }
            });
          } else {
            Swal.fire({
              title: "Request Rejected",
              icon: "error",
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                getRequests();
              }
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your request is safe :)", "error");
      }
    });
  }
  const getRequests = async () => {
    await api
      .get("http://127.0.0.1:8080/api/all")
      .then((res) => {
        if (res.status === 200) {
          setRequests(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: "Unauthorized",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        } else if (err.response.status === 403) {
          Swal.fire({
            title: "Forbidden",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        }
      });
  };

  const executeRequest = async (id, value) => {
    await api
      .post(`/execute-delivery/${id}/`, {
        status: value,
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Request Executed Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          })
            .then((result) => {
              if (result.isConfirmed) {
                getRequests();
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                Swal.fire({
                  title: "Unauthorized",
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    logoutUser();
                  }
                });
              } else if (err.response.status === 403) {
                Swal.fire({
                  title: "Forbidden",
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    logoutUser();
                  }
                });
              } else if (err.response.status === 404) {
                Swal.fire({
                  title: "Request Not Found",
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    getRequests();
                  }
                });
              } else if (err.response.status === 409) {
                Swal.fire({
                  title: "Request Already Executed",
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    getRequests();
                  }
                });
              } else if (err.response.status === 500) {
                Swal.fire({
                  title: "Internal Server Error",
                  icon: "error",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    getRequests();
                  }
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            title: "Unauthorized",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        } else if (err.response.status === 403) {
          Swal.fire({
            title: "Forbidden",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              logoutUser();
            }
          });
        } else if (err.response.status === 404) {
          Swal.fire({
            title: "Request Not Found",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              getRequests();
            }
          });
        } else if (err.response.status === 409) {
          Swal.fire({
            title: "Request Already Executed",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              getRequests();
            }
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            title: "Internal Server Error",
            icon: "error",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              getRequests();
            }
          });
        }
      });
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Request ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <TableRow key={row.id}>
                <TableCell sortDirection="asc">{row.id}</TableCell>
                <TableCell>{row.product_id}</TableCell>
                <TableCell>{row.owner_id}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.requestid}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleClick(row.requestid)}
                  >
                    Execute
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
