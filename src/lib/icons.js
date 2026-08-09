// Explicit icon map.
//
// Previously these files did `import * as Icons from 'react-icons/fa6'`, which
// defeats tree-shaking and pulled the entire Font Awesome 6 set (~1.6 MB) into
// the entry chunk on every page load. Named imports let Rollup drop the rest.
//
// Four names in the data files were Font Awesome 5 spellings that do not exist
// in fa6 (FaHeartbeat, FaShoppingBag, FaSparkles, FaUserMd). They were silently
// falling back to a generic icon; they are aliased to their fa6 equivalents here.

import {
  FaBriefcase,
  FaBuilding,
  FaBullhorn,
  FaCameraRetro,
  FaCar,
  FaChartLine,
  FaCircle,
  FaCode,
  FaCompass,
  FaGraduationCap,
  FaHospital,
  FaHotel,
  FaLaptopCode,
  FaPalette,
  FaPenNib,
  FaRobot,
  FaShareNodes,
  FaUsers,
  // fa6 replacements for the four fa5 names used in the data
  FaHeartPulse,
  FaBagShopping,
  FaWandMagicSparkles,
  FaUserDoctor,
} from 'react-icons/fa6';

export const iconMap = {
  FaBriefcase,
  FaBuilding,
  FaBullhorn,
  FaCameraRetro,
  FaCar,
  FaChartLine,
  FaCircle,
  FaCode,
  FaCompass,
  FaGraduationCap,
  FaHospital,
  FaHotel,
  FaLaptopCode,
  FaPalette,
  FaPenNib,
  FaRobot,
  FaShareNodes,
  FaUsers,

  // fa6 canonical
  FaHeartPulse,
  FaBagShopping,
  FaWandMagicSparkles,
  FaUserDoctor,

  // legacy fa5 aliases kept so existing data files keep working
  FaHeartbeat: FaHeartPulse,
  FaShoppingBag: FaBagShopping,
  FaSparkles: FaWandMagicSparkles,
  FaUserMd: FaUserDoctor,
};

export function getIcon(name, fallback = FaCircle) {
  return iconMap[name] || fallback;
}
