import { environment } from "../environments/environment.development";

export const GlobalComponent = {
    loginApi : `${environment.apiURL}User/login`,
    getFeatureByFeatureMasterId : `${environment.apiURL}Feature/getFeaturesByFeatureMasterId`,
    getFeatureByFeatureId : `${environment.apiURL}Feature/getFeaturesByFeatureId`,
    getAllActiveFeatures : `${environment.apiURL}Feature/getAllActiveFeatures`,
    getAllInActiveFeatures : `${environment.apiURL}Feature/getAllInActiveFeatures`,
    getAllFeatures : `${environment.apiURL}Feature/getAllFeatures`,
}