/// <reference types="express" />
/// <reference types="ts-toolbelt" />
import { AnySchema } from 'joi';
import { HttpRequest, HttpResponse } from '../../../types/presentation';
export declare const validator: import("Function/Curry").Curry<(head: AnySchema, head: HttpRequest, head: HttpResponse, head: import("express").NextFunction) => void>;
