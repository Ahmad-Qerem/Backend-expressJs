import {
  AR_Genders,
  AR_Roles,
  AR_MaritalStatuses,
} from "../../../../../Utils/Languages/ar.js";
import {
  EN_Genders,
  EN_Roles,
  EN_MaritalStatuses,
} from "../../../../../Utils/Languages/en.js";
const getAll = () => {
  return {
    ar: {
      roles: AR_Roles,
      Genders: AR_Genders,
      MaritalStatuses: AR_MaritalStatuses,
    },
    en: {
      roles: EN_Roles,
      Genders: EN_Genders,
      MaritalStatuses: EN_MaritalStatuses,
    },
  };
};
const getRoles = (language) => {
  if (language == "ar") {
    return AR_Roles;
  } else {
    return EN_Roles;
  }
};
const getGenders = (language) => {
  if (language == "ar") {
    return AR_Genders;
  } else {
    return EN_Genders;
  }
};
const getMaritalStatuses = (language) => {
  if (language == "ar") {
    return AR_MaritalStatuses;
  } else {
    return EN_MaritalStatuses;
  }
};
export { getRoles, getGenders, getMaritalStatuses,getAll };
