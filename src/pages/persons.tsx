import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/admin";
import Table from "../components/table";

export function Persons() {

    const columns = [
        {
            "key": "id",
            "label": "ID",
        },
        {
            "key": "email",
            "label": "Email",
        }
    ]

  return (
    <AdminLayout>
        <Table  headers={columns} />
    </AdminLayout>
  );
}
