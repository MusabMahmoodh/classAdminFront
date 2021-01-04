import React from "react";
import { useParams } from "react-router-dom";
import SubscriptionList from "../components/subscriptions/SubscriptionsList";

const ViewBatch = () => {
  const { id } = useParams();
  return <SubscriptionList batchId={id} />;
};

export default ViewBatch;
