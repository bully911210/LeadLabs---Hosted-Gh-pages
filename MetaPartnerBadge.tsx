import React from "react";

export default function MetaPartnerBadge() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-6 text-center">
      <img
        src="https://www.clickheredigital.com/media/clickheredigital.com/5345/Meta_Business_Partners_two_line_lockup_positive_primary_RGB.png"
        alt="Meta Business Partner"
        className="h-14 w-auto opacity-95 transition-opacity duration-300 hover:opacity-100"
      />
      <p className="text-sm text-gray-500 mt-2">
        Official Meta Business Partner
      </p>
    </div>
  );
}
