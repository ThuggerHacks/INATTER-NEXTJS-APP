import Link from "next/link";
import React, { useState } from "react";

export const Message = (props: any) => {
  const [show, setShow]: any = useState(true);
  const closeToast = () => {
    setShow(false);
  };

  return <></>;
};
