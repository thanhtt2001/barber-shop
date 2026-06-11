import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import BranchMap from "./BranchMap";

export default function BranchCard({ branch }) {
  const { id, name, address, phone, openHours, openDays, badge, color, googleMapsUrl } = branch;

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {/* Color Header */}
      <div className={`h-3 bg-gradient-to-r ${color}`} aria-hidden="true" />

      <div className="p-5 flex flex-col flex-1">
        {/* Badge + Name */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold font-display text-gray-900">{name}</h3>
          {badge && (
            <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 bg-brand/10 text-brand rounded-full">
              {badge}
            </span>
          )}
        </div>

        {/* Info List */}
        <ul className="space-y-2.5 mb-4">
          {/* Address */}
          <li className="flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-brand mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">{address}</span>
          </li>

          {/* Phone */}
          <li className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-brand flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm text-gray-600 hover:text-brand transition-colors"
            >
              {phone}
            </a>
          </li>

          {/* Open Hours */}
          <li className="flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-brand mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="block">{openHours}</span>
              <span className="text-xs text-gray-400">{openDays}</span>
            </div>
          </li>
        </ul>

        {/* Map */}
        <div className="mb-4">
          <BranchMap branch={branch} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Link to={`/booking?branch=${id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Đặt lịch
            </Button>
          </Link>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chỉ đường đến ${name}`}
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Chỉ đường
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
