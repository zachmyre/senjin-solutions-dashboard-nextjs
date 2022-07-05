import { DataGrid } from "@mui/x-data-grid";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "businessName",
    headerName: "Business",
    sortable: true,
    minWidth: 30,
    maxWidth: 180,
    flex: 1,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    sortable: true,
    minWidth: 30,
    maxWidth: 180,
    flex: 1,
  },
  {
    field: "customerPhoneNumber",
    headerName: "Phone Number",
    type: "number",
    minWidth: 30,
    maxWidth: 130,
    flex: 1,
  },
  {
    field: "customerEmail",
    headerName: "Email",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 30,
    maxWidth: 180,
    flex: 1,
    // valueGetter: (params: any) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "customerWebsite",
    headerName: "Website",
    sortable: true,
    minWidth: 30,
    maxWidth: 180,
    flex: 1,
  },
];

const rows = [
  {
    id: 1,
    businessName: "Liberty IV",
    customerName: "Michael Lickteiq",
    customerPhoneNumber: "817-791-2935",
    customerEmail: "lickteigmd@gmail.com",
    customerWebsite: "https://www.libertyiv.com/",
  },
  {
    id: 2,
    businessName: "Chaney's Tobacco and Vape",
    customerName: "Kirk Chaney",
    customerPhoneNumber: "817-371-4679",
    customerEmail: "N/A",
    customerWebsite: "N/A",
  },
];

const OrdersTable = () => {
  return (
    <div className="w-full h-screen">
      <DataGrid
        className="bg-white rounded-md"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default OrdersTable;
