import SelectName from "./components/SelectName";

// import { config as complaintConfig } from "./complaintConfig";

const pgrCustomizations = {
  // complaintConfig,
  getComplaintDetailsTableRows: ({ id, service, role, t }) => {
   // console.log("idddd", id)
    return {};
  },
};

const pgrComponents = {
  SelectName: SelectName,
};
export { pgrCustomizations, pgrComponents };
