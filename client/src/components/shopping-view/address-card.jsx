import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { MapPin, Phone, StickyNote, Edit2, Trash2, Check } from "lucide-react";
import { Badge } from "../ui/badge";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onClick={
          setCurrentSelectedAddress
            ? () => setCurrentSelectedAddress(addressInfo)
            : null
        }
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isSelected
            ? "border-2 border-blue-600 bg-blue-50 shadow-md"
            : "border border-gray-200 hover:border-blue-300"
        }`}
      >
        {/* Header with Selection Badge */}
        {isSelected && (
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Selected Address</span>
          </div>
        )}

        <CardContent className="p-5 space-y-3">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {addressInfo?.address}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {addressInfo?.city} - {addressInfo?.pincode}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <p className="text-sm text-gray-700">{addressInfo?.phone}</p>
          </div>

          {/* Notes */}
          {addressInfo?.notes && (
            <div className="flex items-start gap-3">
              <StickyNote className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 italic">
                {addressInfo?.notes}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleEditAddress(addressInfo);
              }}
              variant="outline"
              className="w-full gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              size="sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAddress(addressInfo);
              }}
              variant="outline"
              className="w-full gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              size="sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default AddressCard;
