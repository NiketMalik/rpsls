import React from "react";

import { MATERIAL_TYPES } from "constants/material";

import { Col } from "react-bootstrap";
import { Material } from "components/material";
import { AnimatePresence, motion } from "framer-motion";

interface MaterialSelectorProps {
  isExpanded: boolean;
  radius: number;
  onSelect?: (materialType: MATERIAL_TYPES) => void;
}

const MATERIALS = Object.values(MATERIAL_TYPES),
  AnimatedCol = motion(Col);

export const MaterialSelector = ({
  radius,
  onSelect,
}: MaterialSelectorProps) => {
  return (
    <AnimatePresence>
      {MATERIALS.map((materialType, index) => (
        <AnimatedCol
          key={materialType}
          md={4}
          className="d-flex justify-content-center m-2 m-md-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, zIndex: 1 }}
          transition={{ delay: 0.01 * index, type: "spring", duration: 0.25 }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <Material
            type={materialType}
            radius={radius}
            onClick={() => onSelect?.(materialType)}
          />
        </AnimatedCol>
      ))}
    </AnimatePresence>
  );
};
