import { InjectionToken } from "@angular/core";
import { Configuration } from "./configuration.model";

export const CONFIGURATION = new InjectionToken<Configuration>('configuration');
