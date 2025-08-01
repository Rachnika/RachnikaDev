"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from "@/routes/AdminPanelRoute";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import { useCallback, useMemo } from "react";
import { columnConfig } from "@/lib/helperFunction";
import { DT_CATEGORY_COLUMN } from "@/lib/column";
import EditAction from "@/components/Application/Admin/EditAction";
import DeleteAction from "@/components/Application/Admin/DeleteAction";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_CATEGORY_SHOW, label: "Category" },
];
const ShowCategory = () => {


  const columns=useMemo(()=>{
      return columnConfig(DT_CATEGORY_COLUMN)
  },[])


  const action=useCallback((row,deleteType,handleDelete)=>{
    let actionMenu=[]
    actionMenu.push(<EditAction key="edit" href={ADMIN_CATEGORY_EDIT(row.original._id)} />)
    actionMenu.push(<DeleteAction key="delete" handleDetele={handleDelete} row={row} deleteType={deleteType} />)
    return actionMenu
  },[])


  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />

      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center ">
          <h4 className="text-xl font-semibold">Show Category</h4>
          <Button>
            <FiPlus/>
            <Link href={ADMIN_CATEGORY_ADD}>New Category</Link>
          </Button>
          </div>
        </CardHeader>

        <CardContent className="px-0">

          <DatatableWrapper 
            queryKey="category-data"
            fetchUrl="/api/category"
            intialPageSize={10}
            columnsConfig={columns}
            exportEndpoint="/api/category/export"
            deleteEndpoint="/api/category/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=category`}
            createAction={action}

          />
          
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowCategory