"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchModel from "./SearchModel";

const AdminMobileSearch = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" size="icon" onClick={() => setOpen(true)} className="md:hidden" variant="ghost">
        <FiSearch />
      </Button>

      <SearchModel
        open={open}
        setOpen={setOpen}
        
      />
    </>
  );
};

export default AdminMobileSearch;
