import React from "react";
import { Phone, MapPin, Truck, Bike, Eye } from "lucide-react";
import DeliveryPartnerStatusBadge from "./DeliveryPartnerStatusBadge";
import Button from "../ui/Button";
import Card from "../ui/GlassCard";

const DeliveryPartner = ({ partners, onViewDetails, updatePartner, viewMode = 'grid' }) => {
  const toggleStatus = (partner) => {
    const newStatus =
      partner.listView.status === "Active" ? "Inactive" : "Active";

    updatePartner({
      ...partner,
      listView: {
        ...partner.listView,
        status: newStatus,
      },
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-3 mt-6">
        {partners.map((partner) => {
          const { partnerId, listView, registrationData } = partner;
          const isActive = listView.status === "Active";
          return (
            <Card key={partnerId} className="p-3.5 group hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Partner Info */}
                <div className="md:col-span-3 flex items-center gap-3 min-w-0">
                  <img
                    src={registrationData?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}`}
                    className="w-11 h-11 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                    alt={registrationData?.name}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 dark:text-white truncate" title={listView.name}>{listView.name}</p>
                    <p className="text-xs text-gray-500 font-mono">ID: #{partnerId.slice(-6)}</p>
                  </div>
                </div>

                {/* Contact & Vehicle */}
                <div className="md:col-span-3 flex flex-col gap-1.5">
                   <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Phone size={13} className="text-blue-500"/>
                      <span className="font-medium">{listView.phone}</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      {listView.vehicleType === 'Bike' ? <Bike size={13} className="text-purple-500"/> : <Truck size={13} className="text-purple-500"/>}
                      <span className="capitalize font-medium">{listView.vehicleType?.toLowerCase()}</span>
                   </div>
                </div>

                {/* Orders & KYC */}
                <div className="md:col-span-2 text-xs flex flex-col gap-1">
                    <p className="text-gray-500 dark:text-gray-400">Orders: <span className="font-bold text-gray-800 dark:text-white">{listView.assignedOrdersCount}</span></p>
                    <p className="text-gray-500 dark:text-gray-400">KYC: <span className={`font-bold ${
                       listView.kycStatus === 'VERIFIED' || listView.kycStatus === 'APPROVED' ? 'text-green-500' : 
                       listView.kycStatus === 'PENDING' ? 'text-yellow-500' : 'text-red-500'
                    }`}>{listView.kycStatus}</span></p>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <DeliveryPartnerStatusBadge status={listView.status} />
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-2 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => onViewDetails(partner)} title="View Details">
                    <Eye size={14}/>
                  </Button>
                  <Button variant="primary" size="sm" className="h-8 px-2 py-0" onClick={() => alert('Assign Order')}>Assign</Button>
                  <Button variant={isActive ? "danger" : "success"} size="sm" className="h-8 px-2 py-0" onClick={() => toggleStatus(partner)}>
                    {isActive ? "Off" : "On"}
                  </Button>
                </div>

              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-4">
      {partners.map((partner) => {
        const { partnerId, listView, registrationData, orderHistory } = partner;
        const isActive = listView.status === "Active";

        return (
          <Card
            key={partnerId} onClick={() => onViewDetails(partner)}
            className="group relative hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
          >
            {/* ID Card Header / Background */}
            <div className="h-10 w-full bg-gray-100 dark:bg-gray-700/50 relative">
              {/* View Button (Top Left) */}
              <button 
                onClick={(e) => { e.stopPropagation(); onViewDetails(partner); }}
                className="absolute top-2 left-2 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white dark:hover:bg-gray-800 shadow-sm backdrop-blur-sm transition-all z-10"
                title="View Details"
              >
                <Eye size={14} />
              </button>

              <div className="absolute top-1 right-1 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-sm backdrop-blur-sm scale-90">
                <DeliveryPartnerStatusBadge status={listView.status} />
              </div>
            </div>

            {/* Profile Image - Overlapping */}
            <div className="flex justify-center -mt-8 mb-1 px-3">
              <div className="relative">
                <img
                  src={
                    registrationData?.image ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerId}`
                  }
                  className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg bg-white dark:bg-gray-700"
                  alt={registrationData?.name}
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              </div>
            </div>

            {/* Identity */}
            <div className="text-center px-3 mb-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate leading-tight">{registrationData?.name}</h3>
              <p className="text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded-full inline-block mt-1">
                ID: {partnerId}
              </p>
            </div>

            {/* Details Grid */}
            <div className="px-4 space-y-2  flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={12} />
                </div>
                <span className="truncate font-medium">{registrationData?.mobileNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
                  {registrationData?.vehicleType === 'Bike' ? <Bike size={12} /> : <Truck size={12} />}
                </div>
                <span className="capitalize font-medium">{registrationData?.vehicleType || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 shrink-0">
                  <MapPin size={12} />
                </div>
                <span className="truncate font-medium">{listView.city || "N/A"}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 border-y border-gray-200 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700 bg-gray-50/50 dark:bg-gray-800/50 mt-auto">
              <div className="px-2 py-1 text-center border-r border-gray-200 dark:border-gray-700 ">
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Orders</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{listView.assignedOrdersCount || 0}</p>
              </div>
              <div className="px-2 py-1 text-center">
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Completed</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{orderHistory?.length || 0}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-[10px] h-8 py-0"
                  onClick={() => alert("Assign Order")}
                >
                  Assign
                </Button>

                <Button
                  variant={isActive ? "danger" : "success"}
                  size="sm"
                  className="text-[10px] h-8 py-0"
                  onClick={() => toggleStatus(partner)}
                >
                  {isActive ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>

          </Card>
        );
      })}
    </div>
  );
};

export default DeliveryPartner;