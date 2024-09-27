import React from "react";

import { ProposalForm } from "@/components/forms/form";
import { Header } from "@/components/headers/header";
import PrivateRoute from "@/components/private/PrivateRoute";

export default async function Proposta() {
  return (
    <PrivateRoute>
      <div className="flex flex-col">
        <Header />
        <ProposalForm />
      </div>
    </PrivateRoute>
  );
}
