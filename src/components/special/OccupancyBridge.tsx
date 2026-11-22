import { useEffect } from 'react';
import { usePageOccupancy } from '../../utils/cursorSync';

interface OccupancyBridgeProps {
  onChange: (occupancy: Record<string, number>) => void;
}

export default function OccupancyBridge({ onChange }: OccupancyBridgeProps) {
  const occupancy = usePageOccupancy(true);

  useEffect(() => {
    onChange(occupancy);
  }, [occupancy, onChange]);

  useEffect(() => {
    return () => {
      onChange({});
    };
  }, [onChange]);

  return null;
}
