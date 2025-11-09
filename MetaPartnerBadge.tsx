import React from "react";

export default function MetaPartnerBadge() {
  return (
    <div className="relative flex flex-col items-center justify-center py-10 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-3">
        <img
          src="https://www.clickheredigital.com/media/clickheredigital.com/5345/Meta_Business_Partners_two_line_lockup_positive_primary_RGB.png"
          alt="Meta Business Partner"
          className="h-12 md:h-14 w-auto opacity-95 transition-opacity duration-300 hover:opacity-100"
        />
        <p className="text-sm md:text-base text-gray-500">
          Official Meta Business Partner
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-60"></div>
    </div>
  );
}
